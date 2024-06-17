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
	handleRequest((req) => svc.getRules()),
);

router.get(
	'/:id',
	authMiddleware(2),
	handleRequest((req) => svc.getRule(req)),
);

router.post(
	'/',
	authMiddleware(3),
	handleRequest((req) => svc.addRule(req)),
);

export default router;
