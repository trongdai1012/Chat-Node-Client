import React from 'react';

const Messages = ({ messages, userId }) => {

  return <ul>
    {messages && messages.map((item, key) => {
      return userId == item.userId ? <li className="sent" key={key}>
        <img src={item.avatar ? `/images/${item.avatar}` : '/images/avatar-default.png'} alt="" />
        <p>{item.text}</p>
      </li> :
        <li className="replies" key={key}>
          <img src={item.avatar ? `/images/${item.avatar}` : '/images/avatar-default.png'} alt="" />
          <p>{item.text}</p>
        </li>
    })}
  </ul>
};

export default Messages;