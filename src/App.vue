<template>
  <div class="container">
    <!-- header 区域 -->
    <mt-header title="自学程序员vue项目" fixed>
      <span slot="left">
        <mt-button icon="back" v-show="backShow" @click="back">返回</mt-button>
      </span>
    </mt-header>

    <!-- router-view 区域 -->
    <div class="rv">
      <transition>
        <router-view ></router-view>
      </transition>
    </div>

    <!-- tabbar 区域 -->
    <transition name="tabber">
      <nav class="mui-bar mui-bar-tab" v-show="tabbarShow">
        <router-link class="mui-tab-item-a" to="/home" tag="a">
          <span class="mui-icon mui-icon-home"></span>
          <span class="mui-tab-label">首页</span>
        </router-link>
        <router-link class="mui-tab-item-a" to="/member" tag="a">
          <span class="mui-icon mui-icon-contact"></span>
          <span class="mui-tab-label">我的</span>
        </router-link>
        <router-link class="mui-tab-item-a" to="/shopcar" tag="a">
          <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
            <span
              :class="['mui-badge',{jump:$store.getters.jumpStatus}]"
              id="badge"
              ref="ball"
            >{{$store.getters.totalCount}}</span>
          </span>
          <span class="mui-tab-label">购物车</span>
        </router-link>
        <router-link class="mui-tab-item-a" to="/search" tag="a">
          <span class="mui-icon mui-icon-search"></span>
          <span class="mui-tab-label">搜索</span>
        </router-link>
      </nav>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      backShow: false,
      tabbarShow: true
    };
  },
  created() {
    if (this.$route.path != "/home") {
      this.backShow = true;
    } else {
      this.backShow = false;
    }
    if (this.$route.path == "/shopcar") {
      this.tabbarShow = false;
    } else {
      this.tabbarShow = true;
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    }
  },
  mounted() {
    this.$refs.ball.addEventListener("animationend", () => {
      this.$store.commit("noJump");
    });
    
  },
  watch: {
    "$route.path": function(newValue) {
      if (newValue != "/home") {
        this.backShow = true;
      } else {
        this.backShow = false;
      }
      if (newValue == "/shopcar") {
        this.tabbarShow = false;
      } else {
        this.tabbarShow = true;
      }
    }
  }
};
</script>

<style lang="css" scoped>
.container {
  width: 100vw;
  height: 100vh;
  padding-top: 40px;
  position: relative;
  background-color: #fff;
  overflow-x: hidden;
  padding-bottom: 50px;
}
.container .rv {
  width: 100%;
}
.v-enter {
  transform: translateX(100%);
  opacity: 0;
}
.v-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.v-leave-active {
  transition: all 0.2s ease;
  position: absolute;
}
.v-enter-active {
  transition: all 0.2s ease;
}

.mui-bar-tab .mui-tab-item-a.mui-active {
  color: #007aff;
}

.mui-bar-tab .mui-tab-item-a {
  display: table-cell;
  /* overflow: hidden; */
  width: 1%;
  height: 50px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #929292;
}

.mui-bar-tab .mui-tab-item-a .mui-icon {
  top: 3px;
  width: 24px;
  height: 24px;
  padding-top: 0;
  padding-bottom: 0;
}

.mui-bar-tab .mui-tab-item-a .mui-icon ~ .mui-tab-label {
  font-size: 11px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mint-header {
  z-index: 99;
}

.mui-badge {
  transform-origin: bottom;
  text-align: center;
}

.jump {
  animation: jump 0.2s ease alternate 2;
  border: black 1px solid;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
  color: white;
  font-weight: bolder;
}

@keyframes jump {
  0% {
    transform: translateY(0px);
  }
  25% {
    transform: translateY(0px) scale(1.2, 0.2);
  }
  50% {
    transform: translateY(0px) scale(1, 1);
  }
  100% {
    transform: translateY(-50px) scale(1.5);
  }
}
</style>