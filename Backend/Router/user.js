import express from 'express';
import { create, update, fetch, getOne, deleteUser } from '../Controller/user.js';

const router = express.Router();

router.post('/create', create);        // POST http://localhost:3000/api/user/create
router.get('/fetch', fetch);           // GET  http://localhost:3000/api/user/fetch
router.get('/getOne/:id', getOne);     // GET  http://localhost:3000/api/user/getOne/:id
router.put('/update/:id', update);     // PUT  http://localhost:3000/api/user/update/:id
router.delete('/delete/:id', deleteUser); // DELETE http://localhost:3000/api/user/delete/:id

export default router;