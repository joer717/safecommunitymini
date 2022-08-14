<!-- 题目列表 -->
<template>
	<view class="content">
		<navTop :showNav="true">{{unitName}}</navTop>
		<view id="timeBox" class="cu-bar bg-white justify-center">
			<!-- 正计时 -->
			<timeView :clearTime="clearTime"/>
		</view>
		<scroll-view scroll-y="true" :style="{height: phoneHeight + 'rpx'}">
			<view>
				<view class="question-list">
					<view class="question-list-title">
						<text class="question-type">{{questions[newArr[tags]].type == 1 ? '单选题' : questions[newArr[tags]].type == 2 ? '判断' : '多选题'}}</text>
						<text class='question-title'>{{questions[newArr[tags]].content}}</text>
					</view>
					<!--答案选择 - 单选、判断-->
					<radio-group v-if="questions[newArr[tags]].type != 3"
						@change="changeAnswer(questions[newArr[tags]].type, $event)">
						<label class="answer-list"
							v-for='(item, index) in questions[newArr[tags]].optionList' :key='item.content' :data-index="index"
							@click="checkAnswer(questions[newArr[tags]].type, newArr[tags], $event)">
							<radio :value="item.optionMark" :checked="item.checked" />
							<text class="options">{{item.optionMark}}、{{item.content}}</text>
						</label>
					</radio-group>
					<!--答案选择 - 多选-->
					<checkbox-group v-if="questions[newArr[tags]].type == 3"
						@change="changeAnswer(questions[newArr[tags]].type, $event)">
						<label class="answer-list" v-for="(item, index) in questions[newArr[tags]].optionList"
							@click="checkAnswer(questions[newArr[tags]].type, newArr[tags], $event)" :data-index="index"
							:key='item.name'>
							<checkbox :value="item.optionMark" :checked='item.checked' />
							<text class="options checkboxes">{{item.optionMark}}、{{item.content}}</text>
						</label>
					</checkbox-group>
				</view>
				<!-- 解析 -->
				<view class="analysis-view" v-if="analysisFlag">
					<view class="analysis-answer">答案 {{questions[newArr[tags]].rightAnswer}}</view>
					<view class="analysis-subject">题目解析</view>
					<view class="analysis-word">{{questions[newArr[tags]].analysisContent}}</view>
				</view>
			</view>
		</scroll-view>
		<view id="fixed-bottom" class="fixed-bottom">
			<view style="height: 105px;background-color: #FFFFFF;">
				<view class="tab-box">
					<button class="tab-answer cu-btn round shadow" :class="toPointN == 1 ? 'tab-answer-bg' : ''" @click='beforeQuestion'>上一题</button>
					<button class="tab-answer cu-btn round shadow" :class="toPointN == 2 ? 'tab-answer-bg' : ''" @click='nextQuestion'>下一题</button>
				</view>
				<view class="analysis-box">
					<view class="analysis-item" @click="viewResolution">
						<image class="analysis-img" src="@/static/img/examination/analysis.png"></image>
						<text class="analysis-t">查看解析</text>
					</view>
				</view>
			</view>
			<view class="footer-box flex  bg-white">
				<view class="modal-btn" @click="showModal">
					<image class="footer-img" src="@/static/img/examination/lujing.png"></image>
					{{tags+1}}/{{newArr.length}}
				</view>
				<button class="cu-btn round sub-bg shadow margin-left-lg" @click='submit'>提交</button>
			</view>
		</view>
		<!-- 答题卡 -->
		<uni-popup ref="popup" type="bottom" background-color="#fff">
			<view class="item-dialog">
				<view class="cu-bar margin-r">
					<button class="cu-btn round sub-bg shadow" @click='submit'>提交</button>
					<view class="modal-btn">
						<image class="footer-img" src="@/static/img/examination/lujing.png"></image>
						{{tags+1}}/{{newArr.length}}
					</view>
				</view>
				<view class="item-box">
					<view v-for='(item, index) in cardArr' :key="index" class="item-list" 
						 :data-index="index" @click="cardClick" style='display:inline-block'>
						<text v-if="item == true" class="bg-blue-t" :class="tags == index ? 'bg-blue-t_index' : ''">
							{{index+1}}
						</text>
						<text v-else class="bg-black" :class="tags == index ? 'bg-blue-t_index' : ''">
							{{index+1}}
						</text>
					</view>
				</view>
			</view>
		</uni-popup>
		<!-- 提交弹框 -->
		<u-popup :submitStatus="submitStatus">
			<view class="popup-tooltip">
				<image class="tooltip-img" src="@/static/img/examination/success-icon.png"></image>
				<text class="tooltip-title">提交成功</text>
			</view>
			<view class="popup-sum">
				<view class="popup-sum-list"><text class="popup-sum-title">答题数：</text>{{subData.totalCount}}</view>
				<view class="popup-sum-list"><text class="popup-sum-title">正确数：</text>{{subData.rightCount}}</view>
				<view class="popup-sum-list"><text class="popup-sum-title">正确率：</text>{{subData.accuracy}}%</view>
				<view class="popup-sum-list"><text class="popup-sum-title">耗时：</text>{{subData.answerTime}}</view>
			</view>
			<view class="see-box">
				<text class="see-btn" @click="seeClick">查看解析</text>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import navTop from "@/components/navTop.vue"
	import timeView from '@/components/timer.vue'
	import uPopup from "@/components/uni-popup.vue"
	import questionBank from '@/static/js/question.js'
	export default {
		components: {
			navTop,
			timeView,
			uPopup
		},
		data() {
			return {
				unitName: '',
				clearTime: false, // 清除计时器
				phoneHeight: 0, // 可使用窗口的高
				questions: [], //题库
				tags: 0, //题目标识
				newArr: [], //随机数数组
				cardArr: [], //答题卡数组
				cardIndex: 0, //答题卡序号
				radioValue: '', // 单选答案
				checkValue: [], // 多选答案
				choosed: [],
				submitStatus: 0, // 提交弹框
				toPointN: 0, // 切换题
				analysisFlag: false,
				listQuestions: {
					unitId: "", // 单元训练ID
					paperId: "" // 单元训练对应的试卷ID
				},
				questionList: null,
				unitPaperInfoDTO: {
					unitStartTime: '', // 测试开始时间
					unitEndTime: '', // 测试结束时间
					unitRecordId: '',// 测试记录ID
					recordPbInfo: [
						// {
						// 	isRight: 0, // 是否正确;0-不正确，1-正确
						// 	optionIds: [], // 选项ID集合;每个题目用户作答的选项集合
						// 	paperPbId: '', //问题ID
						// 	score: 0, // 分数
						// 	status: 0, // 状态;是否作答,0-未做答，1-已做答
						// }
					]
				},
				subData: {
					accuracy: null, // 正确率
					answerTime: '', // 答题时间
					rightCount: null, // 正确数
					totalCount: 0, // 答题数
					unitRecordId: '' // 测试记录ID
				}
			}
		},
		onShow() {
			if(this.questionList) {
				console.log('存在')
			} else {
				console.log('不存在')
				// 测试开始时间
				this.unitPaperInfoDTO.unitStartTime = this.common.formatDateNew()
			}
		},
		onLoad(options) {
			let item = JSON.parse(decodeURIComponent(options.item))
			console.log('item =>', item)
			this.unitName = item.unitName
			this.listQuestions.unitId = item.unitId
			this.listQuestions.paperId = item.paperId
			this.$nextTick(() => {
				let timeH = 0
				let fH = 0
				const query = uni.createSelectorQuery();
				query.select('#timeBox').boundingClientRect(data => {
					timeH = data.height
				}).exec();
				
				query.select('#fixed-bottom').boundingClientRect(fB => {
					fH = fB.height
					// 可使用窗口的高
					uni.getSystemInfo({
						success: (res) => {
							this.phoneHeight = (res.windowHeight*(750/res.windowWidth)) - (timeH*(750/res.windowWidth)) - (fH*(750/res.windowWidth)) - (getApp().globalData.navHeight)*(750/res.windowWidth);
						}
					})
				}).exec();
				
			})
		},
		mounted() {
			this.listPaperInfo()
		},
		methods: {
			// 查看单元训练-点击单元训练
			async listPaperInfo() {
				let list = await this.$request(`exam/unitTrain/saveRecordAndListPaperInfo/${this.listQuestions.unitId}/${this.listQuestions.paperId}`, {},'GET')
				this.questionList = list.data.body
				console.log(this.questionList, "===questionList==")
				this.questions = this.questionList
				var oldArr = [];
				var cardArr = [];
				for (let i = 0; i < this.questions.length; i++) {
					oldArr.push(i); //创建一个新的数组用作索引
					cardArr.push(false); //创建答题卡数组
				}
				this.cardArr = cardArr
				this.newArr = oldArr
			},
			// 上一题
			beforeQuestion() { //改变tags改变题目
				this.toPointN = 1
				this.tags = this.tags - 1;
				if (this.tags < 0) {
					wx.showToast({
						title: '已经是第一题！',
						icon: 'none',
						duration: 2000
					})
					this.tags = 0;
				} else {
					this.analysisFlag = false
				}
			},
			// 下一题
			nextQuestion() {
				this.toPointN = 2
				this.tags = this.tags + 1;
				if (this.tags >= this.newArr.length) {
					wx.showToast({
						title: '已经是最后题！',
						icon: 'none',
						duration: 2000
					})
					this.tags = this.newArr.length - 1;
				} else {
					this.analysisFlag = false
				}
			},

			// 单选、判断/多选
			changeAnswer(type, e) {
				if (type != 3) { // 单选、判断
					this.radioValue = e.detail.value
				} else { // 多选
					this.checkValue = e.detail.value
				}
			},
			checkAnswer(type, tag, res) {
				let mTag = this.newArr[this.tags];
				let index = res.currentTarget.dataset.index;
				let chooseArr = this.questions[mTag].optionList;
				if (type != 3 ) { // 单选、判断
					if (chooseArr[index].checked) return; //选择当前已经选择的返回
					chooseArr.forEach(item => { //遍历选项，将其他选项设置为false（单选）
						item.checked = false
					})
					chooseArr[index].checked = true;
					this.$set(this.questions[mTag], 'optionList', chooseArr)
					this.cardArr.splice(tag, 1, true); //变更选中数组
					setTimeout(() => { //设置延时后自动跳转到下一题
						tag = tag + 1;
						if (tag >= this.newArr.length) {
							tag = this.newArr.length - 1;
						} else {
							this.tags = tag
						}
					}, 500);
				} else { // 多选
					chooseArr[index].checked = !chooseArr[index].checked;
					this.$set(this.questions[mTag], 'optionList', chooseArr)
					let num = 0
					chooseArr.forEach(item => {
						if(item.checked) {
							num += 1
						}
					})
					if(num == 0) {
						this.cardArr.splice(tag, 1, false); //变更选中数组
					} else {
						this.cardArr.splice(tag, 1, true); //变更选中数组
					}
					
				}
			},
			// 交卷
			async submit () {
				this.unitPaperInfoDTO.recordPbInfo = []
				var cardarr = this.cardArr
				this.unitPaperInfoDTO.unitEndTime = this.common.formatDateNew()
				this.unitPaperInfoDTO.unitRecordId = this.questions[0].unitRecordId
				this.clearTime = true
				uni.showLoading({
					title: '提交中..',
					mask: true,
				})
				for (var i of this.newArr) {
					let obj = {
						isRight: '', // 是否正确;0-不正确，1-正确
						optionIds: [], // 选项ID集合;每个题目用户作答的选项集合
						paperPbId: this.questions[i].paperPbId, //问题ID
						score: 0, // 分数 单元训练传0,
						status: 0, // 状态;是否作答,0-未做答，1-已做答
					}
					if (cardarr[i] == true) {
						obj.status = 1
					} else {
						obj.status = 0
					}
					for (let j = 0; j <= this.questions[i].optionList.length - 1; j++) {
						if (this.questions[i].optionList[j].checked) {
							obj.optionIds.push(this.questions[i].optionList[j].paperPbOptionId)
						}
					}
					this.unitPaperInfoDTO.recordPbInfo.push(obj)
				}
				console.log("选中答案" ,this.unitPaperInfoDTO)
				let submitInfo = await this.$request("exam/unitTrain/submitUnitInfo", this.unitPaperInfoDTO, 'POST')
				
				console.log("submitInfo==>", submitInfo)
				if(submitInfo.data.status == 200) {
					let data = submitInfo.data.body
					uni.hideLoading()
					this.submitStatus = 1
					this.subData.accuracy = Math.floor(data.accuracy * 100)/100
					this.subData.answerTime = data.answerTime
					this.subData.rightCount = data.rightCount
					this.subData.totalCount = data.totalCount
					this.subData.unitRecordId = data.unitRecordId
				} else {
					uni.showLoading({
						title: submitInfo.data.message
					})
				}
			},
			// 单题--查看解析
			viewResolution() {
				this.analysisFlag = !this.analysisFlag
				
			},
			// 提交成功后--查看解析
			seeClick() {
				this.submitStatus = 0
				let obj = {
					unitName: this.unitName,
					unitRecordId: this.subData.unitRecordId
				}
				uni.redirectTo({
					url: "/pages/unitTraining/children/analysis?obj=" + encodeURIComponent(JSON.stringify(obj))
				})
			},
			cardClick(res) {
				const cardIndex = res.currentTarget.dataset.index;
				this.tags = cardIndex
				this.$refs.popup.close()
			},
			showModal() { //显示关闭答题卡
				this.$refs.popup.open('bottom')
			}
		}
	}
</script>

<style>
	.uni-label-pointer uni-radio::before,
	.uni-label-pointer uni-checkbox::before,
	.answer-list radio::before,
	.answer-list checkbox::before{
		display: none!important;
	}
	.answer-list checkbox .wx-checkbox-input{
		border-radius: 50%!important;
	}
	.answer-list checkbox .wx-checkbox-input.wx-checkbox-input-checked{
		color: #FFFFFF;
		background-color: #30BB71!important;
	}
</style>
<style lang="scss" scoped>
	@import url("@/static/css/main.wxss");

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background: #FFFFFF;
	}
	// 题目
	.question-list {
		padding: 15px;
		.question-list-title {
			font-size: 15px;
		}
		.question-type{
			width: 92rpx;
			height: 42rpx;
			text-align: center;
			line-height: 44rpx;
			background-color: #2B6DDD;
			color: #FFFFFF;
			font-size: 24rpx;
			border-top-right-radius: 21rpx;
			border-top-left-radius: 21rpx;
			border-bottom-left-radius: 21rpx;
			display: inline-block;
		}
		
		.question-title {
			margin-left: 8px;
			line-height: 25px;
			font-size: 34rpx;
			color: #333333;
			flex-wrap: wrap;
		}
	}
	.answer-list{
		display: -webkit-flex;
		margin-top: 40rpx;
		.options{
			font-size: 30rpx;
			color: #333333;
		}
		
	}
	// 切换题目
	.fixed-bottom {
		bottom: 0;
		width: 100%;
		position: fixed;
		background-color: #FFFFFF;
		.tab-box{
			display: -webkit-flex;
			justify-content: space-around;
			margin-bottom: 56rpx;
			.tab-answer{
				width: 246rpx;
				height: 72rpx;
				background: #FFFFFF!important;
				color: #666666;
				font-size: 28rpx;
				border: 1rpx solid #D8D8D8;
			}
			.tab-answer-bg{
				color: #2B6DDD;
				border: 1px solid #2B6DDD;
			}
		}
		.analysis-box{
			height: 42rpx;
			display: -webkit-flex;
			justify-content: flex-end;
			margin-bottom: 40rpx;
			.analysis-item{
				display: -webkit-flex;
				align-items: center;
				margin-right: 40rpx;
			}
			.analysis-img{
				width: 27rpx;
				height: 32rpx;
				margin-right: 5rpx;
			}
			.analysis-t{
				font-size: 30rpx;
				color: #2A91EB;
			}
		}
	}
	/* 解析 */
	.analysis-view{
		padding: 20rpx 30rpx;
		.analysis-answer{
			width: 100%;
			height: 96rpx;
			background: #F9F9F9;
			line-height: 96rpx;
			font-size: 34rpx;
			color: #333333;
			padding-left: 32rpx;
		}
		.analysis-subject{
			margin-top: 32rpx;
			margin-bottom: 32rpx;
			font-size: 30rpx;
			color: #333333;
			position: relative;
			padding-left: 16rpx;
		}
		.analysis-subject::before{
			content: "";
			width: 7rpx;
			height: 28rpx;
			background: #2B6DDD;
			border-radius: 4rpx;
			position: absolute;
			left: 0;
			top: 20%;
		}
		.analysis-word{
			font-size: 30rpx;
			color: #666666;
			line-height: 48rpx;
		}
	}
	
	/* -------- */
	
	.footer-box{
		height: 110rpx;
		align-items: center;
		justify-content: space-between;
		border-top: 1px solid rgba(0, 0, 0, 0.1);
		padding-left: 40rpx;
		padding-right: 40rpx;
	}
	.modal-btn{
		display: -webkit-flex;
		align-items: center;
		font-size: 28rpx;
	}
	.footer-img{
		width: 32rpx;
		height: 32rpx;
		margin-right: 2px;
	}
	.sub-bg{
		background: linear-gradient(270deg, #2B6DDD 0%, #2A91EB 100%);
		color: #FFFFFF;
	}
	
	/* 弹框 */
	.item-dialog{
		width: 100%;
		background-color: #FFFFFF;
		padding-left: 40rpx;
		padding-top: 24rpx;
		padding-bottom: 24rpx;
	}
	.margin-r{
		margin-right: 40rpx;
	}
	.item-box{
		margin-top: 30rpx;
	}
	.item-list{
		border-radius: 50%;
		margin-right: 38rpx;
		margin-bottom: 24rpx;
	}
	.bg-blue-t, .bg-black{
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		text-align: center;
		line-height: 80rpx;
		color: #666666;
		font-size: 24rpx;
		display:inline-block
	}
	.bg-blue-t{
		background-color: #E6F7FF;
		border: 1px solid #E6F7FF;
	}
	.bg-blue-t_index{
		border: 1px solid #2A91EB!important;
	}
	.bg-black{
		background-color: #FFFFFF;
		border: 1px solid #D8D8D8;
	}
	/* 提交弹框 */
	.popup-tooltip{
		display: -webkit-flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 43rpx;
	}
	.tooltip-img{
		width: 58rpx;
		height: 64rpx;
	}
	.tooltip-title{
		font-size: 34rpx;
		color: #333333;
		margin-left: 16rpx;
	}
	.popup-sum{
		margin-left: 64rpx;
		margin-right: 56rpx;
		border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
	}
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
	.see-box{
		padding-top: 32rpx;
		padding-bottom: 48rpx;
		text-align: center;
	}
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
</style>
