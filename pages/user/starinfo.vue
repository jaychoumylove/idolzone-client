<template>
	<view class="starinfo-page-container">

		<view class='title'>爱豆信息直接修改（无需审核），每次修改一项<br>图片尺寸务必按要求提交<br>提交之前请征求大多数粉丝的意见<br>恶意提交图片经粉丝举报，将撤销领袖粉</view>
		<view class='item' @tap='chooseImg("head_img_s", "头像")'>
			<view class='left'>头像</view>
			<image class='right avatar' mode="aspectFill" :src="starInfo.head_img_s" />
			<view class='tips'>建议尺寸：120x120，大小10KB以下</view>
		</view>
		<view class='item' @tap='chooseImg("open_img", "开屏图")'>
			<view class='left'>开屏图</view>
			<image class='right open-img' :src="starInfo.open_img" mode="aspectFill" />
			<view class='tips'>建议尺寸：750x1450，大小1M以下</view>
		</view>
		<view class='item' @tap='chooseImg("share_img", "分享海报")'>
			<view class='left'>分享海报</view>
			<image class='right share-img' mode="aspectFill" :src="starInfo.share_img" />
			<view class='tips'>建议尺寸：500x400，大小300KB以下</view>
		</view>
		<view class='item' @tap='chooseImg("head_img_l", "首页banner")'>
			<view class='left'>首页banner</view>
			<image class='right index-banner' mode="aspectFill" :src="starInfo.head_img_l" />
			<view class='tips'>建议尺寸：690x250，大小300KB以下</view>
		</view>
		
		<view class="btn-wrap flex-set" v-if="targetText" @tap="submit">
			<btnComponent type="default">
				<view class="btn-inner">修改{{targetText}}</view>
			</btnComponent>
		</view>
		<!-- 模态框 -->
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
			this.postData = {}
			return {
				starInfo: this.$app.getData('userStar'),
				targetText: '',
			};
		},
		onLoad() {},
		onShow() {
		},
		onShareAppMessage(e) {
			const shareType = e.target && e.target.dataset.share
			return this.$app.commonShareAppMessage(shareType)
		},
		methods: {
			submit() {
				this.$app.request('star/editimg', this.postData, res => {
					if(res.code) this.$app.toast('修改失败', 'none')
					else{	
						this.$app.setData('userStar', res.data.userStar)
						this.$app.toast('修改成功', 'success')
					}
					
				}, 'POST', true)
			},
			chooseImg(field, targetText) {
				uni.chooseImage({
					count: 1,
					success: res => {
						let maxsize = 1048576
						let maxsize_name = '1M'
						if(field=='head_img_s'){
							maxsize = 10240
							maxsize_name = '10KB'
						}
						else if(field=='share_img'||field=='head_img_l'){
							maxsize = 309600
							maxsize_name = '300KB'
						}
						let img = res.tempFiles[0]
						if (img.size > maxsize) {
							this.$app.toast('图片过大，请上传'+maxsize_name+'以下的图片')
						} else {
							this.$app.upload(img.path, res => {
								this.$set(this.starInfo, field, res[0])
								this.targetText = targetText
								
								this.postData.key = field
								this.postData.value = res[0]
							})
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.starinfo-page-container {

		.title {
			background-color: #FCF2F1;
			padding: 30upx;
			font-size: 30upx;
			color: #686868;
		}

		.item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20upx;
			margin: 0 20upx;
			border-bottom: 1px solid #eee;
			min-height: 120upx;
			position: relative;

			.right {
				box-shadow: 0 2upx 8upx rgba(#666, .3);
			}

			.tips {
				position: absolute;
				bottom: 16upx;
				font-size: 20upx;
				color: #bbb;
				width: 400upx;
			}

			.avatar {
				width: 120upx;
				height: 120upx;
				border-radius: 50%;
			}

			.open-img {
				width: 180upx;
				height: 348upx;
			}

			.share-img {
				width: 250upx;
				height: 200upx;
			}

			.index-banner {
				width: 345upx;
				height: 125upx;
			}
		}


		.btn-wrap {
			margin: 40upx auto 80upx;

			.btn-inner {
				padding: 10upx 40upx;
				font-size: 32upx;
			}
		}

	}
</style>
