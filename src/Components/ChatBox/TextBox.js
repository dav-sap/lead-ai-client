import React, {Component} from "react";
import Type from 'react-type';

export default class TextBox extends Component {
  render() {
      return (
              <div className="text-wrapper">
                  <Type cursorColor={"#ffe500"} cursorWidth={14} className="text-typer">
                      שלום אחי מה שלומך? אני מקווה שהכל טוב איתך אנחנו באנו לעזור לך למצוא את הפתרון המושלם בשבילך.. יום טוב..
                  </Type>
              </div>)
  }
}