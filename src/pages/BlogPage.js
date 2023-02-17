import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { Stack, Button, Container, Typography } from '@mui/material';
import axios from 'axios';
import { get } from 'lodash';
import swal from 'sweetalert';
import { useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineArrowRight, AiOutlineShoppingCart, AiOutlineDropbox, AiOutlineArrowLeft } from 'react-icons/ai';
import { BiMoney, BiArrowBack } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Label from '../components/label';
import Iconify from '../components/iconify';

const TABLE_HEAD2 = [
  { id: 'name', label: 'Имя', alignRight: false },
  { id: 'company', label: 'Информация о заказе', alignRight: false },
  { id: 'drop', label: 'Точка доставки', alignRight: false },
  { id: 'date', label: 'Дата', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
];
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
export default function UserPage() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigation = useNavigate();
  const cat = JSON.parse(localStorage.getItem('userData'));

  const [driver, setDriver] = useState(0);
  const [truck, setTruck] = useState(0);
  const [drivers, setDrivers] = useState([]);
  const [manager, setManager] = useState(get(cat, 'data.id', 0));
  const [message, setMessage] = useState('');
  const [managerdata, setManagerdata] = useState([]);
  const [orderID, setOrderID] = useState(get(location, 'state.id', 0));
  const [isTruck, setIsTruck] = useState(get(location, 'state.truck', ''));
  const [order, setOrder] = useState([]);

  // **
  const [open, setOpen] = useState(false);
  const [dataModal, setDataModal] = useState({});

  // **

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
    // getDriver();
    getDriver2();
    getManager();
    getTruck();
    getOrder();
  }, []);

  const sendData = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${get(cat, 'access', '')}`,
      },
    };

    await axios
      .post(
        `http://185.217.131.179:8888/api/v1/company/dashboard/manager/${orderID}/add_truck_to_order/`,
        {
          truck_type: truck,
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

  const handleClose = () => setOpen(false);

  const getDriver2 = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${get(cat, 'access', '')}`,
      },
    };

    await axios
      .get(`http://185.217.131.179:8888/api/v1/company/truck/create/?status=sending`, config)
      .then((ress) => {
        setDrivers(get(ress, 'data.results'));
        console.log('bosh turgan trucklar', get(ress, 'data.results'));
      })
      .catch((err) => {
        console.log('error zayavka', err);
      });
  };

  const getOrder = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${get(cat, 'access', '')}`,
      },
    };
    await axios
      .get(`http://185.217.131.179:8888/api/v1/company/order/?status=sendin`, config)
      .then((ress) => {
        setOrder(get(ress, 'data.results', ''));
        console.log('getOrder', ress.data);
      })
      .catch((err) => {
        console.log('error zayavka', err);
      });
  };

  return (
    <>
      <Helmet>
        <title>{t('Application')}</title>
      </Helmet>

      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className="bigModalCard">
            <div className="cardMiniModal3">
              <p className="dateTitle">{get(dataModal, 'created_at', '').slice(0, 10)}</p>
              <Label
                color={
                  (get(dataModal, 'status', '') === 'sending' && 'primary') ||
                  (get(dataModal, 'status', '') === 'way' && 'warning') ||
                  (get(dataModal, 'status', '') === 'arrived' && 'success') ||
                  'error'
                }
              >
                {get(dataModal, 'status', '')}
              </Label>
            </div>
            <div className="cardMiniModal">
              <p className="country">{get(dataModal, 'city_pending', '')}</p>
              <AiOutlineArrowRight />
              <p className="country">{get(dataModal, 'city_sending', '')}</p>
            </div>
            <p className="sum">
              <BiMoney /> {get(dataModal, 'full_payment', '')} USD
            </p>

            <div className="cardMiniModal2">
              <p className="productNameTitle">
                <AiOutlineShoppingCart /> {get(dataModal, 'name', '')}
              </p>
              <p className="productNameTitle">
                <AiOutlineDropbox /> {get(dataModal, 'packageMethod', '')}
              </p>
            </div>
            <p className="productNameTitle">{get(dataModal, 'customs[0].name', '')}</p>
            <div className="card2">
              <div className="card3">
                <input
                  type="text"
                  placeholder="Drivers id"
                  list="data"
                  className="input222"
                  onChange={(v) => setDriver(v.target.value)}
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
                  className="input222"
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
                  {t('New Location')}
                </Button>
              </Stack>
            </Container>
          </Box>
        </Modal>
      </div>
      {/* pasdagi inputlar */}

      {!isTruck ? (
        <>
          <Container>
            <button onClick={() => navigation('/dashboard/products')} className="buttonBack">
              <BiArrowBack />
            </button>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <div>
                <Typography variant="h4" gutterBottom>
                  {t('Application')}
                </Typography>
                <Typography variant="p" gutterBottom>
                  {t('Now you can attach one product to the truck')}.
                </Typography>
              </div>
            </Stack>
          </Container>

          <div className="card2">
            <div className="card3">
              <input
                type="number"
                placeholder="Order ID"
                className="input2"
                onChange={(v) => setOrderID(v.target.value)}
                defaultValue={orderID}
              />
            </div>

            <div className="card3">
              <select
                name="cars"
                id="cars"
                defaultValue={t('Sellect truck')}
                className="input2"
                onChange={(item) => setTruck(item.target.value)}
              >
                <option selected value="">
                  {t('Sellect truck')}
                </option>
                {drivers.map((v, i) => {
                  return <option value={get(v, 'id', '')}>Name: {get(v, 'name', '')}</option>;
                })}
              </select>
            </div>

            <div className="card3">
              <input
                type="number"
                placeholder="Manager"
                defaultValue={manager}
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
                {t('Connect')}
              </Button>
            </Stack>
          </Container>
        </>
      ) : null}

      {isTruck ? (
        <>
          <Container>
            <button onClick={() => navigation('/dashboard/products')} className="buttonBack">
              <BiArrowBack />
            </button>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <div>
                <Typography variant="h4" gutterBottom>
                  {t('Application')}
                </Typography>
                <Typography variant="p" gutterBottom>
                  {t('Now you can attach one truck to a product')}.
                </Typography>
              </div>
            </Stack>
          </Container>

          <div className="card2">
            <div className="card3">
              <input
                type="number"
                placeholder="Order ID"
                className="input2"
                onChange={(v) => setOrderID(v.target.value)}
                defaultValue={orderID}
              />
            </div>

            <select id="data" className="input222" onChange={(v) => setDriver(v.target.value)}>
              {order.map((v, i) => {
                return (
                  <option key={i} value={get(v, 'id', 0)}>
                    {get(v, 'name', 0)}
                  </option>
                );
              })}
            </select>

            <div className="card3">
              <input
                type="number"
                placeholder="Manager"
                defaultValue={manager}
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
                {t('Connect')}
              </Button>
            </Stack>
          </Container>
        </>
      ) : null}

      {get(cat, 'data.role', '') === 'dispatcher' ? (
        <>
          <div className="card2">
            <div className="card3">
              <input type="text" placeholder="Имя" className="input2" onChange={(v) => setUserName(v.target.value)} />
            </div>
            <div className="card3">
              <input
                type="text"
                placeholder={t('Packing method')}
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
                {t('New order')}
              </Button>
            </Stack>
          </Container>
        </>
      ) : null}
    </>
  );
}
