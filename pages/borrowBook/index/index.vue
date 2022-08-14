<template>
	<view class="borrow-index":style="{height: phoneHeight +'rpx'}">
		<navTop :showNav='showNav'>借阅</navTop>
		<uni-notice-bar show-icon scrollable
		speed="50" text="请大家自觉扫码借阅图书,做文明金证人,好借好还,再借不难哦~" />
		
		<view class="borrow-Info">
			<view class="book-title">图书信息</view>
			<view class="for-books">
			    <image :src="borrowedBookInfo.image || bookDatas.image" />
			    <view>
			        <view class="hide-content">
			            <text class="book-name">{{ borrowedBookInfo.name }}</text>
			        </view>
			        <view>
			            <text class="book-author">{{ borrowedBookInfo.author }}</text>
			        </view>
			        
			    </view>
			</view>
		</view>
		<image class="borrow-img" src="https://sec-storage-1306274299.cos.ap-beijing.myqcloud.com/applet/small-routine/borrow/home.png" mode=""></image>
		
		<view class="borrow-btn">
			<button  @tap="scanCodeEvent(1)" class="borrow-button">借书</button>
			<button  @tap="scanCodeEvent(0)" class="default-btn">还书</button>
		</view>
		<bottom class='bottom-pos'></bottom>
	</view>
</template>

<script>
	import navTop from "@/components/navTopIndex.vue"
	import bottom from "@/components/bottom.vue"
	export default {
		components:{
			bottom,
			navTop
			
		},
		data() {
			return {
				isCanOption:true,
				showNav:false,
				phoneHeight:'',
				borrowedBookInfo:{}
			}
		},
		async onLoad() {
			this.queryBorrowBook()
			// 可使用窗口的高
			uni.getSystemInfo({
				success: (res) => {
					this.phoneHeight = (res.windowHeight*(750/res.windowWidth))-(getApp().globalData.navHeight) * (750 / res.windowWidth);
				}
			})	
		},
		methods: {
			async queryBorrowBook(){
				let res = await this.$request(
					`/book/queryBookBySelf`,
					{}, 'GET')
				this.borrowedBookInfo = res.data.body.length?res.data.body[0]:{}
			},
            async queryStatus(){
				let res = await this.$request(
					`/book/esayQueryBookBySelf`,
					{}, 'GET')
				this.isCanOption = res.data.body
			},
			/**
			* 扫码事件
			* type 1借 0还
			*/
			async scanCodeEvent(type){
				let res = await this.$request(
					`/book/esayQueryBookBySelf`,
					{}, 'GET')
				this.isCanOption = res.data.body
				if(type === 1 && this.isCanOption){
					uni.showToast({
						image:'/static/img/bottom/study.png',
						title: '已借阅一本图书',
						duration:100
					})
					return false
				}
				if(type === 0 && !this.isCanOption){
					uni.showToast({
						image:'/static/img/bottom/study.png',
						title: '没有可还的图书'
					})
					return false
				}
				uni.scanCode({
					  onlyFromCamera: true,// 只允许从相机扫码
					  success(res){
						console.log("扫码成功："+JSON.stringify(res))
						if(res.errMsg === 'scanCode:ok'){
							uni.navigateTo({
								url:`/pages/borrowBook/components/ordersDetail?bookId=${res.result}&type=${type}`
							});
						}
						// 扫码成功后  在此处理接下来的逻辑
					  }
				 })
            }
		}
	}
</script>

<style lang="scss" scoped>
	@import url("@/static/css/main.wxss");
	.borrow-img{
		margin-top:100rpx;
		width: 100%;
		height: 50%;
		
	}
	.borrow-btn{
		display: flex;
		flex-direction: row;
		button{
		    width: 300rpx;
			border-radius: 50rpx;
		}
		.borrow-button{
			background: #4881e6;
			color: white;
		}
		.default-btn{
			border: 1rpx solid #4881e6;
			color: #4881e6;;
		}
	
	}
	.book-title{
		color: gray;
		height: 70rpx;
		line-height: 70rpx;
		margin-left: 10rpx;
	}
	.book-content {
	    margin: 2%;
	    text {
	        color: #000000;
	        font-size: 20px;
	        font-weight: 600;
	        letter-spacing: 5px;
			color: gray;
	    }
	    view {
	        color: #3f3939;
	        font-family: monospace;
	        margin-left: 2%;
	    }
	}
	.bottom-pos{
		position: fixed;
		bottom: 0;
		margin: auto;
	}
</style>