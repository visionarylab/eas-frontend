import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Number from './Number/Number';
import Letter from './Letter/Letter';

const Draw = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/number" component={props => <Number {...props} />} />
      <Route path="/letter" component={props => <Letter {...props} />} />
    </Switch>
  </BrowserRouter>
  );

export default Draw;
