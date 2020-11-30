<template>
  <div id="detail">
    <detail-tab-bar class="detailnav" @detailtabbar= "detailtabbar" ref="nav"></detail-tab-bar>
    
    <!--/*必须有固定的高度 */ -->
    <scroll class="content" ref="scroll" @scroll = "contentScroll" :probe-type=2>
      <detail-swiper :banners="topImages" ></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop" class="shop"></detail-shop-info>
      <detail-goods-info
      @detailimgLoad="detailimgLoad"
        :detail-info="detailInfo"
      ></detail-goods-info>
      <detail-param-info :param-info="paramInfo" ref="detailparam"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="detailcomment"></detail-comment-info>
      <detail-recommend-info
        ref="detailrecommend"
        :recommend-info="recommendInfo"
        @itemImgLoad="itemImgLoad"
      ></detail-recommend-info>
    </scroll>

    <toast message='jfjfjf'></toast>
   

    <detail-bot-bar @addCart= "addtoCart"></detail-bot-bar>
    <back-top
    @click.native="backclick" 
		v-show="isshow"></back-top>
  </div>
</template>

<script>
import DetailTabBar from "./childCopm/DetailTabBar";
import DetailSwiper from "./childCopm/DetailSwiper";
import DetailBaseInfo from "./childCopm/DetailBaseInfo";
import DetailShopInfo from "./childCopm/DetailShopInfo";
import DetailGoodsInfo from "./childCopm/DetailGoodsInfo";
import DetailParamInfo from "./childCopm/DetailParamInfo";
import DetailCommentInfo from "./childCopm/DetailCommentInfo";
import DetailBotBar from "./childCopm/DetailBotBar";
import DetailRecommendInfo from "./childCopm/DetailRecommendInfo";

import Toast from '../../components/common/toast/Toast'

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "../../network/detail";

import Scroll from "../../components/common/scroll/Scroll";
import { itemListenerMixin,debounce,backTopMixin } from "../../common/mixin.js";

import {mapActions} from 'vuex'


export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommendInfo: [],
      itemImgListener: null,
      themeTopYs:[],
      getThemeTopYs:null,
      currentIndex:0,
    };
  },
  mixins:[itemListenerMixin,backTopMixin],
  mounted() {

  },
  destroyed() {
    this.$bus.$off("itemImgLoad", this.itemImgListener);
  },
  // updated(){
  //   this.themeTopYs = []

  //   this.themeTopYs.push(0);
  //   this.themeTopYs.push(this.$refs.detailparam.$el.offsetTop);
  //   this.themeTopYs.push(this.$refs.detailcomment.$el.offsetTop);
  //   this.themeTopYs.push(this.$refs.detailrecommend.$el.offsetTop);
  // },
  created() {
    this.iid = this.$route.params.iid;

    getDetail(this.iid).then((res) => {
      const data = res.result;
      this.topImages = data.itemInfo.topImages;
      this.shop = new Shop(data.shopInfo);
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }

      this.detailInfo = data.detailInfo;

    });

    getRecommend().then((res) => {
      this.recommendInfo = res.data.list;
    });

    this.getThemeTopYs=debounce(()=>{
        this.$nextTick(()=>{
        this.themeTopYs = []

        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.detailparam.$el.offsetTop);
        this.themeTopYs.push(this.$refs.detailcomment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.detailrecommend.$el.offsetTop);
        this.themeTopYs.push(1000000000)
      },100)
    })

    
  },
  methods: {
    ...mapActions(['addCart']),
    addtoCart(){
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      product.checked = true;

      // this.$store.commit('addCart',product)
      // this.addCart(product).then(res => {
      //   console.log(res)
      // })

      this.$store.dispatch('addCart',product)
      .then(res =>{
        
        this.$toast.show(res)
      })
    },
    
    contentScroll(positioin){

      this.demo(positioin);

      const positiony = -positioin.y;
      for(let i in this.themeTopYs){
        i = parseInt(i)
        
        // if(this.currentIndex!==i&&(i<this.themeTopYs.length-1 && positiony>this.themeTopYs[parseInt(i)]&&positiony<this.themeTopYs[parseInt(i)+1]) ||
        // (i===this.themeTopYs.length-1 && positiony>=this.themeTopYs[parseInt(i)]) ){

          if(this.currentIndex!==i &&(i<this.themeTopYs.length-1 && positiony>this.themeTopYs[parseInt(i)]&&positiony<this.themeTopYs[parseInt(i)+1])){
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
          
        }
      }

    },
    detailimgLoad(){
        this.newRefresh();
    },
    detailtabbar(index){
      this.$refs.scroll.scrollto(0,-this.themeTopYs[index])
    },
    itemImgLoad() {
      this.newRefresh();
      // this.$refs.scroll.refresh();
      this.getThemeTopYs(debounce)
     
    },
  },
  components: {
    DetailTabBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailRecommendInfo,
    DetailBotBar,
    Toast
  },
};
</script>

<style lang="stylus" scoped>
#detail {
  height: 100vh;
  position: relative;
  z-index: 10;
  background-color: #fff;

  .content {
    background-color: #fff;
    height: calc(100% - 44px);
  }

  .detailnav {
    position: relative;
    z-index: 10;
    background-color: #fff;
  }
}
</style>