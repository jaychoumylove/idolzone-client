<template>
	<view class="container">
		
		<!-- <view class="fans_text">本场粉丝贡献排名</view> -->
		
		<!-- 列表 -->
		<view class="list-container">
			<view class="item" v-for="(item,index) in fanclubUserRank" :key="index">
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
					<image v-if="item.user.headwear && item.user.headwear.img" class="headwear position-set" :src="item.user.headwear.img"
					 mode=""></image>
				</view>
				<view class="text-container">
					<view>
						{{item.user.nickname || NICKNAME}}
						<image class="img-s" :src="'/static/image/user_level/lv'+item.user.level+'.png'" mode=""></image>
					</view>
					<view class="round_count">
						<view>本场人气:</view>
						<view class="count">{{item.dragon_boat_festival_hot || 0}}</view>
						<image src='https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9F3NAxlopF2oyvfuiaEjgJItws1tcmzFFLo4WGc38l7kibxxk1atGAcjALuqvyvLib3icFPyAicbsOOl3g/0'></image>
					</view>
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
				<image v-if="myInfo.headwear && myInfo.headwear.img" class="headwear position-set" :src="myInfo.headwear.img"
				 mode=""></image>
			</view>
			<view class="text-container">
				<view>
					{{$app.getData('userInfo').nickname || NICKNAME}}
					<image class="img-s" :src="'/static/image/user_level/lv'+myInfo.level+'.png'" mode=""></image>
				</view>

			</view>
			<view class="round_count">
				<view>本场人气:</view>
				<view class="count">{{myInfo.dragon_boat_festival_hot || 0}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fanclubUserRank: [],
				page: 1,
				myInfo:'',
				active_info:[],
				active_id:0,
				AVATAR: this.$app.getData('AVATAR'),
				NICKNAME: this.$app.getData('NICKNAME'),
			};
		},
		onLoad(option) {
			if(!option.active_id){
				this.$app.toast('网络延时')
				this.goPage('/pages/active/dragon_boat_festival');
			}
			this.active_id=option.active_id;
			this.loadData()
		},
		onReachBottom() {
			this.page++;
			this.loadData()
		},
		methods: {
			goPage(url, val='') {
				this.$app.goPage(url + val);
			},
			loadData() {
				this.$app.request(this.$app.API.ACTIVE_DRAGON_BOAT_FESTIVAL_FANCLUB_USER, {
					page: this.page,
					active_id:this.active_id,
				}, res => {
					this.active_info = res.data.active_info;
					this.myInfo = res.data.myinfo
					
					if (this.page == 1) {
						this.fanclubUserRank = res.data.list
					} else {
						this.fanclubUserRank = this.fanclubUserRank.concat(res.data.list)
					}
				})
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
		
		.fans_text{
			width: 100%;
			font-size: 28rpx;
			padding: 15rpx 0;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #999999;
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
					width: 330upx;

					.bottom-text {
						display: flex;
						align-items: center;
						color: $text-color-1;
					}
				}
				.round_count{
					display: flex;
					flex-direction: row;
					font-size: 24rpx;
					color: #999999;
					.count {
						color: #ff8421;
					}
					image{
						width: 30upx;
						height: 30upx;
						vertical-align: middle;
						margin-left: 10rpx;
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
				margin: 0 20upx 0 20upx;
				width: 250upx;

				.bottom-text {
					display: flex;
					align-items: center;
					color: $text-color-1;
				}
			}

			.count {
				color: #ff8421;
			}
		}
	}
</style>
