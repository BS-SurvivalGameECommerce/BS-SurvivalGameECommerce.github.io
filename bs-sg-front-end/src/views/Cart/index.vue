<script>
export default {
    data(){
        return {
            fields: ['product', 'price', 'quantity', 'total', {
                key: 'delete',
                label: '',
                tdClass: "last"
            }],
            items: [{
                img: '/assets/images/prod-1.jpg',
                name: 'Jim Beam Kentucky Straight',
                price: 44.99,
                quantity: 2
            }, {
                img: '/assets/images/prod-1.jpg',
                name: 'Jim Beam Kentucky Straight',
                price: 44.99,
                quantity: 2
            }]           
        }
    },
    computed: {
        total: function() {
            return this.items.reduce((accumulator, c) => {
                return parseFloat((parseFloat(accumulator) + parseFloat((c.price * c.quantity))).toPrecision(12));
            }, 0);
        }
    },
    methods: {
        productTotal: function(index) {
            let target = this.items[index];
            return parseFloat((target.price * target.quantity).toPrecision(12));
        },
    }
}
</script>
<template src = "./template.html"></template>
<style src="./style.css"></style>