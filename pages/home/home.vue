<template>
	<view>
		<!-- 搜索栏 -->
		<view class="sticky">
			<search-bar @click="goSearch"></search-bar>
		</view>
		<!-- 
			轮播图
			1. 获取数据
			2. 渲染样式 - uni-ui组件库，小程序默认组件
			3. 实现功能 - 点击跳转到商品详情
		-->
		<swiper class="swiper-box" circular :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item, index) in swiperList" :key="index">
				<image @click="goDetail(item.goods_id)" class="swiper-img" :src="item.image_src"></image>
			</swiper-item>
		</swiper>
		<!-- 
			分类导航
			1. 获取数据
			2. 渲染样式
			3. 实现功能 - 点击分类按钮会跳转到分类页面
		-->
		<view class="cate-list">
			<image @click="goCate(item.name)" mode="widthFix" v-for="(item, index) in cateList" :key="index" class="cate-item" :src="item.image_src"></image>
		</view>
		<!-- 
			楼层
			1. 获取数据
			2. 渲染样式
			3. 实现功能 - 点击图片跳转到商品列表
		-->
		<view class="floor-list">
			<!-- 楼层 -->
			<view class="floor-item" v-for="(item, index) in floorList" :key="index">
				<!-- 标题 -->
				<view class="floor-title">
					<image mode="widthFix" class="floor-title-img" :src="item.floor_title.image_src"></image>
				</view>
				<!-- 内容 -->
				<view class="floor-content">
					<!-- 左 -->
					<view class="left">
						<image @click="goList(item.product_list[0].navigator_url)" :style="{ width: item.product_list[0].image_width + 'rpx' }" :src="item.product_list[0].image_src" mode="widthFix"></image>
					</view>
					<!-- 右 -->
					<view class="right">
						<image @click="goList(e.navigator_url)" :style="{ width: e.image_width + 'rpx' }" :key="i" v-for="(e, i) in item.product_list" v-if="i !== 0" :src="e.image_src" mode="widthFix"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList: [],
				cateList: [],
				floorList: []
			};
		},
		onLoad(options) {
			this.getSwiperList()
			this.getCateList()
			this.getFloorList()
		},
		methods: {
			// 跳转到商品搜索页面
			goSearch() {
				uni.navigateTo({
					url: '/subpkg/search/search'
				})
			},
			// 跳转到商品列表页面
			goList(url) {
				// /pages/goods_list?query=服饰
				const param = url.split('?')[1]
				uni.navigateTo({
					url: '/subpkg/goods-list/goods-list?' + param
				})
			},
			// 跳转到分类页面
			goCate(name) {
				if(name !== '分类') return
				uni.switchTab({
					url: '/pages/cate/cate'
				})
			},
			// 跳转到商品详情页面
			goDetail(id) {
				uni.navigateTo({
					url: '/subpkg/goods-detail/goods-detail?goods_id=' + id
				})
			},
			// 获取楼层数据
			async getFloorList() {
				const { data: { message, meta } } = await uni.$http.get('/api/public/v1/home/floordata')
				// 判断请求成功
				if(meta.status !== 200) return uni.$showMsg()
				this.floorList = message
			},
			// 获取分类导航数据
			async getCateList() {
				const { data: { message, meta } } = await uni.$http.get('/api/public/v1/home/catitems')
				// 判断请求成功
				if(meta.status !== 200) return uni.$showMsg()
				this.cateList = message
			},
			// 获取轮播图数据
			async getSwiperList() {
				const { data: { message, meta } } = await uni.$http.get('/api/public/v1/home/swiperdata')
				// 判断请求成功
				if(meta.status !== 200) return uni.$showMsg()
				this.swiperList = message
			}
		}
	}
</script>

<style lang="scss">
	.sticky {
		position: sticky;
		left: 0;
		top: 0;
		z-index: 999;
	}
	
	.swiper-box {
		width: 100%;
		height: 340rpx;
		
		.swiper-img {
			width: 100%;
			height: 100%;
		}
	}
	
	.cate-list {
		margin: 6px 0;
		display: flex;
		justify-content: space-around;
		
		.cate-item {
			width: 128rpx;
		}
	}
	
	.floor-list {
		.floor-item {
			margin-bottom: 6px;
			.floor-title {
				.floor-title-img {
					width: 100%;
				}
			}
			.floor-content {
				display: flex;
				padding: 0 6px;
				.right {
					margin-left: 6px;
					display: flex;
					flex-wrap: wrap;
					justify-content: space-between;
				}
			}
		}
	}
</style>
