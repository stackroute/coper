import React from 'react';
const ReactMarkdown = require('react-markdown');

export default class ShortTextResponse extends React.Component {
  constructor() {
    super();
  }

  static get contextTypes() {
    return { response: React.PropTypes.object.isRequired };
  }


  render() {
        console.log("inside st");
    return (
        <div>
          <ReactMarkdown source={this.context.response.content}>
          </ReactMarkdown>
        </div>
      );
  }
}