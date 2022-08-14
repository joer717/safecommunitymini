<template>
	<view class="questionDetails">
		<navTop :showNav="true">错题板</navTop>
		<scroll-view scroll-y="true" :style="{height: phoneHeight + 'rpx'}">
			<view>
				<view class="question-list">
					<view class="question-list-title">
						<text class="question-type">{{questions.type == 1 ? '单选题' : questions.type == 2 ? '判断' : '多选题'}}</text>
						<text class='question-title'>{{questions.content}}</text>
					</view>
					<!--答案选择 - 单选-->
					<radio-group v-if="questions.type == 1">
						<label class="answer-list"
							v-for='(item, index) in questions.optionList' 
							:key='item.content' :data-index="index">
							<block v-if="questions.yourAnswer == ''">
								<image
									v-if="(questions.rightAnswer != questions.yourAnswer) && item.optionMark == questions.rightAnswer"
									class="btn-icon" src="@/static/img/examination/success-radio.png"></image>
								<text v-else class="btn-null"></text>
							</block>
							<block v-else>
								<block
									v-if="item.optionMark == questions.rightAnswer || item.optionMark == questions.yourAnswer">
									<image
										v-if="(questions.rightAnswer == questions.yourAnswer || questions.rightAnswer != questions.yourAnswer)&&item.optionMark == questions.rightAnswer"
										class="btn-icon" src="@/static/img/examination/success-radio.png"></image>
									<image
										v-if="(questions.rightAnswer != questions.yourAnswer)&&(item.optionMark == questions.yourAnswer)"
										class="btn-icon" src="@/static/img/examination/error-radio.png"></image>
								</block>
								<text v-else class="btn-null"></text>
							</block>
							<text class="options">{{item.optionMark}}、{{item.content}}</text>
						</label>
					</radio-group>
					<!--答案选择 - 多选-->
					<checkbox-group v-if="questions.type == 3">
						<label class="answer-list" v-for="(item, index) in questions.optionList"
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
						<view class="answer-word">答案 {{questions.rightAnswer}}</view>
						<view class="answer-error">您选择<text class="err">{{questions.yourAnswer}}</text></view>
					</view>
					<view class="analysis-subject">题目解析</view>
					<view class="analysis-word">{{questions.analysisContent}}</view>
				</view>
			</view>
		</scroll-view>
		<view id="fixed-bottom" class="fixed-bottom">
			<view class="footer-box" @click="deleteInfo">
				<image class="delete-icon" src="@/static/img/examination/delete.png"></image>
				<text class="footer-del">移除</text>
			</view>
		</view>
	</view>
</template>

<script>
	import navTop from "@/components/navTop.vue"
	export default{
		components: {
			navTop
		},
		data() {
			return {
				phoneHeight: 0,
				detailsId: {
					unitRecordId: '',
					paperPbId: ''
				},
				questions: {}
				
			}
		},
		async onLoad(options) {
			// 可使用窗口的高
			this.$nextTick(() => {
				let timeH = 0
				const query = uni.createSelectorQuery();
				query.select('#fixed-bottom').boundingClientRect(data => {
					timeH = data.height
					uni.getSystemInfo({
						success: (res) => {
							this.phoneHeight = (res.windowHeight*(750/res.windowWidth))- (timeH*(750/res.windowWidth)) - (getApp().globalData.navHeight)*(750/res.windowWidth)
						}
					})
				}).exec();
			})
			let item = JSON.parse(decodeURIComponent(options.item))
			// 错题集-查看原题
			let list = await this.$request(`exam/unitTrain/queryPaperPbInfo/${item.unitRecordId}/${item.paperPbId}`, {}, 'GET')
			console.log(list, "===list==")
			this.questions = list.data.body
			if (this.questions.type == 3) {
				let newRightAnswer = []
				let newYourAnswer = []
				// 正确答案
				newRightAnswer = this.questions.rightAnswer.split('、')
				this.questions.optionList.forEach(list => {
					if(newRightAnswer.includes(list.optionMark)) {
						list.isRight = 1
					} else {
						list.isRight = 2
					}
				})
				// // 选中答案
				// if (this.questions.yourAnswer != '') {
				// 	newYourAnswer = this.questions.yourAnswer.split('、')
				// 	console.log("arrayIsEqual=》",this.arrayIsEqual(newRightAnswer, newYourAnswer))
				// 	console.log('newYourAnswer', newYourAnswer)
				// 	// 两数组相同，说明答案正确
				// 	if(this.arrayIsEqual(newRightAnswer, newYourAnswer)) {
				// 		console.log("两数组相同")
				// 		this.questions.optionList.forEach((list, i) => {
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
				// 		this.questions.optionList.forEach((list, i) => {
				// 			if (newRightAnswer.includes(list.optionMark)) {
				// 				list.isRight = 0
				// 			} else {
				// 				list.isRight = 2
				// 			}
				// 		})
				// 	}
				// } else {
				// 	this.questions.optionList.forEach((list, i) => {
				// 		if (newRightAnswer.includes(list.optionMark)) {
				// 			list.isRight = 1
				// 		} else {
				// 			list.isRight = 2
				// 		}
				// 	})
				// }
			}
			
		},
		methods: {
			deleteInfo() {
				wx.showModal({
					title: '提示',
					content: '您确定要移除此题吗？',
					success: (e) => {
						console.log(e)
						if(e.confirm) {
							console.log('确认')
							this.deleteDataInfo()
						}
					}
				})
				
			},
			// 错题集-查看原题-移除
			async deleteDataInfo() {
				let list = await this.$request("exam/unitTrain/delWrongRecord/"+this.questions.paperPbId, {}, 'DELETE')
				console.log(list, "===list==")
				if(list.data.status == 200) {
					uni.showLoading({
						title: list.data.message
					})
					setTimeout(() => {
						let pages = getCurrentPages()
						let beforePage = pages[pages.length -2]
						beforePage.$vm.reFresh = Math.random()
						uni.navigateBack({
							delta: 1
						})
					}, 1000)
				} else {
					uni.showLoading({
						title: list.data.message
					})
				}
			},
			arrayIsEqual(array1,array2) {
				return array1.length==array2.length && array1.every(function(v,i) { return v === array2[i]});
			}
		}
	}
</script>
<style>
	.answer-list checkbox .wx-checkbox-input {
		border-radius: 50% !important;
	}
</style>

<style lang="scss" scoped>
	.questionDetails{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
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
		}
	}
	.answer-list{
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
		.options{
			flex: 1;
			font-size: 30rpx;
			color: #333333;
		}
	}
	/* 解析 */
	.analysis-view{
		padding: 20rpx 30rpx;
		.analysis-answer{
			width: 100%;
			height: 96rpx;
			background: #F9F9F9;
			display: -webkit-flex;
			align-items: center;
			padding-left: 32rpx;
			.answer-word{
				font-size: 34rpx;
				color: #333333;
			}
			.answer-error{
				font-size: 34rpx;
				color: #999999;
				margin-left: 56rpx;
				.err{
					color: #EA4328;
					margin-left: 10rpx;
				}
			}
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
	// 移除
	.fixed-bottom {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 110rpx;
		background-color: #FFFFFF;
		border-top: 1rpx solid rgba(0, 0, 0, 0.1);
		.footer-box{
			height: 100%;
			display: -webkit-flex;
			align-items: center;
			justify-content: flex-end;
			padding-right: 40rpx;
			.delete-icon{
				width: 32rpx;
				height: 32rpx;
			}
			.footer-del{
				font-size: 30rpx;
				color: #333333;
				margin-left: 10rpx;
			}
		}
	}
	
</style>