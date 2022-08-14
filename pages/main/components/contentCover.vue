<template>
	<view class="content-cover">
		<slot></slot>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.content-cover{
		background: #FFFFFF;
		box-shadow: 0px 6rpx 10rpx 1rpx rgba(0, 0, 0, 0.16);
		border-radius: 12rpx;
		margin-top: 24rpx;
		margin-left: 40rpx;
		margin-right: 40rpx;
		padding: 24rpx 32rpx;
	}
</style>