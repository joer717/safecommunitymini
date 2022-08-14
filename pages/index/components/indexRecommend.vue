/**
 * 热门推荐
 */
<template>
	<view class="recommend">
		<view class="hot-title">
			热门推荐
		</view>
		<view class="recommend-list">
			<view class="recommend-item" v-for="(item,index) in dataList" :key="index">
				<view class="recommend-item-in">
					<view class="recommend-item-in-left">
						<image src="https://www.liuyan.store/hdfs/userFile/download/wechat&img&left.png" mode=""></image>
					</view>
					<view class="recommend-item-in-right">
						<view class="fs28">
							{{item.title}}
						</view>
						<view class="fs24">
							{{item.context}}
						</view>
						<view class="fs20">
							{{item.time}}
						</view>												
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default{
		data() {
			return {
				dataList:[{
					title:'白帽网络安全渗透测试训练营',
					context:'课程内容根据开源网安在网络安全、互联网、金融、通信等行业的软...',
					time:'2022-07-12'
				},
				{
					title:'数据隐私安全之数据加密',
					context:'在计算机网络通信中,给网络双方通信的数据加密是保证计算机网络安通...',
					time:'2022-06-27'
				},{
					title:'20分钟精通SQL注入',
					context:'SQL注入就是在用户可控参数寻找漏洞进行非法提交SQL语计...',
					time:'2022-06-23'
				}]
			}
		},
		methods: {

		}
	}
</script>

<style scoped lang="scss">
	.recommend{
		width: 670rpx;
		min-height: 1000rpx;
		padding-bottom: 100rpx;
		.hot-title{
			position: relative;
			font-size: 34rpx;
			font-family: PingFang SC-Bold, PingFang SC;
			font-weight: bold;
			color: #333333;
			margin-top: 48rpx;
			margin-bottom: 32rpx;
		}
		.hot-title::after{
			content: '';
			width: 135rpx;
			height: 10rpx;
			display: block;
			position: absolute;
			background: linear-gradient(180deg, #FF9F4A 0%, #FCDC76 100%);
			border-radius: 5px 5px 5px 5px;
			left: 0;
			margin: auto;
			bottom: 5rpx;
			opacity: 0.6;
		}
		.recommend-list{
			
			.recommend-item{
				    margin-bottom: 10px;
				background-color: #fff;
				padding-top: 40rpx;
				padding-bottom: 40rpx;
				display: flex;
				justify-content: center;
				border-radius: 12px 12px 12px 12px;
				.recommend-item-in{
					width: 606rpx;
					display: flex;
					justify-content: space-between;
					.recommend-item-in-left{
						image{
							width: 166rpx;
							height: 200rpx;
						}
					}
					.recommend-item-in-right{
						width: 408rpx;												
						.fs28{
							font-size: 28rpx;
						}
						.fs24{
							margin-top: 24rpx;
							margin-bottom: 34rpx;
							font-size: 24rpx;
						}	
						.fs20{
							font-size: 20rpx;
						}												
					}
				}
			}
		}
	}
</style>