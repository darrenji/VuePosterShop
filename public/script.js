new Vue({
    el: '#app',
    data: {
        total:0,
        items: [
            {title: 'Item1'},
            {title: 'Item2'},
            {title: 'Item3'}
        ]
    },
    methods: {
        addItem: function(){
            this.total += 9.99;
        }
    }
});