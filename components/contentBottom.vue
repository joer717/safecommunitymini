/**
 * 内容底部组件
 */
<template>
	<listItemCover>
		<view class="content-bottom">
			<view class="content-bottom-item">
				<image class="icon" src="@/static/img/common/read.png" mode=""></image>
				2569
			</view>
			<view class="content-bottom-item">
				<image class="icon" src="@/static/img/common/favour_s.png" mode=""></image>
				2560
			</view>
			<view class="content-bottom-item">
				<image class="icon" src="@/static/img/common/star.png" mode=""></image>
				2561
			</view>				
		</view>
	</listItemCover>
</template>

<script>
	import listItemCover from './contentCover.vue'
	export default {
		components: {
			listItemCover
		},		
		data() {
			return {
				tabIndex: 0,
				navtop: 0
			}
		},
		mounted() {
			
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.content-bottom{
		width: 100%;
		display: flex;
		justify-content: space-between;
		// border-bottom: 1rpx solid rgba(0, 0, 0, 0.1000);
		.content-bottom-item{
			font-size: 24rpx;
			line-height: 80rpx;
			image{
				width: 28rpx;
				height: 27rpx;	
				margin-right:5rpx ;
			}
		}
	}
</style>