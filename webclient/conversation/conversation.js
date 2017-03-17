import React from 'react';

class ConversationMsgs extends React.Component {
  constructor()
  {
    super();
  }
  render() {
   const style={
     height: auto,
      width: auto,
      maxWidth: '50%',
      display: 'inline-block',
   };

   return(
    <div><br/>
    <br/>
    <br/>
    <h1 style={style}>Let your conversation begin...</h1></div>
    );

 }
}
export default ConversationMsgs;
