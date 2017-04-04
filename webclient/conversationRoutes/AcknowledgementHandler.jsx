import React from 'react';
import ResponseViewContextUtil from  './ResponseViewContextUtil.jsx';
import ShortTextResponse from './ShortTextResponse.jsx';


export default class AcknowledgementHandler extends React.Component {
	constructor() {
		super();

		this.state = {
			responses: this.props.responses,
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


