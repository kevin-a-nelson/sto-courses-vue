<template>
  <div>
    <b-navbar type="is-black"
              :fixed-top="true">    
        <template slot="brand">
            <b-navbar-item href="/">
                <img
                    src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
                    alt="Lightweight UI components for Vue.js based on Bulma"
                >
            </b-navbar-item>
            <b-navbar-item href="#home" v-if="screenWidthBreakpoint()">
                <strong>Home</strong>
            </b-navbar-item>
            <b-navbar-item href="#user-section" v-if="screenWidthBreakpoint()">
                <strong>My Courses</strong>
            </b-navbar-item>
            <b-navbar-item href="#stolaf-section" v-if="screenWidthBreakpoint()">
                <strong>Stolaf Courses</strong>
            </b-navbar-item>
            <b-navbar-item href="#stolaf-section" v-if="screenWidthBreakpoint()">
                <strong>Contact</strong>
            </b-navbar-item>
        </template>
        <template slot="start">
            <b-navbar-item href="#home">
                <strong>Home</strong>
            </b-navbar-item>
            <b-navbar-item href="#user-section">
                <strong>My Courses</strong>
            </b-navbar-item>
            <b-navbar-item href="#stolaf-section">
                <strong>Stolaf Courses</strong>
            </b-navbar-item>
            <b-navbar-item href="#stolaf-section">
                <strong>Contact</strong>
            </b-navbar-item>

        </template>

        <template slot="end">
            <b-navbar-item tag="div">
                <div class="buttons">
                    <a class="button is-info">
                        <strong>Sign up</strong>
                    </a>
                    <a class="button is-light">
                        <strong>Log in</strong>
                    </a>
                </div>
            </b-navbar-item>
            <p style="color: white;">{{ this.window.width }} </p>
        </template>
    </b-navbar>
  </div>
</template>

<script>
  export default {
    name: 'my-nav-bar',
    data() {
      return {
        window: {
          width: 0,
          height: 0
        }
      }
    },
    created() {
      window.addEventListener('resize', this.handleResize)
      this.handleResize();
    },
    destroyed() {
      window.removeEventListener('resize', this.handleResize)
    },
    methods: {
      handleResize() {
        this.window.width = window.innerWidth;
        this.window.height = window.innerHeight;
      },
      screenWidthBreakpoint() {
        return this.window.width < 1029 && this.window.width > 500
      }
    }
  }
</script>

<style>



</style>