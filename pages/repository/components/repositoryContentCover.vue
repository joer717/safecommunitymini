/**
* 通用样式
*/
<template>
	<view class="repositoryContentCover" :style="{width: isSearch?'100%':'528rpx'}">
		<slot></slot>
	</view>
</template>

<script>
	export default{
		props:{
			isSearch:{
				type:Boolean,
				default:false
			}
		}
	} 
</script>

<style lang="scss" scoped>
	.repositoryContentCover {
		//width: 528rpx;
		padding: 24rpx 0;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #FFFFFF;
		box-shadow: 0rpx 6rpx 10rpx 1rpx rgba(0, 0, 0, 0.16);
		border-radius: 12rpx 12rpx 12rpx 12rpx;
		margin-bottom: 24rpx;
	}
</style>
