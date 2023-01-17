// component
import SvgColor from '../../../components/svg-color';


const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'login',
    path: '/login',
    icon: icon('ic_lock'),
  },
  {
    title: 'Главная',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Мои запросы',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Отчет',
    path: '/dashboard/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'Личные данные',
    path: '/dashboard/blog',
    icon: icon('ic_blog'),
  },
  {
    title: 'Мои договоры',
    path: '/dashboard/blog',
    icon: icon('ic_blog'),
  },

  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
