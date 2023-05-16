<template>
  <div class="row w-100 mx-0">
    <div class="col-lg-4 mx-auto">
      <div class="auth-form-light text-left py-5 px-4 px-sm-5">
        <h4>Регистрация</h4>
        <h6 class="font-weight-light text-danger">{{errorMsg}}</h6>
        <form class="pt-3">
          <div class="form-group">
            <input type="text" class="form-control form-control-lg" :class="{'is-invalid':errorBool}" v-model="username" id="name" placeholder="Имя">
          </div>
          <div class="form-group">
            <input type="email" class="form-control form-control-lg" :class="{'is-invalid':errorBool}" v-model="email" id="email" placeholder="Email">
          </div>
          <div class="form-group">
            <input type="password" class="form-control form-control-lg" :class="{'is-invalid':errorBool}" v-model="password" id="password" placeholder="Пароль">
          </div>

          <div class="form-group">
            <input type="password" class="form-control form-control-lg" :class="{'is-invalid':errorBool}" v-model="password_confirmation" id="password2" placeholder="Повторите пароль">
          </div>

          <div class="mt-3">
            <a class="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn w-100" v-on:click="register" href="#">Регистрация</a>
          </div>
          <div class="text-center mt-4 font-weight-light">
            Уже есть аккаунт?
            <router-link to="/login">Вход</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import {sendRequestWithBody, showAuthInterface} from "@/helper";

export default {
  name: "register",
  data() {
    return {
      username: '',
      email: '',
      password: '',
      password_confirmation: '',
      errorMsg:'',
      errorBool: false
    }
  },
  methods: {
    register: function(){
      sendRequestWithBody('/register', {name: this.username,email:this.email, password:this.password, password_confirmation: this.password_confirmation})
          .then((response) => {
            document.cookie = "token="+response.data.token;
            showAuthInterface(true);
            router.push({ path: '/profile' })
          }).catch((error) => {
        if (error.response) {
          switch (error.response.status){
            case 422:
              this.errorMsg = error.response.data.message;
              this.errorBool = true;
              break;
            case 403:
              this.errorMsg = error.response.data.message;
              break;
          }
        }
      });
    }
  }
}
</script>

<style scoped>
</style>