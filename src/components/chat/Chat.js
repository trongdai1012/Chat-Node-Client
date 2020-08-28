import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../input/Input';
import Messages from '../messages/Messages';

let socket;

const Chat = (props) => {
    const [name, setName] = useState('');
    const [roomCode, setRoomCode] = useState('ABC');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = 'localhost:4321';

    // let socket;

    useEffect(() => {
        // const room = "ABC";

        const userId = props.user.id;

        socket = io(ENDPOINT);

        // setName(name);
        // setRoomCode(room);

        socket.emit('join', { userId, roomCode }, () => {

        });

        return () => {
            socket.emit('disconnect');
            socket.off();
        }
        //[xxxx], cac thanh phan nam trong x chi duoc thuc hien lai khi co thay doi
    }, [ENDPOINT]);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        }, [messages]);
    }, [messages]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (message) {
            socket.emit('sendMessage', message, props.user.id, roomCode, () => setMessage(''));
        }
    }

    return (
        <div id="frame">
            <div id="sidepanel">
                <div id="profile">
                    <div className="wrap">
                        <img id="profile-img" src="http://emilcarlsson.se/assets/mikeross.png" className="online" alt="" />
                        <p>Mike Ross</p>
                        <i className="fa fa-chevron-down expand-button" aria-hidden="true" />
                        <div id="status-options">
                            <ul>
                                <li id="status-online" className="active"><span className="status-circle" /> <p>Online</p></li>
                                <li id="status-away"><span className="status-circle" /> <p>Away</p></li>
                                <li id="status-busy"><span className="status-circle" /> <p>Busy</p></li>
                                <li id="status-offline"><span className="status-circle" /> <p>Offline</p></li>
                            </ul>
                        </div>
                        <div id="expanded">
                            <label htmlFor="twitter"><i className="fa fa-facebook fa-fw" aria-hidden="true" /></label>
                            <input name="twitter" type="text" defaultValue="mikeross" />
                            <label htmlFor="twitter"><i className="fa fa-twitter fa-fw" aria-hidden="true" /></label>
                            <input name="twitter" type="text" defaultValue="ross81" />
                            <label htmlFor="twitter"><i className="fa fa-instagram fa-fw" aria-hidden="true" /></label>
                            <input name="twitter" type="text" defaultValue="mike.ross" />
                        </div>
                    </div>
                </div>
                <div id="search">
                    <label htmlFor><i className="fa fa-search" aria-hidden="true" /></label>
                    <input type="text" placeholder="Search contacts..." />
                </div>
                <div id="contacts">
                    <ul>
                        <li className="contact">
                            <div className="wrap">
                                <span className="contact-status online" />
                                <img src="http://emilcarlsson.se/assets/louislitt.png" alt="" />
                                <div className="meta">
                                    <p className="name">Louis Litt</p>
                                    <p className="preview">You just got LITT up, Mike.</p>
                                </div>
                            </div>
                        </li>
                        <li className="contact active">
                            <div className="wrap">
                                <span className="contact-status busy" />
                                <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
                                <div className="meta">
                                    <p className="name">Harvey Specter</p>
                                    <p className="preview">Wrong. You take the gun, or you pull out a bigger one. Or, you call their bluff. Or, you do any one of a hundred and forty six other things.</p>
                                </div>
                            </div>
                        </li>
                        <li className="contact">
                            <div className="wrap">
                                <span className="contact-status away" />
                                <img src="http://emilcarlsson.se/assets/rachelzane.png" alt="" />
                                <div className="meta">
                                    <p className="name">Rachel Zane</p>
                                    <p className="preview">I was thinking that we could have chicken tonight, sounds good?</p>
                                </div>
                            </div>
                        </li>
                        <li className="contact">
                            <div className="wrap">
                                <span className="contact-status online" />
                                <img src="http://emilcarlsson.se/assets/donnapaulsen.png" alt="" />
                                <div className="meta">
                                    <p className="name">Donna Paulsen</p>
                                    <p className="preview">Mike, I know everything! I'm Donna..</p>
                                </div>
                            </div>
                        </li>
                        <li className="contact">
                            <div className="wrap">
                                <span className="contact-status busy" />
                                <img src="http://emilcarlsson.se/assets/jessicapearson.png" alt="" />
                                <div className="meta">
                                    <p className="name">Jessica Pearson</p>
                                    <p className="preview">Have you finished the draft on the Hinsenburg deal?</p>
                                </div>
                            </div>
                        </li>
                        <li className="contact">
                            <div className="wrap">
                                <span className="contact-status" />
                                <img src="http://emilcarlsson.se/assets/haroldgunderson.png" alt="" />
                                <div className="meta">
                                    <p className="name">Harold Gunderson</p>
                                    <p className="preview">Thanks Mike! :)</p>
                                </div>
                            </div>
                        </li>
                        <li className="contact">
                            <div className="wrap">
                                <span className="contact-status" />
                                <img src="http://emilcarlsson.se/assets/danielhardman.png" alt="" />
                                <div className="meta">
                                    <p className="name">Daniel Hardman</p>
                                    <p className="preview">We'll meet again, Mike. Tell Jessica I said 'Hi'.</p>
                                </div>
                            </div>
                        </li>
                        <li className="contact">
                            <div className="wrap">
                                <span className="contact-status busy" />
                                <img src="http://emilcarlsson.se/assets/katrinabennett.png" alt="" />
                                <div className="meta">
                                    <p className="name">Katrina Bennett</p>
                                    <p className="preview">I've sent you the files for the Garrett trial.</p>
                                </div>
                            </div>
                        </li>
                        <li className="contact">
                            <div className="wrap">
                                <span className="contact-status" />
                                <img src="http://emilcarlsson.se/assets/charlesforstman.png" alt="" />
                                <div className="meta">
                                    <p className="name">Charles Forstman</p>
                                    <p className="preview">Mike, this isn't over.</p>
                                </div>
                            </div>
                        </li>
                        <li className="contact">
                            <div className="wrap">
                                <span className="contact-status" />
                                <img src="http://emilcarlsson.se/assets/jonathansidwell.png" alt="" />
                                <div className="meta">
                                    <p className="name">Jonathan Sidwell</p>
                                    <p className="preview"><span>You:</span> That's bullshit. This deal is solid.</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div id="bottom-bar">
                    <button id="addcontact"><i className="fa fa-user-plus fa-fw" aria-hidden="true" /> <span>Add contact</span></button>
                    <button id="settings"><i className="fa fa-cog fa-fw" aria-hidden="true" /> <span>Settings</span></button>
                </div>
            </div>
            <div className="content" style={{ width: '450px' }}>
                <InfoBar />
                <div className="messages">
                    <Messages messages={messages} name={name} />
                </div>
                <div className="message-input">
                    <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({ auth }) => ({
    user: auth.user
});


export default connect(mapStateToProps, null)(Chat);