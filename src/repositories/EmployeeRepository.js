import pkg from 'pg';
import config from '../configs/db-config.js';

const { Pool } = pkg;
const pool = new Pool(config);

export default class EmployeeRepository {
	async getEmployee(email) {
		const client = await pool.connect();
		try {
			const result = await client.query(
				`SELECT * FROM employees WHERE (email = $1 AND $1 IS NOT NULL)`,
				[email],
			);
			return result.rows[0];
		} finally {
			client.release();
		}
	}

	async getEmployees() {
		const client = await pool.connect();
		try {
			const result = await client.query('SELECT * FROM employees ORDER BY id');
			return result.rows;
		} finally {
			client.release();
		}
	}

	async register(name, surname, email, password) {
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
