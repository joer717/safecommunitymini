/**
* 视频课程--课程评价底部
*/
<template>
	<view class="evaluateBottom">
		<view class="item">
			<!-- <input type="text" placeholder="写评论122" confirm-type="confirm" :bindconfirm='doSearch'/> -->
			 <input 
				ref="input"
			     class="evaluate-text"
				 type="text" 
				 v-model='inputValue' 
				 @confirm="confirmTap"
				 confirm-type="send"
				 :focus="focus"
				 :adjust-position="false"
				 @focus="inputFocus"
				 :style="{marginBottom: inputHeight+'px'}"
				 @blur="inputBlur"
				 :placeholder="replyMan!=''?'回复'+replyMan:'快发表你的看法吧~'"
			 />
			<image @click="subComment" class="icon" src="@/static/img/videodetail/plane.png" mode=""></image>
			
			<block v-if="vedioData.userCollect">
				<image @click="videoItemCollect('0')" class="icon" src="@/static/img/common/star_s.png" mode=""></image>
			</block>
			<block v-else>
				<image @click="videoItemCollect('1')" class="icon" src="@/static/img/common/star.png" mode=""></image>
			</block>			
		</view>
	</view>
</template>

<script>
	
	export default {
	
		props: {
			vedioData: {
				type: Object,
				default: {},
			},
			replyMan:{
				type: String,
				default: '',
			}
		},			
		data(){
			return{
				inputValue:'',
				inputHeight:0,
				focus:false
			}
		},
		
		methods: {
			confirmTap(){
				
				this.subComment()
			},
			inputFocusM(){
					this.focus = true
			},
			inputFocus(e) {
			    console.log(e,'键盘弹起')
			     
			    if (e.detail.height) {
			      this.inputHeight = e.detail.height
			    }
				// console.log(this.inputHeight)
			},
			inputBlur() {
			    console.log('键盘收起')
				this.$emit('reset')
				this.inputHeight = 0
				this.focus = false
			},
			/**
			 * 评论提交
			 */
			subComment(){
				this.$emit('commitComment',this.inputValue)
				this.inputValue = '';
			},
			/**
			 * 
			 * 收藏
			 */			
			async videoItemCollect(isCollect){
				
				let collectInfo = await this.$request(`video/video/vInfoApp/collectOrCancelCollect/${this.vedioData.videoId}/${isCollect}`,{
					hideloading:true
				},'PUT');
				if(collectInfo.data.status==200){
					this.$emit('updateVedioData','userCollect',isCollect==1?true:false,'collectNumber')
				}
				
			}		
		}
	}
</script>

<style scoped lang="scss">
	.evaluateBottom {
		z-index: 99;
		width: 750rpx;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
		display: flex;
		justify-content: center;
		align-items: center;
		border-top: 1px solid rgba(0, 0, 0, 0.1);
		padding-top: 24rpx;
		padding-bottom: 47rpx;
		background-color: #ffffff;
		.evaluate-text{
			height: 55rpx;
		}
		.item {
			width: 670rpx;
			line-height: 60rpx;
			display: flex;
			justify-content: space-between;
			input {
				width: 494rpx;
				background-color: #F2F2F2;
				border-radius: 30rpx 30rpx 30rpx 30rpx;
				padding-left: 52rpx;
				font-size: 26rpx;
				position: relative;
			}

			input::before {
				content: '';
				position: absolute;
				left: 10rpx;
				top: 0;
				bottom: 0;
				margin: auto;
				width: 30rpx;
				height: 24rpx;
				background-image: url(@/static/img/videodetail/leaf.png);
				background-repeat: no-repeat;
				background-size: 100% 100%;
			}

			image {
				width: 50rpx;
				height: 50rpx;
			}


		}

	}
</style>
