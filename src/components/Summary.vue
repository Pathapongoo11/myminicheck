<!-- components/Summary.vue -->

<template>
  <div ref="summary">
    <h1>Order Summary</h1>
    <el-table :data="validOrders" style="width: 100%">
      <el-table-column prop="name" label="Product"></el-table-column>
<el-table-column label="Status">
  <template slot-scope="scope">
    <span>{{ scope.row.status ? 'ของหมด' : 'ไม่หมด' }}</span>
  </template>
</el-table-column> 
  <el-table-column  prop="total" label="จำนวน">
 <template slot-scope="scope">
    <span v-if="scope.row.status_total">{{scope.row.total}}</span>
 </template>
  </el-table-column>

  <el-table-column prop="expiryDate" label="expiryDate"></el-table-column>

    </el-table>
    <p v-if="validOrders.length === 0">No orders available</p>
      <button v-if="validOrders.length > 0" @click="exportToImage">Export</button>

  </div>
</template>

<script>
import html2canvas from 'html2canvas';

export default {
    methods: {
    exportToImage() {
      html2canvas(this.$refs.summary).then((canvas) => {
        let link = document.createElement('a');
        link.download = 'summary.png';
        link.href = canvas.toDataURL()
        link.click();
      });
    },
  },
  computed: {
    orders() {
      let result = JSON.parse(localStorage.getItem('orders'));
      if(result.length > 0){
        return result
      }
        
      return this.$store.state.orders
    },
    validOrders() {

    
      const now = new Date()
      return this.orders.filter(order => new Date(order.expiryDate) > now && order.status == true)
    }
  }
}
</script>
