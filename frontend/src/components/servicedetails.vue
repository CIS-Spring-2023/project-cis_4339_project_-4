<script>
import { onMounted } from 'vue';
export default {
  props:{
    data:{
      type:Array,
      default: () => [],
    }
  },
  data() 
  {
    return {
      serviceInfo: []
    };
  },  
  created() 
  {   
      // retrieve data from local storage
      const data = JSON.parse(localStorage.getItem('service'));
      if(data)
      {
      this.serviceInfo = data;
      }
      },
};
</script>

<template>
<main>
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
          <th class="p-4 text-left">Service Name</th>
          <th class="p-4 text-left">Service Status</th>
          <th class="p-4 text-left">Service Description</th>
          <th class="p-4 text-left">Action</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-300">
        <tr v-for="item in serviceInfo" :key="item.id">
          <td class="p-2 text-left">{{item.name}}</td>
          <td class="p-2 text-left">{{item.status}}</td>
          <td class="p-2 text-left">{{item.desc}}</td>
          <router-link :to="{ name: 'editservice', params: { id: item.id } }">Edit</router-link> 
        </tr>
      </tbody>
    </table>
  </div>
</div>
</main>
</template>