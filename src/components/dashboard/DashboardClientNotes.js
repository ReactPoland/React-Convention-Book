import React from 'react';
import { Link } from 'react-router';

//Extracts notes for particular date
const extractNotes = (clients, date) => {
  let extractedNotes = [];
  //For each client...
  clients.forEach(client => {
    //If client has any notes...
    if (client.notes.length) {
      //Create client's object
      let clientObj = {
        FirstName: client.FirstName,
        LastName: client.LastName,
        Id: client.Id,
        notes: []
      }
      //For each note...
      client.notes.forEach(note => {
        //If note's date is equal to date passed to function...
        let noteDate = new Date(note.date);
        if (noteDate.getDate() === date.getDate() && noteDate.getMonth() === date.getMonth() && noteDate.getFullYear() === date.getFullYear()) {
          //Push that note into client's object
          clientObj.notes.push(note);
        }
      })
      //If there were some notes found, push them to array that'll be returned
      if (clientObj.notes.length) extractedNotes.push(clientObj);
    }
  });
  return extractedNotes;
};

const Note = ({status, text}) => (
  <li className={status ? 'list-group-item list-group-item-' + status : 'list-group-item' }>
    {text}
  </li>
);

const Client = ({FirstName, LastName, Id, notes}) => (
  <div className='client'>
    <Link to={'/clients/' + Id}>{FirstName} {LastName}</Link>
    <ul className='list-group'>
      {notes.map((note, i) =>
        <Note key={i} {...note} />
      )}
    </ul>
  </div>
);

const ClientNotes = ({notes}) => (
  <div className='notes'>
    {notes.map((client, i) =>
      <Client key={i} {...client} />
    )}
  </div>
);

export default class DashboardClientNotes extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let activeDate = this.props.activeDay; //Active day
        
    let oneDayBefore = new Date(activeDate.getTime()); //One day before
    oneDayBefore.setDate(activeDate.getDate() - 1);

    let twoDaysBefore = new Date(activeDate.getTime()); //Two days before
    twoDaysBefore.setDate(activeDate.getDate() - 2);
    
    //Get notes from clients for each date
    let resultToday = extractNotes(this.props.clients, activeDate);
    let resultOneDayBefore = extractNotes(this.props.clients, oneDayBefore);
    let resultTwoDaysBefore = extractNotes(this.props.clients, twoDaysBefore);

    return (
      <div className='dashboard-client-notes'>
        <h4>Today ({activeDate.toLocaleDateString()})</h4>
        {
          resultToday.length ?
            <ClientNotes notes={resultToday} />
            :
            <span>No notes on this day</span>
        }
        <h4>Yesterday ({oneDayBefore.toLocaleDateString()})</h4>
        {
          resultOneDayBefore.length ?
            <ClientNotes notes={resultOneDayBefore} />
            :
            <span>No notes on this day</span>
        }
        <h4>2 days ago ({twoDaysBefore.toLocaleDateString()})</h4>
        {
          resultTwoDaysBefore.length ?
            <ClientNotes notes={resultTwoDaysBefore} />
            :
            <span>No notes on this day</span>
        }
      </div>
    )
  }
}
