'use strict';
import React from 'react';

export default class ResponseViewContextUtil extends React.Component {

  static propTypes = {
    response: React.PropTypes.object,
    children: React.PropTypes.node
  };

  static childContextTypes = {
    response: React.PropTypes.object
  };

  getChildContext() {
    return {response: this.props.response};
  }

  render() {
    return this.props.children;
  }
}