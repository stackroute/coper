import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AppHeader from './view/welcome';
import {ChangePassword, Profile, AccountSettings} from './userProfile/index.js';
import {Notification} from './notifications/index.js';
import ConversationView from './conversation/index.js';
import {Introduction} from './home/index.js';
import About from './view/aboutUs.js';
import Contact from './view/contactUs.js';
injectTapEventPlugin();

ReactDOM.render((
  <Router history={hashHistory}>
        <Route path="/" component={AppHeader}>
            <Route path="/Home" component={Introduction}/>
            <Route path="/Profile" component={Profile}/>
            <Route path="/UserHome" component={ConversationView}/>
            <Route path="/ChangePassword" component={ChangePassword}/>
            <Route path="/AccountSettings" component={AccountSettings}/>
            <Route path="/Notification" component={Notification}/>
            <Route path="/About" component={About}/>
            <Route path="/Contact" component={Contact}/>
        </Route>
    </Router>
), document.getElementById('container'));
