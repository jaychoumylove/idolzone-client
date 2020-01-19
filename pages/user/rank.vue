<template>
	<view class="container">

		<view class='tab-container'>
			<view class="tab-item" :class='{active:current==0}' @tap='switchAct(0)'>日榜</view>
			<view class="tab-item" :class='{active:current==3}' @tap='switchAct(3)'>上周</view>
			<view class="tab-item" :class='{active:current==1}' @tap='switchAct(1)'>周榜</view>
			<view class="tab-item" :class='{active:current==2}' @tap='switchAct(2)'>总榜</view>
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
					<view v-else>{{index+1}}</view>
				</view>
				<view class='avatar-wrap'>
					<image class="avatar" :src="item.user.avatarurl || AVATAR" mode="aspectFill"></image>
					<image v-if="item.user&&item.user.headwear&&item.user.headwear.img" class="headwear position-set" :src="item.user.headwear.img" mode=""></image>
				</view>
				<view class="text-container">
					<view>
						{{item.user.nickname || NICKNAME}}
						<image class="img-s" :src="`/static/image/user_level/lv${item.user.level}.png`" mode=""></image>
					</view>
				</view>
				<view class="count">
					<view>贡献值</view>
					<view>{{item.hot}}</view>
				</view>
			</view>
		</view>
		<!-- 我的 -->
		<view class="my-container" v-if="$app.getData('userStar').id == starid">
			<view class="rank-num">
				<view>{{myInfo.rank}}</view>
			</view>
			<view class='avatar-wrap'>
				<image class="avatar" :src="$app.getData('userInfo').avatarurl" mode="aspectFill"></image>
				<image v-if="myInfo.headwear&&myInfo.headwear.img" class="headwear position-set" :src="myInfo.headwear&&myInfo.headwear.img" mode=""></image>
			</view>
			<view class="text-container">
				<view>
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
				current: 0,

				starid: null,
				userRank: [],
				page: 1,
				myInfo: {},
				AVATAR:this.$app.getData('AVATAR'),
				NICKNAME: this.$app.getData('NICKNAME'),
			};
		},
		onLoad(option) {
			this.starid = option.starid
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

					if (this.page == 1) {
						this.userRank = res.data.list
					} else {
						this.userRank = this.userRank.concat(res.data.list)
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.container {
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
