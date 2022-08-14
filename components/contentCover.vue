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
		padding: 0 40rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #FFFFFF;
		margin: auto;
	}
</style>
