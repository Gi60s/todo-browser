import axios from '@nuxtjs/axios'

export const state = function () {
  return {
    messages: []
  }
}

export const mutations = {
  add (state, data) {
    state.messages.push(data)
  }
}