import React from 'react';
import DayPicker from 'react-day-picker';

export default class ClientsCalendar extends React.Component {
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
    const noteDates = this.props.noteDates;
    const modifiers = {
      selected(day) {
        //Adds '--selected' CSS class to clicked day element
        return day.getDate() === selectedDay.getDate() &&
               day.getMonth() === selectedDay.getMonth() &&
               day.getFullYear() === selectedDay.getFullYear();
      },
      notes(day) {
        //For each 'day' in current calendar view check if it's date matches any dates from noteDates array
        let hasNotes;
        for (let i = 0; i < noteDates.length; i++) {
          let noteDay = new Date(noteDates[i]);
          //console.log(noteDay);
          hasNotes = day.getDate() === noteDay.getDate() && day.getMonth() === noteDay.getMonth() && day.getFullYear() === noteDay.getFullYear();
          if (hasNotes) break;
        }
        return hasNotes;
      }
    }
    return (
      <div className="clients-calendar">
        <DayPicker modifiers={ modifiers } onDayClick={ this._handleDayClick } />
      </div>
    )
  }
}
