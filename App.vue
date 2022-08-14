<script>
	import request from '@/api/request.js'
	export default {	
		globalData: {
			statusBarHeight: 0, // 状态导航栏高度
			navHeight: 0, // 总体高度
			navigationBarHeight: 0, // 导航栏高度(标题栏高度)
			capsuletop: 0,
			capsuleheight: 0,
			request:'',
			questionList: [],
			cardArr: [],
			listQuestions: {},
			phoneHeight:0,
			getUserInfo: {} // 用户信息
		},
		onLaunch: function() {
			// 状态栏高度
			this.globalData.statusBarHeight = uni.getSystemInfoSync().statusBarHeight
			// #ifdef MP-WEIXIN
			// 获取微信胶囊的位置信息 width,height,top,right,left,bottom
			const custom = wx.getMenuButtonBoundingClientRect()
			this.globalData.capsuletop = wx.getMenuButtonBoundingClientRect().top
			this.globalData.capsuleheight = wx.getMenuButtonBoundingClientRect().height
			// 导航栏高度(标题栏高度) = 胶囊高度 + (顶部距离 - 状态栏高度) * 2
			this.globalData.navigationBarHeight = custom.height + (custom.top - this.globalData.statusBarHeight) * 2

			// 总体高度 = 状态栏高度 + 导航栏高度
			this.globalData.navHeight = this.globalData.navigationBarHeight + this.globalData.statusBarHeight
			
			this.globalData.request = request
			
			// 可使用窗口的高
			uni.getSystemInfo({
				success: (res) => {
					this.globalData.phoneHeight = (res.windowHeight*(750/res.windowWidth)) - (this.globalData.navHeight)*(750/res.windowWidth)
				}
			})				
			// #endif
			
		}
	}
</script>

<style>
	/*每个页面公共css */
	.ns {
		width: 100%;
		height: 135rpx;
		text-align: center;
		line-height: 155rpx;
		color: rgba(0, 0, 0, 1);
		font-weight: bold;
		background: linear-gradient(to right, rgba(222, 219, 253, 1), rgba(222, 219, 253, 0));
	}
	#app{
		background: linear-gradient(to right, rgba(222, 219, 253, 1), rgba(222, 219, 253, 0));
	}
</style>
