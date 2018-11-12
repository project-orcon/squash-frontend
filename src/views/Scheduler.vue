<template>
  <div class="scheduler">
      <h1>HOWDY</h1>
       
    <div class="container">
    <div style="width:150px;height:600px;display:inline-block">
    <span class="bcell" v-for="item in 24" :key="item" >
    {{item+":00"}}</span>
    </div>
    <div style="width:900px;height:600px;display:inline-block">
    <div class="bcell" v-for="item in ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']" :key="item">{{item}}</div>
             <drag-select-container selectorClass="item">
        <template slot-scope="{ selectedItems }">
          <span v-for="item in 7" v-bind:key="item" :class="getClasses(item, selectedItems)" :data-item="item" />
              </template>
      </drag-select-container>
      </div>
    </div>
    
      

  </div>
</template>
<script>
import DragSelect from 'vue-drag-select/src/DragSelect.vue'

export default {
  name: 'scheduler',
    components: {
    'drag-select-container': DragSelect
  },
  methods: {
       getClasses (item, selectedItems) {
        const isActive = !!(selectedItems.find((selectedItem) => {
          return parseInt(selectedItem.dataset.item, 10) === item
        }))
        return {
          item: true,
          bcell:true,
          'has-background-primary': isActive
        }
      }
  }

}
</script>
<style scoped>
.court-img{   
  background:url('../assets/court2.jpg') bottom left;
  background-size:cover;
  padding:20px;
}
.bcell {
    display:inline-block;
    width:100px;
    height:50px;
    margin:-3px 1px;;
    background-color:lightcyan;
}

.container {
    width:1500px !important;
}

 
 
</style>