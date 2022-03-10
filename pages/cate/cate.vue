<template>
	<view>
		<!-- 搜索栏 -->
		<search-bar @click="goSearch"></search-bar>
		<!-- 
			1. 获取数据
			2. 渲染页面
			3. 功能 - 独立滚动、点击左侧切换高亮样式一级切换右侧内容、点击右侧可以跳转到商品列表
		-->
		<view class="cate-box">
			<!-- 左 -->
			<scroll-view class="left" scroll-y>
				<view @click="leftChange(item.children, index)" :class="['lv1-item', active === index ? 'active' : '']" v-for="(item, index) in cateList" :key="index">
					{{item.cat_name}}
				</view>
			</scroll-view>
			<!-- 右 -->
			<scroll-view :scroll-top="scrollTop" class="right" scroll-y>
				<view class="cate-item">
					<view class="lv2-item" v-for="(item, index) in cate2List" :key="index">
						<!-- 标题 -->
						<view class="title">/ {{item.cat_name}} /</view>
						<!-- 内容 -->
						<view class="content">
							<view @click="goList(e.cat_id)" class="lv3-item" v-for="(e, i) in item.children" :key="i">
								<image class="lv3-img" :src="e.cat_icon"></image>
								<text>{{e.cat_name}}</text>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cateList: [],
				cate2List: [],
				// 高亮索引
				active: 0,
				// 右侧滚动条位置
				scrollTop: 0
			};
		},
		onLoad() {
			this.getCateList()
			// const win = uni.getSystemInfoSync()
			// console.log(win)
		},
		methods: {
			// 跳转到商品搜索页面
			goSearch() {
				uni.navigateTo({
					url: '/subpkg/search/search'
				})
			},
			// 跳转到商品列表
			goList(id) {
				uni.navigateTo({
					url: '/subpkg/goods-list/goods-list?cid=' + id
				})
			},
			// 点击左侧一级分类
			leftChange(arr, index) {
				// 切换高亮样式
				this.active = index
				// 切换右侧内容
				this.cate2List = arr
				// 重置右侧滚动条位置
				this.scrollTop = this.scrollTop === 0 ? .1 : 0
			},
			// 获取分类数据
			async getCateList() {
				const { data: { message, meta } } = await uni.$http.get('/api/public/v1/categories')
				if(meta.status !== 200) return uni.$showMsg()
				this.cateList = message
				this.cate2List = message[0].children
			}
		}
	}
</script>

<style lang="scss">
	.cate-box {
		display: flex;
		.left {
			flex: 0 0 90px;
			height: calc(100vh - 50px);
			
			.lv1-item {
				line-height: 60px;
				font-size: 12px;
				text-align: center;
				background-color: #f7f7f7;
				
				&.active {
					background-color: #fff;
					position: relative;
					&::after {
						position: absolute;
						left: 0;
						top: 50%;
						transform: translateY(-50%);
						content: '';
						width: 3px;
						height: 50%;
						background-color: #ea4350;
					}
				}
			}
			
			
		}
		.right {
			flex: 1;
			height: calc(100vh - 50px);
			
			.cate-item {
				.lv2-item {
					.title {
						text-align: center;
						font-weight: bold;
						font-size: 12px;
						line-height: 40px;
					}
					.content {
						display: flex;
						flex-wrap: wrap;
						
						.lv3-item {
							width: calc(100% / 3);
							display: flex;
							flex-direction: column;
							align-items: center;
							justify-content: center;
							font-size: 12px;
							margin-bottom: 6px;
							.lv3-img {
								width: 60px;
								height: 60px;
							}
						}
					}
				}
			}
		}
	}
</style>
