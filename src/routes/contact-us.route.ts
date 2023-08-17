import { Router } from 'express';
import {
  createContact,
  deleteContact,
  findContact,
  findContacts,
} from '../controllers/contact.controller';

const contactRoutes = Router();

contactRoutes.route('/').get(findContacts).post(createContact);
contactRoutes.route('/:id').get(findContact).delete(deleteContact);

export default contactRoutes;
