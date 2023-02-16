import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Drawer, Typography } from '@mui/material';
import { get } from 'lodash';
import { useTranslation } from 'react-i18next';
import useResponsive from '../../../hooks/useResponsive';
import Scrollbar from '../../../components/scrollbar';
import NavSection from '../../../components/nav-section';
// import navConfig from './config';
import uz from './LOGISTIC.png';
import SvgColor from '../../../components/svg-color';
import './style.css';

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;
const icon2 = (name) => <SvgColor src={`/assets/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const NAV_WIDTH = 280;

// ----------------------------------------------------------------------

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function Nav({ openNav, onCloseNav }) {
  const { t } = useTranslation();
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
              title: t('Dashboard'),
              path: '/dashboard/app',
              icon: icon('ic_analytics'),
            },
            {
              title: t('Requests'),
              path: '/dashboard/products',
              icon: icon('ic_cart'),
            },
            {
              title: t('Applications'),
              path: '/dashboard/user',
              icon: icon2('list'),
            },
            {
              title: t('Main page'),
              path: '/dashboard/main4',
              icon: icon2('home'),
            },
            {
              title: t('Chat'),
              path: '/dashboard/chat',
              icon: icon2('chat'),
            },
            {
              title: t('All users'),
              path: '/dashboard/allUsers',
              icon: icon('ic_user'),
            },
            {
              title: t('Employees'),
              path: '/dashboard/xodim',
              icon: icon('ic_user'),
            },
          ]}
        />
      ) : null}

      {get(cat, 'data.role', '') === 'manager' ? (
        <NavSection
          data={[
            {
              title: 'Requests',
              path: '/dashboard/user',
              icon: icon2('list'),
            },
            {
              title: 'Applications',
              path: '/dashboard/products',
              icon: icon('ic_cart'),
            },
            {
              title: 'Chat',
              path: '/dashboard/chat',
              icon: icon2('chat'),
            },
          ]}
        />
      ) : null}

      {get(cat, 'data.role', '') === 'dispatcher' ? (
        <NavSection
          data={[
            {
              title: 'Main page',
              path: '/dashboard/main4',
              icon: icon2('chat'),
            },
            {
              title: 'Requests',
              path: '/dashboard/products',
              icon: icon('ic_cart'),
            },
            {
              title: 'Applications',
              path: '/dashboard/user',
              icon: icon2('list'),
            },
            {
              title: 'Chat',
              path: '/dashboard/chat',
              icon: icon2('chat'),
            },
          ]}
        />
      ) : null}

      {get(cat, 'data.role', '') === 'driver' ? (
        <NavSection
          data={[
            {
              title: 'Requests',
              path: '/dashboard/user',
              icon: icon2('list'),
            },
            {
              title: 'Chat',
              path: '/dashboard/chat',
              icon: icon2('chat'),
            },
          ]}
        />
      ) : null}

      {get(cat, 'data.role', '') === 'order_owner' ? (
        <NavSection
          data={[
            {
              title: 'Requests',
              path: '/dashboard/user',
              icon: icon2('list'),
            },
            {
              title: 'Chat',
              path: '/dashboard/chat',
              icon: icon2('chat'),
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
