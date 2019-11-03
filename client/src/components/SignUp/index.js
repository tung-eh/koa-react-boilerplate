import { useHistory } from 'react-router';
import React, { useCallback } from 'react';

import { useFormInput } from '../../hooks';
import { usePost } from '../../hooks/usePost';

const SignUp = () => {
  const history = useHistory();
  const [input, handleInputChange] = useFormInput({
    name: '',
    email: '',
    password: '',
  });
  const [triggerFetch] = usePost(
    '/api/signup',
    input,
    useCallback(
      data => {
        alert(
          "Signed up successfully. Let's login to the account you've just created"
        );
        history.push('/login');
      },
      [history]
    )
  );

  return (
    <div>
      <div>
        <input
          placeholder="Your name"
          value={input.name}
          onChange={handleInputChange('name')}
        />
      </div>
      <div>
        <input
          type="email"
          placeholder="Your email"
          value={input.email}
          onChange={handleInputChange('email')}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Your password"
          value={input.password}
          onChange={handleInputChange('password')}
        />
      </div>
      <button onClick={triggerFetch}>Sign Up</button>
    </div>
  );
};

export default SignUp;
