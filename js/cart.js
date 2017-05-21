var vm = new Vue({
  el: '#app',
  data: {
    title:'hello',
    productList: [],
    totalMoney: 0,
    checkAllFlag: false
  },
  filters: {
    formatMoney: v=>{
      return "￥ "+v.toFixed(2);
    }
  },
  mounted: function () {
    this.cartView();
  },
  methods: {
    cartView: function () {
      let _this = this;
      this.$http.get("data/cartData.json").then(res=>{
          console.log(res.body.result.list);
          this.productList = res.body.result.list;
          this.totalMoney = res.body.result.totalMoney;
          
      });
    },
    changeMoney: function (pro,way) {
      if(way > 0) {
        pro.productQuentity++
      }else{
        pro.productQuentity--
        if(pro.productQuentity<1){
          pro.productQuentity = 1;
        }
      }
    },
    selectedPro: function (item) {
      if(typeof item.checked == 'undefined') {
        Vue.set(item,'checked',true);
      }else{
        item.checked = !item.checked;
        this.checkAllFlag = false;
      }
    },
    checkAll: function (f) {
      this.checkAllFlag = f;
      var _this = this;
        this.productList.forEach(function (v,i) {
          if(typeof v.checked == 'undefined') {
            Vue.set(v,'checked',_this.checkAllFlag);
          }else{
            v.checked = _this.checkAllFlag;
          }
        })
      
    }
  }
})

Vue.filter('money', (v,t)=>{
  return "￥ "+v.toFixed(2)+t;
})