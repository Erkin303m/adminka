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
} from 'react-icons/ai';

import swal from 'sweetalert';

import { BsFillPersonFill, BsList } from 'react-icons/bs';
import { MdOutlineDone } from 'react-icons/md';
import { RiDeleteBack2Line } from 'react-icons/ri';

import Iconify from '../components/iconify';
import { UserListHead } from '../sections/@dashboard/user';
import USERLIST from '../_mock/user';
import Scrollbar from '../components/scrollbar';

import Label from '../components/label';

const TABLE_HEAD = [
  { id: 'id', label: 'ID', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'lastName', label: 'Truck location', alignRight: false },
  { id: 'number', label: 'Truck power', alignRight: false },
  { id: 'edit', label: 'Edit', alignRight: false },
  { id: 'delete', label: 'Delete', alignRight: false },
];

const TABLE_HEAD2 = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'company', label: 'Information about order', alignRight: false },
  { id: 'drop', label: 'Delivery point', alignRight: false },
  { id: 'date', label: 'Date', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'relation', label: 'Edit', alignRight: false },
];
export default function UserPage() {
  const [mainData2, setMainData2] = useState([]);
  const [mainData, setMainData] = useState([]);
  const [driverIds, setDriverIds] = useState([]);
  const [number1, setNumber1] = useState(0);
  const [number2, setNumber2] = useState(0);
  const [value, setValue] = useState(0);
  const [value2, setValue2] = useState(0);

  const [truckEdit, setTruckEdit] = useState(0);
  const [truckEditinID, setTruckEditinID] = useState(0);

  // order_owner add states
  // const [username, setUserName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [date, setDate] = useState(0);
  const [gender, setGender] = useState('');
  const [avatar, setAvatar] = useState('');
  const [experience, setExperience] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

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

  // **
  const [open, setOpen] = useState(false);
  const [dataModal, setDataModal] = useState({});

  useEffect(() => {
    getOrderOwner(0);
    getTruck(0);
    getDriver();
  }, []);

  const cat = JSON.parse(localStorage.getItem('userData'));

  const getOrderOwner = async (num) => {
    const config = {
      headers: {
        Authorization: `Bearer ${get(cat, 'access', '')}`,
      },
    };

    await axios
      .get(`http://185.217.131.179:8888/api/v1/company/order/?limit=6&offset=${num}`, config)
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
      .delete(`http://185.217.131.179:8888/api/v1/company/truck/${id}`, config)
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
          status: 'main',
          customs: [1, 2],
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
  const handleOpen = (item) => {
    setOpen(true);
    setDataModal(item);
  };

  const yes = async (row, i) => {
    const config = {
      headers: {
        Authorization: `Bearer ${get(cat, 'access', '')}`,
      },
    };
    const id = get(row, 'id', 0);
    await axios
      .post(
        `http://185.217.131.179:8888/api/v1/company/dashboard/manager/${id}/status_change/`,
        {
          status: 'main',
        },
        config
      )
      .then(() => {
        const a = [...mainData];
        a[i].status = 'main';
        setMainData(a);

        swal({
          title: 'Success!',
          icon: 'success',
          dangerMode: false,
          timer: 3000,
        });
      })
      .catch((err) => {
        console.log('error zayavka', err);
      });
  };

  const no = async (row, i) => {
    const config = {
      headers: {
        Authorization: `Bearer ${get(cat, 'access', '')}`,
      },
    };
    const id = get(row, 'id', 0);
    await axios
      .post(
        `http://185.217.131.179:8888/api/v1/company/dashboard/manager/${id}/status_change/`,
        {
          status: 'declined',
        },
        config
      )
      .then(() => {
        const a = [...mainData];
        a[i].status = 'declined';
        setMainData(a);

        swal({
          title: 'Success!',
          icon: 'success',
          dangerMode: false,
          timer: 3000,
        });
      })
      .catch((err) => {
        console.log('error', err);
      });
  };
  return (
    <>
      <Helmet>
        <title> Main page</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Main page
          </Typography>
          <Card className="cardFilter">
            <BottomNavigation
              showLabels
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            >
              <BottomNavigationAction label="Order" icon={<BsFillPersonFill />} className="buttonNavigation" />
              <BottomNavigationAction label="Truck" icon={<AiFillCar />} />
            </BottomNavigation>
            <BottomNavigation
              showLabels
              value={value2}
              onChange={(event, newValue) => {
                setValue2(newValue);
              }}
            >
              <BottomNavigationAction label="Add" icon={<AiOutlinePlusCircle />} />
              <BottomNavigationAction label="List" icon={<BsList />} />
            </BottomNavigation>
          </Card>
        </Stack>
      </Container>

      {value === 0 && value2 === 0 ? (
        <>
          <Card className="cardMAin">
            <Typography variant="h6" className="mainCenterWord2">
              Add Order
            </Typography>
          </Card>

          <>
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
                <input
                  type="text"
                  placeholder="Страна"
                  className="input2"
                  onChange={(v) => setCuntry(v.target.value)}
                />
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
        </>
      ) : null}

      {value === 1 && value2 === 0 ? (
        <>
          <Card className="cardMAin">
            <Typography variant="h6" className="mainCenterWord2">
              Add Truck
            </Typography>
          </Card>
          <div className="card2">
            <div className="card3">
              <input
                type="text"
                placeholder="Name"
                className="input2"
                defaultValue={name}
                onChange={(v) => setName(v.target.value)}
              />
            </div>
            <div className="card3">
              <input
                type="number"
                placeholder="Load capacity"
                defaultValue={powerTruck}
                className="input2"
                onChange={(v) => setPowerTruck(v.target.value)}
              />
            </div>

            <div className="card3">
              <input
                type="number"
                placeholder="Driver ID"
                list="data4"
                defaultValue={driver}
                className="input2"
                onChange={(v) => setDriver(v.target.value)}
              />
              <datalist id="data4">
                {driverIds.map((v) => {
                  return <option value={v.id} />;
                })}
              </datalist>
            </div>

            {/* <div className="card3">
              <input
                type="file"
                placeholder="avgPrice"
                className="input2"
                onChange={(v) => setAvgPrice(v.target.value)}
              />
            </div> */}

            <div className="card3">
              <input
                type="text"
                placeholder="Truck location"
                defaultValue={truckLocation}
                className="input2"
                onChange={(v) => setTruckLocation(v.target.value)}
              />
            </div>

            <div className="card3">
              <input
                type="text"
                placeholder="Truck type"
                defaultValue={truckType}
                className="input2"
                onChange={(v) => setTruckType(v.target.value)}
              />
            </div>

            {/* <div className="card3">
              <input
                type="number"
                placeholder="Тип грузовика"
                list="data44"
                className="input2"
                onChange={(v) => setTruckType(v.target.value)}
              />
              <datalist id="data44">
                {driverIds.map((v) => {
                  return <option value={v.id} />;
                })}
              </datalist>
            </div> */}
            <div className="card3">
              <h1> </h1>
            </div>
          </div>
          <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <Typography variant="h4" gutterBottom>
                {' '}
              </Typography>
              <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => createTruck()}>
                New Truck
              </Button>
            </Stack>
          </Container>
        </>
      ) : null}

      {value === 1 && value2 === 1 ? (
        <>
          <Card>
            <Typography variant="h6" className="mainCenterWord">
              Truck list
            </Typography>
          </Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead headLabel={TABLE_HEAD} rowCount={USERLIST.length} />
                <TableBody>
                  {mainData.map((row, i) => {
                    return (
                      <TableRow hover key={i} tabIndex={-1} s>
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
                            Not found
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
                  }
                }}
              >
                <AiOutlineArrowLeft />
              </Button>
              <Button
                onClick={() => {
                  const a = number1 + 6;
                  setNumber1((pr) => pr + 6);
                  getTruck(a);
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
          <h1 className="center">Orders</h1>
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
                          {get(cat, 'data.role', '') === 'dispatcher' ? (
                            <Label
                              color={
                                (row.status === 'sending' && 'primary') ||
                                (row.status === 'way' && 'warning') ||
                                (row.status === 'arrived' && 'success') ||
                                'error'
                              }
                            >
                              {sentenceCase(row.status)}
                            </Label>
                          ) : (
                            <select
                              name="cars"
                              id="cars"
                              defaultValue={row.status}
                              className={
                                (row.status === 'sending' && 'primary') ||
                                (row.status === 'way' && 'warning') ||
                                (row.status === 'arrived' && 'success') ||
                                'error'
                              }
                              disabled
                              // onChange={(item) => changinStatus(item.target.value, i, row)}
                            >
                              <option disabled value="sending">
                                Sending
                              </option>
                              <option disabled value="way">
                                Way
                              </option>
                              <option disabled value="arrived">
                                Arrived
                              </option>
                              {row.status === 'declined' ? (
                                <option disabled value="declined">
                                  Declined
                                </option>
                              ) : (
                                <option value="declined">Declined</option>
                              )}
                            </select>
                          )}
                        </TableCell>
                        <TableCell align="left">
                          <Button
                            variant="contained"
                            // onClick={() => navigation('/dashboard/blog', { state: { id: row.id, truck: false } })}
                          >
                            Edit
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
                            Not found
                          </Typography>

                          <Typography variant="body2">Try use full words.</Typography>
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
                }
              }}
            >
              <AiOutlineArrowLeft />
            </Button>
            <Button
              onClick={() => {
                const a = number1 + 6;
                setNumber1((pr) => pr + 6);
                getOrderOwner(a);
              }}
            >
              <AiOutlineArrowRight />
            </Button>
          </div>
        </Card>
      ) : null}
    </>
  );
}
