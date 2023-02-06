import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { Stack, Button, Container, Typography } from '@mui/material';
import axios from 'axios';
import { get } from 'lodash';
import swal from 'sweetalert';
import { useLocation } from 'react-router-dom';

import Iconify from '../components/iconify';

export default function UserPage() {
  const location = useLocation();

  const [driver, setDriver] = useState('');
  const [drivers, setDrivers] = useState([]);
  const [manager, setManager] = useState('');
  const [message, setMessage] = useState('');
  const [managerdata, setManagerdata] = useState([]);
  const [orderID, setOrderID] = useState(get(location, 'state.id', 0));

  const cat = JSON.parse(localStorage.getItem('userData'));
  console.log(cat);

  // create order states
  const [userName, setUserName] = useState('');
  const [firstPayment, setFirstPayment] = useState('');
  const [waiting, setWaiting] = useState('');
  const [drop, setDrop] = useState('');
  const [owner, setOwner] = useState('');
  const [massa, setMassa] = useState('');
  const [info, setInfo] = useState('');
  const [status, setStatus] = useState('');
  const [country, setCuntry] = useState('');
  const [city, setCity] = useState('');
  const [packages, setPackages] = useState('');
  const [cash, setCash] = useState('');
  const [fullPayment, setfullPayment] = useState('');
  const [countrySending, setCountrySending] = useState('');
  const [countryPending, setCountryPending] = useState('');
  const [citySending, setCitySending] = useState('');
  const [cityPending, setCityPending] = useState('');
  const [customs, setCustoms] = useState('');

  useEffect(() => {
    getDriver();
    getManager();
  }, []);

  const sendData = async () => {
    console.log(driver, manager);
    const config = {
      headers: {
        Authorization: `Bearer ${get(cat, 'access', '')}`,
      },
    };
    await axios
      .post(
        `http://185.217.131.179:8888/api/v1/company/dashboard/manager/${orderID}/add_truck_to_order/`,
        {
          driver,
          manager,
        },
        config
      )
      .then((ress) => {
        console.log('success', ress);
        swal({
          title: 'Продукт успешно добавлен!',
          text: 'Ознакомьтесь с добавленным товаром в разделе Заявки',
          icon: 'success',
          dangerMode: false,
          timer: 3000,
        });
      })
      .catch((err) => {
        console.log('error', err);
        swal({
          title: 'Информация введена неверно, проверьте интернет!',
          icon: 'error',
          dangerMode: true,
          timer: 3000,
        });
      });
  };

  const getTruck = async (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${get(cat, 'access', '')}`,
      },
    };
    await axios
      .get(`http://185.217.131.179:8888/api/v1/company/truck/create/?driver=${id}`, config)
      .then((ress) => {
        console.log('success getTruck', ress.data);
        setDriver(get(ress, 'data.results[0].id', 0));
      })
      .catch((err) => {
        console.log('error', err);
      });
  };

  const changeDriverLoaction = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${get(cat, 'access', '')}`,
      },
    };
    await axios
      .post(
        `http://185.217.131.179:8888/api/v1/company/dashboard/manager/${driver}/update_truck_location/`,
        {
          truck_location: message,
        },
        config
      )
      .then((ress) => {
        console.log('success', ress);
        swal({
          title: 'Продукт успешно добавлен!',
          text: 'Ознакомьтесь с добавленным товаром в разделе Заявки',
          icon: 'success',
          dangerMode: false,
          timer: 3000,
        });
      })
      .catch((err) => {
        console.log('error', err);
        swal({
          title: 'Информация введена неверно, проверьте интернет!',
          icon: 'error',
          dangerMode: true,
          timer: 3000,
        });
      });
  };

  const getDriver = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${get(cat, 'access', '')}`,
      },
    };

    await axios
      .get(`http://185.217.131.179:8888/api/v1/company/staff-create/?driver=driver`, config)
      .then((ress) => {
        setDrivers(get(ress, 'data.results'));
        console.log('getDriver', get(ress, 'data.results'));
      })
      .catch((err) => {
        console.log('error zayavka', err);
      });
  };

  const createOrder = async () => {
    const fCustoms = customs.split('');
    const ff = [];
    for (let i = 0; i < fCustoms.length; i += 1) {
      ff.push(parseInt(fCustoms[i], 10));
    }

    const config = {
      headers: {
        Authorization: `Bearer ${get(cat, 'access', '')}`,
      },
    };
    await axios
      .post(
        `http://185.217.131.179:8888/api/v1/company/order/`,
        {
          name: userName,
          packageMethod: packages,
          paymentMethod: cash,
          first_payment: firstPayment,
          pending_of_place: waiting,
          drop_of_place: drop,
          order_owner: owner,
          full_payment: fullPayment,
          order_weight: massa,
          order_info: info,
          status,
          customs: ff,
          country,
          city,
          country_sending: countrySending,
          country_pending: countryPending,
          city_sending: citySending,
          city_pending: cityPending,
        },
        config
      )
      .then((ress) => {
        console.log('success', ress);
        swal({
          title: 'Продукт успешно добавлен!',
          text: 'Ознакомьтесь с добавленным товаром в разделе Заявки',
          icon: 'success',
          dangerMode: false,
          timer: 3000,
        });
      })
      .catch((err) => {
        console.log('error', err);
        swal({
          title: 'Информация введена неверно, проверьте интернет!',
          icon: 'error',
          dangerMode: true,
          timer: 3000,
        });
      });
  };
  const getManager = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${get(cat, 'access', '')}`,
      },
    };

    await axios
      .get(`http://185.217.131.179:8888/api/v1/company/staff-create/?manager=manager`, config)
      .then((ress) => {
        setManagerdata(get(ress, 'data.results', ''));
      })
      .catch((err) => {
        console.log('error zayavka', err);
      });
  };

  return (
    <>
      <Helmet>
        <title> Заявка</title>
      </Helmet>

      {get(cat, 'data.role', '') === 'manager' || get(cat, 'data.role', '') === 'director' ? (
        <>
          <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <div>
                <Typography variant="h4" gutterBottom>
                  Заявка
                </Typography>
                <Typography variant="p" gutterBottom>
                  Теперь вы можете прикрепить один продукт к грузовику.
                </Typography>
              </div>
            </Stack>
          </Container>

          <div className="card2">
            <div className="card3">
              <input
                type="text"
                placeholder="Order ID"
                className="input2"
                onChange={(v) => setOrderID(v.target.value)}
                defaultValue={orderID}
              />
            </div>

            <div className="card3">
              <input
                type="text"
                placeholder="Drivers id"
                list="data"
                className="input2"
                onChange={(v) => getTruck(v.target.value)}
              />
              <datalist id="data">
                {drivers.map((v, i) => {
                  return <option key={i} value={get(v, 'id', 0)} />;
                })}
              </datalist>
            </div>

            <div className="card3">
              <input
                type="text"
                placeholder="Manager"
                defaultValue={get(cat, 'data.id', 0)}
                className="input2"
                onChange={(v) => setManager(v.target.value)}
              />
            </div>
          </div>
          <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <Typography variant="h4" gutterBottom>
                {' '}
              </Typography>
              <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => sendData()}>
                Новый Запрос
              </Button>
            </Stack>
          </Container>

          {/* location */}
          {/* <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <div>
                <Typography variant="h4" gutterBottom>
                  Заявка
                </Typography>
                <Typography variant="p" gutterBottom>
                  Теперь вы можете изменить направление движения грузовика.
                </Typography>
              </div>
            </Stack>
          </Container>

          <div className="card2">
            <div className="card3">
              <input
                type="text"
                placeholder="Drivers id"
                list="data"
                className="input2"
                onChange={(v) => getTruck(v.target.value)}
              />
              <datalist id="data">
                {drivers.map((v, i) => {
                  return <option key={i} value={get(v, 'id', 0)} />;
                })}
              </datalist>
            </div>
            <div className="card3">
              <input
                type="text"
                placeholder="Location"
                className="input2"
                onChange={(v) => setMessage(v.target.value)}
              />
            </div>
          </div>

          <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <Typography variant="h4" gutterBottom>
                {' '}
              </Typography>
              <Button
                variant="contained"
                startIcon={<Iconify icon="eva:plus-fill" />}
                onClick={() => changeDriverLoaction()}
              >
                Новый адрес
              </Button>
            </Stack>
          </Container> */}
        </>
      ) : (
        <>
          {/* create order */}
          {/* 
          <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <div>
                <Typography variant="h4" gutterBottom>
                  Заявка
                </Typography>
                <Typography variant="p" gutterBottom>
                  Теперь вы можете изменить направление движения грузовика.
                </Typography>
              </div>
            </Stack>
          </Container>

          <div className="card2">
            <div className="card3">
              <input
                type="text"
                placeholder="Drivers id"
                list="data"
                className="input2"
                onChange={(v) => getTruck(v.target.value)}
              />
              <datalist id="data">
                {drivers.map((v, i) => {
                  return <option key={i} value={get(v, 'id', 0)} />;
                })}
              </datalist>
            </div>
            <div className="card3">
              <input
                type="text"
                placeholder="Location"
                className="input2"
                onChange={(v) => setMessage(v.target.value)}
              />
            </div>
          </div>

          <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <Typography variant="h4" gutterBottom>
                {' '}
              </Typography>
              <Button
                variant="contained"
                startIcon={<Iconify icon="eva:plus-fill" />}
                onClick={() => changeDriverLoaction()}
              >
                Новый адрес
              </Button>
            </Stack>
          </Container>

          <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <div>
                <Typography variant="h4" gutterBottom>
                  Создать заказ
                </Typography>
                <Typography variant="p" gutterBottom>
                  Вы можете добавить новый заказ.
                </Typography>
              </div>
            </Stack>
          </Container> */}

          <div className="card2">
            <div className="card3">
              <input type="text" placeholder="Имя" className="input2" onChange={(v) => setUserName(v.target.value)} />
            </div>
            <div className="card3">
              <input
                type="text"
                placeholder="Метод упаковки"
                className="input2"
                onChange={(v) => setPackages(v.target.value)}
              />
            </div>

            <div className="card3">
              <input
                type="number"
                placeholder="Первый взнос"
                className="input2"
                onChange={(v) => setFirstPayment(v.target.value)}
              />
            </div>
            <div className="card3">
              <input
                type="text"
                placeholder="В ожидании места"
                className="input2"
                onChange={(v) => setWaiting(v.target.value)}
              />
            </div>

            <div className="card3">
              <input
                type="text"
                placeholder="Падение места"
                className="input2"
                onChange={(v) => setDrop(v.target.value)}
              />
            </div>
            <div className="card3">
              <input
                type="number"
                placeholder="Владелец заказа"
                className="input2"
                onChange={(v) => setOwner(v.target.value)}
              />
            </div>

            <div className="card3">
              <input
                type="number"
                placeholder="Вес заказа"
                className="input2"
                onChange={(v) => setMassa(v.target.value)}
              />
            </div>
            <div className="card3">
              <input
                type="text"
                placeholder="Информация о заказе"
                className="input2"
                onChange={(v) => setInfo(v.target.value)}
              />
            </div>

            <div className="card3">
              <input
                type="text"
                placeholder="Status"
                list="data4"
                className="input2"
                onChange={(v) => setStatus(v.target.value)}
              />
              <datalist id="data4">
                <option value="sending" />
                <option value="arrived" />
                <option value="way" />
                <option value="declined" />
              </datalist>
            </div>

            <div className="card3">
              <input
                type="number"
                placeholder="Customs"
                className="input2"
                onChange={(v) => setCustoms(v.target.value)}
              />
            </div>

            <div className="card3">
              <input type="text" placeholder="Страна" className="input2" onChange={(v) => setCuntry(v.target.value)} />
            </div>

            <div className="card3">
              <input type="text" placeholder="Город" className="input2" onChange={(v) => setCity(v.target.value)} />
            </div>

            <div className="card3">
              <input
                type="text"
                placeholder="Payment"
                list="data3"
                className="input2"
                onChange={(v) => setCash(v.target.value)}
              />
              <datalist id="data3">
                <option value="cash" />
                <option value="card" />
              </datalist>
            </div>

            <div className="card3">
              <input
                type="number"
                placeholder="Полная оплата"
                className="input2"
                onChange={(v) => setfullPayment(v.target.value)}
              />
            </div>

            <div className="card3">
              <input
                type="text"
                placeholder="Страна отправки"
                className="input2"
                onChange={(v) => setCountrySending(v.target.value)}
              />
            </div>

            <div className="card3">
              <input
                type="text"
                placeholder="Страна ожидании"
                className="input2"
                onChange={(v) => setCountryPending(v.target.value)}
              />
            </div>

            <div className="card3">
              <input
                type="text"
                placeholder="Город отправки"
                className="input2"
                onChange={(v) => setCitySending(v.target.value)}
              />
            </div>

            <div className="card3">
              <input
                type="text"
                placeholder="Город ожидании"
                className="input2"
                onChange={(v) => setCityPending(v.target.value)}
              />
            </div>
          </div>

          <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <Typography variant="h4" gutterBottom>
                {' '}
              </Typography>
              <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => createOrder()}>
                Новый заказ
              </Button>
            </Stack>
          </Container>
        </>
      )}
    </>
  );
}
