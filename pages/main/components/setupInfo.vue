<template>
	<view class="set-up-inof" :style="{height: scheight + 'px'}">
		<navTop :showNav="false" id="topCover">{{setType === '1'?'设置用户名':'设置个性签名'}}</navTop>
		<input v-if="setType === '1'" class="set-up-btn" v-model="setValue"  maxlength="20" focus placeholder="请输入名字" />
		<textarea class="set-up-btn2" v-if="setType === '2'" v-model="setValue" />
		<button  class="save-name" @click="saveInfo(setType)">保存</button>
		<view class="set-warning">
			<text class="text2 warn-text">温馨提示：</text>
			<view v-if="setType === '1'" >
				<text class="text3 warn-text">1. 用户名的长度不超过20</text>
				<text class="text3 warn-text">2. 不支持特殊字符和表情</text>
				<text class="text3 warn-text">3. 半年内只能修改一次</text>
			</view>
			<view v-else>
				<text class="text3 warn-text">1. 个性签名长度不超过200</text>
			</view>
		</view>
	</view>
</template>

<script>
	import navTop from "@/components/navTop.vue"
	export default {
		components: {
			navTop
		},
		data(){
			return{
				setValue:'',
				setType:'',
				phoneHeight:'',
				scheight:'',
				userInfo:{}
			}
		},
		onLoad(option) {
			var that = this;
			this.userInfo = getApp().globalData.getUserInfo
			console.log('userInfo--->', that.userInfo)
			that.setValue = option.setValue
			that.setType = option.setType
			// 可使用窗口的高
			that.phoneHeight = getApp().globalData.phoneHeight;
			//创建节点选择器
			uni.createSelectorQuery().select('#topCover').boundingClientRect(function (rect) {
				that.scheight = Math.round(that.phoneHeight/2) + rect.height
			}).exec();	
		},
		methods:{
			// 修改用户名、个性签名
			async updateUserName(value,setType) {
				if(setType == '1') {
					// 用户名
					let list = await this.$request('authcenter/appUser/updateUserName', {
						userName: value
					}, 'POST')
					if(list.data.status == 200) {
						this.userInfo.userName = value
						getApp().globalData.getUserInfo = this.userInfo
						uni.navigateTo({
							url: `/pages/main/setUp`
						})
					}
					uni.showToast({
						title: list.data.message,
						icon: 'none',
						duration: 2000
					})
				} else if(setType == '2') {
					// 个性签名
					let list = await this.$request('authcenter/appUser/updateUserSignature', {
						personalSignature: value
					}, 'POST')
					if(list.data.status == 200) {
						this.userInfo.persionalSignture = value
						getApp().globalData.getUserInfo = this.userInfo
						uni.navigateBack({
								delta:1,//返回层数，2则上上页
						})
					}
					uni.showToast({
						title: list.data.message,
						icon: 'none',
						duration: 2000
					})	
				}
			},
			saveInfo(setType){
				this.updateUserName(this.setValue,setType)
			}
		}
	}
</script>

<style lang="scss">
	.set-up-inof{
		background-color:#f1f1f1 ;
	}
	.set-up-btn{
		height: 100rpx;
		margin-bottom: 40rpx;
		margin-top: 30rpx;
		background-color: #ffffff;
		padding: 10rpx;
	}
	.set-up-btn2{
		height: 200rpx;
		margin-bottom: 40rpx;
		margin-top: 30rpx;
		background-color: #ffffff;
		width: 100%;
		padding: 10rpx;
		
	}
	.save-name{
		background-color: #2B6DDD;
		border-radius: 36rpx;
		margin:80rpx 18rpx;
		color: white;
	}
	.set-warning{
		margin-left: 40rpx;
		.warn-text{
			font-size: 24rpx;
			display: block;
			margin-top: 20rpx;
		}
		.text2{
			color: orange
		};
	}
</style>