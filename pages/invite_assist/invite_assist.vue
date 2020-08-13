<template>
	<view class="container">
		<view class="recharge" style="box-shadow:0 3upx 7upx 0 rgba(0, 0, 0, 0.23);border-radius:30upx;">
			<view class="content">
				<view class="header">
					<view class="bg" style="font-size: 28upx;font-weight: 700;line-height: 28upx;">
						{{star.name || ''}}
					</view>
				</view>
				<view class="tip flex-set">
					<view class="tip-desc">{{welfare.title || ''}}</view>
				</view>
				
				<!-- 里程碑进度条 -->
				<view class="milestone-wrap">
					<view class="dot finished"></view>
					<view class="item-box" v-for="(item,index) in (progress)" :key="index">
						<view class="progress">
							<view class="progress-finished" :style="{width: item.percent+'%'}"></view>
						</view>
						<view class="dot" :class="{finished: item.percent == 100}">
							<view class="name">{{$app.formatNumber(item.step || 0)}}</view>
						</view>
						<view class="reward" :class="{finish: item.percent == 100}">
							<view class="p" v-for="(pv, pk) in item.reward_desc" :key="pk">{{pv}}</view>
						</view>
					</view>
				</view>
				
				<view class="buttom flex-set">
					<btnComponent type='default'>
						<view class="btn">
							圈内当前已成功邀请人数:{{welfare_star ? $app.formatNumber(welfare_star.count || 0): 0}}
						</view>
					</btnComponent>
				</view>
				
				<view class="tr-affix">
					<btnComponent type='unset'>
						<button class="btn" open-type="share" :data-share="share_id">
							<view class="share-bg"></view>
						</button>
					</btnComponent>
				</view>
			</view>
		</view>
		
		<view class="recharge" style="box-shadow:0 3upx 7upx 0 rgba(0, 0, 0, 0.23);border-radius:30upx;">
			<view class="content">
				<view class="header">
					<view class="bg" style="font-size: 28upx;font-weight: 700;line-height: 28upx;">
						个人拉新奖励
					</view>
				</view>
				<view class="right-tip" @tap="$app.goPage('/pages/lucky/paid_log')">
					<view class="flex-set get-btn">
						领取记录
					</view>
				</view>
				
				<!-- 里程碑进度条 -->
				<view class="milestone-wrap my-milestone-wrap">
					<view class="item-box" style="width: 30%;" v-for="(item,index) in (progress)" :key="index">
						<view class="progress">
							<view class="progress-finished" :style="{width: item.percent+'%'}"></view>
						</view>
						<view class="dot" :class="{finished: item.percent == 100}">
							<view class="name">{{$app.formatNumber(item.step || 0)}}</view>
						</view>
						<view class="my-reward" :class="{finish: item.percent == 100}">
							<view class="reward-item position-set flex-set">
								<image class="icon" src="https://mmbiz.qpic.cn/mmbiz_png/h9gCibVJa7JXX6zqzjkSn01fIlGmzJw6ufzJPQqnQz9PQwhL9d2jCL8x6qlic5VDiaWU3XkPSZfZ4ZRVau9DQVtKg/0"></image>
								<view class="name">金豆福袋</view>
							</view>
							<view>
								<btnComponent type='default'>
									<view class="btn">
										领取
									</view>
								</btnComponent>
							</view>
						</view>
					</view>
				</view>
				
				<view class="buttom flex-set">
					<btnComponent type='default'>
						<view class="btn">
							我的拉新:0
						</view>
					</btnComponent>
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
								<view class="ucr">{{item.item.number > 0 ? '获得': '失去'}}</view>
								<view class="reward-name text-overflow">{{item.item.name}} X {{$app.formatNumber(Math.abs(item.item.number) || 0)}}</view>
							</view>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>

		<view class="rank-list-container">
			<view class="title">贡献榜</view>
			<view class='scroll-view'>
				<view class='item-wrap' v-for="(item,index) in rankList" :key="index">
					<image v-if="item.user&&item.user.avatarurl" class='avatar' :src="item.user.avatarurl" mode="aspectFill"></image>
					<image v-else class='avatar' :src="$app.getData('AVATAR')" mode="aspectFill"></image>
					<view class="text-wrap">
						<view class="name">{{item.user&& item.user.nickname?item.user.nickname:$app.getData('NICKNAME')}}</view>
						<view class="card">
							邀请人数：100
						</view>
					</view>
					<view class="rank flex-set">{{index+1}}</view>
				</view>
				<view class="item-wrap flex-set" v-if="!rankList.length">
					虚位以待
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import listItemComponent from '@/components/listItemComponent.vue';
	import btnComponent from "@/components/btnComponent.vue";
	
	export default {
		components: {
			listItemComponent,
			btnComponent,
		},
		data() {
			return {
				type: 'STONE_WELFARE',
				rankList: [],
				page: 1,
				size: 10,
				end: false,
				star: {},
				left_time: {
					full: 0,
					d: 0,
					h: 0,
					i: 0,
					s: 0,
				},
				left_timer: undefined,
				welfare: {},
				banner:"",
				progress: [],
				welfare_star:{},
				notice: {},
				rewardList:[],
			};
		},
		onShow() {
			this.star = this.$app.getData('userStar')
			this.getWelfare()
			this.getPageInfo()
			this.getRankList()
		},
		onReachBottom() {
			this.page++
			this.getRankList()
		},
		onUnload() {
			this.cleanTimer()
		},
		onShareAppMessage(e) {
			const shareType = e.target && e.target.dataset.share;
			
			return this.$app.commonShareAppMessage(shareType)
		},
		methods: {
			setTimer(endTime) {
				this.left_timer = setInterval(() => {
					const now = Math.round(Date.now() / 1000),
						diff = endTime - now;
					
					if (diff <= 0) {
						this.setCurrentBanner();
					} else {
						const time = this.$app.timeGethms(diff);
						
						this.left_time = {
							full: endTime,
							d: time.day,
							h: time.hour,
							i: time.min,
							s: time.sec
						}
					}
				}, 1000);
			},
			cleanTimer() {
				clearInterval(this.left_timer);
				this.left_timer = undefined;
			},
			getPageInfo(delay) {
				this.$app.request(this.$app.API.PAGE_LUCKY_CHARGE, {}, res => {
					this.lrtext = res.data.recharge_lucky;
					
					if (delay) {
						setTimeout(() => {
							this.rewardList = res.data.lucky_log;
							this.scrapList = res.data.scrap_list;
						}, delay);
					} else {
						this.scrapList = res.data.scrap_list;
						this.rewardList = res.data.lucky_log;
					}
				})
			},
			getInfo() {
				this.$app.request(this.$app.API.PAGE_INVITE_ASSIST,{}, res => {
					console.info(res.data);
				})
			},
			getWelfare() {
				this.$app.request(this.$app.API.WELFARE_INFO, {type: this.type}, res => {
					this.welfare = res.data;
					this.banner = res.data.welfare.extra.banner;
					this.notice = res.data.welfare.notice;
					this.welfare_star = res.data.star;
					this.progress = res.data.welfare.extra.progress;
					this.setTimer(res.data.welfare.end)
				})
			},
			refresh() {
				this.page = 1;
				this.end = false;
				this.getRankList()
			},
			getRankList() {
				if (this.end) return;
				this.$app.request(this.$app.API.WELFARE_RANK, {
					page: this.page,
					size: this.size,
					type: this.type,
				}, res => {
					this.rankList = this.page == 1 ? res.data: this.rankList.concat(res.data);
					if (res.data.length < this.size) this.end = true;
				})
			},
		},
	}
</script>

<style lang="scss" scoped>
	.container {
		
		.header {
			position: absolute;
			top: 0;
			left: 50%;
			transform: translate(-50%,-50%);
			background:rgba(255,230,115,1);
			border-radius:0px 0px 60px 60px;
			padding: 5upx 10upx;
			.bg {
				background:rgba(236,121,52,1);
				border-radius:0px 0px 60px 60px;
				padding: 10rpx 40rpx;
				font-size: 24upx;
				color: white;
				margin: 0 auto;
				text-align: center;
				white-space: nowrap;
			}
		}
		.btn-bg {
			height: 60upx; 
			width: 180upx;
			font-size: 24upx;
			color: white;
		}
		
		.notice {
			margin: 30upx 20upx 0;
			background:rgba(248,226,207,0.57);
			border-radius:19upx;
			display: flex;
			justify-content: flex-start;
			.notice-icon {
				margin:0;
				margin-left: 4%;
				width: 35upx;
				align-self: center;
				height: 35upx;
				border-radius:50%;
			}
			.notice-info {
				margin: 10upx 5%;
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
							color: #FFCC00;
						}
						.ucr {
							white-space: nowrap;
						}
						.reward-name {
							color: #FF6600;
						}
					}
				}
			}
		}
	
		
		.swiper-container {
			margin: 5upx 30upx;
			height: 250upx;
			border-radius: 30upx;
			overflow: hidden;
			position: relative;
			z-index: 1;
		
			.banner {
				width: 690upx;
				height: 250upx;
				background: url('https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTERVpWtSSpwicFERRz0Wa4Nw9AG4iaH5mBbnjW6zmm26oETkLm86mfk8srw/0') no-repeat left top;
				background-size: cover;
			}
		
			.bottom-hold {
				position: absolute;
				z-index: 3;
				bottom: 0;
				left: 0;
				height: 100upx;
				width: 100%;
				.bg {
					position: absolute;
				}
				.content {
					top: 73%;
					width: 100%;
					color: #FFF;
					font-size: 26upx;
		
					.avatar {
						width: 40upx;
						height: 40upx;
						border-radius: 50%;
					}
					text {
						color: #fbb225;
						margin: 0 4upx;
					}
				}
			}
			
			.small {
				position: absolute;
				bottom: 10upx;
				left: 10upx;
				color: #fff;
				background-color: rgba(#000, .8);
				border-radius: 30upx;
				padding: 5upx 20upx;
				font-size: 24upx;
				z-index: 3;
				.text {
					padding: 0 10upx;
					color: yellow;
				}
			}
		}
		
		.recharge {
			margin: 60upx 20upx 0;
			background: rgba(#FFE5D5, 0.35);
			
			.content {
				position: relative;
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
						font-size: 24upx;
						color: white;
						margin: 0 auto;
						text-align: center;
					}
				}
				.tip {
					width: 80%;
					padding-top: 40rpx;
					margin: 0 auto;
					.tip-desc {
						padding:0 20rpx;
						border-radius:19upx;
						line-height:45upx;
						font-size:26upx;
						font-weight: 650;
						color:rgba(120,67,16,1);
						text-align: center;
					}
				}
				.right-tip {
					position: absolute;
					transform: translate(-50%,-50%);
					top: 10%;
					right: -6%;
					.get-btn {
						font-size: 28rpx;
						text-decoration: underline;
						color: #FBCC3E;
					}
				}
				.desc {
					padding: 40upx;
					padding-bottom: 20upx;
					font-size: 24upx;
					color: rgba(0,0,0,0.5);
					.c-title {
						color: rgba(0,0,0,0.7);
						font-weight: 650;
					}
					.c-desc {
						padding-left: 20upx;
					}
				}
				.buttom {
					padding-bottom: 30rpx;
					.btn {
						display: flex;
						flex-direction: row;
						justify-content: space-around;
						padding: 10rpx 20rpx;
						font-size: 24rpx;
						line-height: 40rpx;
						color: white;
						.icon {
							width: 40rpx;
							height: 40rpx;
							margin-left: 10rpx;
						}
					}
				}
				.tr-affix {
					position: absolute;
					transform: translate(-50%,-50%);
					right: -3%;
					top: 8%;
					.share-bg {
						background: url("https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FDIxqXSWnDQQ5LzdoiabR5HIb2cic1XqCuicThVFa5MeMkNsEIzv3ASdLqneZKZl31IAvbdncnN9xOw/0") no-repeat center center;
						background-size: cover;
						width: 56rpx;
						height: 56rpx;
					}
				}
				
				.my-milestone-wrap {
					padding: 230upx 30upx !important;
					.item-box {
						flex: unset;
					}
				}
				
				.milestone-wrap {
					width: 100%;
					display: flex;
					align-items: center;
					padding: 50upx 30upx;
					padding-bottom: 120rpx;
					.dot {
						background-color: #d9d6c7;
						border-radius: 50%;
						width: 40upx;
						height: 40upx;
						z-index: 1;
						position: relative;
				
						.name {
							position: absolute;
							top: -40upx;
							left: 50%;
							transform: translateX(-50%);
							font-size: 22upx;
							white-space: nowrap;
						}
				
						.value {
							position: absolute;
							bottom: -40rpx;
							left: 50%;
							transform: translateX(-50%);
							font-size: 22upx;
							white-space: nowrap;
						}
					}
				
					.dot.finished {
						background-color: #ffe286;
					}
				
					.item-box {
						flex: 1;
						display: flex;
						align-items: center;
						position: relative;
				
						.progress {
							margin: 0 -5upx;
							flex: 1;
							height: 20upx;
							background-color: #9589ad;
				
							.progress-finished {
								width: 0%;
								height: 100%;
								background-color: #ffaa69;
							}
						}
						.reward {
							position: absolute;
							transform: translate(-50%, -50%);
							left: 44%;
							top: 200%;
							font-size: 22rpx;
							width: 190rpx;
							height: 100rpx;
							background: url("https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FDIxqXSWnDQQ5LzdoiabR5HmiaQRpzXC52cshVUEQtOFRA7xL0iaJMhcP0lYfNN7ibIXZMMdS4zN6waQ/0") no-repeat center center;
							background-size: cover;
							padding-top: 30rpx;
							padding-left: 20rpx;
						}
						.my-reward {
							position: absolute;
							transform: translate(-50%, -50%);
							left: 44%;
							top: -100%;
						}
						
						.reward-item {
							margin: 10rpx 5rpx;
							position: relative;
							background: url("http://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9H3sH9NNZVwUQcM60TfnoLib3Hghw7t9kjNib9BGLeJdAThI5SibO2iaPuNk7icXt38o0Q2OibRYtHAJrpw/0") no-repeat center center / 100% 100%;
							height: 160rpx;
							width: 160rpx;
							.icon {
								width: 60rpx;
								height: 60rpx;
								margin-bottom: 40rpx;
							}
							.name {
								position: absolute;
								left: 50%;
								bottom: 0%;
								transform: translate(-50%, -50%);
								text-align: center;
								white-space: nowrap;
								font-size: 26rpx;
							}
						}
						.reward.finish {
							background: url("https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FDIxqXSWnDQQ5LzdoiabR5H10I70fYXkZRKvkuBVuM0wGVkfibJzyzA4wzjhllpXJ8vYoMRNv1S9HQ/0") no-repeat center center;
							background-size: cover;
						}
					}
				}
			}
		}

		.rank-list-container {
			.title {
				height: 90upx;
				display: flex;
				align-items: center;
				font-weight: 700;
				padding: 0 40upx;
				color: black;
			}
		
			.scroll-view {
				.item-wrap {
					min-height: 80upx;
					display: flex;
					position: relative;
					// background-color: #fbdedb;
					padding: 10upx 40upx;
		
					.avatar {
						width: 100upx;
						height: 100upx;
						border-radius: 50%;
					}
		
					.text-wrap {
						flex: 1;
						display: flex;
						flex-direction: column;
						justify-content: space-around;
						padding: 0 40upx;
						// width: 350upx;
		
						.name {}
		
						.card {
							color: #db7979;
							font-size: 24upx;
							.icon {
								width: 40rpx;
								height: 40rpx;
								margin-left: 10rpx;
							}
						}
		
						.progress {
							border-radius: 30upx;
							overflow: hidden;
						}
					}
		
					.rank {
						width: 70upx;
						height: 70upx;
						position: absolute;
						right: 40upx;
						top: 50%;
						transform: translateY(-50%);
						border-radius: 50%;
						color: #FFF;
						background-color: #b90504;
						font-size: 32upx;
		
					}
				}
			}
		}
		
	}
</style>
