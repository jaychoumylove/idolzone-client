<template>
	<view class="lucky-container">
		<view class="day-recharge">
			<view class="content">
				<view class="header">
					<view class="bg">
						<view class="m-title">
							每日首冲礼包
						</view>
					</view>
				</view>
				<view class="btn">
					<btnComponent type="unset">
						<view class="btn-bg-m">
							<view class="btn-bg flex-set">
								领取首冲礼包
							</view>
						</view>
					</btnComponent>
				</view>
				<view class="title">
					充值任意金额（≧35元）即可领取超值礼包
				</view>
				<view class="prize">
					<!-- <view class="item" v-for="(item, index) in [1,2,3, 4]" :key="index"> -->
					<view class="item">
						<image mode="widthFix" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FctOFR9uh4qenFtU5NmMB5uWEQk2MTaRfxdveGhfFhS1G5dUIkwlT5fosfMaW0c9aQKy3mH3XAew/0"></image>
						<view class="number flex-set">X 3.5万</view>
					</view>
					<!-- <view class="item">
						<image mode="widthFix" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTERziauZWDgQPHRlOiac7NsMqj5Bbz1VfzicVr9BqhXgVmBmOA2AuE7ZnMbA/0"></image>
						<view class="number flex-set">X 1000</view>
					</view> -->
					<view class="item">
						<image mode="widthFix" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9Equ3ngUPQiaWPxrVxZhgzk90Xa3b43zE46M8IkUvFyMR5GgfJN52icBqoicfKWfAJS8QXog0PZtgdEQ/0"></image>
						<view class="number flex-set">X 1</view>
					</view>
					<view class="item">
						<image mode="widthFix" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTERibO7VvqicUHiaSaSa5xyRcvuiaOibBLgTdh8Mh4csFEWRCbz3VIQw1VKMCQ/0"></image>
						<view class="number flex-set">X 1</view>
					</view>
					<view class="item">
						<image mode="widthFix" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GqEna3Bu4hOUqY2ruicPUKo5M09v5iajLMIlAb5MR4ib0kA9OnkhXodC6M6SmjAjmjj7VcwgUYklmfA/0"></image>
						<view class="number flex-set">X 1</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="recharge">
			<view class="content">
				<view class="header">
					<view class="bg">
						超值返利 100%中奖
					</view>
				</view>
				<view class="tip flex-set">
					<view class="tip-desc">每日首次充值各档均返利，首冲用户抽奖券翻倍</view>
				</view>
				<view class="charge-prize">
					<view class="item" v-for="(item, index) in [1,2,3, 4]" :key="index">
						<view class="card">
							<view style="margin: 0 50upx;">
								<view style="display: flex;flex-direction: column;">
									<view class="lable">
										<view class="">领30万</view>
										<view class="">18张</view>
									</view>
									<view class="image-group">
										<image mode="aspectFit" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FctOFR9uh4qenFtU5NmMB5uWEQk2MTaRfxdveGhfFhS1G5dUIkwlT5fosfMaW0c9aQKy3mH3XAew/0"></image>
										<image mode="aspectFit" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FBlImEL23YOTuiciaSo0JyAjRhZiawN3SGG2Tj8hpZj0npgoHhuhVhAYOsXAsDgichuHA1d8wdYK911Q/0"></image>
									</view>
								</view>
							</view>
						</view>
						<view class="btn">
							<btnComponent type="default">
								<view class="get-bg-bm">
									<view class="get-bg">
										<view class="left">7000元</view>
										领充值礼
									</view>
								</view>
							</btnComponent>
						</view>
					</view>
				</view>
				<view class="lottery-tip">
					<view class="label">
						奖品每周更新
					</view>
					<view class="go-label">
						中奖纪录
					</view>
				</view>
				
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
					<view class="bg-bottom"></view>
				</view>
				
				<view class="reamin flex-set">
					<view class="bg-b">
						<view class="bg">
							 剩余次数：17
						</view>
					</view>
				</view>
				
				<view class="notice">
					<image class="notice-icon" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GqEna3Bu4hOUqY2ruicPUKoPXtMTFLV2ydAKSiawiapkia2icuuW67SfcBKp3mbQWicrWJb4rJskIWFuhQ/0"></image>
					<view class="notice-info">
						<image class="notice-avatar" src="https://mmbiz.qpic.cn/mmbiz_jpg/h9gCibVJa7JU7RSNRWzPRg6BzMTn0H2NTlgLuFB1qEb0ialKRVC6ia0D9yFSZQjr5ITC7akY2ib3MA4RNjVfQFmHcg/0"></image>
						<view class="notice-con">
							<view class="user-name text-overflow">用户昵称用户昵称用户昵称</view>
							获得
							<view class="reward-name text-overflow">奖品名称用户昵称用户昵称</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="lucky">
			<view class="content">
				<view class="header">
					<view class="bg">
						集齐碎片获得相应的礼物
					</view>
				</view>
				<view class="tip flex-set">
					<view class="tip-desc">活动时间：8月3日——8月9日</view>
				</view>
				<view class="charge-prize">
					<view class="item" v-for="(item, index) in [1,2,3, 4]" :key="index">
						<view class="up">
							<image v-if="item == 1" mode="aspectFit" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GqEna3Bu4hOUqY2ruicPUKoibe7bdHGH2icR6cs7PCILZKIooG44pGchYZKGb4YicdQ8ichs3q6dEu1bQ/0"></image>
							<image v-if="item == 2" mode="aspectFit" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GqEna3Bu4hOUqY2ruicPUKoPVpqtoXHtz6OhLfRMCg4wK1dNZ2C4PTcJVwrqWTblRlWSE2fs6UB3Q/0"></image>
							<image v-if="item == 3" mode="aspectFit" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GqEna3Bu4hOUqY2ruicPUKoyZkhpAiawiaTWqs72ynSnAl3Yf8A1Cp8oMianQtru2xtmYiamwwLXrQnEQ/0"></image>
							<image v-if="item == 4" mode="aspectFit" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GqEna3Bu4hOUqY2ruicPUKoOxUXk3YG5KlOA4lYByS7xppcrEwOcJAQeUia6IxKBRicmwBtzgfELQYg/0"></image>
							<view class="info">
								<view class="title">腾讯视频VIP</view>
								<view class="desc">还剩：20张</view>
							</view>
						</view>
						<view class="down">
							<view class="progress-label">获取进度</view>
							<view class="progress">
								<progress percent="66" stroke-width="10" activeColor="#ff9f08" border-radius="5" />
								<view class="percent-cover">6 / 9</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
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
		methods: {
			openVideo(flag = 0) {
				this.$app.openVideoAd(() => {
					if (flag == 0) {
						// 看视频抽奖次数增加
						this.addCountRequest(2)
					} else if (flag == 1) {
						// 双倍奖励
						this.$app.request('lottery/double', {}, res => {
							this.$app.toast('双倍领取成功')
							this.modal = ''
						})
					}
				},this.$app.getData('config').kindness_switch)
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
							if (this.$app.getData('config').lottery_modal == 1) {
								this.modal = 'lottery'
							} else {
								this.$app.toast(`恭喜！获得${lottery.name}x${lottery.num}`)
							}
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

<style scoped lang="scss">
	$gray-bg: rgba(248,247,253,0.8);
	
	.lucky-container {
		* {
			font-family:Microsoft YaHei;
			font-weight: bold;
		}
		
		.header {
			position: absolute;
			top: 0;
			left: 50%;
			transform: translate(-50%,-50%);
			background:rgba(255,230,115,1);
			border-radius:0px 0px 60px 60px;
			.bg {
				background:rgba(236,121,52,1);
				border-radius:0px 0px 60px 60px;
				padding: 10upx 20upx;
				font-size: 24upx;
				color: white;
				margin: 0 auto;
				text-align: center;
			}
		}
		.btn-bg {
			height: 60upx; 
			width: 180upx;
			font-size: 24upx;
			color: white;
		}
		.day-recharge {
			margin: 30upx 20upx 0;
			background:$gray-bg;
			height: 250upx;
			
			.content {
				position: relative;
				height: 200upx;
				background:rgba(255,253,232,1);
				border:15upx solid rgba(245,184,87,1);
				border-radius:60upx;
				margin: 15upx 18upx 35upx;
				.btn {
					position: absolute;
					bottom: -20%;
					right: 20%;
					.btn-bg-m {
						height: 52upx;
						background-color: #FFF100;
						border-radius: 26upx;
						padding-left: 10upx;
						padding-top: 7upx;
						.btn-bg {
							padding: 10upx 10upx;
							width: 180upx;
							height: 44upx;
							background-color: #F3E503;
							border-radius: 22upx;
						}
					}
				}
				.header {
					width: 220upx;
					.bg {
						width: 200upx;
					}
				}
				.title {
					margin-top: 30upx;
					text-align: center;
					font-size: 24upx;
					font-family: Microsoft YaHei;
					font-weight: bold;
					color: rgba(255,102,0,1);
					line-height: 45upx;
				}
				.prize {
					display: flex;
					justify-content: space-around;
					flex-direction: row;
					margin: 10upx auto;
					.item {
						display: flex;
						flex-direction: row;
						justify-content: flex-start;
						image {
							width: 50upx;
							height: 50upx;
						}
						.number {
							margin-left: 10upx;
							flex: 1;
							color: #918E8E;
							font-size: 24upx;
						}
					}
				}
			}
		}
	
		.recharge {
			margin: 30upx 20upx 0;
			background:$gray-bg;
			.content {
				position: relative;
				width: 100%;
				.header {
					top: 20upx;
					height: 62upx;
					width: 320upx;
					.bg {
						height: 56upx;
						width: 300upx;
						font-size: 28upx;
					}
				}
				.tip {
					width: 80%;
					padding-top: 60rpx;
					margin: 0 auto;
					.tip-desc {
						padding:0 20rpx;
						background:rgba(248,226,207,0.42);
						border-radius:19upx;
						line-height:45upx;
						font-size:20upx;
						
						color:rgba(120,67,16,1);
						text-align: center;
					}
				}
				.charge-prize {
					display: flex;
					flex-direction: row;
					flex-wrap: wrap;
					justify-content: flex-start;
					width: 710upx;
					.item {
						margin: 18upx;
						margin-top: 25upx;
						.card{
							width: 320upx;
							height: 180upx;
							background: url("https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FBlImEL23YOTuiciaSo0JyAju3ncCTQTVDWzVhEtJR7JkTUnYvOGGTx4cKxibKttkUQhs3UCn3qcxxA/0") no-repeat center center;
							background-size: cover;
							.lable,.image-group {
								display: flex;
								flex-direction: row;
								justify-content: space-around;
								width: 100%;
							}
							.lable {
								height: 40upx;
								margin-top:25upx;
								view {
									font-size: 30upx;
									line-height: 40upx;
									text-align: center;
									&:not(:first-of-type) {
										margin-left: auto;
										margin-right: 15upx;
									}
								}
							}
							.image-group {
								height: 90upx;
								image {
									height: 80upx;
									&:not(:first-of-type) {
										margin-left: 20upx;
									}
								}
							}
						}
						.btn {
							margin: 0 auto;
							margin-top: 20upx;
							display: flex;
							justify-content: center;
							align-content: center;
							.get-bg-bm {
								background:#ec7934;
								border-radius:30upx;
								padding:5upx 0;
								.get-bg {
									background:#fa9050;
									padding:5upx;
									padding-right: 20upx;
									font-size:24upx;
									color:rgba(255,255,255,1);
									line-height:45upx;
									display: flex;
									flex-direction: row;
									border-radius:30upx;
									.left {
										padding: 0 10upx;
										background:#ffb273;
										border-radius:26upx;
										margin-right: 7upx;
									}
								}
							}
						}
					}
				}
				.lottery-tip {
					height: 40upx;
					line-height: 40upx;
					display: flex;
					flex-direction: row;
					margin: 30upx 20upx 0;
					.label {
						color: #706F6F;
						font-size:28upx;
					}
					.go-label {
						margin-left: auto;
						font-size:28upx;
						text-decoration:underline;
						color: #FBCC3E;
					}
				}
				.dial-container {
					width: 710upx;
					height: 710upx;
					position: relative;
				
					.dial-main,
					.bg {
						position: absolute;
						top: 0;
						left: 0;
						right: 0;
						bottom: 0;
						z-index: 5;
					}
				
					.cursor-wrap {
						position: absolute;
						left: 50%;
						transform: translateX(-50%);
						top: 225upx;
						z-index: 6;
				
						.cursor {
							width: 150upx;
							height: 300upx;
						}
					}
					
					.bg-bottom {
						position: absolute;
						left: 50%;
						bottom: -7%;
						width: 50%;
						height: 10%;
						transform: translate(-50%, -50%);
						background:rgba(246,70,47,1);
						opacity:0.55;
						border-radius:50%;
					}
				}
				.reamin {
					margin: 30upx 20upx 0;
					.bg-b {
						background:rgba(244,171,127,1);
						border-radius:32upx;
						padding: 5upx 0 5upx 10upx;
						.bg {
							background:rgba(236,121,52,1);
							border-radius:26upx;
							padding: 7upx 20upx;
							color: white;
							font-size:24upx;
						}
					}
				}
				.notice {
					margin: 30upx 20upx 0;
					background:rgba(248,226,207,0.57);
					border-radius:19upx;
					display: flex;
					justify-content: flex-start;
					.notice-info, .notice-icon {
						margin-bottom: 10upx;
					}
					.notice-icon {
						margin-left: 8%;
						margin-top: 20upx;
						width: 35upx;
						height: 35upx;
						border-radius:50%;
					}
					.notice-info {
						margin-left: 5%;
						margin-top: 10upx;
						flex: 1;
						display: inline-block;
						display: flex;
						justify-content: flex-start;
						.notice-avatar {
							width: 50upx;
							height: 50upx;
							border-radius:50%;
							margin-right: 10upx;
						}
						.notice-con {
							flex: 1;
							height: 50upx;
							margin-right: 10%;
							display: inline-block;
							display: flex;
							flex-direction: row;
							justify-content: space-around;
							font-size:26upx;
							line-height: 50upx;
							.user-name {
								width: 180upx;
								color: #FFCC00
							}
							.reward-name {
								width: 180upx;
								color: #FF6600
							}
						}
					}
				}
			}
		}
	
		.lucky {
			margin: 30upx 20upx 20upx;
			background:$gray-bg;
			padding-bottom: 20upx;
			.content {
				position: relative;
				width: 100%;
				.header {
					top: 20upx;
					height: 62upx;
					width: 470upx;
					.bg {
						height: 56upx;
						width: 440upx;
						font-size: 28upx;
					}
				}
				.tip {
					width: 80%;
					padding-top: 60rpx;
					margin: 0 auto;
					.tip-desc {
						font-size:22upx;
						color:rgba(120,67,16,1);
						text-align: center;
					}
				}
				.charge-prize {
					display: flex;
					flex-direction: row;
					flex-wrap: wrap;
					justify-content: flex-start;
					.item {
						background:rgba(255,253,232,1);
						border-radius:30px;
						margin: 18upx;
						margin-top: 25upx;
						display: flex;
						flex-direction: column;
						padding: 20upx 30upx;
						.up,.down {
							display: flex;
							flex-direction: row;
						}
						.up {
							image {
								height: 80upx;
								width: 80upx;
							}
							.info {
								display: flex;
								flex-direction: column;
								justify-content: center;
								margin-left: 30upx;
								font-size:24upx;
								.title {
									color:rgba(88,87,87,1);
								}
								.desc {
									color:rgba(146,143,142,1);
								}
							}
						}
						
						.down {
							.progress-label {
								width: 80upx;
								text-align: center;
								font-size:20upx;
								color:rgba(88,87,87,1);
							}
							.progress {
								margin-left: 30upx;
								display: flex;
								justify-content: center;
								flex-direction: column;
								position: relative;
								progress {
									width: 156upx;
									height: 30upx;
								}
								.percent-cover {
									position: absolute;
									font-size:20upx;
									left: 50%;
									top: 50%;
									transform: translate(-50%,-50%);
									line-height: 30upx;
									height: 30upx;
								}
							}
						}
					}
				}
			}
		}
	}
</style>
