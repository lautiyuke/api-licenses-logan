import EmployeeRepository from '../repositories/EmployeeRepository.js';
import logger from '../utils/logger.js';

export default class EmployeeService {
	constructor() {
		this.repo = new EmployeeRepository();
	}

	async getEmployees() {
		try {
			const response = await this.repo.getEmployees();
			return [{ success: true, response }, 200];
		} catch (error) {
			return this.handleError('getEmployees', error);
		}
	}

	async handleError(method, error) {
		logger.error(`Error en el servicio - ${method}() : ${error.message}`);
		throw new Error(`Error en el servicio - ${method}() : ${error.message}`);
	}
}
