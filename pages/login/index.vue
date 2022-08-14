/**
 * 登录页面
 */
<template>
	<view class="login-cover">
		<view class="login">
			<view class="welcome">
				<view class="title">
					欢迎登录
				</view>
				<view class="info">
					开发安全社区平台
				</view>
				
			</view>
			<view class="input">
				<!-- <view class="user-info">请输入用户账号/手机号</view> -->
				<input class="phone" v-model="loginParam.phone" type="text" placeholder="请输入用户账号/手机号">
			</view>
			<view class="input">
			<!-- 	<view class="user-info">请输入登录密码</view> -->
				<input class="password" v-model="loginParam.password"  type="password" placeholder="请输入登录密码">
			</view>
			<view class="login-btn" @click="login()">
				立即登录
			</view>
		    <view class="wxLogin">
				<button shape="circle" class="login-small" link="true" open-type="getPhoneNumber"  @getphonenumber="getPhoneNumberFun"></button>
				<view class="wxTitle">微信一键登录</view>
			</view>
		</view>
	</view>
</template>

<script>
	import tools from '@/utils/tools.js';
	import { login,loginByWx } from '@/api/auth.js';
	export default {
		components:{
			
		},
		data() {
			return {
				enterpriseId:'',
				loginParam: {
					phone:'',
					password:''
				},
				jumpurl:'/pages/index/index',
				jumpurl1:'/pages/index/index',
				jumpurl2:'/pages/borrowBook/index/index'
			}
		},
		async onLoad(options) {
			this.options = options;
			if(this.options&&this.options.jumpurl){
				this.jumpurl = this.options.jumpurl
			}
			// //获取关联企业id
			// this.enterpriseId = await tools.getStorage('enterpriseId')
			// if(this.enterpriseId === '107934321265889280'){
			// 	this.jumpurl = '/pages/borrowBook/index/index'
			// }else{
			// 	this.jumpurl = '/pages/index/index'
			// }
			//登录获取用户信息
            // this.getLoginCode()
		},		
		mounted() {
			
		},
		methods: {
			// getLoginCode(){
			// 	uni.login({
			// 			provider:"weixin",
			// 			success:(res)=>{
			// 				console.log(res);
			// 				// 获取微信登录的授权码
			// 				var code = res.code
			// 				//在写发送request请求，
			// 			}
			// 	})
			// },
			async login(){
			    await login(this.loginParam.phone,this.loginParam.password,this.jumpurl1,this.jumpurl2)
			},
			loginSmall(){
				
			},
			async getPhoneNumberFun(e) {
			//	console.log(e)
				
				if(e.detail.errMsg=="getPhoneNumber:fail user deny"){       //用户决绝授权  
					//拒绝授权后弹出一些提示  
					uni.showToast({
						title: '获取手机号失败，请用账号登录',
						icon: 'none'
					});
				}else{      //允许授权  
				    await loginByWx(e.detail.code,this.jumpurl1,this.jumpurl2)
				}  
				
			 }
		}
	}
</script>

<style scoped lang="scss">
	.login-cover{
		background-image: url(https://sec-storage-1306274299.cos.ap-beijing.myqcloud.com/applet/small-routine/login/login-bc.png);
		padding-top: 312rpx;
		padding-left: 72rpx;
		padding-right: 72rpx;
		padding-bottom: 300rpx;
		font-family: PingFang SC-Medium, PingFang SC;
		.wxLogin{
			text-align: center;
			margin-top:300rpx
		}
		.wxImg{
			width: 80rpx;
			height: 80rpx;
		}
		.wxTitle{
			margin-top: 20rpx;
			color: #333333 ;
			font-size: 24rpx;
		}
		.login{
			width: 606rpx;
			.welcome{
				margin-bottom: 80rpx;
				.title{
					font-family: PingFang SC-Bold;
					font-size: 68rpx;
					font-weight: bold;
					color: #333333;							
				}
				.info{
					font-size: 30rpx;
					font-weight: 500;
					color: #666666;
				}
			}
			.input{
				margin: 30rpx 0;
				height: 90rpx;
				font-size: 28rpx;
				font-weight: 500;
				color: #999999;
				border-bottom: 2rpx solid #EEEEEE;
				// display: flex;
				align-items: center;
				input{
					font-size: 28rpx;
					font-weight: 500;
					color: #999999;
					height: 3rem;
				}
				.user-info{
					display: block
				}
			}
			.login-btn{
				width: 100%;
				line-height: 96rpx;
				margin-top: 88rpx;
				text-align: center;
				background: linear-gradient(90deg, #2A91EB 0%, #2B6DDD 100%);
				border-radius: 12rpx 12rpx 12rpx 12rpx;
				font-size: 30rpx;
				font-weight: 500;
				color: #FFFFFF;
			}
			.login-small{ 
				background-size:80rpx 80rpx;
				width: 80rpx;
				height: 80rpx;
				border-radius: 41rpx;
				background-image: url(https://sec-storage-1306274299.cos.ap-beijing.myqcloud.com/applet/small-routine/login/wxImg.png);
		    }
		}
	}
</style>