export function convertJsonDateToDate(date: string) {
    let dateFormat = new Date(date);
    let day = dateFormat.getDate();
    let month = dateFormat.getMonth() + 1;
    let year = dateFormat.getFullYear();
    let formattedDateString = day + "/" + month + "/" + year;
    return formattedDateString;
}

export function isCheckedAccessToken(): boolean {
    let token = localStorage.getItem("access_token");
    return token !== null;
}

export function getAccessToken(): string {
    let token = localStorage.getItem("access_token");
    return token ? token : "";
}

export function setAccessToken(newToken: string) {
    localStorage.setItem("access_token", newToken);
}

export function removeAccessToken() {
    localStorage.removeItem("access_token");
}

