import { Helmet } from 'react-helmet-async';
import { Button, Container, Stack } from '@mui/material';
import './style.css';
import { w3cwebsocket as Socket } from 'websocket';
import { get } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import { CiPaperplane } from 'react-icons/ci';
import Swal from 'sweetalert2';

export default function MainChat() {
  const location = useLocation();
  const navigation = useNavigate();

  const [myMessage, setMyMessage] = useState([]);
  const [userId, setUserId] = useState(get(location, 'state.item', 0));
  const [mainID, setMainId] = useState(0);

  const cat = JSON.parse(localStorage.getItem('userData'));

  const socket = new Socket(`ws://185.217.131.179:8004/chat/?token=${get(cat, 'access', '')}`);

  useEffect(() => {
    if (get(location, 'state.item.users[0].phone_number', 0) !== get(cat, 'data.phone_number', 0)) {
      setMainId(get(location, 'state.item.users[0]._id', 0));
    } else {
      setMainId(get(location, 'state.item.users[1]._id', 0));
    }
    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          action: 'get_messages_by_room',
          pk: userId.roomId,
          request_id: 110055,
          page: 1,
          page_size: 30,
        })
      );
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
    };
  }, []);

  const handleKeyDown = (event) => {
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

  const isDeleting = (i) => {
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        deleting(i);
      } else if (result.isDenied) {
        Swal.fire('Message is not deleted', '', 'info');
      }
    });
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
                    onDoubleClick={() => isDeleting(get(v, '_id', ''))}
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
              onKeyDown={(e) => handleKeyDown(e)}
            />
            <button  className="sendDataButton" onClick={(e) => handleKeyDown(e)} >
              <CiPaperplane />
            </button>
          </div>
        </Stack>
      </Container>
    </>
  );
}
