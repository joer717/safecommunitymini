/**
* 评价详情
*/
<template>
	<view class="replyItem">
		<!-- <image class="head" src="@/static/img/bottom/index.png" mode=""></image> -->
		<view class="content">
			<view class="top" @click="reply">
				<view class="info">
						<view>{{replyItem.createdUserName}}</view>
						<span style="padding: 0 8rpx;">&nbsp;回复&nbsp;</span>
						<view>{{replyItem.replyUserName}}</view>：
				</view>
				<view class="bottom">
					{{replyItem.content}}
				</view>
				<view class="other">
					<view class="time">
						{{replyItem.gmtCreated}}
					</view>
					<view class="">
						<view class="">
							<image v-if="replyItem.userLike==false" src="@/static/img/videodetail/praise.png" mode="" @click.stop="videoLike('1')"></image>
							<image v-else src="@/static/img/videodetail/praise_blue.png" mode="" @click.stop="videoLike('0')"></image>
							{{replyItem.likeNumber}}
						</view>
					</view>
				</view>
				
			</view>
						
		</view>

	</view>
</template>

<script>
	export default {
		props: {
			replyItem: {
				type: Object,
				default: {},
			},
			index: {
				type: Number,
				default: 0,
			},
		},
		components: {
			
		},
		mounted() {
			
		},
		methods:{
			reply(){
				this.$emit('replyFocus',{replyUserId:this.replyItem.createdUserId,createdUserName:this.replyItem.createdUserName})
			},
			/**
			 * 
			 * 点赞
			 */
			async videoLike(isLike){
				let likeInfo = await this.$request(`video/video/vInfoApp/commentlikeOrCancelLike/${this.replyItem.commentId}/${isLike}`,{
					hideloading:true
				},'PUT');
				
				if(likeInfo.data.status==200){
					console.log(this.index)
					this.$emit('updateReplyLike',this.index,isLike)
				}				
			
			},
		}
	}
</script>

<style scoped lang="scss">
	.replyItem {
		display: flex;
		justify-content: space-between;
		font-family: PingFang SC-Medium, PingFang SC;
		font-weight: 500;
		margin: auto;
		image.head {
			width: 60rpx;
			height: 60rpx;
			border-radius: 100rpx;
			overflow: hidden;
		}	
		.content{
			width: 590rpx;
			.top {
				.info{
					font-size: 28rpx;
					color: #333333;				
					float: left;
					display: flex;
					view{
						color: #3B8FB0;
					}
				}
				.time{
					font-size: 22rpx;
					font-family: PingFang SC-Medium, PingFang SC;
					color: #999999;
				}
			
			
			}
			.bottom{
				font-size: 28rpx;
				color: #333333;
				margin: 16rpx 0;
				word-wrap: break-word;
				word-break:break-all;
			}
			.other{
				image{
					width: 24rpx;
					height: 24rpx;
					margin-left: 24rpx;
					margin-right: 8rpx;
				}
				.time{
					flex: 1;
				}
				color: #999;
				display: flex;
				justify-content: flex-end;
				view{
					display: flex;
					align-items: center;
					font-size: 22rpx;
				}
			}
		}

	}
</style>
