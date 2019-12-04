<template>
	<view class='help-container'>
		<image class="img" v-if="info.status==0" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GndUW3a1UarD8yKON3YUcuXgUhrr4l1IqYsJicRZyfjgyviaO321GRWFVYkhMuyIeIzfqEx1rHicsRg/0" mode=""></image>
		<image class="img" v-else src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GndUW3a1UarD8yKON3YUcuH1Atwz2WxscBZs2FcNRt94RfqKUyY437dZictUNNLPp71aOVxWHCzaQ/0" mode=""></image>
		<view class='show-status'>{{info.msg}}</view>
		<navigator open-type="switchTab" class='continue-btn' url='/pages/index/index'>继续冲榜 ></navigator>
	</view>
</template>

<script>
	import modalComponent from '@/components/modalComponent.vue'
	import btnComponent from '@/components/btnComponent.vue'
	import listItemComponent from '@/components/listItemComponent.vue'
	export default {
		components: {
			modalComponent,
			btnComponent,
			listItemComponent
		},
		data() {
			return {
				info: {}
			};
		},
		onShareAppMessage(e) {
			const shareType = e.target && e.target.dataset.share
			return this.$app.commonShareAppMessage(shareType)
		},
		onLoad() {
			this.loadData()
		},
		onShow() {},
		methods: {
			loadData() {
				this.$app.request('ext/redress', {}, res => {
					this.info = res.data
				})
			}
			
		}
	}
</script>

<style lang="scss" scoped>

		.help-container {
			width: 100%;
			padding-top: 175rpx;
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: center;
		}

		.help-container .img {
			width: 190rpx;
			height: 210rpx;
			display: block;
		}

		.show-status {
			width: 400rpx;
			text-align: center;
			line-height: 2;
			font-size: 40rpx;
			font-weight: 600;
			color: #666;
		}

		.msg {
			width: 100%;
			height: 110rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #ff9600;
			line-height: 38rpx;
			font-size: 28rpx;
			text-align: center;
		}

		.continue {
			width: 100%;
			line-height: 50rpx;
			font-size: 30rpx;
			color: #9f9b9f;
			text-align: center;
		}

		.continue-btn {
			width: 450rpx;
			height: 90rpx;
			margin: 10rpx auto;
			background-color: #ffba00;
			font-size: 37rpx;
			line-height: 90rpx;
			border-radius: 45rpx;
			text-align: center;
			color: #6c3800;
			font-weight: bold;
		}

		.bottom-btn {
			width: 250rpx;
			position: fixed;
			bottom: 80rpx;
			left: 250rpx;
			text-align: center;
			text-decoration: underline;
			color: #fff;
			font-size: 28rpx;
		}
</style>
