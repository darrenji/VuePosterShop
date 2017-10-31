new Vue({
    el: '#app',
    data: {
        total:0,
        items: [
            {title: 'Item1'},
            {title: 'Item2'},
            {title: 'Item3'}
        ],
        cart:[]
    },
    methods: {
        addItem: function(index){
            console.log(index);
        }
    }
});