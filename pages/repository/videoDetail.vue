/**
* 视频详情页面
*/
<template>
	<view class="">
		<view id="showRect">
			<video
			autoplay
			  id="myVideo" 
			  :src="vedioData.url"
			  @ended="endedEvent"
			></video>
			
			<Tabs id="tabId" :tabData='tabData' :selectTabIndex='selectTabIndex' @changeTab='changeTab'></Tabs>			
		</view>

		<block v-if="selectTabIndex==1">
			<scroll-view scroll-y="true" class="pl-list" :style="{height: scheight + 'px'}">
				<block v-if="!vCommentData.length">
					<view class="">
						<image src="@/static/img/common/no-evaluate.png"></image>
						<view class="no-evaluate">
							暂无评论
						</view>
					</view>
					
				</block>
				<block v-else>
					<view class="rank-item">
						<text class="rank-text" v-if="status==1">热门评论</text><text class="rank-text" v-if="status==0">最新评论</text>
						<view v-if="status==1" @click="toggle(0)"><img src="" alt="">按热度</view><view v-if="status==0" @click="toggle(1)"><img src="" alt="">按时间</view>
					</view>
					<block v-for="(evitem,index) in vCommentData" :key="evitem">
						<evaluateItem :index='index' :evitem='evitem' @updateVideoLike="updateVideoLike" @updateReplyLike="updateReplyLike" @replyFocus="replyFocus"></evaluateItem>
					</block>
				</block>
				
			</scroll-view>
			<evaluateBottom 
				ref="evaluateBottom"
				@updateVedioData="updateVedioData" 
				:vedioData='vedioData'
				:replyMan='replyData.createdUserName'
				@reset="reset"
				@commitComment='commitComment'></evaluateBottom>
		</block>
		<block v-else>
			<scroll-view scroll-y="true" :style="{height: scheight + 'px'}">
				<view class="user-line">
					<image class="head" src="@/static/img/bottom/index.png" mode=""></image>
					<view class="">
							<view class="user-left">
								<text class="creater">发布人</text>
								<view class="user-data">
									<text class="fans">11.4万粉丝</text>
									<text>89视频</text>
								</view>
							</view>
							<view class="">
								<button class="tab-answer cu-btn round shadow"
									@click='nextQuestion'>关注</button>
							</view>
					</view>
				</view>
				<view class="">
					<view class="vedio-name">
						{{vedioData.videoName}}
					</view>
					<view class="">
						
					</view>
				</view>
				<view class="otherItem">
					<view class="">
						<img src="" alt="">
						{{vedioData.readNumber}}
					</view>
					<view class="">
						<img src="" alt="">
						<text style="margin-right:10rpx">638</text>
						<text>2021-7-25 17:45</text>
					</view>
					<view class="">
						<img src="" alt="">
						<text>5</text>人正在看
					</view>
					<view class="">
						<img src="" alt="">
						<text>未经作者授权禁止转载</text>
					</view>
				</view>
				<view class="introduction">
					<mp-html :content="vedioData.introduction"/>
				</view>
				<introduceBottom
					@updateVedioData="updateVedioData" 
					:vedioData='vedioData'>
				</introduceBottom>
			</scroll-view>
		</block>
	</view>
</template>

<script>
	import introduceBottom from '@/pages/repository/components/videoDetail/introduceBottom.vue'
	import evaluateBottom from '@/pages/repository/components/videoDetail/evaluateBottom.vue';
	import evaluateItem from '@/pages/repository/components/videoDetail/evaluateItem.vue';
	
	import Tabs from '@/components/tabs.vue'
	export default {
		components:{
			introduceBottom,
			evaluateBottom,
			evaluateItem,
			
			Tabs
		},
		data(){
			return{
				status:1,
				vedioId:'',
				vedioData:{},
				selectTabIndex:0,
				tabData:[
					{
						tabName:'课程介绍'	
					},
					{
						tabName:'课程评价'
					},					
				],
				phoneHeight:0,
				scheight:0,
				vCommentData:[],
				replyData:{createdUserName:''}
			}	
		},
		onLoad(options) {
			this.vedioId = options.id;
		},
		async mounted() {
			
			await this.getVedioById(this.vedioId);
			// 可使用窗口的高
			this.phoneHeight = getApp().globalData.phoneHeight;
			
			var that = this;
			//创建节点选择器
			uni.createSelectorQuery().select('#showRect').boundingClientRect(function (rect) {
				that.scheight = Math.round(that.phoneHeight/2) - rect.height //-55 
			}).exec();						
			this.getVComment()
			
		},
		methods:{
			toggle(status){
				this.status = status
				this.updateStatus(status)
			},
			reset(){
				//setTimeout(()=>{
				        this.replyData = {createdUserName:''}
				//},200)
			},
			replyFocus(data,type){
				this.replyData = data
				this.$refs.evaluateBottom.inputFocusM()
			},
			updateVideoLike(index,isLike){
				this.vCommentData[index]['userLike'] = !this.vCommentData[index]['userLike']
				if(isLike=='1'){
					this.vCommentData[index]['likeNumber'] = this.vCommentData[index]['likeNumber']+1
				}else{
					this.vCommentData[index]['likeNumber'] = this.vCommentData[index]['likeNumber']-1
				}
			},
			updateReplyLike(index,indexVos,isLike){
				this.vCommentData[index].vos[indexVos]['userLike'] = !this.vCommentData[index].vos[indexVos]['userLike']
				if(isLike=='1'){
					this.vCommentData[index].vos[indexVos]['likeNumber'] = this.vCommentData[index].vos[indexVos]['likeNumber']+1
				}else{
					this.vCommentData[index].vos[indexVos]['likeNumber'] = this.vCommentData[index].vos[indexVos]['likeNumber']-1
				}
				console.log(this.vCommentData[index].vos[indexVos]['likeNumber'])
			},
			async endedEvent(e){
				console.log("video is stop", e);
				await this.$request(`video/video/vInfoApp/readComplete/`+this.vedioId,{
					
				},'post');
			},
			/**
			 * @param {Object} vedioId
			 * 获取视频数据
			 */
			async getVedioById(vedioId){
				let vedioData = await this.$request(`video/video/vInfoApp/getVInfoById/${vedioId}`,{
					
				},'GET');
				this.vedioData = vedioData.data.body;
				console.log('this.vedioData####',this.vedioData)
			},
			/**
			 * 
			 * 获取评论列表
			 */
			async getVComment(){
				let vCommentData = await this.$request(`video/video/vInfoApp/getVComment`,{
					videoId: this.vedioData.videoId,
					pageNo: 1,
					pageSize: 10,
					status: 1,
				},'POST');
				this.vCommentData = vCommentData.data.body.list;
				this.tabData[1].tabName = ""
				this.tabData[1].tabName = "课程评价 " + this.vCommentData.length
			},
			async updateStatus(status){
				let vCommentData = await this.$request(`video/video/vInfoApp/getVComment`,{
					videoId: this.vedioData.videoId,
					pageNo: 1,
					pageSize: 10,
					status: status,
				},'POST');
				this.vCommentData = vCommentData.data.body.list;
			},
			/**
			 * @param {Object} selectTabIndex
			 * 切换tab
			 */
			changeTab(selectTabIndex){
				this.selectTabIndex = selectTabIndex;
				if(this.selectTabIndex==1){
					this.getVComment()
					this.status = 1
				}
			},
			/**
			 * @param {Object} comment
			 * 提交评论数据
			 */
			async commitComment(comment){
				if(!comment){
					uni.showToast({
						title: '请输入内容再提交',
						icon: 'none'
					})	
					return
				}
				let resInfo = await this.$request('video/video/vInfoApp/addComment',{
						"content": comment,
						"videoId": this.vedioData.videoId,
						"commentId":this.replyData.commentId,
						"replyUserId":this.replyData.replyUserId,
				},'POST');
				if(resInfo.data.status==200){
						this.replyData = {createdUserName:''}
						this.getVComment()
				}
			},
			/**
			 * @param {Object} likeCollect
			 * @param {Object} state
			 * @param {Object} updateNum
			 * 修改vedio bottom 点赞收藏显示状态
			 */
			updateVedioData(likeCollect,state,updateNum){
				
				this.vedioData[likeCollect] = state
				if(state){
					this.vedioData[updateNum] = this.vedioData[updateNum] + 1
				}else{
					this.vedioData[updateNum] = this.vedioData[updateNum] - 1
				}
				
			}
		}
	}
</script>

<style scoped lang="scss">
	#myVideo{
		width: 750rpx;
		height: 422rpx;
	}
	.video-name{
		font-size:38rpx;
		font-weight: bold;
		margin:20rpx
	}
	.no-evaluate{
		vertical-align: bottom;
		text-align: center;
		color: #999999;
	}
	.pl-list{
		padding-bottom: 130rpx;
	}
	scroll-view{
		padding: 20rpx 20rpx;
		box-sizing: border-box;
	}
	.introduction{
		word-break: break-all;
		padding: 0;
	}
	.user-line{
		display:flex;
		align-items: center;
		margin-bottom: 25rpx;
		.user-left{
			display: flex;
			flex-direction: column;
			justify-content: center;
			.creater{
				color: #2B6DDD;
				font-size: 30rpx;
			}
			.user-data{
				font-size: 24rpx;
				.fans{
					margin-right:15rpx;
				}
			}
		}
		>view{
			display: flex;
			flex: 1;
			justify-content: space-between;
			align-items: center;
			color: #999;
		}
		image{
			width: 60rpx;
			height: 60rpx;
			border-radius: 30rpx;
			margin-right: 20rpx;
		}
		button{
			color: white;
			background: #2B6DDD;
			height: 50rpx;
			line-height: 50rpx;
			font-size: 28rpx;
			border-radius: 8rpx;
			letter-spacing: 4rpx;
		}
	}
	.otherItem{
		color: #999;
		font-size: 27rpx;
		margin-top: 15rpx;
		margin-bottom: 10rpx;
		image{
			width: 20rpx;
			height: 20rpx;
		}
		>view{
			display: inline-block;
		}
	}
	.vedio-name{
		font-size: 32rpx;
		font-weight: 500;
	}
	.rank-item{
		display: flex;
		justify-content: space-between;
		color: #999;
		font-size: 24rpx;
		.rank-text{
			color:#333;
		}
		image{
			width:24rpx;
			height: 24rpx;
		}
	}
</style>