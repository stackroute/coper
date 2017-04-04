import React from 'react';
import ResponseViewContextUtil from  './ResponseViewContextUtil.jsx';
import ShortTextResponse from './ShortTextResponse.jsx';

export default class AcknowledgementHandler extends React.Component {
	constructor() {
		super();

		this.state = {
			error: ''
		};
	}

	static get contextTypes() {
      return { response: React.PropTypes.object.isRequired };
  }

	getResponseRendererMap() {
		return {
			shorttext: <ShortTextResponse/>,
		};
	}

	render() {
		return (
			<div>
			<ResponseViewContextUtil response={this.context.response}>
				{this.getResponseRendererMap()[this.context.response.contentType]}
			</ResponseViewContextUtil>
			</div>
			);
	}
}
