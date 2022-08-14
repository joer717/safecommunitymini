<!-- 关联知识 -->
<template>
	<view class="related-knowledge" :style="{height: phoneHeight +'rpx'}">
		<navTop :showNav="false">关联知识</navTop>
		<tab @tabIndex="tabIndex" :tabData="tabData"></tab>
		<!-- 知识文库 -->
		<block v-if="tabFlag == 0">
			<scroll-view :style="{height: phoneHeight - 98 +'rpx'}" class="scroll-box" scroll-y="true">
				<block v-for="(knowledge, index) in knowledgeListData" :key="index">
                 <developmentSecurity 
       		  		@updateKnowledge="updateKnowledge"
       		  		@updateKnowledgeRead="updateKnowledgeRead"
       		  		:index="index" 
					:isSearch="true"
       		  		:knowledge="knowledge">
       		  	  </developmentSecurity>
				</block>
			</scroll-view>
		</block>
		<!-- 视频课程 -->
		<block v-else>
			<scroll-view :style="{height: phoneHeight - 98 +'rpx'}" class="scroll-box" scroll-y="true">
				<list  v-for="(item, index) in videoData" :key="index">
				</list>
			</scroll-view>
		</block>

	</view>
</template>

<script>
	import navTop from "@/components/navTop.vue"
	import tab from "@/components/tab.vue"
	import list from "@/components/list.vue"
    import developmentSecurity from '@/pages/repository/components/developmentSecurity.vue'
	export default {
		components: {
			navTop,
			tab,
			list,
			developmentSecurity
		},
		data() {
			return {
				reFresh: '',
				phoneHeight: 0, // 可使用窗口的高
				old: {
					scrollTo: 0
				},
				tabData: [
					{
						name: '知识文库',
						value:0
					},
					{
						name: '视频课程',
						value:1
					}
				],
				knowledgeListData:[],
				tabFlag: 0,
				examId:'',
				knowledgeQuery: {
					type:0,
					pageNo: 1, // 页码
					pageSize: 10, // 每页条数
				},
				videoData: {
					type:0,
					pageNo: 1, // 页码
					pageSize: 10, // 每页条数
				},
				totalPage: 0, // 总页数
			}
		},
		watch: {
			reFresh: function(){
				//this.listExamInfo()
			}
		},
		async onLoad(options) {
			this.examId =  options.examId
			// 可使用窗口的高
			uni.getSystemInfo({
				success: (res) => {
					this.phoneHeight = (res.windowHeight*(750/res.windowWidth))-(getApp().globalData.navHeight) * (750 / res.windowWidth);
				}
			})
		},
		mounted() {
			this.relatedKnowledgeList()
		},
		onReachBottom() {
			this.knowledgeQuery.pageNo++;
			if(this.knowledgeQuery.pageNo > this.totalPage) {
				uni.hideNavigationBarLoading()
				uni.showToast({
					title: '暂无更多数据'
				})
			} else {
				this.relatedKnowledgeList()
			}
		},
		methods: {
			// 关联知识(知识文库)
			async relatedKnowledgeList() {
				uni.showNavigationBarLoading()
				let nameData = await this.$request(`/exam/examCenter/filterExamName/${this.examId}`,{},'GET');
				let name = nameData.data.body
				let dataVal = await this.$request(`/knowledge/knowledge/kInfoApp/getlistFromES/${this.knowledgeQuery.type}/${this.knowledgeQuery.pageSize}/${this.knowledgeQuery.pageNo}/${name}`,{
		        },'GET');
				this.totalPage = dataVal.data.body.pages
				if(this.knowledgeQuery.pageNo == 1) {
					this.knowledgeListData = dataVal.data.body.list
				} else {
					this.knowledgeListData = this.knowledgeListData.concat(dataVal.list)
				}
				uni.hideNavigationBarLoading()
			},
			tabIndex(idx) {
				this.tabFlag = idx
				this.totalPage = 0
				this.knowledgeListData = []
				this.knowledgeQuery.pageNo = 1
				this.knowledgeQuery.pageSize = 10
				this.relatedKnowledgeList()
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
			},
		}
	}
</script>

<style scoped lang="scss">
	@import url("@/static/css/main.wxss");
	.related-knowledge {
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.scroll-box{
		flex: 1;
		background-color: #F3F5F9;
		padding: 20rpx 10rpx;
	}
	.list-top{
		display: -webkit-flex;
		align-items: center;
		justify-content: space-between;
		padding: 32rpx;
		border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
		.list-top-img-title{
			display: -webkit-flex;
			align-items: center;
			.list-top-img{
				width: 36rpx;
				height: 40rpx;
			}
			.list-top-title{
				margin-left: 16rpx;
				color: #333333;
				font-size: 28rpx;
			}
		}
		.analysis-btn{
			width: 132rpx;
			height: 48rpx;
			background: #FFFFFF;
			border-radius: 24rpx;
			opacity: 1;
			border: 1.4rpx solid #2A91EB;
			color: #1799FF;
			font-size: 24rpx;
			text-align: center;
			line-height: 48rpx;
		}
		.analysis-btn-bg{
			background-color: #c3c3c3;
			color: #FFFFFF;
			border: 1.4rpx solid #c3c3c3;
		}
	}
	.list-bottom{
		display: -webkit-flex;
		padding: 32rpx;
		flex-direction: column;
		.list-bottom-l, .list-bottom-r{
			flex: 1;
		}
		.list-bottom-title{
			width: 40%;
			font-size: 24rpx;
			color: #999999;
			margin-top: 19rpx;
			display: inline-block;
		}
		.list-bottom-msg{
			width:55%;
			font-size: 28rpx;
			color: #333333;
			font-weight: bold;
			display: inline-block;
			margin-top: 19rpx;
		}
	}
	/* 提交弹框 */
	.popup-tooltip{
		display: -webkit-flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 43rpx;
		.tooltip-img{
			width: 58rpx;
			height: 64rpx;
		}
		.tooltip-title{
			font-size: 34rpx;
			color: #333333;
			margin-left: 16rpx;
		}
	}
	.popup-sum{
		margin-left: 64rpx;
		margin-right: 56rpx;
		border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
		.popup-sum-list{
			display: -webkit-flex;
			align-items: center;
			margin-bottom: 30rpx;
			color: #333333;
			font-size: 28rpx;
		}
		.popup-sum-title{
			width: 140rpx;
			font-size: 28rpx;
			color: #666666;
			text-align: right;
			margin-right: 16rpx;
		}
	}
	.see-box{
		padding-top: 32rpx;
		padding-bottom: 48rpx;
		text-align: center;
		.see-btn{
			width: 284rpx;
			height: 72rpx;
			background: #2B6DDD;
			color: #FFFFFF;
			font-size: 28rpx;
			box-shadow: 0px 6rpx 10rpx 1rpx rgba(43, 109, 221, 0.3);
			border-radius: 36rpx;
			display: inline-block;
			text-align: center;
			line-height: 72rpx;
		}
	}
</style>