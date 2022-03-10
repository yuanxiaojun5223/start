// 参数1: 回调
// 参数2: 时间
export function debounce(callback, time) {
	let timer = null
	
	return function() {
		const args = arguments
		const that = this
		// 防抖
		// 清空上一次的延时器
		clearTimeout(timer)
		// 创建当前新的延时器
		timer = setTimeout(function() {
			callback && callback.apply(that, args)
		}, time)
	}
}
