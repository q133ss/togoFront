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
        <h4 class="card-title">Профиль</h4>
        <form class="forms-sample">
          <div class="text-danger">{{errorStr}}</div>
          <div class="text-success">{{successStr}}</div>
          <div class="form-group">
            <label for="exampleInputUsername1">Имя</label>
            <input type="text" class="form-control" v-model="name" id="exampleInputUsername1" placeholder="Имя">
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Email</label>
            <input type="email" class="form-control" v-model="email" id="exampleInputEmail1" placeholder="Email">
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Пароль</label>
            <input type="password" class="form-control" v-model="password" id="exampleInputPassword1" placeholder="********">
          </div>
          <div class="form-group">
            <label for="exampleInputConfirmPassword1">Повторите пароль</label>
            <input type="password" class="form-control" v-model="password_confirmation" id="exampleInputConfirmPassword1" placeholder="********">
          </div>
          <button type="button" class="btn btn-primary me-2" v-on:click="update">Обновить</button>
        </form>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {getUserData, logout, updateProfile} from "@/helper";

export default {
  name: "ProfileIndex",
  data() {
    return{
      successStr: '',
      errorStr: '',
      name: '',
      email: '',
      password: null,
      password_confirmation: null
    }
  },
  mounted() {
    //getAPiKey
    let data = getUserData();

    data.then(({name, email}) => {
      this.name = name;
      this.email = email;
    });
  },
  methods: {
      update: function(){
        let update = updateProfile(this.name, this.email, this.password, this.password_confirmation);
        update.then((value) => {
          if(value == 200){
            this.errorStr = '';
            this.successStr = 'Данные успешно обновлены';
          }else{
            this.successStr = '';
            this.errorStr = value;
          }
        });
      },
    logout: function (){
        logout();
    }
  }
}
</script>

<style scoped>

</style>