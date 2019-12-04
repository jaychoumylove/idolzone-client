<template>
	<view class="container">

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
				<view class='avatar'>
					<image :src="item.avatar" mode="aspectFill"></image>
				</view>
				<view class="text-container">
					<view class="star-name text-overflow">{{item.nickname}}</view>
					<view class="starname">{{item.starname}}</view>
				</view>
				<view class="count">贡献{{item.hot}}鲜花</view>
			</view>
		</view>
		<!-- 我的 -->
		<view class="my-container">
			<view class="rank-num">
				<view>{{myInfo.rank}}</view>
			</view>
			<view class='avatar'>
				<image :src="$app.getData('userInfo').avatarurl" mode="aspectFill"></image>
			</view>
			<view class="text-container">
				<view class="star-name text-overflow">{{$app.getData('userInfo').nickname}}</view>

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
				this.$app.request(this.$app.API.USER_RANK, {
					starid: this.starid,
					page: this.page,
					field: 'thisbirth_rank',
				}, res => {
					this.myInfo = res.data.my
					const resList = []
					res.data.list.forEach((e, i) => {
						resList.push({
							avatar: e.user && e.user.avatarurl || this.$app.AVATAR,
							nickname: e.user && e.user.nickname || this.$app.NICKNAME,
							hot: e.hot,
							starname: e.starname,
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


				.avatar image {
					width: 100upx;
					height: 100upx;
					border-radius: 50%;
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
						background: linear-gradient(#ff7e00, #fccd9f);
						color: #fff;
						padding: 0 12upx;
						border-radius: 12upx;
						font-size: 20upx;
						box-shadow: 0 0 1px rgba(0, 0, 0, .3);
						margin: 0 5upx;
						display: inline-block;
					}
				}

				.count {
					margin-left: 30upx;
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

			.avatar image {
				width: 100upx;
				height: 100upx;
				border-radius: 50%;
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
