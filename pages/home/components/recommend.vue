/**
* 热门推荐+底部
*/
<template>
	<view class="recommend">
		<contentRecommend></contentRecommend>
		<contentBottom></contentBottom>
	</view>
</template>

<script>
	import contentBottom from "@/components/contentBottom.vue"
	import contentRecommend from "@/components/contentRecommend.vue"
	export default {
		components: {
			contentBottom,
			contentRecommend
		},
		data() {
			return {
				recommendData: {
					title: '白帽网络安全渗透测试训练营',
					context: '课程内容根据开源网安在网络安全、互联网、金融、通信等行业的软...',
					time: '2022-07-12'
				}
			}
		},
		methods: {

		}
	}
</script>

<style scoped lang="scss">
	.recommend {
		border-bottom: 1rpx solid rgba(0, 0, 0, 0.1000);
	}
</style>
