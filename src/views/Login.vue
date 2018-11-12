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
                  <div v-if="errorHeader.length > 0" class="notification is-danger has-text-left is-size-7">{{errorHeader}}</div>
                  
                  <div class="control has-icons-left">
                    
                    <input class="input" type="email" placeholder="Email" v-model="login.email" v-validate="'required'" name="vEmail" @blur="validateEmail()">
                      <span class="icon is-small is-left ">
                        <i class="fas fa-envelope "></i>
                      </span>
                    
                    <p class="help is-danger has-left-text" v-if="showEmailError"> Please enter a valid email address</p>
                  </div>
                  <div class="control has-icons-left">
                   
                    <input class="input" type="password" placeholder="Password" v-model="login.password" v-validate="'required'" name="vPassword" @blur="validatePassword()">
                     <span class="icon is-small is-left">
                      <i class="fas fa-lock "></i>
                    </span>
                    <p class="help is-danger has-left-text" v-if="showPasswordError"> Please enter a valid password</p>

                  </div>
                  <div class="control">
                    <label class="checkbox">
                      <input type="checkbox">
                      Remember me
                    </label>
                  </div>
                  <div class="control">
                    <button class="button is-primary is-medium is-fullwidth" @click="submit()">
                      <span class="icon is-small is-left">
                        <i class="fa fa-user "></i>
                      </span>
                      <span>Login</span>
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
    login: { email: '', password:''},
    showEmailError: false,
    showPasswordError:false,
    showAuthenticationError:false,
    errorHeader:''
    }
  },
  methods: {
  validateAllFields(func){
        this.$validator.validateAll().then(() => {

        if (this.errors.any()) {
          this.validateEmail();
          this.validatePassword();
          return false;
        }
        func();
      });

  },
    validateEmail() {

      if (this.errors.first('vEmail')){  
        this.showEmailError=true;
        return false;
      }
      else {
         this.showEmailError=false;
      }
      return true;
    },
    validatePassword() {
      
        if (this.errors.first('vPassword')){  
        this.showPasswordError=true;
        return false;
      }
      else {
         this.showPasswordError=false;
      }
      return true;
    },
    submit() {
     //submits the login form. 
     //do not submit if validation fails

     //reset error header
     this.errorHeader='';
     this.validateAllFields(() => {

     let headers = {
       "Content-Type": "application/json"
     }
     let data= { "user": {"email": this.login.email, "password": this.login.password}}
     this.$http.post(this.$baseUrl+'/login',data,{headers: headers}).then(response => {
        localStorage.setItem('token', response.headers.authorization);
        this.$router.push('/dashboard')
         
     })
    .catch((error) => {
      //check if got a response from the server
      if (!error.response){
        this.errorHeader="Unable to connect to server."
        return;
      }

      if (error.response.status == 401){
      this.errorHeader="Sorry, your email or password could not be verified. Please try again.";
      }
      else {
        this.errorHeader=error.response.message;
      }
        
      

    });

    });
  }
  }
}
</script>
<style scoped>
.control {
  margin:10px 0;
}

.card.is-wide {
  width: 400px;
}
</style>