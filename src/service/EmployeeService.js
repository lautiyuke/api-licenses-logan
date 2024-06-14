export default class EmployeeService {
	async getEmployees() {
		try {
            return [{success: true, message: "Ok"}, 200]
		} catch (error) {
			throw new Error("CATH ERROR: ", error);
		}
	}
}