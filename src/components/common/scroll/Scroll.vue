<template>
<div class="wrapper" ref="swipper">
    <div class="content">
        <slot></slot>
    </div>
</div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    name: 'Scroll',
    props: {
        probeType: {
            type: Number,
            default: 0
        },
        pullupload: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            scroll: null
        }
    },
    methods: {
        scrollto(x, y, time=300) {
            this.scroll && this.scroll.scrollTo(x, y, time)
        },
        refresh(){
            this.scroll && this.scroll.refresh();
        },
        finishPullUp(){
            this.scroll && this.scroll.finishPullUp();
        },
        getScrollY(){
            return this.scroll?this.scroll.y:0;
        }
    },
    mounted() {
        this.scroll = new BScroll(this.$refs.swipper, {
                click: true,
                probeType: this.probeType,
                pullUpLoad: this.pullupload
            })
            if(this.probeType===2||this.probeType===3){
            this.scroll.on('scroll', (position) => {
                this.$emit('scroll', position)
            })
        }

            if(this.pullupload){
                this.scroll.on('pullingUp',()=>{
                    this.$emit('pullingup')
                })
            }
        }

        
}
</script>

<style>

</style>
