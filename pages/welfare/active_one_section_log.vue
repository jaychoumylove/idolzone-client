<!-- 个人明细 -->
<template>
	<view class="log-container">
		<view class="item" v-for="(item,index) in logList" :key="index">
			<view class="left-content">
				<view class="num">{{count - index}}.</view>
				<view class="content ">
					<view class="top">{{item.desc}}</view>
					<view class="bottom">{{item.create_time}}</view>
				</view>
			</view>

			<view class="right-content">
				<view class="earn">
					<view class="right-item">
						<block v-if="item.item.reward.coin">
							<image src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTERgEQSHS0566j091KHGzhdQNKZpBKHPuWicKkHxXxNdSneZX4JLGn7BqQ/0"
							 mode="widthFix"></image>
							<view class="add-count add" v-if="item.item.reward.coin > 0">+{{item.item.reward.coin}}</view>
							<view class="add-count" v-else>{{item.item.reward.coin}}</view>
						</block>
						<block v-if="item.item.reward.flower">
							<image src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTERziauZWDgQPHRlOiac7NsMqj5Bbz1VfzicVr9BqhXgVmBmOA2AuE7ZnMbA/0"
							 mode="widthFix"></image>
							<view class="add-count add" v-if="item.item.reward.flower > 0">+{{item.item.reward.flower}}</view>
							<view class="add-count" v-else>{{item.item.reward.flower}}</view>
						</block>
						<block v-if="item.item.reward.stone">
							<image src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTERibO7VvqicUHiaSaSa5xyRcvuiaOibBLgTdh8Mh4csFEWRCbz3VIQw1VKMCQ/0"
							 mode="widthFix"></image>
							<view class="add-count add" v-if="item.item.reward.stone > 0">+{{item.item.reward.stone}}</view>
							<view class="add-count" v-else>{{item.item.reward.stone}}</view>
						</block>
						<block v-if="item.item.reward.panacea">
							<image src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9Fic6VmPQYib2ktqATmSxJmUtVH7OoNPjuMs2xwl26pXQGbQn74vvibp5mUNuJk7ucxzdXGAd8OlHJDA/0"
							 mode="widthFix"></image>
							<view class="add-count add" v-if="item.item.reward.panacea > 0">+{{item.item.reward.panacea}}</view>
							<view class="add-count" v-else>{{item.item.reward.panacea}}</view>
						</block>
						<block v-if="item.item.reward.trumpet">
							<image src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9Equ3ngUPQiaWPxrVxZhgzk90Xa3b43zE46M8IkUvFyMR5GgfJN52icBqoicfKWfAJS8QXog0PZtgdEQ/0"
							 mode="widthFix"></image>
							<view class="add-count add" v-if="item.item.reward.trumpet > 0">+{{item.item.reward.trumpet}}</view>
							<view class="add-count" v-else>{{item.item.reward.trumpet}}</view>
						</block>
						<block v-if="item.item.image_s">
							<image :src="item.item.image_s" mode="widthFix"></image>
							<view class="add-count add">+1</view>
						</block>
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
				count: 0,
			};
		},
		onLoad() {
			this.getLog()
		},
		onReachBottom() {
			if (this.end) return;
			this.page++
			this.getLog()
		},
		methods: {
			getLog() {
				if (this.end) return;
				this.$app.request(this.$app.API.YINGYUAN_LOG, {
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
