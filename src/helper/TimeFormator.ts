export function convertNormalTime(date: Date): string {
    let fullDate = to2digits(date.getDate()) + '-' + to2digits(date.getMonth() + 1) + '-' + date.getFullYear();
    let fullTime = to2digits(date.getHours()) + ':' + to2digits(date.getMinutes());
    return fullDate + ' | ' + fullTime;
}

export function to2digits(num: number): string {
    return num.toString().padStart(2, '0');
}


