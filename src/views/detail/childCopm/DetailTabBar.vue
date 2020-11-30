<template>
	<nav-bar class="nav-bar">
		<div slot="left" class="left">
			<div @click="backFn">
				<img src="../../../assets/images/fanhui.png" alt="" class="back-icon">
			</div>
		</div>
		<div slot="center" class="title">
			
			<div v-for="(item,index) of titles" :key="item" 
			class="title-item"
			:class="{active:index===currentIndex}"
			@click="titleClick(index)"
			>{{item}}</div>
			
		</div>
	</nav-bar>
</template>

<script>
import NavBar from '../../../components/common/navbar/NavBar'
	export default {
		name: 'DetailTabBar',
		components:{
			NavBar
		},
		data() {
			return {
				titles:['商品','参数','评论','推荐'],
				currentIndex: 0
			}
		},
		methods: {
			backFn(){
				this.$router.go(-1)
			},
			titleClick(index){
				this.currentIndex = index;
				this.$emit('detailtabbar',index)
			}
		}
	}
</script>

<style lang="stylus" scoped>
.nav-bar 
	.title
		display flex
		.title-item
			font-size 13px
			flex 1
	.left
		.back-icon
			width 28px
			height 28px
			vertical-align: middle;

	.active
		color pink

	
</style>
