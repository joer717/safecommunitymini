<template>
	<view class="tab-box" :style="{marginTop: navtop + 'px'}">
		<view class="tab-list" :class="tabIndex == index ? 'tab-list-bg' : ''" @click="clickTab(index)" v-for="(item, index) in tabData" :key="index">
			{{item.name}}
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			tabData: {
				type: Array,
				default: null
			}
		},
		data() {
			return {
				tabIndex: 0,
				navtop: 0
			}
		},
		mounted() {
			this.navtop = getApp().globalData.navHeight;
		},
		methods: {
			clickTab(index) {
				console.log(index)
				this.tabIndex = index
				this.$emit('tabIndex', this.tabIndex)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tab-box{
		width: 750rpx;
		height: 98rpx;
		background: #FFFFFF;
		display: -webkit-flex;
		justify-content: space-around;
	}
	.tab-list{
		height: 96rpx;
		line-height: 96rpx;
		font-size: 28rpx;
		color: #666666;
	}
	.tab-list-bg{
		color: #2B6DDD;
		border-bottom: 1px solid #2B6DDD;
	}
</style>