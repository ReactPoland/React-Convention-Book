import React from 'react';

/* Scroll messages widnow on load */

const ChatMessage = ({author, text}) => (
  <div className={'bubble ' + author}>
    {text}
  </div>
);

export default class ClientsTable extends React.Component {
  constructor(props) {
    super(props);
    this._onSubmit = this._onSubmit.bind(this);
  }

  _onSubmit(e) {
    e.preventDefault();
    this.props.onMessageSend(this.chatMessage.value);
    this.chatMessage.value = '';
    setTimeout(() => { this.chatMessageWindow.scrollTop = this.chatMessageWindow.scrollHeight; }, 10);
  }

  render() {
    return (
      <div className='chat'>
        <div className='messages clearfix' ref={node => { this.chatMessageWindow = node; }}>
        {this.props.messages.length ?
          this.props.messages.map((message, i) => <ChatMessage key={i} {...message} />)
          :
          <p className='empty'>No messages</p>
        }
        </div>
        <div className='sendMessage'>
          <form className='form-inline' onSubmit={this._onSubmit}>
            <input type='text' className='form-control' ref={node => { this.chatMessage = node; }} required /> <button type='submit' className='btn btn-default'>Send</button>
          </form>
        </div>
      </div>
    )
  }
}
