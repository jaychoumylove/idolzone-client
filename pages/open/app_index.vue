<template>
	<view class="open-container">
		<image class="img" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9F5nx0EtM4pSEaRosRsoObfRJc66X5F2qKf3F1Mayibkkqs7zQnNXZiaobM3RicvFP9KiaEqj0xGzShDA/0"
		 mode="aspectFill"></image>

		<image class="logo" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9F5nx0EtM4pSEaRosRsoObfzLic46sVLjKYV0QRrWlTcnPv62wZSueRyAhZnqon2kf2PrkoaScMtEg/0"
		 mode=""></image>

		<view class="login-btn-group">
			<!-- 微信 -->
			<view class="item" @tap="login">
				<image class="top" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9Equ3ngUPQiaWPxrVxZhgzk9dknaXFIzCvjqczKRMibonEkcG2zngtUElAlIn3AykEp18grIIf9t7MQ/0"
				 mode=""></image>
			</view>
			<!-- <view class="item">
				<image class="top" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FsWnev2aG6T492FpDr5HAaS3l78jeS2g8WLyB9k2q4qEMykcjwF8Nck2ic9XfSbJcNxsRXFlfjiacQ/0"
				 mode=""></image>
				
			</view>
			<view class="item">
				<image class="top" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9Equ3ngUPQiaWPxrVxZhgzk9vIiao9dsa8MD9JpFxQIkgpmSwq6hJDibI2ia1bUMsavCPefq3kFEiaX31Q/0"
				 mode=""></image>
			</view> -->
		</view>
		
		<view class='skip-btn' @tap="$app.goPage('/pages/open/open')">稍后再登录</view>

	</view>
</template>

<script>
	var timeId;
	export default {
		data() {
			return {

			};
		},
		onLoad() {
			// if (this.$app.getData('userInfo').nickname) {
			// 	this.login()
			// } 
		},

		methods: {
			login() {
				this.$app.setData('isLogin', true)
				this.$app.login(() => {
					uni.reLaunch({
						url: '/pages/open/open'
					})
				})
			}
		},
	}
</script>

<style lang="scss" scoped="">
	.open-container {
		height: 100%;
		position: relative;

		.img {
			width: 100%;
			height: 100%;
		}

		.logo {
			width: 338upx;
			height: 299upx;
			position: absolute;
			top: 20%;
			left: 50%;
			transform: translateX(-50%);
		}

		.login-btn-group {
			display: flex;
			position: absolute;
			bottom: 25%;
			left: 50%;
			transform: translateX(-50%);

			.item {
				margin: 20upx;
				display: flex;
				flex-direction: column;
				align-items: center;

				.top {
					width: 120upx;
					height: 120upx;
				}

				.bottom {
					width: 150upx;
				}
			}
		}
		
		.skip-btn {
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			color: #b3b3b3;
			bottom: 10%;
		}
	}
</style>
