<template>
	<view class="user-page-container">
		<view class="item-wrap">
			<view class="left-wrap">
				<image class="icon" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FbErFHtQGqUFhHAAsBqKtb1s9Tia2iaQibSQRBDMib6JgsF1Lhg6X4lbxWB8q9GW3pKgF5nqetvzYN6Q/0"
				 mode="aspectFill"></image>
				<view class="text">{{currency.score||0}}</view>
			</view>
			<view class="right-wrap iconfont iconjiantou"></view>
		</view>
		<view class="item-wrap">
			<view class="left-wrap">
				<image class="icon" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9Equ3ngUPQiaWPxrVxZhgzk90Xa3b43zE46M8IkUvFyMR5GgfJN52icBqoicfKWfAJS8QXog0PZtgdEQ/0"
				 mode="aspectFill"></image>
				<view class="text">{{userCurrency.trumpet||0}}</view>
			</view>
			<view class="right-wrap iconfont iconjiantou"></view>
		</view>

	</view>
</template>

<script>
	import badgeComponent from "@/components/badgeComponent.vue"
	import btnComponent from "@/components/btnComponent.vue"
	import modalComponent from "@/components/modalComponent.vue"
	export default {
		components: {
			badgeComponent,
			modalComponent,
			btnComponent
		},
		data() {
			return {
				currency: [],
				userCurrency: {},
			};
		},
		onLoad() {
			this.loadData()
		},
		onShow() {
			this.userCurrency = this.$app.getData('userCurrency')
		},
		onShareAppMessage(e) {
			const shareType = e.target && e.target.dataset.share
			return this.$app.commonShareAppMessage(shareType)
		},
		methods: {
			loadData() {
				this.$app.request('user/extraCurrency', {}, res => {
					this.currency = res.data
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.user-page-container {
		.item-wrap {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin: 0 30upx;
			padding: 25upx 10upx;
			border-bottom: 2upx solid #EFEFEF;

			.left-wrap {
				font-size: 30upx;
				display: flex;
				align-items: center;

				.icon {
					width: 40upx;
					height: 40upx;
					margin-right: 10upx;
				}
			}

			.right-wrap {
				font-size: 22upx;
				color: #999;
			}
		}

	}
</style>
