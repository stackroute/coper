import React from 'react';
export default class ImageListResponse extends React.Component {
  constructor() {
    super();
  }

  static get contextTypes() {
    return { response: React.PropTypes.object.isRequired };
  }

  render() {
    return (
      <div className='message'>
        <img style={{height:'200px'}} src={this.context.response.image} />
      </div>
    )
  }
}