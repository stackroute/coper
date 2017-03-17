import React from 'react';
import Paper from 'material-ui/Paper';

class ActionResponse extends React.Component {
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
    <b>
    </b>
    </Paper>
    );

 }
}
export default ActionResponse;
