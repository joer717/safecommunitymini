/**
* 视频课程
*/
<template>

	<repositoryContentCover :isSearch="isSearch">
		<view class="developmentSecurity" :style="{width: isSearch?'100%':'468rpx'}">
			<!-- <image  @click="PJump(videoItem.videoId)" class="showimg" src="@/static/img/test/top.png"></image> -->
			<image  @click="videoRead(videoItem.videoId)" :style="{width: isSearch?'100%':'468rpx'}" class="showimg" mode='aspectFill' :src="videoItem.videoImg"></image>
			<view class="title">
				{{videoItem.videoName}}
			</view>
			<view class="content">
				{{videoItem.videoDescribe}}
			</view>
			<view class="num">
				<view>
					<image src="@/static/img/common/read.png" mode=""></image>
					{{videoItem.readNumber}}
				</view>
				<view>
					<block v-if="videoItem.userLike">
						<image @click="videoItemLike('0')"  src="@/static/img/common/favour_s.png" mode=""></image>
					</block>
					<block v-else>
						<image @click="videoItemLike('1')"  src="@/static/img/common/favour.png" mode=""></image>
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
	</repositoryContentCover>
</template>

<script>
	import repositoryContentCover from "@/pages/repository/components/repositoryContentCover.vue"
	export default {
		props: {
			isSearch:{
				type:Boolean,
				default:false
			},
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
			repositoryContentCover
		},
		mounted() {
			console.log(this.isSearch)
		},
		watch:{
			 isSearch: {
			        handler (newLength, oldLength) {
			            console.log(newLength)
			        },
			        immediate: true
			    }
		},
		methods:{
			/**
			 * 
			 * 播放量
			 */
			async videoRead(videoId){
				this.$emit('jumpVideoItem',`/pages/repository/videoDetail?id=${videoId}`)
				let res = await this.$request(`video/video/vInfoApp/read/${this.videoItem.videoId}`,{
					hideloading:true
				},'POST');
				if(res.data.status==200){
					this.$emit('updateVideoItemRead',this.index)
				}				
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
	.developmentSecurity {
	    width:464rpx;
        padding: 10rpx 35rpx;
		.showimg {
			width: 100%;
			height: 160rpx;
		}

		.title {
			font-size: 28rpx;
			font-weight: bold;
			color: #666666;
			font-family: PingFang SC-Bold, PingFang SC;
		}

		.content {
			line-height: 40rpx;
			font-size: 24rpx;
			margin-top: 24rpx;
			margin-bottom: 28rpx;
			font-family: PingFang SC-Medium, PingFang SC;
			font-weight: 500;
			color: #666666;
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
</style>
