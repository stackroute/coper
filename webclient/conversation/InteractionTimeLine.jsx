import React from 'react';
import AcknowledgementHandler from '../conversationRoutes/AcknowledgementHandler.jsx';
import './ChatBubble.css';

export default class InteractionTimeLine extends React.Component {
    constructor() {
      super();
    }

    render() {
      console.log("inside it");
      let bubbleClass = 'you';
      let bubbleDirection = "bubble-direction-reverse";
      return (
      <div className={`bubble-container ${bubbleDirection}`}>
      <div className={`bubble ${bubbleClass}`}>
        <AcknowledgementHandler />
        </div>
      </div>
      )
    }
}