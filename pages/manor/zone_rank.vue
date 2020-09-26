<template>
	<view class="container">
		<view class="top">
			<view class="top-desc flex-set" v-for="(ite, ind) in banner.title" :key="ind">{{ite}}</view>
			<!-- <view class="top-desc flex-set">{{banner.title}}</view> -->
		</view>
		<view class="banner" @tap="goOther(banner.gopage)" :style="{'background': 'url('+banner.image+') no-repeat center center/ 100% 100%'}"></view>
		
		<!-- 列表 -->
		<view class="list-container">
			<view class="top" v-if="rank_start.length" style="background-color: #F3F3F3;">
				<view class="top-desc flex-set" v-for="(ite, ind) in rank_start" :key="ind">{{ite}}</view>
			</view>
			<block v-for="(item,index) in userRank" :key="index">
				<view class="top" v-if="index==limitIndex" style="background-color: #F3F3F3;">
					<view class="top-desc flex-set" v-for="(ite, ind) in banner.title" :key="ind">{{ite}}</view>
				</view>
				<view class="item" :class="{'dispoint-item': index>=limitIndex}">
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
						<image class="avatar" :src="item.user.avatarurl || AVATAR"></image>
					</view>
					<view class="text-container">
						<view class="star-name text-overflow">
							{{item.user.nickname || NICKNAME}}
							<view class="starname flex-set">
								{{item.star.name}}
							</view>
						</view>
						<view class="count-box">
							<view class="count">领取了<text class="number">{{item.active_sum||0}}</text>庄园豆</view>
						</view>
					</view>
					<view class="go-visit">
						<btnComponent type='default' v-if="item.user_id!=myInfo.user_id">
							<view class="flex-set" @tap="goOtherManor(item.user_id)" style="width: 130upx;height: 65upx;">去拜访</view>
						</btnComponent>
					</view>
				</view>
			</block>
		</view>
	
		<!-- 我的 -->
		<view class="my-container" v-if='selfIdol'>
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
				</view>
				<view class="count-box">
					<view class="count">领取了<text class="number">{{myInfo.active_sum||0}}</text>庄园豆</view>
				</view>
			</view>
		</view>
	</view>
	
</template>

<script>
	import btnComponent from '@/components/btnComponent.vue';
	import modalComponent from '@/components/modalComponent.vue';
	export default {
		components: {
			btnComponent,
			modalComponent,
		},
		data() {
			return {
				rankField: 'fans',
				userRank: [],
				page: 1,
				myInfo: {},
				AVATAR:this.$app.getData('AVATAR'),
				NICKNAME: this.$app.getData('NICKNAME'),
				banner: {
					title: [],
					gopage: "/pages/notice/notice",
					image: "https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9G4romDKHbhtCKiaEbiaXwpqHsXKiaYkRBGzZp6aayTQM2r2ibE96Ho2oMQGxHVGO2icUBuFiaXOhPO7VXQ/0",
				},
				limitIndex: -1,
				mapRequest: {
					fans: 'manor/fansrank',
				},
				rank_start: [],
				star: 0,
				selfIdol: false,
			};
		},
		onLoad(option) {
			if (option.star_id) {
				this.star = option.star_id;
				this.selfIdol = option.star_id == this.$app.getData('userStar').id;
			}
		},
		onShow() {
			this.refresh();
		},
		onReachBottom() {
			this.page++
			this.loadData()
		},
		methods: {
			refresh(){
				this.page = 1;
				this.loadData();
			},
			loadData() {
				this.$app.request(this.mapRequest[this.rankField], {
					page: this.page,
					star_id: this.star
				}, res => {
					this.myInfo = res.data.my
					this.banner = res.data.banner
					this.limitIndex = res.data.limit_index
					this.rank_start = res.data.rank_start
					if (this.page == 1) {
						this.userRank = res.data.list
					} else {
						this.userRank = this.userRank.concat(res.data.list)
					}
				})
			},
			goOther(url) {
				if (url) {
					this.$app.goPage(url);
				}
			},
			goOtherManor(user_id) {
				if (!user_id) return false;
				uni.navigateTo({
					url:`/pages/manor/other_manor?user=${user_id}`
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		.top {
			padding: 20rpx 0rpx;
			.top-desc {
				color: #A5A5A5;
				font-size: 24rpx;
			}
		}
		.banner {
			height: 200rpx;
		}
		.scroll {
			white-space: nowrap;
			width: 100%;
			height: 120rpx;
			padding: 20rpx 15rpx;
			border-bottom: 1rpx solid #eee;
			.tab-container {
				display: flex;
				align-items: center;
				.tab-item {
					border-radius: 32upx;
					padding: 10upx 30upx;
					justify-content: center;
					display: flex;
					font-size: 30upx;
					margin: 0 20upx;
					flex: 1;
					color: #FF7E00;
					border: 1upx solid #FFEAC9;
				}

				.tab-item.active {
					background-color: #FFEAC9;
					text-align: center;
					color: #FF9B2E;
				}
			}
		}

		.search-wrap {
			display: flex;
			margin: 20upx;
			position: relative;

			.input {
				margin-right: 20upx;
				width: 550upx;
				height: 60upx;
				background-color: #f7f7f7;
				border-radius: 40upx;
				text-align: center;
			}

			.input-text {
				color: #999;
			}
		}
		.delete-wrap {
			display: flex;
			margin: 20rpx 40rpx;
			.left {
				display: flex;
				.chooseNum {
					margin-left: 20rpx;
				}
			}
			.right {
				margin-left: auto;
				display: flex;
			}
		}

		.list-container {
			.dispoint-item {
				background: #f9f7fa;
			}
			.item {
				height: 130upx;
				display: flex;
				align-items: center;
				border-bottom: 1rpx solid #eee;
				padding: 0 30rpx;
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
						width: 90upx;
						height: 90upx;
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
				.star-name {
					display: flex;
				}
				.starname {
					background: linear-gradient(#ff7e00, #fccd9f);
					color: #fff;
					padding: 0 12rpx;
					border-radius: 12rpx;
					font-size: 20rpx;
					box-shadow: 0 0 1px rgba(0, 0, 0, .3);
					line-height: 34rpx;
					margin: 0 5rpx;
					white-space: nowrap;
				}

				.text-container {
					margin: 0 20upx;
					width: 420upx;

					.bottom-text {
						display: flex;
						align-items: center;
						color: $text-color-1;
					}
				}

				.count {
					font-size: 22upx;
					color: #ADADAD;
					.number {
						color: #ff7e00;
						padding: 0 10rpx;
					}
				}

				.exit {
					color: #888;
				}
				.assist {
					display: flex;
					.assist-desc {
						white-space: nowrap;
						color: #A5A5A5;
						font-size: 20rpx;
						align-self: center;
					}
					.assist-top {
						display: flex;
						align-self: center;
						image {
							width: 50rpx;
							height: 50rpx;
							margin: 5rpx;
							border-radius: 25rpx;
						}
					}
					.go-assist-rank {
						color: #FED626;
						align-self: center;
					}
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
			border-top: 1upx solid #eee;

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
					width: 90upx;
					height: 90upx;
					border-radius: 50%;
				}

				.headwear {
					width: 150%;
					height: 150%;
				}
			}

			.text-container {
				margin: 0 20upx;
				width: 450upx;

				.bottom-text {
					display: flex;
					align-items: center;
					color: $text-color-1;
				}
			}

			.count {
				font-size: 22upx;
				color: #ADADAD;
				.number {
					color: #ff7e00;
					padding: 0 10rpx;
				}
			}
			
			.exit {
				width: 40upx;
				height: 40upx;
			}
		}
		
		.userinfo-modal-container {
			height: 640upx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-around;
			padding: 40upx;
		
			.top {
				display: flex;
				flex-direction: column;
				align-items: center;
				line-height: 1.6;
		
				.avatar {
					width: 160rpx;
					height: 160rpx;
					border-radius: 50%;
				}
		
				.nickname {
					font-size: 36upx;
					font-weight: 600;
				}
		
				.badge-wrap {
					.badge {
						position: relative;
						width: 40upx;
						height: 40upx;
					}
		
					.level {
						color: #FFF;
						font-size: 26upx;
					}
		
					.text {
						margin-top: 15upx;
						height: 70%;
						font-size: 20upx;
						padding-left: 38upx;
						padding-right: 19upx;
						border-radius: 30upx;
						margin-left: -30upx;
						color: #FFF;
					}
		
					.text.i-1 {
						background: linear-gradient(to right, #FFF, #8d8f91);
					}
		
					.text.i-2 {
						background: linear-gradient(to right, #FFF, #234232);
					}
		
					.text.i-3 {
						background: linear-gradient(to right, #FFF, #860d3d);
					}
		
					.text.i-4 {
						background: linear-gradient(to right, #FFF, #b51688);
					}
		
					.text.i-5 {
						background: linear-gradient(to right, #FFF, #612f29);
					}
		
					.text.i-6 {
						background: linear-gradient(to right, #FFF, #730056);
					}
				}
			}
		
			.btn-list {
				width: 100%;
				justify-content: space-around;
		
				.btn-item {
					display: flex;
					flex-direction: column;
					align-items: center;
		
					.bg {
						background-color: #EEE;
						border-radius: 20upx;
						width: 100upx;
						height: 100upx;
		
						image {
							width: 60upx;
							height: 60upx;
						}
					}
		
					.text {
						margin-top: 10upx;
					}
				}
			}
		
			.content {
				line-height: 1.6;
			}
		
			.btn {
				font-size: 32upx;
				font-weight: 700;
				width: 300upx;
				height: 80upx;
			}
		
			.row {
				width: 100%;
				justify-content: space-around;
		
				.btn {
					width: 200upx;
				}
			}
		
			.send-input {
				position: relative;
		
				input {
					border: 1px solid #CCC;
					background-color: #EEE;
					border-radius: 60upx;
					text-align: center;
					width: 300upx;
					height: 80upx;
					font-size: 32upx;
					font-weight: 700;
				}
		
				image {
					position: absolute;
					width: 50upx;
					height: 50upx;
					right: 20upx;
					top: 50%;
					transform: translateY(-50%);
				}
			}
		}
	
		.confirm-modal-container {
			height: 100%;
			padding: 30upx;
			flex-direction: column;
			justify-content: center;
			color: #333;
			margin-top: -40upx;
			.title {
				margin-bottom: 40upx;
				font-size: 36rpx;
				font-weight: 600;
			}
			
			.input {
				margin: 40upx 0;
			}
		
			.buttom {
				margin: 30upx;
				width: 100%;
				display: flex;
				justify-content: flex-start;
				.left {
					// width: 200upx
				}
				.right {
					margin-left: auto;
					border-bottom:1px solid red
				}
			}
			.btn {
				margin: 0 auto;
				display: flex;
				justify-content: space-around;
				flex-direction: row;
			}
		
			input {
				margin: 10upx 0;
				background-color: #eee;
				border-radius: 60upx;
				height: 70upx;
				padding: 0 20upx;
				color: #333;
				text-align: center;
			}
		}
	}
</style>
