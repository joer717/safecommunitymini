/**
 * 主页 
 */
<template>
	<view class="content">	
		<navTop>学习</navTop>
		<indexTop></indexTop>
		<indexOp></indexOp>
		<indexRecommend></indexRecommend>
		<!--
		<image class="logo" src="@/static/logo.png"></image>
		-->
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		<view class="index-bottom">
			qwe
		</view>
		
		<bottom class='bottom-pos'>
			<view class="circle"></view>
		</bottom>
	</view>
</template>

<script>
	import bottom from "@/components/bottom.vue"
	import navTop from "@/components/navTop.vue"
	import indexTop from "./components/indexTop.vue"
	import indexOp from "./components/indexOp.vue"
	import indexRecommend from "./components/indexRecommend.vue"
	
	import {encryptDes} from '@/api/DES.js';
	import {parseTime} from '@/utils/time.js';
	import { login } from '@/api/auth.js';
	export default {
		components:{
			navTop,
			bottom,
			indexTop,
			indexOp,
			indexRecommend
		},
		data() {
			return {
				title: ''
			}
		},
		async onLoad() {
			
			//await login('admin','admin@123asd')
			
			
			// let testapi = await this.$request('knowledge/knowledge/kInfoApp/getHotKnowledge',{
				
			// },'GET')
			// console.log('this.$tools-111->', testapi)
			// this.initinfo()
			
		},
		async mounted() {
			// await login('zbf','zbf123456')
			
			// this.initinfo()
		},
		methods: {
			/**
			 * 测试接口调用
			 */
			async initinfo(){
				
				let testapi = await this.$request('knowledge/knowledge/kInfoApp/getKnowledge',{
					
						"enterpriseId": 0,
						"knowledgeTypeId": "",
						"pageNo": 0,
						"pageSize": 0,
						"title": "",
						"userId": 0
					
				},'POST')
				
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: #F0F5FA;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
	.index-bottom{
		width: 300rpx;
		position: fixed;
		bottom: 100rpx;
		margin: auto;
		background-color: aquamarine;
	}
	.bottom-pos{
		position: fixed;
		bottom: 0;
		left:0;
		right:0;
		margin: auto;
	}
	.circle{
		position: fixed;
		bottom: 45rpx;
		width: 140rpx;
		height: 140rpx;
		border-radius: 70rpx;
		background: white;
		box-shadow: 3px 0 6px rgba(0,0,0,0.1);
	}
	
</style>
