import React from 'react';
import TextField from 'material-ui/TextField';
// import SvgIconarea from './SvgComponent.js';
class TextFieldarea extends React.Component
{

render(props)
{
const styles = {

      paddingLeft: '1%',
      paddinRight: '1%',
      width: '90%',
      marginBottom: '2px',
    // marginTop:730,
    // marginLeft:-840

};


return(

  <div>
      <TextField
    hintText="Start Typing..." fullWidth={false} multiLine={false} style={styles}/>


    </div>
  );
}
}

export default TextFieldarea;
