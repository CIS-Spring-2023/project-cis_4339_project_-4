<script>
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

export default {
  props: {
    label: {
      type: Array
    },
    chartData: {
      type: Array
    }
  },
  async mounted() {
    const backgroundColor = this.chartData.map(() => this.getColor())
    const borderColor = backgroundColor.map((e) =>
      e.replace(/[\d\.]+\)$/g, '1)')
    )
    await new Chart(this.$refs.attendanceChart, {
      type: 'bar',
      data: {
        labels: ["Event 1", "Event 2", "Event 3","Event 4", "Event 5", "Event 6","Event 7", "Event 8", "Event 9","Event 10"],//this.label, -->use for sprint 3
        datasets: [
          {
            label: "Number of Attendees in each Events",
            borderWidth: 1,
            backgroundColor: ['rgba(0,0,128,1)'],//backgroundColor, -->use for sprint 3
            borderColor: ['rgba(0,0,0,1)'],//borderColor, -->use for sprint 3
            data: [3,5,2,6,20,3,4,56,32,10]//this.chartData -->use for sprint 3
          }
        ]
      },
      options: {
        scales: {
          y: {
            ticks: {
              stepSize: 1
            }
          },
          x: {
            gridLines: {
              display: false
            }
          }
        },
        plugins: {
          legend: {
            display: false
          }
        },
        responsive: true,
        maintainAspectRatio: true
      }
    })
  },
  methods: {
    getColor() {
      let channel = () => Math.random() * 255
      return `rgba(${channel()}, ${channel()}, ${channel()}, 0.2)`
    }
  }
}
</script>
<template>
  <div class="shadow-lg rounded-lg overflow-hidden">
    <canvas class="p-10" ref="attendanceChart"></canvas>
  </div>
</template>
