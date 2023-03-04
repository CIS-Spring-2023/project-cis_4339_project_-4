<script>
export default {
  data(){
    return{
    selectedData:null
    }
  },
  mounted() {
    const serviceid = this.$route.params.id // get the ID from the URL
          const storedData = JSON.parse(localStorage.getItem(key));
          console.log(storedData)
          const selectedData = storedData.find(item => item.id === serviceid); 
          if(selectedData)
          {            
            this.selectedData = selectedData
          }
  }
}
</script>
<template>
<li>testing</li>
</template>
