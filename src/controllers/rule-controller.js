import { Router } from 'express';
import RuleService from '../service/rule-service.js';
import { authMiddleware } from '../middlewares/auth-middleware.js';

const router = Router();
const svc = new RuleService();

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
	handleRequest((req) => svc.getRules(req)),
);

router.post(
	'/',
	authMiddleware(3),
	handleRequest((req) => svc.addRule(req)),
);

router.patch(
	'/:id',
	authMiddleware(3),
	handleRequest((req) => svc.updateRule(req)),
);

router.delete(
	'/:id',
	authMiddleware(3),
	handleRequest((req) => svc.deleteRule(req)),
);

export default router;
