import pkg from 'pg';
import config from '../configs/db-config.js';

const { Pool } = pkg;
const pool = new Pool(config);

export default class RuleRepository {
	async getRule(id) {
		const client = await pool.connect();
		try {
			const result = await client.query(`SELECT * FROM rules WHERE id = $1`, [id]);
			return result.rows[0];
		} finally {
			client.release();
		}
	}

	async getRules() {
		const client = await pool.connect();
		try {
			const result = await client.query(`SELECT * FROM rules`);
			return result.rows;
		} finally {
			client.release();
		}
	}

	async getRuleByCountryId(country_id) {
		const client = await pool.connect();
		try {
			const result = await client.query(
				`SELECT * FROM rules WHERE country_id = $1`,
				[country_id],
			);
			return result.rows[0];
		} finally {
			client.release();
		}
	}

	async addRule(country_id, rule) {
		const client = await pool.connect();
		try {
			await client.query(
				'INSERT INTO rules (country_id, function) VALUES ($1, $2)',
				[country_id, rule],
			);
		} catch (error) {
			throw error;
		} finally {
			client.release();
		}
	}
}
