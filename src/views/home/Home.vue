<template>
	<div id="home">
		<nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

		<tab-control 
			ref="tabcontrol1"
			class="tabscroll" 
			:titles="['pop','new','sell']" @tabclick="tabclick" v-show="isTabFixed"></tab-control>

		<scroll class="content" ref="scroll" :probe-type="3" 
			@scroll="contentscroll"
			@pullingup="loadMore"
			:pull-up-load="true">
			<home-swiper :banner="banner" @swiperimgload="swiperimgload"></home-swiper>
			<home-recommend :recommend="recommend" />
			<home-feature></home-feature>
			
			<tab-control 
			ref="tabcontrol2"
			:class="{tabcontrol:isTabFixed}" 
			:titles="['pop','new','sell']" @tabclick="tabclick"></tab-control>
			<goods-list :goods="showGoods"></goods-list>	
		</scroll>

		<back-top 
		class="backtop"
		@click.native="backclick" 
		
		v-show="isshow"></back-top>
	</div>
</template>

<script>
import NavBar from '../../components/common/navbar/NavBar'
import {getHomeMultidata,getRecommendData,getHomeGoods} from '../../network/Home'
import TabControl from '../../components/content/tabControl/TabControl'

import HomeSwiper from './childComp/HomeSwiper'
import HomeRecommend from './childComp/HomeRecommend'
import HomeFeature from './childComp/HomeFeature'
import GoodsList from '../../components/content/goodsList/GoodsList'
import Scroll from '../../components/common/scroll/Scroll'
import BackTop from '../../components/content/backTop/BackTop'


	export default {
		name: 'Home',
		components:{
			NavBar,
			TabControl,
			HomeRecommend,
			HomeSwiper,
			HomeFeature,
			GoodsList,
			Scroll,
			BackTop,
			
		},
		data(){
			return{
				banner:[],
				recommend:[],
				good:{
					"pop":{page:0,list:[]},
					"new":{page:0,list:[]},
					"sell":{page:0,list:[]}
				},
				currentType:'pop',
				isshow:false,
				taboffsetTop:0,
				isTabFixed:false,
				saveY:0,
				itemimagelisten:null
			}
		},
		activated(){
			this.$refs.scroll.scrollto(0,this.saveY,0);
			this.$refs.scroll.refresh();
		},
		deactivated(){
			this.saveY = this.$refs.scroll.getScrollY();

			this.$bus.$off('itemimageload',this.itemimagelisten)
		},
		destroyed(){

		},
		computed:{
			showGoods(){
				
				return this.good[this.currentType].list
			}
		},
		created(){
			this.getHomeMultidata();
			
			this.getHomeGoods('pop');
			this.getHomeGoods('new')
			this.getHomeGoods('sell');

      
		},
		mounted(){
		
			const refresh = this.debounce(this.$refs.scroll.refresh);

			this.itemimagelisten = ()=>{
				refresh();
			}

			this.$bus.$on('itemimageload',this.itemimagelisten);


		},
		methods: {
			swiperimgload(){
				this.taboffsetTop = this.$refs.tabcontrol2.$el.offsetTop;
				
			},
			loadMore(){
				this.getHomeGoods(this.currentType)
			},

			debounce(func,delay=500){
				let timer = null;

				return function(...args){
					if(timer) clearTimeout(timer)

					timer = setTimeout(()=>{
						func.apply(this,args);
					},delay)
				}
			},

			//事件监听相关的方法
			tabclick(index){
				switch(index){
					case 0:
						this.currentType = 'pop';
						break;
					case 1:
						this.currentType = 'new';
						break;
					case 2:
						this.currentType = 'sell';
						break;
				}
				this.$refs.tabcontrol1.currentindex= index;
				this.$refs.tabcontrol2.currentindex = index;
				
			},
			contentscroll(position){
				Math.abs(position.y)>this.taboffsetTop?this.isTabFixed = true:this.isTabFixed=false

				if(Math.abs(position.y) > 1000){
					this.isshow = true
				}else{
					this.isshow = false
				}
			},

			backclick(){
				this.$refs.scroll.scrollto(0,0,500);		
			},

			//网络请求方法
			getHomeMultidata() {
					getHomeMultidata().then(res=>{
					this.banner=res.data.banner.list;
					this.recommend = res.data.recommend.list;
				})
			},
			getRecommendData() {
				getRecommendData().then(res=>{
				this.recommend = res.data.message;
				})
			},
			getHomeGoods(type) {
				const page = this.good[type].page+1;

				getHomeGoods(type,page).then(res =>{

					this.good[type].list.push(...res.data.list)
					this.good[type].page += 1;  

					this.$refs.scroll.finishPullUp();

				});
			}
		}
	} 
</script>

<style lang="stylus" scoped>

#home
	height 100vh
	position relative

	.tabscroll
		position relative
		z-index 9
	.home-nav
		background pink
		color #fff
		
	.tabcontrol
		position fixed;
		top 44px
		left 0
		right 0
			
	.content
		position absolute
		overflow hidden
		bottom 49px
		left 0
		top 44px

</style>