export default function checkValidLicense(
	employee,
	licenses,
	start_date,
	end_date,
) {
	const days = getCorrespondingDays(employee.start_date, start_date, end_date);
	if (licenses.length > 0) {
		console.log('Hay licencias.');
	} else {
		console.log('No hay licencias.');
	}
}

function getCorrespondingDays(workStart) {
	const antiquity = getDifferenceInYears(workStart, new Date());
	if (antiquity > 0) {
		return antiquity < 10 ? 21 : antiquity < 20 ? 28 : 35;
	} else {
		const workedDays = getDifferenceInDays(workStart, new Date());
		return Math.ceil(workedDays / 16.667);
	}
}

function getDifferenceInYears(date1, date2) {
	let yearsDifference = date2.getFullYear() - date1.getFullYear();
	if (
		date2.getMonth() < date1.getMonth() ||
		(date2.getMonth() === date1.getMonth() && date2.getDate() < date1.getDate())
	) {
		yearsDifference--;
	}
	return yearsDifference;
}

function getDifferenceInDays(date1, date2) {
	const diffMilliseconds = Math.abs(date2 - date1);
	const millisecondsPerDay = 1000 * 60 * 60 * 24;
	const diffDays = Math.floor(diffMilliseconds / millisecondsPerDay);
	return diffDays;
}
