<!-- 知识文库收藏 -->
<template>
	<view class="knowledge">
		<navTop :showNav="false">知识文库收藏</navTop>
		<view :style="{minHeight: phoneHeight+'rpx'}" class="scroll-content">
			<block v-for="(item, index) in knowledgeData" :key="item.knowledgeId">
				<knowledgeLibrary
					@updateKnowledge="updateKnowledge"
					:index="index" 
					:knowledge="item"></knowledgeLibrary>
			</block>
		</view>
	</view>
</template>

<script>
	import navTop from "@/components/navTop.vue"
	import knowledgeLibrary from './components/knowledgeLibrary.vue'
	export default {
		components: {
			navTop,
			knowledgeLibrary
		},
		data() {
			return {
				phoneHeight: 0,
				knowledgeData: [],
				totalPage: 0, // 总页数
				knowledge: {
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
			this.knowledgeInfo()
		},
		onReachBottom() {
			uni.showNavigationBarLoading()
			this.knowledge.pageNo++;
			if(this.knowledge.pageNo > this.totalPage) {
				uni.hideNavigationBarLoading()
				uni.showToast({
					title: '暂无更多数据'
				})
			} else {
				console.log("==========")
				this.knowledgeInfo()
			}
		},
		methods: {
			// 知识文库收藏列表
			async knowledgeInfo() {
				let list = await this.$request("knowledge/knowledge/kInfoApp/collect", this.knowledge, 'POST')
				console.log(list, "===list")
				let data = list.data.body
				this.totalPage = data.pages
				if(this.knowledge.pageNo == 1) {
					this.knowledgeData = data.list
				} else {
					this.knowledgeData = this.knowledgeData.concat(data.list)
				}
				uni.hideNavigationBarLoading()
			},
			/**
			 * @param {Object} likeCollect 是点赞还是收藏
			 * @param {Object} index 在数据中下标	
			 * @param {Object} state 状态
			 * 更新列表点赞 收藏数据
			 */
			updateKnowledge(likeCollect,index,state,updateNum){
				this.knowledgeData[index][likeCollect] = state
				if(state){
					this.knowledgeData[index][updateNum] = this.knowledgeData[index][updateNum]+1
				}else{
					this.knowledgeData[index][updateNum] = this.knowledgeData[index][updateNum]-1
				}
				if(likeCollect == 'userCollect') {
					// 收藏
					if(this.knowledgeData.length <= 1) {
						this.knowledgeData = []
					} else {
						this.knowledgeData.splice(index, 1)
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.knowledge{
		background-color: #F1F3F9;
	}
	.scroll-content{
		padding-bottom: 40rpx;
	}
</style>