import React from 'react';
import ResponseHandlerContextUtil from './ResponseHandlerContextUtil.jsx';
import AcknowledgementHandler from '../conversationRoutes/AcknowledgementHandler.jsx';
import ActionResponseHandler from '../conversationRoutes/ActionResponseHandler.jsx';
import DefaultResponseHandler from '../conversationRoutes/DefaultResponseHandler.jsx';
import InterruptedResponseHandler from '../conversationRoutes/InterruptedResponseHandler.jsx';
import './interaction.css';

export default class InteractionTimeLine extends React.Component {
    static propTypes = {
      responses: React.PropTypes.array
    };

    constructor() {
        super();
        this.state = {
                           error: ''
        };
    }

    getResponseRendererMap() {
        return {
            Acknowledgement: <AcknowledgementHandler />,
            Actionresponse: <ActionResponseHandler/>,
            Defaultresponse: <DefaultResponseHandler/>,
            Interruptedresponse: <InterruptedResponseHandler/>
        };
    }
    render() {
        return (
            <div>
                {this.props.responses.map((respObj, index) => {
                    return (
                        <div key={index}>
                            <ResponseHandlerContextUtil response={respObj}>
                                {this.getResponseRendererMap()[respObj.purpose]}
                            </ResponseHandlerContextUtil>
                        </div>
                    )
                })}
            </div>
        );
    }
}
