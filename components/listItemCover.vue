/**
* 列表通用样式
*/
<template>
	<view class="listItemCover">
		<slot></slot>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.listItemCover {
		width: 670rpx;
		padding: 24rpx 0;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #FFFFFF;
		box-shadow: 0rpx 6rpx 10rpx 1rpx rgba(0, 0, 0, 0.16);
		border-radius: 12rpx 12rpx 12rpx 12rpx;
		margin: auto;
		margin-bottom: 24rpx;
	}
</style>
