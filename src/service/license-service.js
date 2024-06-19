import LicenseRepository from '../repositories/license-repository.js';
import logger from '../utils/logger.js';

export default class LicenseService {
	constructor() {
		this.repo = new LicenseRepository();
	}

	async getLicenses(req) {
		try {
			const response = await this.repo.getLicenses(req.query);
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

	async updateLicense(req) {
		try {
			const id = parseInt(req.params.id);
			const existingLicense = await this.repo.getLicenses({ id });
			const { reason_id, other_reason, start_date, end_date, state } = req.body;
			if (!reason_id && !other_reason && !start_date && !end_date && !state) {
				return [
					{ success: false, message: 'No hay ningun dato para actualizar.' },
					400,
				];
			}
			if (existingLicense.length > 0) {
				await this.repo.updateLicense(id, req.body);
				return [
					{ success: true, message: 'Licencia actualizada correctamente' },
					201,
				];
			}
			return [
				{ success: false, message: 'No existe una licencia con ese ID.' },
				400,
			];
		} catch (error) {
			return this.handleError('updateLicense', error);
		}
	}

	async deleteLicense(req) {
		try {
			const id = req.params.id;
			const existingLicense = await this.repo.getLicenses({ id });
			if (existingLicense.length > 0) {
				await this.repo.deleteLicense(id);
				return [
					{ success: true, message: 'Licencia eliminada correctamente.' },
					202,
				];
			}
			return [
				{ success: false, message: 'No existe una licencia con ese ID.' },
				400,
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
