<template>
	<view class="score-container">

		<view class="top-container">
			<view class="left-wrap">
				<view class="score-log-btn" @tap="goPage" data-page="/pages/task/scorelog">积分记录</view>
				<view>我的积分</view>
				<view class="score flex-set">{{myScore}}</view>
			</view>
			<view class="right-wrap">
				<view class="item flex-set" v-for="(item,index) in excharge" :key="index">
					<view class="left-block">
						<image class="icon" src="item.icon"></image>
						<view class="name">{{item.name}}</view>
					</view>
					<view class="btn excharge flex-set" v-if="item.status==0" @tap="excharge" data-id="item.id" data-score="item.score"
					 data-name="item.name">
						{{item.score}}
						<image class="icon" src="/image/icon/jifen.png"></image>兑换
					</view>
					<view v-else class="btn done excharge">没有库存了</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		onShow() {
			this.loadData()
		},
		methods: {
			loadData() {
				this.$app.request('ext/score', {}, res => {
					
				})
			}
		}
		
	}
</script>

<style lang="scss" scoped>
	.top-container {
		display: flex;
		align-items: center;
		margin: 20rpx;
		box-shadow: 0 0 10rpx rgba(100, 100, 100, .3) inset;
		padding: 20rpx;
		border: 2rpx solid #ff7e00;
		border-radius: 20rpx;
		position: relative;

		.left-wrap {
			flex: 1;
			text-align: center;

			.score-log-btn {
				position: absolute;
				left: 15rpx;
				top: 15rpx;
				font-size: 22rpx;
				text-decoration: underline;
			}
		}

		.right-wrap {
			font-size: 22rpx;
			display: flex;
			flex-direction: column;
			align-items: flex-start;

			.item {
				justify-content: space-between;
				width: 100%;
				margin: 5rpx;

				.left-block {
					flex: 1;
					display: flex;
					align-items: center;

					.icon {
						width: 30rpx;
						height: 30rpx;
					}
				}
				
				.btn {
					width: 110rpx;
					height: 25rpx;
					line-height: 25rpx;
					text-align: center;
					white-space: nowrap;
					
					.icon {
						width: 40rpx;
						height: 40rpx;
						padding: 0;
						margin: 0;
						background-color: transparent;
					}
				}
			}
		}
		
		.score {
			font-weight: 700;
			font-size: 48rpx;
			color: #ff7e00;
			
			.icon-t {
				width: 60rpx;
				height: 60rpx;
			}
		}
	}

</style>
