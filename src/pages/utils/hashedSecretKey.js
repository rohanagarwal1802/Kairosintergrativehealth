import crypto from 'crypto';

const hashSecretKey = (key) => {
  return crypto.createHash('sha256').update(key).digest('base64').substring(0, 32);
};
export default hashSecretKey