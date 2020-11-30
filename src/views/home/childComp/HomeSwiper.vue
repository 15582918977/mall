<template>
  <swiper>
			<swiper-item v-for="item in banner" :key="item.acm">
				<a href="/home">
					<img :src="item.image" alt="" @load="imgload">
				</a>
			</swiper-item>
		</swiper>
</template>

<script>
import {Swiper,SwiperItem} from '../../../components/common/swiper'
export default {
    name:'HomeSwiper',
    components:{
        Swiper,
        SwiperItem
    },
    props:{
        banner:{
            type:Array,
            default(){
                return []
            }
        }
    },
    data(){
        return{
            isLoad:false,
        }
    },
    methods:{
        imgload(){
            if(!this.isLoad){
                this.$emit('swiperimgload')
                this.isLoad = true;
            }
        }
    }
}
</script>

<style>

</style>