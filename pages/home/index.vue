/**
 * 主页 
 */
<template>
	<view class="home">	
		<navTop :showNav='showNav'>安全社区，链接你和我</navTop>
		<topSwiper 
			@changeSelectIndex='changeSelectIndex'
			:selectIndex='selectIndex'>
		</topSwiper>
		<author></author>
		<square></square>
		<rectangle></rectangle>
		<recommend></recommend>
		<bottom class='bottom-pos'></bottom>
	</view>
</template>

<script>
	import navTop from "@/components/navTopIndex.vue"
	import topSwiper from "@/pages/index/components/topSwiper.vue"
	import author from './components/author.vue'
	import square from './components/square.vue'
	import rectangle from './components/rectangle.vue'
	import recommend from './components/recommend.vue'
	import bottom from "@/components/bottom.vue"
	export default {
		components:{
			navTop,
			topSwiper,
			author,
			square,
			rectangle,
			recommend,
			bottom
		},
		data() {
			return {
				selectIndex:0,
				showNav:true
			}
		},
		async onLoad() {
			
			
		},
		async mounted() {
			
		},
		methods: {
			/**
			 * 滑动切换图片
			 */
			changeSelectIndex(index){
				this.selectIndex = index
			}
		}
	}
</script>

<style>
	.home {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: #fff;
		padding-bottom: 200rpx;
	}
	.bottom-pos{
		position: fixed;
		bottom: 0;
		margin: auto;
	}
</style>
