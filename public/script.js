var PRICE = 9.99;

new Vue({
    el: '#app',
    data: {
        total:0,
        items: [
            {id:1, title: 'Item1'},
            {id:2, title: 'Item2'},
            {id:3, title: 'Item3'}
        ],
        cart:[]
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
            console.log('submitted');
        }
    },
    filters: {
        currency: function(price){
            return '¥'.concat(price.toFixed(2));
        }
    }
});