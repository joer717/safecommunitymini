<!-- 视频课程收藏 -->
<template>
	<view class="videoCollection">
		<navTop :showNav="false">视频课程收藏</navTop>
		<view :style="{minHeight: phoneHeight+'rpx'}" class="scroll-content">
			<block v-for="(item, index) in videoData" :key="item.videoId">
				<videoLibrary
					@updateVideoItem="updateVideoItem"
					@jumpVideoItem='jumpItem' 
					:index="index" 
					:videoItem="item"></videoLibrary>
			</block>
		</view>
	</view>
</template>

<script>
	import navTop from "@/components/navTop.vue"
	import videoLibrary from "./components/videoLibrary.vue"
	export default {
		components: {
			navTop,
			videoLibrary
		},
		data() {
			return {
				phoneHeight: 0,
				videoData: [],
				totalPage: 0, // 总页数
				videoParameter: {
					pageNo: 1,
					pageSize: 10
				}
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success: (res) => {
					this.phoneHeight = (res.windowHeight*(750/res.windowWidth)) - (getApp().globalData.navHeight)*(750/res.windowWidth)
					console.log(this.phoneHeight, 'phoneHeight')
				}
			})
			uni.showNavigationBarLoading()
			this.videoDataInfo()
		},
		onShow() {
			this.videoDataInfo()
		},
		onReachBottom() {
			uni.showNavigationBarLoading()
			this.videoParameter.pageNo++;
			if(this.videoParameter.pageNo > this.totalPage) {
				uni.hideNavigationBarLoading()
				uni.showToast({
					title: '暂无更多数据'
				})
			} else {
				console.log("==========")
				this.videoDataInfo()
			}
		},
		methods: {
			/**
			 * @param {Object} pageurl
			 * 跳转自组件事件
			 */
			jumpItem(pageurl){
				uni.navigateTo({
					url: pageurl
				})
			},
			// 视频课程收藏列表
			async videoDataInfo() {
				this.videoData =[]
				let list = await this.$request("video/video/vInfoApp/collect", this.videoParameter, 'POST')
				console.log(list, "===list")
				let data = list.data.body
				this.totalPage = data.pages
				if(this.videoParameter.pageNo == 1) {
					this.videoData = data.list
				} else {
					this.videoData = this.videoData.concat(data.list)
				}
				uni.hideNavigationBarLoading()
			},
			/**
			 * @param {Object} likeCollect 是点赞还是收藏
			 * @param {Object} index 在数据中下标	
			 * @param {Object} state 状态
			 * 更新列表点赞 收藏数据
			 */
			updateVideoItem(likeCollect,index,state,updateNum){
				this.videoData[index][likeCollect] = state
				if(state){
					this.videoData[index][updateNum] = this.videoData[index][updateNum]+1
				}else{
					this.videoData[index][updateNum] = this.videoData[index][updateNum]-1
				}
				if(likeCollect == 'userCollect') {
					// 收藏
					console.log('index---->', index)
					if(this.videoData.length <= 1) {
						this.videoData = []
					} else {
						this.videoData.splice(index, 1)
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.videoCollection{
		background-color: #F1F3F9;
	}
	.scroll-content{
		padding-bottom: 40rpx;
	}
</style>