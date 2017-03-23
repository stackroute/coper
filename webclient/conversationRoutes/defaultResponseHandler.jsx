import React from 'react';
import Paper from 'material-ui/Paper';

class DefaultResponse extends React.Component {
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
      paddingLeft : '5px',
      paddingRight : '5px',
      paddingTop : '10px',
      paddingBottom : '10px',
      marginLeft: '10px',
      float: 'left',
      backgroundColor: '#FFBF00',
   };

   return(

<Paper style={style} zDepth={5} >
    <b>I want to know the traffic today in my area, Can you help me with That?</b>
    </Paper>
    );

 }
}
export default DefaultResponse;
