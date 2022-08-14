<template>
	<view class="timerC">
		正计时：{{time}}
	</view>
</template>
<script>
	export default {
		props: {
			clearTime: Boolean
		},
		data() {
			return {
				time: '00:00:00',
				timer: null,
				hour: 0,
				minutes: 0,
				seconds: 0
			}
		},
		watch: {
			clearTime:{
				handler(value) {
					if(value) {
						clearInterval(this.timer)
					}
				}
			}
		},
		mounted() {
			console.log("=-=-==========")
			this.begin()
		},
		destroyed() {
			clearInterval(this.timer)
		},
		methods: {
			// 开始计时
			begin() {
				this.timer = setInterval(this.startTimer, 1000)
			},
			startTimer() {
				console.log("==startTimer=")
				this.seconds += 1;
				if(this.seconds >= 60) {
					this.seconds = 0;
					this.minutes = this.minutes + 1;
				}
				if(this.minutes >= 60) {
					this.minutes = 0;
					this.hour = this.hour + 1;
				}
				this.time = (this.hour < 10 ? '0' + this.hour : this.hour) + ':' + (this.minutes < 10 ? '0' + this.minutes : this.minutes) + ':' + (this.seconds < 10 ? '0' + this.seconds : this.seconds)
			}
		}
	}
</script>
<style lang="scss" scoped>
	.timerC{
		font-size: 28rpx!important;
	}
</style>