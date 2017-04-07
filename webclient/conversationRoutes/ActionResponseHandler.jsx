import React from 'react';
import ResponseViewContextUtil from  './ResponseViewContextUtil.jsx';
import ShortTextResponse from './ShortTextResponse.jsx';
import ImageListResponse from './ImageListResponse.jsx';
export default class ActionResponseHandler extends React.Component {

  constructor() {
    super();

    this.state = {
      error: ''
    };
  }
  getResponseRendererMap() {
    return {
      shorttext: <ShortTextResponse/>,
      imagelist: <ImageListResponse/>
    };
  }

  render() {
    console.log("inside");
    return (
       <div>
      <ResponseViewContextUtil response={this.context.response}>
        {this.getResponseRendererMap()[this.context.response.contentType]}
      </ResponseViewContextUtil>
      </div>
      );
     }
}



