import React from 'react';
import DayPicker from 'react-day-picker';

export default class DashboardCalendar extends React.Component {
  constructor(props) {
    super(props);
    //Set current day as active by default
    this.state = {
      selectedDay: this.props.activeDay
    };
    this._handleDayClick = this._handleDayClick.bind(this);
  }

  _handleDayClick(e, day, modifiers) {
    //Saves current date in state
    this.setState({ selectedDay: day });
    //Callback to parent component (returns clicked day in Date() format)
    this.props.onCalendarDayClick(day);
  }

  render() {
    const { selectedDay } = this.state;
    const modifiers = {
      selected(day) {
        //Adds '--selected' CSS class to clicked day element
        return day.getDate() === selectedDay.getDate() &&
               day.getMonth() === selectedDay.getMonth() &&
               day.getFullYear() === selectedDay.getFullYear();
      }
    }
    return (
      <div className="dashboard-calendar">
        <DayPicker modifiers={ modifiers } onDayClick={ this._handleDayClick } />
      </div>
    )
  }
}
