<template>
<div class="tab-control">
	<div v-for="(item,index) in titles" 
	:key="item.name" 
	class="tab-control-item"
	:class="{active: index === currentindex}"
	@click="tabclick(index)"
	>
		<span>{{item}}</span>
	</div>
</div>
</template>

<script>
export default {
	name:'TabControl',
	props:{
		titles:{
			type:Array,
			default(){
				return []
			}
		}
	},
	data () {
		return{
			currentindex:0
		}
	},
	methods:{
		tabclick(index){
			this.currentindex = index;
			this.$emit('tabclick',index);
		}
	}
}
</script>

<style lang="stylus" scoped>
	.tab-control
		display flex
		text-align center
		font-size 22px
		.tab-control-item
			flex 1
			height 40px;
			line-height 40px
			span 
				padding-bottom 5px;
		.active
			color pink

		.active span 
			border-bottom 3px solid pink
</style>