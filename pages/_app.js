import React from "react";
import AOS from "aos";
import { wrapper, store } from "@/redux/store";
import { Provider } from "react-redux";
import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress
import "../node_modules/aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "/styles/flaticon.css";
import "/styles/boxicons.min.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-image-lightbox/style.css";
import "react-tabs/style/react-tabs.css";
import "../node_modules/react-modal-video/css/modal-video.min.css";
import "/styles/faq.css";
import "/styles/global.css";
import "/styles/style.css";
import "/styles/header.css";
import "/styles/footer.css";
import "/styles/responsive.css";
import "/styles/custom.css";
import "/styles/styles.scss";
import 'react-quill/dist/quill.snow.css'
import "/styles/sidebar.scss";
import "/styles/sidebar.scss";
import 'react-quill/dist/quill.snow.css'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "@/components/Layout/ScrollToTop";
import Head from 'next/head';
import { UserContext } from "@/components/protected"
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    AOS.init();
  }, []);
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <>
      <Provider store={store}>
        <Head>
          <meta
            charSet="utf-8"
          />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1"
          />
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

export default MyApp;