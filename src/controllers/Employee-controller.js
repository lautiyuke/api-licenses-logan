import { Router } from 'express';
import EmployeeService from '../service/EmployeeService.js';

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
	handleRequest((req) => svc.getEmployees()),
);

export default router;
