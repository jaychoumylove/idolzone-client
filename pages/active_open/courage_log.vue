<!-- 获取勇气日志 -->
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
					<view class="right-item">
						<image :src="courage_img" mode="widthFix"></image>
						<view class="add-count" :class="{add: item.count > 0}">{{item.count > 0 ? '+': ''}}{{item.count}}</view>
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
				page: 1,
				size: 15,
				courage_img: 'https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9Exvr8ppbZ5VVuxbP7tSmU4nKUGxoYVA4KdJwS3Jud6MOXdooRdAEHYuqBeib1976IIGUOvTcO5OoQ/0',
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
				this.$app.request('activeopen/courage_log', {
					page: this.page,
					size: this.size
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
