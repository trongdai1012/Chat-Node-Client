import React from 'react';

const Input = ({ setMessage, sendMessage, message }) => (
  <div className="wrap">
    <input
      type="text"
      placeholder="Write your message..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
    />
    <i className="fa fa-paperclip attachment" aria-hidden="true" />
    <button className="submit" onClick={e => sendMessage(e)}><i className="fa fa-paper-plane" aria-hidden="true" /></button>
  </div>
)

export default Input;