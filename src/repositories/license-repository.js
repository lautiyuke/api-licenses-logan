import pkg from 'pg';
import config from '../configs/db-config.js';

const { Pool } = pkg;
const pool = new Pool(config);

export default class LicenseRepository {
	async getLicenses() {
		const client = await pool.connect();
		try {
			const result = await client.query('SELECT * FROM licenses');
			return result.rows;
		} finally {
			client.release();
		}
	}

	async addLicense({
		employee_id,
		reason_id,
		other_reason,
		start_date,
		end_date,
		state,
	}) {
		const client = await pool.connect();
		try {
			await client.query(
				'INSERT INTO licenses (employee_id, reason_id, other_reason, start_date, end_date, state) VALUES ($1, $2, $3, $4, $5, $6)',
				[employee_id, reason_id, other_reason, start_date, end_date, state],
			);
		} finally {
			client.release();
		}
	}

	async deleteLicense(id) {
		const client = await pool.connect();
		try {
			await client.query('DELETE FROM licenses WHERE id = $1', [id]);
		} finally {
			client.release();
		}
	}
}
