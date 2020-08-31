<template>
	<view class="steal-list-container">
		<view class="steal-list">
			<view class="header">
				<view class="left">
					剩余偷取次数：<text class="number">{{stealLeftTimes}}</text>
					<view class="add flex-set">+</view>
				</view>
				<view class="right">
					偷取规则
				</view>
			</view>
			<view class="steal-item" v-for="(item, index) in list" :key="index">
				<!-- <view class="time">今天 12:34:23</view> -->
				<view class="info">
					<view class="left flex-set">
						<image :src="item.user.avatarurl || AVATAR"></image>
					</view>
					<view class="middle">
						<view class="name text-overflow">{{item.user.nickname || NICKNAME}}</view>
						<view class="log">带领取金豆数<text class="number">***</text></view>
					</view>
					<view class="right flex-set">
						<view class="steal-number">
							<image class="icon" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FctOFR9uh4qenFtU5NmMB5uWEQk2MTaRfxdveGhfFhS1G5dUIkwlT5fosfMaW0c9aQKy3mH3XAew/0"
							 mode="aspectFill"></image>
							<view class="number">X1000</view>
						</view>
						<btnComponent type="default">
							<view class="flex-set right-btn" @tap='steal(item.user.id,index)'>偷取</view>
						</btnComponent>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import modalComponent from '@/components/modalComponent.vue'
	import btnComponent from '@/components/btnComponent.vue'
	export default {
		components: {
			modalComponent,
			btnComponent,
		},
		data() {
			return {
				modal: '',
				list: [],
				refresh: false,
				stealLeftTimes: 0,
			};
		},
		onShow() {
			this.getStealList();
		},
		methods: {
			getStealList () {
				this.$app.request(this.$app.API.ANIMAL_STEAL_LIST, {}, res => {
					const { list, steal_left_times } =  res.data;
					this.list = list;
					this.stealLeftTimes = steal_left_times;
				})
			},
			steal(user_id, index) {
				if (!user_id) {
					return this.$app.toast('请选择偷取的人哦！')
				}
				
				uni.showLoading({
					mask:true,
					title:'正在偷取...'
				})
				this.$app.request(this.$app.API.ANIMAL_STEAL, {user_id}, res => {
					this.$app.toast('偷取成功');
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.steal-list-container {
		background-image: url("https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9HnqQXz07SO8rM1uzBoVhDxyrvoy2uibbD5myzWgH4hrQOgAjqiafI0gk1Ha5y5cVxdwKNSnKkL1TSw/0");
		background-position: center center;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		height: 100%;
		width: 100%;
		color: #653208;
		
		.steal-list {
			border-radius: 40rpx;
			background-color: rgba(245,245,245,1);
			padding: 20rpx;
			margin: 0 20rpx;
		
			.header {
				display: flex;
				margin-bottom: 20rpx;
				
				.left {
					display: flex;
					margin-left: 20rpx;
					.number {
						color: #FBCC3E;
					}
					.add {
						background-color: #FC6257;
						border-radius: 30rpx;
						color: white;
						width: 30rpx;
						height: 30rpx;
						margin-left: 10rpx;
					}
				}
				.right {
					margin-left: auto;
					margin-right: 20rpx;
					color: #FC6257;
					border-bottom: #FC6257 4rpx solid;
				}
			}
			.steal-item {
				margin-bottom: 20rpx;
		
				// .time {
				// 	font-size: 24rpx;
				// 	padding-left: 20rpx;
				// 	margin-bottom: 20rpx;
				// }
				.info {
					background-color: white;
					border-radius: 65rpx;
					height: 130rpx;
					display: flex;
					.left {
						margin: 0 15rpx;
						image {
							width: 100rpx;
							height: 100rpx;
							border-radius: 50rpx;
						}
					}
					.middle {
						display: flex;
						flex-direction: column;
						justify-content: center;
		
						.name {
							margin-bottom: 10rpx;
							font-size: 30rpx;
							font-weight: 500;
							max-width: 300rpx;
						}
						.log {
							color: #7D7D7D;
							font-size: 22rpx;
							.number {
								color: #FC6257;
							}
						}
					}
					.right {
						margin-left: auto;
						margin-right: 30rpx;
						flex-direction: column;
						.right-btn {
							padding: 5rpx 20rpx;
						}
						.steal-number {
							display: flex;
							margin-bottom: 10rpx;
							.icon {
								width: 32upx;
								height: 32upx;
								margin-right: 10rpx;
							}
							.number {
								
							}
						}
					}
				}
			}
		}
		
	}
</style>
