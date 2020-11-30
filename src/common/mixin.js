import BackTop from '../components/content/backTop/BackTop'
export const itemListenerMixin = {
    data(){
        return{
            newRefresh:null,
        }
    },
    mounted() {
        this.newRefresh = debounce(this.$refs.scroll.refresh,100)
        this.itemImgListener = () =>{
            this.newRefresh();
        }
        this.$bus.$on('itemImgLoad',this.itemImgListener)
    },
    
}

export function debounce(func,delay=500){
    let timer = null;

    return function(...args){
        if(timer) clearTimeout(timer)

        timer = setTimeout(()=>{
            func.apply(this,args);
        },delay)
    }
}

export const backTopMixin = {
    components:{
        BackTop
    },
    data(){
        return{
            isshow:false,
        }
    },
    methods:{
        backclick(){
            this.$refs.scroll.scrollto(0,0,500);		
        },
        demo(positioin){
            this.isshow = -positioin.y > 1000?true:false;
        }
    }
}