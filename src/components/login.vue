
<template>
  <div class="login">
    <el-card class="box-card" :body-style="{background:'white', width:'300px',height:'300px', position: 'absolute',top:'30%',right:'10%' }">
      <div class="login-container">
        <div>
          <el-input placeholder="请输入内容" v-model="input1">
            <template slot="prepend">用户名</template>
          </el-input>
        </div>
        <div style="margin-top: 15px;">
          <el-input placeholder="请输入内容" v-model="input2" >
            <template slot="prepend">密码</template>
          </el-input>
        </div>
        <el-button round @click="doLogin" class="loginbutton">login</el-button>
      </div>
    </el-card>




    <div class="login-bg">
    <el-carousel :height="windowHeight" direction="vertical" :autoplay="true">
      <el-carousel-item v-for="item in srcList" :key="item.words">
        <div class="blur"></div>
        <img :src="item.src" class="img-bg">
        <h3>{{item.words}}</h3>

      </el-carousel-item>
    </el-carousel>
    </div>
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "login",
  data() {
    return {
      input1: '',
      input2: '',
      windowWidth: document.documentElement.clientWidth+"px",  //实时屏幕宽度
      windowHeight: document.documentElement.clientHeight+"px",   //实时屏幕高度
      srcList:[
        {src:"/img/584a946615e7a.986e956e.jpg",
          words:"123"
        },
      {src:"/img/584770ff55e04.39c8ef34.jpg",
        words:"896"
      }]
    }
  },
  watch: {
    windowHeight (val) {
      let that = this;
      console.log("实时屏幕高度：",val, that.windowHeight );
    },
    windowWidth (val) {
      let that = this;
      console.log("实时屏幕宽度：",val, that.windowHeight );
    }
  },
  mounted() {
    var that = this;
    // <!--把window.onresize事件挂在到mounted函数上-->
    window.onresize = () => {
      return (() => {
        window.fullHeight = document.documentElement.clientHeight;
        window.fullWidth = document.documentElement.clientWidth;
        that.windowHeight = window.fullHeight;  // 高
        that.windowWidth = window.fullWidth; // 宽
      })()
    };
  },
  methods: {
    doLogin() {
      axios.get(`http://localhost:8082/login?user=${this.input1}&&pwd=${this.input2}`)
          .then(function (response) {
            console.log("response");
            console.log(response);
          })
          .catch(function (error) {
            console.log("error");
            console.log(error);
          });
    }
  }
}
</script>

<style scoped>
.loginbutton{
  margin-top: 20px;
}


.box-card {
  width: 480px;
}


.blur{height:100%;
  width:100%;
  background:rgba(0,0,0,0.5);
  position: absolute;
  top: 0;
  left:0;
}
.login-bg{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left:0;
  z-index:-1;

}
.img-bg{
  object-fit: cover;
  height:100%;
  width:100%;
}
.el-carousel__item h3 {
  color: white;
  font-size: 100px;
  opacity: 0.8;
  line-height: 200px;
  z-index:10;
  position: fixed;
  bottom: 0;
  left: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
.login-container {
  margin-top: 20px;
}

.el-select .el-input {
  width: 130px;
}

.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>