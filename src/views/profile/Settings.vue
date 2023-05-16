<template>
<div class="row">
    <div class="col-md-3 card">
      <ul class="h-100 list-inline">
        <router-link to="/profile" class="btn btn-primary w-100 mt-3">Профиль</router-link>
        <router-link to="/settings" class="btn btn-primary w-100 mt-3">Настройки</router-link>
        <li><a href="#" v-on:click="logout" class="btn btn-primary w-100 mt-3">Выйти</a></li>
      </ul>
    </div>
    <div class="col-md-9 grid-margin stretch-card">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">Настройки</h4>
          <form class="forms-sample">
            <div class="text-danger">{{errorStr}}</div>
            <div class="text-success">{{successStr}}</div>
            <h3>Добавить кабинет</h3>
            <div class="row">
              <div class="form-group col">
                <label for="exampleInputUsername1">Название</label>
                <div class="input-group">
                  <input type="text" class="form-control" placeholder="ИП Иванов" v-model="lkName" aria-label="ИП Иванов">
                  <div class="input-group-append">
                    <button class="btn btn-sm btn-primary h-100" v-on:click="createLk()" type="button">Добавить</button>
                  </div>
                </div>

                <h5 class="mt-3">Список ЛК</h5>
                <div class="input-group mt-2" v-for="lk in lks">
                  <input type="text" class="form-control" disabled placeholder="ИП Иванов" :value="lk.name" :data-id="lk.id" aria-label="ИП Иванов">
                  <div class="input-group-append">
                    <button class="btn btn-sm btn-warning h-100" type="button">Изменить</button>
                    <button class="btn btn-sm btn-danger h-100" type="button">Удалить</button>
                  </div>
                </div>
              </div>

            </div>
            <h3>Добавить API ключ</h3>
            <div class="form-group">
              <label for="exampleSelectGender">Маркетплейс</label>
              <select class="form-control" v-model="marketplace" id="marketplace">
                <option value="WB">Wildberries</option>
                <option value="OZ" disabled>Ozon</option>
                <option value="YA" disabled>Yandex market</option>
              </select>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Ключ</label>
              <input type="text" v-model="key" class="form-control" id="apiKey" placeholder="">
            </div>
            <div class="form-group">
              <label for="exampleSelectGender">Тип</label>
              <select class="form-control" v-model="type" id="type">
                <option value="standard">Стандартный</option>
                <option value="statistic">Статистический</option>
                <option value="ad" >Рекламный</option>
              </select>
            </div>

            <div class="form-group">
              <label for="exampleSelectGender">Личный кабинет</label>
              <select class="form-control" v-model="lk" id="lk_id">
                <option v-for="lk in lks" :value="lk.id">{{lk.name}}</option>
              </select>
            </div>
            <button type="button" class="btn btn-primary me-2" v-on:click="createApiKey">Добавить</button>

            <h5 class="mt-3">Список АПИ ключей</h5>
            <div class="card mt-3" v-for="key in apiKeys">
              <div class="card-body">
                <h5 class="card-title">Ozon</h5>
<!--                <span>{{key.marketplace}}</span>-->
                <p class="card-text">Ключ: <strong>{{key.key}}</strong></p>
                <p class="card-text">Тип: {{getType(key.type)}}</p>
                <p>Личный кабинет: {{key.lk_id}}</p>
                <div class="input-group-append">
                  <button class="btn btn-sm btn-danger h-100" type="button">Удалить</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
</div>
</template>

<script>
import {addApiKey, addLk, ApiKeysList, lkList, logout} from "@/helper";

export default {
  name: "Settings",
  data() {
    return{
      lks: [],
      apiKeys: [],
      successStr: '',
      errorStr: '',
      lkName:null,
      marketplace: '',
      key: '',
      type:'',
      lk:''
    }
  },
  mounted() {
    let list = lkList();
    list.then(result => {
      this.lks = result;
    });

    let keys = ApiKeysList();
    keys.then(result => {
      this.apiKeys = result;
    });
  },
  methods:{
    createLk: function (){
      let lk = addLk(this.lkName);
      lk.then((value) => {
        if(value === 200 || value === 201){
          this.errorStr = '';
          this.successStr = 'Личный кабинет успешно добавлен';
          //очищаем строку
          this.lkName = '';
          //Обновляем данные
          let list = lkList();
          list.then(result => {
            this.lks = result;
          });
        }else{
          this.successStr = '';
          this.errorStr = value;
        }
      });
    },
    createApiKey: function (){
      let addKey = addApiKey(this.marketplace, this.key, this.type, this.lk);
      addKey.then((value) => {
        if(value === 200 || value === 201){
          this.errorStr = '';
          this.successStr = 'АПИ ключ успешно добавлен';
        }else{
          this.successStr = '';
          this.errorStr = value;
        }
      });
    },
    getType: function (type){
        switch (type){
          case "standard":
            return "Стандартный";
          case "statistic":
            return "Статистический";
          case "ad":
            return "Рекламный";
        }
    },
    logout: function (){
      logout();
    }
  }
}
</script>

<style scoped>

</style>