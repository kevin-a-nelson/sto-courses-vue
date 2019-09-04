<template>
  <div class="signup-container">
    <section class="signup-box">
      <div id="signup">
        <p class="errors" v-for="error in errors"> {{ error }} </p>
        <div class="label-container">
          <b-field class="signup-label"
              type="is-white"
              :message="message">
              <b-input type="email"
                  @keyup.native.enter="submit"
                  placeholder="Email"
                  :value="email"
                  v-model="email">
              </b-input>
          </b-field>
        </div>
        <div class="label-container">
          <b-field class="signup-label" v-model="password">
              <b-input type="password"
                  @keyup.native.enter="submit"
                  placeholder="Password"
                  :value="password"
                  v-model="password">
              </b-input>
          </b-field>
        </div>
        <div class="label-container">
          <b-field class="signup-label">
              <b-input type="password"
                  @keyup.native.enter="submit"
                  placeholder="Password Confirmation"
                  :value="password"
                  password-reveal
                  v-model="passwordConfirmation"
                  >
              </b-input>
          </b-field>
        </div>
        <b-button class="my-signup-btn" style="width: 100%;" @keyup.enter="submit" @click="submit">Signup</b-button>
      </div>
    </section>
  </div>
</template>



<script>
import axios from "axios";



export default {
  data: function() {
    return {
      message: '',
      email: "",
      password: "",
      passwordConfirmation: "",
      errors: [],
      name: '',
    };
  },
  created() {
  },
  mounted() {
    var signupBox = app.getElementsByClassName('signup-box')
    signupBox[0].style.background = this.background()
  },
  methods: {
    background() {
      var app = document.getElementById('app')
      var appBackground = app.classList.value
      var boxBackground = ''
      switch(appBackground) {
        case 'fall-img':
          boxBackground = 'linear-gradient(315deg, #ff4e00 0%, #ec9f05 74%)'
          break;
        case 'winter-img':
          boxBackground = "linear-gradient(315deg, #abe9cd 0%, #3eadcf 74%)"
          break;
        case 'spring-img':
          boxBackground = "linear-gradient(150deg, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)"
          break;
        case 'night-mode-img':
          boxBackground = 'black'
          break;
        case 'summer-one-img':
          boxBackground = 'linear-gradient(147deg, #000000 0%, #04619f 74%)'
          break;
        case 'summer-two-img':
          boxBackground = 'linear-gradient(316deg, #6c33a3 0%, #8241b8 74%)'
          break;
        default:
          boxBackground = 'white'
      }
      return boxBackground
    },
    submit: function() {
      var params = {
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirmation
      };
      axios
        .post("/api/users", params)
        .then(response => {
          this.$router.push("/login");
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>

<style>

.signup-container {
  padding-top: 200px;
  margin: 0px 20px;
}

.input-container {
  background: blue;
}

.errors {
  color: white;
  font-size: 18px;
}

.label-container {
  margin-bottom: 30px;
}


.signup-box {
  opacity: 0.9;
  border-radius: 5px;
  padding: 35px;
  /*background: transparent;*/
  /*background: linear-gradient(315deg, #ff4e00 0%, #ec9f05 74%);*/
  width: 100%;
  max-width: 400px;
  margin: 0px auto;
}

</style>