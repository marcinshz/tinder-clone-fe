export function padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
}

export function formatDate(date: Date) {
    const newDate = new Date(date);
    return [newDate.getFullYear(), padTo2Digits(newDate.getMonth() + 1), padTo2Digits(newDate.getDate())].join(
        '-'
    );
}