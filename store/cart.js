export default {
	namespaced: true,
	state: {
		cart: JSON.parse(uni.getStorageSync('cart') || '[]')
	},
	mutations: {
		// 添加商品到购物车
		updateAddToCart(state, goods) {
			// 判断购物车中是否有该商品
			const findRes = state.cart.find(e => e.goods_id === goods.goods_id)
			if(!!findRes) {
				// 如果有，就让商品数量加 1
				findRes.goods_count += 1
			} else {
				// 如果没有，就 push
				state.cart.push(goods)
			}
			// 持久化存储
			this.commit('m_cart/saveToStorage')
		},
		// 持久化存储
		saveToStorage(state) {
			uni.setStorageSync('cart', JSON.stringify(state.cart))
		}
	},
	getters: {
		// 购物车商品总数量
		total(state) {
			let sum = 0
			state.cart.forEach(e => {
				sum += e.goods_count
			})
			return sum
		}
	}
}
