/**
 * 内容图片组件
 * square 正方形 rectangle 长方形
 */
<template>
	<listItemCover>
		<view class="content-imgs">
			<block v-if="shape=='square'">
				<block v-for="(item , index) in imgs" :key="index">
					<block v-if="parseInt(index%3)==1">
						<image class="square maglr" :src="item.img" mode=""></image>
					</block>
					<block v-else-if="parseInt(index%3)==2">
						<image class="square" :src="item.img" mode=""></image>
					</block>				
					<block v-else-if="parseInt(index%3)==0">
						<image class="square" :src="item.img" mode=""></image>
					</block>								
				</block>
			</block>
			<block v-else>
				<block v-for="(item , index) in imgs" :key="index">
					<block v-if="parseInt(index%3)==1">
						<image class="rectangle rmaglr" :src="item.img" mode=""></image>
					</block>
					<block v-else-if="parseInt(index%3)==2">
						<image class="rectangle" :src="item.img" mode=""></image>
					</block>				
					<block v-else-if="parseInt(index%3)==0">
						<image class="rectangle" :src="item.img" mode=""></image>
					</block>								
				</block>	
			</block>
				
		</view>
	</listItemCover>
</template>

<script>
	import listItemCover from './contentCover.vue'
	export default {
		components: {
			listItemCover
		},		

		props: {
			shape: {
				type: String,
				default: 'square',
			}			
		},			
		data() {
			return {
				tabIndex: 0,
				navtop: 0,
				imgs: [{
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
		mounted() {
			
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.content-imgs{
		width: 670rpx;
		.square{
			width: 210rpx;
			height: 210rpx;
		}
		.maglr{
			margin-left: 20rpx;
			margin-right: 20rpx;
		}
		.rectangle{
			width: 210rpx;
			height: 120rpx;
		}
		.rmaglr{
			margin-left: 20rpx;
			margin-right: 20rpx;
		}		
	}
</style>