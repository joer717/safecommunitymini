/**
 * 内容+底部
 */
<template>
	<view class="author">
		<contentInfo></contentInfo>
		<contentBottom></contentBottom>
	</view>
</template>

<script>
	import listItemCover from '@/components/contentCover.vue'
	import contentInfo from "@/components/contentInfo.vue"
	import contentBottom from "@/components/contentBottom.vue"
	export default {
		components: {
			listItemCover,
			contentBottom,
			contentInfo
		},		
		data() {
			return {
				tabIndex: 0,
				navtop: 0
			}
		},
		mounted() {
			
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.author{
		border-bottom: 1rpx solid rgba(0, 0, 0, 0.1000);
	}
	// .content-bottom{
	// 	width: 100%;
	// 	display: flex;
	// 	justify-content: space-between;
	// 	.content-bottom-item{
	// 		font-size: 24rpx;
	// 		line-height: 80rpx;
	// 		image{
	// 			width: 28rpx;
	// 			height: 27rpx;	
	// 			margin-right:5rpx ;
	// 		}
	// 	}
	// }
</style>