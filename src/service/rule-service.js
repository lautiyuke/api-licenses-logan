import RuleRepository from '../repositories/rule-repository.js';
import logger from '../utils/logger.js';

export default class RulesService {
	constructor() {
		this.repo = new RuleRepository();
	}

	async getRules(req) {
		try {
			const response = await this.repo.getRules(req.query);
			return response.length > 0
				? [{ success: true, response }, 200]
				: [
						{
							success: false,
							message: 'No hay ninguna regla que cumpla con esos parametros.',
						},
						200,
				  ];
		} catch (error) {
			return this.handleError('getRules', error);
		}
	}

	async addRule(req) {
		try {
			const { country_id, rule } = req.body;
			const existingRule = await this.repo.getRules({ country_id });
			if (existingRule.length == 0) {
				await this.repo.addRule(country_id, rule);
				return [{ success: true, message: 'Regla agregada correctamente.' }, 201];
			}
			return [
				{ success: false, message: 'Ya existe una regla para ese pais.' },
				400,
			];
		} catch (error) {
			if (error.code === '23503') {
				return [{ success: false, message: 'El código de país no existe.' }, 400];
			}
			return this.handleError('addRule', error);
		}
	}

	async updateRule(req) {
		try {
			await this.repo.updateRule(req.params.id, req.body.rule);
			return [{ success: true, message: 'Regla actualizada correctamente.' }, 202];
		} catch (error) {
			return this.handleError('updateRule', error);
		}
	}

	async deleteRule(req) {
		const rule_id = req.params.id;
		try {
			const rule = await this.repo.getRules({ rule_id });
			if (rule.length > 0) {
				await this.repo.deleteRule(rule_id);
				return [{ success: true, message: 'Regla eliminada correctamente' }, 202];
			}
			return [{ success: false, message: 'No existe una regla con ese ID' }, 400];
		} catch (error) {
			return this.handleError('deleteRule', error);
		}
	}

	async handleError(method, error) {
		logger.error(`RuleService - ${method}() : ${error.message}`);
		throw new Error(`RuleService - ${method}() : ${error.message}`);
	}
}
