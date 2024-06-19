import CountryRepository from '../repositories/country-repository.js';
import logger from '../utils/logger.js';

export default class CountryService {
	constructor() {
		this.repo = new CountryRepository();
	}

	async getCountries(req) {
		try {
			const { id, name } = req.query;
			const response = await this.repo.getCountries({ id, name });
			return response.length > 0
				? [{ success: true, response }, 200]
				: [
						{
							success: false,
							message: 'No hay ningun pais que cumpla con esos parametros.',
						},
				  ];
		} catch (error) {
			return this.handleError('getCountries', error);
		}
	}

	async addCountry(req) {
		try {
			const name = req.body.name;
			const existingCountry = await this.repo.getCountries({ name });
			if (existingCountry.length < 1) {
				await this.repo.addCountry(name);
				return [{ success: true, message: 'Pais agregado correctamente.' }, 201];
			}
			return [
				{ success: false, message: 'Ya existe un pais con ese nombre.' },
				400,
			];
		} catch (error) {
			return this.handleError('addCountry', error);
		}
	}

	async deleteCountry(req) {
		try {
			const id = req.params.id;
			const existingCountry = await this.repo.getCountries({ id });
			if (existingCountry.length > 0) {
				await this.repo.deleteCountry(id);
				return [{ success: true, message: 'Pais eliminado correctamente.' }, 202];
			}
			return [{ success: false, message: 'No existe un pais con ese ID.' }, 400];
		} catch (error) {
			return this.handleError('deleteCountry', error);
		}
	}

	async handleError(method, error) {
		logger.error(`CountryService - ${method}() : ${error.message}`);
		throw new Error(`CountryService - ${method}() : ${error.message}`);
	}
}
