import { Router } from 'express';
import controller from '../controllers/posts.js';
import authorize from "../middlewares/authorize.js";
import validation from '../middlewares/validation.js';
import schema from '../schemas/posts.schema.js';

const router = Router();

// Վերլուծություն և պաշտպանություն
router.get('/', controller.getAll);
router.get('/:id', controller.getOne);

router.post(
    '/',
    authorize,
    validation(schema.create),
    controller.create
);

router.put(
    '/:id',
    authorize,
    validation(schema.update),
    controller.update
);

router.delete(
    '/:id',
    authorize,
    controller.remove
);

export default router;

