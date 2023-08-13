export const second = 1;
export const minute = 60 * second;
export const hour = 60 * minute;
export const day = 24 * hour;
export const week = 7 * day;
export const month = 30 * day;

export const processTime = (time) => {
    let i = 0;
    for (i = 0; i < time.length; i++) {
        if (isNaN(parseInt(time[i]))) {
            break;
        }
    }
    let number = parseInt(time.slice(0, i));
    if (isNaN(number)) {
        throw new Error("Invalid time");
    }

    let unit = time.slice(i);
    if (unit === 's' || unit === 'sec') {
        return number * second;
    }
    if (unit === 'min') {
        return number * minute;
    }
    if (unit === 'h' || unit === 'hr' || unit === 'hour') {
        return number * hour;
    }
    if (unit === 'd' || unit === 'day') {
        return number * day;
    }
    if (unit === 'w' || unit === 'wk' || unit === 'week') {
        return number * week;
    }
    if (unit === 'm' || unit === 'mo' ||unit === 'mon' || unit === 'month') {
        return number * month;
    }

    throw new Error("Invalid time");
};
