import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { get } from 'lodash';
// sections
import { AppCurrentVisits, AppConversionRates } from '../sections/@dashboard/app';

export default function DashboardAppPage() {
  const theme = useTheme();
  const [data, setData] = useState([]);

  // const cat = JSON.parse(localStorage.getItem('userData'));
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await axios
      .get(`http://185.217.131.179:8888/api/v1/company/dashboard/director/`)
      .then((ress) => {
        setData(get(ress, 'data', []));
      })
      .catch((err) => {
        console.log('getData error', err);
      });
  };
  return (
    <>
      <Helmet>
        <title> Главная </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Привет, с возвращением
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={5}>
            <AppCurrentVisits
              title="Сотрудники"
              chartData={[
                { label: 'Водитель', value: get(data, 'drivers', '0') },
                { label: 'Менеджеры', value: get(data, 'managers', '0') },
                { label: 'Владельцы заказов', value: get(data, 'order_owners', '0') },
                { label: 'Диспетчеры', value: get(data, 'dispetchers', '0') },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={7}>
            <AppConversionRates
              title="Статус "
              // subheader=""
              chartData={[
                { label: 'Отменено', value: get(data, 'status_canceled', '0') },
                { label: 'Приехал ', value: get(data, 'status_arrived', '0') },
                { label: 'Way ', value: get(data, 'status_way', '0') },
                { label: 'Отправка ', value: get(data, 'status_sending', '0') },
                { label: 'Sending ', value: get(data, 'status_sending', '0') },
                { label: 'Workers count', value: get(data, 'workers_count', '0') },
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
