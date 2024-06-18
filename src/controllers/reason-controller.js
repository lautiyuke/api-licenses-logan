import { Router } from 'express';
import ReasonService from '../service/reason-service.js';
import { authMiddleware } from '../middlewares/auth-middleware.js';

const router = Router();
const svc = new ReasonService();

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
	authMiddleware(2),
	handleRequest((req) => svc.getReasons(req)),
);

router.post(
	'/',
	authMiddleware(3),
	handleRequest((req) => svc.addReason(req)),
);

router.delete(
	'/:id',
	authMiddleware(3),
	handleRequest((req) => svc.deleteReason(req)),
);

export default router;
