import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { sentenceCase } from 'change-case';
import {
  Card,
  Table,
  Stack,
  Button,
  Paper,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  BottomNavigation,
  BottomNavigationAction,
} from '@mui/material';
import axios from 'axios';
import { get } from 'lodash';
import {
  AiFillCar,
  AiOutlinePlusCircle,
  AiOutlineArrowRight,
  AiOutlineArrowLeft,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineShoppingCart,
  AiOutlineDropbox,
} from 'react-icons/ai';

import swal from 'sweetalert';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';

import { BsFillPersonFill, BsList } from 'react-icons/bs';
import { BiMoney } from 'react-icons/bi';

import { MdOutlineDone } from 'react-icons/md';
import { RiDeleteBack2Line } from 'react-icons/ri';

import Iconify from '../components/iconify';
import { UserListHead } from '../sections/@dashboard/user';
import USERLIST from '../_mock/user';
import Scrollbar from '../components/scrollbar';

import Label from '../components/label';

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
  const TABLE_HEAD = [
    { id: 'id', label: t('ID'), alignRight: false },
    { id: 'name', label: t('Name'), alignRight: false },
    { id: 'lastName', label: t('Truck location'), alignRight: false },
    { id: 'number', label: t('Truck power'), alignRight: false },
    { id: 'number', label: t('Rating'), alignRight: false },
    { id: 'edit', label: t('Edit'), alignRight: false },
    { id: 'delete', label: t('Delete'), alignRight: false },
  ];

  const TABLE_HEAD2 = [
    { id: 'name', label: t('Name'), alignRight: false },
    { id: 'company', label: t('Information about order'), alignRight: false },
    { id: 'drop', label: t('Delivery point'), alignRight: false },
    { id: 'date', label: t('Date'), alignRight: false },
    { id: 'status', label: t('Status'), alignRight: false },
    { id: 'relation', label: t('Edit'), alignRight: false },
  ];
  const [mainData2, setMainData2] = useState([]);
  const [mainData, setMainData] = useState([]);
  const [driverIds, setDriverIds] = useState([]);
  const [number1, setNumber1] = useState(0);
  const [value, setValue] = useState(0);
  const [value2, setValue2] = useState(0);

  const [truckEdit, setTruckEdit] = useState(0);
  const [truckEditinID, setTruckEditinID] = useState(0);

  const [orderEdit, setOrderEdit] = useState(0);
  const [orderEditinID, setOrderEditinID] = useState(0);

  // truck add states
  const [name, setName] = useState('');
  const [powerTruck, setPowerTruck] = useState('');
  const [driver, setDriver] = useState('');
  const [truckLocation, setTruckLocation] = useState('');
  const [truckType, setTruckType] = useState('');

  const emptyRows = 1 > 0 ? Math.max(0, (1 + 0) * 5 - USERLIST.length) : 0;

  // create order states
  const [userName, setUserName] = useState('');
  const [firstPayment, setFirstPayment] = useState('');
  const [waiting, setWaiting] = useState('');
  const [drop, setDrop] = useState('');
  const [owner, setOwner] = useState('');
  const [massa, setMassa] = useState('');
  const [info, setInfo] = useState('');
  const [status, setStatus] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [packages, setPackages] = useState('');
  const [cash, setCash] = useState('');
  const [fullPayment, setfullPayment] = useState('');
  const [countrySending, setCountrySending] = useState('');
  const [countryPending, setCountryPending] = useState('');
  const [citySending, setCitySending] = useState('');
  const [cityPending, setCityPending] = useState('');
  const [customs, setCustoms] = useState('');

  const [avgPrice, setAvgPrice] = useState('');
  const [rating, setRaiting] = useState('');

  // table numnber
  const [tableNumber1, setTableNumber1] = useState(1);
  const [tableNumber2, setTableNumber2] = useState(1);

  // table numnber

  // **
  const [open, setOpen] = useState(false);
  const [dataModal, setDataModal] = useState({});

  const [open2, setOpen2] = useState(false);
  const [dataModal2, setDataModal2] = useState({});

  useEffect(() => {
    getOrderOwner(0);
    getTruck(0);
    getDriver();
    getOrderO();
    getTruckType();
  }, []);

  const cat = JSON.parse(localStorage.getItem('userData'));

  const [orderO, setOrderO] = useState([]);
  const getOrderO = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${get(cat, 'access', '')}`,
      },
    };

    await axios
      .get(`http://185.217.131.179:8888/api/v1/company/staff-create/?order_owner=order_owner&limit=60`, config)
      .then((ress) => {
        console.log('Order owner', ress.data);
        setOrderO(get(ress, 'data.results', ''));
      })
      .catch((err) => {
        console.log('error zayavka', err);
      });
  };

  const getOrderOwner = async (num) => {
    const config = {
      headers: {
        Authorization: `Bearer ${get(cat, 'access', '')}`,
      },
    };

    await axios
      .get(`http://185.217.131.179:8888/api/v1/company/order/?status=main&limit=6&offset=${num}`, config)
      .then((ress) => {
        setMainData2(get(ress, 'data.results', ''));
        console.log('order', ress.data);
      })
      .catch((err) => {
        console.log('error zayavka', err);
      });
  };

  const getTruck = async (num) => {
    const config = {
      headers: {
        Authorization: `Bearer ${get(cat, 'access', '')}`,
      },
    };

    await axios
      .get(`http://185.217.131.179:8888/api/v1/company/truck/create/?limit=6&offset=${num}`, config)
      .then((ress) => {
        console.log('trucks:', ress.data);
        setMainData(get(ress, 'data.results', ''));
      })
      .catch((err) => {
        console.log('error zayavka', err);
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
        setDriverIds(get(ress, 'data.results', ''));
      })
      .catch((err) => {
        console.log('error zayavka', err);
      });
  };

  const createTruck = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${get(cat, 'access', '')}`,
      },
    };

    if (truckEdit === 0) {
      await axios
        .post(
          `http://185.217.131.179:8888/api/v1/company/truck/create/`,
          {
            name,
            power_truck: powerTruck,
            driver,
            truck_location: truckLocation,
            truck_type: truckType,
            avg_price: avgPrice,
            rating,
            status: 'main',
          },
          config
        )
        .then((ress) => {
          swal({
            title: 'Truck added successfully!',
            // text: 'Ознакомьтесь с добавленным Truck',
            icon: 'success',
            dangerMode: false,
            timer: 3000,
          });
        })
        .catch((err) => {
          console.log('error', err);
          swal({
            title: 'Information entered incorrectly, check the Internet!',
            icon: 'error',
            dangerMode: true,
            timer: 3000,
          });
        });
    } else {
      await axios
        .put(
          `http://185.217.131.179:8888/api/v1/company/truck/${truckEditinID}/`,
          {
            name,
            power_truck: powerTruck,
            driver,
            truck_location: truckLocation,
            truck_type: truckType,
            status: 'main',
          },
          config
        )
        .then((ress) => {
          swal({
            title: 'Truck edited successfully!',
            icon: 'success',
            dangerMode: false,
            timer: 3000,
          });
        })
        .catch((err) => {
          console.log('error', err);
          swal({
            title: 'Not edited!',
            icon: 'error',
            dangerMode: true,
            timer: 3000,
          });
        });
    }

    setTruckEdit(0);
  };

  const deletingTruck = async (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${get(cat, 'access', '')}`,
      },
    };
    await axios
      .delete(`http://185.217.131.179:8888/api/v1/company/truck/${id}/`, config)
      .then(() => {
        swal({
          title: 'Deleted successfully!',
          icon: 'success',
          dangerMode: false,
          timer: 3000,
        });
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
    if (orderEdit === 0) {
      await axios
        .post(
          `http://185.217.131.179:8888/api/v1/company/order/`,
          {
            name: userName,
            packageMethod: packages,
            // paymentMethod: cash,
            // first_payment: firstPayment,
            pending_of_place: waiting,
            drop_of_place: drop,
            order_owner: owner,
            full_payment: fullPayment,
            order_weight: massa,
            order_info: info,
            status: 'main',
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
            title: 'Order added!',
            icon: 'success',
            dangerMode: false,
            timer: 3000,
          });
        })
        .catch((err) => {
          console.log('error', err);
          swal({
            title: 'Not added!',
            icon: 'error',
            dangerMode: true,
            timer: 3000,
          });
        });
    } else {
      // edit order
      console.log('id', orderEditinID);
      await axios
        .patch(
          `http://185.217.131.179:8888/api/v1/company/order/${orderEditinID}/`,
          {
            name: userName,
            packageMethod: packages,
            // paymentMethod: cash,
            // first_payment: firstPayment,
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
            title: 'Edited!',
            icon: 'success',
            dangerMode: false,
            timer: 3000,
          });
          setOrderEdit(0);
        })
        .catch((err) => {
          console.log('error', err);
          swal({
            title: 'Not edited!',
            icon: 'error',
            dangerMode: true,
            timer: 3000,
          });
        });
    }
  };

  const [drivers, setDrivers] = useState([]);
  const getTruckType = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${get(cat, 'access', '')}`,
      },
    };

    await axios
      .get(`http://185.217.131.179:8888/api/v1/company/truck/create/`, config)
      .then((ress) => {
        setDrivers(get(ress, 'data.results'));
        console.log('truklar type', get(ress, 'data.results'));
      })
      .catch((err) => {
        console.log('error zayavka', err);
      });
  };

  const handleOpen = (item) => {
    setOpen(true);
    setDataModal(item);
  };
  const handleClose = () => setOpen(false);

  // 2-modal

  const handleOpen2 = (item) => {
    setOpen2(true);
    setDataModal2(item);
  };
  const handleClose2 = () => setOpen2(false);

  const isEdit = (row) => {
    setTruckEditinID(get(row, 'id', 0));
    setTruckEdit(1);
    setValue(1);
    setValue2(0);

    setName(get(row, 'name', ''));
    setPowerTruck(get(row, 'power_truck', ''));
    setDriver(get(row, 'driver.id', ''));
    setTruckLocation(get(row, 'truck_location', ''));
    setTruckType(get(row, 'truck_type.id', ''));
    setAvgPrice(get(row, 'avg_price', ''));
    setRaiting(get(row, 'rating', ''));
  };

  const isEditOrder = (row) => {
    setOrderEditinID(get(row, 'id', 0));
    setOrderEdit(1);
    setValue(0);
    setValue2(0);

    setUserName(get(row, 'name', ''));
    setPackages(get(row, 'packageMethod', ''));
    setCityPending(get(row, 'city_pending', ''));
    setCitySending(get(row, 'city_sending', ''));
    setCountryPending(get(row, 'country_pending', ''));
    setCountrySending(get(row, 'country_sending', ''));
    setfullPayment(get(row, 'full_payment', ''));
    setStatus(get(row, 'status', ''));
    setFirstPayment(get(row, 'first_payment', ''));
    setWaiting(get(row, 'pending_of_place', ''));
    setDrop(get(row, 'drop_of_place', ''));
    setOwner(get(row, 'order_owner', ''));
    setMassa(get(row, 'order_weight', ''));
    setInfo(get(row, 'order_info', ''));
    setCash(get(row, 'paymentMethod', ''));
    // setMassa(get(row, 'order_weight', ''));
  };

  return (
    <>
      <Helmet>
        <title>{t('Main page')}</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            {t('Main page')}
          </Typography>
          <Card className="cardFilter">
            <BottomNavigation
              showLabels
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            >
              <BottomNavigationAction label={t('Order')} icon={<BsFillPersonFill />} className="buttonNavigation" />
              <BottomNavigationAction label={t('Truck')} icon={<AiFillCar />} />
            </BottomNavigation>
            <BottomNavigation
              showLabels
              value={value2}
              onChange={(event, newValue) => {
                setValue2(newValue);
              }}
            >
              <BottomNavigationAction label={t('Add')} icon={<AiOutlinePlusCircle />} />
              <BottomNavigationAction label={t('List')} icon={<BsList />} />
            </BottomNavigation>
          </Card>
        </Stack>
      </Container>

      {value === 0 && value2 === 0 ? (
        <>
          <Card className="cardMAin">
            <Typography variant="h6" className="mainCenterWord2">
              {t('Add Order')}
            </Typography>
          </Card>

          <>
            <div className="card2">
              <div className="card3">
                <input
                  type="text"
                  placeholder={t('Name')}
                  className="input2"
                  defaultValue={userName}
                  onChange={(v) => setUserName(v.target.value)}
                />
              </div>
              <div className="card3">
                <input
                  type="text"
                  placeholder={t('Packing method')}
                  defaultValue={packages}
                  className="input2"
                  onChange={(v) => setPackages(v.target.value)}
                />
              </div>
              {/* <div className="card3">
                <input
                  type="number"
                  placeholder="First payment"
                  defaultValue={firstPayment}
                  className="input2"
                  onChange={(v) => setFirstPayment(v.target.value)}
                />
              </div> */}
              <div className="card3">
                <input
                  type="text"
                  placeholder={t('Waiting for a place')}
                  className="input2"
                  defaultValue={waiting}
                  onChange={(v) => setWaiting(v.target.value)}
                />
              </div>
              <div className="card3">
                <input
                  type="text"
                  placeholder={t('Falling place')}
                  className="input2"
                  defaultValue={drop}
                  onChange={(v) => setDrop(v.target.value)}
                />
              </div>
              <div className="card3">
                <select
                  name="cars2"
                  id="cars2"
                  defaultValue={owner}
                  className="input2"
                  onChange={(v) => setOwner(v.target.value)}
                >
                  <option value={0}>{t('Order owners')}</option>
                  {orderO.map((row, i) => {
                    return (
                      <option value={get(row, 'id')} key={i}>
                        {get(row, 'first_name', '')}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="card3">
                <input
                  type="number"
                  placeholder={t('Order weight')}
                  className="input2"
                  defaultValue={massa}
                  onChange={(v) => setMassa(v.target.value)}
                />
              </div>
              <div className="card3">
                <input
                  type="text"
                  placeholder={t('Information about order')}
                  defaultValue={info}
                  className="input2"
                  onChange={(v) => setInfo(v.target.value)}
                />
              </div>

              <div className="card3">
                <input
                  type="text"
                  placeholder={t('Status')}
                  defaultValue={status}
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
                  placeholder={t('Customs')}
                  defaultValue={customs}
                  className="input2"
                  onChange={(v) => setCustoms(v.target.value)}
                />
              </div>

              <div className="card3">
                <input
                  type="text"
                  placeholder={t('Country')}
                  defaultValue={country}
                  className="input2"
                  onChange={(v) => setCountry(v.target.value)}
                />
              </div>

              <div className="card3">
                <input
                  type="text"
                  placeholder={t('City')}
                  defaultValue={city}
                  className="input2"
                  onChange={(v) => setCity(v.target.value)}
                />
              </div>

              {/* <div className="card3">
                <input
                  type="text"
                  placeholder="Payment"
                  defaultValue={cash}
                  list="data3"
                  className="input2"
                  onChange={(v) => setCash(v.target.value)}
                />
                <datalist id="data3">
                  <option value="cash" />
                  <option value="card" />
                </datalist>
              </div> */}

              <div className="card3">
                <input
                  type="number"
                  placeholder={t('Full payment')}
                  defaultValue={fullPayment}
                  className="input2"
                  onChange={(v) => setfullPayment(v.target.value)}
                />
              </div>

              <div className="card3">
                <input
                  type="text"
                  placeholder={t('Country sending')}
                  defaultValue={countrySending}
                  className="input2"
                  onChange={(v) => setCountrySending(v.target.value)}
                />
              </div>

              <div className="card3">
                <input
                  type="text"
                  placeholder={t('Country pending')}
                  defaultValue={countryPending}
                  className="input2"
                  onChange={(v) => setCountryPending(v.target.value)}
                />
              </div>

              <div className="card3">
                <input
                  type="text"
                  placeholder={t('City sending')}
                  defaultValue={citySending}
                  className="input2"
                  onChange={(v) => setCitySending(v.target.value)}
                />
              </div>

              <div className="card3">
                <input
                  type="text"
                  placeholder={t('City pending')}
                  defaultValue={cityPending}
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
        </>
      ) : null}

      {value === 1 && value2 === 0 ? (
        <>
          <Card className="cardMAin">
            <Typography variant="h6" className="mainCenterWord2">
              {t('Add Truck')}
            </Typography>
          </Card>
          <div className="cardMainPage">
            <div className="card3">
              <input
                type="text"
                placeholder={t('Name')}
                className="input2"
                defaultValue={name}
                onChange={(v) => setName(v.target.value)}
              />
            </div>
            <div className="card3">
              <input
                type="number"
                placeholder={t('Load capacity')}
                defaultValue={powerTruck}
                className="input2"
                onChange={(v) => setPowerTruck(v.target.value)}
              />
            </div>

            <div className="card3">
              <select
                name="cars2"
                id="cars2"
                defaultValue={driver}
                className="input2"
                onChange={(v) => setDriver(v.target.value)}
              >
                <option value={0} selected>
                  {t('Driver')}
                </option>
                {driverIds.map((row, i) => {
                  return (
                    <option value={get(row, 'id', 0)} key={i}>
                      {get(row, 'first_name', '')}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="card3">
              <input
                type="text"
                placeholder={t('Truck location')}
                defaultValue={truckLocation}
                className="input2"
                onChange={(v) => setTruckLocation(v.target.value)}
              />
            </div>

            {/* <div className="card3">
              <input
                type="text"
                list="data5"
                placeholder="Truck type"
                defaultValue={truckType}
                className="input2"
                onChange={(v) => setTruckType(v.target.value)}
              />
              <datalist id="data5">
                {driverIds.map((v) => {
                  return <option value={v.id} />;
                })}
              </datalist>
            </div> */}

            <div className="card3">
              <select
                name="cars23"
                id="cars23"
                defaultValue={truckType}
                className="input2"
                onChange={(v) => setTruckType(v.target.value)}
              >
                <option value={0} selected>
                  {t('Truck type')}
                </option>
                {drivers.map((row, i) => {
                  return (
                    <option value={get(row, 'truck_type.id', 0)} key={i}>
                      {t('Gradus')}: {get(row, 'truck_type.gradus', '')}, {t('ID')}: {get(row, 'truck_type.id', '')}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="card3">
              <input
                type="number"
                placeholder={t('Rating')}
                defaultValue={rating}
                className="input2"
                onChange={(v) => setRaiting(v.target.value)}
              />
            </div>

            <div className="card3">
              <input
                type="number"
                placeholder={t('Avg price')}
                defaultValue={avgPrice}
                className="input2"
                onChange={(v) => setAvgPrice(v.target.value)}
              />
            </div>
          </div>
          <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <Typography variant="h4" gutterBottom>
                {' '}
              </Typography>
              <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => createTruck()}>
                {t('New Truck')}
              </Button>
            </Stack>
          </Container>
        </>
      ) : null}

      {value === 1 && value2 === 1 ? (
        <>
          <Card>
            <Typography variant="h6" className="mainCenterWord">
              {t('Truck list')}
            </Typography>
          </Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead headLabel={TABLE_HEAD} rowCount={USERLIST.length} />
                <TableBody>
                  {mainData.map((row, i) => {
                    return (
                      <TableRow hover key={i} tabIndex={-1} onDoubleClick={() => handleOpen2(row)}>
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" className="zayavkaName">
                              {row.id}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{row.name}</TableCell>
                        <TableCell align="left">{row.truck_location}</TableCell>
                        <TableCell align="left">{row.power_truck}</TableCell>
                        <TableCell align="left">{row.rating}</TableCell>
                        <TableCell align="left">
                          <Button className="del" onClick={() => deletingTruck(row.id)}>
                            <AiOutlineDelete />
                          </Button>
                        </TableCell>
                        <TableCell align="left">
                          <Button className="edit" onClick={() => isEdit(row)}>
                            <AiOutlineEdit />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {mainData.length <= 0 && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            {t('Not found')}
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
            <div className="arrows">
              <Button
                onClick={() => {
                  if (number1 > 0) {
                    const a = number1 - 6;
                    setNumber1((pr) => pr - 6);
                    getTruck(a);
                    setTableNumber1((pr) => pr - 1);
                  }
                }}
              >
                <AiOutlineArrowLeft />
              </Button>
              <p>{tableNumber1}</p>
              <Button
                onClick={() => {
                  const a = number1 + 6;
                  setNumber1((pr) => pr + 6);
                  getTruck(a);
                  setTableNumber1((pr) => pr + 1);
                }}
              >
                <AiOutlineArrowRight />
              </Button>
            </div>
          </Scrollbar>
        </>
      ) : null}

      {value === 0 && value2 === 1 ? (
        <Card>
          <h1 className="center">{t('Orders')}</h1>
          {/* <input type="text" placeholder="Поиск" className="input3" onChange={(v) => search(v.target.value)} /> */}
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead headLabel={TABLE_HEAD2} rowCount={USERLIST.length} />
                <TableBody>
                  {mainData2.map((row, i) => {
                    return (
                      <TableRow hover key={i} tabIndex={-1} onDoubleClick={() => handleOpen(row)}>
                        <TableCell component="th" scope="row" padding="none" className="nameProduct">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <p className="zayavkaName">{row.name}</p>
                          </Stack>
                        </TableCell>

                        <TableCell align="left" className="nameProduct">
                          {row.order_info}
                        </TableCell>

                        <TableCell align="left">{row.drop_of_place}</TableCell>

                        <TableCell align="left">{row.created_at.slice(0, 10)}</TableCell>

                        <TableCell align="left">
                          <select name="cars" id="cars" defaultValue={row.status} className="primary" disabled>
                            <option disabled selected value="sending">
                              {row.status}
                            </option>
                          </select>
                        </TableCell>
                        <TableCell align="left">
                          <Button className="edit" onClick={() => isEditOrder(row)}>
                            <AiOutlineEdit />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {mainData2.length <= 0 && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            {t('Not found')}
                          </Typography>

                          <Typography variant="body2">{t('Try use full words')}.</Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>
          <div className="arrows">
            <Button
              onClick={() => {
                if (number1 > 0) {
                  const a = number1 - 6;
                  setNumber1((pr) => pr - 6);
                  getOrderOwner(a);
                  setTableNumber2((pr) => pr - 1);
                }
              }}
            >
              <AiOutlineArrowLeft />
            </Button>
            <p>{tableNumber2}</p>
            <Button
              onClick={() => {
                const a = number1 + 6;
                setNumber1((pr) => pr + 6);
                getOrderOwner(a);
                setTableNumber2((pr) => pr + 1);
              }}
            >
              <AiOutlineArrowRight />
            </Button>
          </div>
        </Card>
      ) : null}

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
          </Box>
        </Modal>
      </div>

      {/* 2-modal */}

      <div>
        <Modal
          open={open2}
          onClose={handleClose2}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className="bigModalCard">
            <div className="cardMiniModal3">
              {get(dataModal2, 'name', '')}

              <Label
                color={
                  (get(dataModal2, 'status', '') === 'sending' && 'primary') ||
                  (get(dataModal2, 'status', '') === 'way' && 'warning') ||
                  (get(dataModal2, 'status', '') === 'arrived' && 'success') ||
                  'error'
                }
              >
                {get(dataModal2, 'status', '')}
              </Label>
            </div>
            <div className="cardMiniModal">
              <p className="country">{t('Driver')}: </p>
              <p className="country">
                {get(dataModal2, 'driver.first_name', '')} {get(dataModal2, 'driver.last_name', '')}
              </p>
            </div>

            <div className="cardMiniModal">
              <p className="country">{t('Phone Number')}: </p>
              <p className="country">{get(dataModal2, 'driver.phone_number', '')} </p>
            </div>
            <div className="cardMiniModal">
              <p className="country">{t('Location')}: </p>
              <p className="country">{get(dataModal2, 'truck_location', '')} </p>
            </div>
            <div className="cardMiniModal">
              <p className="country">{t('Date')}: </p>
              <p className="country">{get(dataModal2, 'created_at', '').slice(0, 10)} </p>
            </div>

            <div className="cardMiniModal22">
              <p className="center">{t('Comment')}</p>
              <p className="sum">{get(dataModal2, 'truck_type.comment', '')}</p>
            </div>
            <p className="productNameTitle">{get(dataModal2, 'customs[0].name', '')}</p>
          </Box>
        </Modal>
      </div>
    </>
  );
}
