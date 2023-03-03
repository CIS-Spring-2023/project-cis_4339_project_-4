<template>
    <div class="login">
        <h1
      class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10"
    >
      Login Page
    </h1>
      <br>
      <form>
        <div class="flex flex-col">
            <label class="username">
              <span class="text-gray-700">Username</span>
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder
                v-model="username"
              />
            </label>
          </div>
        <div class="flex flex-col">
            <label class="password">
              <span class="text-gray-700">Password</span>
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder
                v-model="password"
              />
            </label>
          </div>
        <button
            class="bg-red-700 text-white rounded"
            @click="login"
            type="submit"
          >
            Login
          </button>
        <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: '',
        errorMessage: ''
      }
    },
    methods: {
    login() {
      if (this.username === 'user' && this.password === 'password') {
        alert('Welcome to Dataplatform!')
      } else {
        this.errorMessage = 'Error'
      }
    }
  }
}

  </script>
  
  <style>
  .login {
    max-width: 400px;
    margin: 0 auto;
  }
  label, input, button {
    display: block;
    margin-bottom: 10px;
  }
  .error {
    color: red;
    margin-top: 100px;
  }
  </style>