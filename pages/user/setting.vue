<template>
	<view class="user-page-container">
		<view class="item-wrap" v-if="$app.getData('userStar').id&&!never" @tap="modal='exit'" @longpress="nerverOnce">
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
		<!-- #ifdef APP-PLUS -->
		<view class="item-wrap">
			<view class="left-wrap">
				<view class="text">版本号：{{$app.getData('widgetInfo').version}}</view>
			</view>
			<view class="right-wrap iconfont iconjiantou"></view>
		</view>
		<!-- #endif -->
		
		<modalComponent v-if="modal == 'exit'" type="center center-top" title="提示" @closeModal="modal=''">
			<view class="confirm-modal-container flex-set">
				<view class="title flex-set">退圈</view>
				<view class="desc flex-set">退圈后等级、贡献、粉丝团、徽章(圈子相关数据)将清零。再次退圈需要90天之后才能操作</view>
				<view class="input">
					<input type="number" @input="setConfrimId" placeholder="输入你的ID确认退圈" />
				</view>
				<view class="btn">
					<btnComponent type="" style="margin-right: 100upx;">
						<view class="flex-set btn-unlock" style="width: 140upx;height: 60upx;" @tap="modal=''">取消</view>
					</btnComponent>
					<btnComponent type="default">
						<view class="flex-set btn-unlock" style="width: 140upx;height: 60upx;" @tap="exitGroup">确认</view>
					</btnComponent>
				</view>
			</view>
		</modalComponent>
		
		<modalComponent v-if="modal == 'neverQuitOnce'" type="center center-top" title="提示" @closeModal="cancelNever">
			<view class="confirm-modal-container flex-set">
				<view class="title flex-set">{{commitOnce ? '确认': ''}}永不退圈</view>
				<view class="desc flex-set">{{commitOnce ? '确认': ''}}操作后,您再也无法退出当前圈子</view>
				<view class="input">
					<input type="number" v-if="!commitOnce" @input="setNeverOnce" placeholder="请输入你的ID" />
					<input type="number" v-if="commitOnce" @input="setNeverAgain" placeholder="请再次输入你的ID" />
				</view>
				<view class="btn">
					<btnComponent type="" style="margin-right: 100upx;">
						<view class="flex-set btn-unlock" style="width: 140upx;height: 60upx;" @tap="cancelNever">取消</view>
					</btnComponent>
					<btnComponent type="default">
						<view class="flex-set btn-unlock" style="width: 140upx;height: 60upx;" @tap="commitOnce ? nerverQuit():nerverAgain()">确认</view>
					</btnComponent>
				</view>
			</view>
		</modalComponent>
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
				never: false,
				neverOnceVal: '',
				commitOnce: false,
				neverAgainVal: '',
				rechargeList: [],
				confrimId: '',
			};
		},
		onLoad() {},
		onShow() {
			const now = Math.round(Date.now() / 1000);
			const neverTime = this.$app.getData('userExt').exit_group_time
			if (now < neverTime) {
				this.never = true;
			}
		},
		onShareAppMessage(e) {
			const shareType = e.target && e.target.dataset.share
			return this.$app.commonShareAppMessage(shareType)
		},
		methods: {
			nerverOnce() {
				this.modal= 'neverQuitOnce'
			},
			cancelNever() {
				this.modal = '';
				this.neverOnceVal = '';
				this.neverAgainVal = '';
			},
			setNever (e) {
				if (this.commitOnce) {
					this.neverAgainVal = e.target.value;
				} else {
					this.neverOnceVal = e.target.value;
				}
			},
			setNeverOnce(e) {
				this.neverOnceVal = e.target.value;
			},
			setNeverAgain(e) {
				this.neverAgainVal = e.target.value;
			},
			setConfrimId(e) {
				this.confrimId = e.target.value;
			},
			nerverAgain() {
				if (this.neverOnceVal != this.$app.getData('userInfo').id * 1234) {
					this.$app.toast('ID输入不正确')
					return;
				}
				this.commitOnce = true;
				// this.modal = 'neverQuitAgain';
			},
			nerverQuit() {
				if (this.neverAgainVal != this.$app.getData('userInfo').id * 1234) {
					this.$app.toast('ID输入不正确')
					return;
				}
				uni.showLoading({
					mask:true,
					title:'请稍后...'
				})
				this.$app.request(this.$app.API.USER_NERVER_QUIT, {}, res => {
					this.$app.toast('设置成功','success')
					this.modal = ''
					this.never = true;
					const userExt = this.$app.getData('userExt');
					userExt.exit_group_time = 2147483647;
					this.$app.setData('userExt', userExt);
				})
			},
			exitGroup() {
				if (this.confrimId != this.$app.getData('userInfo').id * 1234) {
					this.$app.toast('ID输入不正确')
					return
				}
				uni.showLoading({
					mask:true,
					title:'请稍后...'
				})
				this.$app.request(this.$app.API.USER_EXIT, {}, res => {
					this.$app.toast('退出成功', 'success')
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

		.confirm-modal-container {
			height: 100%;
			padding: 30upx;
			flex-direction: column;
			justify-content: center;
			color: #333;
			margin-top: -40upx;
			.title {
				margin-bottom: 40upx;
				font-size: 36rpx;
				font-weight: 600;
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
				margin: 0 auto;
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
</style>
