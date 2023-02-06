import { Helmet } from 'react-helmet-async';
import { Button, Container, Stack } from '@mui/material';
import './style.css';
import { w3cwebsocket as Socket } from 'websocket';
import { get } from 'lodash';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import { CiPaperplane } from 'react-icons/ci';

export default function MainChat() {
  const location = useLocation();
  console.log('Tanlangan User', get(location, 'state.item', 0));
  // console.log('isWrited', get(location, 'state.isWrited', 0));

  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [myMessage, setMyMessage] = useState([]);
  const [roomID, setRoomID] = useState(0);
  const [isWrited, setIsWrited] = useState(get(location, 'state.isWrited', 0));
  const [userId, setUserId] = useState(get(location, 'state.item', 0));
  const [changingMessage, setChangingMessage] = useState('');
  const [newUserId, setNewUserId] = useState(get(location, 'state.item.user', 0));

  const [once, setOnce] = useState(0);

  const navigation = useNavigate();
  const cat = JSON.parse(localStorage.getItem('userData'));

  const socket = new Socket(`ws://185.217.131.179:8004/chat/?token=${get(cat, 'access', '')}`);

  useEffect(() => {
    socket.onopen = () => {
      if (isWrited === 1) {
        socket.send(
          JSON.stringify({
            action: 'get_messages_by_room',
            pk: userId.roomId,
            request_id: 11005,
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
      console.log('Xabar keldi', someData);
      setMyMessage(someData);
    };
  }, []);

  const Allmesages = () => {
    socket.send(
      JSON.stringify({
        action: 'get_messages_by_room',
        pk: 1,
        request_id: 1100,
        page: 1,
        page_size: 30,
      })
    );
  };

  const createRoom = () => {
    // console.log(userId.user);
    socket.send(
      JSON.stringify({
        action: 'create_room',
        request_id: 88,
        members: [userId.user],
        is_gruop: false,
      })
    );
  };

  // const tekshirish = () => {
  //   if (isWrited === 1) {
  //     socket.send(
  //       JSON.stringify({
  //         action: 'get_messages_by_room',
  //         pk: 1,
  //         request_id: 1100,
  //         page: 1,
  //         page_size: 30,
  //       })
  //     );
  //   } else {
  //     socket.send(
  //       JSON.stringify({
  //         action: 'create_room',
  //         request_id: 828,
  //         members: [userId.user],
  //         is_gruop: false,
  //       })
  //     );
  //   }
  // };

  const handleKeyDown = (event) => {
    setOnce(1);
    if (event.key === 'Enter' && isWrited === 1) {
      socket.send(
        JSON.stringify({
          action: 'send_message',
          pk: userId.roomId,
          request_id: Math.random() * 10000,
          senderId: userId.lastMessage.senderId,
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

      socket.onmessage = (data) => {
        const someData = JSON.parse(data.data);
        setMyMessage('handlekey dagi data:', someData);
      };

      // const fakeData = [...myMessage];
      // fakeData.push({
      //   avatar: null,
      //   content: event.target.value,
      //   date: '05 February',
      //   deleted: false,
      //   disableActions: false,
      //   disableReactions: false,
      //   distributed: false,
      //   files: null,
      //   indexId: 48,
      //   reactions: [],
      //   replyMessage: null,
      //   roomId: userId.roomId,
      //   saved: true,
      //   seen: false,
      //   senderId: 6,
      //   system: false,
      //   timestamp: '14:47',
      //   username: '+998908181183',
      //   _id: 54,
      // });
      // setMyMessage(fakeData);
    } else {
      socket.send(
        JSON.stringify({
          action: 'send_message',
          pk: myMessage.room,
          request_id: Math.random() * 10000,
          senderId: newUserId,
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

  return (
    <>
      <Helmet>
        <title> Чат </title>
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
              {get(myMessage, 'data.result', []).map((v, i) => {
                return (
                  <div
                    className={
                      get(v, 'username', '') !== get(cat, 'data.phone_number', 0) ? 'cardMassage1' : 'cardMassage2'
                    }
                    key={i}
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
            <button onClick={() => Allmesages(changingMessage)} className="sendDataButton">
              <CiPaperplane />
            </button>
          </div>
        </Stack>
      </Container>
    </>
  );
}
