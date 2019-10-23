<template>
  <div>
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="i in lbtList" :key="i.id" > 
        <img :src="i.img||i.src" :class="[{nfull:isFull}]"/>
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    props:['lbtList','isFull']
};
</script>
<style lang="css" scoped>
.mint-swipe {
  height: 13rem !important;
}
.mint-swipe img{
  width: 100%;
  height: 100%;
  background-size: cover;
}
.mint-swipe .nfull {
  width: auto;
  height: 100%;
  background-size: cover;
}
.mint-swipe{
    text-align: center;
}
</style>