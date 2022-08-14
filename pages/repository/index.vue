/**
* 知识文库首页
*/
<template>
	<view class="repository">
		
		<navTop>知识文库</navTop>

		<view class="content" :style="{height: phoneHeight + 'rpx'}">
			<view class="top-cover"  id="topCover">
				<view class="top">
					<input type="text" @click="openSearchPage" value="" placeholder="请输入想要搜索的内容">
				</view>
			</view>

			<view class="down">
				<!-- <view class="left"> -->
				<scroll-view class="left" scroll-y="true">
					<block  v-for="( item,index ) in knowledgeData" :key="item.knowledgeTypeId">
						<block v-if="item.knowledgeTypeId==FIndexId">
							<view class="item select" >
								{{item.knowledgeTypeName}}
							</view>							
						</block>
						<block v-else>
							<view class="item" @click="getknowledgeChildData(index)">
								{{item.knowledgeTypeName}}
							</view>
						</block>
					</block>
				<!-- </view> -->
				</scroll-view>
				<view class="right">
					<view class="page-section-spacing">
						<scroll-view class="scroll-view_H" scroll-x="true" bindscroll="scroll" style="width: 100%">
							<block v-for="(item , index) in knowledgeChildData" :key="item.knowledgeId">
								<block v-if="item.knowledgeTypeId == SIndexId">
									<view class="scroll-view-item_H select">
										{{item.knowledgeTypeName}}
									</view>
								</block>
								<block v-else>
									<view class="scroll-view-item_H" @click="getknowledgeChildData(leftSelectIndex,index)">
										{{item.knowledgeTypeName}}
									</view>
								</block>								
							</block>
							
						</scroll-view>
					</view>
					<view class="page-content">
						<!-- 知识文库列表 -->
						<block v-if="currentpage=='Knowledge'">
							<block v-for="(knowledge , index) in knowledgeListData" :key="knowledge.knowledgeId">
								<developmentSecurity 
									@updateKnowledge="updateKnowledge"
									@updateKnowledgeRead="updateKnowledgeRead"
									:index="index" 
									:knowledge="knowledge">
								</developmentSecurity>
							</block>
						</block>
						<!-- 视频列表 -->
						<block v-if="currentpage=='videoCourse'">
							<videoCourse></videoCourse>
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
			console.log(this.FIndexId)
			this.getknowledgeChildData(this.leftSelectIndex,this.rightSelectIndex)
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
			 * @param {Object} 搜索预留
			 */
			search(res) {
				uni.showToast({
					title: '搜索：' + res.value,
					icon: 'none'
				})
			},
			/**
			 * 跳转到搜索页
			 */
			openSearchPage(){
				uni.navigateTo({
					url: '/pages/repository/components/searchPage?typeVal=knowledge'
				})
			},
			/**
			 * 获取文库类别数据
			 */
			async getKnowledgeData(){
				let KnowledgeData = await this.$request('knowledge/knowledge/kType/getKType',{
					
				},'GET');
				this.knowledgeData = KnowledgeData.data.body;
				this.getknowledgeChildData()
			},
			/**
			 * 获取二级类别数据
			 */
			async getknowledgeChildData(knowledgeSelectIndex = 0 ,SIndexId = 0){
				
				if(this.knowledgeData.length>0){
					this.leftSelectIndex = knowledgeSelectIndex;
					this.rightSelectIndex = SIndexId;
					this.FIndexId = this.knowledgeData[knowledgeSelectIndex].knowledgeTypeId;
					if(this.knowledgeData[knowledgeSelectIndex].childrenKType){
						this.knowledgeChildData = this.knowledgeData[knowledgeSelectIndex].childrenKType;
						this.SIndexId = this.knowledgeChildData[SIndexId].knowledgeTypeId;
						this.getKnowledgeListData(this.SIndexId)
					 }else{
					 	this.knowledgeChildData = []
						this.knowledgeListData = []
					 }
					
				}
			},
			/**
			 * @param {Object} knowledgeTypeId
			 * 获取知识文库数据
			 */
			async getKnowledgeListData(knowledgeTypeId){
				let that = this;
				let KnowledgeListData = await this.$request('knowledge/knowledge/kInfoApp/getKnowledge',{
					knowledgeTypeId: knowledgeTypeId,
					pageNo: 1,
					pageSize: 10,
				},'POST');
				this.knowledgeListData = KnowledgeListData.data.body.list;
		
			},
			/**
			 * @param {Object} index 在数据中下标	
			 * 更新列表阅读量
			 */
			updateKnowledgeRead(index){
				this.knowledgeListData[index]['readNumber'] = this.knowledgeListData[index]['readNumber']+1
			},
			/**
			 * @param {Object} likeCollect 是点赞还是收藏
			 * @param {Object} index 在数据中下标	
			 * @param {Object} state 状态
			 * 更新列表点赞 收藏数据
			 */
			updateKnowledge(likeCollect,index,state,updateNum){
				this.knowledgeListData[index][likeCollect] = state
				if(state){
					this.knowledgeListData[index][updateNum] = this.knowledgeListData[index][updateNum]+1
				}else{
					this.knowledgeListData[index][updateNum] = this.knowledgeListData[index][updateNum]-1
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.content {
		background:#F3F5F9;
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
					// text-align: center;
					// line-height: 64rpx;
					padding-left: 15rpx;
					height: 64rpx;
				}
			}
		}

		.down {
			width: 750rpx;
			//min-height: 1100rpx;
			display: flex;
			flex: 1;
			justify-content: space-between;
			.left {
				width: 174rpx;
				position: fixed;
				height: calc(100% - 134px);
				top:134px;
				bottom:0;
				background-color: #FFFFFF;
				overflow-y: auto;
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
				// min-height: 1000rpx;
				.page-section-spacing {
					position: fixed;
					width: calc(100% - 196rpx);
					top:134px;
					left: 196rpx;
					height: 100rpx;
					overflow-y:auto;
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
						font-size: 24rpx;
						line-height: 50rpx;
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
					top:170px;
					bottom: 0;
				}
			}
		}
	}
</style>
