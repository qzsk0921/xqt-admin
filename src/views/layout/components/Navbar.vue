<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
    <breadcrumb />
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <!-- <span class="user-name">{{roles == 1 ? userInfo.username : userInfo.currentClub.club_name }}</span> -->
        <!--<img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">-->
        <i class="el-icon-caret-bottom"/>
      </div>
      <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <!-- <el-dropdown-item  v-if="roles == 2"  v-for="(v, i) in clubs" :key="i">
              <span @click="switchLogin(v)">{{v.club_name}}</span>
          </el-dropdown-item> -->
          <el-dropdown-item >
              <span style="display:block; color: red" @click="logout">退出</span>
          </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
    data () {
      return {
          // clubs: this.$store.state.user.clubs,
          userInfo: this.$store.state.user.userInfo,
          roles: this.$store.state.user.roles
      }
    },
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  methods: {
        switchLogin (v) {
            this.userInfo = JSON.parse(''+ JSON.stringify(this.userInfo) +'')
            this.userInfo['currentClub'] = this.currentClub = v
            this.$store.dispatch('SwitchLogin', this.userInfo).then(() => {
                this.$router.go(0)
            }).catch(errors => {
                console.log(errors)
            })
        },
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then((res) => {
          console.log(res)
        location.reload() // 为了重新实例化vue-router对象 避免bug
      }).catch(errors => {
          console.log(errors)
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {

    height: 100%;
    display: inline-block;
    position: absolute;
    right: 35px;

    .avatar-wrapper {
        display: flex !important;
        align-items: center;
        height: 100%;
      cursor: pointer;
      position: relative;
      line-height: initial;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>

