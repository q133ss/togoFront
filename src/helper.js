//Возвращает АПИ ключ
import axios from "axios";
import Router from "@/router";

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

let config = {
    headers: {
        'Authorization': getApiKey()
    }
}

let getPeriodAttempts = 5;

//Получить выбранную дату
export function getPeriod(){
    getPeriodAttempts -= 1;
    //проверяем куки, если их нет считаем месяц назад
    if(getPeriodCookie('dateFrom') && getPeriodCookie('dateTo')){
        return {
            'dateFrom': getPeriodCookie('dateFrom'),
            'dateTo': getPeriodCookie('dateTo')
        };
    }else{
        if(getPeriodAttempts > 0) {
            changePeriod('month');
            getPeriod();
        }else{
            return false;
        }
    }
    return true;
}

//Данные для get запросов
let data = getPeriod();
data.lk_id = getLkId();

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

//Возвращает куки с выбранным периодом
function getPeriodCookie(name){
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            let resp = c.substring(name.length, c.length).slice(1);
            return resp;
        }
    }
    return false;
}

//Сменить период
export function changePeriod(periodName) {
    let dateFrom, dateTo;

    axios.get(url + '/get-date/' + periodName, config)
        .then((response) => {
            dateFrom = response.data.dateFrom;
            dateTo = response.data.dateTo;

            // Remove old cookies
            document.cookie = 'dateFrom=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
            document.cookie = 'dateTo=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
            // Create new cookies
            document.cookie = "dateFrom=" + dateFrom;
            document.cookie = "dateTo=" + dateTo;
        })
        .catch((error) => {
            console.error(error);
        });
    return true;
}

export function getLkCookie(){
    let name = "lk";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            let resp = c.substring(name.length, c.length).slice(1);
            return resp;
        }
    }

    return false;
}

//Получить ИД текущего ЛК
export function getLkId(){
    let id;
    if(getLkCookie()){
        id = getLkCookie();
    }else {
        try {
            let lks = axios.get(url + '/profile/lk/list', config);
            lks.then((data) => {
                let firstItem = data.data[0];
                document.cookie = "lk=" + firstItem.id;
                id = firstItem.id;
            });
        }catch (e){
            id = 0;
        }
    }

    return id;
}

export function changeHeaderLk(id){
    axios.get(url+'/get-lk/'+id, config)
        .then((data) => {
            document.querySelector('.lkHeader').innerHTML = data.data.lk.name;
        });
}

//смена ЛК
export function changeLkEvent(event){
    let id = event.explicitOriginalTarget.attributes[1].nodeValue;
    let status;
    axios.post(url+'/profile/lk/update/'+id)
        .then(response => {
            status = response.status;
        })
        .catch(error => {
            status = error.response.status;
        });

    if(status !== 302) {
        document.cookie = 'lk=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
        document.cookie = "lk=" + id;
        //ставим ЛК в хедер
        changeHeaderLk(id);
    }else{
        alert(230);
    }
    return true;
}

//отправляет запрос на сервер с данными
export function sendRequestWithBody(endpoint, _data){
    const response = axios.post(url+endpoint, _data, config);
    return response;
}

//отправляет запрос на сервер
export function sendRequest(endpoint){
    const response = axios.post(url+endpoint,data, config);
    return response;
}

//показывает интерфейс для АВТОРИЗОВАННЫХ и НЕАВТОРИЗОВАННЫХ юзеров
export function showAuthInterface(type){
    if(type === false) {
        document.querySelector('.bottom-navbar').style.opacity = 0;
        document.querySelector('#profileArea').style.opacity = 0;
        document.querySelector('#notificationDropdown').style.opacity = 0;

        document.querySelector('#authArea').style.opacity = 1;
    }else if(type === true){
        document.querySelector('.bottom-navbar').style.display = 'flex';
        document.querySelector('.bottom-navbar').style.opacity = 1;
        document.querySelector('#profileArea').style.opacity = 1;
        document.querySelector('#notificationDropdown').style.opacity = 1;

        document.querySelector('#authArea').style.opacity = 0;
    }
}

//выход из профиля
export function logout(){
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
    showAuthInterface(false);
    Router.push('/login');
}

//Загрузка всех ЛК в верстку
export function loadLks(){
    let lks = axios.get(url+'/profile/lk/list', config);
    lks.then((data) => {
        data.data.forEach(item => {
            let id = item.id;
            let name = item.name;

            // тут добавляем данные в верстку
            const element = document.querySelector('#lks');
            const childElement = document.createElement('a');
            childElement.className = 'dropdown-item lk-item';
            childElement.setAttribute('data-id', id);
            childElement.setAttribute('onclick', 'lkClick('+id+')');
            childElement.innerHTML = '<i class="mdi mdi-file-excel text-primary"></i>'+name;

            element.appendChild(childElement);
        });
    });
    return true;
}


export function handleEvent(event) {
    alert(123);
    console.log('Событие myEvent вызвано');
    // Дополнительные действия при вызове события
}

// Добавление слушателя события к элементу или объекту
document.addEventListener('changeLk', changeLkEvent);