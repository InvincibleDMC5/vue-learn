import Vue from "vue";
import Vuex from "vuex"
Vue.use(Vuex)

var car = JSON.parse(window.localStorage.getItem("shopCarInfo")) || []

const outerObj = new Vuex.Store({
    state: {//访问: this.$store.state.xxx
        //用作存储 数据
        shopCar: car,
        //购物车对象数组 {id:商品id,price:商品价格,selected:是否选中商品}
        all: false,//商品是否全部选中 
        isJump: false,//小球跳动动画是否启用
    },
    mutations: {//使用: this.$store.commit('mutations里面的方法名',唯一参数)
        //用作存储 可操作数据的方法
        //返回值为undefined 就算手动设置返回值 依然是undefind
        jump(state) {//设置小球跳动动画为开启
            state.isJump = true;
        },
        noJump(state) {//设置小球跳动动画为关闭
            state.isJump = false;
        },
        addToCar(state, infoObj) {
            //1.如果shopCar中已经有该商品,只需要更新数量
            //2.如果没有,把infoObj push 进shopCar

            var has = false;//是否找到了id相同的货物
            has = state.shopCar.some(function (v, i) {
                if (v.id === infoObj.id) {//some函数如果数组为空 不会执行 默认返回false
                    v.selectedCount += infoObj.selectedCount;
                    return true;
                }
            })
            if (!has) {//没有找到id相同的货物 直接把货物对象存入数组
                state.shopCar.push(infoObj);
            }

            window.localStorage.setItem("shopCarInfo", JSON.stringify(state.shopCar))
        },
        updateCount(state, newCountObj) {//更新商品数量
            var j = state.shopCar.some(v => {
                if (v.id === newCountObj.id) {
                    v.selectedCount = newCountObj.selectedCount;
                    return true;
                }
            })
            window.localStorage.setItem("shopCarInfo", JSON.stringify(state.shopCar));
        },
        updateSelected(state, id) {//单选
            state.shopCar.some(v => {
                if (v.id === id) {
                    v.selected = !v.selected;
                }
            })
            window.localStorage.setItem("shopCarInfo", JSON.stringify(state.shopCar));
        },
        selectedAll(state) {//全选功能
            state.all = !state.all;
            state.shopCar.forEach(v => {
                v.selected = state.all;
            })
            window.localStorage.setItem("shopCarInfo", JSON.stringify(state.shopCar));
        },
        delShop(state) {//删除选中的商品
            var slelcted_shops = state.shopCar.filter((v, i) => {
                return v.selected === false;
            })
            state.shopCar = slelcted_shops;
            window.localStorage.setItem("shopCarInfo", JSON.stringify(state.shopCar));
        }
    },
    getters: {//使用: this.$store.getters.xxx
        //用作 动态获取数据(不修改源数据)
        //有点类似于computed和filter 只要调用到的数据发生变化 就会重新计算返回新结果
        jumpStatus: function (state) {//获取是否启用动画
            return state.isJump;
        },
        totalCount: function (state) {//获取购物车商品总数
            var total = state.shopCar.reduce(function (x, y) {
                return x + y.selectedCount;
            }, 0)//计算购物车中商品数量
            return total;
        },
        totalPrice: function (state) {//获取选中商品的总价
            var total = 0;
            state.shopCar.forEach(v => {
                if (v.selected) {
                    total += v.selectedCount * v.price;
                }
            })
            return total;
        },
        shopCar: function (state) {
            return state.shopCar;
        },
        getCount(state) {//获取 id值为键名-选择商品数为键值 的对象
            var id_counts = {};
            state.shopCar.forEach(v => {
                id_counts[v.id] = v.selectedCount;
            });
            return id_counts;
        },
        getSelected(state) {//获取 id值为键名-商品是否选择为键值 的对象
            var selected = {};
            state.shopCar.forEach(v => {
                selected[v.id] = v.selected;
            })
            return selected;
        },
        getAll(state) {//获取全选按钮的状态
            return state.all
        },
        getIds(state) {//获取购物车中所有商品的id
            var ids = state.shopCar.map(function (v, i) {
                return v.id;
            });
            return ids
        }
    },

})

export default outerObj