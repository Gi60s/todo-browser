import axios from '@nuxtjs/axios'

export const state = function () {
  return {
    lists: []
  }
}

export const mutations = {
  add (state, { id, name }) {
    state.lists.push({ id, name })
  },
  remove (state, id) {
    const index = state.lists.findIndex(list => list.id === id)
    if (index !== -1) state.lists.splice(index, 1)
  },
  rename (state, id, name) {
    const index = state.lists.findIndex(list => list.id === id)
    if (index !== -1) state.lists[index].name = name
  }
}

export const actions = {
  async add ({ commit }, name) {
    let res = await this.$axios.post('/task-lists', { name })
    if (res.status === 201) res = await this.$axios.get(res.headers.Location)
    if (res.status === 200) {
      commit('add', res.data)
      return true
    }
  },
  async get ({ commit }) {
    if (this.state.accounts.token) {
      const res = await this.$axios.get('/task-lists')
      if (res.status === 200) {
        res.data.forEach(list => {
          commit('add', list)
        })
        return true
      }
    }
  },
  async remove ({ commit }, id) {
    const res = await this.$axios.delete('/task-lists/' + id)
    if (res.status === 204) commit('remove', id)
    return true
  },
  rename ({ commit }, id, name) {
    // TODO: axios call
    commit('rename', id, name)
  }
}

// export const mutations = {
//   add(state, text) {
//     state.list.push({
//       text,
//       done: false
//     })
//   },
//   remove(state, { todo }) {
//     state.list.splice(state.list.indexOf(todo), 1)
//   },
//   toggle(state, todo) {
//     todo.done = !todo.done
//   }
// }