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
					<view>夏日福袋获得</view>
					<view>{{item.send_weal_hot}}</view>
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
			<view class="count">夏日福袋获得 {{myInfo.send_weal_hot|| 0}}</view>
		</view>
	</view>
</template>

<script>
	export default {
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
			if(this.page<10){
				this.page++;
				this.loadData()
			}
		},
		methods: {
			loadData() {
				if (this.page > 10) return
				this.$app.request(this.$app.API.ACTIVE_WEAL_LIST, {
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
		}
	}
</script>

<style lang="scss" scoped>
	.container {

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
