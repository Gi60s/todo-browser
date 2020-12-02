import Vue from 'vue'

interface MessageData {
  type: 'success' | 'error' | 'warn' | 'info'
  title: string
  message: string
}

declare module 'vue/types/vue' {
  interface Vue {
    $toast: (data: MessageData) => void
  }
}