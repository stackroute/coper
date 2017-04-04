import React from 'react';
import ResponseViewContextUtil from  './ResponseViewContextUtil.jsx';
import ShortTextResponse from './ShortTextResponse.jsx';
import ImageListResponse from './ImageListResponse.jsx';
export default class ActionResponseHandler extends React.Component {

  constructor() {
    super();

    this.state = {
      responses: [
        {
          contentType: 'shorttext',
          content:'# This is a header\n\nAnd this is a actionresponse'
        },
        {
          contentType: 'imagelist',
          content:'./images/response.jpg'
        }
        ],
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
        {
          this.state.responses.map((respObj) => {
            return (
              <div key={respObj.contentType}>
              <ResponseViewContextUtil response={respObj}>
                {
                  this.getResponseRendererMap()[respObj.contentType]
                }
              </ResponseViewContextUtil>
              </div>
            )
          })
        }
      </div>
    );
  }
}



