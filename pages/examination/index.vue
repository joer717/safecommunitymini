<!-- 考试中心 -->
<template>
	<view class="examination" :style="{height: phoneHeight +'rpx'}">
		<navTop :showNav="false">考试中心</navTop>
		<tab @tabIndex="tabIndex" :tabData="tabData"></tab>
		<block v-if="tabFlag == 0">
			<scroll-view :style="{height: phoneHeight - 98 +'rpx'}" class="scroll-box" scroll-y="true">
				<list v-for="(item, index) in examinationData" :key="index">
					<view class="list-top">
						<view class="list-top-img-title">
							<image class="list-top-img" src="@/static/img/examination/success-icon.png"></image>
							<text class="list-top-title">{{item.examName}}</text>
						</view>
						<text v-if="item.status == 4" class="analysis-btn analysis-btn-bg">已交卷</text>
						<text v-else class="analysis-btn" :class="item.status != 2 ? 'analysis-btn-bg':''" @click="jumpQuestion(item)">{{item.examTimeLimit}}次机会</text>
					</view>
					<view class="list-bottom">
						<view class="list-bottom-l">
							<text class="list-bottom-title">答题时长</text>
							<text class="list-bottom-msg">{{item.examTimeLimit}}min</text>
						</view>
						<view class="list-bottom-r">
							<text class="list-bottom-title">开始时间</text>
							<text class="list-bottom-msg">{{item.examStartTime}}</text>
						</view>
						<view class="list-bottom-r">
							<text class="list-bottom-title">结束时间</text>
							<text class="list-bottom-msg">{{item.examEndTime}}</text>
						</view>
					</view>
				</list>
			</scroll-view>
		</block>
		<block v-else>
			<scroll-view :style="{height: phoneHeight - 98 +'rpx'}" class="scroll-box" scroll-y="true">
				<list  v-for="(item, index) in examinationData" :key="index">
					<view class="list-top">
						<view class="list-top-img-title">
							<image class="list-top-img" src="@/static/img/examination/success-icon.png"></image>
							<text class="list-top-title">{{item.examName}}</text>
						</view>
						<text class="analysis-btn" @click="examDetails(item)">查看详情</text>
					</view>
					<view class="list-bottom">
						<view class="list-bottom-l">
							<text class="list-bottom-title">考试分数</text>
							<text class="list-bottom-msg">{{item.totalScore}}分</text>
						</view>
						<view class="list-bottom-r">
							<text class="list-bottom-title">开始时间</text>
							<text class="list-bottom-msg">{{item.examStartTime}}</text>
						</view>
						<view class="list-bottom-r">
							<text class="list-bottom-title">结束时间</text>
							<text class="list-bottom-msg">{{item.examEndTime}}</text>
						</view>
					</view>
				</list>
			</scroll-view>
		</block>
		<uniDialog @submitStatusInfo="submitStatusInfo" :submitStatus="submitStatus" :maskFlag="false">
			<view class="popup-tooltip">
				<image class="tooltip-img" src="@/static/img/examination/success-icon.png"></image>
				<text class="tooltip-title">查看详情</text>
			</view>
			<view class="popup-sum">
				<view class="popup-sum-list"><text class="popup-sum-title">成绩：</text>{{examDetailData.score}}</view>
				<view class="popup-sum-list"><text class="popup-sum-title">排名：</text>{{examDetailData.rankNum}}</view>
				<view class="popup-sum-list"><text class="popup-sum-title">正确率：</text>{{examDetailData.accuracy}}%</view>
			</view>
			<view class="see-box">
				<text class="see-btn" @click="seeClick()">关联知识</text>
			</view>
		</uniDialog>
	</view>
</template>

<script>
	import navTop from "@/components/navTop.vue"
	import tab from "@/components/tab.vue"
	import list from "@/components/list.vue"
	import uniDialog from "@/components/uni-popup.vue"
	export default {
		components: {
			navTop,
			tab,
			list,
			uniDialog
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
						name: '未开始'
					},
					{
						name: '已结束'
					}
				],
				tabFlag: 0,
				examInfoUserQuery: {
					enterpriseId: 0, // 企业ID
					examName: "", // 考试名称
					examStatus: 0, // 状态;0-未开始&1-已结束	
					pageNo: 1, // 页码
					pageSize: 10, // 每页条数
					statusList: [], // 状态集合:前台无需传
					userId: 0 // 用户ID
				},
				examId:'',
				totalPage: 0, // 总页数
				examinationData: [],
				examRecordId: '', // 考试记录ID
				submitStatus: 0, // 查看详情弹框
				examDetailData: {
					score: 0, // 成绩
					rankNum: 0, // 排名
					accuracy: 0 // 正确率
				}
			}
		},
		watch: {
			reFresh: function(){
				this.listExamInfo()
			}
		},
		async onLoad() {
			// 可使用窗口的高
			uni.getSystemInfo({
				success: (res) => {
					this.phoneHeight = (res.windowHeight*(750/res.windowWidth))-(getApp().globalData.navHeight) * (750 / res.windowWidth);
				}
			})
		},
		mounted() {
			this.listExamInfo()
		},
		onReachBottom() {
			this.examInfoUserQuery.pageNo++;
			if(this.examInfoUserQuery.pageNo > this.totalPage) {
				uni.hideNavigationBarLoading()
				uni.showToast({
					title: '暂无更多数据'
				})
			} else {
				this.listExamInfo()
			}
		},
		methods: {
			// 考试列表查询
			async listExamInfo() {
				uni.showNavigationBarLoading()
				let examList = await this.$request('exam/examCenter/listExamInfo', this.examInfoUserQuery,'POST')
				console.log(examList, "===examList==")
				let data = examList.data.body
				this.totalPage = data.pages
				if(this.examInfoUserQuery.pageNo == 1) {
					this.examinationData = data.list
				} else {
					this.examinationData = this.examinationData.concat(data.list)
				}
				uni.hideNavigationBarLoading()
			},
			tabIndex(idx) {
				this.tabFlag = idx
				this.examInfoUserQuery.examStatus = this.tabFlag
				this.totalPage = 0
				this.examinationData = []
				this.examInfoUserQuery.pageNo = 1
				this.examInfoUserQuery.pageSize = 10
				this.listExamInfo()
			},
			// 查看详情
			async examDetails(item) {
				
				this.examRecordId = item.examRecordId
				this.examId = item.examId
				let examData = await this.$request(`exam/examCenter/lookExamDetail/${this.examRecordId}`, {},'GET')
			//	console.log(examData, "===examData==")
				if(examData.data.status == 200) {
					this.submitStatus = 1
					this.examDetailData.score = Math.floor(examData.data.body.score)
					this.examDetailData.rankNum = examData.data.body.rankNum
					this.examDetailData.accuracy = Math.floor(examData.data.body.accuracy * 100)/100
				} else {
					wx.showLoading({
						title: submitInfo.data.message,
						mask: true,
					})
				}
			},
			// 关联知识
			seeClick() {
				uni.navigateTo({
					url: "/pages/examination/relatedKnowledge?examId=" + this.examId
				})
			},
			submitStatusInfo(val) {
				this.submitStatus = 0
			},
			// 参加考试
			jumpQuestion(list) {
				if(list.status == 2) {
					uni.navigateTo({
						url: "/pages/examination/question?list=" + encodeURIComponent(JSON.stringify(list))
					})
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	@import url("@/static/css/main.wxss");
	.examination {
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.scroll-box{
		flex: 1;
		background-color: #F3F5F9;
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