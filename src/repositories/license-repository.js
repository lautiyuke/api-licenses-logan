import pkg from 'pg';
import config from '../configs/db-config.js';

const { Pool } = pkg;
const pool = new Pool(config);

export default class LicenseRepository {
	async getLicenses({
		id,
		employee_id,
		reason_id,
		other_reason,
		start_date,
		end_date,
		state,
	}) {
		const client = await pool.connect();
		let query = 'SELECT * FROM licenses';

		const params = [];
		const values = [];
		let cont = 1;

		if (id) {
			params.push(`id = $${cont}`);
			values.push(id);
			cont++;
		}
		if (employee_id) {
			params.push(`employee_id = $${cont}`);
			values.push(employee_id);
			cont++;
		}
		if (reason_id) {
			params.push(`reason_id = $${cont}`);
			values.push(reason_id);
			cont++;
		}
		if (other_reason) {
			params.push(`lower(other_reason) = lower($${cont})`);
			values.push(other_reason);
			cont++;
		}
		if (start_date) {
			params.push(`start_date = $${cont}`);
			values.push(start_date);
			cont++;
		}
		if (end_date) {
			params.push(`end_date = $${cont}`);
			values.push(end_date);
			cont++;
		}
		if (state) {
			params.push(`lower(state) = lower($${cont})`);
			values.push(state);
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

	async updateLicense(
		id,
		{ reason_id, other_reason, start_date, end_date, state },
	) {
		const client = await pool.connect();
		let query = 'UPDATE licenses SET ';

		const params = [];
		const values = [];
		let cont = 1;

		if (reason_id !== undefined) {
			params.push(`reason_id = $${cont}`);
			values.push(reason_id);
			cont++;
		}
		if (other_reason) {
			params.push(`other_reason = $${cont}`);
			values.push(other_reason);
			cont++;
		}
		if (start_date) {
			params.push(`start_date = $${cont}`);
			values.push(start_date);
			cont++;
		}
		if (end_date) {
			params.push(`end_date = $${cont}`);
			values.push(end_date);
			cont++;
		}
		if (state) {
			params.push(`state = $${cont}`);
			values.push(state);
			cont++;
		}

		query += params.join(', ');
		query += ' WHERE id = $' + cont;
		values.push(id);

		try {
			await client.query(query, values);
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
