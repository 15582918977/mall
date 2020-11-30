<template>
<div class="homepage">

  <el-container style="height: 500px; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu :default-openeds="['1', '3']">
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-message"></i>导航一</template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项4-1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-menu"></i>导航二</template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="2-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="2-4">
            <template slot="title">选项4</template>
            <el-menu-item index="2-4-1">选项4-1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"><i class="el-icon-setting"></i>导航三</template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="3-1">选项1</el-menu-item>
            <el-menu-item index="3-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="3-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="3-4">
            <template slot="title">选项4</template>
            <el-menu-item index="3-4-1">选项4-1</el-menu-item>
          </el-submenu>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>


      <el-main>
        <div class="fileslist" >
          <div class="filesrow" v-for="item of files" :key="item">
            <div class="filesname">{{item.filesname}}</div>
            <div class="filessize">{{item.filessize}}</div>
            <div class="filesdate">{{item.filesdate}}</div>
          </div>
        </div>

      </el-main>
    </el-container>
  </el-container>


  <el-upload
      class="upload-demo"
      action="http://localhost:8082/addFiles"
      multiple
      :limit="3">
    <el-button size="small" type="primary">点击上传</el-button>
    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
  </el-upload>

  <el-button size="small" type="primary" @click="filedelete">删除</el-button>
  <el-button size="small" type="primary" @click="filechange">修改</el-button>
  <el-button size="small" type="primary" @click="filesearch">查找</el-button>
  <el-button size="small" type="primary" @click="filedownload">下载</el-button>
  <el-button size="small" type="primary" @click="filesearchall">查询</el-button>
</div>
</template>

<script>
import axios from "axios";

export default {
  name: "homepage",
  data() {

    return {
      files:[{
        filesname :'',
        filesdate :'',
        filessize :'',
      }],
      data:3,
      newname:"changefilename.jpg",
      name:'upload_d7240dbf74952cb44256b550686ec10a.txt',
    }
  },

  mounted() {
    axios.get(`http://localhost:3001/homepage`)
        .then((response)=>{
          this.array = response.data.data
        })
        .catch(function (error) {
          console.log("error");
          console.log(error);
        });
  //获取文件数据
    axios.get('http://localhost:8082/getAllFiles')
        .then((response)=>{
          // let time = new Date();
          // time.toLocaleDateString()
          this.showall(response);

          // console.log(response.data[0].fileName)
          // let datafile = response.data[2].fileContent.data;
          // console.log(` ${datafile.length/1024} 个字符, ` +
          //     `${Buffer.byteLength(datafile, 'utf8')} 个字节`)
        })
  },
  methods:{
    showall(response){

      for(let i=0;i<response.data.length;i++){
        let file = {};
        file.filesname=response.data[i].fileName;
        file.filessize=(response.data[i].fileContent.data).length
        // console.log((response.data[i].fileContent.data).length)
        this.files.push(file)
      }

      console.log(this.files)
    },
    filesearchall(){

    },

    filedownload(){
      axios.get(`http://localhost:3001/filedownload?name=${this.name}`)
          .then(function(response){
            open(response.config.url);
          })
          .catch(function(err){
            console.log(err)
          });
    },
    open(url){
      window.open(url);
    },
    filesearch(){
      axios.get(`http://localhost:3001/filesearch?name=${this.name}`)
          .then(function(response){
            console.log(response)
          })
          .catch(function(err){
            console.log(err)
          });
    },
    filechange(){
      axios.get(`http://localhost:3001/filechange?name=${this.name}&&newname=${this.newname}`)
            .then(function(response){
              console.log(response)
            })
            .catch(function(err){
              console.log(err)
            });
    },
    filedelete(){
      axios.get(`http://localhost:8082/filedelete?name=${this.name}`)
          .then(function (response) {
            console.log("response");  
            console.log(response);
          })
          .catch(function (error) {
            console.log("error");
            console.log(error);
          });
    }
  },
  created:{

  },

}
</script>

<style scoped>
.filesrow{
  width: 100%;
  height: 30px;
  border-bottom: 1px solid #ccc;
}
.row{
  width: 100%;
  height: 100%;
  background: pink;
}

.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>