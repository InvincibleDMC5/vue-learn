<template>
  <div class="container">
    <div class="vue"></div>
    <div class="option">
      <span>登陆</span>
      <span>注册</span>
    </div>
    <form action>
      <input type="text" placeholder="账号"/>
      <input type="password" placeholder="密码"/>
      <mt-button type="primary" size="large">登陆</mt-button>
    </form>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.container {
  width: 100vw;
  height: calc(100vh - 90px);
  padding: 20px 20px;
  .vue {
    border-top: 60px solid rgb(62, 185, 132);
    display: inline-block;
    border-left: 35px solid transparent;
    border-right: 35px solid transparent;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    &::after {
      position: absolute;
      content: "";
      top: -62px;
      left: -12px;
      border-top: 20px solid white;
      display: inline-block;
      border-left: 12px solid transparent;
      border-right: 12px solid transparent;
    }
    &::before {
      content: "";
      position: absolute;
      top: -60px;
      left: -25px;
      border-top: 40px solid rgb(51, 71, 94);
      display: inline-block;
      border-left: 25px solid transparent;
      border-right: 25px solid transparent;
    }
  }
  .option{
      margin: 20px 0px;
      display: flex;
      justify-content: space-around;
  }
}
</style>