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
		const values = [];
		let cont = 1;
		if (rule_id) {
			params.push(`r.id = $${cont}`);
			values.push(rule_id);
			cont++;
		}
		if (country_id) {
			params.push(`r.country_id = $${cont}`);
			values.push(country_id);
			cont++;
		}
		if (country_name) {
			params.push(`c.name = $${cont}`);
			values.push(country_name);
			cont++;
		}

		if (params.length > 0) {
			query += ' WHERE ' + params.join(' AND ');
		}

		console.log(query);
		console.log(values);

		try {
			const result = await client.query(query, values);
			return result.rows;
		} finally {
			client.release();
		}
	}

	async addRule(country_id, rule) {
		const client = await pool.connect();
		console.log(country_id);
		console.log(rule);
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
