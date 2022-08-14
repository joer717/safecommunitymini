/**
* 单元训练
*/
<template>
	<repositoryContentCover>
		<view class="modularTraining">
			<view class="word">
				网络安全单元专项训练
			</view>
			<view class="arrow">
				网络
			</view>
		</view>

	</repositoryContentCover>
</template>

<script>
	import repositoryContentCover from './repositoryContentCover.vue'

	export default {
		components: {
			repositoryContentCover
		}
	}
</script>

<style lang="scss" scoped>
	.modularTraining {
		width: 464rpx;
		display: flex;
		justify-content: space-between;

		.word {
			font-size: 32rpx;
			font-family: PingFang SC-Medium, PingFang SC;
			font-weight: 500;
			color: #333333;
		}

		.arrow {
			font-size: 32rpx;
			font-family: PingFang SC-Medium, PingFang SC;
			font-weight: 500;
			color: #333333;
		}
	}
</style>
