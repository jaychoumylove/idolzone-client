<template>
	<view class="container">
		<view class='tab-container'>
			<view class="tab-item" :class='{active:current==0}' @tap='switchAct(0)'>上周</view>
			<view class="tab-item" :class='{active:current==1}' @tap='switchAct(1)'>本周</view>
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
					<image class="avatar" :src="item.user && item.user.avatarurl||$app.getData('AVATAR')" mode="aspectFill"></image>
					<image class="headwear position-set" :src="item.headwear" mode=""></image>
					<view class="badge-wrap">
						<view class="leader" v-if="item.user_id==leader_uid">团长</view>
					</view>
				</view>
				<view class="text-container">
					<view class="star-name text-overflow">
						{{item.user && item.user.nickname||$app.getData('NICKNAME')}}
						<image class="img-s" :src="`/static/image/user_level/lv${item.level}.png`" mode=""></image>
					</view>
				</view>
				<view class="count">贡献热度 {{item.hot}}</view>
				<!-- <view class="exit iconfont iconclose" @tap="exit(item.user_id)" v-if="myInfo.user_id==leader_uid"></view> -->
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
				<view>
					{{$app.getData('userInfo').nickname}}
					<image class="img-s" :src="`/static/image/user_level/lv${myInfo.level}.png`" mode=""></image>
				</view>
		
			</view>
			<view class="count">贡献热度 {{myInfo.score||''}}</view>
			<image class="exit" src="https://mmbiz.qpic.cn/mmbiz_png/h9gCibVJa7JWwlVcSNe42f7cdITecxbg4vgXqHL191U954COPpyUJZk3bVFibGKvBO6lw9qBP2iaJLsB1U01mLcug/0"
			 mode="aspectFill"  @tap="exit(myInfo.user_id)" v-if="myInfo.user_id==$app.getData('userInfo').id"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
				fid: 0,
				userRank: [],
				page: 1,
				leader_uid: 0,
				myInfo: {},
				AVATAR:this.$app.getData('AVATAR'),
				NICKNAME: this.$app.getData('NICKNAME'),
			};
		},
		onLoad(option) {
			this.fid = option.fid
			this.loadData()
		},
		onReachBottom() {
			this.page++
			this.loadData()
		},
		methods: {
			exit(uid) {
				let msg = `是否退出该粉丝团`
				if(this.myInfo.hasExited) msg = `你已经退过一次，本次需要花费100钻石`
				this.$app.modal(msg, () => {
					this.$app.request('fans/exit', {
						user_id: uid,
					}, res => {
						this.$app.toast(`退出成功`)
						setTimeout(() => {
							uni.navigateBack({
								delta: 2
							})
						}, 1000)
					}, 'POST', true)
				})

			},
			switchAct(current) {
				this.page = 1
				this.current = current
				this.loadData()
			},
			loadData() {
				let field;
				if (this.current == 0) {
					field = 'lastweek_hot'
				} else if (this.current == 1) {
					field = 'thisweek_hot'
				}
				this.$app.request('fans/member', {
					
					fid: this.fid,
					page: this.page,
					field,
				}, res => {
					this.myInfo = res.data.my
					this.leader_uid = res.data.leader_uid
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

					.badge-wrap {
						position: absolute;
						bottom: 0;
						right: 0;

						.leader {
							background-color: rgba(#F99152, .8);
							border-radius: 12upx;
							padding: 0 6upx;
							color: #FFF;
							font-size: 20upx;
						}
					}
				}

				.text-container {
					margin: 0 20upx;
					width: 230upx;

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

				.exit {
					padding: 0 40upx;
					color: #888;
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
			
			.exit {
				width: 40upx;
				height: 40upx;
				color: #888;
			}
		}
	}
</style>
