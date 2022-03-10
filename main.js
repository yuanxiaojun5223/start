import Vue from 'vue'
import App from './App'

// 1. 引入 - store
import store from './store/store.js'

// 1. 引入
import {
	$http
} from '@escook/request-miniprogram'
// 2. 给 $http 挂载 beforeRequest 和 afterRequest 两个函数
$http.beforeRequest = function() {
	// 打开弹窗
	uni.showLoading({
		title: '加载中...'
	})
}
$http.afterRequest = function() {
	// 关闭弹窗
	uni.hideLoading()
}
// 3. 配置请求基础路径
// $http.baseUrl = 'https://www.uinav.com'
$http.baseUrl = 'https://api-hmugo-web.itheima.net'
// 4. 将 $http 挂载到全局
uni.$http = $http

// 封装弹窗方法
uni.$showMsg = function(title = '加载失败') {
	uni.showToast({
		icon: 'none',
		title
	})
}

Vue.config.productionTip = false

App.mpType = 'app'
const app = new Vue({
	...App,
	store
})
app.$mount()
