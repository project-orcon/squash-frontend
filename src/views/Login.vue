<template>
  <div class="login">
    <body class="layout-default">
  <section class="hero is-fullheight is-medium is-primary is-bold">
        <div class="hero-body">
          <div class="container">
            <div class="columns is-centered">
              <article class="card is-rounded is-wide">
                <div class="card-content">
                  <h1 class="title notification is-primary">
                                   
                    <img src="@/assets/clogo.png" alt="logo" width="200">
                  </h1>
                  <div class="control has-icon">
                    <input class="input" type="email" placeholder="Email" v-model="login.email">
                    <i class="fa fa-envelope"></i>
                  </div>
                  <div class="control has-icon">
                    <input class="input" type="password" placeholder="Password" v-model="login.password">
                    <i class="fa fa-lock"></i>
                  </div>
                  <div class="control">
                    <label class="checkbox">
                      <input type="checkbox">
                      Remember me
                    </label>
                  </div>
                  <div class="control">
                    <button class="button is-primary is-medium is-fullwidth" @click="submit()">
                      <i class="fa fa-user"></i>
                      Login
                    </button>
                  </div>
                </div>
              </article>
            </div>
          </div>
    </div>
  </section>
</body>
  </div>
</template>
<script>
export default {
  name: 'login',
  data() { return {
    login: { email: '', password:''}
    }
  },
  methods: {
    submit() {
     //submits the login form. 
     let headers = {
       "Content-Type": "application/json"
     }
     let data= { "user": {"email": this.login.email, "password": this.login.password}}
     this.$http.post(this.$baseUrl+'/login',data,{headers: headers}).then(response => {
        localStorage.setItem('token', response.headers.authorization);

         console.log(response.headers)
     });
    }
  }
}
</script>
<style scoped>
.control {
  padding:5px 0;
}

.card.is-wide {
  width: 400px;
}
</style>