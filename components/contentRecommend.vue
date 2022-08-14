/**
* 热门推荐
*/
<template>
	<listItemCover>
		<view class="recommend-item">
			<view class="recommend-item-in">
				<view class="recommend-item-in-left">
					<image src="https://www.liuyan.store/hdfs/userFile/download/wechat&img&left.png" mode="">
					</image>
				</view>
				<view class="recommend-item-in-right">
					<view class="fs28">
						{{recommendData.title}}
					</view>
					<view class="fs24">
						{{recommendData.context}}
					</view>
				</view>
			</view>
		</view>
	</listItemCover>
</template>

<script>
	import listItemCover from '@/components/contentCover.vue'

	export default {
		components: {
			listItemCover
		},
		data() {
			return {
				recommendData: {
					title: '白帽网络安全渗透测试训练营',
					context: '课程内容根据开源网安在网络安全、互联网、金融、通信等行业的软...',
					time: '2022-07-12'
				}
			}
		},
		methods: {

		}
	}
</script>

<style scoped lang="scss">
	.recommend-item {
		background-color: #fff;
		padding-top: 30rpx;
		display: flex;
		justify-content: center;
		border-radius: 12px 12px 12px 12px;

		.recommend-item-in {
			width: 670rpx;
			display: flex;
			justify-content: space-between;

			.recommend-item-in-left {
				image {
					width: 114rpx;
					height: 138rpx;
				}
			}

			.recommend-item-in-right {
				width: 532rpx;

				.fs28 {
					font-size: 28rpx;
				}

				.fs24 {
					margin-top: 24rpx;
					margin-bottom: 34rpx;
					font-size: 24rpx;
					color: rgba(102, 102, 102, 1);
				}

			}
		}
	}
</style>
