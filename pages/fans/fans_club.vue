<template>
	<view class="new-page-container">

		<view class="top-container">
			<view class="left-wrap">
				<view class="top-wrap">
					{{info.clubname||''}}
					<text class="iconfont iconeditor" v-if="info.leader" style="color: #999;" @tap="$app.goPage(`/pages/fans/fans_new?fid=${info.id}`)"></text>
				</view>
				<view class="content-wrap">
					<view class="block">
						<view class="item">NO.{{info.week_rank||''}}</view>
						<view class="item bottom">排名</view>
					</view>
					<view class="block" @tap="$app.goPage('/pages/fans/member?fid=' + info.id)">
						<view class="item">{{info.mem_count||0}}人</view>
						<view class="item bottom">成员<text class="iconfont iconjiantou"></text></view>
					</view>
					<view class="block">
						<view class="item">{{(info.week_hot/10000).toFixed(1)+'万'||0}}</view>
						<view class="item bottom">本周热度</view>
					</view>
					<view class="block">
						<view class="item">{{(info.week_count/10000).toFixed(1)+'万'||0}}</view>
						<view class="item bottom">本周贡献</view>
					</view>
				</view>
			</view>
			<view class="right-wrap">
				<view class="avatar-wrap">
					<image class="avatar" :src="info.avatar||$app.getData('AVATAR')" mode="aspectFill"></image>
					<view class="bottom flex-set" @tap="$app.goPage('/pages/group/group')">
						<image class="btn" src="https://mmbiz.qpic.cn/mmbiz_png/h9gCibVJa7JXsqa9U7hNge9bVPRa04Tia6LcFf0micBuNEvUO2Fd4iaP8EcuBBFJDGAeKVZtupWHFUNiafibUSySNp7A/0"
						 mode="aspectFill"></image>
						<view class="text">为TA冲榜</view>
					</view>
				</view>
			</view>

		</view>

		<view class="center-btn-container">
			<button class="btn-wrap" open-type="share" data-share="7" @tap="buttonHandler" data-opentype="share">
				<image class="bg" src="https://mmbiz.qpic.cn/mmbiz_png/h9gCibVJa7JXsqa9U7hNge9bVPRa04Tia6F314XicqD4qdfLBHfJQ0yreKuccibDWxNd3tHUBLiblEkX06uvZD2cxXg/0"
				 mode="aspectFill"></image>
				<view class="content">
					<view class="times">{{info.mass_time||''}}集结进行中</view>
					<view class="text">目前集结人数:{{info.mass_people||0}}人</view>
					<view class="text">粉丝团热度+{{info.mass_total||0}}</view>
					<view class="fans-rank-wrap">
						<image class="avatar" v-for="(item,index) in info.mass_user" :key="index" :src="item.user.avatarurl||$app.getData('AVATAR')"
						 mode="aspectFill"></image>
					</view>
					<view class="bottom">发起集结让更多人加入</view>
				</view>
			</button>
		</view>
		<!-- <view class="btn-wrap">
				<image class="bg" src="https://mmbiz.qpic.cn/mmbiz_png/h9gCibVJa7JXsqa9U7hNge9bVPRa04Tia6F314XicqD4qdfLBHfJQ0yreKuccibDWxNd3tHUBLiblEkX06uvZD2cxXg/0"
				 mode="aspectFill"></image>
				<view class="content">
					<view class="text">团战</view>
				</view>
			</view> -->

	<shareModalComponent ref="shareModal"></shareModalComponent>
	</view>
</template>

<script>
	import btnComponent from '@/components/btnComponent.vue';
	import modalComponent from "@/components/modalComponent.vue"

	export default {
		components: {
			btnComponent,
			modalComponent,
		},
		data() {
			return {
				fid: 0,
				modal: '',
				info: {
					week_count: 0,
					week_hot: 0,
				},
			};
		},
		onLoad(option) {
			this.fid = option.fid
		},
		onShow() {
			this.loadData()
		},
		onShareAppMessage(e) {
			const shareType = e.target && e.target.dataset.share
			return this.$app.commonShareAppMessage(shareType)
		},
		methods: {
			buttonHandler(e) {
				const opentype = e.target.dataset.opentype
				if (opentype == 'share') {
					// 分享
					const shareType = e.target && e.target.dataset.share
					// #ifdef APP-PLUS
					const shareOptions = this.$app.commonShareAppMessage(shareType)
					this.$refs.shareModal.shareShow(shareOptions)
					// #endif
				}
			},
			mass(type) {
				this.$app.request('ext/fansclubMass', {
					type
				}, res => {
					this.$app.toast('集结成功', 'success')
					this.modal = ''
				}, 'POST', true)
			},
			ad() {
				this.$app.openVideoAd(() => {
					this.mass(1)
				})
			},
			loadData() {
				this.$app.request('fans/info', {
					fid: this.fid
				}, res => {
					this.info = res.data
				})
			}

		}
	}
</script>

<style lang="scss">
	.new-page-container {
		height: 100%;
		display: flex;
		flex-direction: column;

		.top-container {
			padding: 20upx;
			color: #fff;
			background-color: #2b3849;
			display: flex;

			.left-wrap {
				flex: 1;

				.top-wrap {
					font-weight: 700;
					font-size: 34upx;
					margin: 20upx 0;
					display: flex;
					align-items: center;
				}

				.content-wrap {
					display: flex;

					.block {
						flex: 1;
						white-space: nowrap;

						.bottom {
							font-size: 24upx;
							color: #dce0e1;
						}
					}
				}

			}

			.right-wrap {
				.avatar-wrap {
					position: relative;
					margin: 10upx;

					.avatar {
						width: 160upx;
						height: 160upx;
						border-radius: 50%;
						box-shadow: 0 2upx 16upx rgba(#999, .6);
					}

					.bottom {
						width: 150upx;
						height: 34upx;
						position: absolute;
						left: 50%;
						transform: translateX(-50%);
						bottom: -10upx;

						.btn {
							position: absolute;
							z-index: -1;
						}

						.text {
							font-size: 26upx;
							color: #333;
						}
					}
				}
			}

		}

		.center-btn-container {
			display: flex;
			justify-content: space-between;
			padding: 15upx;
			color: #fff;

			.btn-wrap {
				position: relative;
				width: 100%;
				height: 300upx;
				border-radius: 30upx;
				overflow: hidden;
				z-index: 1;
				text-align: left;

				.bg {
					position: absolute;
					z-index: -1;
				}

				.content {
					width: 100%;
					height: 100%;
					padding: 20upx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					align-items: center;

					.times {
						font-weight: 700;
					}

					.fans-rank-wrap {
						display: flex;
						margin-left: 10upx;

						.avatar {
							width: 60upx;
							height: 60upx;
							border-radius: 50%;
							margin-left: -10upx;
						}
					}

					.bottom {
						border-radius: 30upx;
						background-color: #ee7d03;
						padding: 5upx 20upx;
						font-size: 32upx;
					}
				}
			}
		}

		.chart-container {
			flex: 1;
			overflow-y: auto;

			.chart-item {
				display: flex;
				justify-content: space-between;
				padding: 16upx 40upx;
				position: relative;

				.left-wrap {
					display: flex;
					align-items: flex-start;
					flex: 1;

					.avatar-wrap {
						position: relative;
						height: auto;

						.avatar {
							width: 86upx;
							height: 86upx;
							border-radius: 50upx;
						}

						.headwear {
							width: 150%;
							height: 150%;
						}
					}

					.avatar-wrap.captain::after {
						content: "领";
						position: absolute;
						background-color: rgba(#F99152, .8);
						border-radius: 12upx;
						z-index: 1;
						padding: 0 4upx;
						color: #FFF;
						font-size: 20upx;
						right: 0;
						bottom: 0;
					}

					.center-wrap {
						margin-left: 20upx;

						.top {
							color: #737373;
							display: flex;
							align-items: center;
							font-size: 24upx;

							.badge-wrap {
								padding: 0 2upx;
								display: flex;

								.user-level-wrap {
									display: flex;

									.img {
										width: 34upx;
									}

									.user-level-text {
										border-radius: 30upx;
										padding-right: 10upx;
									}

									.level1 {
										color: #B8CAD6;
										background: linear-gradient(to right, rgba(206, 223, 232, 0), rgba(206, 223, 232, 0.6));
									}

									.level2,
									.level3,
									.level4,
									.level5 {
										color: #74D0FF;
										background: linear-gradient(to right, rgba(112, 228, 254, 0), rgba(112, 228, 254, 0.6));
									}

									.level6,
									.level7,
									.level8 {
										color: #09EA71;
										background: linear-gradient(to right, rgba(102, 240, 123, 0), rgba(102, 240, 123, 0.6));
									}

									.level9,
									.level10,
									.level11 {
										color: #FD8465;
										background: linear-gradient(to right, rgba(255, 161, 161, 0), rgba(255, 161, 161, 0.6));
									}

									.level12,
									.level13 {
										color: #F76134;
										background: linear-gradient(to right, rgba(255, 160, 128, 0), rgba(255, 160, 128, 0.6));
									}

									.level14 {
										color: #FD75A1;
										background: linear-gradient(to right, rgba(255, 151, 197, 0), rgba(255, 151, 197, 0.6));
									}

									.level15 {
										color: #EB5AFF;
										background: linear-gradient(to right, rgba(224, 137, 255, 0), rgba(224, 137, 255, 0.6));
									}

									.level16 {
										color: #e8b12a;
										background: linear-gradient(to right, rgba(224, 137, 255, 0), rgba(226, 186, 84, 0.6));
									}

								}

							}
						}

						.bottom {
							margin-top: 10upx;
							border-radius: 20upx;
							border: 2upx solid #cecece;
							background-color: #f6f6f6;
							padding: 10upx 20upx;
							font-size: 30upx;

							.angle {
								position: absolute;
								width: 16upx;
								height: 16upx;
								background-color: #f6f6f6;
								border-bottom: 2upx solid #cecece;
								border-left: 2upx solid #cecece;
								left: 138upx;
								top: 78upx;
								transform: rotate(45deg);
							}
						}
					}
				}

				.right-wrap {
					font-size: 22upx;
					color: #797979;
				}
			}

		}

		.chart-btn-container {

			.top-wrap {
				padding: 20upx 40upx;
				padding-bottom: 0;
				display: flex;
				align-items: center;

				.trumpet-wrap {
					display: flex;
					align-items: center;

					.icon {
						width: 40upx;
						height: 40upx;
						margin: 0 10upx;
					}
				}

				.space {
					padding: 0 20upx;
					color: #e0e0e0;
				}

				.tips {
					font-size: 24upx;
					color: #999999;
				}
			}

			.bottom-wrap {
				padding: 0 20upx;
				display: flex;
				align-items: center;

				.input {
					border-radius: 30upx;
					border: 2upx solid #e0e0e0;
					background-color: #f0f0f0;
					flex: 1;
					padding: 0 20upx;
					height: 63upx;
					line-height: 63upx;
					margin: 20upx 0;
					margin-right: 20upx;
				}

				.btn {
					border-radius: 30upx;
					width: 176upx;
					height: 63upx;
					background-color: #ffd524;
				}

			}
		}

	}
</style>
