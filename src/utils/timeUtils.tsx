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

export function parseSmallDatefromMs(duration: number | undefined) {
	if (duration) {
		if (isMoreThanOneWeekAgo(duration)) {
			return moment(duration).format('MMM DD');
		} else if (isToday(duration)) {
			return moment(duration).format(HOUR_TIME_FORMAT);
		} else {
			return moment(duration).format('ddd');
		}
	} else return undefined
}

export function parseTimeDifferencefromMs(duration: number | undefined){
	if ( duration ){
		const now = moment();
		const past = moment(duration)
		const difference = moment.duration(now.diff(past));

		if (difference.days() > 0) {
			return difference.days() + 'd';
		} 
		if(difference.hours() > 0) {
			return difference.hours() + 'h'
		}
		if(difference.minutes() > 0) {
			return difference.minutes() + 'm'
		}
		return '1m'
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
