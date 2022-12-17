import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

// next
import { useRouter } from 'next/router';

// ==============================|| AUTH GUARD ||============================== //
const whitelist = ['/', '/home'];
const AuthGuard = ({ children, token }) => {

  const router = useRouter();
  useEffect(() => {
    if (!token || whitelist.indexOf(router.route) === -1) {
      router.push('/')
    }
  })

  return children;
};

AuthGuard.propTypes = {
  children: PropTypes.node
};


const mapStateToProps = ({ user }) => ({
  token: user.token
})

export default connect(mapStateToProps, null)(AuthGuard);
