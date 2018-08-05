import React, { Component } from 'react';
import Loader from "../Loader";
import NextButton from "../NextButton/NextButton";
import './answer-options.css'

export default class AnswerOptions extends Component {
    state = {
        sendLoading: false,
    };
    answerClicked = (answer) => {
        console.log(answer);
        this.setState({sendLoading: true});
        let nextNode = this.props.bot.traverser().searchBFS(function(data){
            return data.content === answer;
        });
        this.props.addDataToDB(this.props.currentNode.data().content, answer, nextNode.childNodes()[0]);
    };
    render() {
        return (
            <div className="answer-options-wrapper">
                {!this.state.sendLoading ?
                    <div style={{display: "flex",flexDirection: "row",}}>
                        {this.props.currentNode.childNodes().map((node, index) => {
                            return <NextButton currentNode={this.props.currentNode} disableError={this.props.disableError}
                                               nextButton={false} content={node.data().content} key={index}
                                               onClick={() => this.answerClicked(node.data().content)}
                                               answerNode={this.props.answerNode} createUser={this.props.createUser}
                                               addDataToDB={this.props.addDataToDB} inputText={node.data().content}/>

                        })
                        }

                    </div>
                : <div className="loader-wrapper" style={{visibility: !this.state.sendLoading ? "hidden" :"visible", position: "relative"}}>
                        <Loader/>
                    </div>}

        </div>)
    }
}