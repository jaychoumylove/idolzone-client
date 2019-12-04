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
						<text class="num">{{earn.coin||0}}</text>
					</view>
					<view class="text">金豆</view>
				</view>
				<view class="item-wrap">
					<view class="count flex-set">
						<image class="icon" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTERziauZWDgQPHRlOiac7NsMqj5Bbz1VfzicVr9BqhXgVmBmOA2AuE7ZnMbA/0"
						 mode="aspectFill"></image>
						<text class="num">{{earn.flower||0}}</text>
					</view>
					<view class="text">鲜花</view>
				</view>
				<view class="item-wrap">
					<view class="count flex-set">
						<image class="icon" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTERibO7VvqicUHiaSaSa5xyRcvuiaOibBLgTdh8Mh4csFEWRCbz3VIQw1VKMCQ/0"
						 mode="aspectFill"></image>
						<text class="num">{{earn.stone||0}}</text>
					</view>
					<view class="text">钻石</view>
				</view>
			</view>
		</view>

		<view class="item" v-for="(item,index) in logList" :key="index">
			<view class="left-content">
				<view class="num">{{earn.times-index}}.</view>
				<view class="content ">
					<view class="top">{{item.content}}</view>
					<view class="bottom">{{item.create_time}}</view>
				</view>
			</view>

			<view class="right-content">
				<view class="earn">
					<view class="right-item" v-if="item.coin">
						<image src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTERgEQSHS0566j091KHGzhdQNKZpBKHPuWicKkHxXxNdSneZX4JLGn7BqQ/0"
						 mode="widthFix"></image>
						<view class="add-count add" v-if="item.coin > 0">+{{item.coin}}</view>
						<view class="add-count" v-else>{{item.coin}}</view>
					</view>
					<view class="right-item" v-if="item.flower">
						<image src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTERziauZWDgQPHRlOiac7NsMqj5Bbz1VfzicVr9BqhXgVmBmOA2AuE7ZnMbA/0"
						 mode="widthFix"></image>
						<view class="add-count add" v-if="item.flower > 0">+{{item.flower}}</view>
						<view class="add-count" v-else>{{item.flower}}</view>
					</view>
					<view class="right-item" v-if="item.stone">
						<image src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTERibO7VvqicUHiaSaSa5xyRcvuiaOibBLgTdh8Mh4csFEWRCbz3VIQw1VKMCQ/0"
						 mode="widthFix"></image>
						<view class="add-count add" v-if="item.stone > 0">+{{item.stone}}</view>
						<view class="add-count" v-else>{{item.stone}}</view>
					</view>
					<view class="right-item" v-if="item.trumpet">
						<image src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9Equ3ngUPQiaWPxrVxZhgzk90Xa3b43zE46M8IkUvFyMR5GgfJN52icBqoicfKWfAJS8QXog0PZtgdEQ/0"
						 mode="widthFix"></image>
						<view class="add-count add" v-if="item.trumpet > 0">+{{item.trumpet}}</view>
						<view class="add-count" v-else>{{item.trumpet}}</view>
					</view>

				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			this.page = 1
			return {
				logList: [],
				earn: {}
			};
		},
		onLoad() {
			this.getEarn()
			this.getLog()
		},
		onReachBottom() {
			this.page++
			this.getLog()
		},
		methods: {
			getEarn() {
				this.$app.request('lottery/dayEarn', {}, res => {
					this.earn = res.data
				})
			},
			getLog() {
				this.$app.request('lottery/log', {
					page: this.page,
				}, res => {
					if (this.page == 1) {
						this.logList = res.data
					} else {
						this.logList = this.logList.concat(res.data)
					}
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
					padding: 20upx 40upx;
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

						image {
							width: 40upx;
						}

					}
				}

			}

		}
	}
</style>
