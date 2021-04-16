export interface IProfile {
  fullName: string;
  userName: string;
  followersNumber: number;
  followingNumber: number;
  postsNumber: number;
  userInformation: string;
  photoURL: string;
}

export interface IPost {
  URLs: string[];
  description: string;
  likesNumber: number;
  ownerId: string;
  timestamp: firebase.default.firestore.Timestamp;
}

export interface IComment {
  authorId: string;
  comment: string;
  timestamp: firebase.default.firestore.Timestamp;
}

export interface IDialog {
  lastUpdate: firebase.default.firestore.Timestamp;
  members: {
    [key: string]: boolean;
  };
  membersArray: string[];
}

export interface IMessage {
  messageText: string;
  senderId: string;
  timestamp?: firebase.default.firestore.Timestamp;
  date?: string;
}
