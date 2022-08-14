<template>
	<view class="analysis">
		<navTop :showNav="true">{{unitData.unitName}}</navTop>
		<scroll-view scroll-y="true" :style="{height: phoneHeight + 'rpx'}">
			<view>
				<view class="question-list">
					<view class="question-list-title">
						<text
							class="question-type">{{questions[newArr[tags]].type == 1 ? '单选题' : questions[newArr[tags]].type == 2 ? '判断' : '多选题'}}</text>
						<text class='question-title'>{{questions[newArr[tags]].content}}</text>
					</view>
					<!--答案选择 - 单选、判断-->
					<radio-group v-if="questions[newArr[tags]].type != 3">
						<label class="answer-list" v-for='(item, index) in questions[newArr[tags]].optionList'
							:key='item.content' :data-index="index">
							<block v-if="questions[newArr[tags]].yourAnswer == ''">
								<image
									v-if="(questions[newArr[tags]].rightAnswer != questions[newArr[tags]].yourAnswer) && item.optionMark == questions[newArr[tags]].rightAnswer"
									class="btn-icon" src="@/static/img/examination/success-radio.png"></image>
								<text v-else class="btn-null"></text>
							</block>
							<block v-else>
								<block
									v-if="item.optionMark == questions[newArr[tags]].rightAnswer || item.optionMark == questions[newArr[tags]].yourAnswer">
									<image
										v-if="(questions[newArr[tags]].rightAnswer == questions[newArr[tags]].yourAnswer || questions[newArr[tags]].rightAnswer != questions[newArr[tags]].yourAnswer)&&item.optionMark == questions[newArr[tags]].rightAnswer"
										class="btn-icon" src="@/static/img/examination/success-radio.png"></image>
									<image
										v-if="(questions[newArr[tags]].rightAnswer != questions[newArr[tags]].yourAnswer)&&(item.optionMark == questions[newArr[tags]].yourAnswer)"
										class="btn-icon" src="@/static/img/examination/error-radio.png"></image>
								</block>
								<text v-else class="btn-null"></text>
							</block>
							<text class="options">{{item.optionMark}}、{{item.content}}</text>
						</label>
					</radio-group>
					<!--答案选择 - 多选-->
					<checkbox-group v-if="questions[newArr[tags]].type == 3">
						<label class="answer-list" v-for="(item, index) in questions[newArr[tags]].optionList"
							:data-index="index" :key='item.name'>
							<image v-if="item.isRight == 1" class="btn-icon"
								src="@/static/img/examination/success-radio.png"></image>
							<text v-else class="btn-null"></text>
							<text class="options checkboxes">{{item.optionMark}}、{{item.content}}</text>
						</label>
					</checkbox-group>
				</view>
				<!-- 解析 -->
				<view class="analysis-view">
					<view class="analysis-answer">
						<view class="answer-word">答案 {{questions[newArr[tags]].rightAnswer}}</view>
						<view class="answer-error">您选择<text
								class="err">{{questions[newArr[tags]].yourAnswer == '' ? '--' : questions[newArr[tags]].yourAnswer}}</text>
						</view>
					</view>
					<view class="analysis-subject">题目解析</view>
					<view class="analysis-word">{{questions[newArr[tags]].analysisContent}}</view>
				</view>
			</view>
		</scroll-view>
		<view id="fixed-bottom" class="fixed-bottom">
			<view style="height: 105px;background-color: #FFFFFF;">
				<view class="tab-box">
					<button class="tab-answer cu-btn round shadow" :class="toPointN == 1 ? 'tab-answer-bg' : ''"
						@click='beforeQuestion'>上一题</button>
					<button class="tab-answer cu-btn round shadow" :class="toPointN == 2 ? 'tab-answer-bg' : ''"
						@click='nextQuestion'>下一题</button>
				</view>
			</view>
			<view class="footer-box flex  bg-white">
				<view class="modal-btn" @click="showModal">
					<image class="footer-img" src="@/static/img/examination/lujing.png"></image>
					{{tags+1}}/{{newArr.length}}
				</view>
			</view>
		</view>
		<!-- 答题卡 -->
		<uni-popup ref="popup" type="bottom" background-color="#fff">
			<view class="item-dialog">
				<view class="cu-bar margin-r">
					<view class="modal-btn">
						<image class="footer-img" src="@/static/img/examination/lujing.png"></image>
						{{tags+1}}/{{newArr.length}}
					</view>
				</view>
				<view class="item-box">
					<view v-for='(item, index) in cardArr' class="item-list bg-blue-t" :key="index"
						:class="tags == index ? ' bg-blue-t_index' : ''" :data-index="index" @click="cardClick"
						style='display:inline-block'>
						{{index+1}}
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import navTop from "@/components/navTop.vue"
	export default {
		components: {
			navTop
		},
		data() {
			return {
				unitData: {
					unitName: '',
					unitRecordId: ''
				},
				phoneHeight: 0,
				questions: [], //题库
				tags: 0, //题目标识
				newArr: [], //随机数数组
				cardArr: [], //答题卡数组
				cardIndex: 0, //答题卡序号
				radioValue: '', // 单选答案
				checkValue: [], // 多选答案
				choosed: [],
				toPointN: 0 // 切换题
			}
		},
		async onLoad(options) {
			console.log(JSON.parse(decodeURIComponent(options.obj)))
			let option = JSON.parse(decodeURIComponent(options.obj))
			this.unitData.unitName = option.unitName
			this.unitData.unitRecordId = option.unitRecordId
			this.$nextTick(() => {
				let fH = 0
				const query = uni.createSelectorQuery();
				query.select('#fixed-bottom').boundingClientRect(fB => {
					fH = fB.height
					// 可使用窗口的高
					uni.getSystemInfo({
						success: (res) => {
							this.phoneHeight = (res.windowHeight * (750 / res
								.windowWidth)) - (fH * (750 / res
									.windowWidth)) - (getApp().globalData.navHeight) * (
									750 / res.windowWidth);
						}
					})
				}).exec();
			})
			// 单元训练做题提交后-查看解析
			let list = await this.$request(`/exam/unitTrain/lookUpPaperAnalysis/${this.unitData.unitRecordId}`, {},
				'GET')
			this.questions = list.data.body
			console.log('questions', this.questions);
			var oldArr = [];
			var cardArr = [];
			for (let i = 0; i < this.questions.length; i++) {
				oldArr.push(i); //创建一个新的数组用作索引
				cardArr.push(true); //创建答题卡数组
			}
			this.cardArr = cardArr
			this.newArr = oldArr
			this.questions.forEach(item => {
				if (item.type == 3) {
					let newRightAnswer = []
					let newYourAnswer = []
					// 正确答案
					newRightAnswer = item.rightAnswer.split('、')
					item.optionList.forEach(list => {
						if(newRightAnswer.includes(list.optionMark)) {
							list.isRight = 1
						} else {
							list.isRight = 2
						}
					})
					// // 选中答案
					// if (item.yourAnswer != '') {
					// 	newYourAnswer = item.yourAnswer.split('、')
					// 	console.log("arrayIsEqual=》",this.arrayIsEqual(newRightAnswer, newYourAnswer))
					// 	console.log('newYourAnswer', newYourAnswer)
					// 	// 两数组相同，说明答案正确
					// 	if(this.arrayIsEqual(newRightAnswer, newYourAnswer)) {
					// 		console.log("两数组相同")
					// 		item.optionList.forEach((list, i) => {
					// 			if (newRightAnswer.includes(list.optionMark)) {
					// 				list.isRight = 1
					// 			} else {
					// 				list.isRight = 2
					// 			}
					// 		})
					// 		return
					// 	} else {
					// 		console.log('数组不同')
					// 		// 数组不同，答错  是正确答案的为错误标志，不是正确答案为空  0：错误 1：正确 2：空
					// 		item.optionList.forEach((list, i) => {
					// 			if (newRightAnswer.includes(list.optionMark)) {
					// 				list.isRight = 0
					// 			} else {
					// 				list.isRight = 2
					// 			}
					// 		})
					// 	}
					// } else {
					// 	item.optionList.forEach((list, i) => {
					// 		if (newRightAnswer.includes(list.optionMark)) {
					// 			list.isRight = 1
					// 		} else {
					// 			list.isRight = 2
					// 		}
					// 	})
					// }
				}
			})
			console.log('questions', this.questions);
		},
		methods: {
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
				}
			},
			cardClick(res) {
				const cardIndex = res.currentTarget.dataset.index;
				this.tags = cardIndex
				this.$refs.popup.close()
			},
			showModal() { //显示关闭答题卡
				this.$refs.popup.open('bottom')
			},
			arrayIsEqual(array1,array2) {
				console.log('arr===>',array1, array2)
				return array1.length==array2.length && array1.every(function(v,i) { return v === array2[i]});
			}
		}
	}
</script>

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

		.question-type {
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
		}
	}

	.answer-list {
		display: -webkit-flex;
		margin-top: 40rpx;

		.btn-icon,
		.btn-null {
			width: 48rpx;
			height: 48rpx;
			margin-right: 8rpx;
		}

		.btn-null {
			border: 1rpx solid #999999;
			border-radius: 50%;
		}
		.btn-check-null{
			border: 1rpx solid #999999;
			border-radius: 4rpx;
		}

		.options {
			flex: 1;
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

		.tab-box {
			display: -webkit-flex;
			justify-content: space-around;
			margin-bottom: 56rpx;

			.tab-answer {
				width: 246rpx;
				height: 72rpx;
				background: #FFFFFF !important;
				color: #666666;
				font-size: 28rpx;
				border: 1rpx solid #D8D8D8;
			}

			.tab-answer-bg {
				color: #2B6DDD;
				border: 1px solid #2B6DDD;
			}
		}

		.analysis-box {
			height: 42rpx;
			display: -webkit-flex;
			justify-content: flex-end;
			margin-bottom: 40rpx;

			.analysis-item {
				display: -webkit-flex;
				align-items: center;
				margin-right: 40rpx;
			}

			.analysis-img {
				width: 27rpx;
				height: 32rpx;
				margin-right: 5rpx;
			}

			.analysis-t {
				font-size: 30rpx;
				color: #2A91EB;
			}
		}
	}

	/* 解析 */
	.analysis-view {
		padding: 20rpx 30rpx;

		.analysis-answer {
			width: 100%;
			height: 96rpx;
			background: #F9F9F9;
			display: -webkit-flex;
			align-items: center;
			padding-left: 32rpx;

			.answer-word {
				font-size: 34rpx;
				color: #333333;
			}

			.answer-error {
				font-size: 34rpx;
				color: #999999;
				margin-left: 56rpx;

				.err {
					color: #EA4328;
					margin-left: 10rpx;
				}
			}
		}

		.analysis-subject {
			margin-top: 32rpx;
			margin-bottom: 32rpx;
			font-size: 30rpx;
			color: #333333;
			position: relative;
			padding-left: 16rpx;
		}

		.analysis-subject::before {
			content: "";
			width: 7rpx;
			height: 28rpx;
			background: #2B6DDD;
			border-radius: 4rpx;
			position: absolute;
			left: 0;
			top: 20%;
		}

		.analysis-word {
			font-size: 30rpx;
			color: #666666;
			line-height: 48rpx;
		}
	}

	/* -------- */

	.footer-box {
		height: 110rpx;
		align-items: center;
		justify-content: space-between;
		border-top: 1px solid rgba(0, 0, 0, 0.1);
		padding-left: 40rpx;
		padding-right: 40rpx;
	}

	.modal-btn {
		display: -webkit-flex;
		align-items: center;
		font-size: 28rpx;
	}

	.footer-img {
		width: 32rpx;
		height: 32rpx;
		margin-right: 2px;
	}

	.sub-bg {
		background: linear-gradient(270deg, #2B6DDD 0%, #2A91EB 100%);
		color: #FFFFFF;
	}

	/* 弹框 */
	.item-dialog {
		width: 100%;
		background-color: #FFFFFF;
		padding-left: 40rpx;
		padding-top: 24rpx;
		padding-bottom: 24rpx;
	}

	.margin-r {
		margin-right: 40rpx;
	}

	.item-box {
		margin-top: 30rpx;
	}

	.item-list {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		text-align: center;
		line-height: 80rpx;
		color: #666666;
		font-size: 24rpx;
		margin-right: 38rpx;
		margin-bottom: 24rpx;
	}

	.bg-blue-t {
		background-color: #E6F7FF;
		border: 1px solid #E6F7FF;
	}
	.bg-blue-t_index{
		border: 1px solid #2A91EB!important;
	}

	.bg-black {
		background-color: #FFFFFF;
		border: 1px solid #D8D8D8;
	}

	/* 提交弹框 */
	.popup-tooltip {
		display: -webkit-flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 43rpx;
	}

	.tooltip-img {
		width: 58rpx;
		height: 64rpx;
	}

	.tooltip-title {
		font-size: 34rpx;
		color: #333333;
		margin-left: 16rpx;
	}

	.popup-sum {
		margin-left: 64rpx;
		margin-right: 56rpx;
		border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
	}

	.popup-sum-list {
		display: -webkit-flex;
		align-items: center;
		margin-bottom: 30rpx;
		color: #333333;
		font-size: 28rpx;
	}

	.popup-sum-title {
		width: 140rpx;
		font-size: 28rpx;
		color: #666666;
		text-align: right;
		margin-right: 16rpx;
	}

	.see-box {
		padding-top: 32rpx;
		padding-bottom: 48rpx;
		text-align: center;
	}

	.see-btn {
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
