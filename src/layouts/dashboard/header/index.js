import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar } from '@mui/material';
import { get } from 'lodash';
import { useSelector } from 'react-redux';

import { bgBlur } from '../../../utils/cssStyles';
import AccountPopover from './AccountPopover';
import LanguagePopover from './LanguagePopover';
import './style.css';

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

export default function Header() {
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
