import React from "react";
import AOS from "aos";
import { AuthProvider } from "@/components/AuthProvider";
import { AuthGuard } from "@/components/AuthGuard";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import Router from "next/router";
import NProgress from "nprogress"
import { ToastContainer } from "react-toastify";
import ScrollToTop from "@/components/Layout/ScrollToTop";
import Head from "next/head";
import io from "socket.io-client";
import toast from "@/components/Toast";
import { DOMAIN } from "@/src/redux/constants";
import { getUserInfo } from "@/src/redux/Profile/actions";
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
// import "/styles/header.scss";
import "/styles/footer.css";
import "/styles/responsive.css";
import "/styles/styles.scss";
import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.snow.css";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp(props) {
  const { Component, pageProps } = props;
  var socket = null;
  React.useEffect(() => {
    // - client side
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
        <AuthProvider>
          {/* if requireAuth property is present - protect the page */}
          {Component.requireAuth ? (
            <AuthGuard>
              {getLayout(<Component {...pageProps} />)}
            </AuthGuard>
          ) : (
            // public page
            getLayout(<Component {...pageProps} />)
          )}
        </AuthProvider>
        {/* {getLayout(<Component {...pageProps} />)} */}
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

export default MyApp;
