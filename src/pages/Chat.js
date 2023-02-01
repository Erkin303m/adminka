import { Helmet } from 'react-helmet-async';
import { get } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import {
  Card,
  Table,
  Stack,
  Paper,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { w3cwebsocket as Socket } from 'websocket';

import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
import { UserListHead } from '../sections/@dashboard/user';
import USERLIST from '../_mock/user';

const TABLE_HEAD = [
  { id: 'name', label: 'Имя', alignRight: false },
  { id: 'company', label: 'Информация о заказе', alignRight: false },
  { id: 'drop', label: 'Падение места', alignRight: false },
  { id: 'role', label: 'Метод оплаты', alignRight: false },
  { id: 'isVerified', label: 'Проверено', alignRight: false },
  { id: 'status', label: 'Чат', alignRight: false },
];

export default function UserPage() {
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [mainData, setMainData] = useState([]);


  const cat = JSON.parse(localStorage.getItem('userData'));


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const emptyRows = 1 > 0 ? Math.max(0, (1 + 0) * 5 - USERLIST.length) : 0;

  const navigation = useNavigate();

  useEffect(() => {
    sendData();
  }, []);

  const sendData = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${get(cat, 'access', '')}`,
      },
    };

    await axios
      .get(`http://185.217.131.179:8888/api/v1/company/order/`, config)
      .then((ress) => {
        console.log('success zayavka', ress.data.results);
        setMainData(get(ress, 'data.results', ''));
      })
      .catch((err) => {
        console.log('error zayavka', err);
      });
  };

  const search = (item) => {
    const a = mainData.filter((s) => {
      return s.name.toLowerCase().includes(item.toLowerCase());
    });
    setMainData(a);
  };

  return (
    <>
      <Helmet>
        <title>Чат</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Чат
          </Typography>
        </Stack>

        <Card>
          <input type="text" placeholder="Search" className="input3" onChange={(v) => search(v.target.value)} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {mainData.map((row, i) => {
                    return (
                      <TableRow hover key={i} tabIndex={-1} s>
                        <TableCell padding="checkbox"> </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {row.name}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="center">{row.order_info}</TableCell>

                        <TableCell align="center">{row.drop_of_place}</TableCell>
                        <TableCell align="center">{row.paymentMethod}</TableCell>

                        <TableCell align="center">{row.order_owner}</TableCell>

                        <TableCell align="left">
                          <Button onClick={() => navigation('/dashboard/mainChat', { id: row.name })}>Начинать</Button>
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
          </Scrollbar>
        </Card>
      </Container>
    </>
  );
}
