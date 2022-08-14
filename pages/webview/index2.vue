<!-- <template>
	<view class="content">
		<navTop :showNav="false">文章详情</navTop>
		<jyf-parser :html="content" :use-cache="true" :show-with-animation="true">
			
		</jyf-parser>
		
		</view>
</template>

<script>
	import marked from 'marked';
	import jyfParser from '@/components/jyf-parser/jyf-parser';
	import navTop from "@/components/navTop.vue"
	export default {
			components: {
				jyfParser,
				navTop
			},
		data(){
			return {
				content:''
			}			
			
		},
		onLoad(options){
			this.content = JSON.parse(decodeURIComponent(options.content))
		},
		onReady(){
			
		}
		
	}
</script>

<style>
</style> -->