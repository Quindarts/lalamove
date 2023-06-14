export function convertJsonDateToDate(date: string) {
    let dateFormat = new Date(date);
    let day = dateFormat.getDate();
    let month = dateFormat.getMonth() + 1;
    let year = dateFormat.getFullYear();
    let formattedDateString = day + "/" + month + "/" + year;
    return formattedDateString;
}
