import React from 'react';
import Paper from 'material-ui/Paper';
// import PaperText from './PaperForTextField.js';
import PaperBot from './BotConversation.js';
import InstructionProcessor from './instructionProcessor';
import {Container, Grid, Row, Col, ScreenClassRender, Hidden } from 'react-grid-system';
class ConversationView extends React.Component
{
	render()
	{
		const styleFunction = (screenClass) => {
				if (screenClass === 'xl')
						return { height: '95vh',
											width: '100vw',
											 marginLeft: '20%',
											textAlign: 'center',
											display: 'inline-block',
						};
				if (screenClass === 'lg')
						return { height: '95vh',
											width: '100vw',
											marginLeft: '20%',
											textAlign: 'center',
											display: 'inline-block',
						};
				if (screenClass === 'md')
						return { height: '95vh',
											width: '100vw',
											// marginLeft: '20%',
											textAlign: 'center',
											display: 'inline-block',
						};
				if (screenClass === 'sm')
						return { height: '95vh',
											width: '100vw',
											// marginLeft: '20%',
											textAlign: 'center',
											display: 'inline-block',
						};
				return { height: '95vh',
									width: '100vw',
									// marginLeft: '20%',
									textAlign: 'center',
									display: 'inline-block',
				};
		};
return(
<Container fluid>
<Row>
<Hidden xs sm>
<Col md={2} lg={2} style={{height: '100vh'}}></Col>
</Hidden>
<Col xs={12} sm={12} md={10} lg={10} style={{height: '100vh'}}>
<Row>
<Col xs={12} sm={12} md={12} lg={12} style={{height: '90vh'}}></Col>
<Col xs={12} sm={12} md={12} lg={12}><InstructionProcessor/></Col>
</Row>
</Col>
</Row>


</Container>

	);
}
}
export default ConversationView;
