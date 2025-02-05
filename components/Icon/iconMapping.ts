import Search from './icons/Search';
import Meter from './icons/Meter';
import Menu from './icons/Menu';
import Locked from './icons/Locked';
import Email from './icons/Email';
import Password from './icons/Password';
import Download from './icons/Download';
import Upload from './icons/Upload';
import Left from './icons/Left';
import Right from './icons/Right';
import Up from './icons/Up';
import Down from './icons/Down';
import Settings from './icons/Settings';
import Cart from './icons/Cart';
import Task from './icons/Task';
import Trash from './icons/Trash';
import User from './icons/User';
import { TrendArrowDown } from "@/components/Icon/icons/TrendArrowDown";
import { TrendArrowUp } from "@/components/Icon/icons/TrendArrowUp";

export type IconName =
  | "Search"
  | "Meter"
  | "Menu"
  | "Locked"
  | "Email"
  | "Password"
  | "Download"
  | "Upload"
  | "Settings"
  | "Cart"
  | "Task"
  | "Trash"
  | "User"
  | "Up"
  | "Down"
  | "Left"
  | "Right"
  | "TrendArrowUp"
  | "TrendArrowDown";

export const iconMapping: Record<IconName, React.FC<any>> = {
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
  Up,
  Down,
  Left,
  Right,
  TrendArrowDown,
  TrendArrowUp,
};