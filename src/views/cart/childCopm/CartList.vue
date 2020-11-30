<template>
	<div class="cart-list-wrap">
		<cart-list-item :cart-list="cartList"></cart-list-item>
	</div>
</template>

<script>
	import CartListItem from './CartListItem.vue'
	import {mapGetters} from 'vuex'
	export default {
		name: "CartList",
		computed: {
			...mapGetters(['cartList'])
		},
		components:{
			CartListItem
		}
	}
</script>

<style lang="stylus" scoped="scoped">
	.cart-list-wrap {
		
		background-color: #fff;
	}
</style>