<!-- 后台管理系统首页 -->
<template>
  <el-container>
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/heima.png" />
        <span>电商管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>

    <el-container>
      <!-- 侧边栏区域 -->
      <el-aside :width="isCollapse? '60px' : '180px'">
        <!-- 菜单栏区域 -->
        <div class="toggle_btn" @click="() => isCollapse = !isCollapse">||||</div>
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          unique-opened
          :collapse-transition="false"
          :collapse="isCollapse"
          router
          :default-active="activePath"
        >
          <el-submenu :index="item.path" v-for="item in menuList" :key="item.id">
            <template slot="title">
              <i :class="iconsObj[item.id]"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item
              :index="subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id"
              @click="saveNavState('/' + subItem.path)"
            >
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 主要内容区域 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      menuList: [],
      isCollapse: false,
      iconsObj: {
        '125': 'iconfont icon-user',
        '103': 'iconfont icon-tijikongjian',
        '101': 'iconfont icon-shangpin',
        '102': 'iconfont icon-danju',
        '145': 'iconfont icon-baobiao'
      },
      activePath: ''
    }
  },
  created() {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    async getMenuList() {
      const { data: res } = await this.$http.get('menus')
      this.menuList = res.data
      // console.log(this.menuList)
    },
    logout() {
      window.sessionStorage.clear() // 清空sessionStorage
      this.$router.push('/login')
    },
    // 保存链接的激活状态
    saveNavState(activePath) {
      console.log(1)
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }
}
</script>
<style lang='less' scoped>
.el-container {
  height: 100%;
  .el-header {
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    color: #fff;
    font-size: 20px;
    padding-left: 0;
    > div {
      display: flex;
      align-items: center;
      span {
        margin-left: 15px;
      }
    }
    .el-button {
      margin: 10px;
    }
  }
  .el-aside {
    background-color: #333744;
    .el-menu {
      border-right: none;
      .el-submenu .iconfont {
        font-size: 18px;
      }
    }
    .toggle_btn {
      width: 100%;
      text-align: center;
    }
  }
  .el-main {
    background-color: #eaedf1;
  }
}
</style>
