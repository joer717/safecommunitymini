<template>
	<view class="list-items">
		<image class="list-bg" src="@/static/img/examination/topic-bg.png"></image>
		<slot></slot>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.list-items{
		background: #FFFFFF;
		border-radius: 12rpx;
		position: relative;
		margin: 24rpx 40rpx;
		.list-bg{
			position: absolute;
			bottom: 0;
			right: 0;
			width: 392.5rpx;
			height: 203rpx;
		}
	}
</style>