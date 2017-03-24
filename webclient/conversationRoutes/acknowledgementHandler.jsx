import React from 'react';
import Paper from 'material-ui/Paper';

class AcknowledgementResponse extends React.Component {
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
      float: 'right',
      paddingTop: '10px',
      paddingLeft: '5px',
      paddingRight: '5px',
      marginRight: '10px',
      paddingBottom : '10px',
      backgroundColor: '#FD8800',
   };

   return(

<Paper style={style} zDepth={5} >
    <b>Hi There ! I am Lucy Your Personal Assistant, How may I help You....</b>
    </Paper>
    );

 }
}
export default AcknowledgementResponse;
