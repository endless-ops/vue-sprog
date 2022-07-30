import Vue from 'vue';
import Vuex from 'vuex';
import Counter from "./modules/counter"; // 引入加数模块

Vue.use(Vuex) // 安装插件

export default new Vuex.Store ({
  modules : {
    Counter
  }
})
