import pkg from 'pg';
import config from '../configs/db-config.js';

const { Pool } = pkg;
const pool = new Pool(config);

export default class EmployeeRepository {
	async getEmployees() {
		const client = await pool.connect();
		try {
			const result = await client.query('SELECT * FROM Employees');
			return result.rows;
		} finally {
			client.release();
		}
	}
}
