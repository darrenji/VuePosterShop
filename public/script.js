var PRICE = 9.99;
var LOAD_NUM = 10;

new Vue({
    el: '#app',
    data: {
        total:0,
        items: [],//当前的数据
        results:[],//所有的数据
        cart:[],
        search: 'anime',
        lastSearch:'',
        loading: false,
        price: PRICE
    },
    computed:{
        noMoreItems: function(){
            return this.items.length === this.results.length && this.results.length > 0;
        }
    },
    methods: {
        addItem: function(index){
            this.total += PRICE;
            
            //要加入的
            var item = this.items[index];
            var found = false;
            
            //看看购物车
            for(var i=0;i<this.cart.length;i++){
                if(this.cart[i].id === item.id){
                    found = true;
                    this.cart[i].qty++;
                    break;
                }
            }
            
            if(!found){
                this.cart.push({
                    id: item.id,
                    title: item.title,
                    qty:1,
                    price: PRICE
                });
            }
            
            
        },
        inc: function(item){
            item.qty++;
            this.total += PRICE;
        },
        dec: function(item){
            item.qty--;
            this.total -= PRICE;
            if(item.qty <=0){
                //从购车中删除
                for(var i =0; i< this.cart.length;i++){
                    if(this.cart[i].id === item.id){
                        this.cart.splice(i, 1);
                        break;
                    }
                }
            }
        },
        onSubmit: function(){
            this.items = [];
            this.loading = true;
            this.$http
                .get('/search/'.concat(this.search))
                .then(function(res){
                    this.lastSearch = this.search;
                    this.results = res.data;
                    this.appendItems();
                    this.loading = false;
                });
        },
        appendItems: function(){
            if(this.items.length < this.results.length){
                var append = this.results.slice(this.items.length, this.items.length + LOAD_NUM);
                this.items = this.items.concat(append);
            }
        }
        
    },
    filters: {
        currency: function(price){
            return '¥'.concat(price.toFixed(2));
        }
    },
    mounted: function(){
            this.onSubmit();

            var vueInstance = this;
            var elem = document.getElementById('product-list-bottom');
            var watcher = scrollMonitor.create(elem);
            watcher.enterViewport(function(){
                //第三方库调用vue实例方法
                vueInstance.appendItems();
            });
    }
});

