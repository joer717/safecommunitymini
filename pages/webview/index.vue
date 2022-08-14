<template>
	<view class="content">
		<navTop :showNav="false">文章详情</navTop>
		<!-- <jyf-parser :html="content" :use-cache="true" :show-with-animation="true">
			
		</jyf-parser> -->
		<!-- <rich-text :nodes="content"></rich-text> -->
		<mp-html :content="content" />
		<!-- <div v-html="content"></div> -->
		<view class="num">
			<view>
				<image src="@/static/img/common/read.png" mode=""></image>
				{{detailData.readNumber}}
			</view>
			<view>
				<block v-if="detailData.userLike">
					<image @click="knowledgeLike('0')" src="@/static/img/common/favour_s.png" mode=""></image>
				</block>
				<block v-else>
					<image @click="knowledgeLike('1')" src="@/static/img/common/favour.png" mode=""></image>
				</block>
				{{detailData.likeNumber}}
			</view>
			<view>
				<block v-if="detailData.userCollect">
					<image @click="knowledgeCollect('0')"  src="@/static/img/common/star_s.png" mode=""></image>
				</block>
				<block v-else>
					<image @click="knowledgeCollect('1')"  src="@/static/img/common/star.png" mode=""></image>
				</block>
				{{detailData.collectNumber}}
			</view>
		</view>
		</view>
</template>

<script>
	//import marked from 'marked';
	
	//import jyfParser from '@/components/jyf-parser/jyf-parser';
	import navTop from "@/components/navTop.vue"
	export default {
			components: {
				//jyfParser,
				navTop,
				
			},
		data(){
			return {
				content:'',
				detailData:{}
			}			
			
		},
		onLoad(options){
			this.content = JSON.parse(decodeURIComponent(options.content))
			this.detailData = JSON.parse(decodeURIComponent(options.detailData))
			this.content = "<div style='font-size:32rpx;font-weight:bold;margin-bottom:10rpx'>"+this.detailData.title+"</div><div style='font-size:20rpx;color:#999;margin-bottom:30rpx;'>"+this.detailData.gmtCreated+"</div>"+this.content
			console.log(this.content)
		},
		methods: {
			/**
			 * 
			 * 点赞
			 */
			async knowledgeLike(isLike){
				let likeInfo = await this.$request(`knowledge/knowledge/kInfoApp/likeOrCancelLike/${this.detailData.knowledgeId}/${isLike}`,{
					hideloading:true
				},'PUT');
				
				if(likeInfo.data.status==200){
					this.detailData['userLike'] = !this.detailData['userLike']
					if(isLike=='1'){
						this.detailData['likeNumber'] = this.detailData['likeNumber']+1
					}else{
						this.detailData['likeNumber'] = this.detailData['likeNumber']-1
					}
				}				
			
			},
			/**
			 * 
			 * 收藏
			 */			
			async knowledgeCollect(isCollect){
				
				let collectInfo = await this.$request(`knowledge/knowledge/kInfoApp/collectOrCancelCollect/${this.detailData.knowledgeId}/${isCollect}`,{
					hideloading:true
				},'PUT');
				
				if(collectInfo.data.status==200){
					this.detailData['userCollect'] = !this.detailData['userCollect']
					if(isCollect=='1'){
						this.detailData['collectNumber'] = this.detailData['collectNumber']+1
					}else{
						this.detailData['collectNumber'] = this.detailData['collectNumber']-1
					}
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.num {
		position: fixed;
		bottom: 0;
		background: #fff;
		width: 100%;
		padding: 24rpx 0;
		box-sizing: border-box;
		display: flex;
		justify-content: space-around;
		font-size: 24rpx;
		font-family: PingFang SC-Medium, PingFang SC;
		font-weight: 500;
		color: #666666;
	
		view {
			display: flex;
			align-items: center;
			justify-content: flex-start;
	
			image {
				width: 28rpx;
				height: 25rpx;
				margin-right: 15rpx;
			}
		}
	
	}
	/* table 样式 */
	table {
	  border-top: 1px solid #ccc;
	  border-left: 1px solid #ccc;
	}
	table td,
	table th {
	  border-bottom: 1px solid #ccc;
	  border-right: 1px solid #ccc;
	  padding: 3px 5px;
	}
	table th {
	  border-bottom: 2px solid #ccc;
	  text-align: center;
	}
	
	/* blockquote 样式 */
	blockquote {
	  display: block;
	  border-left: 8px solid #d0e5f2;
	  padding: 5px 10px;
	  margin: 10px 0;
	  line-height: 1.4;
	  font-size: 100%;
	  background-color: #f1f1f1;
	}
	
	/* code 样式 */
	code {
	  display: inline-block;
	  display: inline;
	  zoom: 1;
	  background-color: #f1f1f1;
	  border-radius: 3px;
	  padding: 3px 5px;
	  margin: 0 3px;
	}
	pre code {
	  display: block;
	}
	
	/* ul ol 样式 */
	ul, ol {
	  margin: 10px 0 10px 20px;
	}
	/deep/._root{
		padding: 10rpx 15rpx !important;
	}
</style>