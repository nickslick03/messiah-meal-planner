export function DateInputFormat(date = new Date()) {
    const formatDate = date.getDate() < 10 ? `0${date.getDate()}`:date.getDate();
    const formatMonth = date.getMonth() < 10 ? `0${date.getMonth()}`: date.getMonth();
    return [date.getFullYear(), formatMonth, formatDate].join('-');
}