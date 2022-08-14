<template>
    <view class="book-detail" :style="{height: scheight +'px'}">
		<navTop :showNav='showNav' id="topCover">借阅详情</navTop>
        <view class="book-data">
			<view class="book-title">图书信息</view>
            <view class="for-books">
                <image :src="bookInfo.image || bookDatas.image" />
                <view>
                    <view class="hide-content">
                        <text class="book-name">{{ bookInfo.name }}</text>
                    </view>
                    <view>
                        <text class="book-author">{{ bookInfo.author }}</text>
                    </view>
                    
                </view>
            </view>
			<view class="book-title">借阅信息</view>
			<view class="for-detail">
				<view class="panel-detail"><text class="panel1">图书状态 :</text><text class="panel2 order2" style="color: green;">{{orderStatus}} </text></view>
				<view class="panel-detail"><text class="panel1">借书时间 :</text><text class="panel2">{{ bookInfo.borrowTime }}</text></view>
				<view class="panel-detail"><text class="panel1">应还时间 :</text><text class="panel2">{{ bookInfo.returnTime }}</text></view>
			    <view class="panel-detail"><text class="panel1">续借次数 :</text><text class="panel2">{{ bookInfo.reNewNum || 0}}</text></view>
			</view>
			<view class="book-title">注意事项</view>
			<view class="set-warning">
					<text class="text3 warn-text">1. 一次借出时间期限两个月</text>
					<text class="text3 warn-text">2. 到期后可续借，续借次数最多3次</text>
					<text class="text3 warn-text">3. 请务必扫码登记借阅</text>
			</view>
			</view>
        
        <view v-if="type == 1"  class="buttons">
			<button v-if="bookInfo.state === 1" class="borrow-button" @click="borrowBook(1)">借书</button>
			<button v-if="bookInfo.state === 2 && isEndTime" class="borrow-button" @click="borrowBook(2)">续借</button>
            <button v-if="bookInfo.state === 1||(bookInfo.state === 2||isEndTime)" @click="borrowBook(3)" class="default-btn">取消</button>
        </view>
		
		<view v-if="type == 0"  class="buttons">
			<button v-if="bookInfo.state === 2" class="borrow-button" @click="borrowBook(0)">还书</button>
		    <button v-if="bookInfo.state === 2" class="default-btn" @click="borrowBook(3)">取消</button>
		</view>
    </view>
</template>

<script>
import navTop from "@/components/navTop.vue"
export default {
	components:{
	   navTop
	},
    data() {
        return {
			type:'',
			bookId:'',
			bookInfo:{},
			phoneHeight:'',
			scheight:'',
			showNav:true,
            bookDatas: {
				image:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01cd075a75131aa801213466b2b536.jpg%401280w_1l_2o_100sh.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662733797&t=d12966c0b712b8f2c6d86964d9049ff2',
				name:'怎么一夜暴富',
				author:'李嘉诚',
				description:'洗洗睡吧，梦里什么都有',
				status:0
			},
            id: null,
            errorMsg: '',
            token: '',
            isBorrowDis: false
        }
    },
    computed:{
	   isEndTime(){
		 let nowTime = new Date().getTime()
		 let returnTime = new Date(this.bookInfo.returnTime).getTime()
		 console.log(nowTime)
		  console.log(returnTime)
		 if(nowTime >= returnTime){
			 return true
		 }else{
			 return false
		 }
	   },
	   orderStatus(){
		   let state = this.bookInfo.state
		   if(this.type == 1){
				switch (state){
					case 1:
						return '可借状态'
					case 2:
						return '你已借此书'
					case 3:
						return '已被他人借出'
					default:
						return '';
				} 
		   }
		   if(this.type == 0){
				switch (state){
					case 1:
						return '可借状态'
					case 2:
						return '待归还'
					case 3:
						return '非本人借出,无权还书'
					default:
						return '';
				} 
		   }
	   }
    },
	onLoad(option) {
		let that = this
		that.bookId= option.bookId
		that.type = option.type
		that.getBookInfo()
		//可使用窗口的高
		that.phoneHeight = getApp().globalData.phoneHeight;
		//创建节点选择器
		uni.createSelectorQuery().select('#topCover').boundingClientRect(function (rect) {
			that.scheight = Math.round(that.phoneHeight/2) + rect.height
		}).exec();	
		
       
    },
    methods: {
		async getBookInfo(){
			let list = await this.$request(
				`/book/query/borrow/${this.bookId}`,
				{}, 'GET')
			this.bookInfo = list.data.body
		 },
		 async borrowBook(type){
			 if(type == 3){
				 uni.navigateBack({
					delta:1
				 })
				return 
			 }
			 let title = type==1?'借阅':type==2?'续借':'归还'
			 uni.showModal({
			     title: `${title}书籍`,
			     content: `您是否要${title}此书籍?`,
			     success: async (res) => {
					 let list = {}
			         if(res.confirm) {
							 if(type === 1){
								 list = await this.$request(
									`/book/borrow/${this.bookId}`,
									{}, 'put')
									
									
							 }else if(type === 2){
								 list = await this.$request(
									`/book/renew/${this.bookId}`,
									{}, 'put')
									
							 }else{
								list = await this.$request(
									`/book/return/${this.bookId}`,
									{}, 'put')
									
							 }
							 if(list.data.status === 200){
								this.getBookInfo()
								uni.showToast({
									title: list.data.body,
									
								})
								
							 	
							 }
							 
							 
			         } else if(res.cancle) {}
			     }
			 })

		 },
        getBookDetail(id) {
            let that = this
            uni.request({
                // #ifdef MP-WEIXIN
                url: this.serverUrl + '/book/'+id,
                // #endif
                // #ifdef H5
                url: '/api/book/'+id,
                // #endif
                method:'GET',
                data: {},
                header: {
                    'Content-Type': 'application/json; charset=UTF-8' //自定义请求头信息
                },
                success: (res) => {
                    that.bookDatas = res.data.data
                    if (that.bookDatas.status === 1) {
                        this.isBorrowDis = true
                        this.isReverDis = false
                    } else {
                        this.isBorrowDis = false
                        this.isReverDis = true
                    }

                    if (res.data.code !== 0 || res.data.code != '0') {
                        that.errorMsg = res.data.msg,
                        uni.showToast({
                            title: that.errorMsg,
                            icon: 'none'
                        }, 2000)
                    }
                }
            })
        },
        // borrowBook(id) {
        //     let url = '/user/borrow/'+id
        //     let method = 'PUT'
        //     uni.showModal({
        //         title: '借阅书籍',
        //         content: '您是否要借阅此书籍?',
        //         success: (res) => {
        //             if(res.confirm) {
        //                 if (this.token) {
        //                     this.isBorrowDis = true
        //                     this.operateBook(id,url, method)
        //                 } else {
        //                     uni.showModal({
        //                         title: '登录提示',
        //                         content: '您未登录,请您前往"我的界面"进行登录!'
        //                     })
        //                 }
        //             } else if(res.cancle) {}
        //         }
        //     })
        // },
        operateBook(id, url, method) {
            let that = this
            uni.request({
                // #ifdef MP-WEIXIN
                url: this.serverUrl + url,
                // #endif

                // #ifdef H5
                url:'/api' + url,
                // #endif
                method: method,
                data: {},
                header: {
                    "token": this.token,
                    'Content-Type': 'application/json; charset=UTF-8',
                    'X-Requested-With': 'XMLHttpRequest'
                },
                success: (res) => {
                    uni.showToast({
                        title: '操作成功',
                        icon: 'success',
                        success: (res) => {
                            setTimeout(function () {  
                                uni.hideToast()
                            }, 2000)
                        }
                    }, 2000)

                    uni.redirectTo({
                        url: '../bookDetail/BookDetail?id='+id
                    })

                    that.isBorrowDis = false

                    if (res.data.code != '0' || res.data.code != 0) {
                        that.errorMsg = res.data.msg,
                        uni.showToast({
                            title: that.errorMsg,
                            icon: 'none',
                            success: (res) => {
                                uni.hideToast()
                            }
                        }, 2000)
                    }
                }
            })
        },
        back() {
            uni.navigateBack({
                delta: 2
            })
        }
    }
}
</script>

<style lang="scss">
.book-detail {
	background-color: #f5f5f5;
    height: 100%;
    .book-data {
        .for-books {
			background: white;
            border-radius: 5px;
            padding: 10px;
            display: flex;
            padding-bottom: 2%;
            image {
                border-radius: 5%;
                width: 120px;
                height: 120px;
            }
            view {
                width: 100%;
                margin-top: 2%;
                margin-left: 2%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                view {
                    display: flex;
                    flex-direction: row;
                    justify-content: left;
                    align-items: center;
                    .book-description {
                        color: rgb(44, 42, 32);
                        font-size: 16px;
                        margin-left: 2%;
                        font-weight: 600;
                    }
                    text {
                        font-family: monospace;
                        margin-left: 2%;
                    }
                    font {
                        color: #000000;
                        font-size: 12px;
                        font-family: sans-serif;
                        margin-left: 3%;
                    }
                }
            }
            .hide-content {
                overflow: hidden; 
                text-overflow: ellipsis; 
                white-space: nowrap;
                display: block;
                max-width: 240px;
				.book-name{
					font-size: 32rpx;
					font-weight: bold;
					color: gray;
				}
				.book-author{
					font-size: 12px;
					color: gray;
				}
            }
        }
        .for-detail{
			background-color: white;
			padding: 10rpx;
			.panel-detail{
				    display: flex;
				    flex-direction: row;
					margin: 10rpx 0;
			}
			.order1,.order2{
				font-size: 32rpx;
				margin-left: 20rpx;
			}
			.panel1,.panel2{
				font-size: 28rpx;
				color: gray;
				margin-left: 20rpx;
			}
			.panel2{
				flex:1
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
    }
	.set-warning{
		background-color: white;
		padding: 10rpx;
		.warn-text{
			font-size: 24rpx;
			display: block;
			margin-top: 20rpx;
			margin-left: 20rpx;
            color: gray;
			font-family: monospace;
		}
		.text2{
			color: orange
		};
	}
    .buttons {
        position: fixed;
		width: 100%;
		flex-direction: row;
        bottom: 40rpx;
        height: 90rpx;
        display: flex;
        letter-spacing: 10px;
		.borrow-button{
			background: #4881e6;
			color: white;
			width: 250rpx;
			border-radius: 50rpx;
		}
		.default-btn{
			border: 1rpx solid #4881e6;
			color: #4881e6;
			width: 250rpx;
			border-radius: 50rpx;
		}
    }
}
</style>