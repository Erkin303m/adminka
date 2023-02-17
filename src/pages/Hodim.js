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
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import { UserListHead } from '../sections/@dashboard/user';
import USERLIST from '../_mock/user';
import Scrollbar from '../components/scrollbar';
import Label from '../components/label';
import Iconify from '../components/iconify';

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
  const { t } = useTranslation();
  const TABLE_HEAD = [
    { id: 'id', label: t('ID'), alignRight: false },
    { id: 'name', label: t('Name'), alignRight: false },
    { id: 'company', label: t('Phone'), alignRight: false },
    { id: 'drop', label: t('Role'), alignRight: false },
    { id: 'del', label: t('Delete'), alignRight: false },
    { id: 'edit', label: t('Edit'), alignRight: false },
  ];
  const [tableData, setTableData] = useState([]);

  const [userName, setUserName] = useState('');
  const [role, setRole] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [phone, setPhone] = useState('');
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
          `http://185.217.131.179:8888/api/v1/company/staff/edit/${editID}/`,
          {
            first_name: userName,
            last_name: lastName,
            middle_name: middleName,
            birthday,
            gender,
            avatar: null,
            experience,
          },
          config
        )
        .then((ress) => {
          setIsEdit(0);
          swal({
            title: 'Edit empoyees!',
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
        console.log(ress.data);
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

    setUserName(get(row, 'first_name', ''));
    setLastName(get(row, 'last_name', ''));
    setMiddleName(get(row, 'middle_name', ''));
    setBirthday(get(row, 'created_at', ''));
    setGender(get(row, 'gender', ''));
    setExperience(get(row, 'experience', ''));
    setRole(get(row, 'user.role', ''));
    setPhone(get(row, 'phone_number', ''));
  };

  const handleOpen = (item) => {
    setOpen(true);
    setDataModal(item);
  };

  const handleClose = () => setOpen(false);



  return (
    <>
      <Helmet>
        <title>{t('Employees')}</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            {t('Employees')}
          </Typography>
          <Card className="cardFilter">
            <BottomNavigation
              showLabels
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            >
              <BottomNavigationAction label={t('List')} className="buttonNavigation" />
              <BottomNavigationAction label={t('Add')} />
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
                          <TableCell align="left">
                            {get(row, 'first_name', '')} {get(row, 'last_name', '')}
                          </TableCell>
                          <TableCell align="left">{get(row, 'phone_number', '')}</TableCell>

                          <TableCell align="left">{get(row, 'user.role', '')}</TableCell>

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
                placeholder={t('Last name')}
                className="input2"
                defaultValue={lastName}
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
                className="input2"
                defaultValue={birthday}
                onChange={(v) => setBirthday(v.target.value)}
              />
            </div>

            <div className="card3">
              <input
                type="text"
                placeholder={t('Gender')}
                list="data4"
                className="input2"
                defaultValue={gender}
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
                defaultValue={avatar}
                onChange={(v) => setAvatar(v.target.files[0])}
              />
            </div> */}

            <div className="card3">
              <input
                type="text"
                placeholder={t('Experience')}
                className="input2"
                defaultValue={experience}
                onChange={(v) => setExperience(v.target.value)}
              />
            </div>

            <div className="card3">
              <input
                type="text"
                placeholder={t('Role')}
                list="data"
                className="input2"
                defaultValue={role}
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
                placeholder={t('Password 1')}
                className="input2"
                defaultValue={password1}
                onChange={(v) => setPassword1(v.target.value)}
              />
            </div>
            <div className="card3">
              <input
                type="text"
                placeholder={t('Password 2')}
                className="input2"
                defaultValue={password2}
                onChange={(v) => setPassword2(v.target.value)}
              />
            </div>

            <div className="card3">
              <input
                type="text"
                placeholder={t('Phone number')}
                className="input2"
                defaultValue={phone}
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
                {t('Add')}
              </Button>
            </Stack>
          </Container>
        </Card>
      )}

      {/* 2-modal */}

      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className="bigModalCard">
            <div className="cardMiniModal3">
              <Label color={'success'}>{get(dataModal, 'user.role', '')}</Label>
              <Label color={'warning'}>ID: {get(dataModal, 'id', '')}</Label>
            </div>
            <div className="cardMiniModal3">{get(dataModal, 'name', '')}</div>
            <div className="cardMiniModal">
              <p className="country2">{t('Name')}: </p>
              <p className="country2">
                {get(dataModal, 'first_name', '')} {get(dataModal, 'last_name', '')}
              </p>
            </div>

            <div className="cardMiniModal">
              <p className="country2">{t('Phone Number')}: </p>
              <p className="country2">{get(dataModal, 'phone_number', '')} </p>
            </div>
            <div className="cardMiniModal">
              <p className="country2">{t('Experience')}: </p>
              <p className="country2">{get(dataModal, 'experience', '')} </p>
            </div>
            <div className="cardMiniModal">
              <p className="country2">{t('Gender')}: </p>
              <p className="country2">{get(dataModal, 'gender', '')} </p>
            </div>
            <div className="cardMiniModal">
              <p className="country2">{t('Date')}: </p>
              <p className="country2">{get(dataModal, 'created_at', '').slice(0, 10)} </p>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
}
