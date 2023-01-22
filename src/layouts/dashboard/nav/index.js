import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Drawer, Typography } from '@mui/material';
import { get } from 'lodash';
import useResponsive from '../../../hooks/useResponsive';
import Scrollbar from '../../../components/scrollbar';
import NavSection from '../../../components/nav-section';
// import navConfig from './config';
import uz from './LOGISTIC.png';
import SvgColor from '../../../components/svg-color';
import './style.css';

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const NAV_WIDTH = 280;

// ----------------------------------------------------------------------

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function Nav({ openNav, onCloseNav }) {
  const { pathname } = useLocation();

  const isDesktop = useResponsive('up', 'lg');

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
  }, [pathname]);

  const cat = JSON.parse(localStorage.getItem('userData'));

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
      className="mainScroolBar"
    >
      <div className="navTop">
        <img src={uz} alt="logistic logo" className="logo" />
      </div>

      {/* menu filter */}

      {get(cat, 'data.role', '') === 'director' ? (
        <NavSection
          data={[
            {
              title: 'Главная',
              path: '/dashboard/app',
              icon: icon('ic_analytics'),
            },
            {
              title: 'Заявка',
              path: '/dashboard/user',
              icon: icon('ic_user'),
            },
            {
              title: 'Запрос',
              path: '/dashboard/products',
              icon: icon('ic_cart'),
            },
            {
              title: 'Чат',
              path: '/dashboard/chat',
              icon: icon('ic_blog'),
            },
            {
              title: 'Сотрудники',
              path: '/dashboard/xodim',
              icon: icon('ic_blog'),
            },
          ]}
        />
      ) : null}

      {get(cat, 'data.role', '') === 'manager' ? (
        <NavSection
          data={[
            {
              title: 'Заявка',
              path: '/dashboard/user',
              icon: icon('ic_user'),
            },
            {
              title: 'Запрос',
              path: '/dashboard/products',
              icon: icon('ic_cart'),
            },
            {
              title: 'Чат',
              path: '/dashboard/chat',
              icon: icon('ic_blog'),
            },
          ]}
        />
      ) : null}

      {get(cat, 'data.role', '') === 'dispatcher' ? (
        <NavSection
          data={[
            {
              title: 'Главная',
              path: '/dashboard/app',
              icon: icon('ic_analytics'),
            },
            {
              title: 'Заявка',
              path: '/dashboard/user',
              icon: icon('ic_user'),
            },
            {
              title: 'Чат',
              path: '/dashboard/chat',
              icon: icon('ic_blog'),
            },

            // {
            //   title: 'Договоры',
            //   path: '/dashboard/blog',
            //   icon: icon('ic_blog'),
            // },
          ]}
        />
      ) : null}

      {get(cat, 'data.role', '') === 'driver' ? (
        <NavSection
          data={[
            {
              title: 'Главная',
              path: '/dashboard/app',
              icon: icon('ic_analytics'),
            },
            {
              title: 'Заявка',
              path: '/dashboard/user',
              icon: icon('ic_user'),
            },
            {
              title: 'Чат',
              path: '/dashboard/chat',
              icon: icon('ic_blog'),
            },
          ]}
        />
      ) : null}

      {get(cat, 'data.role', '') !== 'driver' &&
      get(cat, 'data.role', '') !== 'manager' &&
      get(cat, 'data.role', '') !== 'dispatcher' &&
      get(cat, 'data.role', '') !== 'director' ? (
        <NavSection
          data={[
            {
              title: 'Главная',
              path: '/dashboard/app',
              icon: icon('ic_analytics'),
            },
            {
              title: 'Заявка',
              path: '/dashboard/user',
              icon: icon('ic_user'),
            },
          ]}
        />
      ) : null}

      <div className="companyName2">
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Logisctic Solution
        </Typography>
      </div>
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
