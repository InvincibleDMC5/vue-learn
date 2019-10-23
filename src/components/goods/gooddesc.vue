<template>
    <div class="goodsdesc-container">
        <h3>{{info.title}}</h3>
        <hr>
        <div v-html="info.content" class="content"></div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            msg:this.$route.params.id,
            info:{}
        }
    },
    methods: {
        getGoodsDesc(){
            this.axios.get("/api/goods/getdesc/" + this.msg).then(response => {
                if(response.data.status === 0){
                    this.info = response.data.message[0];
                }else{
                    alert("获取失败")
                }
            })
        }
    },
    created() {
        this.getGoodsDesc();
    },
}
</script>
<style lang="scss" >
    .goodsdesc-container{
        h3{
            font-size: 16px;
            color: #226aff;
            text-align: center;
            margin: 15px 0;
        }
        .content{
            img{
                width: 100vw!important;
            }
        }
        
          
    }
</style>