<template>
	<view class="star-container">
		<guildComponent ref="guildComponent"></guildComponent>
		<!-- #ifdef MP -->
		<button open-type="getUserInfo" @getuserinfo="getUserInfo">
		<!-- #endif -->
		<!-- #ifndef MP -->
		<button open-type="getUserInfo" @tap="getUserInfo">
		<!-- #endif -->
		
		<!-- <button open-type="getUserInfo" @getuserinfo="getUserInfo"> -->
			<view v-if="tips" class="tips-container">
				<image src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTERenSrzKEkAp9n21IPHed1tVsOl379qcR2nARISo0xjicBPNmQgohh7aw/0"
				 mode="widthFix"></image>
			</view>
		</button>
	</view>
</template>

<script>
	import guildComponent from '@/components/guildComponent.vue'
	export default {
		components: {
			guildComponent,
		},
		data() {
			return {
				tips: false,
			};
		},
		onShareAppMessage() {
			return this.$app.commonShareAppMessage()
		},
		onLoad(option) {
			this.starid = option.starid
			if (this.starid == this.$app.getData('userStar').id) {
				this.$app.goPage('/pages/group/group')
			}
		},
		onReady() {},
		onShow() {
			if (!this.$app.getData('userStar').id) this.tips = true
			this.$nextTick(function() {
				this.$refs.guildComponent.load && this.$refs.guildComponent.load(this.starid)
			})
		},
		onUnload() {
			this.$refs.guildComponent.unLoad && this.$refs.guildComponent.unLoad(this.starid)
			this.$refs.guildComponent.modal = ''
		},

		methods: {
			getUserInfo(e) {
				this.tips = false
				const userInfo = e.detail.userInfo
				if (userInfo) {
					if (!this.$app.getData('userInfo').nickname && ~this.$app.getData('platform').indexOf('MP')) {

						this.$app.request(this.$app.API.USER_SAVEINFO, {
							iv: e.detail.iv,
							encryptedData: e.detail.encryptedData,
						}, res => {
							if (res.data.userInfo.id != this.$app.getData('userInfo').id) {
								// 同步其他平台账号数据
								this.$app.token = null
								this.$app.request('page/app', {}, res => {
									this.$app.setData('userCurrency', res.data.userCurrency)
									this.$app.setData('userStar', res.data.userStar)
									this.$app.setData('userExt', res.data.userExt)

									uni.showModal({
										title: '提示',
										content: '已同步其他平台账号数据',
										showCancel: false,
										success: r => {
											if (r.confirm) {
												if (res.data.userStar.id) {
													this.$app.goPage('/pages/group/group')
												} else {
													this.$refs.guildComponent.load(this.starid)
												}
											}
										},
									});
								})
							}

							this.$app.setData('userInfo', res.data.userInfo)
						}, 'POST', true)
					}
				}

			}
		}
	}
</script>

<style lang="scss" scoped>
	.star-container {
		position: relative;
		height: 100%;

		.tips-container {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background: rgba(#000, 0.8);
			z-index: 6;
			margin-top: -130upx;

			image {
				width: 100%;
				margin-top: 100upx;
			}
		}
	}
</style>
