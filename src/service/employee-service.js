import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import EmployeeRepository from '../repositories/employee-repository.js';
import logger from '../utils/logger.js';

const { JWT_SECRET } = process.env;

export default class EmployeeService {
	constructor() {
		this.repo = new EmployeeRepository();
	}

	async getEmployees() {
		try {
			const response = await this.repo.getEmployees();
			return [{ success: true, response }, 200];
		} catch (error) {
			return this.handleError('getEmployees', error);
		}
	}

	async login(req) {
		const { email, password } = req.body;
		try {
			if (!email) {
				return [
					{
						success: false,
						message: 'El email no puede estar vacio',
					},
					401,
				];
			}
			const employee = await this.repo.getEmployee(email);
			if (!employee) {
				return [{ success: false, message: 'Empleado no encontrado' }, 404];
			}

			const isMatch = await bcrypt.compare(password, employee.password);
			if (!isMatch) {
				return [{ success: true, message: 'Contraseña Incorrecta' }, 401];
			}
			delete employee.password;

			const token = jwt.sign(
				{ id: employee.id, email: employee.email, access: employee.access },
				JWT_SECRET,
				{ expiresIn: '1h' },
			);

			return [
				{
					success: true,
					message: 'Sesion iniciada correctamente',
					employee,
					token,
				},
				200,
			];
		} catch (error) {
			return this.handleError('login', error);
		}
	}

	async register({ body }) {
		const { name, surname, email, password } = body;
		try {
			const hashedPassword = await bcrypt.hash(password, 10);
			await this.repo.addEmployee(name, surname, email, hashedPassword);
			return [{ success: true, message: 'Empleado creado correctamente' }, 201];
		} catch (error) {
			return this.handleError('register', error);
		}
	}

	async handleError(method, error) {
		logger.error(`Error en el servicio - ${method}() : ${error.message}`);
		throw new Error(`Error en el servicio - ${method}() : ${error.message}`);
	}
}
