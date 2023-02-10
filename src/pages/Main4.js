import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
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
import { useNavigate } from 'react-router-dom';
import { AiFillCar, AiOutlinePlusCircle, AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';

import { BsFillPersonFill, BsList } from 'react-icons/bs';
import swal from 'sweetalert';
import Iconify from '../components/iconify';

import { UserListHead } from '../sections/@dashboard/user';

import USERLIST from '../_mock/user';
import Scrollbar from '../components/scrollbar';

const TABLE_HEAD = [
  { id: 'id', label: 'ID', alignRight: false },
  { id: 'name', label: 'Имя', alignRight: false },
  { id: 'lastName', label: 'Местоположение грузовика', alignRight: false },
  { id: 'number', label: 'Мощность грузовика', alignRight: false },
];

const TABLE_HEAD2 = [
  { id: 'id', label: 'ID', alignRight: false },
  { id: 'name', label: 'Имя', alignRight: false },
  { id: 'lastName', label: 'Фамилия', alignRight: false },
  { id: 'number', label: 'Телефон', alignRight: false },
];
export default function UserPage() {
  const navigation = useNavigate();
  const [mainData2, setMainData2] = useState([]);
  const [mainData, setMainData] = useState([]);
  const [driverIds, setDriverIds] = useState([]);
  const [number1, setNumber1] = useState(0);
  const [number2, setNumber2] = useState(0);
  const [value, setValue] = useState(0);
  const [value2, setValue2] = useState(0);

  // order_owner add states
  const [username, setUserName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [date, setDate] = useState(0);
  const [gender, setGender] = useState('');
  const [avatar, setAvatar] = useState('');
  const [experience, setExperience] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [code, setCode] = useState('');

  // truck add states
  const [name, setName] = useState('');
  const [powerTruck, setPowerTruck] = useState('');
  const [driver, setDriver] = useState('');
  const [avgPrice, setAvgPrice] = useState('');
  const [truckLocation, setTruckLocation] = useState('');
  const [truckType, setTruckType] = useState('');

  const emptyRows = 1 > 0 ? Math.max(0, (1 + 0) * 5 - USERLIST.length) : 0;

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
      .get(
        `http://185.217.131.179:8888/api/v1/company/staff-create/?order_owner=order_owner&limit=6&offset=${num}`,
        config
      )
      .then((ress) => {
        setMainData2(get(ress, 'data.results', ''));
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
        console.log('getTruck list', get(ress, 'data', ''));
      })
      .catch((err) => {
        console.log('error zayavka', err);
      });
  };

  const createOrderOwner = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${get(cat, 'access', '')}`,
      },
    };
    await axios
      .post(
        `http://185.217.131.179:8888/api/v1/company/dashboard/director/`,
        {
          first_name: username,
          last_name: lastName,
          middle_name: middleName,
          birthday: date,
          gender,
          avatar,
          experience,
          phone_number: phoneNumber,
          password_1:password1,
          password_2:password2,
          role: 'order_owner',
        },
        config
      )
      .then((ress) => {
        console.log(ress)
        swal({
          title: 'владельцев заказов успешно добавлен!',
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
        console.log('success', ress);
        swal({
          title: 'Truck успешно добавлен!',
          text: 'Ознакомьтесь с добавленным Truck',
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
  return (
    <>
      <Helmet>
        <title> Сотрудники</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Главная страница
          </Typography>
          <Card className="cardFilter">
            <BottomNavigation
              showLabels
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            >
              <BottomNavigationAction label="Грузовладелец" icon={<BsFillPersonFill />} className="buttonNavigation" />
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
              владельцев заказов
            </Typography>
          </Card>
          <div className="card2">
            <div className="card3">
              <input type="text" placeholder="Имя" className="input2" onChange={(v) => setUserName(v.target.value)} />
            </div>
            <div className="card3">
              <input
                type="text"
                placeholder="Last name"
                className="input2"
                onChange={(v) => setLastName(v.target.value)}
              />
            </div>

            <div className="card3">
              <input
                type="text"
                placeholder="MiddleName"
                className="input2"
                onChange={(v) => setMiddleName(v.target.value)}
              />
            </div>
            <div className="card3">
              <input type="date" className="input2" onChange={(v) => setDate(v.target.value)} />
            </div>

            <div className="card3">
              <input
                type="text"
                placeholder="Gender"
                list="genderList"
                className="input2"
                onChange={(v) => setGender(v.target.value)}
              />
              <datalist id="genderList">
                <option value="male" />
                <option value="female" />
              </datalist>
            </div>

            <div className="card3">
              <input
                type="file"
                placeholder="avatar"
                className="input2"
                onChange={(v) => setAvatar(v.target.files[0])}
              />
            </div>

            <div className="card3">
              <input
                type="number"
                placeholder="experience"
                className="input2"
                onChange={(v) => setExperience(v.target.value)}
              />
            </div>

            <div className="card3">
              <input
                type="number"
                placeholder="phoneNumber"
                className="input2"
                onChange={(v) => setPhoneNumber(v.target.value)}
              />
            </div>

            <div className="card3">
              <input
                type="text"
                placeholder="password1"
                className="input2"
                onChange={(v) => setPassword1(v.target.value)}
              />
            </div>

            <div className="card3">
              <input
                type="text"
                placeholder="password2"
                className="input2"
                onChange={(v) => setPassword2(v.target.value)}
              />
            </div>

            <div className="card3">{''}</div>
          </div>
          <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <Typography variant="h4" gutterBottom>
                {' '}
              </Typography>
              <Button
                variant="contained"
                startIcon={<Iconify icon="eva:plus-fill" />}
                onClick={() => createOrderOwner()}
              >
                Новый адрес
              </Button>
            </Stack>
          </Container>
        </>
      ) : null}

      {value === 1 && value2 === 0 ? (
        <>
          <Card className="cardMAin">
            <Typography variant="h6" className="mainCenterWord2">
              Truck
            </Typography>
          </Card>
          <div className="card2">
            <div className="card3">
              <input type="text" placeholder="Имя" className="input2" onChange={(v) => setName(v.target.value)} />
            </div>
            <div className="card3">
              <input
                type="number"
                placeholder="Грузоподъёмность"
                className="input2"
                onChange={(v) => setPowerTruck(v.target.value)}
              />
            </div>

            <div className="card3">
              <input
                type="number"
                placeholder="ID Водитель"
                list="data4"
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
                placeholder="Местоположение грузовика"
                className="input2"
                onChange={(v) => setTruckLocation(v.target.value)}
              />
            </div>

            <div className="card3">
              <input
                type="text"
                placeholder="Тип грузовика"
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
                Новый Truck
              </Button>
            </Stack>
          </Container>
        </>
      ) : null}

      {value === 1 && value2 === 1 ? (
        <>
          <Card>
            <Typography variant="h6" className="mainCenterWord">
              Список грузовиков
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
                            Не найден
                          </Typography>

                          <Typography variant="body2">
                            Попробуйте проверить на опечатки или использовать полные слова.
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
        <>
          <Card>
            <Typography variant="h6" className="mainCenterWord">
              Список владельцев заказов
            </Typography>
            {/* <input type="text" placeholder="Search" className="input3" onChange={(v) => search(v.target.value)} /> */}
          </Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead headLabel={TABLE_HEAD2} rowCount={USERLIST.length} />
                <TableBody>
                  {mainData2.map((row, i) => {
                    return (
                      <TableRow hover key={i} tabIndex={-1} s>
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" className="zayavkaName">
                              {row.id}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{row.first_name}</TableCell>

                        <TableCell align="left">{row.last_name}</TableCell>
                        <TableCell align="left">{row.phone_number}</TableCell>
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
                            Не найден
                          </Typography>

                          <Typography variant="body2">
                            Попробуйте проверить на опечатки или использовать полные слова.
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
                  if (number2 > 0) {
                    const a = number2 - 6;
                    setNumber2((pr) => pr - 6);
                    getOrderOwner(a);
                  }
                }}
              >
                <AiOutlineArrowLeft />
              </Button>
              <Button
                onClick={() => {
                  const a = number2 + 6;
                  setNumber2((pr) => pr + 6);
                  getOrderOwner(a);
                }}
              >
                <AiOutlineArrowRight />
              </Button>
            </div>
          </Scrollbar>
        </>
      ) : null}
    </>
  );
}
