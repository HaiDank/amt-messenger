import moment from 'moment';

const HOUR_TIME_FORMAT = 'h:mm A';
const RECENT_DATE_FORMAT = 'ddd h:mm A';
const DATE_FORMAT = 'MMM DD, h:mm A';

export function parseDatefromMs(duration: number) {
	if (isMoreThanOneWeekAgo(duration)) {
		return moment(duration).format(DATE_FORMAT);
	} else if (isToday(duration)) {
		return moment(duration).format(HOUR_TIME_FORMAT);
	} else {
		return moment(duration).format(RECENT_DATE_FORMAT);
	}
}

function isMoreThanOneWeekAgo(time: number) {
	const now = Date.now();
	const oneWeekAgo = now - 604800000;

	return time < oneWeekAgo;
}

function isToday(time: number) {
	const date = new Date(time);
	const today = new Date();

	return (
		date.getDate() === today.getDate() &&
		date.getMonth() === today.getMonth() &&
		date.getFullYear() === today.getFullYear()
	);
}

//   export function timeToMs(hours, minutes, seconds) {
//     return hours*1000 * 60 * 60 + minutes* 1000* 60 + seconds*1000
//   }
