import { Router } from 'express';
import CountryService from '../service/country-service.js';
import { authMiddleware } from '../middlewares/auth-middleware.js';

const router = Router();
const svc = new CountryService();

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
	handleRequest((req) => svc.getCountries(req)),
);

router.post(
	'/',
	authMiddleware(3),
	handleRequest((req) => svc.addCountry(req)),
);

router.delete(
	'/:id',
	authMiddleware(3),
	handleRequest((req) => svc.deleteCountry(req)),
);

export default router;
