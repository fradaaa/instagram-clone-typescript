import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import { v4 as uuidv4 } from "uuid";

type Config = Parameters<typeof firebase.initializeApp>[0];

type UserInfo = {
  email: string;
  fullName: string;
  userName: string;
  password: string;
};

class Fuego {
  functions: typeof firebase.functions;
  auth: firebase.auth.Auth;
  db: firebase.firestore.Firestore;
  storage: firebase.storage.Storage;
  FieldValue: typeof firebase.firestore.FieldValue;
  EmailAuthProvider: typeof firebase.auth.EmailAuthProvider;
  defaultPhotoURL: string;

  constructor(config: Config) {
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }

    this.functions = firebase.functions;
    this.auth = firebase.auth();
    this.db = firebase.firestore();
    this.storage = firebase.storage();
    this.FieldValue = firebase.firestore.FieldValue;
    this.EmailAuthProvider = firebase.auth.EmailAuthProvider;
    this.defaultPhotoURL =
      "https://firebasestorage.googleapis.com/v0/b/instagram-clone-13fab.appspot.com/o/avatars%2Fdefault.png?alt=media&token=b4e21038-48d4-46bd-ba8b-91b3c2dfac79";
  }

  getAuthUserId = () => this.auth.currentUser?.uid;

  isOwner = (profileId: string) => this.getAuthUserId() === profileId;

  isUserNameFree = async (userName: string) => {
    const querySnapshot = await this.db
      .collection("users")
      .where("userName", "==", userName)
      .get();

    return querySnapshot.empty;
  };

  createUser = async ({ email, fullName, userName, password }: UserInfo) => {
    if (await this.isUserNameFree(userName)) {
      const authUser = await this.auth.createUserWithEmailAndPassword(
        email,
        password
      );

      if (authUser.user) {
        await this.db.collection("users").doc(authUser.user.uid).set({
          fullName,
          userName,
          photoURL: this.defaultPhotoURL,
          postsNumber: 0,
          followersNumber: 0,
          followingNumber: 0,
          userInformation: "",
        });
      }

      return;
    } else {
      throw new Error("Username is already taken");
    }
  };

  updateAvatar = async (file: File, currentPhotoURL: string) => {
    const fileName = uuidv4();
    const uid = this.getAuthUserId();

    if (currentPhotoURL !== this.defaultPhotoURL) {
      const oldRef = this.storage.refFromURL(currentPhotoURL);
      await oldRef.delete();
    }

    const storageRef = this.storage.ref(`/avatars/${uid}/${fileName}`);

    const task = storageRef.put(file);

    task.on(
      "state_changed",
      (snapshot) => {
        /* const percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100; */
      },
      (error) => {
        console.error(error);
      },
      async () => {
        try {
          const downloadURL = await task.snapshot.ref.getDownloadURL();
          await this.db
            .collection("users")
            .doc(uid)
            .update("photoURL", downloadURL);
        } catch (error) {
          console.error(error);
        }
      }
    );
  };

  uploadSingleFile = (
    file: File,
    postId: string,
    updateProgress: (n: number) => void
  ): Promise<string> => {
    return new Promise((resolve) => {
      const uid = this.getAuthUserId();
      const fileName = uuidv4();
      const storageRef = this.storage.ref(
        `/posts/${uid}/${postId}/${fileName}`
      );
      const task = storageRef.put(file);

      task.on(
        "state_changed",
        (snapshot) => {
          const percentage =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          updateProgress(percentage);
        },
        (error) => {
          console.error(error);
        },
        async () => {
          const downloadURL = (await task.snapshot.ref.getDownloadURL()) as string;
          resolve(downloadURL);
        }
      );
    });
  };

  uploadPhotos = async (
    files: File[],
    updateProgress: (n: number) => void,
    updateUploadedCount: () => void
  ) => {
    const uid = this.getAuthUserId();
    const userRef = this.db.collection("users").doc(uid);
    const postRef = this.db.collection("posts").doc();
    const URLs: string[] = [];

    for (let file of files) {
      const downloadURL = await this.uploadSingleFile(
        file,
        postRef.id,
        updateProgress
      );
      updateUploadedCount();
      URLs.push(downloadURL);
    }

    const batch = this.db.batch();
    batch.set(postRef, {
      timestamp: this.FieldValue.serverTimestamp(),
      likesNumber: 0,
      description: "",
      URLs,
      ownerId: uid,
    });
    batch.update(userRef, {
      postsNumber: this.FieldValue.increment(1),
    });
    await batch.commit();

    return `/p/${postRef.id}`;
  };

  deleteSelected = async (selected: string[], dialogId: string) => {
    const dialogRef = this.db.collection("direct").doc(dialogId);
    const batch = this.db.batch();

    selected.forEach((id) => {
      const delRef = dialogRef.collection("messages").doc(id);
      batch.delete(delRef);
    });

    await batch.commit();
    return;
  };

  getDialogId = async (profileId: string) => {
    const uid = this.getAuthUserId();
    const dialogSnapshot = await this.db
      .collection("direct")
      .where("members." + uid, "==", true)
      .where("members." + profileId, "==", true)
      .get();

    return !dialogSnapshot.empty ? dialogSnapshot.docs[0].id : null;
  };

  sendMessageInProfile = async (profileId: string, messageText: string) => {
    const date = new Date();
    const uid = this.getAuthUserId()!; /* can't be undefined */
    const message = {
      messageText,
      timestamp: date,
      senderId: uid,
    };
    const batch = this.db.batch();
    let dialogRef, messageRef, messageId;

    const dialogId = await this.getDialogId(profileId);

    if (dialogId) {
      dialogRef = this.db.collection("direct").doc(dialogId);
      messageRef = dialogRef.collection("messages").doc();
      messageId = messageRef.id;

      batch.set(messageRef, message);
    } else {
      const members = { [uid]: true, [profileId]: true };
      const membersArray = [uid, profileId];
      dialogRef = this.db.collection("direct").doc();
      messageRef = dialogRef.collection("messages").doc();
      messageId = messageRef.id;

      batch.set(messageRef, message);
      batch.set(dialogRef, {
        members,
        membersArray,
        lastUpdate: this.FieldValue.serverTimestamp(),
      });

      await batch.commit();

      return;
    }

    batch.update(dialogRef, {
      lastUpdate: this.FieldValue.serverTimestamp(),
    });
    await batch.commit();

    return messageId;
  };

  sendMessageInDialog = async (dialogId: string, messageText: string) => {
    const uid = this.getAuthUserId();
    const dialogRef = this.db.collection("direct").doc(dialogId);
    const messageRef = dialogRef.collection("messages").doc();
    const message = {
      messageText,
      timestamp: this.FieldValue.serverTimestamp(),
      senderId: uid,
    };
    const batch = this.db.batch();

    batch.set(messageRef, message);
    batch.update(dialogRef, {
      lastUpdate: this.FieldValue.serverTimestamp(),
    });

    await batch.commit();

    return;
  };

  removeFollow = async (profileId: string) => {
    const uid = this.getAuthUserId();
    const batch = this.db.batch();

    const userRef = this.db.collection("users").doc(uid);
    const userFollowingRef = this.db
      .collection("following")
      .doc(uid)
      .collection("refs")
      .doc(profileId);

    const profileRef = this.db.collection("users").doc(profileId);
    const profileFollowersRef = this.db
      .collection("followers")
      .doc(profileId)
      .collection("refs")
      .doc(uid);

    batch.delete(userFollowingRef);
    batch.delete(profileFollowersRef);
    batch.update(userRef, { followingNumber: this.FieldValue.increment(-1) });
    batch.update(profileRef, {
      followersNumber: this.FieldValue.increment(-1),
    });

    await batch.commit();
    return;
  };

  addFollow = async (profileId: string) => {
    const uid = this.getAuthUserId();
    const batch = this.db.batch();

    const userRef = this.db.collection("users").doc(uid);
    const followersRef = this.db
      .collection("followers")
      .doc(profileId)
      .collection("refs")
      .doc(uid);

    const profileRef = this.db.collection("users").doc(profileId);
    const followingRef = this.db
      .collection("following")
      .doc(uid)
      .collection("refs")
      .doc(profileId);

    batch.set(followersRef, {
      timestamp: this.FieldValue.serverTimestamp(),
    });
    batch.set(followingRef, {
      timestamp: this.FieldValue.serverTimestamp(),
    });
    batch.update(userRef, { followingNumber: this.FieldValue.increment(1) });
    batch.update(profileRef, {
      followersNumber: this.FieldValue.increment(1),
    });

    await batch.commit();
    return;
  };

  addLike = async (postId: string) => {
    const uid = this.getAuthUserId();
    const postRef = this.db.collection("posts").doc(postId);
    const likesRef = this.db
      .collection("postLikes")
      .doc(postId)
      .collection("refs")
      .doc(uid);

    const batch = this.db.batch();

    batch.set(likesRef, {
      timestamp: this.FieldValue.serverTimestamp(),
    });
    batch.update(postRef, { likesNumber: this.FieldValue.increment(1) });

    await batch.commit();
    return;
  };

  removeLike = async (postId: string) => {
    const uid = this.getAuthUserId();
    const postRef = this.db.collection("posts").doc(postId);
    const batch = this.db.batch();
    const likesRef = this.db
      .collection("postLikes")
      .doc(postRef.id)
      .collection("refs")
      .doc(uid);

    batch.delete(likesRef);
    batch.update(postRef, {
      likesNumber: this.FieldValue.increment(-1),
    });

    await batch.commit();
    return;
  };

  addPostToSaved = async (postId: string) => {
    const uid = this.getAuthUserId();
    const savedPostRef = this.db
      .collection("savedPosts")
      .doc(uid)
      .collection("refs")
      .doc(postId);

    await savedPostRef.set({
      timestamp: this.FieldValue.serverTimestamp(),
    });
    return;
  };

  removePostFromSaved = async (postId: string) => {
    const uid = this.getAuthUserId();

    await this.db
      .collection("savedPosts")
      .doc(uid)
      .collection("refs")
      .doc(postId)
      .delete();
    return;
  };

  reauthenticate = async (email: string, password: string) => {
    const credentials = this.EmailAuthProvider.credential(email, password);
    await this.auth.currentUser?.reauthenticateWithCredential(credentials);
    return;
  };

  changeEmail = async (oldPassword: string, newEmail: string) => {
    const authEmail = this.auth.currentUser?.email;

    await this.reauthenticate(authEmail!, oldPassword);
    await this.auth.currentUser?.updateEmail(newEmail);
  };

  changePassword = async (oldPassword: string, newPassword: string) => {
    const authEmail = this.auth.currentUser?.email;

    await this.reauthenticate(authEmail!, oldPassword);
    await this.auth.currentUser?.updatePassword(newPassword);
  };
}

export default Fuego;
