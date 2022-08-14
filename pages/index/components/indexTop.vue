/**
*
*/
<template>
	<view class="index-box">
		<swiper class="swipe" :circular="circular" :current="swipeActiveIndex">
			<swiper-item>
				<view class="swipe-item">
					<image src="https://www.liuyan.store/hdfs/userFile/download/wechat&img&top.png"></image>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swipe-item">测试22</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>

</script>

<style lang="scss" scoped>
	.index-box {
		width: 670rpx;
		margin-top: 30rpx;
	}

	.swipe {
		width: 100%;
		height: 328rpx;
		.swipe-item {
			height: 328rpx;
			image {
				width: 100%;
				height: 328rpx;
			}
		}
	}
</style>
