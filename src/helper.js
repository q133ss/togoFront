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
            console.log(resp)
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

    if(id === undefined){
        id = 0;
    }

    return id;
}

//Данные для get запросов
let data = {lk_id : getLkId()};
data = {...data, ...getPeriod()};

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

export function changeHeaderLk(id){
    axios.get(url+'/get-lk/'+id, config)
        .then((data) => {
            document.querySelector('.lkHeader').innerHTML = data.data.lk.name;
        });
}

export async function getLkName(lk_id) {
    try {
        const response = await axios.get(url+'/get-lk/'+lk_id, config);
        const lkName = response.data.lk.name;
        return lkName;
    } catch (error) {
        console.error(error);
        return null;
    }
    // return axios.get(url + '/get-lk/' + lk_id, config)
    //     .then((data) => {
    //         return data.data.lk.name;
    //     })
    //     .catch((e) => {
    //         console.error(e);
    //         throw new Error('Ошибка');
    //     });
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
    document.cookie = 'lk=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
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

document.addEventListener('changeLk', changeLkEvent);

//уведомления
export function notifications(){
    //Удаляем старые
    let items = document.querySelectorAll('#notifications .preview-item');
    items.forEach(item => item.remove());

    //Добавляем новые
    let notificationsElement = document.getElementById("notifications");
    let notifications = axios.get(url+'/notifications', config);
    notifications.then((data) => {
        data.data.forEach(item => {
            let id = item.id;
            let message = item.message;
            let date = new Date(item.created_at);
            let dateFormatted = date.toLocaleString('ru-RU', {day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'});

            // создаем дочерний элемент
            let aElement = document.createElement("a");
            aElement.className = "dropdown-item preview-item";

            let divElement1 = document.createElement("div");
            divElement1.className = "preview-thumbnail";

            let divElement2 = document.createElement("div");
            divElement2.className = "preview-icon bg-success";

            let iElement = document.createElement("i");
            iElement.className = "mdi mdi-information mx-0";

            divElement2.appendChild(iElement);
            divElement1.appendChild(divElement2);

            let divElement3 = document.createElement("div");
            divElement3.className = "preview-item-content";

            let h6Element = document.createElement("h6");
            h6Element.className = "preview-subject font-weight-normal";
            h6Element.innerText = message;

            let pElement = document.createElement("p");
            pElement.className = "font-weight-light small-text mb-0 text-muted";
            pElement.innerText = dateFormatted;

            divElement3.appendChild(h6Element);
            divElement3.appendChild(pElement);

            aElement.appendChild(divElement1);
            aElement.appendChild(divElement3);

            notificationsElement.appendChild(aElement);
        })
        //TODO доделать!
        // let allNotifications = document.createElement("a");
        // allNotifications.className = "mb-0 font-weight-normal float-left dropdown-header";
        // allNotifications.innerText = 'Все уведомления';
        // notificationsElement.appendChild(allNotifications);
    });
}

export function userInfo(){
    const response = axios.get(url+'/me', config);
    return response;
}

export function getDynamicsChart(format, type){
    let settings = {
        format: format,
        type: type
    };
    let _data = {...data, ...settings};

    const response = axios.post(url+'/charts/development-dynamics', _data, config);
    return response;
}