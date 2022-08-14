<template>
	<view class="set-up">
		<navTop :showNav="false">设置</navTop>
		<scroll-view scroll-y="true" :style="{height: phoneHeight+'rpx'}">
			<view class="content-box">
				<view class="title">账号设置</view>
				<view class="items">
					<view class="item-lists">
						<text class="list-left">头像</text>
						<image class="userImg" :src="userInfo.userImg"></image>
					</view>
					<view class="item-lists">
						<text class="list-left">用户名</text>
						<view class="lits-right" @click="jump('1')">
							<text>{{userInfo.userName}}</text>
							<image src="@/static/img/main/right.png"></image>
						</view>
					</view>
					<view class="item-lists">
						<text class="list-left">关联企业</text>
						<view class="common-style">{{userInfo.enterpriseName}}</view>
					</view>
					<view class="item-lists">
						<text class="list-left">个性签名</text>
						<view class="lits-right" @click="jump('2')">
							<text>{{userInfo.persionalSignture}}</text>
							<image src="@/static/img/main/right.png"></image>
						</view>
					</view>
				</view>
				<view class="title">通用设置</view>
				<view class="items">
					<view class="item-lists">
						<text class="list-left">绑定的手机号</text>
						<view class="common-style">{{userInfo.phoneNum}}</view>
					</view>
					<!-- <view class="item-lists">
						<text class="list-left">修改密码</text>
						<view class="lits-right" @click="jump('3')">
							<image src="@/static/img/main/right.png"></image>
						</view>
					</view> -->
					<view class="item-lists">
						<text class="list-left">隐私设置</text>
						<view class="lits-right">
							<image src="@/static/img/main/right.png"></image>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
<!-- 		<uni-popup ref="subPopup" type="center" @maskClick="maskClick">
			<view class="popup_box">
				<image class="pop_icon" src="@/static/img/examination/popup-icon.png"></image>
				<view>
					<view v-if="listIndex == 3" class="psw-box">
						<view class="psw-lists">
							<text>旧密码：</text>
							<input v-model="appUserDTO.userPwd" class="uni-input-text" confirm-type="search" placeholder="请输入旧密码" />
						</view>
						<view class="psw-lists">
							<text>新密码：</text>
							<input v-model="appUserDTO.newPwd" class="uni-input-text" confirm-type="search" placeholder="请输入新密码" />
						</view>
						<view class="psw-lists">
							<text>确认密码：</text>
							<input v-model="appUserDTO.enterPwd" class="uni-input-text" confirm-type="search" placeholder="请输入确认密码" />
						</view>
					</view>
					<view v-else class="each-item">
						<block v-if="listIndex == '1'">
							<text>用户名：</text>
						</block>
						<block v-if="listIndex == '2'">
							<text>个性签名：</text>
						</block>
						<input v-model="commonValue" class="uni-input" maxlength="15" confirm-type="search" :placeholder="commonWord" />
					</view>
				</view>
				<view class="btn-box"><button @click="editInfo" class="btn">确定</button></view>
			</view>
		</uni-popup> -->
	</view>
</template>

<script>
	import navTop from "@/components/navTop.vue"
	export default{
		components: {
			navTop
		},
		data() {
			return{
				phoneHeight: 0,
				listIndex: 0,
				userInfo: {},
				setValue:'',
				commonValue: '', // 用户名/个性签名
				commonWord: '请输入用户名',
				appUserDTO: {
					userPwd: '', // 旧密码
					newPwd: '', // 新密码
					enterPwd: '' // 确认密码
				}
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success: (res) => {
					console.log(res.screenHeight, 'screenHeight')
					console.log(res.windowHeight, 'windowHeight')
					this.phoneHeight = (res.windowHeight*(750/res.windowWidth)) - (getApp().globalData.navHeight)*(750/res.windowWidth)
					console.log(this.phoneHeight, 'phoneHeight')
				}
			})
			this.userInfo = getApp().globalData.getUserInfo
			console.log('userInfo--->', this.userInfo)
		},
		methods: {
			async jump(index) {
				//console.log('index===>', index)
				if(index == '1') {
					this.setValue = this.userInfo.userName
				} else if(index == '2'){
					this.setValue = this.userInfo.persionalSignture
				}
				this.listIndex = index
				//this.$refs.subPopup.open("center")
				uni.navigateTo({
					url: `/pages/main/components/setupInfo?setValue=${this.setValue}&&setType=${index}`
				})
			},
			async editInfo() {
				if(this.listIndex == '1' || this.listIndex == '2'){
					// 用户名/个性签名
					if(this.commonValue == '') return
					this.updateUserName(this.commonValue)
				} else {
					if(this.appUserDTO.userPwd == '') {
						uni.showToast({
							title: '请输入旧密码',
							icon: 'none',
							duration: 2000
						})
						return
					} else if(this.appUserDTO.newPwd == ''){
						uni.showToast({
							title: '请输入新密码',
							icon: 'none',
							duration: 2000
						})
						return
					} else if(this.appUserDTO.enterPwd == ''){
						uni.showToast({
							title: '请输入确认密码',
							icon: 'none',
							duration: 2000
						})
						return
					}
					// 修改密码
					let pwd = await this.$request('authcenter/appUser/updatePwd', this.appUserDTO, 'POST')
					console.log(pwd, "===pwd")
					if(pwd.data.status == 200) {
						this.$refs.subPopup.close()
						this.appUserDTO.userPwd = '' // 旧密码
						this.appUserDTO.newPwd = '' // 新密码
						this.appUserDTO.enterPwd = '' // 确认密码
						console.log('this.userInfo', this.userInfo)
					}
					uni.showToast({
						title: pwd.data.message,
						icon: 'none',
						duration: 2000
					})
				}
			},
			// 修改用户名、个性签名
			async updateUserName(value) {
				if(this.listIndex == '1') {
					// 用户名
					let list = await this.$request('authcenter/appUser/updateUserName', {
						userName: value
					}, 'POST')
					console.log(list, "===list")
					if(list.data.status == 200) {
						this.$refs.subPopup.close()
						this.userInfo.userName = this.commonValue
						getApp().globalData.getUserInfo = this.userInfo
						console.log('this.userInfo', this.userInfo)
					}
					uni.showToast({
						title: list.data.message,
						icon: 'none',
						duration: 2000
					})
				} else if(this.listIndex == '2') {
					// 个性签名
					let list = await this.$request('authcenter/appUser/updateUserSignature', {
						personalSignature: value
					}, 'POST')
					console.log(list, "===list")
					if(list.data.status == 200) {
						this.$refs.subPopup.close()
						this.userInfo.persionalSignture = this.commonValue
						getApp().globalData.getUserInfo = this.userInfo
						console.log('this.userInfo', this.userInfo)
					}
					uni.showToast({
						title: list.data.message,
						icon: 'none',
						duration: 2000
					})	
				}
			},
			maskClick() {
				this.commonValue = ''
			}
		}
	}
</script>

<style lang="scss" scoped>
	.set-up{
		background-color: #F1F3F9;
	}
	.content-box{
		padding-left: 40rpx;
		padding-right: 40rpx;
		.title{
			padding-top: 48rpx;
			padding-bottom: 32rpx;
			font-size: 24rpx;
			font-family: PingFang SC-Medium, PingFang SC;
			font-weight: 500;
			color: #666666;
		}
		.items{
			background: #FFFFFF;
			border-radius: 12rpx;
			.item-lists{
				margin-left: 32rpx;
				margin-right: 32rpx;
				height: 100rpx;
				display: -webkit-flex;
				align-items: center;
				justify-content: space-between;
				border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
				&:last-child{
					border-bottom: none;
				}
				.list-left{
					font-size: 28rpx;
					font-family: PingFang SC-Medium, PingFang SC;
					font-weight: 500;
					color: #333333;
				}
				.userImg{
					width: 56rpx;
					height: 56rpx;
					border-radius: 50%;
				}
				.common-style{
					font-size: 28rpx;
					font-family: PingFang SC-Medium, PingFang SC;
					font-weight: 500;
					color: #666666;
				}
				.lits-right{
					display: -webkit-flex;
					align-items: center;
					text{
						font-size: 28rpx;
						font-family: PingFang SC-Medium, PingFang SC;
						font-weight: 500;
						color: #666666;
					}
					image{
						width: 12rpx;
						height: 24rpx;
						margin-left: 24rpx;
					}
				}
			}
		}
	}
	.popup_box{
		width: 570rpx;
		background: #FFFFFF;
		border-radius: 24rpx;
		.pop_icon{
			width: 570rpx;
			height: 142rpx;
		}
		.psw-box{
			display: -webkit-flex;
			flex-direction: column;
			margin-left: 40rpx;
			margin-right: 40rpx;
			.psw-lists{
				display: -webkit-flex;
				align-items: center;
				padding-top: 20rpx;
				padding-bottom: 20rpx;
				border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
				text{
					width: 180rpx;
					font-size: 32rpx;
					color: #666666;
				}
				.uni-input-text{
					width: 300rpx;
				}
			}
		}
		.each-item{
			display: -webkit-flex;
			align-items: center;
			margin-left: 40rpx;
			text{
				font-size: 32rpx;
				color: #666666;
			}
		}
		.btn-box{
			text-align: center;
			padding-top: 40rpx;
			padding-bottom: 40rpx;
			.btn{
				width: 200rpx;
				height: 80rpx;
				color: #FFFFFF;
				font-size: 34rpx;
				background: linear-gradient(270deg, #2B6DDD 0%, #2A91EB 100%);
			}
		}
	}
	
</style>