import React from 'react';
import ResponseViewContextUtil from  './ResponseViewContextUtil.jsx';
import ShortTextResponse from './ShortTextResponse.jsx';

export default class DefaultResponseHandler extends React.Component {
  constructor() {
    super();

    this.state = {
      responses: [
        {
          contentType: 'shorttext',
          content:'# This is a header\n\nAnd this is a defaultresponse'
        }
      ],
      error: ''
    };
  }
  getResponseRendererMap() {
    return {
      shorttext: <ShortTextResponse/>,
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



