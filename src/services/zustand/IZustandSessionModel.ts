import { User } from '../auth/authService';

export interface ZustandSessionModel {
  ModalDebugStatus?: boolean;
  user?: User;
  isAuthenticated?: boolean;
}