<template>
	<view class='help-container'>
		<image class="img" :src="info.avatarurl||$app.getData('AVATAR')" mode="aspectFill"></image>
		<!-- <view class='show-status'>
			<view  class="clubname">{{info.nikename}}</view>
			<view  class="starname">{{info.star.name}}</view>
		</view> -->
		
		<view class="tips">来自{{info.nickname}}的庄园好友申请</view>
		
		<view class='continue-btn'  @tap="apply">同意添加</view>
		<view class='continue-btn disable' @tap="goBack">我再想想</view>
		
		<view class="content">
			<view class="title">说明</view>
			<view class="p">每当你召唤一次宠物，就会有一个碎片进入你的宝箱，好友可以抽取你宝箱内的宠物碎片。</view>
			<view class="p">同意添加好友后。对方可以抽取你宝箱内的十二生肖宠物碎片。</view>
		</view>
		
		<modalComponent v-if="modal == 'apply'" type="center" title="提示" @closeModal="cancelNever">
			<view class="confirm-modal-container flex-set">
				<view class="title flex-set">提示</view>
				<view class="desc flex-set">
					是否添加
					<image class="img" :src="info.avatarurl||$app.getData('AVATAR')" mode="aspectFill"></image>
					<text style="color: #fbb225; padding-right: 10rpx;">{{info.nickname}}</text>
					&nbsp;为好友
				</view>
				<view class="desc flex-set">让好友抽取你宝箱中的宠物碎片</view>
				<view class="btn">
					<btnComponent type="" style="margin-right: 100upx;">
						<view class="flex-set btn-unlock" style="width: 140upx;height: 60upx;" @tap="modal=''">取消</view>
					</btnComponent>
					<btnComponent type="default">
						<view class="flex-set btn-unlock" style="width: 140upx;height: 60upx;" @tap="applyAction">确认</view>
					</btnComponent>
				</view>
			</view>
		</modalComponent>
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
				info: {},
				modal: ""
			};
		},
		onShareAppMessage(e) {
			const shareType = e.target && e.target.dataset.share
			return this.$app.commonShareAppMessage(shareType)
		},
		onLoad() {
			this.user_id = this.$app.getData('query').referrer
			this.loadData()
		},
		onShow() {},
		methods: {
			goBack() {
				uni.reLaunch({
					url: '/pages/index/index'
				})
			},
			apply() {
				this.modal = 'apply';
			},
			applyAction() {
				this.$app.request('manor/add_friend', {
					friend: this.info.id
				}, res => {
					this.$app.toast('添加成功', 'success')
					uni.navigateTo({
						url:'/pages/manor/manor'
					})
				}, 'POST', true)
			},
			loadData() {
				this.$app.request('user/info', {
					user_id: this.user_id
				}, res => {
					this.info = res.data;
				}, 'POST', true)
			}

		}
	}
</script>

<style lang="scss" scoped>
	.help-container {
		width: 100%;
		padding-top: 175rpx;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		
		.confirm-modal-container {
			height: 100%;
			padding: 30upx;
			flex-direction: column;
			justify-content: center;
			color: #333;
			margin-top: -40upx;
			.title {
				margin-bottom: 10upx;
				font-size: 36rpx;
				font-weight: 600;
			}
			
			.desc {
				margin: 20rpx 0;
				image {
					width: 60rpx;
					height: 60rpx;
					margin: 0 10rpx;
				}
			}
			
			.input {
				margin: 40upx 0;
			}
		
			.buttom {
				margin: 30upx;
				width: 100%;
				display: flex;
				justify-content: flex-start;
				.left {
					// width: 200upx
				}
				.right {
					margin-left: auto;
					border-bottom:1px solid red
				}
			}
			.btn {
				margin: 40rpx auto;
				display: flex;
				justify-content: space-around;
				flex-direction: row;
			}
		
			input {
				margin: 10upx 0;
				background-color: #eee;
				border-radius: 60upx;
				height: 70upx;
				padding: 0 20upx;
				color: #333;
				text-align: center;
			}
		}
	}

	.help-container .img {
		width: 160rpx;
		height: 160rpx;
		display: block;
		border-radius: 50%;
	}
	
	.content {
		margin: 20rpx;
		padding: 20rpx;
		font-size: 24rpx;
		border: 1rpx #666 dashed;
		border-radius: 40rpx;
		.title {
			text-align: center;
			font-size: 30upx;
			font-weight: 650;
			padding-bottom: 12upx;
		}
	}

	.show-status {
		display: flex;
		align-items: center;
		
		.clubname {
			font-weight: 700;
			font-size: 30upx;
		}
		
		.starname {
			background: linear-gradient(#ff7e00, #fccd9f);
			color: #fff;
			padding: 0 12rpx;
			border-radius: 12rpx;
			font-size: 20rpx;
			box-shadow: 0 0 1px rgba(0, 0, 0, .3);
			line-height: 34rpx;
			margin: 0 5rpx;
			white-space: nowrap;
		}
	}
	
	.fans-rank-wrap {
		height: 100upx;
		display: flex;
	
		.avatar {
			width: 50upx;
			height: 50upx;
			border-radius: 50%;
			margin-left: -10upx;
		}
	}
	
	.tips {
		margin-top: 20rpx;
		color: #999;
	}

	.msg {
		width: 100%;
		height: 110rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #ff9600;
		line-height: 38rpx;
		font-size: 28rpx;
		text-align: center;
	}

	.continue {
		width: 100%;
		line-height: 50rpx;
		font-size: 30rpx;
		color: #9f9b9f;
		text-align: center;
	}

	.continue-btn {
		width: 450rpx;
		height: 90rpx;
		margin: 20rpx auto;
		background-color: #ffba00;
		font-size: 37rpx;
		line-height: 90rpx;
		border-radius: 45rpx;
		text-align: center;
		color: #6c3800;
		font-weight: bold;
	}
	
	.continue-btn.disable {
		background-color: #dfdfdf;
	}

	.bottom-btn {
		width: 250rpx;
		position: fixed;
		bottom: 80rpx;
		left: 250rpx;
		text-align: center;
		text-decoration: underline;
		color: #fff;
		font-size: 28rpx;
	}
</style>
