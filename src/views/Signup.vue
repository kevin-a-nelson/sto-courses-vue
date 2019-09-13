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
      <p class="signup-login-msg">Already a user? <router-link to="/login">login</router-link></p>
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
      signingUp: false,
    };
  },
  mounted() {
    var app = document.getElementById('app')
    app.classList.add('fall-img')
  },
  methods: {
    submit: function() {
      this.errors = ["signing up ..."]
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

#signingUpText {
  color: white;
  font-weight: 900;
  font-size: 20px;
  margin-bottom: 20px;
}

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
  background: linear-gradient(315deg, #ff4e00 0%, #ec9f05 74%);
  width: 100%;
  max-width: 400px;
  margin: 0px auto;
}

</style>