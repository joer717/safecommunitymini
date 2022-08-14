/**
* 视频详情页面
*/
<template>
	<view class="">
		<Tabs></Tabs>
		<videoDetail></videoDetail>
		<knowledgeDetail></knowledgeDetail>
	</view>
</template>

<script>
	import Tabs from '@/components/tabs.vue'
	import videoDetail from './components/repositoryListDetail/videoDetail.vue'
	import knowledgeDetail from './components/repositoryListDetail/knowledgeDetail.vue'
	export default {
		components:{
			videoDetail,
			knowledgeDetail,
			Tabs
		}
	}
</script>

<style scoped lang="scss">
	
</style>