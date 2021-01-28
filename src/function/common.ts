import firebase from 'firebase/app'
export const datetimeToString = (dt: firebase.firestore.DocumentData) => {
    return dt.getFullYear() + '/'
        + ('00' + (dt.getMonth()+1)).slice(-2) + '/'
        + ('00' + dt.getDate()).slice(-2) + '  '
        + ('00' + dt.getHours()).slice(-2) + ':'
        + ('00' + dt.getMinutes()).slice(-2)
}