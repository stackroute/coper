import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AppHeader from './view/welcome.jsx';
import {ChangePassword, Profile, AccountSettings} from './userProfile/index.jsx';
import {Notification} from './notifications/index.jsx';
import ConversationView from './conversation/index.jsx';
import {Introduction} from './home/index.jsx';
import About from './view/aboutUs.jsx';
import Contact from './view/contactUs.jsx';
import EnsureLoggedInContainer from './EnsureLoggedInContainer.jsx';
injectTapEventPlugin();

ReactDOM.render((
  <Router history={hashHistory}>
        <Route path="/" component={AppHeader}>
            <Route path="/Home" component={Introduction}/>
            <Route component={EnsureLoggedInContainer}>
              <Route path="/Profile" component={Profile}/>
              <Route path="/UserHome" component={ConversationView}/>
              <Route path="/ChangePassword" component={ChangePassword}/>
              <Route path="/AccountSettings" component={AccountSettings}/>
              <Route path="/Notification" component={Notification}/>
              <Route path="/About" component={About}/>
              <Route path="/Contact" component={Contact}/>
            </Route>
        </Route>
    </Router>
), document.getElementById('container'));
