import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { alpha } from '@mui/material/styles';
import { MenuItem, Stack, IconButton, Popover } from '@mui/material';
import './style.css';

const LANGS = [
  {
    value: 'us',
    label: 'English',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Flag_of_Great_Britain_%281707%E2%80%931800%29.svg/2560px-Flag_of_Great_Britain_%281707%E2%80%931800%29.svg.png',
  },
  {
    value: 'ru',
    label: 'Русский',
    url: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f3/Flag_of_Russia.svg/800px-Flag_of_Russia.svg.png',
  },
];

export default function LanguagePopover() {
  const [open, setOpen] = useState(null);
  const [pictureIndex, setPictureIndex] = useState(0);
  const { i18n } = useTranslation();

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = (l, i) => {
    setOpen(null);
    i18n.changeLanguage(l);
    setPictureIndex(i);
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
          }),
        }}
      >
        <img src={LANGS[pictureIndex].url} alt={LANGS[pictureIndex].label} className="imgFlag" />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Stack spacing={0.75}>
          {LANGS.map((option, i) => (
            <MenuItem
              key={option.value}
              selected={option.value === LANGS[0].value}
              onClick={() => handleClose(option.value, i)}
            >
              <img src={LANGS[i].url} alt={LANGS[i].label} className="imgFlag2" />
              {option.label}
            </MenuItem>
          ))}
        </Stack>
      </Popover>
    </>
  );
}
