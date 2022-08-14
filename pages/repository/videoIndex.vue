/**
* 视频首页
*/
<template>
	<view class="repository">
		
		<navTop>视频课程</navTop>

		<view class="content"  :style="{height: phoneHeight + 'rpx'}">
			<view class="top-cover"  id="topCover">
				<view class="top">
					<input type="text"  @click="openSearchPage" value="" placeholder="请输入想要搜索的内容">
				</view>
			</view>

			<view class="down">
				<scroll-view class="left" scroll-y="true">
					<block  v-for="( item,index ) in knowledgeData" :key="item.videoTypeId">
						<block v-if="item.videoTypeId==FIndexId">
							<view class="item select" >
								{{item.videoTypeName}}
							</view>							
						</block>
						<block v-else>
							<view class="item" @click="getKnowledgeListData(item.videoTypeId)">
								{{item.videoTypeName}}
							</view>
						</block>
					</block>
				</scroll-view>
				<view class="right">
					<view class="page-content">
						<block v-if="currentpage=='Knowledge'">
							<block v-for="(knowledge , index) in knowledgeListData" :key="knowledge.knowledgeTypeId">
								<developmentSecurity :knowledge="knowledge"></developmentSecurity>
							</block>
						</block>
						<block v-if="currentpage=='videoCourse'">
							<block v-for="(videoItem , index) in knowledgeListData" :key="videoItem.videoTypeId">
								<videoCourse 
									:index='index' 
									@updateVideoItem="updateVideoItem"
									@updateVideoItemRead="updateVideoItemRead"
									@jumpVideoItem='jumpItem' 
									:videoItem="videoItem">
								</videoCourse>
							</block>
						</block>
					</view>
					
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import developmentSecurity from './components/developmentSecurity.vue'
	import videoCourse from './components/videoCourse.vue'
	import modularTraining from './components/modularTraining.vue'
	import navTop from "@/components/navTop.vue"
	export default {
		components:{
			developmentSecurity,
			videoCourse,
			modularTraining,
			navTop
		},
		data() {
			return {
				knowledgeData: [],
				knowledgeSelectIndex:0,
				knowledgeChildData: [],
				knowledgeTypeId:'',
				knowledgeListData: [],
				vfpTag: [],
				options:{},
				currentpage:'',
				FIndexId:0,
				SIndexId:0,
				leftSelectIndex:0,//左边栏索引
				rightSelectIndex:0,//上边栏索引
				phoneHeight:0,
				scheight:0,				
			}
		},
		onLoad(options) {
			this.options = options;
		},
		onShow: function () {
		   this.getKnowledgeListData(this.FIndexId)
		 },
		mounted() {
			// 可使用窗口的高
			this.phoneHeight = getApp().globalData.phoneHeight;
			
			var that = this;
			//创建节点选择器
			uni.createSelectorQuery().select('#topCover').boundingClientRect(function (rect) {
				that.scheight = Math.round(that.phoneHeight/2) - rect.height
			}).exec();			
			this.currentpage = this.options.currentPage;
			this.getKnowledgeData()
		},
		methods: {
			/**
			 * @param {Object} pageurl
			 * 跳转自组件事件
			 */
			jumpItem(pageurl){
				uni.navigateTo({
					url: pageurl
				})
			},
			/**
			 * 跳转到搜索页
			 */
			openSearchPage(){
				uni.navigateTo({
					url: '/pages/repository/components/searchPage?typeVal=video'
				})
			},
			/**
			 * @param {Object} 搜索预留
			 */
			search(res) {
				uni.showToast({
					title: '搜索：' + res.value,
					icon: 'none'
				})
			},
			/**
			 * 获取文库类别数据
			 */
			async getKnowledgeData(knowledgeSelectIndex = 0){
				let KnowledgeData = await this.$request('video/video/vType/getVType',{
					
				},'GET');
				
				this.knowledgeData = KnowledgeData.data.body;
				if(this.knowledgeData.length>0){
					this.FIndexId = this.knowledgeData[knowledgeSelectIndex].videoTypeId;
					this.getKnowledgeListData(this.FIndexId)
				}	
			},
			/**
			 * @param {Object} videoTypeId
			 * 获取知识文库数据
			 */
			async getKnowledgeListData(videoTypeId){
				let that = this;
				this.FIndexId = videoTypeId;
				let KnowledgeListData = await this.$request('video/video/vInfoApp/getVInfo',{
					videoTypeId: videoTypeId,
					pageNo: 1,
					pageSize: 10,
				},'POST');
				
				this.knowledgeListData = KnowledgeListData.data.body.list;
			},
			/**
			 * @param {Object} index 下标
			 */
			updateVideoItemRead(index){
				this.knowledgeListData[index]['readNumber'] = this.knowledgeListData[index]['readNumber']+1
			},
			/**
			 * @param {Object} likeCollect 收藏还是点赞
			 * @param {Object} index 下标
			 * @param {Object} state 状态
			 * @param {Object} num 修改数量
			 */
			updateVideoItem(likeCollect,index,state,num){
				this.knowledgeListData[index][likeCollect] = state
				if(state){
					this.knowledgeListData[index][num] = this.knowledgeListData[index][num]+1
				}else{
					this.knowledgeListData[index][num] = this.knowledgeListData[index][num]-1
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.content {
		background: #F3F5F9;
		.top-cover {
			position: fixed;
			top: 84px;
			width: 750rpx;
			display: flex;
			justify-content: center;
			padding: 23rpx 0;
			.top {
				width: 670rpx;
				height: 64rpx;
				background: #FFFFFF;
				border-radius: 32rpx 32rpx 32rpx 32rpx;
				opacity: 1;
				border: 1rpx solid #D8D8D8;
				input {
					text-align: center;
					line-height: 64rpx;
					height: 64rpx;
				}
			}
		}

		.down {
			width: 750rpx;
			min-height: 1100rpx;
			display: flex;
			justify-content: space-between;
			.left {
				position: fixed;
				height: calc(100% - 134px);
				top:134px;
				bottom:0;
				background-color: #FFFFFF;
				overflow-y: auto;
				width: 174rpx;
				.item {
					width: 174rpx;
					line-height: 100rpx;
					position: relative;
					text-align: center;
					font-size: 24rpx;
					font-family: PingFang SC-Medium, PingFang SC;
					font-weight: 500;
					color: #333333;
					background-color: #FFFFFF;
				}
				.select{
					color: #2B6DDD;
					background: #F8F8FA;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					line-clamp: 1;
					-webkit-box-orient: vertical;
				}	
				.select::before{
					content: '';
					position: absolute;
					width: 6rpx;
					height: 60rpx;
					top: 0;
					bottom: 0;
					left: 0;
					margin: auto;
					background-color: rgba(43, 109, 221, 1);
				}								
			}
			.right {
				width: 552rpx;
				min-height: 1000rpx;
				.page-section-spacing {
					height: 100rpx;
					.scroll-view_H {
						white-space: nowrap;
					}
					.scroll-view-item_H {
						min-width: 172rpx;
						padding-left: 38rpx;
						padding-right: 38rpx;						
						height: 50rpx;
						margin-right: 17rpx;
						display: inline-block;
						text-align: center;
						background-color: rgba(232, 234, 236, 1);
						border-radius: 8rpx 8rpx 8rpx 8rpx;
					}
					.select{
						color: #2B6DDD;
						background: rgba(23, 153, 255, 0.1);
					}
				}
				.page-content{
					overflow-y: auto;
					position: fixed;
					left: 196rpx;
					top:134px;
					bottom: 0;
				}
			}
		}
	}
</style>
