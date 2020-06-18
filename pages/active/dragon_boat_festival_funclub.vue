<template>
	<view class="container">
		<view class="top">
			<view class="bonus_total">黄金场：1400元奖金</view>
			<view class="bonus">
				<view>第一名：1000元</view>
				<view>第二名：300元</view>
				<view>第三名：100元</view>
			</view>
		</view>
		<view class="bonus_time">活动时间：6月25日-7月1日</view>
		<view class="invite_user">
			<btnComponent type="default">
				<button class="btn" open-type="share" @tap="buttonHandler" data-sharetype="share">
					<view class="flex-set" style="width: 300upx; height: 60upx;">喊团员一起打榜拿第一</view>
				</button>
			</btnComponent>
		</view>
		<!-- 列表 -->
		<view class="list-container">
			<view class="item" v-for="(item,index) in userRank" :key="index">
				<view class="rank-num">
					<image class="icon" v-if="index==0" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTERPO5dPoLHgkajBHNM2z9fooSUMLxB0ogg1mYllIAOuoanico1icDFfYFA/0"
					 mode=""></image>
					<image class="icon" v-else-if="index==1" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTERcWnBrw6yAIeVRx4ibIfShZ3tn26ubDUiakNcrwf2F43JI97MYEaYiaib9A/0"
					 mode=""></image>
					<image class="icon" v-else-if="index==2" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTER7oibKWZCN5ThjI799sONJZAtZmRRTIQmo1R9j26goVMBJ43giaJHLIlA/0"
					 mode=""></image>
					<view v-else>{{index-0+1}}</view>
				</view>
				<view class='avatar-wrap'>
					<image class="avatar" :src="item.user.avatarurl || AVATAR" mode="aspectFill"></image>
					<image v-if="item.user&&item.user.headwear&&item.user.headwear.img" class="headwear position-set" :src="item.user.headwear.img"
					 mode=""></image>
				</view>
				<view class="text-container">
					<view>
						{{item.user.nickname || NICKNAME}}
						<image class="img-s" :src="'/static/image/user_level/lv'+item.user.level+'.png'" mode=""></image>
					</view>
				</view>
				<view class="count">
					<view>618福袋获得</view>
					<view>{{item.send_blessing_num}}</view>
				</view>
			</view>
		</view>
		<!-- 我的 -->
		<view class="my-container">
			<view class="rank-num">
				<view>{{myInfo.rank}}</view>
			</view>
			<view class='avatar-wrap'>
				<image class="avatar" :src="$app.getData('userInfo').avatarurl" mode="aspectFill"></image>
				<image v-if="myInfo.user.headwear&&myInfo.user.headwear.img" class="headwear position-set" :src="myInfo.user.headwear.img"
				 mode=""></image>
			</view>
			<view class="text-container">
				<view>
					{{$app.getData('userInfo').nickname}}
					<image class="img-s" :src="'/static/image/user_level/lv'+myInfo.user.level+'.png'" mode=""></image>
				</view>

			</view>
			<view class="count">618福袋获得 {{myInfo.send_blessing_num||''}}</view>
		</view>
	</view>
</template>

<script>
	import btnComponent from '@/components/btnComponent.vue'
	export default {
		components: {
			btnComponent,
		},
		data() {
			return {
				userRank: [],
				page: 1,
				myInfo: {},
				AVATAR: this.$app.getData('AVATAR'),
				NICKNAME: this.$app.getData('NICKNAME'),
			};
		},
		onLoad(option) {
			this.loadData()
		},
		onReachBottom() {
			if (this.page < 10) {
				this.page++;
				this.loadData()
			}
		},
		methods: {
			loadData() {
				if (this.page > 10) return
				this.$app.request(this.$app.API.ACTIVE_BLESSING_LIST, {
					page: this.page,
				}, res => {
					this.myInfo = res.data.myinfo
					console.log(this.myInfo)
					if (this.page == 1) {
						this.userRank = res.data.list
					} else {
						this.userRank = this.userRank.concat(res.data.list)
					}
				})
			},
			buttonHandler(e) {
				const sharetype = e.target.dataset.sharetype
				if (sharetype == 'share') {
					// 分享
					const shareType = e.target && e.target.dataset.sharetype
					// #ifdef APP-PLUS
					const shareOptions = this.$app.commonShareAppMessage(shareType)
					this.$refs.shareModal.shareShow(shareOptions)
					// #endif
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		.top{
			width: 100%;
			display: flex;
			flex-direction: column;
			padding: 0 40rpx;
			border-bottom: 4rpx solid #f2f3f4;
			
			.bonus_total{
				font-size: 36rpx;
				font-weight: bold;
				padding: 15rpx 0;
			}
			.bonus{
				display: flex;
				flex-direction: row;
				view{
					flex:1 1 0%
				}
			}
		}
		
		.bonus_time{
			font-size: 28rpx;
			font-weight: bold;
			padding: 15rpx 40rpx;
			
		}
		.invite_user{
			width: 100%;
			padding: 0 100rpx 15rpx 100rpx;
		}

		.list-container {
			padding-bottom: 130upx;

			.item {
				height: 130upx;
				display: flex;
				align-items: center;

				.rank-num {
					text-align: center;
					width: 100upx;

					.icon {
						width: 50upx;
						height: 50upx;
					}
				}

				.avatar-wrap {
					position: relative;

					.avatar {
						width: 100upx;
						height: 100upx;
						border-radius: 50%;
					}

					.headwear {
						width: 150%;
						height: 150%;
					}
				}

				.text-container {
					margin: 0 20upx;
					width: 250upx;

					.bottom-text {
						display: flex;
						align-items: center;
						color: $text-color-1;
					}
				}

				.count {
					margin: 0 30upx;
					color: #ff8421;
				}


			}
		}

		.my-container {
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 130upx;
			display: flex;
			align-items: center;
			background-color: #FFF;

			.rank-num {
				text-align: center;
				width: 100upx;

				.icon {
					width: 50upx;
					height: 50upx;
				}
			}

			.avatar-wrap {
				position: relative;

				.avatar {
					width: 100upx;
					height: 100upx;
					border-radius: 50%;
				}

				.headwear {
					width: 150%;
					height: 150%;
				}
			}

			.text-container {
				margin: 0 20upx;
				width: 250upx;

				.bottom-text {
					display: flex;
					align-items: center;
					color: $text-color-1;
				}
			}

			.count {
				margin-left: 30upx;
				color: #ff8421;
			}
		}
	}
</style>
