/**
* 评价详情
*/
<template>
	<view class="evaluateItem">
		<image class="head" src="@/static/img/bottom/index.png" mode=""></image>
		<view class="content">
			<view class="top" @click="reply">
				<view class="info">
						{{evitem.createdUserName}}
				</view>
				<view class="time">
					{{evitem.gmtCreated}}
				</view>
				<view class="bottom">
					{{evitem.content}}
				</view>
				<view class="other">
					<view class="">
						<view class="">
							<image v-if="evitem.userLike==false" src="@/static/img/videodetail/praise.png" mode="" @click.stop="videoLike('1')"></image>
							<image v-else src="@/static/img/videodetail/praise_blue.png" mode="" @click.stop="videoLike('0')"></image>
							{{evitem.likeNumber}}
						</view>
						<view class="">
							<image src="@/static/img/videodetail/remark.png" mode=""></image>
							{{evitem.vos.length}}
						</view>
					</view>
				</view>
				
			</view>
			<view class="greyContent" v-if="evitem.vos.length>0">
				<block v-for="(replyItem,replyIndex) in evitem.vos" :key="replyItem">
						<replyItem :index='replyIndex' :replyItem='replyItem' @updateReplyLike="updateReplyLike" @replyFocus="replyFocus"></replyItem>
				</block>
			</view>			
		</view>

	</view>
</template>

<script>
	import replyItem from '@/pages/repository/components/videoDetail/replyItem.vue';
	export default {
		props: {
			evitem: {
				type: Object,
				default: {},
			},
			index: {
				type: Number,
				default: 0,
			},
		},
		components: {
			replyItem,
		},
		mounted() {
			
		},
		methods:{
			reply(){
				this.$emit('replyFocus',{commentId:this.evitem.commentId,replyUserId:this.evitem.createdUserId,createdUserName:this.evitem.createdUserName})
			},
			replyFocus(data){
				this.$emit('replyFocus',{commentId:this.evitem.commentId,replyUserId:data.replyUserId,createdUserName:data.createdUserName})
			},
			/**
			 * 
			 * 点赞
			 */
			async videoLike(isLike){
				let likeInfo = await this.$request(`video/video/vInfoApp/commentlikeOrCancelLike/${this.evitem.commentId}/${isLike}`,{
					hideloading:true
				},'PUT');
				
				if(likeInfo.data.status==200){
					this.$emit('updateVideoLike',this.index,isLike)
				}				
			
			},
			updateReplyLike(index,isLike){
				this.$emit('updateReplyLike',this.index,index,isLike)
			},
		}
	}
</script>

<style scoped lang="scss">
	.evaluateItem {
		width: 670rpx;
		padding-top: 28rpx;
		padding-bottom: 25rpx; 
		display: flex;
		justify-content: space-between;
		font-family: PingFang SC-Medium, PingFang SC;
		font-weight: 500;
		margin: auto;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
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
					font-size: 24rpx;
					color: #333333;				
				
				}
				.time{
					font-size: 22rpx;
					font-family: PingFang SC-Medium, PingFang SC;
					color: #999999;
				}
			
			
			}
			.greyContent{
				background: #F2F2F2;
				border-radius: 4px;
				padding: 5rpx 20rpx 20rpx 20rpx;
				margin-top: 16rpx;
			}
			.bottom{
				font-size: 28rpx;
				color: #333333;
				margin: 16rpx 0;
			}
			.other{
				image{
					width: 24rpx;
					height: 24rpx;
					margin-right: 8rpx;
				}
				.time{
					flex: 1;
				}
				color: #999;
				display: flex;
				view{
					display: flex;
					align-items: center;
					font-size: 22rpx;
				}
				>view view{
					margin-right: 25rpx;
				}
			}
		}

	}
</style>
