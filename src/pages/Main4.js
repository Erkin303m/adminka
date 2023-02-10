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
import {
  AiFillCar,
  AiOutlinePlusCircle,
  AiOutlineArrowRight,
  AiOutlineArrowLeft,
  AiOutlineDelete,
  AiOutlineEdit,
} from 'react-icons/ai';

import { BsFillPersonFill, BsList } from 'react-icons/bs';
import swal from 'sweetalert';
import Iconify from '../components/iconify';
import { UserListHead } from '../sections/@dashboard/user';
import USERLIST from '../_mock/user';
import Scrollbar from '../components/scrollbar';

const TABLE_HEAD = [
  { id: 'id', label: 'ID', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'lastName', label: 'Truck location', alignRight: false },
  { id: 'number', label: 'Truck power', alignRight: false },
  { id: 'edit', label: 'Edit', alignRight: false },
  { id: 'delete', label: 'Delete', alignRight: false },
];

const TABLE_HEAD2 = [
  { id: 'id', label: 'ID', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'lastName', label: 'Surename', alignRight: false },
  { id: 'number', label: 'Phone', alignRight: false },
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

  // truck add states
  const [name, setName] = useState('');
  const [powerTruck, setPowerTruck] = useState('');
  const [driver, setDriver] = useState('');
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
          avatar: null,
          experience,
          phone_number: phoneNumber,
          password_1: password1,
          password_2: password2,
          role: 'order_owner',
        },
        config
      )
      .then((ress) => {
        swal({
          title: 'Order owners added successfully!',
          // text: 'Ознакомьтесь с добавленным товаром в разделе Заявки',
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

  const editingTruck = async (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${get(cat, 'access', '')}`,
      },
    };
    await axios
      .patch(
        `http://185.217.131.179:8888/api/v1/company/truck/${id}`,
        {
          name: '',
          power_truck: '',
          driver: null,
          avg_price: null,
          truck_location: '',
          truck_type: null,
          status: null,
        },
        config
      )
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

  console.log(mainData);
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
              <BottomNavigationAction label="Order owner" icon={<BsFillPersonFill />} className="buttonNavigation" />
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
              Order owner
            </Typography>
          </Card>
          <div className="card2">
            <div className="card3">
              <input type="text" placeholder="Name" className="input2" onChange={(v) => setUserName(v.target.value)} />
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
                placeholder="Middle name"
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
            {/* 
            <div className="card3">
              <input
                type="file"
                placeholder="avatar"
                className="input2"
                onChange={(v) => setAvatar(v.target.files[0])}
              />
            </div> */}

            <div className="card3">
              <input
                type="number"
                placeholder="Experience"
                className="input2"
                onChange={(v) => setExperience(v.target.value)}
              />
            </div>

            <div className="card3">
              <input
                type="text"
                placeholder="Phone number"
                className="input2"
                onChange={(v) => setPhoneNumber(v.target.value)}
              />
            </div>

            <div className="card3">
              <input
                type="text"
                placeholder="Password 1"
                className="input2"
                onChange={(v) => setPassword1(v.target.value)}
              />
            </div>

            <div className="card3">
              <input
                type="text"
                placeholder="Password 2"
                className="input2"
                onChange={(v) => setPassword2(v.target.value)}
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
                onClick={() => createOrderOwner()}
              >
                New address
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
        <>
          <Card>
            <Typography variant="h6" className="mainCenterWord">
              List of order owners
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
