<template>
  <div class="login">
    <h2>Log In</h2>
    <el-form ref="form" :model="form" label-width="140px" @submit="login()">
      <el-form-item label="User name">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="Password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item v-if="create" label="Retype Password">
        <el-input type="password" v-model="form.password2"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login()">{{ create ? 'Create Account' : 'Log In' }}</el-button>
      </el-form-item>
    </el-form>
    <p>
      <el-link v-if="!create" type="primary" @click="create = true">Create an Account</el-link>
      <el-link v-if="create" type="primary" @click="create = false">Sign in with Existing Account</el-link>
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'todo-login',

  data () {
    return {
      create: false,
      form: {
        username: '',
        password: '',
        password2: ''
      }
    }
  },

  methods: {
    async login () {
      if (this.create) {
        if (this.form.password !== this.form.password2) {
          // this.$notify({
          //   type: 'error',
          //   title: 'Passwords do not match',
          //   message: 'Please retype your passwords'
          // })
          this.form.password = ''
          this.form.password2 = ''
        } else {
          const success = await this.$store.dispatch('accounts/create', {
            username: this.form.username,
            password: this.form.password
          })
          // if (success) {
          //   this.$notify({
          //     type: 'error',
          //     title: 'Passwords do not match',
          //     message: 'Please retype your passwords'
          //   })
          // }
        }
      } else {
        this.$store.dispatch('accounts/authenticate', {
          username: this.form.username,
          password: this.form.password
        })
      }
    }
  }
})
</script>

<style lang="stylus" scoped>
  @import '~/assets/main.styl'

  .login {
    width: 500px
    margin: 0 auto
    text-align: center

    form {
      text-align: left;
    }
    
    h2 {
      margin-bottom: spacing-normal
    }
  }
</style>
