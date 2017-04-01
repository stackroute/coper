import React from 'react';
import ResponseViewContextUtil from  './ResponseHandlerContextUtil.jsx';
import AcknowledgementHandler from '../conversationRoutes/AcknowledgementHandler.jsx';
import ActionResponseHandler from '../conversationRoutes/ActionResponseHandler.jsx';
import DefaultResponseHandler from  '../conversationRoutes/DefaultResponseHandler.jsx';
import InterruptedResponseHandler from '../conversationRoutes/InterruptedResponseHandler.jsx';
import './interaction.css';
export default class InteractionTimeLine extends React.Component {
    constructor() {
        super();

        this.state = {
            responses: [
            {
                contentType: 'shorttext',
                content:'# This is a header\n\nAnd this is a paragraph',
                purpose:'Acknowledgement'
            },
            {
                contentType: 'shorttext',
                content:'# This is a header\n\nAnd this is a actionresponse',
                purpose:'Actionresponse'
            },
            {
                contentType: 'shorttext',
                content:'# This is a header\n\nAnd this is a defaultresponse',
                purpose:'Defaultresponse'
            },
            {
                contentType: 'shorttext',
                content:'# This is a header\n\nAnd this is a Interruptedresponse',
                purpose:'Interruptedresponse'
            },
                ],
            error: ''
        };
    }
    getResponseRendererMap() {
        return {
            Acknowledgement: <AcknowledgementHandler/>,
            Actionresponse: <ActionResponseHandler/>,
            Defaultresponse: <DefaultResponseHandler/>,
            Interruptedresponse: <InterruptedResponseHandler/>
        };
    }
		    render() {
        console.log("inside");
        return (
            <div>
            {
                this.state.responses.map((respObj) => {
                    return (
                        <div key={respObj.purpose}>
                        <ResponseViewContextUtil response={respObj}>
                        {
                            this.getResponseRendererMap()[respObj.purpose]
                        }
                        </ResponseViewContextUtil>
                        </div>
                        )
                })
            }
            </div>
            );
    }
}


