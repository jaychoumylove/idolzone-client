<!-- 个人明细 -->
<template>
	<view class="log-container">
		<block v-if="logList.length>0">
			<view class="item" v-for="(item,index) in logList" :key="index">
				<view class="left-content">
					<view class="content ">
						<view class="top">{{item.content}}</view>
						<view class="bottom">{{item.create_time}}</view>
					</view>
				</view>

				<view class="right-content">
					<view class="earn">
						<view class="right-item" v-if="item.blessing_num">
							<image src="/static/image/activity/lucky_bag.png" mode="widthFix"></image>
							<view class="add-count">{{item.blessing_num}}</view>
						</view>
						<view class="right-item" v-if="item.lucky_value">
							<image src="/static/image/activity/lucky_value.png" mode="widthFix"></image>
							<view class="add-count">{{item.lucky_value}}</view>
						</view>

					</view>
				</view>
			</view>
		</block>
		<block v-else>
			<view class="item" style="justify-content: center;">
				暂无任何领取记录
			</view>
		</block>

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
				this.$app.request(this.$app.API.ACTIVE_LOG_BLESSING_BAG, {
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
