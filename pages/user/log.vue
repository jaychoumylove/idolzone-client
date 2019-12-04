<!-- 个人明细 -->
<template>
	<view class="log-container">
		<view class="item" v-for="(item,index) in logList" :key="index">
			<view class="left-content">
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
						<image src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9Equ3ngUPQiaWPxrVxZhgzk90Xa3b43zE46M8IkUvFyMR5GgfJN52icBqoicfKWfAJS8QXog0PZtgdEQ/0" mode="widthFix"></image>
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
			};
		},
		onLoad() {
			this.getLog()
		},
		onReachBottom() {
			this.page++
			this.getLog()
		},
		methods: {
			getLog() {
				this.$app.request(this.$app.API.LOG, {
					page: this.page
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

		.item {
			margin: 20upx;
			background-color: rgba(#FFF, 0.3);
			display: flex;
			padding: 20upx 40upx;
			justify-content: space-between;
			align-items: center;
			border-bottom: 2upx solid #efefef;

			.left-content {
				display: flex;

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
