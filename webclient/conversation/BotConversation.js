import React from 'react';
import Paper from 'material-ui/Paper';
import ConversationMsgs from '../conversationRoutes/acknowledgementHandler.jsx'


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


<Paper style={style} zDepth={1} >
<ConversationMsgs/>

</Paper>
	);
}

}
export default PaperBot;
