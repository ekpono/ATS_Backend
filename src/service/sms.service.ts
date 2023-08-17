import axios from 'axios';
import { smsPassword, smsToken, smsUser } from '../config';
import { IMessage } from '../types/sms.type';
import logger from '../utils/logger';

// const smsProvider = axios.create({
//   baseURL:
//     'http://sms.bulksmsprovider.ng/api/?username=ebraboke@gmail.com&password=Spee@105',
//   params: {
//     username: smsUser,
//     password: smsPassword,
//     sender: 'Ace Recruitment',
//   },
// });

const smsProvider = axios.create({
  baseURL: 'https://www.bulksmsnigeria.com/api/v2/sms',
});

export const sendMessage = async (messageDto: IMessage) => {
  logger.info('starting sms service');
  const body = messageDto.body;
  const to = messageDto.to as string;
  const from = messageDto.from;

  const data = {
    from,
    body,
    to,
    api_token: smsToken,
  };

  logger.info('sending message');
  const response = await smsProvider.post('', data);

  logger.info('closing sms service');

  return response;
};

export const sendBulkMessage = async (messageDto: IMessage) => {
  logger.info('starting sms service');
  const body = messageDto.body;
  const mobiles = messageDto.to as string[];
  const from = messageDto.from;

  const to = mobiles.join(',');

  const data = {
    from,
    body,
    to,
  };

  logger.info('sending message');

  const response = await smsProvider.post('/', data);

  logger.info('closing sms service');
  return response;
};
