import React from 'react';
import Paper from 'material-ui/Paper';

class InterruptedResponse extends React.Component {
  constructor()
  {
    super();
  }

  static get contextTypes() {
        return {response: React.PropTypes.object.isRequired};
  }

  render() {
   const style={
     height: 'auto',
      width: 'auto',
      maxWidth: '50%',
      display: 'inline-block',
   };

   return(

<Paper style={style} zDepth={5} >
    <b>Lorem ipsum Ea minim id sunt aliqua consectetur consequat elit veniam proident eiusmod dolore laboris nostrud Ut commodo sint ut voluptate.</b>
    </Paper>
    );

 }
}
export default InterruptedResponse;
