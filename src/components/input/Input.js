import React from 'react';

const Input = ({ setMessage, sendMessage, message }) => {
  const sendMess = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage(e);
    }
  }

  const onChangeValue = (e) => {
    e.preventDefault();

    setMessage(e.target.value);
  }

  return <div className="wrap">
    <input
      type="text"
      placeholder="Write your message..."
      value={message}
      onChange={(e) => onChangeValue(e)}
      onKeyDown={(e) => sendMess(e)}
    />
    <i className="fa fa-paperclip attachment" aria-hidden="true" />
    <button className="submit" onClick={event => { event.preventDefault(); sendMessage(event) }}><i className="fa fa-paper-plane" aria-hidden="true" /></button>
  </div>
}

export default Input;