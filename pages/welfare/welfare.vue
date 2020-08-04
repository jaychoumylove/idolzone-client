<template>
	<view class="container">
		<view class="swiper-container">
			<image class='img' :src="welfare.welfare.extra.banner" mode="aspectFill"></image>
			<view class="small" v-if="left_time.full >= 0">
				距离结束还剩：
				<block v-if="left_time.d">
					<text class="text">{{left_time.d}}</text>
					天
				</block>
				<text class="text">{{left_time.h}}</text>
				时
				<text class="text">{{left_time.i}}</text>
				分
				<text class="text">{{left_time.s}}</text>
				秒
			</view>
			<view class="small" v-else>
				活动已截止
			</view>
		</view>
		
		<view class="recharge" style="box-shadow:0 3upx 7upx 0 rgba(0, 0, 0, 0.23);border-radius:30upx;">
			<view class="content">
				<view class="header">
					<view class="bg" style="font-size: 28upx;font-weight: 700;line-height: 28upx;">
						{{star.name || ''}}
					</view>
				</view>
				<view class="tip flex-set">
					<view class="tip-desc">{{welfare.welfare.title || ''}}</view>
				</view>
				
				<!-- 里程碑进度条 -->
				<view class="milestone-wrap">
					<view class="dot finished"></view>
					<view class="item-box" v-for="(item,index) in welfare.welfare.extra.progress" :key="index">
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
							圈内当前已使用钻石:{{welfare.star ? $app.formatNumber(welfare.star.count): 0}}
							<image class="icon" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTERibO7VvqicUHiaSaSa5xyRcvuiaOibBLgTdh8Mh4csFEWRCbz3VIQw1VKMCQ/0"
							 mode="aspectFill"></image>
						</view>
					</btnComponent>
				</view>
				
				<view class="tr-affix">
					<btnComponent type='unset'>
						<view class="share-bg"></view>
					</btnComponent>
				</view>
			</view>
		</view>
		
		<view class="recharge">
			<view class="content">
				<view class="header">
					<view class="bg">
						{{welfare.welfare.notice.title || ''}}
					</view>
				</view>
				<view class="desc">
					<view class="p" v-for="(cv, ck) in welfare.welfare.notice.content" :key="ck">
						<text class="c-title">{{cv.title}}:</text>
						<text class="c-desc">{{cv.desc}}</text>
					</view>
				</view>
			</view>
		</view>

		<view class="rank-list-container">
			<view class="title">解锁公益福利贡献榜</view>
			<view class='scroll-view'>
				<view class='item-wrap' v-for="(item,index) in rankList" :key="index">
					<image v-if="item.user&&item.user.avatarurl" class='avatar' :src="item.user.avatarurl" mode="aspectFill"></image>
					<image v-else class='avatar' :src="$app.getData('AVATAR')" mode="aspectFill"></image>
					<view class="text-wrap">
						<view class="name">{{item.user&& item.user.nickname?item.user.nickname:$app.getData('NICKNAME')}}</view>
						<view class="card">
							累计使用：{{item.count}}
							<image class="icon" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTERibO7VvqicUHiaSaSa5xyRcvuiaOibBLgTdh8Mh4csFEWRCbz3VIQw1VKMCQ/0"
							 mode="aspectFill"></image>
						</view>
					</view>
					<view class="rank flex-set">{{index+1}}</view>
				</view>
				<view class="item-wrap flex-set" v-if="!rankList.length">
					还没有人来钻石打卡
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
				welfare: {}
			};
		},
		onShow() {
			this.star = this.$app.getData('userStar')
			this.getWelfare()
			this.getRankList()
		},
		onReachBottom() {
			this.page++
			this.getRankList()
		},
		onUnload() {
			this.cleanTimer()
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
			getWelfare() {
				this.$app.request(this.$app.API.WELFARE_INFO, {type: this.type}, res => {
					this.welfare = res.data;
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
					width: 220upx;
					left: 50%;
					transform: translate(-50%,-50%);
					background:rgba(255,230,115,1);
					border-radius:0px 0px 60px 60px;
					.bg {
						background:rgba(236,121,52,1);
						border-radius:0px 0px 60px 60px;
						padding: 10upx 20upx;
						width: 200upx;
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
