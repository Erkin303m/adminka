import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton } from '@mui/material';
import { get } from 'lodash';
import { useSelector } from 'react-redux';

import { bgBlur } from '../../../utils/cssStyles';
import AccountPopover from './AccountPopover';
import LanguagePopover from './LanguagePopover';
import './style.css';
import Iconify from '../../../components/iconify';

const NAV_WIDTH = 280;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 92;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  boxShadow: 'none',
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));
Header.propTypes = {
  onOpenNav: PropTypes.func,
};

export default function Header({ onOpenNav }) {
  const cat = JSON.parse(localStorage.getItem('userData'));
  const data = useSelector((state) => state);
  return (
    <StyledRoot>
      <StyledToolbar>
        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          <IconButton
            onClick={onOpenNav}
            sx={{
              mr: 1,
              color: 'text.primary',
              display: { lg: 'none' },
            }}
          >
            <Iconify icon="eva:menu-2-fill" />
          </IconButton>
          <AccountPopover />
          <div>
            <p className="number">
              {get(data, 'data.phone_number', '').length > 2
                ? get(data, 'data.phone_number', '')
                : get(cat, 'data.phone_number', '')}
            </p>
            <p className="companyName">
              {get(data, 'data.first_name', '').length > 2
                ? get(data, 'data.first_name', '')
                : get(cat, 'data.first_name', 'User')}
            </p>
          </div>
        </Stack>
        <Box sx={{ flexGrow: 1 }} />
        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          <LanguagePopover />
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  );
}
