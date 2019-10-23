<template>
    <div>
        <comment :id="msg"></comment>
    </div>
</template>
<script>
import comment from "../subcomponent/comment.vue";

export default {
    data(){
        return{
            msg:this.$route.params.id
        }
    },
    components:{
        comment
    }
}
</script>
<style lang="scss">
    
</style>