<template>
	<!-- #ifndef H5 -->
	<view class="no-data" v-if="~$app.getData('sysInfo').system.indexOf('iOS')&&$app.getData('config').ios_switch!=0">
		由于Apple政策原因，不支持在小程序内购买
	</view>
	<view class="charge-page-container" v-else>	
	<!-- #endif -->
	
	<!-- #ifdef H5 -->
	<view class="charge-page-container">	
	<!-- #endif -->	
		<view class="top-row flex-set">
			<view class="left-wrap flex-set">
				<image class="avatar" :src="userInfo.avatarurl" mode="aspectFill"></image>
				<view class="nickname">{{userInfo.nickname}}</view>
			</view>
			<view class="right-wrap flex-set" @tap="modal='proxyRecharge'">为好友充值</view>
		</view>

		<view class="tab-wrap">
			<view class="item" :class="{active:tabActive==0}" @tap="tabActive=0">特惠礼包</view>
			<view class="item" :class="{active:tabActive==1}" @tap="tabActive=1">鲜花钻石充值</view>
		</view>
		<!-- 我的资产 -->
		<view class="currency-wrap flex-set">
			<view class="left-wrap flex-set">
				<view class="item">我的鲜花<text class="color flower">{{userCurrency.flower}}</text></view>
				<view class="item">我的钻石<text class="color stone">{{userCurrency.stone}}</text></view>
			</view>
		</view>
		<!-- 特惠礼包 -->
		<block v-if="tabActive==0">
			<view class="title">—— 每日礼包(限量) ——</view>
			<view class="list-container">
				<view class="item-wrap" v-if="item.category==1" v-for="(item,index) in rechargeList" :key="index" @tap="payment(item.id)">
					<view class="row flower-count flex-set" v-if="item.flower"><text class="num">{{$app.formatNumber(item.flower,0)}}</text>鲜花</view>
					<view class="row flower-count flex-set" v-if="item.stone"><text class="num stone">{{item.stone}}</text>钻石</view>
					<view class="row">
						<image v-if="item.flower" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9E7MFExyreICyFJqp5RoRBL1oVeg1YBz2QeHPIunT0CkpeGpUvc67X4uJbiaSEicXHJcLLLTJRdOiaaw/0"
						 mode="aspectFill"></image>
						<image v-if="item.stone" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9E7MFExyreICyFJqp5RoRBLkbLd15sXOSTiaL8IctOvWViaYBR9y8BKaMUazEmy6Am0BMqsXqsmJtaA/0"
						 mode="aspectFill"></image>
					</view>
					<view class="row" v-if="item.remain!==null">剩余{{item.remain}}</view>
					<view class="row btn">{{item.fee}}元购买</view>
				</view>
			</view>
			<view class="title flower">—— 钻石礼包 ——</view>
			<view class="list-container">
				<view class="item-wrap" v-if="item.category==2" v-for="(item,index) in rechargeList" :key="index" @tap="payment(item.id)">
					<view class="row flower-count flex-set" v-if="item.flower"><text class="num">{{$app.formatNumber(item.flower,0)}}</text>鲜花</view>
					<view class="row flower-count flex-set" v-if="item.stone"><text class="num stone">{{item.stone}}</text>钻石</view>
					<view class="row">
						<image v-if="item.flower" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9E7MFExyreICyFJqp5RoRBL1oVeg1YBz2QeHPIunT0CkpeGpUvc67X4uJbiaSEicXHJcLLLTJRdOiaaw/0"
						 mode="aspectFill"></image>
						<image v-if="item.stone" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9E7MFExyreICyFJqp5RoRBLkbLd15sXOSTiaL8IctOvWViaYBR9y8BKaMUazEmy6Am0BMqsXqsmJtaA/0"
						 mode="aspectFill"></image>
					</view>
					<view class="row" v-if="item.remain!==null">剩余{{item.remain}}</view>
					<view class="row btn">{{item.fee}}元购买</view>
				</view>
			</view>
			<view class="title stone">—— 鲜花礼包 ——</view>
			<view class="list-container">
				<view class="item-wrap" v-if="item.category==3" v-for="(item,index) in rechargeList" :key="index" @tap="payment(item.id)">
					<view class="row flower-count flex-set" v-if="item.flower"><text class="num">{{$app.formatNumber(item.flower,0)}}</text>鲜花</view>
					<view class="row flower-count flex-set" v-if="item.stone"><text class="num stone">{{item.stone}}</text>钻石</view>
					<view class="row">
						<image v-if="item.flower" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9E7MFExyreICyFJqp5RoRBL1oVeg1YBz2QeHPIunT0CkpeGpUvc67X4uJbiaSEicXHJcLLLTJRdOiaaw/0"
						 mode="aspectFill"></image>
						<image v-if="item.stone" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9E7MFExyreICyFJqp5RoRBLkbLd15sXOSTiaL8IctOvWViaYBR9y8BKaMUazEmy6Am0BMqsXqsmJtaA/0"
						 mode="aspectFill"></image>
					</view>
					<view class="row" v-if="item.remain!==null">剩余{{item.remain}}</view>
					<view class="row btn">{{item.fee}}元购买</view>
				</view>
			</view>
		</block>
		<!-- 鲜花钻石充值 -->
		<block v-if="tabActive==1">
			
			<view class="select-container">
				<picker @change="bindPickerChange" :range-key="'title'" :value="discount_option_index" :range="discount_option">
				<view class="picker" v-if="discount_option[discount_option_index].status==0">
					<image class="img" src="https://mmbiz.qpic.cn/mmbiz_png/h9gCibVJa7JUmpAKCVJ2Npw9ISkVxibZZ2Ye5b9VZyn7PuK2Pglkic4ZzvCz8pF461k7sp1SUgzmhBFu9Hr55pDXA/0"
					 mode="aspectFill"></image>{{discount_option[discount_option_index].prop.name}}
					<image class="img" src="https://mmbiz.qpic.cn/mmbiz_png/h9gCibVJa7JXX6zqzjkSn01fIlGmzJw6uVHXlUbGEEBfTW8ysG5j7xhWREa7dc3wTXQfYlDmF30e7iazribbekpIA/0"
					 mode="aspectFill"></image>
				 </view>
				</picker>
			</view>
			
			
			<view class="title-top" v-if="$app.getData('config').recharge_title">{{$app.getData('config').recharge_title}}</view>
			<view class="tips">购买的鲜花钻石不会被清零</view>
			<view class="list-container">
				<view class="item-wrap" v-if="item.category==0" v-for="(item,index) in rechargeList" :key="index" @tap="payment(item.id)">
					<view class="row top" v-if="discount.discount<1">{{discount.discount*10}}折优惠</view>
					<view class="row flower-count flex-set"><text class="num">{{$app.formatNumber(item.flower,1)}}</text>鲜花</view>
					<view class="row">
						<image src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9E7MFExyreICyFJqp5RoRBL1oVeg1YBz2QeHPIunT0CkpeGpUvc67X4uJbiaSEicXHJcLLLTJRdOiaaw/0"
						 mode="aspectFill"></image>
					</view>
					<view class="row add">+</view>
					<view class="row flex-set">
						{{item.stone}}
						<image class="stone" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9E7MFExyreICyFJqp5RoRBLkbLd15sXOSTiaL8IctOvWViaYBR9y8BKaMUazEmy6Am0BMqsXqsmJtaA/0"
						 mode="aspectFill"></image>
					</view>
					<view class="row btn">{{item.fee}}元购买</view>
				</view>
			</view>
		</block>
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
				discount: {}, // 充值优惠
				discount_option: [], //可选充值优惠
				discount_option_index: 0,

				currentUser: {},
				currentUserid: '',
			};
		},
		onLoad() {

			this.getGoodsList(0)
			let timeId = setInterval(() => {
				if (this.$app.getData('userInfo').nickname) {
					clearInterval(timeId)
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
			payment(goods_id) {
				if (this.$app.getData('platform') == 'MP-QQ') {
					if (this.$app.getData('config').version != this.$app.VERSION) {
						this.$app.preImg(this.$app.getData('config').qq_tips_img)
					} else {
						this.$app.modal('抱歉，QQ支付暂无法使用')
					}
					return
				}
				this.$app.request(this.$app.API.PAY_ORDER, {
					goods_id,
					userprop_id:this.discount.userprop_id,
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
						}
					});
					// #endif
					// #ifndef H5
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
							this.getGoodsList(0)
						},
						fail: err => {
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
					this.rechargeList = res.data.list
					this.discount = res.data.discount
					this.discount_option = res.data.discount_option
					this.$app.setData('goodsList', this.rechargeList)
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
				bottom: 0;
				height: 18upx;
				width: 100%;
				left: 50%;
				transform: translateX(-50%);
				border-radius: 20upx;
				background-color: #ffd75e;
				z-index: -1;

			}
		}

		.currency-wrap {
			justify-content: space-between;
			padding: 20upx 40upx;
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

		.title-top {
			font-size: 40upx;
			font-weight: 700;
			text-align: center;
			color: #f00;
			padding: 10upx;
		}

		.tips {
			padding: 10upx 30upx;
			color: #bdbdbd;
		}

		.title {
			text-align: center;
			font-size: 38upx;
			padding: 15upx;
			color: #f1cb48;
		}

		.title.stone {
			color: #3caffb;
		}

		.title.flower {
			color: #fa79a6;
		}

		.list-container {
			border-radius: 20upx;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			padding: 0 20upx;

			.item-wrap {
				width: 30%;
				margin: 10upx 5upx;
				display: flex;
				flex-direction: column;
				align-items: center;
				text-align: center;
				border: 2upx solid #434343;
				border-radius: 20upx;
				overflow: hidden;

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
					font-size: 32upx;

					.num {
						color: #fb4782;
						font-weight: 700;
						font-size: 36upx;
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
					font-size: 26upx;
					margin: 20upx 0 30upx;
					background-color: #e8679c;
					color: #fff;
					display: flex;
					align-items: center;
				}
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
			display:flex;
			flex-direction:row;
			justify-content: flex-end;
			padding-right:20upx;
			
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
