<template>
  <div id="signup-container">
    <section id="signup-box" class="fall-background-color">
      <div>
        <p class="errors" v-for="error in errors"> {{ error }} </p>
        <div class="label-container">
          <b-field class="signup-label"
              type="is-danger"
              :message="message">
              <b-input type="email"
                  placeholder="Email"
                  :value="email"
                  v-model="email">
              </b-input>
          </b-field>
        </div>
        <div class="label-container">
          <b-field class="signup-label" v-model="password">
              <b-input type="password"
                  placeholder="Password"
                  :value="password"
                  v-model="password">
              </b-input>
          </b-field>
        </div>
        <div class="label-container">
          <b-field class="signup-label">
              <b-input type="password"
                  placeholder="Password Confirmation"
                  :value="password"
                  password-reveal
                  v-model="passwordConfirmation"
                  >
              </b-input>
          </b-field>
        </div>
        <b-button class="my-signup-btn" style="width: 100%;" v-on:click="submit">Signup</b-button>
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
  methods: {
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

#signup-container {
  padding-top: 200px;
  margin: 0px 20px;
}

.input-container {
  background: blue;
}

.errors {
  color: red;
  font-size: 18px;
}

.label-container {
  margin-bottom: 30px;
}


#signup-box {
  opacity: 0.9;
  border-radius: 5px;
  background: #2c3e50;
  padding: 35px;
  /*padding: 40px 7%;*/
  width: 100%;
  max-width: 400px;
  margin: 0px auto;
}

</style>