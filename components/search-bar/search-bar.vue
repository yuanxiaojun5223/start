<template>
	<view class="search-box" @click="clickHandler">
		<view class="searhc-bar">
			<uni-icons type="search" size="16"></uni-icons>
			<text>搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"search-bar",
		data() {
			return {
				
			};
		},
		methods: {
			clickHandler() {
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss">
	.search-box {
		height: 50px;
		background-color: #ea4350;
		display: flex;
		align-items: center;
		justify-content: center;
		
		.searhc-bar {
			width: 96%;
			height: 36px;
			font-size: 12px;
			border-radius: 30px;
			background-color: #fff;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
</style>
