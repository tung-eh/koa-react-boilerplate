import { useHistory } from 'react-router';
import React, { useCallback, useContext } from 'react';

import { AuthContext } from '../AuthProvider';
import { useFormInput } from '../../hooks';
import usePost from '../../hooks/usePost';

const Login = () => {
  const history = useHistory();
  const [input, handleInputChange] = useFormInput({ email: '', password: '' });
  const { updateAuthInfo } = useContext(AuthContext);
  const [triggerFetch] = usePost(
    '/api/login',
    input,
    useCallback(
      data => {
        alert('Logged in successfully');
        updateAuthInfo(data);
        history.push('/');
      },
      [history, updateAuthInfo]
    )
  );

  return (
    <div>
      <input
        type="email"
        placeholder="Your email"
        value={input.email}
        onChange={handleInputChange('email')}
      />
      <input
        type="password"
        placeholder="Your password"
        value={input.password}
        onChange={handleInputChange('password')}
      />
      <button onClick={triggerFetch}>Login</button>
    </div>
  );
};

export default Login;
