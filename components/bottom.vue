/**
 * 底部导航栏
 */
<template>
	<view class="bottom">
		<template v-if="enterpriseId !== '107934321265889280'">
			<view class="circle"></view>
			<view class="btn" @click="jumpPage('/pages/home/index')">
				<view class="btn-img">
					<image v-if="index==0" class="icon" src="@/static/img/bottom/index.png"></image>
					<image v-else class="icon" src="@/static/img/bottom/index-no.png"></image>
				</view>
				<text>首页</text>
			</view>
			<view class="btn" @click="jumpPage('/pages/index/index')">
				<view class="btn-img">
					<image v-if="index==1" class="icon" src="@/static/img/bottom/study.png"></image>
					<image v-else class="icon" src="@/static/img/bottom/study-no.png"></image>
				</view>
				<text>学习</text>
			</view>
			<view class="btn btnCenter">
				<view class="circle-inner">
					<image class="icon-plus" src="@/static/img/bottom/index-center.png"></image>
				</view>
			</view>
			<view class="btn">
				<view class="btn-img">
					<image class="icon" src="@/static/img/bottom/search-no.png"></image>
				</view>
				<text>发现</text>
			</view>
			<view class="btn" @click="jumpPage('/pages/main/index')">
				<view class="btn-img">
					<image v-if="index ==3" class="icon" src="@/static/img/bottom/main.png"></image>
					<image v-else  class="icon" src="@/static/img/bottom/main-no.png"></image>
				</view>
				<text>我的</text>
			</view>
			
		</template>
		<template  v-if="enterpriseId === '107934321265889280'" class="borrow">
			<view class="btn" @click="jumpPage('/pages/borrowBook/index/index')">
				<view class="btn-img">
					<image v-if="index==0" class="icon" src="@/static/img/bottom/index.png"></image>
					<image v-else class="icon" src="@/static/img/bottom/index-no.png"></image>
				</view>
				<text>首页</text>
			</view>
			<view class="btn" @click="jumpPage('/pages/main/index')">
				<view class="btn-img">
					<image v-if="index ==3" class="icon" src="@/static/img/bottom/main.png"></image>
					<image v-else  class="icon" src="@/static/img/bottom/main-no.png"></image>
				</view>
				<text>我的</text>
			</view>
		</template>
	</view>
</template>

<script>
	import tools from '@/utils/tools.js';
	export default{
		data() {
			return{
				index: 0,
				curRoute:'',
				enterpriseId:''
			}
		},
		async created() {
			let routes = getCurrentPages()
			let curRoute = routes[routes.length -1].route;
			this.curRoute = curRoute;
			if(curRoute == 'pages/home/index') {
				// 首页
				this.index = 0
			} else if(curRoute == 'pages/index/index') {
				// 学习
				this.index = 1
			} else if(curRoute == 'pages/main/index') {
				// 我的
				this.index = 3
			}
			//获取关联企业id
			this.enterpriseId = await tools.getStorage('enterpriseId')
			console.log('enterpriseId===='+this.enterpriseId)
			console.log(this.enterpriseId !== '107934321265889280')
		},
		methods: {
			jumpPage(path) {
				if(('/'+this.curRoute)==path){
					return
				}
				uni.redirectTo({
					url: path
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.bottom {
		width: 750rpx;
		height: 112rpx;
		padding-bottom: 44rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		position: relative;
		background: #FFFFFF;
		opacity: 1;
		padding-bottom: 44rpx;
		box-shadow: 3px 0 6px rgba(0,0,0,0.1);
		.btn {
			width: 20%;
			align-items: center;
			display: flex;
			flex-direction: column;
			font-size: 20rpx;
			font-family: PingFang SC-Medium, PingFang SC;
			font-weight: 500;
			color: #B7BDC9;
			.btn-img{
				display: flex;
				justify-content: center;
				margin-bottom: 5rpx;
			}
		}
		.btnCenter{
			
		}

		

		.icon {
			width: 36rpx;
			height: 36rpx;
		}
		.icon-plus {
			width: 128rpx;
			height: 128rpx;
		}
		.circle{
			position: fixed;
			bottom: 45rpx;
			width: 140rpx;
			height: 140rpx;
			border-radius: 70rpx;
			background: white;
			box-shadow: 3px 0 6px rgba(0,0,0,0.1);
			z-index:-1;
		}
		.circle-inner{
			margin-bottom: 28rpx;
			width: 140rpx;
			height: 140rpx;
			border-radius: 70rpx;
			background: white;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
</style>