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
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineArrowRight,
  AiOutlineShoppingCart,
  AiOutlineDropbox,
} from 'react-icons/ai';
import { BiMoney } from 'react-icons/bi';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import { UserListHead } from '../sections/@dashboard/user';

import USERLIST from '../_mock/user';
import Scrollbar from '../components/scrollbar';

import Label from '../components/label';
import Iconify from '../components/iconify';

const TABLE_HEAD = [
  { id: 'id', label: 'ID', alignRight: false },
  { id: 'company', label: 'Phone', alignRight: false },
  { id: 'drop', label: 'Role', alignRight: false },
  { id: 'del', label: 'Del', alignRight: false },
  { id: 'edit', label: 'Edit', alignRight: false },
];
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid white',
  boxShadow: 24,
  p: 4,
};

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
  const [open, setOpen] = useState(0);
  const [dataModal, setDataModal] = useState([]);

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
      .delete(`http://185.217.131.179:8888/api/v1/company/staff/edit/${id}/`, config)
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
    setValue(1);
    // setUserName(get(row,'id',0))
  };

  const handleOpen = (item) => {
    setOpen(true);
    setDataModal(item);
  };
  const handleClose = () => setOpen(false);

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
                        <TableRow hover key={i} tabIndex={-1} onDoubleClick={() => handleOpen(row)}>
                          <TableCell align="left">{get(row, 'id', '')}</TableCell>
                          <TableCell align="left">{get(row, 'phone_number', '')}</TableCell>

                          <TableCell align="left">{get(row, 'role', '')}</TableCell>

                          <TableCell align="left">
                            <Button className="del" onClick={() => del(row.id)}>
                              <AiOutlineDelete />
                            </Button>
                          </TableCell>
                          <TableCell align="left">
                            <Button className="edit" onClick={() => isEditing(row)}>
                              <AiOutlineEdit />
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
                <option value="female" />
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
      {/* 
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
                <p className="country">Driver: </p>
                <p className="country">
                  {get(dataModal2, 'driver.first_name', '')} {get(dataModal2, 'driver.last_name', '')}
                </p>
              </div>

              <div className="cardMiniModal">
                <p className="country">Phone Number: </p>
                <p className="country">{get(dataModal2, 'driver.phone_number', '')} </p>
              </div>
              <div className="cardMiniModal">
                <p className="country">Location: </p>
                <p className="country">{get(dataModal2, 'truck_location', '')} </p>
              </div>
              <div className="cardMiniModal">
                <p className="country">Date: </p>
                <p className="country">{get(dataModal2, 'created_at', '').slice(0, 10)} </p>
              </div>

              <div className="cardMiniModal22">
                <p className="center">Comment</p>
                <p className="sum">{get(dataModal2, 'truck_type.comment', '')}</p>
              </div>
              <p className="productNameTitle">{get(dataModal2, 'customs[0].name', '')}</p>
            </Box>
          </Modal>
        </div> */}
    </>
  );
}
