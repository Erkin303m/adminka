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
import { AiFillCar, AiOutlineDelete, AiOutlineEdit, AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';
import swal from 'sweetalert';
import { BsFillPersonFill } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';
import { UserListHead } from '../sections/@dashboard/user';
import Iconify from '../components/iconify';
import USERLIST from '../_mock/user';
import Scrollbar from '../components/scrollbar';

export default function UserPage() {
  const { t } = useTranslation();
  const TABLE_HEAD = [
    { id: 'id', label: t('ID'), alignRight: false },
    { id: 'name', label: t('Name'), alignRight: false },
    { id: 'lastName', label: t('Phone'), alignRight: false },
    { id: 'number', label: t('Experience'), alignRight: false },
    { id: 'birthday', label: t('Birthday'), alignRight: false },
    { id: 'del', label: t('Delete'), alignRight: false },
    { id: 'edit', label: t('Edit'), alignRight: false },
  ];

  const TABLE_HEAD2 = [
    { id: 'id2', label: t('ID'), alignRight: false },
    { id: 'name2', label: t('Name'), alignRight: false },
    { id: 'lastName2', label: t('Surename'), alignRight: false },
    { id: 'number2', label: t('Phone'), alignRight: false },
    { id: 'del2', label: t('Delete'), alignRight: false },
    { id: 'edit2', label: t('Edit'), alignRight: false },
  ];

  const [mainData2, setMainData2] = useState([]);
  const [mainData, setMainData] = useState([]);
  const [driverIds, setDriverIds] = useState([]);
  const [number1, setNumber1] = useState(0);
  const [number2, setNumber2] = useState(0);
  const [value, setValue] = useState(0);
  const [value2, setValue2] = useState(0);

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
        console.log(ress.data);
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
      // .get(`http://185.217.131.179:8888/api/v1/company/staff-create/?driver=driver`, config)

      .get(`http://185.217.131.179:8888/api/v1/company/staff-create/?driver=driver&limit=6&offset=${num}`, config)
      .then((ress) => {
        setMainData(get(ress, 'data.results', ''));
        console.log('drivers', get(ress, 'data.results', ''));
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

  // ***

  const [username, setUsername] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [date, setDate] = useState('');
  const [gender, setGender] = useState('');
  const [avatar, setAvatar] = useState('');
  const [experience, setExperience] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

  const [isEditOrderOwner, setIsEditOrderOwner] = useState(0);
  const [idEditOrderOwner, setIdEditOrderOwner] = useState(0);

  const createOrderOwner = async () => {
    console.log('id', idEditOrderOwner);
    const config = {
      headers: {
        Authorization: `Bearer ${get(cat, 'access', '')}`,
      },
    };
    if (isEditOrderOwner === 0) {
      // yaratish
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
            title: "Order owners didn't add, check the Internet!",
            icon: 'error',
            dangerMode: true,
            timer: 3000,
          });
        });
    } else {
      // edit
      await axios
        .patch(
          `http://185.217.131.179:8888/api/v1/company/staff/edit/${idEditOrderOwner}/`,
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
        .then(() => {
          swal({
            title: 'Order owners edited successfully!',
            icon: 'success',
            dangerMode: false,
            timer: 3000,
          });
          setIsEditOrderOwner(0);
        })
        .catch((err) => {
          console.log('error', err);
          swal({
            title: "Order owners didn't edit, check the Internet!",
            icon: 'error',
            dangerMode: true,
            timer: 3000,
          });
        });
    }
  };

  const isEditingOrderOwner = (row) => {
    setIdEditOrderOwner(get(row, 'id', 0));
    setIsEditOrderOwner(1);
    setValue(0);
    setValue2(0);

    setUsername(get(row, 'first_name', ''));
    setLastName(get(row, 'last_name', ''));
    setPhoneNumber(get(row, 'phone_number', ''));
    setMiddleName(get(row, 'middle_name', ''));
    setGender(get(row, 'gender', ''));
    setExperience(get(row, 'experience', ''));
    setMiddleName(get(row, 'middle_name', ''));
    setDate(get(row, 'birthday', ''));
  };

  const [usernamed, setUsernamed] = useState('');
  const [lastNamed, setLastNamed] = useState('');
  const [middleNamed, setMiddleNamed] = useState('');
  const [dated, setDated] = useState('');
  const [genderd, setGenderd] = useState('');
  const [avatard, setAvatard] = useState('');
  const [experienced, setExperienced] = useState('');
  const [phoneNumberd, setPhoneNumberd] = useState('');
  const [password1d, setPassword1d] = useState('');
  const [password2d, setPassword2d] = useState('');

  const [truckEdit, setTruckEdit] = useState(0);
  const [truckEditinID, setTruckEditinID] = useState(0);

  const createTruck = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${get(cat, 'access', '')}`,
      },
    };
    if (truckEdit === 0) {
      // yaratish
      await axios
        .post(
          `http://185.217.131.179:8888/api/v1/company/dashboard/director/`,
          {
            first_name: usernamed,
            last_name: lastNamed,
            middle_name: middleNamed,
            birthday: dated,
            genderd,
            avatar: null,
            experienced,
            phone_number: phoneNumberd,
            password_1: password1d,
            password_2: password2d,
            role: 'driver',
          },
          config
        )
        .then(() => {
          swal({
            title: 'Driver added successfully!',
            // text: 'Ознакомьтесь с добавленным товаром в разделе Заявки',
            icon: 'success',
            dangerMode: false,
            timer: 3000,
          });
        })
        .catch((err) => {
          console.log('error', err);
          swal({
            title: "Driver didn't add, check the Internet!",
            icon: 'error',
            dangerMode: true,
            timer: 3000,
          });
        });
    } else {
      // edit
      await axios
        .patch(
          `http://185.217.131.179:8888/api/v1/company/staff/edit/${truckEditinID}/`,
          {
            first_name: usernamed,
            last_name: lastNamed,
            middle_name: middleNamed,
            birthday: dated,
            genderd,
            avatar: null,
            experienced,
            phone_number: phoneNumberd,
            password_1: password1d,
            password_2: password2d,
            role: 'driver',
          },
          config
        )
        .then(() => {
          swal({
            title: 'Driver edited successfully!',
            icon: 'success',
            dangerMode: false,
            timer: 3000,
          });
          setIsEditOrderOwner(0);
        })
        .catch((err) => {
          console.log('error', err);
          swal({
            title: "Driver owners didn't edit, check the Internet!",
            icon: 'error',
            dangerMode: true,
            timer: 3000,
          });
        });
    }
  };

  const isEdit = (row) => {
    setTruckEditinID(get(row, 'id', 0));
    setTruckEdit(1);
    setValue(1);
    setValue2(0);

    setUsernamed(get(row, 'first_name', ''));
    setLastNamed(get(row, 'last_name', ''));
    setPhoneNumberd(get(row, 'phone_number', ''));
    setMiddleNamed(get(row, 'middle_name', ''));
    setGenderd(get(row, 'gender', ''));
    setExperienced(get(row, 'experience', ''));
    setMiddleNamed(get(row, 'middle_name', ''));
    setDated(get(row, 'birthday', ''));
  };

  const deletingTruck = async (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${get(cat, 'access', '')}`,
      },
    };
    await axios
      .delete(`http://185.217.131.179:8888/api/v1/company/staff-create/?driver=driver/${id}`, config)
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

  const deletingOrderOwner = async (id) => {
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

  return (
    <>
      <Helmet>
        <title>{t('All users')}</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            {t('All users')}
          </Typography>
          <Card className="cardFilter">
            <BottomNavigation
              showLabels
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            >
              <BottomNavigationAction
                label={t('Order owner')}
                icon={<BsFillPersonFill />}
                className="buttonNavigation"
              />
              <BottomNavigationAction label={t('Truck')} icon={<AiFillCar />} />
            </BottomNavigation>
            <BottomNavigation
              showLabels
              value={value2}
              onChange={(event, newValue) => {
                setValue2(newValue);
              }}
            >
              <BottomNavigationAction label={t('Add')} className="buttonNavigation" />
              <BottomNavigationAction label={t('List')} />
            </BottomNavigation>
          </Card>
        </Stack>
      </Container>

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
                      <TableRow hover key={i} tabIndex={-1} s>
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" className="zayavkaName">
                              {row.id}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">
                          {row.first_name} {row.last_name}
                        </TableCell>

                        <TableCell align="left">{row.phone_number}</TableCell>
                        <TableCell align="left">{row.experience}</TableCell>
                        <TableCell align="left">{row.birthday}</TableCell>

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
              {t('List of order owners')}
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

                        <TableCell align="left">
                          <Button className="del" onClick={() => deletingOrderOwner(row.id)}>
                            <AiOutlineDelete />
                          </Button>
                        </TableCell>
                        <TableCell align="left">
                          <Button className="edit" onClick={() => isEditingOrderOwner(row)}>
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

      {/* add Order Owner */}

      {value === 0 && value2 === 0 ? (
        <>
          <Card className="marginBottom">
            <Typography variant="h6" className="mainCenterWord">
              {t('Add Order owner')}
            </Typography>
          </Card>
          <>
            <div className="card2">
              <div className="card3">
                <input
                  type="text"
                  placeholder={t('Name')}
                  defaultValue={username}
                  className="input2"
                  onChange={(v) => setUsername(v.target.value)}
                />
              </div>
              <div className="card3">
                <input
                  type="text"
                  placeholder={t('Last name')}
                  defaultValue={lastName}
                  className="input2"
                  onChange={(v) => setLastName(v.target.value)}
                />
              </div>

              <div className="card3">
                <input
                  type="text"
                  placeholder={t('Middle name')}
                  className="input2"
                  defaultValue={middleName}
                  onChange={(v) => setMiddleName(v.target.value)}
                />
              </div>

              <div className="card3">
                <input
                  type="date"
                  placeholder={t('Date')}
                  defaultValue={date}
                  className="input2"
                  onChange={(v) => setDate(v.target.value)}
                />
              </div>

              <div className="card3">
                <input
                  type="text"
                  placeholder={t('Gender')}
                  defaultValue={gender}
                  className="input2"
                  onChange={(v) => setGender(v.target.value)}
                />
              </div>

              <div className="card3">
                <input
                  type="number"
                  placeholder={t('Experience')}
                  defaultValue={experience}
                  className="input2"
                  onChange={(v) => setExperience(v.target.value)}
                />
              </div>

              <div className="card3">
                <input
                  type="text"
                  placeholder={t('Phone number')}
                  defaultValue={phoneNumber}
                  className="input2"
                  onChange={(v) => setPhoneNumber(v.target.value)}
                />
              </div>

              <div className="card3">
                <input
                  type="text"
                  defaultValue={password1}
                  placeholder={t('Password 1')}
                  className="input2"
                  onChange={(v) => setPassword1(v.target.value)}
                />
              </div>

              <div className="card3">
                <input
                  type="text"
                  defaultValue={password2}
                  placeholder={t('Password 2')}
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
                <Button variant="contained" onClick={() => createOrderOwner()}>
                  {t('Add')}
                </Button>
              </Stack>
            </Container>
          </>
        </>
      ) : null}

      {/* add Truck */}

      {value === 1 && value2 === 0 ? (
        <>
          <Card className="cardMAin">
            <Typography variant="h6" className="mainCenterWord2">
              {t('Add Driver')}
            </Typography>
          </Card>
          <>
            <div className="card2">
              <div className="card3">
                <input
                  type="text"
                  placeholder={t('Name')}
                  defaultValue={usernamed}
                  className="input2"
                  onChange={(v) => setUsernamed(v.target.value)}
                />
              </div>
              <div className="card3">
                <input
                  type="text"
                  placeholder={t('Last name')}
                  defaultValue={lastNamed}
                  className="input2"
                  onChange={(v) => setLastNamed(v.target.value)}
                />
              </div>

              <div className="card3">
                <input
                  type="text"
                  placeholder={t('Middle name')}
                  className="input2"
                  defaultValue={middleNamed}
                  onChange={(v) => setMiddleNamed(v.target.value)}
                />
              </div>

              <div className="card3">
                <input
                  type="date"
                  placeholder={t('Date')}
                  defaultValue={dated}
                  className="input2"
                  onChange={(v) => setDated(v.target.value)}
                />
              </div>

              <div className="card3">
                <input
                  type="text"
                  placeholder={t('Gender')}
                  defaultValue={genderd}
                  className="input2"
                  onChange={(v) => setGenderd(v.target.value)}
                />
              </div>

              <div className="card3">
                <input
                  type="number"
                  placeholder={t('Experience')}
                  defaultValue={experienced}
                  className="input2"
                  onChange={(v) => setExperienced(v.target.value)}
                />
              </div>

              <div className="card3">
                <input
                  type="text"
                  placeholder={t('Phone number')}
                  defaultValue={phoneNumberd}
                  className="input2"
                  onChange={(v) => setPhoneNumberd(v.target.value)}
                />
              </div>

              <div className="card3">
                <input
                  type="text"
                  defaultValue={password1d}
                  placeholder={t('Password 1')}
                  className="input2"
                  onChange={(v) => setPassword1d(v.target.value)}
                />
              </div>

              <div className="card3">
                <input
                  type="text"
                  defaultValue={password2d}
                  placeholder={t('Password 2')}
                  className="input2"
                  onChange={(v) => setPassword2d(v.target.value)}
                />
              </div>
            </div>
          </>
          <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <Typography variant="h4" gutterBottom>
                {' '}
              </Typography>
              <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => createTruck()}>
                {t('New Driver')}
              </Button>
            </Stack>
          </Container>
        </>
      ) : null}
    </>
  );
}
