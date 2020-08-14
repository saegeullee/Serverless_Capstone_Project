import { decode } from 'jsonwebtoken';
import { JwtPayload } from '../auth/JwtPayload';

export function getUserId(event) {
  const authInfo = event.headers.Authorization;

  const token = authInfo.split(' ')[1];
  const decoded = decode(token) as JwtPayload;
  return decoded.sub;
}
