import React from 'react';
import ReactDOM from 'react-dom';
import {hashHistory} from 'react-router';

class EnsureLoggedInContainer extends React.Component {
  componentDidMount() {
    // const { dispatch, currentURL } = this.props
    let token = localStorage.getItem('lucytoken') || '';
    if (token.length < 50) {
      // dispatch(setRedirectUrl(currentURL))
      hashHistory.push('/Home');
    }
  }

  render() {
    if (window.localStorage) {
      return this.props.children;
    }
      return null;
  }
}

export default EnsureLoggedInContainer;
