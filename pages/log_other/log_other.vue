<!-- 其他日志 -->
<template>
	<view class="log-container">
		<view class="item" v-for="(item,index) in logList" :key="index">
			<block v-if="type == 'active_open_courage_log' || type == 'birthday_open_help_log'">
				<view class="left-content">
					<view class="content ">
						<view class="top">{{item.content}}</view>
						<view class="bottom">{{item.create_time}}</view>
					</view>
				</view>

				<view class="right-content">
					<view class="earn">
						<view class="right-item">
							<image v-if="type == 'active_open_courage_log'" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9Exvr8ppbZ5VVuxbP7tSmU4nKUGxoYVA4KdJwS3Jud6MOXdooRdAEHYuqBeib1976IIGUOvTcO5OoQ/0"
							 mode="widthFix"></image>
							 <image v-if="type == 'birthday_open_help_log'" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9Hlt9tIaEI9nvsCuYic6ug9viajc7iaHKbG4oCM2QeD3l0ScEkotHcKiaW6H7t39VKthHH4AJ2kpFmnPA/0" mode="widthFix"></image>
							<view class="add-count" :class="{add: item.count > 0}">{{item.count > 0 ? '+': ''}}{{item.count}}</view>
						</view>
					</view>
				</view>
			</block>
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
				type: '',
			};
		},
		onLoad(option) {
			this.type = option.type ? option.type : this.type;
			this.getLog()
		},
		onReachBottom() {
			this.page++
			this.getLog()
		},
		methods: {
			getLog() {
				console.log(this.type)
				let url;
				if (this.type == 'active_open_courage_log') {
					url = 'activeopen/courage_log';
				} else if (this.type == 'birthday_open_help_log') {
					url = 'birthday_open/help_log';
				}
				this.getLogRequrst(url);
			},
			getLogRequrst(url) {
				this.$app.request(url, {
					page: this.page,
					size: this.size
				}, res => {
					if (this.page == 1) {
						this.logList = res.data
					} else {
						this.logList = this.logList.concat(res.data)
					}
				})
			}

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
