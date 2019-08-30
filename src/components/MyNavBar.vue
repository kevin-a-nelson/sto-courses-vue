<template>
  <div id="navbar-container">
    <b-navbar type="is-black">
        <template slot="brand">
            <b-navbar-item href="https://github.com/SamuraiViking/sto-courses-vue" target='blank'>
                <img
                    src="../assets/github_icon.png"
                    alt="Lightweight UI components for Vue.js based on Bulma"
                >
            </b-navbar-item>
        </template>
        <template slot="start">
            <b-navbar-item href="#home">
                <p class="navbar-item" style="color: #eee; font-weight: 600;">Home</p>
            </b-navbar-item>
            <b-navbar-item href="#user-section">
                <p class="navbar-item" style="color: #eee; font-weight: 600;">My Courses</p>
            </b-navbar-item>
            <b-navbar-item href="#stolaf-section">
                <p class="navbar-item" style="color: #eee; font-weight: 600;"> Stolaf Courses</p>
            </b-navbar-item>
            <b-navbar-item href="#contact">
                <p class="navbar-item" style="color: #eee; font-weight: 600;"> Contact</p>
            </b-navbar-item>
        </template>

        <template slot="end">
            <b-navbar-item tag="div">
                <div class="buttons">
                    <a class="button is-info">
                        <strong>Sign up</strong>
                    </a>
                    <a class="button is-info">
                        <strong>Log in</strong>
                    </a>
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>
  </div>
</template>

<script>
  export default {
    name: 'my-nav-bar'
  }
</script>

<style>

#navbar-container {
  width: 100%;
  position: fixed;
  z-index: 99;
}

.navbar-item {
  color: white;
  font-size: 15px;
}

</style>