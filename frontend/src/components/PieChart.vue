<template>
    <div>
      <div class="flex flex-col col-span-2 content-center">
    <table class="min-w-full shadow-md rounded">
      <thead class="bg-gray-50 text-xl">
        <tr>
          <th class="p-4 text-left">ZipCode</th>
          <th class="p-4 text-left">Number of Attendees</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-300">
        <tr v-for="(zip,index) in this.pieChartData.data.labels">
          <td class="p-2 text-left">{{zip}}</td>
          <td class="p-2 text-left">
            <span v-for="(dataset, datasetIndex) in this.pieChartData.data.datasets">{{ dataset.data[index] }}</span></td>
        </tr>        
      </tbody>
    </table>
  </div>
      <!-- canvas element for chart -->
      <label class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">Number of Attendees by Zipcode</label>
      <canvas id="pie-chart"></canvas>
    </div>
  </template>

  <script>
  import { Chart, registerables } from 'chart.js'
  import pieChartData from '../assets/piechart-data.js'
  
  //we have to register the registerables with Chart object
  Chart.register(...registerables);
  export default {
    name: 'PieChart',
    data() {
      return {
        pieChartData: pieChartData
      }
    },
    //establish Chart object after mounting the component
    mounted() {
      const ctx = document.getElementById('pie-chart');
      new Chart(ctx, this.pieChartData);
    }
  }
  </script>