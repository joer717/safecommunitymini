<template>
	<view class="indexOp">
		<view>
			<view @click="jump('/pages/repository/index?currentPage=Knowledge')">
				<image src="@/static/img/index/1.png" mode=""></image>
			</view>
			<text>知识文库</text>
		</view>
		<view>
			<view @click="jump('/pages/repository/videoIndex?currentPage=videoCourse')">
				<image src="@/static/img/index/2.png" mode=""></image>
			</view>
			<text>视频课程</text>
		</view>
		<view @click="jump('/pages/unitTraining/index')">
			<view class="">
				<image src="@/static/img/index/3.png" mode=""></image>
			</view>
			<text>单元训练</text>
		</view>
		<view @click="jump('/pages/examination/index')">
			<view class="">
				<image src="@/static/img/index/4.png" mode=""></image>
			</view>
			<text>考试中心</text>
		</view>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				
			}
		},
		methods: {
			jump(url) {
				console.log("===跳转==")
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style lang="scss">
	.indexOp{
		width: 670rpx;
		display: flex;
		justify-content: space-around;
		padding-bottom: 42rpx;
		padding-top: 40rpx;
		font-size: 26rpx;
		font-family: PingFang SC-Medium, PingFang SC;
		font-weight: 500;
		color: #333333;		
		background: #FFFFFF;
		box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
		border-bottom-left-radius: 12rpx;
		border-bottom-right-radius: 12rpx;
		image{
			width: 94rpx;
			height: 94rpx;
		}

	}
</style>