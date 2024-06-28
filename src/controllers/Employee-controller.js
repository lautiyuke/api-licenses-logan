import { Router } from 'express';
import EmployeeService from '../service/employee-service.js';
import { authMiddleware } from '../middlewares/auth-middleware.js';

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
	authMiddleware(3),
	handleRequest((req) => svc.getEmployees(req)),
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
