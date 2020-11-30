<template>
  <div id="app">
    <keep-alive exclude="citySearch">
      <router-view/>
    </keep-alive>
    
      <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from './components/content/mainTabBar/MainTabBar'
export default {
  name:'app',
  components:{
    MainTabBar,
  }
}
</script>

<style lang="stylus">
@import 'assets/css/base.css'

  
</style>
