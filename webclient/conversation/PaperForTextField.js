import React from 'react';
import Paper from 'material-ui/Paper';
class PaperText extends React.Component {

render()
{
const style = {
  minHeight: '1%',
  height: '8%',
  maxHeight: '10%',
  width: '99%',
  marginTop: '1vh',
  textAlign: 'left',
  display: 'inline-block',
};

return(


 <Paper style={style} zDepth={5}/>

	);
}
}
export default PaperText;
