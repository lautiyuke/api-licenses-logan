import pkg from 'pg';
import config from '../configs/db-config.js';

const { Pool } = pkg;
const pool = new Pool(config);

export default class CountryRepository {
	async getCountries({ id, name }) {
		const client = await pool.connect();
		let query = 'SELECT * FROM countries';

		const params = [];
		const values = [];
		let cont = 1;

		if (id) {
			params.push(`id = $${cont}`);
			values.push(id);
			cont++;
		}
		if (name) {
			params.push(`lower(name) = lower($${cont})`);
			values.push(name);
			cont++;
		}

		if (params.length > 0) {
			query += ' WHERE ' + params.join(' AND ');
		}

		try {
			const result = await client.query(query, values);
			return result.rows;
		} finally {
			client.release();
		}
	}

	async addCountry(name) {
		const client = await pool.connect();
		try {
			await client.query('INSERT INTO countries (name) VALUES ($1)', [name]);
		} finally {
			client.release();
		}
	}

	async deleteCountry(id) {
		const client = await pool.connect();
		try {
			await client.query('DELETE FROM countries WHERE id = $1', [id]);
		} finally {
			client.release();
		}
	}
}
