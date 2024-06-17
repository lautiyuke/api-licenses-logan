import pkg from 'pg';
import config from '../configs/db-config.js';

const { Pool } = pkg;
const pool = new Pool(config);

export default class RuleRepository {
	async getRules({ rule_id, country_id, country_name }) {
		const client = await pool.connect();
		let query =
			'SELECT r.id, r.country_id, c.name as country_name, r.rule FROM rules as r INNER JOIN countries as c on c.id = r.country_id';

		const params = [];
		if (rule_id !== null && rule_id !== undefined) {
			params.push(`r.id = ${rule_id}`);
		}
		if (country_id !== null && country_id !== undefined) {
			params.push(`r.country_id = ${country_id}`);
		}
		if (country_name !== null && country_name !== undefined) {
			params.push(`c.name = '${country_name}'`);
		}

		if (params.length > 0) {
			query += ' WHERE ' + params.join(' AND ');
		}

		try {
			const result = await client.query(query);
			return result.rows;
		} finally {
			client.release();
		}
	}

	async addRule(country_id, rule) {
		const client = await pool.connect();
		try {
			await client.query('INSERT INTO rules (country_id, rule) VALUES ($1, $2)', [
				country_id,
				rule,
			]);
		} catch (error) {
			console.log(error.code);
			throw error;
		} finally {
			client.release();
		}
	}

	async updateRule(id, updatedRule) {
		const client = await pool.connect();
		try {
			await client.query('UPDATE rules SET rule = $1 WHERE id = $2', [
				updatedRule,
				id,
			]);
		} catch (error) {
			console.log(error.code);
			throw error;
		} finally {
			client.release();
		}
	}

	async deleteRule(id) {
		const client = await pool.connect();
		try {
			await client.query('DELETE FROM rules WHERE id = $1', [id]);
		} catch (error) {
			console.log(error.code);
			throw error;
		} finally {
			client.release();
		}
	}
}
