<template>
	<view>
		<!-- 
			商品列表
			1. 获取数据
			2. 渲染样式
			3. 功能 - 下拉刷新，上拉加载，点击跳转
			
			下拉刷新:
				1. 在配置文件开启页面下拉刷新
				2. 在 onPullDownRefresh
				3. 关闭下拉刷新样式
			上拉加载:
				1. 监听上拉触底事件，onReachBottom
				2. 写逻辑
		-->
		<block v-for="(item, index) in goodsList" :key="index">
			<goods @click="goDetail" :goods="item"></goods>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				params: {
					pagenum: 1,
					pagesize: 10,
					cid: '',
					query: ''
				},
				goodsList: [],
				total: 0,
				isLoading: false
			};
		},
		onLoad(options) {
			this.params.cid = options.cid || ''
			this.params.query = options.query || ''
			this.getGoodsList()
		},
		onPullDownRefresh() {
			// 下拉刷新
			// 清空原数据
			this.goodsList = []
			// 重置 pagenum 为1
			this.params.pagenum = 1
			// 重新请求
			this.getGoodsList(uni.stopPullDownRefresh)
		},
		onReachBottom() {
			// 上拉加载
			// 边界处理
			// 判断当前获取到的数据是否已经是全部数据
			// 当前数据总量 - pagenum * pagesize
			// 服务器全部数据总量 - total
			if(this.params.pagenum * this.params.pagesize >= this.total) return uni.$showMsg('我也是有底线的~~')
			// 判断当前是否正在请求中，如果正在请求就什么都不做 - 节流
			if(this.isLoading) return
			// pagenum + 1
			this.params.pagenum += 1
			// 获取数据
			this.getGoodsList()
		},
		methods: {
			// 跳转到商品详情
			goDetail(goods) {
				uni.navigateTo({
					url: '/subpkg/goods-detail/goods-detail?goods_id=' + goods.goods_id
				})
			},
			// 获取商品列表数据
			async getGoodsList(fn) {
				// isLoading true
				this.isLoading = true
				const {
					data: {
						message,
						meta
					}
				} = await uni.$http.get('/api/public/v1/goods/search', this.params)
				
				// isLoading false
				this.isLoading = false
				
				// 关闭下拉刷新样式
				fn && fn()
				
				if (meta.status !== 200) return uni.$showMsg()
				this.goodsList = [...this.goodsList, ...message.goods]
				this.total = message.total
			}
		}
	}
</script>

<style lang="scss">
	
</style>
