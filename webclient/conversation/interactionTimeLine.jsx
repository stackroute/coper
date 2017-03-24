import React, { Component } from 'react';
import './ChatBubble.css';
class InteractionTimeLine extends Component {
  constructor() {
    super();
    this.state={
     messages:[{
        "type" : 0,
        "image": "../images/lucy.jpg",
        "text" : "Hello! Good Morning!"
        }, {
        "type" : 1,
        "image": "../images/prem.jpg",
        "text": 'lorem Lorem ipsum Aliqua reprehenderit minim sint ut anim in sed minim aute commodo ut nisi.,',
        "images": "../images/logo.png"
      }]
  };
  }
  getConversations(){
    //console.log(this.messages.text);
    if(this.state.messages == undefined){
      console.log("react-chat-bubble::", "'messages' props should be an array!");
      return;
    }
    const listItems = this.state.messages.map((message, index) => {
      let bubbleClass = '';
      let bubbleDirection = '';
      if(message.type === 0){
        bubbleClass = 'you';
        bubbleDirection = "bubble-direction-reverse";
      }
      return (
              <div className={`bubble-container ${bubbleDirection}`} key={index}>
                <img className={`img-circle`} src={message.image} />
                <div className={`bubble ${bubbleClass}`}>{message.text}
                <img className={`bubble ${bubbleClass}`}src={message.images}/></div>
               </div>
          );
    });
    return listItems;
  }
  render() {
    const {messages} = this.props;
    const chatList = this.getConversations();
    return (
          <div className="chats">
        {chatList}
      </div>
    );
  }
}
InteractionTimeLine.propTypes = {
  messages: React.PropTypes.array
};
export default InteractionTimeLine;