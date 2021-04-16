import "react-toastify/dist/ReactToastify.min.css";
import SwiperCore, { Lazy, Navigation, Pagination } from "swiper";
import "swiper/components/lazy/lazy.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/swiper.min.css";
import Footer from "./Components/Footer/Footer";
import Main from "./Components/Main/Main";
import Nav from "./Components/Nav/Nav";
import { Toast } from "./Components/Toast";

SwiperCore.use([Navigation, Pagination, Lazy]);

const App = () => {
  return (
    <>
      <Nav />
      <Main />
      <Footer />
      <Toast />
    </>
  );
};

export default App;
