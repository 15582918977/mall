<template>
  <div class="goods-item" @click='itemclick'>
    <img :src="goodsItem.show.img" alt="" @load="imgload">
	<div>
		<div class="goods-info">
			<p>{{goodsItem.title}}</p>
			<span class="price">{{goodsItem.price}}</span>
			<span class="collect">{{goodsItem.cfav}}</span>
		</div>
	</div>
  </div>
</template>

<script>
export default {
  name: "GoodListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods:{
	itemclick(){
		this.$router.push('/detail/'+this.goodsItem.iid);
		// this.$router.push({
		// 	path:'/detail',
		// 	query:{

		// 	}
		// })
	},
	imgload(){
		this.$bus.$emit('itemimageload')
	}
  }
};
</script>

<style lang="stylus" scoped>
	.goods-item
		padding-bottom 40px
		position relative
		width: 48%;
		height: auto;
		img
			width 100%
			border-radius 5px
		.goods-info
			font-size 12px
			position absolute
			bottom 5px
			left 0
			right 0
			overflow hidden
			text-align center
			p
				overflow hidden
				text-overflow elllipsis 
				white-space nowrap 
				margin-bottom 3px
			.price
				color pink;
				margin-right 20px
			.collect::before
				content:""
				position absolute;
				left -15px
				top -1px
				width 14px
				height 14px
				//background:url(../../../assets/images/common/collect.svg) 0 0/14px 14px


		
</style> 


