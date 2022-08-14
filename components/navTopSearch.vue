<template>
	<view class="navTopCover" :style="{ height: navtop + 'px' }">
		<view v-if="showNav" class="navTopPlaceholder" :style="{ height: navtop + 'px' }">
			<view class="navLeftWord" :style="{ top:capsuletop + 'px',lineHeight:capsuleheight + 'px' }">
				<view class="hotclick" @click="backPage()" :style="{ top:capsuletop + 'px' }">
					<image  src="@/static/img/common/arrow.png" mode=""></image>
				</view>
				<slot></slot>
			</view>
		</view>	
		<view v-else class="navTop" :style="{ height: navtop + 'px' }">
			<block v-if="showArrow">
				<view class="arrow" :style="{ top:capsuletop + 'px',lineHeight:capsuleheight + 'px' }">
					<image  src="@/static/img/common/arrow.png" mode=""></image>
				</view>
				<view class="hotclick" @click="backPage()" :style="{ top:capsuletop + 'px' }">
					
				</view>				
			</block>
			<view class="navTopWord" :style="{ top:capsuletop + 'px',lineHeight:capsuleheight + 'px' }">
				<slot></slot>
			</view>
		</view>	
		
	</view>
</template>

<script>
	export default {
		props: {
			showNav: {
				type: Boolean,
				value: false
			},
			showModel: {
				type: Boolean,
				value: false
			},
			listQuestions: Object,
			questionList: Object,
			cardArr: Array
		},
		data() {
			return {
				navtop: 100,
				capsuletop: 100,
				capsuleheight:100,
				showArrow:0
			}
		},
		mounted(){
			this.navtop = getApp().globalData.navHeight;
			this.capsuletop = getApp().globalData.capsuletop;
			this.capsuleheight = getApp().globalData.capsuleheight;
			this.showArrow = getCurrentPages().length-1;	
		},
		methods:{

			backPage(){
				if(this.showModel) {
					// uni.showModal({
					// 	title: '提示',
					// 	content: '您已参加考试，确认是否退出？',
					// 	success: (e) => {
					// 		console.log(e)
					// 		if(e.confirm) {
					// 			getApp().globalData.questionList = this.questionList
					// 			getApp().globalData.cardArr = this.cardArr
					// 			getApp().globalData.listQuestions = this.listQuestions
					// 			uni.navigateBack({
					// 				delta:1
					// 			})
					// 		}
					// 	}
					// })
				} else {
					uni.navigateBack({
						delta:1
					})
				}

			}
		}
	}
</script>

<style scoped lang="scss">
	.navTopCover{
		width: 750rpx;
		z-index: 999!important;
		.navTopPlaceholder{
			width: 750rpx;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 10;
			color: rgba(0, 0, 0, 1);
			background: linear-gradient(to right, rgba(222, 219, 253, 1), rgba(222, 219, 253, 0));		
		}
	}
	.navLeftWord{
		position: fixed;
		left: 0;
		right: 0;
		
		top: 100rpx;
		display: -webkit-flex;
		align-items: center;
		.hotclick{
			width: 90rpx;
			height: 60rpx;
		}
		image{
			width: 18rpx;
			height: 34rpx;
			margin-left: 40rpx;
			margin-right: 20rpx;
		}
	}
	.navTop{
		width: 750rpx;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 10;
		text-align: center;
		color: rgba(0, 0, 0, 1);
		font-weight: bold;
		background: linear-gradient(to right, rgba(222, 219, 253, 1), rgba(222, 219, 253, 0));		
		.hotclick{
			position: absolute;
			width: 90rpx;
			height: 60rpx;
			left: 0rpx;
			z-index: 100;
		}
		.arrow{
			width: 18rpx;
			height: 34rpx;
			position: absolute;
			left: 30rpx;
			bottom: 0;
			image{
				width: 18rpx;
				height: 34rpx;
			}
		}
		
	
		.navTopWord{
			position: fixed;
			left: 0;
			right: 0;
			height: 60rpx;
			top: 100rpx;
			margin: auto;
		}
	}
	
</style>