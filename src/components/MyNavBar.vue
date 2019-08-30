<template>
  <div id="navbar-container">
    <b-navbar type="is-black"
              :fixed-top="true">
        <template slot="brand">
            <b-navbar-item href="/">
                <img
                    src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                    alt="Lightweight UI components for Vue.js based on Bulma"
                >
            </b-navbar-item>
        </template>
        <template slot="start">
            <b-navbar-item href="#home">
                <p class="navbar-item" style="color: #eee; font-weight: 600;">Home</p>
            </b-navbar-item>
            <b-navbar-item href="#my-courses">
                <p class="navbar-item" style="color: #eee; font-weight: 600;">My Courses</p>
            </b-navbar-item>
            <b-navbar-item href="#stolaf-courses">
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

.navbar-item {
  color: white;
  font-size: 15px;
  /*background: blue;*/
}

</style>