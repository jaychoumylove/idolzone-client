<template>
	<view class="box-page-container">
		<image class="bg-img" src="https://mmbiz.qpic.cn/mmbiz_jpg/w5pLFvdua9HpdKa9zTbvwsKmJ6hE0kNdoO1lyh6ENicAb4DlbKfJaJlEYUibVlibR5bMxOISVHcoRKfKbo3mVziaEQ/0"
		 mode="aspectFill"></image>
		<image class="title" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9HpdKa9zTbvwsKmJ6hE0kNdtiaQWhAPMu0usDOArdpW4rbJ8axPI7xH9OUr1GmdgbzHGlnsgp011MA/0"
		 mode="aspectFill"></image>
		<image class="avatar" :src="info.user.avatarurl" mode="aspectFill"></image>
		<view class="nickname">{{info.user.nickname}}</view>
		<view class="tips">邀请你一起开宝箱，瓜分</view>
		<view class="award">{{info.lottery.name}}</view>
		<image class="box" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GcjvbhGA8hnWrkuicbhygVs1UicAzKxed2G1u0RicVHuicY6tWPp56D6MjQH6NNhHjNrDknJHOZqcia0A/0"
		 mode="aspectFill"></image>

		<view class="btn" @tap="$app.goPage('/pages/lottery/box_open?rec_lottery_id='+rec_lottery_id)">
			<image src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTERcoSY3iar6yxiasPCKImWia1ncaahUTOoMb3xjZCTGmS8H8HVhZt3MwKfQ/0"
			 mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	import btnComponent from '@/components/btnComponent.vue';
	export default {
		components: {
			btnComponent
		},
		data() {
			return {
				modal: '',
				info: {},
				rec_lottery_id: '',
			};
		},
		onLoad(option) {
			this.rec_lottery_id = this.$app.getData('query').rec_lottery_id
			this.loadData()
		},
		onShow() {},
		onShareAppMessage(e) {
			const shareType = e.target && e.target.dataset.share
			return this.$app.commonShareAppMessage(shareType)
		},
		methods: {
			getUserInfo(e) {
				const userInfo = e.detail.userInfo
				if (userInfo) {
					this.$app.request(this.$app.API.USER_SAVEINFO, {
						iv: e.detail.iv,
						encryptedData: e.detail.encryptedData,
					}, res => {
						this.$app.request(this.$app.API.USER_INFO, {}, res => {
							this.$app.setData('userInfo', res.data, true)
							this.$app.goPage('/pages/lottery/box_open?rec_lottery_id=' + this.rec_lottery_id)
						})
					}, 'POST', true)
				}
			},
			loadData() {
				this.$app.request('lottery/getBox', {
					rec_lottery_id: this.rec_lottery_id
				}, res => {
					this.info = res.data
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.box-page-container {
		display: flex;
		flex-direction: column;
		align-items: center;

		.bg-img {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: -1;
		}

		view {
			margin: 10upx auto;
		}

		.title {
			width: 650upx;
			height: 166upx;
			margin: 40upx 0;
		}

		.avatar {
			width: 120upx;
			height: 120upx;
			border-radius: 50%;
		}

		.award {
			background-color: #692900;
			padding: 10upx 40upx;
			border-radius: 30upx;
			border: 4upx solid #c93c00;
			color: #fff;
		}

		.box {
			width: 600upx;
			height: 400upx;
			margin-bottom: 20upx;
			margin-top: -30upx;
		}

		.btn {
			font-weight: 700;
			font-size: 34upx;
			width: 300upx;
		}
	}
</style>
