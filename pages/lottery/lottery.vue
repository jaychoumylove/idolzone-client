<template>
	<view class="lottery-page-container">
		<image class="bg-img" src="https://mmbiz.qpic.cn/mmbiz_jpg/w5pLFvdua9HpdKa9zTbvwsKmJ6hE0kNdoO1lyh6ENicAb4DlbKfJaJlEYUibVlibR5bMxOISVHcoRKfKbo3mVziaEQ/0"
		 mode="aspectFill"></image>
		<!-- 标题 -->
		<!-- <image class="title-img" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9HpdKa9zTbvwsKmJ6hE0kNdtiaQWhAPMu0usDOArdpW4rbJ8axPI7xH9OUr1GmdgbzHGlnsgp011MA/0"
		 mode="aspectFill"></image> -->
		<!-- 滚动抽奖记录 -->
		<view class="roll-container"></view>
		<!-- 转盘 -->
		<view class="dial-container">
			<image class="bg" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FctOFR9uh4qenFtU5NmMB5ibLeIKoQPDMLgiblRd3GPSHeJ54HqaQ78IQkMPALILcFaorZOiafQ3lGg/0"
			 mode=""></image>
			<image class="dial-main" :style="{transition:lotteryTransition+'s', transform: 'rotate('+lotteryRotate+'deg)'}" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FctOFR9uh4qenFtU5NmMB5H4zzF5xB3nzZNU0ZjOvMia94VeBrnibFLbdW8DdNMq8QsXMBaTBdkTyg/0"
			 mode="aspectFill"></image>
			<view class="cursor-wrap" @tap="lotteryStart">
				<btnComponent>
					<image class="cursor" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9HpdKa9zTbvwsKmJ6hE0kNdFsSibhljHgVZicHO5mUiaeViaDyCDuowWtcB6CcdygE8W2KwGlQPIfKCAg/0"
					 mode="aspectFill"></image>
				</btnComponent>
			</view>
		</view>
		<view class="remain">目前可抽：<text class="num">{{remainCount}}</text>次</view>
		<view class="btn-wrap flex-set">
			<view class="btn b-2 flex-set iconfont iconshipin" @tap="openVideo">立即获得5次</view>
			<view class="btn b-1" @tap="$app.goPage('/pages/lottery/log')">
				查看抽奖明细<text class="iconfont iconjiantou"></text>
			</view>
		</view>

		<!-- 说明 -->
		<view class="notice-container">
			<image class="bg-img" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9HpdKa9zTbvwsKmJ6hE0kNdRiaib4VBCv9v3aCwWFuicaYm24w6wyvr2QFBbZfLfGILEickoNzPhiatyHA/0"
			 mode="aspectFill"></image>
			<view class="content">
				<view class="title">抽奖规则</view>
				<view class="p">1、每人每天抽奖机会上限为 100次</view>
				<view class="p">2、在线时，每分钟恢复一次抽奖机会，存储上限为30次</view>
				<view class="p">3、离线时，每分钟恢复一次抽奖机会，存储上限为10次</view>
				<view class="p">4、观看视频，可以立即恢复5次（存储上限为30次）</view>
				<view class="p">5、周五、周六、周日奖励翻倍</view>
				<view class="p">6、抽奖次数0点清零</view>
			</view>
		</view>

		<modalComponent v-if="'box' == modal" type="center" @closeModal="modal=''">
			<view class="box-modal">
				<image class="bg" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GcjvbhGA8hnWrkuicbhygVs1UicAzKxed2G1u0RicVHuicY6tWPp56D6MjQH6NNhHjNrDknJHOZqcia0A/0"
				 mode="aspectFill"></image>
				<view class="" v-if="lottery.type==1">恭喜获得金豆宝箱</view>
				<view class="" v-if="lottery.type==3">恭喜获得钻石宝箱</view>
				<view class="flex-set">{{lottery.num}}
					<image v-if="lottery.type==1" class="icon" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FctOFR9uh4qenFtU5NmMB5uWEQk2MTaRfxdveGhfFhS1G5dUIkwlT5fosfMaW0c9aQKy3mH3XAew/0"
					 mode="aspectFill"></image>
					<image v-if="lottery.type==3" class="icon" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTERibO7VvqicUHiaSaSa5xyRcvuiaOibBLgTdh8Mh4csFEWRCbz3VIQw1VKMCQ/0"
					 mode="aspectFill"></image>
				</view>
				<btnComponent type="default">
					<button class="btn" open-type="share" data-share="8">分享</button>
				</btnComponent>
				<view class="tips">分享好友一起开宝箱，瓜分大奖</view>
			</view>
		</modalComponent>
	</view>
</template>

<script>
	import btnComponent from '@/components/btnComponent.vue'
	import modalComponent from '@/components/modalComponent.vue'
	export default {
		components: {
			btnComponent,
			modalComponent
		},
		data() {
			return {
				modal: '',
				remainCount: 0, // 剩余抽奖次数

				lotteryRotate: 0, // 旋转度数
				lotteryTransition: 0,

				lottery: {},
			};
		},
		onLoad() {
			this.lotteryLock = 0
		},
		onShow() {
			this.addCount()
		},
		onShareAppMessage(e) {
			const shareType = e.target && e.target.dataset.share

			if (shareType == 8) {
				// 分享宝箱
				let config = this.$app.getData('config')
				config.share_cfg[shareType - 1].path += `&rec_lottery_id=${this.rec_lottery_id}`
				this.$app.setData('config', config)
			}

			return this.$app.commonShareAppMessage(shareType)
		},
		methods: {
			openVideo() {
				this.$app.openVideoAd(() => {
					// 看视频抽奖次数增加
					this.addCountRequest(2)
				})
			},
			lotteryStart() {
				// 奖品数
				let totalAward = 6
				// 转的时间 单位秒
				let rotateTime = 6

				if (this.remainCount <= 0) {
					this.$app.toast('没有抽奖次数了')
					return
				}

				// 没转完不能点
				if (Math.round(new Date().getTime() / 1000) - this.lotteryLock < rotateTime + 1) {
					this.$app.toast('点太快拉')
					return
				}
				this.$app.request('lottery/start', {}, res => {
					const lottery = res.data
					// 获取抽奖次数
					this.addCount()
					this.lotteryLock = Math.round(new Date().getTime() / 1000)

					// 转盘转之前回到初始位置
					this.lotteryTransition = 0
					this.lotteryRotate = 0

					setTimeout(() => {
						this.lotteryTransition = rotateTime
						this.lotteryRotate = 360 * rotateTime + (res.data.index - 1) * (360 / totalAward)

						setTimeout(() => {
							this.lottery = lottery
							this.$app.toast(`恭喜！获得${lottery.name}x${lottery.num}`)
						}, rotateTime * 1000)
					}, 200)
				}, 'POST', true)
			},
			addCountRequest(type) {
				this.$app.request('lottery/addCount', {
					type
				}, res => {
					this.remainCount = res.data
				})
			},
			addCount() {
				this.addCountRequest(0)

				clearInterval(this.timeId)
				this.timeId = setInterval(() => {

					this.addCountRequest(1)

				}, 60 * 1000)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.lottery-page-container {
		text-align: center;
		overflow-x: hidden;

		.bg-img {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: -1;
		}

		.title-img {
			width: 650upx;
			height: 166upx;
			margin: 40upx 0;
		}

		.dial-container {
			width: 750upx;
			height: 750upx;
			position: relative;

			.dial-main,
			.bg {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
			}

			.cursor-wrap {
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				top: 225upx;

				.cursor {
					width: 150upx;
					height: 300upx;
				}
			}
		}

		.remain {
			margin: -10upx 0 20upx;
			
			.num {
				font-size: 34upx;
				font-weight: 700;
			}
		}

		.btn-wrap {
			font-size: 24upx;

			.btn {
				border-radius: 30upx;
				color: #fff;
				padding: 10upx 30upx;
				margin: 0 30upx;
			}

			.btn.b-1 {
				background: linear-gradient(to bottom, #fcc200, #f4930c);
			}

			.btn.b-2 {
				background: linear-gradient(to bottom, #7576ff, #534dfd);
			}
		}

		.notice-container {
			position: relative;
			width: 724upx;
			height: 504upx;
			margin: auto;

			.bg-img {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
			}

			.content {
				text-align: left;
				font-size: 26upx;
				padding: 55upx;

				.title {
					text-align: center;
					font-size: 34upx;
					padding-bottom: 12upx;
				}
			}
		}

		.box-modal {
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 20upx 40upx;
			margin-top: -80upx;

			view {
				margin: 20upx;
			}

			.bg {
				width: 500upx;
				height: 300upx;
			}

			.icon {
				width: 40upx;
				height: 40upx;
			}

			.btn {
				padding: 10upx 60upx;
			}
		}
	}
</style>
