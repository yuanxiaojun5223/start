<template>
	<view>
		<!-- 
			搜索
			1. 渲染样式
			2. 实现搜索
			3. 搜索历史
		-->
		<!-- 搜索栏 -->
		<view class="search-box">
			<uni-search-bar cancelButton="none" placeholder="搜索" radius="30" @input="input"></uni-search-bar>
		</view>
		<!-- v-if 搜索历史 -->
		<view v-if="kw === ''" class="history">
			<!-- 标题 -->
			<view class="title">
				<text>搜索历史</text>
				<uni-icons @click="removeHistory" size="20" type="trash" ></uni-icons>
			</view>
			<!-- 内容 -->
			<view class="content">
				<view class="tag-item" v-for="(item, index) in reHistory" :key="index">
					<uni-tag @click="goList(item)" type="warning" :text="item"></uni-tag>
				</view>
			</view>
		</view>
		<!-- v-else 搜索结果 -->
		<view v-else class="result">
			<view class="result-item" v-for="(item, index) in searchList" :key="index" @click="goDetail(item.goods_id)">
				<text class="text">{{item.goods_name}}</text>
				<uni-icons type="arrowright"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script>
	import { debounce } from '../../utils/tools.js'
	
	export default {
		data() {
			return {
				kw: '',
				searchList: [],
				history: JSON.parse(uni.getStorageSync('history') || '[]')
			};
		},
		computed: {
			reHistory() {
				return [...this.history].reverse()
			}
		},
		onLoad() {
			this.searchDebounce = debounce(this.search, 500)
		},
		methods: {
			// 跳转到商品详情
			goDetail(id) {
				uni.navigateTo({
					url: '/subpkg/goods-detail/goods-detail?goods_id=' + id
				})
			},
			// 跳转到商品列表
			goList(value) {
				uni.navigateTo({
					url: '/subpkg/goods-list/goods-list?query='+value
				})
			}, 
			// 清空搜索历史
			removeHistory() {
				// 询问用户是否清空
				uni.showModal({
					title: '提示',
					content: '是否清空搜索历史?',
					success: e => {
						if(e.confirm) {
							this.history = []
							uni.setStorageSync('history', '[]')
						}
					}
				})
			},
			// 保存搜索历史
			saveToHistory() {
				// 保证顺序
				// 去重
				const set = new Set(this.history)
				set.delete(this.kw)
				set.add(this.kw)
				this.history = Array.from(set)
				// 持久化存储
				uni.setStorageSync('history', JSON.stringify(this.history))
			},
			// 搜索输入事件
			input(value) {
				// 把用户输入去掉空格
				value = value.trim()
				// 根据用户输入获取搜索结果
				this.kw = value
				// 判断用户输入是否为空 - 如果为空就什么都不做
				if(value === '') return this.searchList = []
				// 防抖
				this.searchDebounce()
			},
			async search() {
				// 发起请求
				const { data: { message, meta } } = await uni.$http.get('/api/public/v1/goods/qsearch', {
					query: this.kw
				})
				if(meta.status !== 200) return uni.$showMsg()
				this.searchList = message
				// 保存历史
				this.saveToHistory()
			}
		}
	}
</script>

<style lang="scss">
	.uni-searchbar {
		background-color: #ea4350;
	}

	.search-box {
		position: sticky;
		left: 0;
		top: 0;
	}

	.history {
		.title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 6px;
			font-size: 12px;
			height: 40px;
			border-bottom: 1px solid #eee;
			box-sizing: border-box;
		}

		.content {
			display: flex;

			.tag-item {
				margin: 6px 0 0 6px;
			}
		}
	}
	
	.result {
		.result-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 6px;
			font-size: 12px;
			height: 40px;
			border-bottom: 1px solid #eee;
			
			.text {
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
	}
</style>
-->
