import React, { Component } from 'react';
import './answer-calendar.css'
import NextButton from "../NextButton/NextButton";
const dateStateStr = "בחר תאריך";

export default class AnswerCalendar extends Component {

    state = {
        currentDateShowing: new Date(),
        dateStr: dateStateStr,
        calendarVisible: false,
    };
    prevChosenDate = null;
    changeMonth = (increment) => {

        let copyDate = new Date(this.state.currentDateShowing);
        copyDate.setMonth(this.state.currentDateShowing.getMonth() + increment);
        this.setState({
            currentDateShowing: copyDate,
        })
    }
    chooseDate = (day) => {
        let copyDate = new Date(this.state.currentDateShowing);
        copyDate.setDate(day);
        let options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        this.setState({
            dateStr:copyDate.toLocaleDateString('he-IL', options),
            calendarVisible: false
        });
        this.prevChosenDate = copyDate;
    }

    openDate = () => {
        this.setState({
            calendarVisible: !this.state.calendarVisible
        })
    }

    isValidInput() {
        return this.state.dateStr !== dateStateStr;
    }

    render() {
        let options = {month: 'short', year: 'numeric'};
        let copyDate = new Date(this.state.currentDateShowing);
        let lastDayDate = new Date(copyDate.getFullYear(), copyDate.getMonth() + 1, 0);
        let lastDay = lastDayDate.getDate();
        let weeksToCreate = lastDay > 28 ? 5 : 4;
        let weeks = [];
        let days = [];

        for (let i = 1; i <= lastDay; ++i) {
            days.push(<th className="day" onClick={() => this.chooseDate(i)} style={{backgroundColor: this.prevChosenDate && this.prevChosenDate.getDate() === i &&
                this.prevChosenDate.getMonth() === this.state.currentDateShowing.getMonth() && this.prevChosenDate.getFullYear() === this.state.currentDateShowing.getFullYear()? "white" : ""}}>
                {i}</th>)
        }
        for (let i = 0; i < weeksToCreate; ++i) {
            weeks.push(<tr className="week">{days.slice((7) * i, (7) * i + 7)}</tr>)
        }
        return (

            <div className="calendar-wrapper">
                <div className="text-input-date" onClick={this.openDate}>
                    <div className="user-input">
                        {this.state.dateStr}
                    </div>
                    <div className="arrow-open-date"/>
                </div>
                {this.state.calendarVisible ?
                <div className="table-calendar" >
                    <div className="choose-month-wrapper">
                        <div className="arrow-clickable-area left-arrow-container" onClick={() => this.changeMonth(-1)}>
                        <i className="calendar-arrow left"/>
                        </div>
                        <div className="choose-month">{this.state.currentDateShowing.toLocaleDateString('he-IL', options).toUpperCase()}</div>
                        <div className="arrow-clickable-area right-arrow-container" onClick={() => this.changeMonth(1)}>
                        <i className="calendar-arrow right" />
                        </div>
                    </div>
                    <table>
                        <tbody className="calendar">{weeks}</tbody>
                    </table>
                </div> :

                this.isValidInput() ?

                    <NextButton currentNode={this.props.currentNode} nextButton={true} content={"הבא"} loc="25px" disableError={this.props.disableError} error={this.props.error}
                                answerNode={this.props.answerNode} createUser={this.props.createUser} addDataToDB={this.props.addDataToDB}/>
                 : ""}
            </div>
        )
    }
}