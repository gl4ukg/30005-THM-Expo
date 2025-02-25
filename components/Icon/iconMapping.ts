import Search from './icons/Search';
import Meter from './icons/Meter';
import Menu from './icons/Menu';
import Locked from './icons/Locked';
import Email from './icons/Email';
import Password from './icons/Password';
import Download from './icons/Download';
import Upload from './icons/Upload';
import ChevronLeft from './icons/ChevronLeft';
import ChevronRight from './icons/ChevronRight';
import ChevronUp from './icons/ChevronUp';
import ChevronDown from './icons/ChevronDown';
import Settings from './icons/Settings';
import Cart from './icons/Cart';
import Task from './icons/Task';
import Trash from './icons/Trash';
import User from './icons/User';
import Eye from './icons/Eye';
import EyeOff from './icons/EyeOff';
import Industry from './icons/Industry';
import Phone from './icons/Phone';
import TrendArrowDown from './icons/TrendArrowDown';
import TrendArrowUp from './icons/TrendArrowUp';
import Alert from './icons/Alert';
import CheckboxChecked from './icons/CheckboxChecked';
import CaretDown from './icons/CaretDown';
import CaretLeft from './icons/CaretLeft';
import CaretRight from './icons/CaretRight';
import CaretUp from './icons/CaretUp';
import Camera from './icons/Camera';
import Cross from './icons/Cross';
import Inspect from './icons/Inspect';
import ArrowLeft from './icons/ArrowLeft';
import ArrowRight from './icons/ArrowRight';
import Image from './icons/Image';

export type IconName =
  | 'Alert'
  | 'CheckboxChecked'
  | 'Search'
  | 'Meter'
  | 'Menu'
  | 'Locked'
  | 'Email'
  | 'Password'
  | 'Download'
  | 'Upload'
  | 'Settings'
  | 'Cart'
  | 'Task'
  | 'Trash'
  | 'User'
  | 'ChevronUp'
  | 'ChevronDown'
  | 'ChevronLeft'
  | 'ChevronRight'
  | 'TrendArrowUp'
  | 'TrendArrowDown'
  | 'Eye'
  | 'EyeOff'
  | 'Industry'
  | 'Phone'
  | 'CaretDown'
  | 'CaretLeft'
  | 'CaretRight'
  | 'CaretUp'
  | 'Camera'
  | 'Cross'
  | 'Inspect'
  | 'ArrowLeft'
  | 'ArrowRight'
  | 'Image';

export const iconMapping: Record<IconName, React.FC<any>> = {
  Alert,
  CheckboxChecked,
  Eye,
  EyeOff,
  Industry,
  Phone,
  Search,
  Meter,
  Menu,
  Locked,
  Email,
  Password,
  Download,
  Upload,
  Settings,
  Cart,
  Task,
  Trash,
  User,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  TrendArrowDown,
  TrendArrowUp,
  CaretDown,
  CaretLeft,
  CaretRight,
  CaretUp,
  Camera,
  Cross,
  Inspect,
  ArrowLeft,
  ArrowRight,
  Image,
};
