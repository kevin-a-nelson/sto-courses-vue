<template>
  <div class="signup-container">
    <section class="signup-box">
      <div id="login">
        <p class="errors" v-for="error in errors"> {{ error }} </p>
        <div class="label-container">
          <b-field class="signup-label"
              type="is-danger"
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
        <b-button class="my-signup-btn" style="width: 100%;" @keyup.native.enter="submit" v-on:click="submit">Login</b-button>
      </div>
      <p class="signup-login-msg">Don't have an account? <router-link to="/signup">Sign up</router-link></p>
    </section>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      email: "",
      password: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        email: this.email,
        password: this.password
      };
      axios
        .post("/api/sessions", params)
        .then(response => {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          this.$router.push("/");
        })
        .catch(error => {
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    },
    mounted() {
    },
    currentSeason() {
      console.log(document.getElementById('app').classList)
      return ''
      return document.getElementById('app').classList.contains('fall-background-image') ? 'fall-background-color' : 'winter-background-color'
    }
  }
};
</script>

<style>

.signup-login-msg {
  font-weight: 900;
  margin-top: 20px;
  color: white;
}

</style>