import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import { Route, Link, BrowserRouter as Router} from 'react-router-dom';

const routing = (
  <Router>
    <div>
      <Route path="/:ticker" component={App} />
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));