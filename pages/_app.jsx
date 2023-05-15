import React from "react";
import AOS from "aos";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import Router from "next/router";
import NProgress from "nprogress"
import "nprogress/nprogress.css";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "/styles/flaticon.css";
import "/styles/boxicons.min.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-image-lightbox/style.css";
import "react-tabs/style/react-tabs.css";
import "react-modal-video/css/modal-video.min.css";
import "/styles/global.css";
import "/styles/style.css";
import "/styles/header.css";
import "/styles/footer.css";
import "/styles/responsive.css";
import "/styles/styles.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.snow.css";
import ScrollToTop from "@/components/Layout/ScrollToTop";
import Head from "next/head";
import io from "socket.io-client";
import toast from "@/components/Toast";
import { DOMAIN } from "@/src/redux/constants";
import { getUserInfo } from "@/src/redux/Profile/actions";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps, permission }) {

  var socket = null;

  React.useEffect(() => {

    AOS.init();
    if (store.getState().user.user_id && socket == null) {
      socket = io(DOMAIN);
      socket.emit("login", {
        userid: store.getState().user.user_id,
      });
      socket.on("roomId", (data) => {
        localStorage.setItem("roomId", data);
      });
      socket.on("follow", (data) => {
        toast({ type: "success", message: data.msg });
      });

      socket.on("post", (data) => {
        toast({ type: "success", message: data.msg });
      });
    }
    store.dispatch((dispatch) => getUserInfo(() => { })(dispatch));

    return () => {
      if (socket !== null) socket.off("New Client");
    };
  }, []);

  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <>
      <Provider store={store}>
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        {getLayout(<Component {...pageProps} />)}
        <ToastContainer
          position="top-right"
          autoClose={8000}
          hideProgressBar={false}
          newestOnTop={false}
          draggable={false}
          pauseOnVisibilityChange
          closeOnClick
          pauseOnHover
        />
        <ScrollToTop />
      </Provider>
    </>
  );
}

MyApp.getInitialProps = async ({ Component }) => {

  const authenticate = Component?.authenticate;
  if (authenticate) {
    const state = store.getState();
    state.user.token === null ? Router.push('/') : ''
  }

  return { permission: authenticate }
}

export default MyApp;
