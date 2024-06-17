import RuleRepository from '../repositories/rule-repository.js';
import logger from '../utils/logger.js';

export default class RulesService {
	constructor() {
		this.repo = new RuleRepository();
	}

	async getRule({ params }) {
		try {
			const response = await this.repo.getRule(params.id);
			return response
				? [{ success: true, response }, 200]
				: [{ success: false, message: 'No hay ninguna regla con ese ID.' }, 404];
		} catch (error) {
			return this.handleError('getRule', error);
		}
	}

	async getRules() {
		try {
			const response = await this.repo.getRules();
			return response.length > 0
				? [{ success: true, response }, 200]
				: [{ success: false, message: 'No hay ninguna regla actualmente.' }, 204];
		} catch (error) {
			return this.handleError('getRules', error);
		}
	}

	async addRule({ body }) {
		try {
			const { country_id, rule } = body;
			const existingRule = await this.repo.getRuleByCountryId(country_id);
			if (existingRule) {
				return [
					{
						success: false,
						message: 'Ya existe una regla para este código de país.',
					},
					409,
				];
			}

			await this.repo.addRule(country_id, rule);
			return [{ success: true, message: 'Regla agregada correctamente.' }, 201];
		} catch (error) {
			if (error.code === '23503') {
				return [{ success: false, message: 'El código de país no existe.' }, 400];
			}
			return this.handleError('addRule', error);
		}
	}

	async handleError(method, error) {
		logger.error(`RuleService - ${method}() : ${error.message}`);
		throw new Error(`RuleService - ${method}() : ${error.message}`);
	}
}
