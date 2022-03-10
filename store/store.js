// 1. 引入
import Vuex from 'vuex'
import Vue from 'vue'
import cart from './cart.js'

// 2. 
Vue.use(Vuex)

// 3.创建 Store
const store = new Vuex.Store({
	modules: {
		m_cart: cart
	}
})

// 4. 导出 store
export default store
