import { Link, useHistory } from 'react-router-dom';
import React, { useCallback, useContext } from 'react';

import { AuthContext } from '../AuthProvider';
import { usePost } from '../../hooks/usePost';

const AuthNav = () => {
  const history = useHistory();
  const { authInfo, updateAuthInfo } = useContext(AuthContext);
  const [triggerFetch] = usePost(
    '/api/logout',
    {},
    useCallback(
      data => {
        alert('Logged out successfully');
        updateAuthInfo(null);
        history.push('/login');
      },
      [history, updateAuthInfo]
    )
  );

  return authInfo ? (
    <a href="#" onClick={triggerFetch}>
      Logout
    </a>
  ) : (
    <>
      <Link to="login">Login</Link> | <Link to="signup">Register</Link>
    </>
  );
};

const Navigator = () => (
  <nav>
    <Link to="/">Home</Link> | <Link to="about">About</Link> |{' '}
    <Link to="sample">Sample</Link>
    <span style={{ float: 'right' }}>
      <AuthNav />
    </span>
  </nav>
);

export default Navigator;
