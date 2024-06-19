import { Router } from 'express';
import LicenseService from '../service/license-service.js';
import { authMiddleware } from '../middlewares/auth-middleware.js';

const router = Router();
const svc = new LicenseService();

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
	handleRequest((req) => svc.getLicenses(req)),
);

router.post(
	'/',
	authMiddleware(3),
	handleRequest((req) => svc.addLicense(req)),
);

router.delete(
	'/:id',
	authMiddleware(3),
	handleRequest((req) => svc.deleteLicense(req)),
);

export default router;
