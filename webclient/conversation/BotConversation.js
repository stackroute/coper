import React from 'react';
import Paper from 'material-ui/Paper';


class PaperBot extends React.Component {

render()
{
const style = {
  height: '88%',
  width: '99%',
  marginTop: '1%',
  textAlign: 'center',
  display: 'inline-block',
};
return(


<Paper style={style} zDepth={5} >
<h1>This is conversation timeline</h1>
</Paper>
	);
}

}
export default PaperBot;
