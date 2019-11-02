import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React from 'react';

import About from './About';
import AuthProvider from './AuthProvider';
import Home from './Home';
import Login from './Login';
import Navigator from './Navigator';
import Sample from './Sample';
import SignUp from './SignUp';

const App = () => (
  <AuthProvider>
    <Router>
      <Navigator />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/sample">
          <Sample />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
      </Switch>
    </Router>
  </AuthProvider>
);

export default App;
