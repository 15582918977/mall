import {
    ADD_COUNTER,
    ADD_TO_CART
}from './mutation-types'

export default {
    
    addCart(context,payload){
       return new Promise((resolve)=>{
            //{{state,commit} 
            let oldproduct = context.state.cartList.find((item)=>item.iid===payload.iid)
      
            if(oldproduct){
              context.commit(ADD_COUNTER,oldproduct)
              resolve('shop count add')
            }else{
              payload.count = 1;
              
              context.commit(ADD_TO_CART,payload)
              resolve('add new shop')
            }
       })
    }
}