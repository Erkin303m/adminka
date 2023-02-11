import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import {
  Card,
  Table,
  Stack,
  Button,
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
import swal from 'sweetalert';

import { UserListHead } from '../sections/@dashboard/user';

import USERLIST from '../_mock/user';
import Scrollbar from '../components/scrollbar';

import Iconify from '../components/iconify';

const TABLE_HEAD = [
  { id: 'id', label: 'ID', alignRight: false },
  { id: 'company', label: 'Phone', alignRight: false },
  { id: 'drop', label: 'Role', alignRight: false },
  { id: 'del', label: 'Del', alignRight: false },
  { id: 'edit', label: 'Edit', alignRight: false },
];

export default function UserPage() {
  const [tableData, setTableData] = useState([]);

  const [userName, setUserName] = useState('');
  const [role, setRole] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [phone, setPhone] = useState('');
  const [mainData, setMainData] = useState([]);
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('');
  const [avatar, setAvatar] = useState('');
  const [experience, setExperience] = useState('');

  const [isEdit, setIsEdit] = useState(0);
  const [editID, setEditID] = useState(0);

  const [value, setValue] = useState(0);

  console.log(avatar);
  useEffect(() => {
    sendWorkers();
  }, []);
  const cat = JSON.parse(localStorage.getItem('userData'));

  const sendData = async () => {
    const formData = new FormData();
    formData.append('myFile', avatar);
    console.log(formData);

    const config = {
      headers: {
        Authorization: `Bearer ${get(cat, 'access', '')}`,
      },
    };
    if (isEdit === 0) {
      await axios
        .post(
          `http://185.217.131.179:8888/api/v1/company/dashboard/director/`,
          {
            first_name: userName,
            last_name: lastName,
            middle_name: middleName,
            birthday,
            gender,
            // avatar,
            experience,
            password_1: password1,
            password_2: password2,
            phone_number: phone,
            role,
          },
          config
        )
        .then((ress) => {
          console.log('success', ress);
          swal({
            title: 'Сотрудник присоединился!',
            icon: 'success',
            dangerMode: false,
            timer: 3000,
          });
        })
        .catch((err) => {
          console.log('error', err);
          swal({
            title: 'Сотрудник не присоединился!',
            icon: 'error',
            dangerMode: true,
            timer: 3000,
          });
        });
    } else {
      // edit
      await axios
        .patch(
          `http://185.217.131.179:8888/api/v1/company/dashboard/director/${editID}`,
          {
            first_name: userName,
            last_name: lastName,
            middle_name: middleName,
            birthday,
            gender,
            // avatar,
            experience,
            password_1: password1,
            password_2: password2,
            phone_number: phone,
            role,
          },
          config
        )
        .then((ress) => {
          console.log('success', ress);
          swal({
            title: 'Сотрудник присоединился!',
            icon: 'success',
            dangerMode: false,
            timer: 3000,
          });
        })
        .catch((err) => {
          console.log('error', err);
          swal({
            title: 'Сотрудник не присоединился!',
            icon: 'error',
            dangerMode: true,
            timer: 3000,
          });
        });
    }
  };

  const sendWorkers = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${get(cat, 'access', '')}`,
      },
    };
    await axios
      .get(`http://185.217.131.179:8888/api/v1/company/dashboard/director/`, config)
      .then((ress) => {
        setTableData(get(ress, 'data.staffs', []));
        console.log(ress);
      })
      .catch((err) => {
        console.log('sendWorkers error', err);
      });
  };

  const del = async (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${get(cat, 'access', '')}`,
      },
    };
    await axios
      .delete(`http://185.217.131.179:8888/api/v1/company/dashboard/director/${id}`, config)
      .then((ress) => {
        console.log('success', ress);
        swal({
          title: 'Deleted success!',
          icon: 'success',
          dangerMode: false,
          timer: 3000,
        });
      })
      .catch((err) => {
        console.log('error', err);
        swal({
          title: 'Error!',
          icon: 'error',
          dangerMode: true,
          timer: 3000,
        });
      });
  };

  const isEditing = (row) => {
    setIsEdit(1);
    setEditID(get(row, 'id', 0));
    // setUserName(get(row,'id',0))
  };

  return (
    <>
      <Helmet>
        <title> Employees</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Employees
          </Typography>
          <Card className="cardFilter">
            <BottomNavigation
              showLabels
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            >
              <BottomNavigationAction label="List" className="buttonNavigation" />
              <BottomNavigationAction label="Add" />
            </BottomNavigation>
          </Card>
        </Stack>
      </Container>

      {value === 0 ? (
        <Container>
          <Card>
            <Scrollbar>
              <TableContainer>
                <Table>
                  <UserListHead headLabel={TABLE_HEAD} rowCount={USERLIST.length} />
                  <TableBody>
                    {tableData.map((row, i) => {
                      return (
                        <TableRow hover key={i} tabIndex={-1} s>
                          <TableCell align="left">{get(row, 'id', '')}</TableCell>
                          <TableCell align="left">{get(row, 'phone_number', '')}</TableCell>

                          <TableCell align="left">{get(row, 'role', '')}</TableCell>
                          <TableCell align="left">
                            <Button variant="outlined" color="inherit" onClick={() => del(row.id)}>
                              Del
                            </Button>
                          </TableCell>
                          <TableCell align="left">
                            <Button variant="outlined" color="inherit" onClick={() => isEditing(row)}>
                              Edit
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Scrollbar>
          </Card>
        </Container>
      ) : (
        <Card className="paddinTop">
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
              <input type="date" placeholder="Date" className="input2" onChange={(v) => setBirthday(v.target.value)} />
            </div>

            <div className="card3">
              <input
                type="text"
                placeholder="Gender"
                list="data4"
                className="input2"
                onChange={(v) => setGender(v.target.value)}
              />
              <datalist id="data4">
                <option value="male" />
              </datalist>
            </div>

            {/* <div className="card3">
              <input
                type="file"
                placeholder="Avatar"
                className="input2"
                onChange={(v) => setAvatar(v.target.files[0])}
              />
            </div> */}

            <div className="card3">
              <input
                type="text"
                placeholder="Experience"
                className="input2"
                onChange={(v) => setExperience(v.target.value)}
              />
            </div>

            <div className="card3">
              <input
                type="text"
                placeholder="Role"
                list="data"
                className="input2"
                onChange={(v) => setRole(v.target.value)}
              />
              <datalist id="data">
                <option value="manager" />
                <option value="dispatcher" />
              </datalist>
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

            <div className="card3">
              <input
                type="text"
                placeholder="Phone number"
                className="input2"
                onChange={(v) => setPhone(v.target.value)}
              />
            </div>
            
          </div>
          <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <Typography variant="h4" gutterBottom>
                {' '}
              </Typography>
              <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => sendData()}>
                New
              </Button>
            </Stack>
          </Container>
        </Card>
      )}
    </>
  );
}
