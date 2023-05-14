//Возвращает АПИ ключ
import axios from "axios";

const url = 'http://127.0.0.1:8000/api'

export function getApiKey(){
    let name = "token";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            let resp = c.substring(name.length, c.length).slice(1);
            return 'Bearer '+resp;
        }
    }
    return false;
}

//Возвращает информацию о текущем юзере
export function getUserData(){
    return axios.get(url+'/me', {
            headers: {
                'Authorization': getApiKey()
            }
        })
        .then((response) => {
            return {
                'name': response.data.user.name,
                'email': response.data.user.email
            };
        })
        .catch((error) => {
            console.log('Ошибка');
        });
}

//TODO не работает!!
export function updateProfile(name, email, password, password_confirmation){
    return axios.patch('http://localhost:8000/api/profile/update', {
            headers: {
                'Content-Type' : 'application/json',
                'Accept' : 'application/json',
                'Authorization' : 'Bearer 13|hXxVeRzq2g0w2aDIT7tz4yQxJke0CRpp3uR8fy4z'
                //'Authorization': getApiKey()
            },
            params: {
                'name': name,
                'email': email,
                'password': password,
                'password_confirmation':password_confirmation
            }
        })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.log('Ошибка');
        });
}