/**
 * 内容info组件
 */
<template>
	<listItemCover>
		<view class="content-info">
			<view class="content-info-top">
				<image class="content-info-top-heads" src="@/static/img/common/read.png" mode=""></image>
				<view class="content-info-top-info">
					<view class="name">
						机器未来
					</view>
					<view class="mark">
						安全领域优质创作者
					</view>					
				</view>
				<view class="attention">
					关注
				</view>
			</view>		
			<view class="content-info-bottom">
					写BUG，改BUG，写BUG，改BUG...无限循环...面向BUG的编程...
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
	.content-info{
		width: 670rpx;
		font-family: PingFang SC-Medium, PingFang SC;
		font-weight: 500;
		.content-info-top{
			display: flex;
			justify-content: start;
			padding-top: 24rpx;
			padding-bottom: 13rpx;
			position: relative;
			.content-info-top-heads{
				width: 72rpx;
				height: 72rpx;
				border-radius: 500rpx;
				margin-right: 15rpx;
			}		
			.content-info-top-info{
				font-size: 24rpx;
				.name{
					line-height: 48rpx;
					color: #333333;
				}
				.mark{
					color: #999999;
				}
			}
		}
		.content-info-bottom{
			font-size: 28rpx;
			color: #333333;
			line-height: 44rpx;
			padding-bottom: 20rpx;
		}
		.attention{
			position: absolute;
			right: 0;
			top: 30%;
			width: 102rpx;
			line-height: 50rpx;
			font-size: 24rpx;
			text-align: center;
			border-radius: 25rpx;
			color: rgba(216, 216, 216, 1);
			border: 1px solid #D8D8D8;

		}
	}
</style>