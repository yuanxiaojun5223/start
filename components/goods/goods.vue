<template>
	<view class="goods-item" @click="clickHandler">
		<!-- 左 -->
		<view class="avatar">
			<image class="img" :src="goods.goods_small_logo || defaultImg"></image>
		</view>
		<!-- 右 -->
		<view class="info">
			<!-- 标题 -->
			<view class="title">
				{{goods.goods_name}}
			</view>
			<view class="bottom">
				<!-- 价格 -->
				<view class="price">￥{{goods.goods_price | formatPrice}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"goods",
		props: {
			goods: {
				type: Object,
				default: () => {}
			}
		},
		data() {
			return {
				defaultImg: '/static/images/empty.png'
			};
		},
		methods: {
			clickHandler() {
				// 响应父级的点击事件
				this.$emit('click', this.goods)
			}
		},
		filters: {
			// 转换格式
			formatPrice(value) {
				return value.toFixed(2)
			}
		}
	}
</script>

<style lang="scss">
.goods-item {
		padding: 6px;
		border-bottom: 1px solid #eee;
		display: flex;

		.avatar {
			.img {
				width: 95px;
				height: 95px;
				display: block;
			}
		}

		.info {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			font-size: 12px;
			margin-left: 6px;

			.bottom {
				.price {
					font-size: 16px;
					color: #ea4350;
				}
			}
		}
	}
</style>
