<template>
	<web-view :src="url" :update-title="false"></web-view>
</template>

<script>
	export default {
		data(){
			return {
				url:''
			}			
			
		},
		onLoad(options){
			this.url = options.url
			
		},
		onReady(){
			setTimeout(()=>{
				uni.setNavigationBarTitle({
					title:'知识文库详情'
				})
			},2000)
		}
		
	}
</script>

<style>
</style>