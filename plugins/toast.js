import Vue from 'vue'

const plugin = {
  install (app, options) {
    Vue.prototype.$toast = function toast (config) {
      this.$store.commit('messages/add', config)
    }
  }
}

Vue.use(plugin)