<template>
	<div class="recommend">
		<div v-for="item in recommend" :key="item.name">
			<img class="recommend-img" :src="item.image" alt="">
		</div>


	</div>
</template>

<script>
	export default {
		name: 'HomeRecommend',
		props:{
			recommend:{
				type:Array,
				default(){
					return []
				}
			}
		},
		components:{

		}
		
	}
</script>

<style lang="stylus" scoped>
	.recommend
		display flex
		padding-bottom 10px
		border-bottom 10px solid #eee
		.recommend-img
			width 100%
</style>
