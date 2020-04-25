<template>
	<view class="new-page-container">
		<!-- <block v-for="(item,index) in article" :key="index">
			<view class="article-title" v-if="item.title">{{item.title}}</view>
			<text class="article-content" decode v-if="item.content.length>0" v-for="(item1,index1) in item.content" :key="index1">{{item1}}</text>
			<image class="article-image" v-if="item.image" :src="item.image" mode="widthFix"></image>
		</block> -->
		<!-- <view class="article-title">申请资料</view> -->

		<form class="form-container" @submit="formSubmit">
			<view class="input-group">
				<view class="img-input flex-set" @tap="uploadImg('avatar')">
					<image v-if="avatar" :src="avatar" mode="aspectFill"></image>
					<view v-else>+</view>
				</view>
				<view style="padding-top: 20upx;">建议尺寸：120x120，大小不超过30KB</view>
			</view>

			<view class="input-group">
				<input type="text" name="clubname" :value="clubname" placeholder="输入粉丝团名字不超过10个字" />
			</view>

			<view class="input-group">
				<input type="text" name="wx" placeholder="输入负责人微信号" />
			</view>

			<view class="input-group">
				<input type="text" disabled :value="`所属爱豆:`+$app.getData('userStar').name" />
			</view>

			<view class="input-group" style="padding-top: 80upx;">
				<button form-type="submit" style="width: 180upx;margin: auto;">
					<btnComponent type="default">
						<view class="flex-set" style="width: 180upx;height: 90upx;">{{fid?'修改':'创建'}}</view>
					</btnComponent>
				</button>
			</view>

		</form>

	</view>
</template>

<script>
	import btnComponent from '@/components/btnComponent.vue';

	export default {
		components: {
			btnComponent
		},
		data() {
			return {
				fid: 0,
				avatar: '',
				clubname: '',
				// article: this.$app.getData('config').fanclub_notice,
			};
		},
		onShareAppMessage(e) {
			const shareType = e.target && e.target.dataset.share
			return this.$app.commonShareAppMessage(shareType)
		},
		onLoad(option) {
			this.fid = option.fid // 如果带上fid，表示修改粉丝团
			if (this.fid) this.loadData()
		},
		methods: {
			formSubmit(e) {
				const value = e.detail.value
				value['avatar'] = this.avatar
				if (!value['avatar']) {
					this.$app.toast('请上传粉丝团头像')
					return
				}
				if (!value['clubname']) {
					this.$app.toast('请输入粉丝团名字')
					return
				}
				if(value['clubname'].length>10){
					this.$app.toast('粉丝团不能超过10个字')
					return
				}
				
				if (!value['wx']) {
					this.$app.toast('输入负责人微信号')
					return
				}

				if (this.fid) {
					this.$app.modal(`需要消耗100钻石,是否继续？`, () => {
						value.fid = this.fid
						this.$app.request('fans/edit', value, res => {
							this.$app.toast('修改成功')
							setTimeout(() => {
								uni.navigateBack()
							}, 500);
						}, 'POST', true)
					})
				} else {
					this.$app.request('fans/create', value, res => {
						this.$app.toast('创建成功')
						setTimeout(() => {
							uni.navigateBack()
						}, 500);
					}, 'POST', true)
				}
			},
			uploadImg(name) {
				uni.chooseImage({
					count: 1,
					success: res => {
						console.log(res)
						let img = res.tempFiles[0]
						if (img.size > 30720) {
							this.$app.toast('图片过大，请上传30KB以下的图片')
						} else {
							this.$app.upload(img.path, res => {
								this.avatar = res[0]
							})
						}

					}
				});
			},
			loadData() {
				this.$app.request('fans/info', {
					fid: this.fid
				}, res => {
					this.avatar = res.data.avatar
					this.clubname = res.data.clubname
				})
			},

		}
	}
</script>

<style lang="scss">
	.new-page-container {
		padding: 20upx 40upx;

		.tips {
			color: #888;
			padding: 10upx;
			font-size: 22upx;
		}

		.form-container {
			display: flex;
			flex-direction: column;

			.input-group {
				display: flex;
				flex-direction: column;
				align-items: center;
				margin: 60upx 20upx;

				.img-input {
					width: 180upx;
					height: 180upx;
					background-color: rgba(#eee, .6);
					font-size: 100upx;
					color: #cecece;
					border-radius: 50%;
					position: relative;
					z-index: 1;
					overflow: hidden;
					box-shadow: 0 2upx 8upx rgba(#999, .3);
				}

				input {
					height: 80upx;
					padding: 0 20upx;
					width: 100%;
					border-bottom: 2upx solid #eee;
				}
			}
		}
	}
</style>
