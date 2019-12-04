<template>
	<view class="container">
		<!-- 顶部用户头像 -->
		<view class="avatar-wrap flex-set">
			<view class="avatar-block">
				<image class="avatar" :src="$app.getData('userInfo').avatarurl||this.AVATAR"></image>
				<image class="headwear position-set" v-if="curHeadwear.img" :src="curHeadwear.img"></image>
			</view>
			<view>{{$app.getData('userInfo').nickname}}</view>
		</view>

		<view class="tips flex-set">点击可预览效果</view>

		<view class="list-wrap">
			<view class="item" v-for="(item, index) in list" :key="index">
				<view class="top-wrap flex-set" :class="{use:curHeadwear.id==item.id}" @tap="preHead" :data-cur="item">
					<image class="icon" :src="item.img"></image>
					<!-- <image v-if="curHeadwear.id==item.id" src="/image/icon/card-c.png" class="badge"></image> -->
				</view>
				<view class="fee">{{item.diamond}}钻石</view>
				<view v-if="item.status==-1" class="btn flex-set" @tap="buy" :data-hid="item.id">兑换</view>
				<view v-if="item.status==0" class="btn flex-set success" @tap="use" :data-hid="item.id">佩戴</view>
				<view v-if="item.status==1" class="btn flex-set disable" @tap="cancel" :data-hid="item.id">摘下</view>
			</view>

		</view>
	</view>
</template>

<script>
	import badgeComponent from "@/components/badgeComponent.vue"
	import btnComponent from "@/components/btnComponent.vue"
	import modalComponent from "@/components/modalComponent.vue"
	export default {
		components: {
			badgeComponent,
			modalComponent,
			btnComponent
		},
		data() {
			return {
				list: [],
				curHeadwear: {} // 预览的头饰
			};
		},
		onLoad() {
			this.loadData()
		},
		onShow() {

		},
		onShareAppMessage(e) {
			const shareType = e.target && e.target.dataset.share
			return this.$app.commonShareAppMessage(shareType)
		},
		methods: {
			// 预览头饰
			preHead(e) {
				this.curHeadwear = e.currentTarget.dataset.cur
			},
			// 购买头饰
			buy(e) {
				wx.showModal({
					title: '提示',
					content: '是否兑换？',
					success: res => {
						if (res.confirm) {
							this.$app.request('headwear/buy', {
								hid: e.currentTarget.dataset.hid
							}, (res) => {
								this.$app.toast(res.msg)
								this.loadData()
							}, 'POST', true)
						}
					}
				})
			},
			use(e) {
				this.$app.request('headwear/use', {
					hid: e.currentTarget.dataset.hid
				}, (res) => {
					this.$app.toast(res.msg)
					this.loadData()
				}, 'POST', true)
			},
			cancel(e) {
				this.$app.request('headwear/cancel', {}, (res) => {
					this.$app.toast(res.msg)
					this.loadData()
				}, 'POST', true)
			},
			loadData() {
				this.$app.request('headwear/select', {}, res => {

					this.list = res.data.list
					this.curHeadwear = res.data.cur || null
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		display: flex;
		flex-direction: column;
		height: 100%;

		.avatar-wrap {
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 20upx;
			position: relative;
		}

		.avatar-wrap .avatar-block {
			margin: 20upx;
			width: 120upx;
			height: 120upx;
			position: relative;
		}

		.avatar-wrap .avatar {
			width: 100%;
			height: 100%;
			border-radius: 50%;
		}

		.avatar-wrap .headwear {
			width: 180upx;
			height: 180upx;
		}

		.tips {
			height: 80upx;
			font-size: 24upx;
			background-color: #fef8d4;
		}

		.list-wrap {
			flex: 1;
			overflow-y: scroll;
			overflow-x: hidden;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
		}

		.list-wrap .item {
			font-size: 24upx;
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 250upx;
			border-right: 1px solid #eee;
			border-bottom: 1px solid #eee;
			margin-right: -1px;
			margin-bottom: -1px;
		}

		.list-wrap .item .top-wrap {
			height: 180upx;
			margin-top: 10upx;
			margin-bottom: 10upx;
			width: 230upx;
			background-color: #fafafa;
			position: relative;
		}

		.list-wrap .item .top-wrap.use {
			background-color: #e6f8fc;
		}

		.list-wrap .item .top-wrap .badge {
			width: 30upx;
			height: 30upx;
			position: absolute;
			right: 10upx;
			top: 10upx;
		}



		.list-wrap .item .top-wrap .icon {
			width: 120upx;
			height: 120upx;
		}

		.list-wrap .item .btn {
			border-radius: 50upx;
			background-color: #fd523e;
			color: #FFF;
			width: 150upx;
			height: 50upx;
			margin: 10upx;

		}

		.list-wrap .item .btn.success {
			background-color: #17b6f0;
		}

		.list-wrap .item .btn.disable {
			background-color: #999;
		}
	}
</style>
