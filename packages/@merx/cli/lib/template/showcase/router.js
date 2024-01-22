import Navigation from '@showcase/default/navigation';
import Button from '@showcase/default/button';
import Cell from '@showcase/default/cell';
import Header from '@showcase/default/header';
import Tab from '@showcase/default/tab';
import Icon from '@showcase/default/icon';
import Layout from '@showcase/default/layout';
import Popup from '@showcase/default/popup';
import Badge from '@showcase/default/badge';
import Pagination from '@showcase/default/pagination';
import Tabbar from '@showcase/default/tabbar';
import Treeselect from '@showcase/default/treeselect';
import Checkbox from '@showcase/default/checkbox';
import DatetimePicker from '@showcase/default/datepicker';
import Field from '@showcase/default/field';
import NumberKeyboard from '@showcase/default/numberkeyboard';
import PasswordInput from '@showcase/default/passwordinput';
import Picker from '@showcase/default/picker';
import Radio from '@showcase/default/radio';
import Rate from '@showcase/default/rate';
import Search from '@showcase/default/search';
import Slider from '@showcase/default/slider';
import Stepper from '@showcase/default/stepper';
import Switch from '@showcase/default/switch';
import SwitchCell from '@showcase/default/switchcell';
import Uploader from '@showcase/default/uploader';
import ActionSheet from '@showcase/default/actionsheet';
import Dialog from '@showcase/default/dialog';
import Loading from '@showcase/default/loading';
import Notify from '@showcase/default/notify';
import Toast from '@showcase/default/toast';
import SwipeCell from '@showcase/default/swipecell';
import PullDown from '@showcase/default/pulldown';
import Minirefresh from '@showcase/default/minirefresh';
import Circle from '@showcase/default/circle';
import Collapse from '@showcase/default/collapse';
import ImagePreview from '@showcase/default/imagepreview';
import LazyLoad from '@showcase/default/lazyload';
import NoticeBar from '@showcase/default/noticebar';
import Panel from '@showcase/default/panel';
import Progress from '@showcase/default/progress';
import Steps from '@showcase/default/steps';
import Gallery from '@showcase/default/gallery';
import Tag from '@showcase/default/tag';
import InlineStyle from '@showcase/default/inlinestyle';
import AddressEdit from '@showcase/default/addressedit';
import AddressList from '@showcase/default/addresslist';
import Area from '@showcase/default/area';
import Card from '@showcase/default/card';
import Contact from '@showcase/default/contact';
import GoodsAction from '@showcase/default/goodsaction';
import SubmitBar from '@showcase/default/submitbar';
import PullUp from '@showcase/default/pullup';
import Pulltorefresh from '@showcase/default/pulltorefresh';
import Amap from '@showcase/default/amap';
import FileInput from '@showcase/default/fileinput';
import VerifyCode from '@showcase/default/verifycode';
import GridUnlock from '@showcase/default/gridunlock';
import EasyCalendar from '@showcase/default/easycalendar';
import Form from '@showcase/default/form';
import Image from '@showcase/default/image';
import Calendar from '@showcase/default/calendar';
import DropdownMenu from '@showcase/default/dropdownMenu';
import Overlay from '@showcase/default/overlay';
import ShareSheet from '@showcase/default/sharesheet';
import CountDown from '@showcase/default/countdown';
import Grid from '@showcase/default/grid';
import Divider from '@showcase/default/divider';
import Empty from '@showcase/default/empty';
import Skeleton from '@showcase/default/skeleton';
import Sticky from '@showcase/default/sticky';
import IndexBar from '@showcase/default/indexbar';
import Sidebar from '@showcase/default/sidebar';

const routes = [
  {
    path: '*',
    redirect: '/navigation',
  },
  {
    path: '/navigation',
    component: Navigation,
  },
  {
    path: '/button',
    component: Button,
  },
  {
    path: '/cell',
    component: Cell,
  },
  {
    path: '/header',
    component: Header,
  },
  {
    path: '/tab',
    component: Tab,
  },
  {
    path: '/icon',
    component: Icon,
  },
  {
    path: '/layout',
    component: Layout,
  },
  {
    path: '/popup',
    component: Popup,
  },
  {
    path: '/badge',
    component: Badge,
  },
  {
    path: '/pagination',
    component: Pagination,
  },
  {
    path: '/tabbar',
    component: Tabbar,
  },
  {
    path: '/treeselect',
    component: Treeselect,
  },
  {
    path: '/checkbox',
    component: Checkbox,
  },
  {
    path: '/datepicker',
    component: DatetimePicker,
  },
  {
    path: '/field',
    component: Field,
  },
  {
    path: '/numberkeyboard',
    component: NumberKeyboard,
  },
  {
    path: '/passwordinput',
    component: PasswordInput,
  },
  {
    path: '/picker',
    component: Picker,
  },
  {
    path: '/radio',
    component: Radio,
  },
  {
    path: '/rate',
    component: Rate,
  },
  {
    path: '/search',
    component: Search,
  },
  {
    path: '/slider',
    component: Slider,
  },
  {
    path: '/stepper',
    component: Stepper,
  },
  {
    path: '/switch',
    component: Switch,
  },
  {
    path: '/switchcell',
    component: SwitchCell,
  },
  {
    path: '/uploader',
    component: Uploader,
  },
  {
    path: '/actionsheet',
    component: ActionSheet,
  },
  {
    path: '/dialog',
    component: Dialog,
  },
  {
    path: '/loading',
    component: Loading,
  },
  {
    path: '/notify',
    component: Notify,
  },
  {
    path: '/toast',
    component: Toast,
  },
  {
    path: '/swipecell',
    component: SwipeCell,
  },
  {
    path: '/pulldown',
    component: PullDown,
  },
  {
    path: '/circle',
    component: Circle,
  },
  {
    path: '/collapse',
    component: Collapse,
  },
  {
    path: '/imagepreview',
    component: ImagePreview,
  },
  {
    path: '/lazyload',
    component: LazyLoad,
  },
  {
    path: '/noticebar',
    component: NoticeBar,
  },
  {
    path: '/panel',
    component: Panel,
  },
  {
    path: '/progress',
    component: Progress,
  },
  {
    path: '/steps',
    component: Steps,
  },
  {
    path: '/gallery',
    component: Gallery,
  },
  {
    path: '/tag',
    component: Tag,
  },
  {
    path: '/inlinestyle',
    component: InlineStyle,
  },
  {
    path: '/addressedit',
    component: AddressEdit,
  },
  {
    path: '/addresslist',
    component: AddressList,
  },
  {
    path: '/area',
    component: Area,
  },
  {
    path: '/card',
    component: Card,
  },
  {
    path: '/contact',
    component: Contact,
  },
  {
    path: '/goodsaction',
    component: GoodsAction,
  },
  {
    path: '/submitbar',
    component: SubmitBar,
  },
  {
    path: '/pullup',
    component: PullUp,
  },
  {
    path: '/pulltorefresh',
    component: Pulltorefresh,
  },
  {
    path: '/amap',
    component: Amap,
  },
  {
    path: '/fileinput',
    component: FileInput,
  },
  {
    path: '/verifycode',
    component: VerifyCode,
  },
  {
    path: '/gridunlock',
    component: GridUnlock,
  },
  {
    path: '/easycalendar',
    component: EasyCalendar,
  },
  {
    path: '/Minirefresh',
    component: Minirefresh,
  },
  {
    path: '/form',
    component: Form,
  },
  {
    path: '/image',
    component: Image,
  },
  {
    path: '/calendar',
    component: Calendar,
  },
  {
    path: '/dropdownMenu',
    component: DropdownMenu,
  },
  {
    path: '/overlay',
    component: Overlay,
  },
  {
    path: '/sharesheet',
    component: ShareSheet,
  },
  {
    path: '/countdown',
    component: CountDown,
  },
  {
    path: '/grid',
    component: Grid,
  },
  {
    path: '/divider',
    component: Divider,
  },
  {
    path: '/empty',
    component: Empty,
  },
  {
    path: '/skeleton',
    component: Skeleton,
  },
  {
    path: '/sticky',
    component: Sticky,
  },
  {
    path: '/indexbar',
    component: IndexBar,
  },
  {
    path: '/sidebar',
    component: Sidebar,
  },
];

export default routes;
