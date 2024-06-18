import pkg from 'pg';
import config from '../configs/db-config.js';

const { Pool } = pkg;
const pool = new Pool(config);

export default class ReasonRepository {
	async getReasons({ id, reason }) {
		const client = await pool.connect();
		let query = 'SELECT * FROM reasons';

		const params = [];
		const values = [];
		let cont = 1;

		if (id) {
			params.push(`id = $${cont}`);
			values.push(id);
			cont++;
		}
		if (reason) {
			params.push(`lower(reason) = lower($${cont})`);
			values.push(reason);
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

	async addReason(reason) {
		const client = await pool.connect();
		try {
			await client.query('INSERT INTO reasons (reason) VALUES ($1)', [reason]);
		} finally {
			client.release();
		}
	}

	async deleteReason(id) {
		const client = await pool.connect();
		try {
			await client.query('DELETE FROM reasons WHERE id = $1', [id]);
		} finally {
			client.release();
		}
	}
}
