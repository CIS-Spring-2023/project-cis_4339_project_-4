<script>
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import axios from 'axios';
const apiURL = import.meta.env.VITE_ROOT_API
export default {
  name: 'serviceform',
  setup() {
    return { v$: useVuelidate({ $autoDirty: true }) }
  },
  data() {
    return {
      service: {
        name: '',
        status: 'Active',
        description: ''
      },
      services: JSON.parse(localStorage.getItem('service')) || [],
      error: ''
    }
  } ,
  methods: {
    // delService function will get the id of the selected service
    // and find the service stored in the local storage that has the matching id
    // check if the service status is Active, then change the status to Inactive
    // If not, prompt an error message to let the user know the service status is already Inactive.
    delService(id)
    {    
    const index = this.services.findIndex(item => item.id==id)
    if(index !== -1 && this.services[index].status!=='Inactive')
    {
      this.services[index].status = 'Inactive';
    }
    else
    {
      alert('Service is currently inactive!')
    }
    localStorage.setItem('service',JSON.stringify(this.services));
},
  
    async handleSubmitForm() {
      this.error = '';
      //Prompt an error message if the service name field is not filled in the form
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
          // The newService object will store the newly created service from the form
          const newService = 
          {
            id: this.services.length,
            name: this.service.name,
            status: this.service.status,
            desc: this.service.description
          }
          // newService will then be added to an array name services, where it stores all of the service in the local storage
          this.services.push(newService)
          // Using localStorage.setItem to push the services to the local storage
          localStorage.setItem('service',JSON.stringify(this.services));
          
          //Reset all the service field to the original stage
          this.service.name='';
          this.service.description='';
          this.service.status='Active';
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
      <form id="serviceForm" @submit.prevent="handleSubmitForm">
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
          <button class="bg-red-700 text-white rounded" >
            Add New Service
          </button>
        </div>
        </div>
      </form>
    </div>
    <hr class="mt-10 mb-10" />
<div
  class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 content-center"
>
<div></div>

  <div class="ml-10 content-center">
    <h2 class="text-2xl font-bold">List of Services</h2>
  </div>
  <div></div>
  <div></div>
  <div></div>
  <div class="flex flex-col col-span-2 content-center">
    <table class="min-w-full shadow-md rounded">
      <thead class="bg-gray-50 text-xl">
        <tr>
          <th class="p-4 text-left">No.</th>
          <th class="p-4 text-left">Service Name</th>
          <th class="p-8 text-left">Service Status</th>
          <th class="p-4 text-left">Service Description</th>
          <th class="p-12 text-left">Action</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-300">
        <tr v-for="item in services" :key="item.id">
          <td class="p-2 text-left">{{item.id+1}}</td>
          <td class="p-2 text-left">{{item.name}}</td>
          <td class="p-2 text-left"><p :style="{ color: item.status === 'Inactive' ? 'red' : 'green', fontWeight: item.status === 'Inactive' ? 'bold' : 'normal' }">{{item.status}}</p></td>
          <td class="p-2 text-left">{{item.desc}}</td>
          <button class="bg-blue-700 text-white rounded"><router-link :to="{ name: 'editservice', params: { id: item.id } }">Edit</router-link> </button>
          <button class="bg-red-700 text-white rounded" @click="delService(item.id)">Deactivate</button>
        </tr>
      </tbody>
    </table>
  </div>
</div>
  </main>
</template>

<style>
label {
  margin-right: 200px;
}
</style>