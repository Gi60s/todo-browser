export const state = function () {
  return {
    token: getCookie('todo-token') || '',
    user: getCookie('todo-username') || ''
  }
}

export const mutations = {
  setAccount (state, { token, username }) {
    state.token = token
    state.username = username

    const cData = token
      ? encodeURIComponent(JSON.stringify({ token, username }))
      : ''
    setCookie('todo-account', cData, token ? 1 : 0)
    if (token) {
      this.$notify({
        type: 'success',
        title: 'Success',
        message: 'Log in successful'
      })
    } else {
      this.$notify({
        type: 'success',
        title: 'Success',
        message: 'Log out successful'
      })
    }
  }
}

export const actions = {
  async authenticate ({ commit, dispatch }, { username, password }) {
    const res = await this.$axios.put('/authenticate', { username, password })
    if (res.status === 200) {
      commit('setAccount', {
        token,
        username
      })
      await dispatch('todoLists/get')
    }
  },

  async create ({ commit, dispatch }, { username, password }) {
    const res = await this.$axios.post('/accounts', { username, password }, { ignoreStatus: [409] })
    if (res.status === 201) {
      return dispatch('accounts/authenticate', username, password)
    } else if (res.status === 409) {
      this.$notify({
        type: 'error',
        title: 'Error',
        message: 'Account username already in use.'
      })
    }
  },

  delete ({ commit }, id) {
    
  },

  logout ({ commit }) {
    commit('setToken', '')
  },

  update ({ commit }, id, name) {
    
  }
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}