import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import EmployeeRouter from './src/controllers/Employee-controller.js';
import RuleController from './src/controllers/rule-controller.js';
import CountryController from './src/controllers/country-controller.js';
import ReasonController from './src/controllers/reason-controller.js';
import LicenseController from './src/controllers/license-controller.js';
import errorHandler from './src/utils/error-handler.js';
import logger from './src/utils/logger.js';

const app = express();
const port = 3001;

const allowedOrigins = [''];
const corsOptions = {
	origin: (origin, callback) => {
		if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
			callback(null, true);
		} else {
			logger.error('No permitido por CORS: ', origin);
			callback(new Error('No permitido por CORS'));
		}
	},
};

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 20,
	message: {
		success: false,
		message:
			'Demasiadas solicitudes desde esta IP, por favor intente de nuevo en 15 minutos.',
	},
});

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('combined', { stream: logger.stream }));
app.use(limiter);

app.use('/api/employees', EmployeeRouter);
app.use('/api/rules', RuleController);
app.use('/api/countries', CountryController);
app.use('/api/reasons', ReasonController);
app.use('/api/licenses', LicenseController);
app.use(errorHandler);

app.listen(port, () => {
	logger.info(`App started on port: ${port}`);
});
