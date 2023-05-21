<template>
<div>
  <el-table :data="products" style="width: 100%">
    <el-table-column prop="name" label="สินค้า"></el-table-column>
    <el-table-column label="สถานะ (ติ๊ก คือของ หมด ไม่ติ๊กคือยังมี)">
      <template slot-scope="scope">
        <el-checkbox class="custom-checkbox" v-model="scope.row.status" ></el-checkbox>
      </template>
    </el-table-column>
    <el-table-column label="จำนวน">
      <template slot-scope="scope" v-if="scope.row.status_total == true">

          <el-input-number v-model="scope.row.total" @change="handleChange" :min="1" :max="30"></el-input-number>
      </template>
    </el-table-column>
  </el-table>
    <el-button class="btn" type="primary" :disabled="!isOrderValid" @click="submitOrder">ส่งรายการ</el-button>
</div>
</template>

<script>
export default {
  data() {
    return {
         No: null, 
         Yes:null,
      products: [
        { name: 'มาม่า', status: false ,total:0},
        { name: 'เส้นเล็ก', status: false ,total:0},
        { name: 'เส้นหมีขาว', status: false ,total:0},
        { name: 'เส้นใหญ่', status: false ,total:0},
        { name: 'วุ่นเส้น', status: false ,total:0},
        { name: 'เกียมอี๋', status: false ,total:0},
        { name: 'เส้นบะหมี่', status: false ,total:0,status_total:true},
        { name: 'ลูกชิ้นปลา', status: false,total:0 ,status_total:true},
        { name: 'ลูกชิ้นกุ้ง', status: false ,total:0 ,status_total:true},
        { name: 'ลูกชิ้นแคระ', status: false ,total:0 ,status_total:true},
        { name: 'ปลาเส้น', status: false ,total:0 ,status_total:true},
        { name: 'กระดูกหมู', status: false ,total:0,status_total:true},
        { name: 'พริก น้ำตาลซอง', status: false ,total:0,status_total:true},
        { name: 'พริกเขียว', status: false ,total:0},
        { name: 'ผักบุ้ง', status: false ,total:0},
        { name: 'ถั่วงอก', status: false ,total:0},
        { name: 'ต้นหอม', status: false ,total:0},
        { name: 'กระเทียม', status: false ,total:0},
        { name: 'น้ำตาล', status: false ,total:0},
        { name: 'พริกไท', status: false ,total:0},
        { name: 'ชาดำเย็น', status: false ,total:0,status_total:true},
        { name: 'โอเลี้ยง', status: false ,total:0,status_total:true},
        { name: 'กระเจี๊ยบ', status: false ,total:0,status_total:true},
        { name: 'เก๊กฮวย', status: false ,total:0,status_total:true},
        { name: 'ฟ้าไทย', status: false ,total:0,status_total:true},
        { name: 'ชูรส', status: false ,total:0,status_total:true},
        { name: 'ซอสฝาเขียว', status: false ,total:0,status_total:false},
        { name: 'น้ำส้มใส', status: false ,total:0,status_total:false},
        { name: 'น้ำส้มโฟ', status: false ,total:0,status_total:false},
        { name: 'ซอสโฟ', status: false ,total:0,status_total:false},
        { name: 'น้ำส้มใส', status: false ,total:0,status_total:false},
        { name: 'น้ำกระเทียมดอง', status: false ,total:0,status_total:false},
        { name: 'น้ำส้มใส', status: false ,total:0,status_total:false},
        { name: 'กระเทียมหัว', status: false ,total:0,status_total:false},
        { name: 'พริกไทย', status: false ,total:0,status_total:false},
        { name: 'ใบเตย', status: false ,total:0,status_total:false}


      ],
      isOrderValid: false
    }
  },
  methods: {
     handleChange(value) {
     },
    submitOrder() {
      this.$store.commit('addOrder', this.products)
      let notifications = localStorage.getItem('notifications');
    if (!notifications) {
      notifications = [];
    } else {
      notifications = JSON.parse(notifications);
    }
    notifications.push(this.products);
    localStorage.setItem('notifications', JSON.stringify(notifications));
        this.$router.push({ name: 'Summary' });

    }
  },
   mounted() {
    const orders = localStorage.getItem('orders');    
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    let orderList = JSON.parse(orders)
    let mapOrder = orderList.filter(order=>{
    const orderDate = new Date(order.expiryDate);
      return orderDate >= currentDate;
    });
    if(mapOrder.length > 0){
      this.products = mapOrder 
    }else{
      localStorage.removeItem("orders")
    }

  
  },
  watch: {
    products: {
      handler() {
        this.isOrderValid = this.products.some(product => product.status)
      },
      deep: true
    }
  }
}
</script>

<style scoped>
::v-deep .el-checkbox.custom-checkbox .el-checkbox__inner {
  width: 20px;
  height: 20px;
  border: 1px solid #67C23A;
}
::v-deep .btn {
    width: 100% !important;
}

::v-deep .el-checkbox.custom-checkbox .el-checkbox__inner::after {
  top: -1%;
  /* left: 8px; */
  width: 7px;
  height: 14px;
  border-width: 2px;
  border-color: #fff;
}

::v-deep .el-checkbox.custom-checkbox.is-checked .el-checkbox__inner {
  border-color: #67C23A;
  background-color: #67C23A;
}
</style>
