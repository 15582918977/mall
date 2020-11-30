<template>
	<div class="cart-wrap">
		<nav-bar class="navbar">
			<div slot="center" >cart({{cartLength}})</div>
		</nav-bar>
		<scroll class="content" ref="scroll">
			<cart-list></cart-list>
		</scroll>
		<cart-bot-bar></cart-bot-bar>
	</div>
</template>

<script>
import NavBar from '../../components/common/navbar/NavBar'
import CartList from './childCopm/CartList'
import CartBotBar from './childCopm/CartBotBar'
import Scroll from '../../components/common/scroll/Scroll'
import {mapGetters} from 'vuex'
	export default {
		name: 'Cart',
		components:{
			NavBar,
			CartList,
			Scroll,
			CartBotBar
		},
		computed:{
			...mapGetters(['cartLength'])
		},
		activated(){
			this.$refs.scroll.refresh()
		}
	}
</script>

<style lang="stylus" scoped="scoped">
.cart-wrap
	height 100vh
	.navbar
		position relative
		z-index 9
		background pink
		color white
		font-weight 700
	.content
		height calc(100% - 44px)
		overflow hidden
</style>
