import React, { useState, useEffect } from 'react';
// import queryString from 'query-string';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../input/Input';
import Messages from '../messages/Messages';
import makeRequest from '../../libs/request';
import { Modal, Button } from 'antd';
import { Form } from 'react-bootstrap';

let socket;

const Chat = (props) => {
    const [roomId, setroomId] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [listRoom, setListRoom] = useState([]);
    const [inviteId, setInviteId] = useState('');
    const [showInvite, setShowInvite] = useState(false);
    const [roomName, setRoomName] = useState('');
    const ENDPOINT = 'localhost:4321';

    // let socket;

    useEffect(() => {

        socket = io(ENDPOINT);

        getRoomByUser();

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

    const joinChat = (roomId) => {
        socket.emit('join', { userId: props.user.id, roomId }, () => { });
    }

    const sendMessage = (e) => {
        e.preventDefault();
        setMessage('');
        if (message) {
            socket.emit('sendMessage', message, props.user.id, roomId, () => setMessage(''));
        }
    }

    const getRoomByUser = () => {
        makeRequest('get', `chat/getRoom`).then(({ data }) => {
            if (data.signal) {
                setListRoom(data.data);
                setroomId(data.data[0].id);
                setRoomName(data.data[0].name);
                joinChat(data.data[0].id);
                getMessageByRoomId(data.data[0].id);
            }
        }).catch(err => {
            alert(err);
        })
    }

    const getMessageByRoomId = (roomId) => {
        makeRequest('get', `chat/getMessageByRoomId?roomId=${roomId}`).then(({ data }) => {
            if (data.signal) {
                console.log('data.data.rows', data.data.rows)
                let listOldMess = data.data.rows.map(it => {
                    return { text: it.content, userId: it.userId }
                });

                setMessages(listOldMess.reverse());
            }
        }).catch(err => {
            alert(err);
        })
    }

    const addNewRoom = () => {
        if (!inviteId) {
            return alert('Vui lòng nhập id người dùng');
        }
        makeRequest('get', `chat/newChatRoom?userInvitedId=${inviteId}`).then(({ data }) => {
            if (data.signal) {
                getRoomByUser();
            }
        }).catch(err => {
            alert(err);
        })
    }

    const onCancelShowInvite = (e) => {
        e.preventDefault();
        setShowInvite(false);
    }

    const onShowInvite = (e) => {
        e.preventDefault();
        setShowInvite(true);
    }

    return (
        <>
            <div id="frame">
                <div id="sidepanel">
                    <div id="profile">
                        <div className="wrap">
                            <img id="profile-img" src="http://emilcarlsson.se/assets/mikeross.png" className="online" alt="" />
                            <p>{props.user && props.user.name}</p>
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
                        <label><i className="fa fa-search" aria-hidden="true" /></label>
                        <input type="text" placeholder="Search contacts..." />
                    </div>
                    <div id="contacts">
                        <ul>
                            {listRoom && listRoom.length ? listRoom.map((item, idx) => {
                                return <li className="contact" key={idx}>
                                    <div className="wrap">
                                        <span className="contact-status online" />
                                        <img src="http://emilcarlsson.se/assets/louislitt.png" alt="" />
                                        <div className="meta">
                                            <p className="name">{item.name}</p>
                                            <p className="preview">{item.messages && item.messages[0].content || ''}</p>
                                        </div>
                                    </div>
                                </li>
                            }) : null}
                        </ul>
                    </div>
                    <div id="bottom-bar">
                        <button id="addcontact" onClick={(e) => onShowInvite(e)}><i className="fa fa-user-plus fa-fw" aria-hidden="true" /> <span>Add contact</span></button>
                        <button id="settings"><i className="fa fa-cog fa-fw" aria-hidden="true" /> <span>Settings</span></button>
                    </div>
                </div>
                <div className="content" style={{ width: '450px' }}>
                    <InfoBar roomName={roomName} />
                    <div className="messages">
                        <Messages messages={messages} name={roomName} userId={props.user.id} />
                    </div>
                    <div className="message-input">
                        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
                    </div>
                </div>
            </div>
            <Modal
                title='Mời trò truyện'
                visible={showInvite}
                onCancel={onCancelShowInvite}
                footer={[
                    <Button type="default" onClick={onCancelShowInvite} className="btn btn-label-secondary btn-secondary">
                        Đóng
                    </Button>,
                    <Button onClick={e => addNewRoom(e)} className="btn btn-label-primary btn-primary">
                        <span>Mời</span>
                    </Button>
                ]}
            >
                <Form.Control
                    type="text"
                    placeholder="id người dùng"
                    value={inviteId}
                    onChange={(e) => setInviteId(e.target.value)}
                    autoFocus={true}
                />
            </Modal>
        </>
    )
}

const mapStateToProps = ({ auth }) => ({
    user: auth.user
});


export default connect(mapStateToProps, null)(Chat);