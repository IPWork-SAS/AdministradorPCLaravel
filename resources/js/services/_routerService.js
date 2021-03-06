// routes
// import Widgets from 'Routes/widgets';
// import Pages from 'Routes/pages';
// import AdvanceUIComponents from 'Routes/advance-ui-components';
// import CalendarComponents from 'Routes/calendar';
// import ChartsComponents from 'Routes/charts';
// import FormElements from 'Routes/forms';
// import Users from 'Routes/users';
// import Components from 'Routes/components';
// import Tables from 'Routes/tables';
// import Icons from 'Routes/icons';
// import Maps from 'Routes/maps';
// import DragAndDrop from 'Routes/drag-drop';
// import Editor from 'Routes/editor';
// import Ecommerce from 'Routes/ecommerce';
// import Dashboard from 'Routes/dashboard';
// import Crm from 'Routes/crm';
// import ImageCropper from 'Routes/image-cropper';
// import VideoPlayer from 'Routes/video-player';
// import Dropzone from 'Routes/dropzone';
import Events from 'Routes/events';
import DetailEvents from 'Routes/detail-events';
import campaña from 'Routes/campaña';
import zonas from 'Routes/zonas';
import dispositivos from 'Routes/dispositivos';
import Locations from 'Routes/locations';
import Analytical from 'Routes/analytical';
import Voucher from 'Routes/voucher';
import Vouchers from 'Routes/vouchers';
import VoucherInfo from 'Routes/voucher-info';
import Password from 'Routes/password';
import Passwords from 'Routes/passwords';
import PasswordInfo from 'Routes/password-info';
import AnalyticalCampaing from 'Routes/analytical-campaing';
import CMS from 'Routes/cms';

// async component
import {
   AsyncAboutUsComponent,
   AsyncChatComponent,
   AsyncMailComponent,
   AsyncTodoComponent,
} from 'Components/AsyncComponent/AsyncComponent';

export default [
   // {
   //    path: 'dashboard',
   //    component: Dashboard
   // },
   // {
   //    path: 'crm',
   //    component: Crm
   // },
   // {
   //    path: 'widgets',
   //    component: Widgets
   // },
   // {
   //    path: 'ecommerce',
   //    component: Ecommerce
   // },
   // {
   //    path: 'icons',
   //    component: Icons
   // },
   // {
   //    path: 'about-us',
   //    component: AsyncAboutUsComponent
   // },
   // {
   //    path: 'pages',
   //    component: Pages
   // },
   // {
   //    path: 'chat',
   //    component: AsyncChatComponent
   // },
   // {
   //    path: 'mail',
   //    component: AsyncMailComponent
   // },
   // {
   //    path: 'todo',
   //    component: AsyncTodoComponent
   // },
   // {
   //    path: 'charts',
   //    component: ChartsComponents
   // },
   // {
   //    path: 'tables',
   //    component: Tables
   // },
   // {
   //    path: 'maps',
   //    component: Maps
   // },
   // {
   //    path: 'users',
   //    component: Users
   // },
   // {
   //    path: 'ui-components',
   //    component: Components
   // },
   // {
   //    path: 'advanced-component',
   //    component: AdvanceUIComponents
   // },
   // {
   //    path: 'drag-andDrop',
   //    component: DragAndDrop
   // },
   // {
   //    path: 'forms',
   //    component: FormElements
   // },
   // {
   //    path: 'editor',
   //    component: Editor
   // },
   // {
   //    path: 'calendar',
   //    component: CalendarComponents
   // },
   // {
   //    path: 'image-cropper',
   //    component: ImageCropper
   // },
   // {
   //    path: 'video-player',
   //    component: VideoPlayer
   // },
   // {
   //    path: 'dropzone',
   //    component: Dropzone
   // },
   {
		path: 'events',
		component: Events
	},
   // {
   // 	path: 'events/detail-events',
   // 	component: DetailEvents
   // }
   {
      path: 'locations',
      component: Locations
   },
   {
      path: 'locations/:location',
      component: Analytical
   },
   {
      path: 'locations/:location/zonas',
      component: zonas
   },
   {
      path: 'locations/:location/zonas/dispositivos',
      component: dispositivos
   },
   {
      path: 'locations/:location/campañas',
      component: campaña
   },
   {
      path: 'locations/:location/campañas/crear/cms',
      component: CMS
   },
   {
      path: 'locations/:location/campañas/editar/cms',
      component: CMS
   },
   {
      path: 'locations/:location/campañas/:camp',
      component: DetailEvents
   },
   {
      path: 'locations/:location/campañas/:camp/dashboard',
      component: AnalyticalCampaing
   },
   {
      path: 'locations/:location/vouchers',
      component: Vouchers
   },
   {
      path: 'locations/:location/vouchers/voucher-info',
      component: VoucherInfo
   },
   {
      path: 'locations/:location/vouchers/voucher-info/create',
      component: Voucher
   },
   {
      path: 'locations/:location/contraseñas',
      component: Passwords
   },
   {
      path: 'locations/:location/contraseñas/contraseña-info',
      component: PasswordInfo
   },
   {
      path: 'locations/:location/contraseñas/contraseña-info/create',
      component: Password
   },
]