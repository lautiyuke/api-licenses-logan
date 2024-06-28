import pkg from 'pg';
import config from '../configs/db-config.js';

const { Pool } = pkg;
const pool = new Pool(config);

export default class EmployeeRepository {
	async getEmployees({ id, name, surname, email }) {
		const client = await pool.connect();
		let query = 'SELECT * FROM employees';

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
		if (surname) {
			params.push(`lower(surname) = lower($${cont})`);
			values.push(surname);
			cont++;
		}
		if (email) {
			params.push(`lower(email) = lower($${cont})`);
			values.push(email);
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

	async addEmployee(name, surname, email, password) {
		const client = await pool.connect();
		try {
			await client.query(
				'INSERT INTO employees (name, surname, email, password) VALUES ($1, $2, $3, $4)',
				[name, surname, email, password],
			);
		} finally {
			client.release();
		}
	}
}
