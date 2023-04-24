<script>
import { DateTime } from 'luxon'
import axios from 'axios'
const apiURL = import.meta.env.VITE_ROOT_API

export default {
  data() {
    return {
      services: [],
      // Parameter for search to occur
      searchBy: 'Service Name',
      serviceName: '',
      status: ''
    }
  },
  mounted() {
    this.getServices()
  },
  methods: {
    // better formattedDate
    formattedDate(datetimeDB) {
      const dt = DateTime.fromISO(datetimeDB, {
        zone: 'utc'
      })
      return dt
        .setZone(DateTime.now().zoneName, { keepLocalTime: true })
        .toLocaleString()
    },
    handleSubmitForm() {
       let endpoint = ''
       if (this.searchBy === 'Service Name') {
         endpoint = `services/search/?serviceName=${this.serviceName}&searchBy=name`
       }
       else if (this.searcgBy === 'Status'){
        endpoint = `events/search/?servicestatus=${this.status}&searchBy=status`
       }
       axios.get(`${apiURL}/${endpoint}`).then((res) => {
         this.services = res.data
       })
     },
    // abstracted method to get events
    getServices() {
       axios.get(`${apiURL}/services`).then((res) => {
         this.services = res.data
       })
      window.scrollTo(0, 0)
    },
    clearSearch() {
      // Resets all the variables
      this.searchBy = 'Service Name'
      this.serviceName = ''
      this.status = ''
      this.getServices()
    },
    editService(serviceID) {
      this.$router.push({ name: 'editservice', params: { id: serviceID } })
    }
  }
}
</script>

<template>
  <main>
    <div>
      <h1
        class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10"
      >
        Search Services
      </h1>
    </div>
    <div class="px-10 pt-20">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
      >
        <h2 class="text-2xl font-bold">Service Name</h2>
        <!-- Displays Service Name search field -->
        <div class="flex flex-col">
          <select
            class="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            v-model="searchBy"
          >
            <option value="Service Name">Service Name</option>
            <option value="Status">Service Status</option>
          </select>
        </div>
        <!--REMOVE COMMENTS TO ENABLE SEARCH SERVICE BY NAME/DESCRIPTION 
        <div class="flex flex-col">
          
          <select
            class="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            v-model="searchBy"
          >
            <option value="Service Name">Service Name</option>
           <option value="Event Date">Service Description</option>
          </select> 
        </div>-->
        <div class="flex flex-col col-sm" v-if="searchBy === 'Service Name'">
          <label class="block">
            <input
              type="text"
              class="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              v-model="serviceName"
              v-on:keyup.enter="handleSubmitForm"
              placeholder="Enter service name"
            />
          </label>
        </div>
        <div class="flex flex-col">
            <button class=" mr-15 bg-red-700 text-white rounded" @click="handleSubmitForm" type="submit">
              Search Service
            </button>
            <button
            class="mr-10 border border-red-700 bg-white text-red-700 rounded"
            @click="clearSearch"
            type="submit"
          >
            Clear Search
          </button>
          </div>
        <!-- Displays Service Description search field -->
        <div class="flex flex-col" v-if="searchBy === 'Service Description'">
          <input
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            type="date"
            v-model="eventDate"
            v-on:keyup.enter="handleSubmitForm"
          />
        </div>
      </div>
      <div></div>
      <div></div>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
      >
      </div>
    </div>

    <hr class="mt-10 mb-10" />
    <!-- Display Found Data -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
    >
      <div class="ml-10">
        <h2 class="text-2xl font-bold">Search Result</h2>
       <!-- <h3 class="italic">Click table row to edit/display an entry</h3>-->
      </div>
      <div class="flex flex-col col-span-2">
        <table class="min-w-full shadow-md rounded">
          <thead class="bg-gray-50 text-xl">
            <tr>
              <th class="p-4 text-left">Service Name</th>
              <th class="p-4 text-left">Service Description</th>
              <th class="p-4 text-left">Service Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-300">
            <tr
              @click="editService(service.serviceID)"
              v-for="service in foundServices"
              :key="service.serviceID"
            >
              <td class="p-2 text-left">{{ service.serviceName }}</td>
              <td class="p-2 text-left">{{ service.serviceStatus }}</td>
              <td class="p-2 text-left">{{ service.serviceDescription }}</td>
              <router-link
                :to="{ name: 'editservice', params: { id: service.serviceID } }"
                >Edit</router-link
              >
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <hr class="mt-10 mb-10" />
    <!-- Display Found Data -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
    >
      <div class="ml-10">
        <h2 class="text-2xl font-bold">Current Services List Result</h2>
       <!-- <h3 class="italic">Click table row to edit/display an entry</h3>-->
      </div>
      <div class="flex flex-col col-span-2">
        <table class="min-w-full shadow-md rounded">
          <thead class="bg-gray-50 text-xl">
            <tr>
              <th class="p-4 text-left">Service Name</th>
              <!-- <th class="p-4 text-left">Service Description</th>
              <th class="p-4 text-left">Service Status</th> -->
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-300">
            <tr
              @click="editService(service.serviceID)"
              v-for="service in services"
              :key="service.serviceID"
            >
              <td class="p-2 text-left">{{ service.serviceName }}</td>
              <!--<td class="p-2 text-left">{{ service.serviceStatus }}</td>-->
              <!--<td class="p-2 text-left">{{ service.serviceDescription }}</td>-->
              <!--<router-link
                :to="{ name: 'editservice', params: { id: service.serviceID } }"
                >Edit</router-link
              >-->
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>
