import React from 'react';
import Paper from 'material-ui/Paper';
import PaperText from './PaperForTextField.js';
import PaperBot from './BotConversation.js';
import {Container, Grid, Row, Col, ScreenClassRender} from 'react-grid-system';
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
<ScreenClassRender style={styleFunction}>
<Paper zDepth={5}>

<PaperBot/>
<PaperText/>

</Paper>
</ScreenClassRender>
</Container>

	);
}
}
export default ConversationView;
