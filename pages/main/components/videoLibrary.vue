<!-- 视频课程 -->
<template>
	<contentCover>
		<view class="videoLibrary"  >
			<view class="left" @click="PJump(videoItem.videoId)">
				<image class="videoImg" :src="videoItem.videoImg"></image>
			</view>
			<view class="right">
				<view class="title-box" @click="PJump(videoItem.videoId)">
					<text class="title">{{videoItem.videoName}}</text>
					<block v-if="videoItem.userLearn?true:false">
						<image class="completed-icon" src="@/static/img/common/completed.png"></image>
					</block>
				</view>
				<view class="content" @click="PJump(videoItem.videoId)">{{videoItem.introduction}}</view>
				<view class="num">
					<view>
						<image src="@/static/img/common/read.png" mode=""></image>
						{{videoItem.readNumber}}
					</view>
					<view>
						<block v-if="videoItem.userLike">
							<image @click="videoItemLike('0')" src="@/static/img/common/favour_s.png" mode=""></image>
						</block>
						<block v-else>
							<image @click="videoItemLike('1')" src="@/static/img/common/favour.png" mode=""></image>
						</block>
						{{videoItem.likeNumber}}
					</view>
					<view>
						<block v-if="videoItem.userCollect">
							<image @click="videoItemCollect('0')"  src="@/static/img/common/star_s.png" mode=""></image>
						</block>
						<block v-else>
							<image @click="videoItemCollect('1')"  src="@/static/img/common/star.png" mode=""></image>
						</block>
						{{videoItem.collectNumber}}
					</view>
				</view>
			</view>
		</view>
	</contentCover>
</template>

<script>
	import contentCover from "./contentCover.vue"
	export default {
		props: {
			videoItem: {
				type: Object,
				default: {},
			},
			index: {
				type: Number,
				default: 0,
			},
		},
		components: {
			contentCover
		},
		data() {
			return {
				
			}
		},
		methods: {
			PJump(videoId){
				
				this.$emit('jumpVideoItem',`/pages/repository/videoDetail?id=${videoId}`)
			},
			/**
			 * 
			 * 点赞
			 */
			async videoItemLike(isLike){
				let likeInfo = await this.$request(`video/video/vInfoApp/likeOrCancelLike/${this.videoItem.videoId}/${isLike}`,{
					hideloading:true
				},'PUT');
				
				if(likeInfo.data.status==200){
					this.$emit('updateVideoItem','userLike',this.index,isLike==1?true:false,'likeNumber')
				}				
			
			},
			/**
			 * 
			 * 收藏
			 */			
			async videoItemCollect(isCollect){
				
				let collectInfo = await this.$request(`video/video/vInfoApp/collectOrCancelCollect/${this.videoItem.videoId}/${isCollect}`,{
					hideloading:true
				},'PUT');
				
				if(collectInfo.data.status==200){
					this.$emit('updateVideoItem','userCollect',this.index,isCollect==1?true:false,'collectNumber')
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.videoLibrary{
		width: 100%;
		display: -webkit-flex;
		.left{
			width: 162rpx;
			height: 195rpx;
			.videoImg{
				width: 162rpx;
				height: 100%;
				border-radius: 8rpx;
			}
		}
		.right{
			flex: 1;
			width: 0;
			margin-left: 24rpx;
			.title-box{
				display: -webkit-flex;
				align-items: center;
				justify-content: space-between;
				.title{
					font-size: 28rpx;
					font-family: PingFang SC-Bold, PingFang SC;
					font-weight: bold;
					color: #666666;
				}
				.completed-icon{
					width: 80rpx;
					height: 40rpx;
					margin-right: -40rpx;
				}
			}
			.content {
				height: 74rpx;
				line-height: 40rpx;
				font-size: 24rpx;
				margin-top: 24rpx;
				margin-bottom: 24rpx;
				font-family: PingFang SC-Medium, PingFang SC;
				font-weight: 500;
				color: #666666;
				
				text-overflow: -o-ellipsis-lastline;
				overflow: hidden;				//溢出内容隐藏
				text-overflow: ellipsis;		//文本溢出部分用省略号表示
				display: -webkit-box;			//特别显示模式
				-webkit-line-clamp: 2;			//行数
				line-clamp: 2;					
				-webkit-box-orient: vertical;	//盒子中内容竖直排列
				
			}
			.num {
				display: flex;
				justify-content: space-between;
				font-size: 24rpx;
				font-family: PingFang SC-Medium, PingFang SC;
				font-weight: 500;
				color: #666666;
				view {
					display: flex;
					align-items: center;
					justify-content: flex-start;
					image {
						width: 28rpx;
						height: 25rpx;
						margin-right: 15rpx;
					}
				}
			}
		}
	}
</style>