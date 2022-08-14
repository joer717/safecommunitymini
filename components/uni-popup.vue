<template>
	<uni-popup ref="subPopup" type="center" :mask-click="maskFlag" @maskClick="maskClick">
		<view class="popup_box">
			<image class="pop_icon" src="@/static/img/examination/popup-icon.png"></image>
			<slot></slot>
		</view>
	</uni-popup>
</template>

<script>
	export default {
		props: {
			submitStatus: {
				type: Number,
				value: 0
			},
			maskFlag: {
				type: Boolean,
				value: true
			}
		},
		data() {
			return {
				
			}
		},
		watch: {
			submitStatus: {
				handler(newValue) {
					console.log('newValue', newValue)
					if(this.$refs.subPopup) {
						if(newValue == 1) {
							this.$refs.subPopup.open("center")
						} else {
							this.$refs.subPopup.close()
						}
					}
					
				}
			}
		},
		created() {
			console.log('submitStatus', this.submitStatus)
		},
		methods: {
			maskClick() {
				console.log("===蒙层===")
				console.log('this.maskFlag', this.maskFlag)
				if(this.maskFlag) {
					let pages = getCurrentPages()
					console.log('pages=>', pages)
					let beforePage = pages[pages.length -2]
					console.log('beforePage=>', beforePage)
					beforePage.$vm.reFresh = Math.random()
					uni.navigateBack({
						delta:1
					})
				} else {
					this.$emit('submitStatusInfo', 0)
				}
				
			}
		}
	}
</script>
<style lang="scss" scoped>
	.popup_box{
		width: 570rpx;
		background: #FFFFFF;
		border-radius: 24rpx;
	}
	.pop_icon{
		width: 570rpx;
		height: 142rpx;
	}
</style>