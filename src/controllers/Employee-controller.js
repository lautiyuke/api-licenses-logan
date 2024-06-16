import { Router } from 'express';
import EmployeeService from '../service/EmployeeService.js';
import {
	authMiddleware,
	authorizeMiddleware,
} from '../middlewares/auth-middleware.js';

const router = Router();
const svc = new EmployeeService();

const handleRequest = (serviceMethod) => async (req, res, next) => {
	try {
		const [response, status] = await serviceMethod(req);
		res.status(status).json(response);
	} catch (error) {
		next(error);
	}
};

router.get(
	'/',
	authMiddleware,
	authorizeMiddleware(3),
	handleRequest((req) => svc.getEmployees()),
);

router.post(
	'/login',
	handleRequest((req) => svc.login(req)),
);

router.post(
	'/register',
	handleRequest((req) => svc.register(req)),
);

export default router;
