<template>
	<view class='help-container'>
		<image class="img" :src="info.avatar||$app.getData('AVATAR')" mode="aspectFill"></image>
		<view class='show-status'>
			<view  class="clubname">{{info.clubname}}</view>
			<view  class="starname">{{info.star.name}}</view>
		</view>
		
		<view class="tips">{{info.mem_count||0}}/{{info.allow_count||0}}人</view>
		
		<view class="fans-rank-wrap">
			<image class="avatar" v-for="(item,index) in info.users" :key="index" :src="item.user.avatarurl||$app.getData('AVATAR')"
			 mode="aspectFill"></image>
		</view>
		
		<view class='continue-btn' v-if="info.mem_count<info.allow_count"  @tap="join(info.id)">加入TA的家族</view>
		<view class='continue-btn disable' v-else>该家族已满员</view>
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
				info: {}
			};
		},
		onShareAppMessage(e) {
			const shareType = e.target && e.target.dataset.share
			return this.$app.commonShareAppMessage(shareType)
		},
		onLoad() {
			if(!this.$app.getData('userStar').id) {
				uni.reLaunch({
					url: '/pages/group/group'
				})
				return
			}
			this.user_id = this.$app.getData('query').referrer
			this.loadData()
		},
		onShow() {},
		methods: {
			goBack() {
				uni.reLaunch({
					url: '/pages/family/family_list'
				})
			},
			join(id) {
				this.$app.request('family/join', {
					id
				}, res => {
					this.$app.toast('加入成功', 'success')
					setTimeout(() => {
						uni.reLaunch({
							url: '/pages/family/family?fid='+this.info.id
						})
					}, 1000)
				}, 'POST', true)
			},
			loadData() {
				this.$app.request('family/enter', {
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
