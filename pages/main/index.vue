<!-- 我的 -->
<template>
	<view class="main-box" :style="{height: phoneHeight+'rpx'}">
		<view class="top-bg">
			<image class="bg-icon" src="https://www.liuyan.store/hdfs/userFile/download/wechat&img&bg.png"></image>
			<view class="message-box" :style="{marginTop: navHeight+'px'}">
				<view class="msg-top">
					<view class="msg-items">
						<image class="msg-head" @click="buttonClick" :src="userInfo.userImg"></image>
						<view class="msg-lists">
							<view class="msg-name">
								<text class="username">{{userInfo.userName}}</text>
								<image class="set-up" @click="jumpPage('/pages/main/setUp')" src="@/static/img/main/set-up.png"></image>
							</view>
							<text class="enterprise">{{userInfo.enterpriseName}}</text>
						</view>
					</view>
				</view>
				<view class="autograph">{{userInfo.persionalSignture}}</view>
				<view class="data-items">
					<view class="items-list">
						<text class="list-name">动态</text>
						<text class="list-datas">{{userInfo.dynamic}}</text>
					</view>
					<view class="items-list">
						<text class="list-name">关注</text>
						<text class="list-datas">{{userInfo.follow}}</text>
					</view>
					<view class="items-list">
						<text class="list-name">粉丝</text>
						<text class="list-datas">{{userInfo.fans}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="content-box">
			<view class="hot-title">
				收藏夹
			</view>
			<view class="collection-boxs">
				<view class="collection-items" @click="jumpPage('/pages/main/knowledgeCollection')">
					<image class="collection-icon" src="@/static/img/main/knowledge.png"></image>
					<text class="collection-word">知识文库</text>
				</view>
				<view class="collection-items" @click="jumpPage('/pages/main/videoCollection')">
					<image class="collection-icon" src="@/static/img/main/video.png"></image>
					<text class="collection-word">视频课程</text>
				</view>
				<view class="collection-items">
					<image class="collection-icon" src="@/static/img/main/article.png"></image>
					<text class="collection-word">文章</text>
				</view>
				<view class="collection-items">
					<image class="collection-icon" src="@/static/img/main/doubt.png"></image>
					<text class="collection-word">问答</text>
				</view>
			</view>
		</view>
		<bottom class='bottom-pos'></bottom>
	</view>
</template>

<script>
	var COS = require('cos-wx-sdk-v5')
	// 使用固定密钥，适用于前端调试，不可暴露
	var cos = new COS({
	  SecretId: 'AKIDQe7YllX4NSJwLWTBgy4wa0CAuQimcDaj',
	  SecretKey: '0mLhqlSwCE2d0A5mGWYMzOYUCgwymMiq',
	})
	import bottom from "@/components/bottom.vue"
	export default {
		components: {
			bottom
		},
		data() {
			return {
				navHeight: 0,
				phoneHeight: 0,
				userInfo: {
					userImg: '', // 用户头像
					userName: '', // 用户名
					persionalSignture: '', // 个性签名
					enterpriseName: '', // 关联企业
					dynamic: '', // 动态
					fans: '', // 粉丝
					follow: '' // 关注
				}
			}
		},
		onShow() {
			console.log('===从新进入==')
			if (Object.keys(getApp().globalData.getUserInfo).length != 0) {
				this.userInfo = getApp().globalData.getUserInfo
			}
		},
		async onLoad() {
			this.navHeight = getApp().globalData.navHeight
			uni.getSystemInfo({
				success: (res) => {
					this.phoneHeight = (res.windowHeight * (750 / res.windowWidth))
					console.log(this.phoneHeight, 'phoneHeight')
				}
			})
			this.getUserInfo()
		},
		methods: {
			async getUserInfo() {
				// 获取用户信息
				let list = await this.$request('authcenter/appUser/getUserInfo', {}, 'GET')
				console.log(list, "===examList==")
				getApp().globalData.getUserInfo = list.data.body
				let data = getApp().globalData.getUserInfo
				this.userInfo.userImg = data.userImg // 用户头像
				this.userInfo.userName = data.userName // 用户名
				this.userInfo.persionalSignture = data.persionalSignture // 个性签名
				this.userInfo.enterpriseName = data.enterpriseName // 关联企业
				this.userInfo.dynamic = data.dynamic // 动态
				this.userInfo.fans = data.fans // 粉丝
				this.userInfo.follow = data.follow // 关注
			},
			uuid() {
			  var s = []
			  var hexDigits = '0123456789abcdef'
			  for (var i = 0; i < 36; i++) {
				s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
			  }
			  s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
			  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
			  s[8] = s[13] = s[18] = s[23] = '-'
		
			  var uuid = s.join('')
			  return uuid
			},
			currentTime() {
			  let now = new Date()
			  let year = now.getFullYear() //年
			  let month = now.getMonth() + 1 //月
			  let day = now.getDate() //日
			  let clock = year + '/'
			  if (month < 10) clock += '0'
			  clock += month + '/'
			  if (day < 10) clock += '0'
			  clock += day + '/'
			  return clock
			},
			buttonClick () {
			      var that = this
			      uni.showActionSheet({
			        itemList: ['拍照', '相册选取'],
			        itemColor: '',
			        success: function (res) {
			          if (!res.cancel) {
			            console.log(res.tapIndex);
			            if (res.tapIndex === 0) {
			              //拍照
			              uni.chooseImage({
			                count: 1,
			                sourceType: ['camera'],
			                success: (chooseImageRes) => {
			                  uni.showLoading({
			                    title: '加载中'
			                  });
			                  const tempFilePaths = chooseImageRes.tempFilePaths[0];
							  console.log(tempFilePaths)
							  debugger
							  let fileName = tempFilePaths.split('.')
							    let key = that.currentTime() + that.uuid()+ '.' + fileName[1]
							cos.postObject({
								Bucket: 'sec-user-img-1306274299',
								Region: 'ap-beijing',
								Key: key,
								FilePath: tempFilePaths,
								onProgress: function (info) {
									console.log(JSON.stringify(info));
								}
							}, async function (err, data) {
								console.log(err || data);
								if(data){
									that.userInfo.userImg = 'https://'+data.Location
									uni.showToast({
									  title: '上传成功'
									})
								   await that.$request('/authcenter/appUser/saveImagePath',{
										path:that.userInfo.userImg 
									},'POST');
								}
							});
			        //           uni.uploadFile({
			        //           //上传图片接口
			        //             url: that.baseUrl + '/common/upload', 
			        //             filePath: tempFilePaths[0],
			        //             name: 'file',
			        //             formData: {
			        //               // 'user': 'test'
			        //             },
			        //             header:{
			        //               Authorization: 'Bearer '+getToken()
			        //             },
			        //             success: (uploadFileRes) => {
			        //               var a = JSON.parse(uploadFileRes.data)
			        //               if (a.code == '200') {
									  // //自己定义的修改图片的接口 a.url为上传成功返回的图片地址
									  // that.bcBtn(a.url)        
			        //               } else {
			        //                 uni.showToast({
			        //                   title: '修改失败请重试',
			        //                   duration: 2000,
			        //                   icon: 'none'
			        //                 });
			        //               }
			        //             },
			        //             fail: (err) => {
			        //               uni.showToast({
			        //                 title: err.errMsg,
			        //                 duration: 2000,
			        //                 icon: 'none'
			        //               });
			        //             }
			        //           });
			                }
			              });
			            }
			            if (res.tapIndex === 1) {
			              //相册
			              uni.chooseImage({
			                count: 1,
			                sourceType: ['album'],
			                success: (chooseImageRes) => {
			                  const tempFilePaths = chooseImageRes.tempFilePaths[0];
							  console.log(tempFilePaths)
							  const tempFiles = chooseImageRes.tempFiles
							  let fileName = tempFilePaths.split('.')
							    let key = that.currentTime() + that.uuid()+ '.' + fileName[1]
								cos.postObject({
									Bucket: 'sec-user-img-1306274299',
									Region: 'ap-beijing',
									Key: key,
									FilePath: tempFilePaths,
									onProgress: function (info) {
										console.log(JSON.stringify(info));
									}
								}, async function (err, data) {
									console.log(err || data);
									if(data){
										that.userInfo.userImg = 'https://'+data.Location
										uni.showToast({
										  title: '上传成功'
										})
									   await that.$request('/authcenter/appUser/saveImagePath',{											path:that.userInfo.userImg 										},'POST');
									}
								});
							   
							   
							   
							   
							   
							    //       wx.uploadFile(
							    //         {
							    //           Bucket: 'sec-user-img-1306274299', // 存储桶名称
							    //           Region: 'ap-beijing', // 存储桶所在地域，
							    //           Key: key, // 文件名
										 //  Body:'',
							    //           StorageClass: 'STANDARD', // 上传模式
							    //           FilePath: tempFilePaths, // 上传文件对象
							    //           // 上传进度条
							    //           onProgress: (progressData) => {
							    //             // 上传进度
											// console.log('进来了')
							    //             //this.percent = progressData.percent * 100
							    //           },
							    //         },
							    //         (err, data) => {
											// console.log(err)
							    //           // 上传成功后的回调函数,要使用箭头函数否则内部this不是data中的变量
							    //           // 判断上传成功后，获取到图片的网络地址，渲染页面
							    //           if (err === null && data.statusCode === 200) {
							    //              console.log(data.Location)
							    
							    //           }
							    //         }
							    //       )
			                }
			              });
			            }
			          }
			        },
			        fail: function (res) {
			        },
			        complete: function (res) {
			        },
			      });
			    },
			jumpPage(path) {
				uni.navigateTo({
					url: path
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.main-box {
		display: -webkit-flex;
		flex-direction: column;
		align-items: center;
		background-color: #F2F4F9;
	}

	.top-bg {
		width: 100%;
		height: 539rpx;
		position: relative;
		.bg-icon {
			width: 100%;
			height: 100%;
			width: 100%;
			height: 539rpx;
			position: absolute;
			left: 0;
			top: 0;
		}
	}

	.message-box {
		width: 100%;
		height: 539rpx;
		position: absolute;
		left: 0;
		top: 0;
		display: -webkit-flex;
		flex-direction: column;
		.msg-top {
			padding-left: 40rpx;
			padding-right: 40rpx;
			margin-top: 30rpx;
			display: -webkit-flex;

			.msg-items {
				width: 100%;
				height: 100rpx;
				display: -webkit-flex;
				align-items: center;

				.msg-head {
					width: 100rpx;
					height: 100rpx;
					border-radius: 50%;
					margin-left: 20rpx;
					margin-right: 20rpx;
				}

				.msg-lists {
					display: -webkit-flex;
					flex-direction: column;
					justify-content: space-between;
					flex: 1;
					height: 100%;

					.msg-name {
						flex: 1;
						display: -webkit-flex;
						justify-content: space-between;

						.username {
							font-size: 32rpx;
							font-family: PingFang SC-Bold, PingFang SC;
							font-weight: bold;
							color: #FFFFFF;
						}

						.set-up {
							width: 40rpx;
							height: 38rpx;
						}
					}

					.enterprise {
						font-size: 28rpx;
						font-family: PingFang SC-Medium, PingFang SC;
						font-weight: 500;
						color: #DDDDDD;
					}
				}
			}
		}

		.autograph {
			margin-left: 60rpx;
			margin-right: 60rpx;
			margin-top: 16rpx;
			font-size: 24rpx;
			font-family: PingFang SC-Medium, PingFang SC;
			font-weight: 500;
			color: #DDDDDD;
			line-height: 40rpx;
		}

		.data-items {
			position: absolute;
			bottom: 84rpx;
			left: 0;
			margin-left: 40rpx;
			margin-right: 40rpx;
			margin-top: 40rpx;
			width: 670rpx;
			height: 188rpx;
			background: #FFFFFF;
			box-shadow: 0px 10rpx 10rpx 1rpx rgba(0, 0, 0, 0.1);
			border-radius: 12rpx;
			display: -webkit-flex;

			.items-list {
				flex: 1;
				height: 100%;
				display: -webkit-flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;

				.list-name {
					font-size: 24rpx;
					font-weight: 500;
					color: #999999;
				}

				.list-datas {
					font-size: 42rpx;
					font-weight: bold;
					color: #333333;
					margin-top: 20rpx;
				}
			}
		}
	}

	.content-box {
		flex: 1;
		width: 100%;
		background-color: #FFFFFF;
		margin-top: 60rpx;

		.hot-title {
			position: relative;
			font-size: 34rpx;
			font-family: PingFang SC-Bold, PingFang SC;
			font-weight: bold;
			color: #333333;
			margin-top: 48rpx;
			margin-bottom: 32rpx;
			margin-left: 40rpx;
		}

		.hot-title::after {
			content: '';
			width: 102rpx;
			height: 10rpx;
			display: block;
			position: absolute;
			background: linear-gradient(180deg, #FF9F4A 0%, #FCDC76 100%);
			border-radius: 5rpx;
			left: 0;
			margin: auto;
			bottom: 5rpx;
			opacity: 0.6;
		}

		.collection-boxs {
			display: -webkit-flex;

			.collection-items {
				flex: 1;
				display: -webkit-flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;

				.collection-icon {
					width: 96rpx;
					height: 96rpx;
				}

				.collection-word {
					font-size: 24rpx;
					font-family: PingFang SC-Medium, PingFang SC;
					font-weight: 500;
					color: #666666;
				}
			}
		}
	}

	.bottom-pos {
		position: fixed;
		bottom: 0;
		left:0;
		right:0;
		margin: auto;
	}
</style>
