/**
 * 视频课程--课程介绍底部
 */
<template>
	<view class="introduceBottom">
		
		<view class="item">
			<view class="item-in">
				<image class="icon" src="@/static/img/common/read.png" mode=""></image>
				{{vedioData.readNumber}}
			</view>
		</view>
		<view class="item">
			<view class="item-in">
				<block v-if="vedioData.userLike">
					<image @click="videoItemLike('0')" class="icon" src="@/static/img/common/favour_s.png" mode=""></image>
				</block>
				<block v-else>
					<image @click="videoItemLike('1')" class="icon" src="@/static/img/common/favour.png" mode=""></image>
				</block>
				
				{{vedioData.likeNumber}}
			</view>
		</view>
		<view class="item">
			<view class="item-in">
				<block v-if="vedioData.userCollect">
					<image @click="videoItemCollect('0')" class="icon" src="@/static/img/common/star_s.png" mode=""></image>
				</block>
				<block v-else>
					<image @click="videoItemCollect('1')" class="icon" src="@/static/img/common/star.png" mode=""></image>
				</block>
				{{vedioData.collectNumber}}
			</view>
		</view>
	</view>
</template>

<script>
	
	export default {
		
		props: {
			vedioData: {
				type: Object,
				default: {},
			},
			index: {
				type: Number,
				default: 0,
			},			
		},		
		data() {
			return {
				
			}
		},
		
		mounted() {
			// this.readNumber = vedioData.readNumber;
			// this.likeNumber = vedioData.likeNumber;
			// this.collectNumber = vedioData.collectNumber;
		},
		methods:{
			/**
			 * 
			 * 点赞
			 */
			async videoItemLike(isLike){
				let likeInfo = await this.$request(`video/video/vInfoApp/likeOrCancelLike/${this.vedioData.videoId}/${isLike}`,{
					hideloading:true
				},'PUT');
				if(likeInfo.data.status==200){
					this.$emit('updateVedioData','userLike',isLike==1?true:false,'likeNumber')
				}				

			},
			/**
			 * 
			 * 收藏
			 */			
			async videoItemCollect(isCollect){
				
				let collectInfo = await this.$request(`video/video/vInfoApp/collectOrCancelCollect/${this.vedioData.videoId}/${isCollect}`,{
					hideloading:true
				},'PUT');
				if(collectInfo.data.status==200){
					this.$emit('updateVedioData','userCollect',isCollect==1?true:false,'collectNumber')
				}
				
			}						
			
		}
		
	}
</script>

<style scoped lang="scss">
	.introduceBottom {
		width: 750rpx;
		margin: auto;
		display: flex;
		justify-content: center;
		align-items: center;
		padding-top: 24rpx;
		padding-bottom: 47rpx;
		background-color: #ffffff;
		.item {
			width: 249rpx;
			//line-height: 110rpx;
			font-size: 26rpx;
			font-family: PingFang SC-Medium, PingFang SC;
			font-weight: 500;
			color: #999999;
			text-align: center;

			.item-in {
				display: flex;
				align-items: center;
				justify-content: center;

				.icon {
					width: 40rpx;
					height: 36rpx;
					margin-right: 10rpx;
				}
			}


		}
	}
</style>
