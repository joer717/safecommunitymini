/**
 * 知识文库item
 */
<template>
	
	<listItemCover>
		<view class="knowledgeDetail">
			<view class="title">
				开发安全注入攻击
			</view>
			<view class="content">
				注入攻击最为常见的攻击方式，作为开发而言必须完全避免; 本文会介绍常见的几种...
			</view>
			<view class="num">
				<view>
					2569
				</view>
				<view>
					2568
				</view>
				<view>
					2567
				</view>
			</view>
		</view>
	</listItemCover>	
</template>

<script>
	
	import listItemCover from '@/components/listItemCover.vue'
	
	export default {
		components:{
			listItemCover	
		}
	}
</script>

<style lang="scss" scoped>
		.knowledgeDetail{
			width: 606rpx;
			.title{
				font-size: 28rpx;
				font-weight: bold;
				color: #666666;
				font-family: PingFang SC-Bold, PingFang SC;
			}
			.content{
				line-height: 40rpx;
				font-size: 24rpx;
				margin-top: 24rpx;
				margin-bottom: 28rpx;
				font-family: PingFang SC-Medium, PingFang SC;
				font-weight: 500;
				color: #666666;
			}
			.num{
				display: flex;
				justify-content: space-between;
				font-size: 24rpx;
				font-family: PingFang SC-Medium, PingFang SC;
				font-weight: 500;
				color: #666666;
			}
		}
</style>