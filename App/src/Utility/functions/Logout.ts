import axios, {AxiosError} from 'axios';
import {Server} from '../../constants/server/host';

export async function Logout(): Promise<string> {
  try {
    const response = await axios.post(`${Server}/auth/logout`);
    if (response.status == 200) {
      return 'logged out succesfully';
    }
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      return 'Something went wrong';
    }
  }
  return 'Something went wrong';
}
