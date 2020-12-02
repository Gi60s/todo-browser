<template>
  <el-container class="page-container">
    <el-header class="header">
      <h1><nuxt-link to="/">To Do</nuxt-link></h1>
      <el-button type="text" class="logout" v-if="authenticated" @click="logout()">Log Out</el-button>
    </el-header>
    <el-main>
      <Nuxt />
      <todo-login v-if="!authenticated"></todo-login>      
    </el-main>
  </el-container>
</template>

<script lang="ts">
import Vue from 'vue'
import TodoLogin from '~/components/Login.vue'

export default Vue.extend({
  components: {
    TodoLogin
  },

  beforeMount () {
    // add axios interceptor to add authorizion token
    this.$axios.interceptors.request.use(config => {
      const token = this.$store.state.accounts.token
      if (token) config.headers.Authorization = 'Bearer ' + token
      return config
    })

    // add axios interceptor to check for and report non-200 responses
    this.$axios.interceptors.response.use(res => res, err => {
      const config = err.config
      const res = err.response
      const req = err.request
      const ignoreStatus = config.ignoreStatus || []
      if (!ignoreStatus.includes(status)) {
        this.$notify({
          type: 'error',
          title: 'Request Failed: ' + config.method.toUpperCase() + ' ' +
            config.baseURL + config.url,
          message: '[' + res.status + '] ' + res.data
        })
      }
      return res
    })

    this.$store.dispatch('todoLists/get')
  },

  computed: {
    authenticated () {
      return this.$store.state.accounts.token
    }
  },

  methods: {
    logout () {
      this.$store.dispatch('accounts/logout')
    }
  }
})
</script>

<style lang="stylus">
@import '~/assets/main.styl'

html {
  font-family: Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.page-container {
  width: 1000px
  max-width: 100%
  margin: spacing-normal auto
  border-radius: radius-normal
  border: 1px solid color-main-light

  .header {
    display: flex
    align-items: center
    background-color: color-main
    overflow: hidden
    
    h1 {
      flex: 1
      margin: 0
      padding: 0

    }

    a, a:visited, a:active, a:hover {
      color: white
      text-decoration: none
    }
  }
}

a, a:visited, a:active, a:hover {
  color: color-main
}

.logout  {
  color: white

  &:hover {
    color: white
    text-decoration: underline
  }
}
</style>
