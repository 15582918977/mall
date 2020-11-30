<template>
	<div class="goods">
		<goods-list-item class="goods-item" v-for="item in goods" :goodsItem="item" :key="item.acm"></goods-list-item>
	</div>
</template>

<script>
import GoodsListItem from "./GoodsListItem";
export default {
  name: "GoodsList",
  components: {
    GoodsListItem,
  },
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style lang="stylus" scoped>
.goods
	display flex
	flex-wrap wrap
	justify-content space-around
</style>
