<!-- 单元训练 -->
<template>
	<view class="unitTraining">
		<navTop :showNav="false">单元训练</navTop>
		<view class="train-conter" :style="{height: phoneHeight + 'rpx'}">
			<view class="top-cover" id="top-box">
				<view class="top">
					<input type="text" value="" placeholder="请输入想要搜索的内容">
				</view>
			</view>
			<view class="down">
				<scroll-view class="left" scroll-y="true">
					<view class="item" v-for="(item, index) in queryUnitData" :key="item.unitTypeId"
						@click="clickTab(index)">
						<text class="item-word" :class="queryIndex == index ? 'item-word-on' : ''">{{item.unitTypeName}}</text>
					</view>
				</scroll-view>
				
				<view class="right">
					<view class="page-section-spacing">
						<scroll-view class="scroll-view_H" scroll-x="true" bindscroll="scroll" style="width: 100%">
							<view id="demo1" class="scroll-view-item_H demo-text-1" :class="childIndex == key ? 'scroll-view-item_H_bg' : ''"
							 v-for="(list, key) in queryUnitData[queryIndex].levelTwoUnitType" 
							 :key="list.unitTypeId" @click="clickChildTab(key, list)">{{list.unitTypeName}}</view>
						</scroll-view>
					</view>
					<view class="page-content">
						<!-- <view class="list-boxs" > -->
							<view class="train-lists" v-for="item in queryListData" :key="item.unitId" @click="goQuestion(item)">
								<text>{{item.unitName}}</text>
								<image src="@/static/img/unitTraining/right.png"></image>
							</view>
						<!-- </view> -->
					</view>
				</view>
			</view>
		</view>
		<view class="wrong-question" @click="jump">
			<image src="@/static/img/unitTraining/wrongQ.png"></image>
			<text>错题板</text>
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
				leftHeight: 0,
				queryUnitData: [], // 单元分类【一、二级】
				queryIndex: 0, // 一级选中
				childIndex: 0, // 二级选中
				unitInfoUserQuery: {
					pageNo: 1,
					pageSize: 100,
					unitName: "", // 单元训练名称
					unitTypeId: 0 // 单元分类ID:查询使用
				},
				queryListData: [] // 单元训练列表
			}
		},
		async onLoad() {
			// 可使用窗口的高
			uni.getSystemInfo({
				success: (res) => {
					this.phoneHeight = (res.windowHeight*(750/res.windowWidth)) - (getApp().globalData.navHeight)*(750/res.windowWidth)
				}
			})
			this.$nextTick(() => {
				const query = uni.createSelectorQuery();
				query.select('#top-box').boundingClientRect(data => {
					let fH = data.height
					// 可使用窗口的高
					uni.getSystemInfo({
						success: (res) => {
							this.leftHeight = (res.windowHeight*(750/res.windowWidth)) - (fH * (750 / res.windowWidth)) - (getApp()
								.globalData.navHeight) * (750 / res.windowWidth);
						}
					})
				}).exec();
			})
			// 全部单元分类一二级
			let list = await this.$request('exam/unitTrain/queryUnitType', {},'GET')
			console.log(list, "===examList==")
			this.queryUnitData = list.data.body
			this.clickTab(0)
		},
		onReachBottom() {
			uni.showNavigationBarLoading()
			this.unitInfoUserQuery.pageNo++;
			if(this.unitInfoUserQuery.pageNo > this.totalPage) {
				uni.hideNavigationBarLoading()
				uni.showToast({
					title: '暂无更多数据'
				})
			} else {
				this.queryUnitDataInfo()
			}
		},
		methods: {
			// 一级标签切换
			clickTab(index) {
				this.queryIndex = index
				this.queryListData = []
				if(this.queryUnitData[index].levelTwoUnitType && this.queryUnitData[index].levelTwoUnitType.length > 0) {
					this.clickChildTab(0, this.queryUnitData[index].levelTwoUnitType[0])
				}
			},
			// 二级标签切换
			clickChildTab(index, list) {
				this.childIndex = index
				this.unitInfoUserQuery.unitTypeId = list.unitTypeId
				uni.showNavigationBarLoading()
				this.queryUnitDataInfo()
			},
			// 查询单元训练列表
			async queryUnitDataInfo() {
				let list = await this.$request('exam/unitTrain/queryUnitInfo', this.unitInfoUserQuery, 'POST')
				console.log(list, "===examList==")
				let data = list.data.body
				this.totalPage = data.pages
				if(this.unitInfoUserQuery.pageNo == 1) {
					this.queryListData = data.list
				} else {
					this.queryListData = this.queryListData.concat(data.list)
				}
				uni.hideNavigationBarLoading()
			},
			goQuestion(item) {
				uni.navigateTo({
					url: "/pages/unitTraining/question?item=" + encodeURIComponent(JSON.stringify(item))
				})
			},
			// 错题板
			jump() {
				uni.navigateTo({
					url: "/pages/unitTraining/wrongQuestion"
				})
			}
		}
	}
	
	
</script>

<style scoped lang="scss">
	.unitTraining {
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		
	}
	.train-conter{
		background-color: #F3F5F9;
		display: flex;
		flex-direction: column;
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
	}
	.down {
		width: 750rpx;
		flex: 1;
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
			border-top-left-radius: 20rpx;
			.item {
				width: 174rpx;
				height: 100rpx;
				line-height: 100rpx;
				text-align: center;
				position: relative;
				.item-word{
					width: 100%;
					font-size: 24rpx;
					font-family: PingFang SC-Medium, PingFang SC;
					font-weight: 500;
					color: #333333;
					display: inline-block;
					white-space:nowrap;
					overflow:hidden;
					text-overflow:ellipsis;
				}
				.item-word-on{
					color: #2B6DDD;
					background-color: #F8F8FA;
					&::before {
						content: "";
						width: 6rpx;
						height: 60rpx;
						background: #2B6DDD;
						border-top-right-radius: 6rpx;
						border-bottom-right-radius: 6rpx;
						position: absolute;
						left: 0;
						top: 20%;
					}
				}
			}
		}
	
		.right {
			width: 552rpx;
			display: -webkit-flex;
			flex-direction: column;
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
					padding-left: 10rpx;
					padding-right: 10rpx;
					height: 50rpx;
					margin-right: 17rpx;
					display: inline-block;
					text-align: center;
					line-height: 50rpx;
					background: #E8EAEC;
					border-radius: 8rpx;
					color: #666666;
					font-size: 24rpx;
				}
				.scroll-view-item_H_bg{
					color: #2B6DDD;
					background-color: rgba(23, 153, 255, 0.1);
				}
			}
			.page-content{
				width: calc(100% - 196rpx);
				overflow-y: auto;
				position: fixed;
				left: 196rpx;
				top:170px;
				bottom: 0;
			}
			// .list-boxs{
			// 	// flex: 1;
			// 	height: 500rpx;
			// }
			.train-lists{
				margin-right: 40rpx;
				background-color: #FFFFFF;
				border-radius: 12rpx;
				padding: 32rpx 24rpx;
				display: -webkit-flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 24rpx;
				text{
					font-size: 32rpx;
					font-family: PingFang SC-Medium, PingFang SC;
					font-weight: 500;
					color: #333333;
				}
				image{
					width: 12rpx;
					height: 24rpx;
				}
			}
		}
	}
	// 错题板
	.wrong-question{
		position: fixed;
		right: 24rpx;
		bottom: 271rpx;
		width: 200rpx;
		height: 80rpx;
		background: #FFFFFF;
		box-shadow: 0px 3rpx 6rpx 1rpx rgba(0, 0, 0, 0.16);
		border-radius: 50rpx;
		display: -webkit-flex;
		align-items: center;
		justify-content: center;
		z-index: 10;
		image{
			width: 34rpx;
			height: 40rpx;
		}
		text{
			font-size: 28rpx;
			font-family: PingFang SC-Medium, PingFang SC;
			font-weight: 500;
			color: #666666;
			margin-left: 19rpx;
		}
	}
</style>