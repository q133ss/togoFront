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
            //
            resp = '1|2jOiNCX7fNx7mfYhoBPTLjSVBN8HHISkqCTZ9WJz';
            //
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

export function updateProfile(name, email, password, password_confirmation){
    const data = {
        'name': name,
        'email': email,
        'password': password,
        'password_confirmation':password_confirmation
    };
    const configs = {
        "headers": {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json',
            'Authorization': getApiKey()
        },
    };

    return axios.patch(url+'/profile/update', data,configs)
        .then((response) => {
            return response.status;
        })
        .catch((error) => {
            return error.response.data.message;
        });
}

//Добавить ЛК
export function addLk(name){
    const data = {
        'name': name
    };
    const configs = {
        "headers": {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json',
            'Authorization': getApiKey()
        },
    };

    return axios.post(url+'/profile/lk/add', data,configs)
        .then((response) => {
            return response.status;
        })
        .catch((error) => {
            return error.response.data.message;
        });
}

//Список ЛК
export function lkList(){
    const configs = {
        "headers": {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json',
            'Authorization': getApiKey()
        },
    };

    return axios.get(url+'/profile/lk/list',configs)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data.message;
        });
}

//Добавить АПИ Ключ
export function addApiKey(marketplace,key,type,lk){
    const data = {
        'marketplace': marketplace,
        'key': key,
        'type': type,
        'lk_id': lk
    };

    const configs = {
        "headers": {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json',
            'Authorization': getApiKey()
        },
    };

    return axios.post(url+'/profile/add-api-key',data,configs)
        .then((response) => {
            return response.status;
        })
        .catch((error) => {
            return error.response.data.message;
        });
}

//Список АПИ ключей
export function ApiKeysList(){
    const configs = {
        "headers": {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json',
            'Authorization': getApiKey()
        },
    };

    return axios.get(url+'/profile/api-key/list',configs)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data.message;
        });
}

//Получить выбранную дату
export function getPeriod(){
    return {
        'dateFrom': '2023-05-01',
        'dateTo': '2023-05-11'
    };
}

export function getLkId(){
    return 1;
}

//Данные для get запросов
let data = getPeriod();
data.lk_id = getLkId();

let config = {
    headers: {
        'Authorization': getApiKey()
    }
}

//отправляет запрос на сервер
export function sendRequest(endpoint){
    const response = axios.post(url+endpoint,data, config);
    return response;
}