<template>
  <div class="toast">
      <div v-show="isshow">{{message}}</div>
  </div>
</template>

<script>
export default {
    name:'Toast',
    data(){
        return{
            message:'',
            isshow:false,
        }
    },
    methods:{
        show(message,duration=1500){
            this.message = message;
            this.isshow = true;

            setTimeout(()=>{
                this.isshow = false
                this.message = ''
            },duration)
        }
    }
    // props:{
    //     message:{
    //         type:String,
    //         default:''
    //     },
    //     show:{
    //         type:Boolean,
    //         default:false
    //     }
    // }

}
</script>

<style lang="stylus" scoped>
.toast
    position fixed
    top 50%
    left 50%
    transform translate(-50%,-50%)
    background rgba(0,0,0,0.3)
    color white
    z-index 99
</style>
