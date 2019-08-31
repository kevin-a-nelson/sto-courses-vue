<template>
  <div class="signup">
    <div class="my-container">
      <div>
        <div id="signup-box">
          <div>
            <h1 id="signup-header">Signup</h1>
          </div>
          <div id="signup-inputs">
            <b-input id="signup-input"></b-input>
            <b-input id="signup-input"></b-input>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<!--       <form v-on:submit.prevent="submit()">
        <h1>Signup</h1>
        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>
        <div class="form-group">
          <label>Email:</label>
          <input type="email" class="form-control" v-model="email">
        </div>
        <div class="form-group">
          <label>Password:</label>
          <input type="password" class="form-control" v-model="password">
        </div>
        <div class="form-group">
          <label>Password confirmation:</label>
          <input type="password" class="form-control" v-model="passwordConfirmation">
        </div>
        <input type="submit" class="btn btn-primary" value="Submit">
      </form> -->

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      email: "",
      password: "",
      passwordConfirmation: "",
      errors: []
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

.my-container {
  padding-top: 100px;
}

#signup-header {
  color: white;
  font-size: 30px;
  margin-bottom: 20px;
}

#signup-inputs {
  width: 60%;
  max-width: 200px;
  margin: 0px auto;
}

#signup-input {
  margin-bottom: 20px;
}

#signup-box {
  opacity: 0.9;
  border-radius: 5px;
  background: #2c3e50;
  padding: 20px;
  width: 100%;
  max-width: 500px;
  margin: 0px auto;
}

</style>