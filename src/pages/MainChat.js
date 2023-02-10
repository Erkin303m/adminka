import { Helmet } from 'react-helmet-async';
import { Button, Container, Stack } from '@mui/material';
import './style.css';
import { w3cwebsocket as Socket } from 'websocket';
import { get } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import { CiPaperplane } from 'react-icons/ci';

export default function MainChat() {
  const location = useLocation();
  const navigation = useNavigate();
  // console.log('Tanlangan User', get(location, 'state.item', 0));
  // console.log('isWrited', get(location, 'state.isWrited', 0));

  const [myMessage, setMyMessage] = useState([]);
  const [isWrited, setIsWrited] = useState(get(location, 'state.isWrited', 0));
  const [userId, setUserId] = useState(get(location, 'state.item', 0));
  const [changingMessage, setChangingMessage] = useState('');
  const [newUserId, setNewUserId] = useState(get(location, 'state.item.user', 0));
  const [mainID, setMainId] = useState(0);

  const [once, setOnce] = useState(0);

  const cat = JSON.parse(localStorage.getItem('userData'));

  const socket = new Socket(`ws://185.217.131.179:8004/chat/?token=${get(cat, 'access', '')}`);

  useEffect(() => {
    if (get(location, 'state.item.users[0].phone_number', 0) !== get(cat, 'data.phone_number', 0)) {
      setMainId(get(location, 'state.item.users[0]._id', 0));
    } else {
      setMainId(get(location, 'state.item.users[1]._id', 0));
    }
    socket.onopen = () => {
      if (isWrited === 1) {
        socket.send(
          JSON.stringify({
            action: 'get_messages_by_room',
            pk: userId.roomId,
            request_id: 110055,
            page: 1,
            page_size: 30,
          })
        );
      } else {
        socket.send(
          JSON.stringify({
            action: 'create_room',
            request_id: Math.random() * 1000000000,
            members: [newUserId],
            is_gruop: false,
          })
        );
      }
    };
    socket.onmessage = (data) => {
      const someData = JSON.parse(data.data);
      if (get(someData, 'action', '') === 'messages') {
        setMyMessage(get(someData, 'data.result', []));
      } else if (get(someData, 'action', '') === '_room_changed') {
        setMyMessage((pr) => [
          ...pr,
          {
            ...get(someData, 'data.lastMessage', {}),
            phone_number: someData.username,
          },
        ]);
      }
      //  else if (get(someData, 'action', '') === '_delete_message') {
      //   deleting()
      // }
      console.log('Xabar keldi', someData);
      get(someData, 'action', '');
    };
  }, []);

  console.log('mainID', mainID);
  const handleKeyDown = (event) => {
    setOnce(1);
    if (event.key === 'Enter') {
      socket.send(
        JSON.stringify({
          action: 'send_message',
          pk: userId.roomId,
          request_id: Math.random() * 10000,
          senderId: mainID,
          username: 'Вы',
          avatar: '',
          content: event.target.value,
          date: 'Sat Jan 28 2023',
          timestamp: '2023-01-27T19:05:22.514Z',
          system: false,
          saved: true,
          distributed: true,
          seen: true,
          deleted: false,
          failure: true,
          disableActions: false,
          disableReactions: true,
          reactions: null,
        })
      );
      event.target.value = '';
    }
  };
  const deleting = (i) => {
    socket.send(
      JSON.stringify({
        action: 'delete_message',
        pk: userId.roomId,
        request_id: 1675870270466,
        message_id: i,
      })
    );

    // const a = [...myMessage];
    // a.splice(i, 1);
    // // setMyMessage(a);
    // console.log("delet qilingan array",a.splice(i, 1))
  };

  return (
    <>
      <Helmet>
        <title> Chat </title>
      </Helmet>

      <Container>
        <button onClick={() => navigation('/dashboard/chat')} className="buttonBack">
          <BiArrowBack />
        </button>
        <Stack>
          <div className="topUserCard">
            <div className="nameCard2">
              <h1 className="word55">
                {get(location, 'state.item.first_name', 0) === 0
                  ? get(location, 'state.item.roomName', '')
                  : get(location, 'state.item.roomName', '')}{' '}
                {'  '} {get(location, 'state.item.last_name', '')}
              </h1>
            </div>
            <p className="word55">{get(location, 'state.item.phone_number', '')}</p>
          </div>
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <div className="someCard">
            <div className="mainMassageCard">
              {myMessage.map((v, i) => {
                return (
                  <div
                    className={
                      get(v, 'username', '') !== get(cat, 'data.phone_number', 0) ? 'cardMassage1' : 'cardMassage2'
                    }
                    key={i}
                    onDoubleClick={() => deleting(i)}
                  >
                    <div
                      className={
                        get(v, 'username', '') !== get(cat, 'data.phone_number', 0) ? 'colorCard1' : 'colorCard2'
                      }
                    >
                      <p>{get(v, 'content', '')}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Stack>

        <Stack>
          <div className="card333">
            <input
              type="text"
              placeholder="Message..."
              className="input22"
              // onChange={(e) => setChangingMessage(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e)}
            />
            <button onClick={() => console.log('send')} className="sendDataButton">
              <CiPaperplane />
            </button>
          </div>
        </Stack>
      </Container>
    </>
  );
}
