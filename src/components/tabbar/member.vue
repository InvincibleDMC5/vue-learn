<template>
  <div>
    <header>
      <div class="container">
        <img src="../../images/member.gif" />
        <router-link to="/home/login" tag="span">登陆 / 注册</router-link>
      </div>
    </header>
    <main>
      <ul>
        <li>木有此功能</li>
        <li>木有此功能</li>
        <li>木有此功能</li>
        <li>退出登陆</li>
      </ul>
    </main>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
header {
  border: 100vw solid #26a2ff;
  border-bottom: 50px solid transparent;
  border-left: 0px;
  border-top: 0px;
  height: 120px;
  position: relative;
  .container {
    position: absolute;
    display: flex;
    width: 100vw;
    align-items: center;
    top: 40%;
    img {
      border-radius: 100%;
      width: 80px;
      height: 80px;
      border: rgba(0, 0, 0, 0.2) solid 1px;
      background: white;
      margin-left: 10px;
    }
    span {
      color: white;
      margin-left: 10px;
    }
  }
}
main {
  ul {
    padding: 0px;
    list-style: none;
    li{
        padding: 10px 10px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        &::after{
            display: inline-block;
            content: ">";
            float: right;
            color: rgba(0,0,0,0.2)
        }
    }
  }
}
</style>