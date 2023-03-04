<script>
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import axios from 'axios';
import servicedetail from './servicedetails.vue';
const apiURL = import.meta.env.VITE_ROOT_API
export default {
  components:{
    servicedetail,
  },
  setup() {
    return { v$: useVuelidate({ $autoDirty: true }) }
  },
  data() {
    return {
      // removed unnecessary extra array to track services
      service: {
        nextid: 1,
        name: '',
        status: 'Active',
        description: ''        
      },
      arr:[],
      error: ''
    }
  },
  methods: {
    async handleSubmitForm() {
      this.error = '';
      if (!this.service.name)
      {
        this.error = 'Service Name is required'
      }
      
      // If no errors found. then the form is submitted
      if (this.error==='') 
      {
        /* axios
          .post(`${apiURL}/services`, this.service)
          .then(() => {
            alert('Event has been added.')
            this.$router.push({ name: 'findservice' })
          })
          .catch((error) => {
            console.log(error)
          }) */
          const newService = 
          {
            id: this.service.nextid,
            name: this.service.name,
            status: this.service.status,
            desc: this.service.description
          }
          this.arr.push(newService)
          localStorage.setItem('service',JSON.stringify(this.arr)); 
          //Increase the id
          this.service.nextid++;
          //Reset the form data
          this.service.name='';
          this.service.description= '';
      }
    },
  },
}
</script>
<template>
  <main>
    <div>
      <h1
        class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10"
      >
        Create New Service
      </h1>
    </div>
    <div class="px-10 py-20">
      <!-- @submit.prevent stops the submit event from reloading the page-->
      <form @submit.prevent="handleSubmitForm">
        <!-- grid container -->
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
        >
          <h2 class="text-2xl font-bold">Service Details</h2>
          <!-- form field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Service Name</span>
              <span style="color: #ff0000">*</span>
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="service.name"
              />
              <span class="text-black" v-if="error">
                <p class="text-red-700" >
                  {{ error }}!
                </p>
              </span>
            </label>
          </div>    
          <div></div>
          <div></div>
          <div></div>
          <!-- form field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Description</span>
              <textarea
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                rows="2" v-model="service.description"
              ></textarea>
            </label>
          </div>
          <div></div>
          <div></div>
          <!-- form field -->
          <div><h2 class="text-2xl font-bold">Service Status</h2></div>
            <div>
              <label for="active" class="inline-flex items-center">
                <input
                  type="radio"
                  id="Active"
                  value="Active"
                  v-model="service.status"
                  class=" border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
                  checked
                />
                <span class="ml-3">Active</span>
              </label>
              <label for="inactive" class="inline-flex items-center">
                <input
                  type="radio"
                  id="Inactive"
                  value="Inactive"
                  v-model="service.status"
                  class=" border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
                  notchecked
                />
                <span class="ml-3">Inactive</span>
              </label>
            </div>
       <div class="flex justify-between mt-10 mr-20">
          <button class="bg-red-700 text-white rounded" type="submit">
            Add New Service
          </button>
        </div>
        </div>
        <div>
          <servicedetail></servicedetail>
        </div>
      </form>
    </div>
  </main>
</template>

<style>
label {
  margin-right: 200px;
}
</style>