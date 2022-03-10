<template>
	<view class="detail-box" v-if="Object.keys(goods).length !== 0">
		<!-- 
			商品详情
			1. 获取数据，根据跳转携带的 goods_id
			2. 渲染结构样式
			3. 功能
		-->
		<!-- 轮播图 -->
		<swiper class="swiper" circular :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item, index) in goods.pics" :key="index">
				<image @click="preview(index)" class="swiper-img" :src="item.pics_big"></image>
			</swiper-item>
		</swiper>
		<!-- 商品信息 -->
		<view class="goods-info">
			<view class="price">
				￥{{goods.goods_price}}
			</view>
			<view class="mid">
				<view class="name">
					{{goods.goods_name}}
				</view>
				<view class="favi">
					<uni-icons color="gray" size="24" type="star"></uni-icons>
					<text class="text">收藏</text>
				</view>
			</view>
			<view class="yf">
				快递费: 免运费
			</view>
		</view>
		<!-- 商品详情 -->
		<!-- <view v-html="goods.goods_introduce"></view> -->
		<rich-text :nodes="goodsIntroduce"></rich-text>
		<!-- 商品导航 -->
		<view class="goods-nav-box">
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
				@buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
	import { mapMutations, mapGetters } from 'vuex'
	
	export default {
		data() {
			return {
				goods: {},
				options: [{
					icon: 'shop',
					text: '店铺',
				}, {
					icon: 'cart',
					text: '购物车',
					info: 2
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			};
		},
		computed: {
			...mapGetters('m_cart', ['total']),
			goodsIntroduce() {
				return this.goods.goods_introduce?.replace(/<img/g, '<img style="display:block"')
			}
		},
		watch: {
			total: {
				handler(newTotal) {
					this.options[1].info = newTotal
				},
				immediate: true
			}
		},
		onLoad(options) {
			this.getGoods(options.goods_id)
		},
		methods: {
			...mapMutations('m_cart', ['updateAddToCart']),
			// 点击右侧按钮
			buttonClick(e) {
				if(e.content.text === '加入购物车') {
					// 加入购物车
					// 商品数据
					const goods = {
						goods_id: this.goods.goods_id,
						goods_name: this.goods.goods_name,
						goods_small_logo: this.goods.goods_small_logo,
						goods_price: this.goods.goods_price,
						goods_count: 1,
						goods_state: true
					}
					this.updateAddToCart(goods)
				}
			},
			// 点击左侧图标
			onClick(e) {
				// 购物车
				if(e.content.text === '购物车') {
					// 跳转
					uni.switchTab({
						url: '/pages/cart/cart'
					})
				}
			},
			// 预览
			preview(index) {
				uni.previewImage({
					// 想看第几个
					current: index,
					// 所有轮播图的路径数组
					urls: this.goods.pics.map(e => e.pics_big)
				})
			},
			// 获取商品数据
			async getGoods(goods_id) {
				const {
					data: {
						message,
						meta
					}
				} = await uni.$http.get('/api/public/v1/goods/detail', {
					goods_id
				})
				if (meta.status !== 200) return uni.$showMsg()
				this.goods = message
			}
		}
	}
</script>

<style lang="scss">
	img {
		display: block;
	}

	.swiper {
		height: 750rpx;

		.swiper-img {
			width: 100%;
			height: 100%;
		}
	}

	.goods-info {
		margin: 6px;

		.price {
			font-size: 20px;
			color: #ea4350;
		}

		.mid {
			display: flex;
			justify-content: space-between;
			font-size: 12px;
			margin: 6px 0;

			.name {
				flex: 1;
			}

			.favi {
				flex: 0 0 80px;
				border-left: 1px solid #eee;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				color: gray;

				.text {
					font-size: 12px;
				}
			}
		}

		.yf {
			font-size: 10px;
			color: gray;
		}
	}
	
	.detail-box {
		padding-bottom: 50px;
	}
	
	.goods-nav-box {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
	}
</style>
