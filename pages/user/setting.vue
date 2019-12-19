<template>
	<view class="user-page-container">
		<view class="item-wrap" v-if="$app.getData('userStar').id" @tap="modal='exit'">
			<view class="left-wrap">
				<image class="icon" src="https://mmbiz.qpic.cn/mmbiz_png/h9gCibVJa7JWwlVcSNe42f7cdITecxbg4vgXqHL191U954COPpyUJZk3bVFibGKvBO6lw9qBP2iaJLsB1U01mLcug/0"
				 mode="aspectFill"></image>
				<view class="text">退圈</view>
			</view>
			<view class="right-wrap iconfont iconjiantou"></view>
		</view>
		<view class="item-wrap" v-if="$app.getData('userStar').captain == 1" @tap="$app.goPage('/pages/user/starinfo')">
			<view class="left-wrap">
				<image class="icon" src="https://mmbiz.qpic.cn/mmbiz_png/h9gCibVJa7JWwlVcSNe42f7cdITecxbg47fX2JOF6HY6huxj9aDAzrIUfq5OLOzgCxbNiaurzUNctGlKLRxS3oHw/0"
				 mode="aspectFill"></image>
				<view class="text">修改爱豆信息</view>
			</view>
			<view class="right-wrap iconfont iconjiantou"></view>
		</view>
		<view class="item-wrap" @tap="$app.goPage('/pages/user/headwear')">
			<view class="left-wrap">
				<image class="icon" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9ENOOBmxXTF9huYYxQSQ5K692icLDibHfqocDWbCfibbP9bgzcQCc8KBibB8uJVWdZdVliarpPHRRAmSfA/0"
				 mode="aspectFill"></image>
				<view class="text">头像挂饰</view>
			</view>
			<view class="right-wrap iconfont iconjiantou"></view>
		</view>
		<prompt v-if="modal=='exit'" title="退圈后等级、贡献、粉丝团、徽章(圈子相关数据)将清零。再次退圈需要90天之后才能操作" placeholder="输入你的ID确认退圈" @confirm="exitGroup"
		 @closeModal="modal=''">

		</prompt>
	</view>
</template>

<script>
	import badgeComponent from "@/components/badgeComponent.vue"
	import btnComponent from "@/components/btnComponent.vue"
	import modalComponent from "@/components/modalComponent.vue"
	import prompt from "@/components/zz-prompt/index.vue";
	export default {
		components: {
			badgeComponent,
			modalComponent,
			btnComponent,
			prompt
		},
		data() {
			return {
				requestCount: 0,

				userInfo: {},
				userCurrency: {},
				userStar: {},
				modal: '',
				rechargeList: [],
			};
		},
		onLoad() {},
		onShow() {},
		onShareAppMessage(e) {
			const shareType = e.target && e.target.dataset.share
			return this.$app.commonShareAppMessage(shareType)
		},
		methods: {
			exitGroup(val) {
				if (val != this.$app.getData('userInfo').id * 1234) {
					this.$app.toast('ID输入不正确')
					return
				}
				this.$app.request(this.$app.API.USER_EXIT, {}, res => {
					this.$app.toast('退出成功')
					this.modal = ''
					this.$app.setData('userStar', {}, true)
					this.userStar = {}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.user-page-container {
		.item-wrap {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin: 0 30upx;
			padding: 25upx 10upx;
			border-bottom: 2upx solid #EFEFEF;

			.left-wrap {
				font-size: 30upx;
				display: flex;
				align-items: center;

				.icon {
					width: 40upx;
					height: 40upx;
					margin-right: 10upx;
				}

				.text {
					display: flex;
					align-items: center;

					.tips {
						color: #999;
						margin: 0 20upx;
						font-size: 26upx;

						.highlight {
							color: #f5c815;
							font-weight: 700;
						}
					}
				}
			}

			.right-wrap {
				font-size: 22upx;
				color: #999;
			}
		}

	}
</style>
