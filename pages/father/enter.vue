<template>
	<view class='help-container'>
		<image class="img" :src="info.user.avatarurl||$app.getData('AVATAR')" mode="aspectFill"></image>
		<view class='show-status'>{{info.user.nickname||$app.getData('NICKNAME')}}
			<image class="img-m" :src="`/static/image/user_level/lv${info.user_level}.png`" mode=""></image>
		</view>
		<view class="tips">{{info.father_open_msg}}</view>
		
		<view v-if="info.type==1" class='continue-btn' @tap="baishi(user_id, self_id)">拜TA为师</view>
		<view v-if="info.type==2" class='continue-btn' @tap="baishi(self_id, user_id)">招TA为徒</view>
		
		<view class='continue-btn disable' @tap="goBack">我再想想</view>
	</view>
</template>

<script>
	import modalComponent from '@/components/modalComponent.vue'
	import btnComponent from '@/components/btnComponent.vue'
	import listItemComponent from '@/components/listItemComponent.vue'
	export default {
		components: {
			modalComponent,
			btnComponent,
			listItemComponent
		},
		data() {
			return {
				self_id: this.$app.getData('userInfo').id,
				user_id: 0,
				info: {}
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
					url: '/pages/father/info'
				})
			},
			baishi(father_uid, son_uid) {
				this.$app.request('father/baishi', {
					father_uid,
					son_uid
				}, res => {
					this.$app.toast('操作成功！', 'success')
					setTimeout(() => {
						uni.reLaunch({
							url: '/pages/father/info'
						})
					}, 1500)
				}, 'POST', true)
			},
			loadData() {
				this.$app.request('father/info', {
					user_id: this.user_id
				}, res => {
					this.info = res.data
				})
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
	}

	.help-container .img {
		width: 160rpx;
		height: 160rpx;
		display: block;
		border-radius: 50%;
	}

	.show-status {
		width: 400rpx;
		text-align: center;
		line-height: 2;
		font-size: 40rpx;
		font-weight: 600;
		color: #666;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.tips {
		color: #999;
		max-width: 300upx;
		margin-bottom: 100upx;
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
