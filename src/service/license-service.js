import LicenseRepository from '../repositories/license-repository.js';
import logger from '../utils/logger.js';

export default class LicenseService {
	constructor() {
		this.repo = new LicenseRepository();
	}

	async getLicenses(req) {
		try {
			const response = await this.repo.getLicenses();
			return response.length > 0
				? [{ success: true, response }, 200]
				: [
						{
							success: false,
							message: 'No hay ninguna licencia que cumpla con esos parametros.',
						},
						400,
				  ];
		} catch (error) {
			return this.handleError('getLicenses', error);
		}
	}

	async addLicense(req) {
		try {
			await this.repo.addLicense(req.body);
			return [{ success: true, message: 'Licencia agregada correctamente.' }, 201];
		} catch (error) {
			return this.handleError('addLicense', error);
		}
	}

	async deleteLicense(req) {
		try {
			const id = req.params.id;
			await this.repo.deleteLicense(id);
			return [
				{ success: true, message: 'Licencia eliminada correctamente.' },
				202,
			];
		} catch (error) {
			return this.handleError('deleteLicense', error);
		}
	}

	async handleError(method, error) {
		logger.error(`LicenseService - ${method}() : ${error.message}`);
		throw new Error(`LicenseService - ${method}() : ${error.message}`);
	}
}
