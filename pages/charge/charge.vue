<template>
	<view class="no-data" v-if="
	$app.getData('config').version == $app.getData('VERSION') || $app.chargeSwitch()!=0
	">
		由于政策原因，不支持在应用内购买
	</view>
	<view v-else class="charge-page-container">
		<view class="top-row flex-set">
			<view class="left-wrap flex-set">
				<image class="avatar" :src="userInfo.avatarurl" mode="aspectFill"></image>
				<view class="nickname">{{userInfo.nickname}}</view>
			</view>
			<view class="right-wrap flex-set" @tap="modal='proxyRecharge'">为好友充值</view>
		</view>

		<!-- 我的资产 -->
		<view class="currency-wrap flex-set">
			<view class="left-wrap flex-set">
				<view class="item">我的鲜花<text class="color flower">{{userCurrency.flower}}</text></view>
				<view class="item">我的钻石<text class="color stone">{{userCurrency.stone}}</text></view>
			</view>
		</view>

		<view class="tips-content">
			<view class="row" v-if="farm_distance">农场产量:<text>{{farm_coin}}</text>金豆/100秒,距离农场满级还差<text>{{farm_distance}}</text></view>
			<view class="row" v-if="userGap">粉丝等级:<text>Lv{{userLevel}}</text>距离下一级还差<text>{{userGap}}</text>人气</view>
		</view>

		<!-- 鲜花钻石充值 -->
		<view class="title-top" v-if="$app.getData('config').recharge_title">{{$app.getData('config').recharge_title}}</view>

		<view class="title flower">—— 购买鲜花 ——</view>
		<view class="tips">可提高爱豆人气与粉丝等级</view>

		<view class="list-container">
			<view class="item-wrap" v-if="item.flower" v-for="(item,index) in rechargeList" :key="index" @tap="payment(item.flower, 'flower')">
				<view class="badge" v-if="discount.text">{{discount.text}}</view>
				<!-- <view class="row top" v-if="discount.text">{{discount.text}}</view> -->
				<view class="row flower-count flex-set"><text class="num">{{$app.formatNumber(item.flower,1)}}</text>鲜花</view>

				<view class="row">
					<image src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9E7MFExyreICyFJqp5RoRBL1oVeg1YBz2QeHPIunT0CkpeGpUvc67X4uJbiaSEicXHJcLLLTJRdOiaaw/0"
					 mode="aspectFill"></image>
				</view>
				<view class="row btn">{{item.fee}}元</view>
			</view>
		</view>

		<view class="self-input-wrap">
			<input type="text" @input="selfInputFlower=$event.detail.value" placeholder="自定义鲜花(需大于10万)" class="input" />
			<view class="badge" v-if="discount.text">{{discount.text}}</view>
			
			<btnComponent type="default">
				<view class="btn flex-set" @tap="payment(selfInputFlower, 'flower')">确认购买</view>
			</btnComponent>
		</view>

		<view class="title stone">—— 购买钻石 ——</view>
		<view class="tips">可升级农场与狗狗技能</view>

		<view class="list-container">
			<view class="item-wrap" v-if="item.stone" v-for="(item,index) in rechargeList" :key="index" @tap="payment(item.stone, 'stone')">
				<view class="badge" v-if="discount.text">{{discount.text}}</view>
				<!-- <view class="row top" v-if="discount.text">{{discount.text}}</view> -->
				<view class="row flower-count flex-set"><text class="num stone">{{item.stone||0}}</text>钻石</view>
				<view class="row">
					<image src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9E7MFExyreICyFJqp5RoRBLkbLd15sXOSTiaL8IctOvWViaYBR9y8BKaMUazEmy6Am0BMqsXqsmJtaA/0"
					 mode="aspectFill"></image>
				</view>
				<view class="row btn">{{item.fee}}元</view>
			</view>
		</view>
		<view class="self-input-wrap">
			<input type="text" @input="selfInputStone=$event.detail.value" placeholder="自定义钻石(需大于10颗)" class="input" />
			<view class="badge" v-if="discount.text">{{discount.text}}</view>
			<btnComponent type="default">
				<view class="btn flex-set" @tap="payment(selfInputStone, 'stone')">确认购买</view>
			</btnComponent>
		</view>

		<!-- modal -->
		<!-- 代充值 -->
		<modalComponent v-if="modal == 'proxyRecharge'" title="代充值" @closeModal="modal=''">
			<view class="proxy-modal-container">
				<view class="top">
					<image class="avatar" :src="currentUser.avatarurl||$app.AVATAR" mode="scaleToFill"></image>
					<view class="nickname">{{currentUser.nickname}}</view>
				</view>

				<view class="send-input">
					<input type="number" confirm-type="search" @blur="kickBack()" @confirm="searchUser()" :value="currentUserid"
					 @input="currentUserid = $event.detail.value" placeholder="请输入对方的ID" />
				</view>
				<btnComponent type="default">
					<view class="btn flex-set" @tap="searchUser()">查找用户</view>
				</btnComponent>
				<btnComponent type="default">
					<view class="btn flex-set" @tap="confirm()">为TA充值</view>
				</btnComponent>
			</view>
		</modalComponent>

	</view>
</template>

<script>
	var timeId;
	import btnComponent from '@/components/btnComponent.vue'
	import badgeComponent from "@/components/badgeComponent.vue"
	import modalComponent from "@/components/modalComponent.vue"
	export default {
		components: {
			btnComponent,
			badgeComponent,
			modalComponent,
		},
		data() {
			return {
				$app: this.$app,
				modal: '',
				requestCount: 1,
				tabActive: 0,
				userInfo: {
					avatarurl: this.$app.getData('userInfo')['avatarurl'] || this.$app.AVATAR,
					nickname: this.$app.getData('userInfo')['nickname'] || this.$app.NICKNAME,
					id: this.$app.getData('userInfo')['id'] || null,
				},
				userCurrency: this.$app.getData('userCurrency') || {
					coin: 0,
					stone: 0,
					trumpet: 0
				},
				rechargeList: this.$app.getData('goodsList') || [], // 充值列表
				tehui_show: false, // 是否显示特惠礼包
				discount: {}, // 充值优惠
				discount_option: [], //可选充值优惠
				discount_option_index: 0,

				currentUser: {},
				currentUserid: '',

				selfInputStone: 0,
				selfInputFlower: 0,

				userLevel: 0,
				userGap: 0,
				farm_coin: 0,
				farm_distance: 0
			};
		},
		onLoad() {
			let timeId = setInterval(() => {
				if (this.$app.token) {
					clearInterval(timeId)
					this.getGoodsList(0)
					this.userInfo = this.$app.getData('userInfo')
					this.userCurrency = this.$app.getData('userCurrency')
				}
			}, 300)
		},

		onUnload() {
			clearInterval(timeId)
		},
		methods: {
			kickBack() {
				// #ifdef H5
				setTimeout(() => {
					window.scrollTo(0, document.body.scrollTop + 1);
					document.body.scrollTop >= 1 && window.scrollTo(0, document.body.scrollTop - 1);
				}, 10)
				// #endif
			},
			// 确认代充
			confirm() {
				if (this.currentUser.nickname) {
					this.userInfo = this.currentUser
					this.modal = ''
				} else {
					this.$app.toast('请先查找用户')
				}
			},
			searchUser() {
				if (!this.currentUserid) return
				const uid = Math.round(this.currentUserid / 1234)
				this.$app.request('user/info', {
					user_id: uid
				}, res => {
					if (res.data.nickname) {
						this.currentUser = res.data
					} else {
						this.$app.toast('未找到用户')
					}
				}, 'POST', true)
			},
			// 支付
			payment(count, type) {
				if (parseInt(count) <= 0) {
					this.$app.toast('请输入正确的数值')
					return
				}
				this.$app.request(this.$app.API.PAY_ORDER, {
					count,
					type,
					user_id: this.userInfo.id
				}, res => {
					// #ifdef H5
					WeixinJSBridge.invoke('getBrandWCPayRequest', {
						"appId": res.data.appId, //公众号名称，由商户传入     
						"timeStamp": res.data.timeStamp, //时间戳，自1970年以来的秒数     
						"nonceStr": res.data.nonceStr, //随机串     
						"package": res.data.package,
						"signType": res.data.signType, //微信签名方式：     
						"paySign": res.data.paySign //微信签名 
					}, res => {
						console.log(res);
						if (res.err_msg == "get_brand_wcpay_request:ok") {
							// 使用以上方式判断前端返回,微信团队郑重提示：
							//res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。

							this.$app.toast('支付成功', 'success')
							this.$app.request(this.$app.API.USER_CURRENCY, {}, res => {
								this.$app.setData('userCurrency', res.data)
								this.userCurrency = this.$app.getData('userCurrency')
								this.modal = ''
							})
							this.discount_option_index = 0
							this.getGoodsList(0)
						}
					});
					// #endif

					// #ifdef APP-PLUS
					uni.requestPayment({
						provider: 'wxpay',
						orderInfo: JSON.stringify(res.data),
						success: res => {
							this.$app.toast('支付成功', 'success')

							this.$app.request(this.$app.API.USER_CURRENCY, {}, res => {
								this.$app.setData('userCurrency', res.data)
								this.userCurrency = this.$app.getData('userCurrency')
								this.modal = ''
							})
							this.discount_option_index = 0
							this.getGoodsList(0)
						},
						fail: err => {
							this.$app.toast('支付失败')
						}
					});
					// #endif

					// #ifdef MP
					uni.requestPayment({
						provider: 'wxpay',
						timeStamp: res.data.timeStamp,
						nonceStr: res.data.nonceStr,
						package: res.data.package,
						signType: res.data.signType,
						paySign: res.data.paySign,
						success: res => {
							this.$app.toast('支付成功', 'success')

							this.$app.request(this.$app.API.USER_CURRENCY, {}, res => {
								this.$app.setData('userCurrency', res.data)
								this.userCurrency = this.$app.getData('userCurrency')
								this.modal = ''
							})
							this.discount_option_index = 0
							this.getGoodsList(0)
						},
						fail: err => {
							console.log(err)
							this.$app.toast('支付失败')
						}
					});
					// #endif
				}, 'POST', true);

			},
			// HTTP
			getGoodsList(userprop_id) {
				this.$app.request(this.$app.API.PAY_GOODS, {
					userprop_id,
				}, res => {
					// this.tehui_show = res.data.tehui_show
					this.rechargeList = res.data.list
					this.discount = res.data.discount
					this.farm_distance = res.data.farm_distance
					this.farm_coin = res.data.farm_coin
					// this.discount_option = res.data.discount_option
					this.$app.setData('goodsList', this.rechargeList)

					if (res.data.toast) {
						this.$app.toast(res.data.toast)
					} else if (res.data.modal) {
						this.$app.modal(res.data.modal)
					}
				})
				// 用户等级
				this.$app.request('user/level', {
					user_id: this.userInfo.id
				}, res => {
					this.userLevel = res.data.level
					this.userGap = res.data.gap ? (res.data.gap / 10000).toFixed(1) + '万' : '0'
				})
			},
			bindPickerChange: function(e) {
				this.discount_option_index = e.target.value
				this.getGoodsList(this.discount_option[this.discount_option_index].id)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.no-data {
		position: fixed;
		top: 30%;
		text-align: center;
		width: 100%;
	}

	.charge-page-container {
		padding-bottom: 40upx;

		.top-row {
			padding: 20upx;
			justify-content: space-between;

			.avatar {
				width: 90upx;
				height: 90upx;
				border-radius: 50%;
			}

			.nickname {
				font-size: 34upx;
				margin: 10upx;
			}

			.right-wrap {
				padding: 10upx 20upx;
				font-size: 38upx;
				background-color: #fbcc3e;
				border-radius: 40upx;
			}
		}

		.tab-wrap {
			padding: 25upx 80upx;
			display: flex;
			align-items: flex-end;
			justify-content: space-between;
			font-size: 32upx;
			border-bottom: 2upx solid #efefef;

			.item {
				position: relative;
				z-index: 1;
				line-height: 1.2;
				padding: 0 20upx;
			}

			.item.active {
				font-size: 42upx;
				font-weight: 700;
			}

			.item.active::after {
				content: "";
				position: absolute;
				z-index: -1;
				bottom: 0;
				height: 18upx;
				width: 100%;
				left: 50%;
				transform: translateX(-50%);
				border-radius: 20upx;
				background-color: #ffd75e;

			}
		}

		.currency-wrap {
			justify-content: space-between;
			padding: 10upx 40upx;
			font-size: 30upx;
			border-bottom: 10upx solid #f8f8f8;

			.item {
				margin-right: 20upx;

				.color {
					font-weight: 700;
					font-size: 30upx;
					margin-left: 10upx;
				}

				.color.flower {
					color: #fb4782;
				}

				.color.stone {
					color: #2599ff;
				}
			}
		}

		.tips-content {
			padding: 5upx 20upx;
			color: #919191;

			.row {
				font-size: 26upx;

				text {
					margin: 0 10upx;
					color: #fbcc3e;
					font-weight: 700;
				}
			}
		}

		.title-top {
			font-size: 40upx;
			font-weight: 700;
			text-align: center;
			color: #f00;
		}

		.tips {
			font-size: 24upx;
			padding-bottom: 10upx;
			color: #bdbdbd;
			text-align: center;
		}

		.title {
			text-align: center;
			font-size: 38upx;
			padding-top: 10upx;
			color: #f1cb48;
		}

		.title.stone {
			color: #3caffb;
		}

		.title.flower {
			color: #fa79a6;
		}

		.badge {
			position: absolute;
			border-radius: 60upx;
			background-color: #ffa154;
			color: #fff;

			top: 105upx;
			right: 35upx;
			font-size: 20upx;
			padding: 5upx 10upx;
		}

		.list-container {
			border-radius: 20upx;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			padding: 0 20upx;

			.item-wrap {
				width: 165upx;
				margin: 10upx 0;
				display: flex;
				flex-direction: column;
				align-items: center;
				text-align: center;
				border: 2upx solid #e6e4e5;
				border-radius: 20upx;
				background-color: #f7f5f6;
				box-shadow: 0 0 4upx rgba(#666, .3);
				position: relative;



				.top {
					color: #fff;
					background: linear-gradient(to right, #fb5088, #fff6f9);
					padding: 5upx 20upx;
					font-size: 24upx;
					width: 100%;
					text-align: left;
				}

				.flower-count {
					padding-top: 10upx;
					font-size: 24upx;

					.num {
						color: #fb4782;
						font-weight: 700;
						font-size: 26upx;
					}

					.num.stone {
						color: #2599ff;
					}
				}

				image {
					width: 100upx;
					height: 100upx;
				}

				.add {
					line-height: 1.0;
				}

				image.stone {
					width: 50upx;
					height: 50upx;
				}

				.btn {
					padding: 0 20upx;
					border-radius: 20upx;
					font-size: 24upx;
					margin: 10upx 0 20upx;
					background-color: #e8679c;
					color: #fff;
					display: flex;
					align-items: center;
				}
			}
		}

		// 自定义输入
		.self-input-wrap {
			display: flex;
			align-items: center;
			padding: 10upx 20upx;
			position: relative;

			.input {
				height: auto;
				flex: 1;
				border: 2upx solid #e6e4e5;
				background-color: #f7f5f6;
				font-size: 30upx;
				border-radius: 40upx;
				padding: 10upx 30upx;
				margin-right: 20upx;
			}
			
			.badge {
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				right: 280upx;
			}

			.btn {
				padding: 15upx 50upx;
			}
		}

		// 代充值modal
		.proxy-modal-container {
			height: 640upx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-around;
			padding: 40upx;

			.top {
				display: flex;
				flex-direction: column;
				align-items: center;
				line-height: 1.6;

				.avatar {
					width: 160rpx;
					height: 160rpx;
					border-radius: 50%;
				}

				.nickname {
					font-size: 36upx;
					font-weight: 600;
					height: 80upx;
				}
			}

			.btn-list {
				width: 100%;
				justify-content: space-around;

				.btn-item {
					display: flex;
					flex-direction: column;
					align-items: center;

					.bg {
						background-color: #FFF;
						border-radius: 20upx;
						width: 100upx;
						height: 100upx;

						image {
							width: 60upx;
							height: 60upx;
						}
					}

					.text {
						margin-top: 10upx;
					}
				}
			}

			.content {
				line-height: 1.6;
			}

			.btn {
				font-size: 32upx;
				font-weight: 700;
				width: 300upx;
				height: 80upx;
			}

			.row {
				width: 100%;
				justify-content: space-around;

				.btn {
					width: 200upx;
				}
			}

			.send-input {
				position: relative;

				input {
					background-color: #EEE;
					border-radius: 60upx;
					text-align: center;
					width: 300upx;
					height: 80upx;
					font-size: 32upx;
					font-weight: 700;
				}

				image {
					position: absolute;
					width: 50upx;
					height: 50upx;
					right: 20upx;
					top: 50%;
					transform: translateY(-50%);
				}
			}
		}

		.select-container {
			position: relative;
			display: flex;
			flex-direction: row;
			justify-content: flex-end;

			.picker {
				border: 1px solid #CCC;
				background-color: #EEE;
				border-radius: 60upx;
				text-align: center;
				font-size: 32upx;
				padding: 0 10upx 0 30upx;

				image {
					margin-top: 24upx;
					width: 30upx;
					height: 30upx;
					transform: translateY(-50%);
				}
			}
		}
	}
</style>
