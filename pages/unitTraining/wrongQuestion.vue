<template>
	<view class="wrongQuestion">
		<navTop :showNav="true">错题板</navTop>
		<view class="section-scroll" :style="{minHeight: phoneHeight + 'rpx'}">
			<view class="question-boxs" @click="jump(item)"
				v-for="item in wrongListData" :key="item.paperPbId">
				<view class="question-list">
					<text class="question-type">{{item.typeName}}</text>
					<text class='question-title'>{{item.content}}</text>
				</view>
				<text class="question-date">{{item.answerTime}}</text>
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
				reFresh: '',
				phoneHeight: 0,
				wrongData: {
					pageNo: 1,
					pageSize: 10
				},
				totalPage: 0, // 总页数
				wrongListData: []
			}
		},
		watch: {
			reFresh: function(){
				this.wrongListInfo()
			}
		},
		async onLoad() {
			// 可使用窗口的高
			uni.getSystemInfo({
				success: (res) => {
					this.phoneHeight = (res.windowHeight*(750/res.windowWidth)) - (getApp().globalData.navHeight)*(750/res.windowWidth)
				}
			})
			uni.showNavigationBarLoading()
			this.wrongListInfo()
		},
		onReachBottom() {
			uni.showNavigationBarLoading()
			this.wrongData.pageNo++;
			if(this.wrongData.pageNo > this.totalPage) {
				uni.hideNavigationBarLoading()
				uni.showToast({
					title: '暂无更多数据'
				})
			} else {
				this.wrongListInfo()
			}
		},
		methods: {
			// 查看错题集
			async wrongListInfo() {
				let list = await this.$request(`exam/unitTrain/queryWrongRecordInfo/${this.wrongData.pageNo}/${this.wrongData.pageSize}`, {}, 'GET')
				console.log(list, "===list==")
				let data = list.data.body
				this.totalPage = data.pages
				if(this.wrongData.pageNo == 1) {
					this.wrongListData = data.list
				} else {
					this.wrongListData = this.wrongListData.concat(data.list)
				}
				uni.hideNavigationBarLoading()
			},
			jump(item) {
				uni.navigateTo({
					url: "/pages/unitTraining/children/questionDetails?item=" + encodeURIComponent(JSON.stringify(item))
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrongQuestion{
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.section-scroll{
		background-color: #ECEEF4;
		
	}
	.question-boxs{
		margin-top: 24rpx;
		margin-left: 40rpx;
		margin-right: 40rpx;
		background-color: #FFFFFF;
		box-shadow: 0px 6rpx 10rpx 1rpx rgba(0, 0, 0, 0.16);
		border-radius: 12rpx;
		&:last-child{
			margin-bottom: 40rpx;
		}
	}
	.question-list {
		padding: 24rpx 32rpx;
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
			font-size: 30rpx;
			color: #333333;
		}
	}
	.question-date{
		display: inline-block;
		font-size: 28rpx;
		font-weight: 500;
		color: #999999;
		height: 52rpx;
		line-height: 52rpx;
		padding-left: 32rpx;
		padding-right: 32rpx;
		padding-bottom: 24rpx;
	}
</style>