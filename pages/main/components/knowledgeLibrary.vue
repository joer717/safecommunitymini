/**
* 知识文库
*/
<template>
	<contentCover>
		<view class="developmentSecurity">
			<view class="title-box">
				<text class="title">{{knowledge.title}}</text>
				<block v-if="videoItem.userLearn">
					<image class="completed-icon" src="@/static/img/common/completed.png"></image>
				</block>
			</view>
			<view class="content" @click="openInfo">
				{{knowledge.essayAbstract}}
			</view>
			<view class="num">
				<view>
					<image src="@/static/img/common/read.png" mode=""></image>
					{{knowledge.readNumber}}
				</view>
				<view>
					<block v-if="knowledge.userLike">
						<image @click="knowledgeLike('0')" src="@/static/img/common/favour_s.png" mode=""></image>
					</block>
					<block v-else>
						<image @click="knowledgeLike('1')" src="@/static/img/common/favour.png" mode=""></image>
					</block>
					{{knowledge.likeNumber}}
				</view>
				<view>
					<block v-if="knowledge.userCollect">
						<image @click="knowledgeCollect('0')"  src="@/static/img/common/star_s.png" mode=""></image>
					</block>
					<block v-else>
						<image @click="knowledgeCollect('1')"  src="@/static/img/common/star.png" mode=""></image>
					</block>
					{{knowledge.collectNumber}}
				</view>
			</view>
		</view>

	</contentCover>
</template>

<script>
	import contentCover from "./contentCover.vue"
	export default {
		props: {
			knowledge: {
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
		mounted() {
			console.log(this.knowledge)
		},
		methods:{
			openInfo(){
				uni.navigateTo({
					url: "/pages/webview/index?url=" + this.knowledge.essayContent
				})
			},
			/**
			 * 
			 * 点赞
			 */
			async knowledgeLike(isLike){
				let likeInfo = await this.$request(`knowledge/knowledge/kInfoApp/likeOrCancelLike/${this.knowledge.knowledgeId}/${isLike}`,{
					hideloading:true
				},'PUT');
				console.log('likeInfo.data.body',likeInfo.data.status)
				if(likeInfo.data.status==200){
					this.$emit('updateKnowledge','userLike',this.index,isLike==1?true:false,'likeNumber')
				}				
			
			},
			/**
			 * 
			 * 收藏
			 */			
			async knowledgeCollect(isCollect){
				
				let collectInfo = await this.$request(`knowledge/knowledge/kInfoApp/collectOrCancelCollect/${this.knowledge.knowledgeId}/${isCollect}`,{
					hideloading:true
				},'PUT');
				console.log('collectInfo.data.body',collectInfo.data.status)
				if(collectInfo.data.status==200){
					this.$emit('updateKnowledge','userCollect',this.index,isCollect==1?true:false,'collectNumber')
				}
				
			}	
		}
	}
</script>

<style lang="scss" scoped>
	.developmentSecurity {
		width: 100%;
		.title-box{
			display: -webkit-flex;
			align-items: center;
			justify-content: space-between;
			.title {
				font-size: 28rpx;
				font-weight: bold;
				color: #666666;
				font-family: PingFang SC-Bold, PingFang SC;
			}
			.completed-icon{
				width: 80rpx;
				height: 40rpx;
				margin-right: -40rpx;
			}
		}
		

		.content {
			line-height: 40rpx;
			font-size: 24rpx;
			margin-top: 24rpx;
			margin-bottom: 28rpx;
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
</style>
