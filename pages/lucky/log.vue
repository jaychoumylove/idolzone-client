<!-- 个人明细 -->
<template>
	<view class="log-container">
		<view class="earn-wrap">
			<view class="title">今日收益</view>
			<view class="count-wrap">
				<view class="item-wrap">
					<view class="count flex-set">
						<image class="icon" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FctOFR9uh4qenFtU5NmMB5uWEQk2MTaRfxdveGhfFhS1G5dUIkwlT5fosfMaW0c9aQKy3mH3XAew/0"
						 mode="aspectFill"></image>
						<text class="num">{{$app.formatNumber(earn.coin||0)}}</text>
					</view>
					<view class="text">金豆</view>
				</view>
				<view class="item-wrap">
					<view class="count flex-set">
						<image class="icon" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTERziauZWDgQPHRlOiac7NsMqj5Bbz1VfzicVr9BqhXgVmBmOA2AuE7ZnMbA/0"
						 mode="aspectFill"></image>
						<text class="num">{{$app.formatNumber(earn.flower||0)}}</text>
					</view>
					<view class="text">鲜花</view>
				</view>
				<view class="item-wrap">
					<view class="count flex-set">
						<image class="icon" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9Fic6VmPQYib2ktqATmSxJmUtVH7OoNPjuMs2xwl26pXQGbQn74vvibp5mUNuJk7ucxzdXGAd8OlHJDA/0"
						 mode="aspectFill"></image>
						<text class="num">{{$app.formatNumber(earn.panacea || 0)}}</text>
					</view>
					<view class="text">灵丹</view>
				</view>
				<view class="item-wrap">
					<view class="count flex-set">
						<image class="icon" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GXvpB3e5ibvGiadFqIOl7vceee3ribmebyLp4YUkEa7my8VjaX641mQdlnTgrXCl0xWLSIicQMKicKb3Q/0"
						 mode="aspectFill"></image>
						<text class="num">{{$app.formatNumber(earn.scrap || 0)}}</text>
					</view>
					<view class="text">幸运碎片</view>
				</view>
			</view>
		</view>

		<view class="item" v-for="(item,index) in logList" :key="index">
			<view class="left-content">
				<view class="num">{{count - index}}.</view>
				<view class="content ">
					<view class="top" v-if="item.type == 'SINGLE'">{{item.item.number > 0 ? '获得': '失去'}}{{item.item.name}}</view>
					<view class="top" v-if="item.type == 'MULTIPLE'">{{$app.getData('config').recharge_lucky.draw_log.multiple}}</view>
					<view class="top" v-if="item.type == 'MULTIPLE_MORE'">{{item.title}}</view>
					<view class="top" v-if="item.type == 'EXCHANGE'">{{item.title}}</view>
					<view class="bottom">{{item.create_time}}</view>
				</view>
			</view>

			<view class="right-content">
				<view class="earn">
					<view class="right-item" v-if="item.type == 'SINGLE'">
						<image v-if="item.item.image" :src="item.item.image" mode="widthFix"></image>
						<view class="add-count add">{{item.item.number > 0 ? '+' : ''}}{{$app.formatNumber(item.item.number || 0)}}</view>
					</view>
					<view class="right-item" v-if="['MULTIPLE', 'MULTIPLE_MORE', 'EXCHANGE'].indexOf(item.type) > -1" v-for="(ite, ind) in item.item" :key="ind">
						<image v-if="ite.image" :src="ite.image" mode="widthFix"></image>
						<view class="add-count add">{{ite.number > 0 ? '+' : ''}}{{$app.formatNumber(ite.number || 0)}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				logList: [],
				size: 15,
				page: 1,
				end : false,
				earn: {},
				count: 0,
			};
		},
		onLoad() {
			this.getEarn()
			this.getLog()
		},
		onReachBottom() {
			if (this.end) return;
			this.page++
			this.getLog()
		},
		methods: {
			getEarn() {
				this.$app.request(this.$app.API.LUCKY_DRAW_DAY_EARN, {}, res => {
					this.earn = res.data
				})
			},
			getLog() {
				if (this.end) return;
				this.$app.request(this.$app.API.LUCKY_DRAW_LOG, {
					page: this.page,
					size: this.size
				}, res => {
					if (res.data.length < this.size) this.end = true;
					this.count = res.data.count;
					this.logList = this.page == 1 ? res.data.list : this.logList.concat(res.data.list);
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.log-container {
		height: 100%;
		padding-top: 184upx;

		.earn-wrap {
			position: fixed;
			width: 100%;
			background-color: #fff;
			top: 0;
			
			.title {
				text-align: center;
				font-size: 32upx;
				font-weight: 700;
				padding: 10upx;
			}

			.count-wrap {
				display: flex;
				justify-content: space-between;
				border-bottom: 2upx dashed #dadade;

				.item-wrap {
					flex: 1;
					padding: 20upx 0;
					text-align: center;

					.count {
						font-size: 26upx;

						.icon {
							width: 32upx;
							height: 32upx;
						}

						.num {
							padding-left: 10upx;
						}
					}

					.text {
						font-size: 24upx;
						color: #afafaf;
					}
				}
			}
		}

		.item {
			margin: 0 20upx;
			background-color: rgba(#FFF, 0.3);
			display: flex;
			padding: 20upx 40upx;
			justify-content: space-between;
			align-items: center;
			border-bottom: 2upx solid #efefef;

			.left-content {
				display: flex;
				align-items: center;
				
				.num {
					font-weight: 700;
					padding-right: 20upx;
				}

				.img {
					width: 80upx;
					height: 80upx;
					border-radius: 50%;
				}

				.content {
					.bottom {
						font-size: 24upx;
						color: #999;
					}
				}
			}

			.right-content {
				display: flex;

				.earn {
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					align-items: flex-start;

					.right-item {
						display: flex;
						align-items: center;
						&:not(:last-of-type) {
							margin-bottom: 10rpx;
						}
						image {
							width: 40upx;
							margin-right: 10rpx;
						}

					}
				}

			}

		}
	}
</style>
