<template>
  <div class="row flex-grow">
    <div class="col-lg-12 d-flex align-items-center justify-content-center">
      <div class="auth-form-transparent text-left p-3">
        <h4>Вход</h4>
<!--        <h6 class="font-weight-light"></h6>-->
        <span class="text-danger">{{errorMsg}}</span>
        <form class="pt-3">
          <div class="form-group">
            <label for="exampleInputEmail">Email</label>
            <div class="input-group">
              <div class="input-group-prepend bg-transparent">
<!--                      <span class="input-group-text bg-transparent border-right-0">-->
<!--                        <i class="mdi mdi-account-outline text-primary"></i>-->
<!--                      </span>-->
              </div>
              <input type="text" v-model="email" class="form-control form-control-lg border-left-0" :class="{'is-invalid':errorBool}" id="exampleInputEmail" placeholder="emaxple@email.com">
            </div>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword">Пароль</label>
            <div class="input-group">
              <div class="input-group-prepend bg-transparent">
<!--                      <span class="input-group-text bg-transparent border-right-0">-->
<!--                        <i class="mdi mdi-lock-outline text-primary"></i>-->
<!--                      </span>-->
              </div>
              <input type="password" v-model="password" class="form-control form-control-lg border-left-0" :class="{'is-invalid':errorBool}" id="exampleInputPassword" placeholder="*********">
            </div>
          </div>
<!--          <div class="my-2 d-flex justify-content-between align-items-center">-->
<!--            <div class="form-check">-->
<!--              <label class="form-check-label text-muted">-->
<!--                <input type="checkbox" class="form-check-input">-->
<!--                Keep me signed in-->
<!--              </label>-->
<!--            </div>-->
<!--            <a href="#" class="auth-link text-black">Forgot password?</a>-->
<!--          </div>-->
          <div class="my-3">
            <a class="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn w-100" v-on:click="login" href="#">Войти</a>
          </div>
          <div class="text-center mt-4 font-weight-light">
            Нет аккаунта?
            <router-link to="/register">Регистрация</router-link>
          </div>
<!--          <div class="mb-2 d-flex">-->
<!--            <button type="button" class="btn btn-facebook auth-form-btn flex-grow me-1">-->
<!--              <i class="mdi mdi-facebook me-2"></i>Facebook-->
<!--            </button>-->
<!--            <button type="button" class="btn btn-google auth-form-btn flex-grow ms-1">-->
<!--              <i class="mdi mdi-google me-2"></i>Google-->
<!--            </button>-->
<!--          </div>-->
<!--          <div class="text-center mt-4 font-weight-light">-->
<!--            Don't have an account? <a href="register-2.html" class="text-primary">Create</a>-->
<!--          </div>-->
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  //TODO переделать под урл
  name: "login",
  data() {
    return {
      email: '',
      password: '',
      errorMsg:'',
      errorBool: false
    }
  },
  methods: {
    login: function(){
      axios.post('http://127.0.0.1:8000/api/login',{email:this.email, password:this.password})
          .then((response) => {
            document.cookie = "token="+response.data.token;
          }).catch((error) => {
            if (error.response) {
              switch (error.response.status){
                case 422:
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