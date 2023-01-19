import React from 'react';
import { get } from 'lodash';
import SvgColor from '../../../components/svg-color';

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;
const cat = JSON.parse(localStorage.getItem('userData'));

const navConfig =
  get(cat, 'data.role', '') === 'director'
    ? [
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
          title: 'Отчет',
          path: '/dashboard/products',
          icon: icon('ic_cart'),
        },
        {
          title: 'Чат',
          path: '/dashboard/chat',
          icon: icon('ic_blog'),
        },
        {
          title: 'Мои договоры',
          path: '/dashboard/blog',
          icon: icon('ic_blog'),
        },
        {
          title: 'Xodim',
          path: '/dashboard/xodim',
          icon: icon('ic_blog'),
        },
      ]
    : [];

export default navConfig;
