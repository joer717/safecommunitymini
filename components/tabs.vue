/**
 * tabs 切换通用样式
 */
<template>
	<view class="tabs">
		<block v-for="(item,index) in tabData" :key="item.tabName">
			<block v-if="selectTabIndex==index">
				<view class="item select">
					{{item.tabName}}
				</view>		
			</block>
			<block v-else>
				<view class="item" @click="changeTab(index)">
					{{item.tabName}}
				</view>		
			</block>			
		</block>
		
	</view>
</template>

<script>
	
	export default {
		props: {
			tabData: {
				type: Array,
				default:[]
			},
			selectTabIndex:{
				type: Number,
				default:0				
			}
		},
		data() {
			return {
				selectIndex:0
			}
		},
		onLoad(options) {
			
		},		
		mounted() {
			
		},
		methods: {
			changeTab(selectIndex){
				this.$emit('changeTab',selectIndex)
			}
		}
	}
</script>

<style scoped lang="scss">
	.tabs{
		width: 750rpx;
		display: flex;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		.item{
			flex: 1;
			line-height: 88rpx;
			font-size: 28rpx;
			text-align: center;
			position: relative;
		}
		.select{
			color: rgba(43, 109, 221, 1);
		}
		.select::after{
			content: '';
			width: 50rpx;
			height: 4rpx;
			background-color: rgba(43, 109, 221, 1);
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			margin: auto;
		}
	}
</style>