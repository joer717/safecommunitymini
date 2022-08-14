/**
 * 内容+长方形图片+底部
 */
<template>
	<view class="rectangle">
		<contentInfo></contentInfo>
		<contentImg
			shape='rectangle'></contentImg>
		<contentBottom></contentBottom>
	</view>
</template>

<script>
	import contentInfo from "@/components/contentInfo.vue"
	import contentBottom from "@/components/contentBottom.vue"
	import contentImg from "@/components/contentImg.vue"
	export default {
		components: {
			contentBottom,
			contentInfo,
			contentImg
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
	.rectangle{
		border-bottom: 1rpx solid rgba(0, 0, 0, 0.1000);
	}
</style>