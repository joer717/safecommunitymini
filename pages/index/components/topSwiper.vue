/**
* 顶部
*/
<template>
	<view class="top-swiper">
		<view class="page-section-spacing">
			<scroll-view class="scroll-view_H" scroll-x="true" bindscroll="scroll" style="width: 100%">
				<block v-for="(item , index) in banner" :key="item.name">
					<view 
						:class="selectIndex==index?'scroll-view-item_H select':'scroll-view-item_H' " 
						@click="changeCurrent(index)">
						{{item.name}}
					</view>
				</block>
			</scroll-view>
		</view>

		<swiper class="swipe" 
				:circular="circular" 
				:current="swipeActiveIndex"
				
				 @change="swiperChange" >
			<block v-for="(item , index) in banner" :key="index">
				<swiper-item>
					<view class="swipe-item">
						<image :src="item.img"></image>
					</view>
				</swiper-item>
			</block>
		</swiper>
	</view>
</template>

<script>
	export default {
		props: {
			selectIndex: {
				type: Number,
				default: 0,
			},
		},
		data() {
			return {
				swipeActiveIndex:0,
				banner: [{
					name: '关注',
					img: 'https://www.liuyan.store/hdfs/userFile/download/wechat&banner&banner12x.png'
				}, {
					name: '推荐',
					img: 'https://www.liuyan.store/hdfs/userFile/download/wechat&banner&banner22x.png'
				}, {
					name: '热榜',
					img: 'https://www.liuyan.store/hdfs/userFile/download/wechat&img&img12x.png'
				}, {
					name: '动态',
					img: 'https://www.liuyan.store/hdfs/userFile/download/wechat&img&img22x.png'
				}, {
					name: '学习',
					img: 'https://www.liuyan.store/hdfs/userFile/download/wechat&img&img32x.png'
				}, {
					name: '问答',
					img: 'https://www.liuyan.store/hdfs/userFile/download/wechat&img&img22x.png'
				}, {
					name: '文库',
					img: 'https://www.liuyan.store/hdfs/userFile/download/wechat&img&img32x.png'
				}, ]
			}
		},
		onLoad(options) {

		},
		mounted() {

		},
		methods: {
			changeCurrent(index){
				this.swipeActiveIndex = index;
				this.$emit('changeSelectIndex',index)
			},
			swiperChange(e){
				this.$emit('changeSelectIndex',e.detail.current)
			}

		}
	}
</script>

<style lang="scss" scoped>
	.top-swiper {
		width: 750rpx;
		background-color: #ffffff;
	}

	.swipe {
		width: 750rpx;
		height: 273rpx;

		.swipe-item {
			width: 750rpx;
			height: 273rpx;

			image {
				width: 750rpx;
				height: 273rpx;
			}
		}
	}

	.page-section-spacing {
		height: 96rpx;
		.scroll-view_H {
			white-space: nowrap;
		}
		.scroll-view-item_H {
			padding-left: 38rpx;
			padding-right: 38rpx;
			display: inline-block;
			text-align: center;
			position: relative;
			background-color: #ffffff;
			font-size: 28rpx;
			font-weight: bold;
			color: #333333;
			line-height: 96rpx;
		}

		.select {
			color: #2B6DDD;
		}
		.select::after{
			content: '';
			font-size: 32rpx;
			width: 30rpx;
			height: 5rpx;
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			margin: auto;
			background-color:#2B6DDD;
		}
	}
</style>
