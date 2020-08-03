<template>
	<view class="lucky-container">
		<view class="day-recharge" v-if="dayPaid">
			<view class="content">
				<view class="header">
					<view class="bg">
						<view class="m-title">
							{{lrtext.day_first_charge.title || ''}}
						</view>
					</view>
				</view>
				<view class="btn">
					<btnComponent type="unset" @tap="getPaidReward(dayPaid)">
						<view class="btn-bg-m">
							<view class="btn-bg flex-set">
								{{lrtext.day_first_charge.btn_text || ''}}
							</view>
						</view>
					</btnComponent>
				</view>
				<view class="title">
					{{lrtext.day_first_charge.desc || ''}}
				</view>
				<view class="prize">
					<view class="item" v-for="(item, index) in dayPaid.reward" :key="index">
						<image mode="widthFix" :src="item.image"></image>
						<view class="number flex-set">X {{$app.formatNumber(item.number || 0)}}</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="recharge">
			<view class="content">
				<view class="header">
					<view class="bg">
						{{lrtext.sum_charge.title || ''}}
					</view>
				</view>
				<view class="tip flex-set">
					<view class="tip-desc">{{lrtext.sum_charge.desc || ''}}</view>
				</view>
				<view class="charge-prize" v-if="sumPaid">
					<view class="item" v-for="(item, index) in sumPaid" :key="index">
						<view class="card">
							<view style="margin: 0 50upx;">
								<view style="display: flex;flex-direction: column;">
									<view class="lable">
										<view v-for="(ite, ind) in item.reward" :key="ind">
											{{ite.type == 'currency' ? '领': ''}}
											{{$app.formatNumber(ite.number || 0)}}
											{{ite.type == 'prop' ? '张': ''}}
										</view>
									</view>
									<view class="image-group">
										<image v-for="(ite, ind) in item.reward" :key="ind" mode="aspectFit" :src="ite.image"></image>										
									</view>
								</view>
							</view>
						</view>
						<view class="btn">
							<btnComponent type="default" @tap="getPaidReward(item)">
								<view class="get-bg-bm flex-set" :class="my.sumPaid.count > item.count ? 'settle-bg-bm': 'normal-bg-bm'">
									<text v-if="my.sumPaid.count >= item.count">可领取</text>
									<text v-else>{{$app.formatNumber(my.sumPaid.count || 0)}}/{{$app.formatNumber(item.count || 0)}}鲜花</text>
								</view>
							</btnComponent>
						</view>
					</view>
				</view>
				<view class="lottery-tip">
					<view class="label">
						{{lrtext.sum_charge.lucky.title || ''}}
					</view>
					<view class="go-label" @tap="$app.goPage('/pages/lucky/log')">
						{{lrtext.sum_charge.lucky.tip || ''}}
					</view>
				</view>
				
				<view class="dial-container">
					<image class="bg" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FctOFR9uh4qenFtU5NmMB5ibLeIKoQPDMLgiblRd3GPSHeJ54HqaQ78IQkMPALILcFaorZOiafQ3lGg/0"
					 mode=""></image>
					<image class="dial-main" :style="{transition:lotteryTransition+'s', transform: 'rotate('+lotteryRotate+'deg)'}" :src="lucky_draw.draw||'https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FctOFR9uh4qenFtU5NmMB5H4zzF5xB3nzZNU0ZjOvMia94VeBrnibFLbdW8DdNMq8QsXMBaTBdkTyg/0'" mode="aspectFill"></image>
					<view class="cursor-wrap" @tap="lotteryStart">
						<btnComponent>
							<image class="cursor" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9HpdKa9zTbvwsKmJ6hE0kNdFsSibhljHgVZicHO5mUiaeViaDyCDuowWtcB6CcdygE8W2KwGlQPIfKCAg/0"
							 mode="aspectFill"></image>
						</btnComponent>
					</view>
					<view class="bg-bottom"  v-if="lucky_draw"></view>
				</view>
				
				<view class="reamin flex-set">
					<view class="bg-b">
						<view class="bg">
							 我的抽奖券：{{my_lucky_num || 0}}张
						</view>
					</view>
				</view>
				
				<view class="notice" v-if="rewardList.length">
					<image class="notice-icon" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GqEna3Bu4hOUqY2ruicPUKoPXtMTFLV2ydAKSiawiapkia2icuuW67SfcBKp3mbQWicrWJb4rJskIWFuhQ/0"></image>
					<view class="notice-info">
						<swiper 
							:indicator-dots="false" 
							:autoplay="true" 
							:interval="3000" 
							:duration="1000" 
							vertical="true"
							touchable="false"
							circular='true'
							disable-touch="true"
						>
							<swiper-item v-for="(item, index) in rewardList" :key="index">
								<view class="notice-item">
									<image class="notice-avatar" :src="item.user.avatarurl || AVATAR"></image>
									<view class="notice-con">
										<view class="user-name text-overflow">{{item.user.nickname || NICKNAME}}</view>
										获得
										<view class="reward-name text-overflow">{{item.item.name}} X {{$app.formatNumber(item.item.number || 0)}}</view>
									</view>
								</view>
							</swiper-item>
						</swiper>
					</view>
				</view>
			</view>
		</view>
		
		<view class="lucky">
			<view class="content">
				<view class="header">
					<view class="bg">
						{{lrtext.scrap.title || ''}}
					</view>
				</view>
				<view class="tip flex-set">
					<view class="tip-desc">
						{{lrtext.scrap.desc || ''}}
					</view>
				</view>
				<view class="charge-prize">
					<view class="item" v-for="(item, index) in scrapList" :key="index" :class="{'auto-flex': scrapList.length == 1}">
						<view class="up">
							<!-- <image v-if="item == 1" mode="aspectFit" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GqEna3Bu4hOUqY2ruicPUKoibe7bdHGH2icR6cs7PCILZKIooG44pGchYZKGb4YicdQ8ichs3q6dEu1bQ/0"></image>
							<image v-if="item == 2" mode="aspectFit" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GqEna3Bu4hOUqY2ruicPUKoPVpqtoXHtz6OhLfRMCg4wK1dNZ2C4PTcJVwrqWTblRlWSE2fs6UB3Q/0"></image>
							<image v-if="item == 3" mode="aspectFit" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GqEna3Bu4hOUqY2ruicPUKoyZkhpAiawiaTWqs72ynSnAl3Yf8A1Cp8oMianQtru2xtmYiamwwLXrQnEQ/0"></image>
							<image v-if="item == 4" mode="aspectFit" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GqEna3Bu4hOUqY2ruicPUKoOxUXk3YG5KlOA4lYByS7xppcrEwOcJAQeUia6IxKBRicmwBtzgfELQYg/0"></image> -->
							<image mode="aspectFit" :src="item.image_l"></image>
							<view class="info">
								<view class="title">{{item.name || ''}}</view>
								<view class="desc">还剩：{{item.limit_exchange - item.exchange_number}}</view>
							</view>
							<view class="exchange flex-set" @tap="exchange(item)">
								<btnComponent :type="item.has_number >= item.count ? 'success': 'yellow'">
									<view class="flex-set">兑换</view>
								</btnComponent>
							</view>
						</view>
						<view class="down">
							<view class="progress-label flex-set">获取进度</view>
							<view class="progress">
								<progress :percent="item.percent || 0" stroke-width="10" activeColor="#ff9f08" border-radius="5" />
								<view class="percent-cover">{{item.has_number}} / {{item.count}}</view>
							</view>
							<view class="exchange-desc flex-set">
								已兑换 <view class="exchange-number">{{item.has_exchange}}</view>
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

				lotteryRotate: 0, // 旋转度数
				lotteryTransition: 0,

				lottery: {},
				sumPaid: [],
				dayPaid: {},
				my_lucky_num: 0,
				lucky_draw: null,
				my: {
					sumPaid: {},
					dayPaid: {}
				},
				lrtext: {},
				rewardList: [],
				scrapList: [],
				delay: 0,
			};
		},
		onLoad() {
			this.lotteryLock = 0
		},
		onShow() {
			this.refresh()
			this.lrtext = this.$app.getData('config').recharge_lucky;
		},
		methods: {
			refresh() {
				this.getPageInfo();
				this.getPaidInfo();
				this.getLuckyDrawInfo();
			},
			getPageInfo() {
				this.$app.request(this.$app.API.PAGE_LUCKY_CHARGE, {}, res => {
					setTimeout(() => {
						this.lrtext = res.data.recharge_lucky;
						this.rewardList = res.data.lucky_log;
						this.scrapList = res.data.scrap_list;
						if (this.delay) this.deley = 0;
					}, this.delay);
				})
			},
			getPaidInfo () {
				this.$app.request(this.$app.API.USER_PAID_INFO, {}, res => {
					setTimeout(() => {
						const {sumPaid, dayPaid, mySumPaid, myDayPaid} = res.data;
						this.sumPaid = sumPaid;
						this.dayPaid = dayPaid;
						this.my = {
							sumPaid: mySumPaid,
							dayPaid: myDayPaid,
						};
						if (this.delay) this.deley = 0;
					}, this.delay);
				})
			},
			getLuckyDrawInfo () {
				this.$app.request(this.$app.API.LUCKY_DRAW_INFO, {}, res => {
					setTimeout(() => {
						this.my_lucky_num = res.data.my_num;
						this.lucky_draw = res.data.lucky_draw;
						if (this.delay) this.deley = 0;
					}, this.delay);
				})
			},
			getPaidReward(item) {
				uni.showLoading({
					mask:true,
					title: "领取中"
				})
				this.$app.request(this.$app.API.USER_PAID_SETTLE, {paid: item.id}, res => {
					this.$app.toast('已领取', 'success');
					this.refresh()
				})
			},
			exchange(scrap) {
				if (scrap.limit_exchange <= scrap.exchange_number) {
					return this.$app.toast('奖品数量不足');
				}
				if (scrap.has_number < scrap.count) {
					return this.$app.toast('碎片不够哦');
				}
				uni.showModal({
					title:`兑换${scrap.name}`,
					confirmText:"兑换",
					content:`确认兑换${scrap.name}吗?`,
					success: (res) => {
						if (res.confirm) {
							uni.showLoading({
								mask:true,
								title: "兑换中"
							})
							this.$app.request(this.$app.API.LUCKY_DRAW_EXCHANGE, {scrap:scrap.id}, res => {
								this.$app.toast('兑换成功', 'success');
								this.refresh()
							})
						}
						if (res.cancel) {
							this.$app.toast('取消兑换');
						}
					}
				})
			},
			lotteryStart() {
				// 奖品数
				let totalAward = 6
				// 转的时间 单位秒
				let rotateTime = 6
		
				if (this.my_lucky_num < 1) {
					this.$app.toast('没有抽奖券了')
					return
				}
		
				// 没转完不能点
				if (Math.round(new Date().getTime() / 1000) - this.lotteryLock < rotateTime + 1) {
					this.$app.toast('点太快拉')
					return
				}
				this.$app.request(this.$app.API.LUCKY_DRAW_START, {}, res => {
					const lottery = res.data
					// 获取抽奖次数
					this.lotteryLock = Math.round(new Date().getTime() / 1000)
					this.delay = 6000;
					this.refresh();
		
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
								this.$app.toast(`恭喜！获得${lottery.name}x${lottery.number}`)
							}
						}, rotateTime * 1000)
					}, 200)
				}, 'POST', true)
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
								border-radius:30upx;
								font-size:24upx;
								color: white;
								padding:10upx 30upx;
								// .get-bg {
								// 	background:#fa9050;
								// 	padding:5upx;
								// 	padding-right: 20upx;
								// 	font-size:24upx;
								// 	color:rgba(255,255,255,1);
								// 	line-height:45upx;
								// 	display: flex;
								// 	flex-direction: row;
								// 	border-radius:30upx;
								// 	.left {
								// 		padding: 0 10upx;
								// 		background:#ffb273;
								// 		border-radius:26upx;
								// 		margin-right: 7upx;
								// 	}
								// }
							}
							.normal-bg-bm {
								background:url("https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GXvpB3e5ibvGiadFqIOl7vcef7WGKxvBTuXAEwsWeAHbgk4oV9fHGxgxVaiclicLibHfFAOdTd6vO7pKg/0") no-repeat center center;
								background-size: cover;
							}
							.settle-bg-bm {
								background:url("https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GXvpB3e5ibvGiadFqIOl7vcexDOGKtQObydGP6JIsK8beArHv69icnhRG7tHeemibngmmvqEmO1FXNJQ/0") no-repeat center center;
								background-size: cover;
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
					.notice-icon {
						margin:0 8%;
						width: 35upx;
						align-self: center;
						height: 35upx;
						border-radius:50%;
					}
					.notice-info {
						margin: 10upx 4%;
						flex: 1;
						display: inline-block;
						overflow: hidden;
						height: 50upx;
						swiper {
							height: 50upx;
						}
						.notice-item {
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
									max-width: 180upx;
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
					flex-direction: column;
					flex-wrap: wrap;
					justify-content: flex-start;
					.auto-flex {
						flex: 1;
					}
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
								.title {
									color:rgba(88,87,87,1);
								}
								.desc {
									color:rgba(146,143,142,1);
									font-size:24rpx;
								}
							}
							.exchange {
								margin-left: auto;
								view {
									height: 50upx;
									width: 120upx;
									padding: 10upx 20upx;
								}
							}
						}
						
						.down {
							margin-top: 20upx;
							.progress-label {
								width: 80upx;
							}
							.progress-label, .exchange-number, .exchange-desc {
								text-align: center;
								font-size: 20upx;
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
							.exchange-desc {
								margin-left: auto;
								margin-right: 10rpx;
								.exchange-number {
									padding-left: 20upx;
									color: red;
								}
							}
						}
					}
				}
			}
		}
	}
</style>
