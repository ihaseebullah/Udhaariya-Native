import axios, {AxiosError} from 'axios';
import {Server} from '../../constants/server/host';
import {UserDataProps} from '../../components/Types/ComponentTypes';
import {User} from '../../context/UserContext';

export async function CheckUserIsLoggedIn(): Promise<User | null> {
  try {
    const response = await axios.get(`${Server}/root`);
    if (response.status == 200) {
      const user = response.data;
      return user;
    }
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      return err.response?.data;
    }
  }
  return null;
}
