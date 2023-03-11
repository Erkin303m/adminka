import { get } from 'lodash';

// ----------------------------------------------------------------------
const cat = JSON.parse(localStorage.getItem('userData'));

const account = {
  displayName: get(cat, 'data.first_name', ''),
  displayName2: get(cat, 'data.last_name', ''),
  email: get(cat, 'data.company_name', ''),
  role: get(cat, 'data.role', ''),
  photoURL: '/assets/images/avatars/avatar_default.jpg',
};

export default account;
