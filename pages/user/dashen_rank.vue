<template>
	<view class="container">
		<view class="title">
			<image src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9EFgQAIpRVCHpawBuWnGAH7bxaH6wy77e0GI22k8bplXE9ePibSichPcjoQGpQLiagN6zqC2pGfBoPzA/0"
			 mode=""></image>
		</view>
		<!-- <view class="tab-container">
			<view class="tab-item" :class="{active:current==0}" @tap="switchAct(0);">日榜</view>
			<view class="tab-item" :class="{active:current==3}" @tap="switchAct(3);">上周</view>
			<view class="tab-item" :class="{active:current==1}" @tap="switchAct(1);">周榜</view>
			<view class="tab-item" :class="{active:current==2}" @tap="switchAct(2);">总榜</view>
		</view> -->

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
					<view v-else>{{index+1}}</view>
				</view>
				<view class='avatar-wrap'>
					<image class="avatar" :src="item.avatar" mode="aspectFill"></image>
					<image v-if="item.headwear" class="headwear position-set" :src="item.headwear" mode=""></image>
				</view>
				<view class="text-container">
					<view>
						{{item.nickname}}
						<image class="img-s" :src="`/static/image/user_level/lv${item.level}.png`" mode=""></image>
					</view>					
					<view v-if='item.starname' class='starname'>{{item.starname}}</view>
				</view>
				<view class="count">贡献值{{item.hot}}</view>
			</view>
		</view>
		<!-- 我的 -->
		<view class="my-container">
			<view class="rank-num">
				<view>{{myInfo.rank}}</view>
			</view>
			<view class='avatar-wrap'>
				<image class="avatar" :src="$app.getData('userInfo').avatarurl" mode="aspectFill"></image>
				<image v-if="myInfo.headwear&&myInfo.headwear.img" class="headwear position-set" :src="myInfo.headwear&&myInfo.headwear.img" mode=""></image>
			</view>
			<view class="text-container">
				<view class="text-overflow">
					{{$app.getData('userInfo').nickname}}
					<image class="img-s" :src="`/static/image/user_level/lv${myInfo.level}.png`" mode=""></image>
				</view>

			</view>
			<view class="count">贡献值 {{myInfo.score||''}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 2,

				starid: null,
				userRank: [],
				page: 1,
				myInfo: {},
			};
		},
		onLoad(option) {
			this.starid = 0
			this.loadData()
		},
		onReachBottom() {
			this.page++
			this.loadData()
		},
		methods: {
			switchAct(current) {
				this.page = 1
				this.current = current
				this.loadData()
			},
			loadData() {
				if (this.page > 10) return
				let field;
				if (this.current == 0) {
					field = 'thisday_count'
				} else if (this.current == 1) {
					field = 'thisweek_count'
				} else if (this.current == 2) {
					field = 'total_count'
				} else if (this.current == 3) {
					field = 'lastweek_count'
				}
				this.$app.request(this.$app.API.USER_RANK, {
					starid: this.starid,
					page: this.page,
					field,
				}, res => {
					this.myInfo = res.data.my
					const resList = []
					res.data.list.forEach((e, i) => {
						resList.push({
							avatar: e.user && e.user.avatarurl || this.$app.AVATAR,
							nickname: e.user && e.user.nickname || this.$app.NICKNAME,
							hot: e.hot,
							level: e.user && e.user.level,
							headwear: e.user && e.user.headwear && e.user.headwear.img,
							starname: e.star && e.star.name
						})
					})

					if (this.page == 1) {
						this.userRank = resList
					} else {
						this.userRank = this.userRank.concat(resList)
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		.title image{
			width: 750upx;
			height: 191upx;
		}
		.tab-container {
			padding: 25upx;
			display: flex;
			align-items: center;
			justify-content: space-around;
			border-bottom: 1upx solid #eee;

			.tab-item {
				border-radius: 32upx;
				border: 1upx solid #FF7E00;
				padding: 10upx 30upx;
				justify-content: center;
				display: flex;
				font-size: 30upx;
				margin: 0 20upx;
				flex: 1;
				color: #FF7E00;
			}

			.tab-item.active {
				background-color: #FF7E00;
				text-align: center;
				color: #fff;
			}
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
				
					.starname {
						background: -webkit-linear-gradient(#ff7e00, #fccd9f);
						color: #fff;
						padding: 0 12upx;
						border-radius: 12upx;
						font-size: 20upx;
						box-shadow: 0 0 1px rgba(0, 0, 0, .3);
						line-height: 34upx;
						margin: 0 5upx;
						white-space: nowrap;
						width: 100upx;
						text-align: center;

					}
					
				}
					

				.count {
					margin:0 30upx;
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
