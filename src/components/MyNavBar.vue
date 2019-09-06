<template>
  <div>
    <b-navbar :fixed-top="false">    
        <template slot="brand">
            <b-navbar-item href="/">
                <img
                    src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
                    alt="Lightweight UI components for Vue.js based on Bulma"
                >
            </b-navbar-item>
        </template>
        <template slot="start">
            <b-navbar-item href="/">
                <strong class="nav-link">Home</strong>
            </b-navbar-item>
            <b-navbar-item href="#user-section" v-smooth-scroll>
                <strong class="nav-link">My Courses</strong>
            </b-navbar-item>
            <b-navbar-item href="#stolaf-section" v-smooth-scroll>
                <strong class="nav-link">Stolaf Courses</strong>
            </b-navbar-item>
            <b-navbar-item href="#contact" v-smooth-scroll>
                <strong class="nav-link">Contact</strong>
            </b-navbar-item>
        </template>
        <template slot="end">
            <b-navbar-item tag="div">
                <div class="buttons" v-if="!loggedIn()">
                  <b-button type="is-info">
                    <router-link id="signup-btn" to="/signup">Signup</router-link>
                  </b-button>
                  <b-button type="is-light">
                    <router-link id="login-btn" to="/login">Login</router-link>
                  </b-button>
                </div>
                <div v-else >
                  <a class="button is-info" tag="router-link" href="/logout">
                      <strong>Logout</strong>
                  </a>
                </div>
            </b-navbar-item>
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
    methods: {
      loggedIn() {
        return localStorage.jwt
      },
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


#signup-btn {
  color: white;
  font-weight: 500;
}

#login-btn {
  color: black;
  font-weight: 500;
}

#fixed-nav {
}

.nav-link {
  color: white;
}

.nav-link:hover {
  color: black;
}

@media only screen and (max-width: 1000px) {
  .navbar-menu {
    background: transparent !important;
  }
}

.navbar {
}

</style>