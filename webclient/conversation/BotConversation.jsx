import React from 'react';
import Paper from 'material-ui/Paper';
import DefaultResponse from '../conversationRoutes/DefaultResponseHandler.jsx';
import InstructionProcessor from './instructionProcessor.jsx';



class PaperBot extends React.Component {
constructor(props) {
	super(props);
}

handleMesage(msg){
console.log(msg);
}

render()
{
const style = {
  height: '95%',
  width: '99%',
  marginTop: '1%',
  textAlign: 'center',
  display: 'inline-block',
  backgroundColor: '#EEF3F2',
};
// const divstyle = {
//   padding : '5px;',
//   marginTop: '10px',
// }
return(


<div style={style}>
<div><InstructionProcessor handleMesage={this.handleMesage.bind(this)}/>
<DefaultResponse/></div>


</div>
	);
}

}
export default PaperBot;
