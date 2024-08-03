import { Router } from 'express';
import {
  createStudentController,
  deleteStudentController,
  getStudentByIdController,
  getStudentsController,
  patchStudentController,
  upsertStudentController,
} from '../controllers/students.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createStudentSchema } from '../validation/students.js';
import { updateStudentSchema } from '../validation/students.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { checkRoles } from '../middlewares/checkRoles.js';
import { ROLES } from '../constants/index.js';

const router = Router();

router.use(authenticate);

router.get('/', checkRoles(ROLES.TEACHER), ctrlWrapper(getStudentsController));

router.get(
  '/:studentId',
  isValidId,
  checkRoles(ROLES.TEACHER, ROLES.PARENT),
  ctrlWrapper(getStudentByIdController),
);

// router.post('/students', ctrlWrapper(createStudentController));
router.post(
  '/register',
  checkRoles(ROLES.TEACHER),
  validateBody(createStudentSchema),
  ctrlWrapper(createStudentController),
);

router.delete(
  '/:studentId',
  isValidId,
  checkRoles(ROLES.TEACHER),
  ctrlWrapper(deleteStudentController),
);

router.put(
  '/:studentId',
  checkRoles(ROLES.TEACHER),
  validateBody(createStudentSchema),
  ctrlWrapper(upsertStudentController),
);

router.patch(
  '/:studentId',
  isValidId,
  checkRoles(ROLES.TEACHER, ROLES.PARENT),
  validateBody(updateStudentSchema),
  ctrlWrapper(patchStudentController),
);

export default router;
