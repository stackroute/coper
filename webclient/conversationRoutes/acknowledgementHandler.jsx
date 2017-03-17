import React from 'react';
import Paper from 'material-ui/Paper';

class ConversationMsgs extends React.Component {
  constructor()
  {
    super();
  }
  render() {
    console.log('me hun andaar');
   const style={
     height: 'auto',
      width: 'auto',
      maxWidth: '50%',
      display: 'inline-block',
   };

   return(

<Paper style={style} zDepth={5} >
    <b>Let your conversation begin... hsadga uatdsi jagdiag ua dgi adiga
    adhgjagd
    shjgjhsgjgs
    sdhfjgs
    sfgkjg</b>
    </Paper>
    );

 }
}
export default ConversationMsgs;
