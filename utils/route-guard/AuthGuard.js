import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";

// next
import { useRouter } from "next/router";

// ==============================|| AUTH GUARD ||============================== //
const whitelist = ["/", "/home", "/faq"];
const AuthGuard = ({ children, token }) => {
  const router = useRouter();
  useEffect(() => {
    if (
      (token === undefined || token === null || token.length === 0) &&
      whitelist.indexOf(router.route) === -1
    ) {
      return router.push("/home");
      // return <div>Loading...</div>
    }
  }, []);

  return children;
};

AuthGuard.propTypes = {
  children: PropTypes.node,
};

const mapStateToProps = ({ user }) => ({
  token: user.token,
});

export default connect(mapStateToProps, null)(AuthGuard);
