import ReasonRepository from '../repositories/reason-repository.js';
import logger from '../utils/logger.js';

export default class ReasonService {
	constructor() {
		this.repo = new ReasonRepository();
	}

	async getReasons(req) {
		try {
			const { id, reason } = req.query;
			const response = await this.repo.getReasons({ id, reason });
			return response.length > 0
				? [{ success: true, response }, 200]
				: [
						{
							success: false,
							message: 'No hay ninguna razon que cumpla con esos parametros.',
						},
				  ];
		} catch (error) {
			return this.handleError('getReasons', error);
		}
	}

	async addReason(req) {
		try {
			const reason = req.body.reason;
			const existingReason = await this.repo.getReasons({ reason });
			if (existingReason.length < 1) {
				await this.repo.addReason(reason);
				return [{ success: true, message: 'Razon agregada correctamente.' }, 201];
			}
			return [{ success: false, message: 'Ya existe esa razon.' }, 400];
		} catch (error) {
			return this.handleError('addReason', error);
		}
	}

	async deleteReason(req) {
		try {
			const id = req.params.id;
			const existingReason = await this.repo.getReasons({ id });
			if (existingReason.length > 0) {
				await this.repo.deleteReason(id);
				return [{ success: true, message: 'Razon eliminada correctamente.' }, 202];
			}
			return [{ success: false, message: 'No existe esa razon.' }, 400];
		} catch (error) {
			return this.handleError('deleteReason', error);
		}
	}

	async handleError(method, error) {
		logger.error(`CountryService - ${method}() : ${error.message}`);
		throw new Error(`CountryService - ${method}() : ${error.message}`);
	}
}
