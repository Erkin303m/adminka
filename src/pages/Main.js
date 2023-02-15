import { Helmet } from 'react-helmet-async';
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { get } from 'lodash';
import { useTranslation } from 'react-i18next';

import { AppCurrentVisits, AppConversionRates, AppWidgetSummary } from '../sections/@dashboard/app';

export default function DashboardAppPage() {
  const theme = useTheme();
  const [data, setData] = useState([]);
  const { t } = useTranslation();

  const cat = JSON.parse(localStorage.getItem('userData'));
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${get(cat, 'access', '')}`,
      },
    };
    await axios
      .get(`http://185.217.131.179:8888/api/v1/company/dashboard/director/`, config)
      .then((ress) => {
        setData(get(ress, 'data.statistics', []));
      })
      .catch((err) => {
        console.log('Main error', err);
      });
  };
  return (
    <>
      <Helmet>
        <title> {t('Dashboard')} </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          {t('Hello, welcome back')}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title={t('Managers')}
              total={get(data, 'managers', 0)}
              icon={'material-symbols:domain-verification-rounded'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title={t('Dispatchers')}
              total={get(data, 'dispetchers', 0)}
              color="success"
              icon={'material-symbols:phone-android-rounded'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title={t('Order owners')}
              total={get(data, 'order_owners', 0)}
              color="warning"
              icon={'material-symbols:person'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title={t('Drivers')}
              total={get(data, 'drivers', 0)}
              color="error"
              icon={'ic:outline-directions-car-filled'}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={5}>
            <AppCurrentVisits
              title={t('Employees and others')}
              chartData={[
                { label: t('Managers'), value: get(data, 'managers', 0) },
                { label: t('Dispatchers'), value: get(data, 'dispetchers', 0) },
                { label: t('Order owners'), value: get(data, 'order_owners', 0) },
                { label: t('Drivers'), value: get(data, 'drivers', 0) },
              ]}
              chartColors={[
                '#20D82F',
                theme.palette.primary.main,
                theme.palette.error.main,
                theme.palette.warning.main,
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={7}>
            <AppConversionRates
              title={t('Status')}
              chartData={[
                { label: t('Declined'), value: get(data, 'status_canceled', '0') },
                { label: t('Arrived'), value: get(data, 'status_arrived', '0') },
                { label: t('Way'), value: get(data, 'status_way', '0') },
                { label: t('Sending'), value: get(data, 'status_sending', '0') },
                { label: t('Workers count'), value: get(data, 'workers_count', '0') },
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
