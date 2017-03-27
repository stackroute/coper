import React from 'react';
import AcknowledgementHandler from '../conversationRoutes/AcknowledgementHandler.jsx';
import './ChatBubble.css';

export default class InteractionTimeLine extends React.Component {
	constructor() {
		super();
	}

	render() {
		console.log("inside it");
	return (
			<div>
			<AcknowledgementHandler />
			</div>
			)
	}
}