<template>
	<view class="user-page-container">
		<!-- 顶部背景 -->
		<view class="top-bg"></view>
		<view class="top-container">
			<view class="left-wrap flex-set">
				<view class="avatar-wrap">
					<image class="avatar" :src="userInfo.avatarurl" mode="aspectFill"></image>
					<!-- #ifdef MP -->
					<button open-type="getUserInfo" @getuserinfo="getUserInfo" v-if="userInfo.type!=3">
						<view class="tips">点击更新</view>
					</button>
					<!-- #endif -->
				</view>

				<view class="text-wrap">
					<view class="row">
						{{userInfo.nickname||''}}
						<text class="iconfont iconeditor" style="color: #666;" @tap="$app.goPage(`/pages/user/edit_user`)"  v-if="userInfo.type!=3"></text>
					</view>
					<view class="row" @tap="$app.copy(userInfo.id*1234)">ID {{userInfo.id*1234||''}}</view>
				</view>
			</view>
		</view>

		<!-- 顶部浮 -->
		<view class="top-float-container" v-if="$app.getData('config').version != $app.getData('VERSION') ||  ($app.getData('platform')!='MP-WEIXIN' && $app.getData('platform')!='MP-QQ')">
			<view class="row row-1">

				<view class="item-wrap">
					<view class="count">
						<image class="icon" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FctOFR9uh4qenFtU5NmMB5uWEQk2MTaRfxdveGhfFhS1G5dUIkwlT5fosfMaW0c9aQKy3mH3XAew/0"
						 mode="aspectFill"></image>
						<text class="num">{{userCurrency.coin||0}}</text>
					</view>
					<view class="text">金豆</view>
				</view>
				<view class="item-wrap">
					<view class="count">
						<image class="icon" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTERziauZWDgQPHRlOiac7NsMqj5Bbz1VfzicVr9BqhXgVmBmOA2AuE7ZnMbA/0"
						 mode="aspectFill"></image>
						<text class="num">{{userCurrency.flower||0}}</text>
					</view>
					<view class="text">鲜花</view>
				</view>
				<view class="item-wrap">
					<view class="count">
						<image class="icon" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTERibO7VvqicUHiaSaSa5xyRcvuiaOibBLgTdh8Mh4csFEWRCbz3VIQw1VKMCQ/0"
						 mode="aspectFill"></image>
						<text class="num">{{userCurrency.stone||0}}</text>
					</view>
					<view class="text">钻石</view>
				</view>
				<!-- <view class="item-wrap">
					<view class="count">
						<image class="icon" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9Fic6VmPQYib2ktqATmSxJmUtVH7OoNPjuMs2xwl26pXQGbQn74vvibp5mUNuJk7ucxzdXGAd8OlHJDA/0"
						 mode="aspectFill"></image>
						<text class="num">{{userCurrency.panacea||0}}</text>
					</view>
					<view class="text">灵丹</view>
				</view> -->

			</view>
			<view class="row row-2">
				<view class="item-wrap" @tap="goPage(item.path)" v-if="btn_cfg.user" v-for="(item,index) in btn_cfg.user"
				 :key="index">
					<image class="icon" :src="item.icon" mode="aspectFill"></image>
					<view class="text">{{item.name}}</view>
				</view>

				<view v-if="$app.chargeSwitch()==0" class="item-wrap" @tap="$app.goPage('/pages/charge/charge')">
					<image class="icon" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9EqVxh70XuVn1VhJLyPnEbxWT97VwdicBRcWiaic6aw5wqkz9EUKVsyJ21ib3SJB2vhd9oEibcEuV5vUeA/0"
					 mode="aspectFill"></image>
					<view class="text">充值</view>
				</view>
				<view v-else-if="$app.chargeSwitch()==2" class="item-wrap">
					<button open-type="contact">
						<image class="icon" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9EqVxh70XuVn1VhJLyPnEbxWT97VwdicBRcWiaic6aw5wqkz9EUKVsyJ21ib3SJB2vhd9oEibcEuV5vUeA/0"
						 mode="aspectFill"></image>
						<view class="text">补充鲜花</view>
					</button>
				</view>
				<view class="item-wrap" @tap="$app.goPage('/pages/user/badge')">
					<image class="icon" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9G95njnZp6t7hkcfsoraFhyFkjhRwv6OG00pSKo7DLXZAUibrL8SldBmf7kdCFB1icsWHxc0n34AGrA/0"
					 mode="aspectFill"></image>
					<view class="text">荣誉徽章</view>
				</view>
				<view class="item-wrap" @tap="$app.goPage('/pages/user/exchange')">
					<image class="icon" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9EqVxh70XuVn1VhJLyPnEbxaonPdq5wuw0mcjvxg7fiaH9U9f5HX3D4VTVJibsHHf8MB4C2nAIELfog/0"
					 mode="aspectFill"></image>
					<view class="text">积分兑换</view>
				</view>

			</view>
		</view>
		<!-- 广告位 -->
		<view v-if="$app.getData('config').version != $app.getVal('VERSION') && $app.getData('config').user_ad" class="ad-container flex-set"
		 @tap="goPage(default_user_ad_url)">
			<image :src="$app.getData('config').user_ad.img" mode="widthFix"></image>
		</view>

		<!-- 功能区 -->
		<view class="func-container">
			<view class="item-wrap" @tap="$app.preImg('https://mmbiz.qpic.cn/mmbiz_jpg/h9gCibVJa7JWh9kicrjHxwae75myNP7juRd5dQdAxjex8dKWSXiakDTyCyCKMpBfAtICOh4sJzXJUCteU1AiaJpOYw/0')">
				<view class="left-wrap">
					<image class="icon" :src="`/static/image/user_level/lv${userLevel.level}.png`" mode="aspectFill"></image>
					<view class="text">
						粉丝等级
						<view class="tips flex-set">再贡献<view class="highlight">{{userGap}}</view>人气可升至下一级</view>
					</view>
				</view>
				<view class="right-wrap iconfont iconjiantou"></view>
			</view>
			<view class="item-wrap" @tap="$app.goPage('/pages/user/log')">
				<view class="left-wrap">
					<image class="icon" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9E7MFExyreICyFJqp5RoRBLs3HXkP5LxtpUq4WeLeyViaHXPLfwlkP82KpsV3SPxpFT8wRALtw89Wg/0"
					 mode="aspectFill"></image>
					<view class="text">记录明细</view>
				</view>
				<view class="right-wrap iconfont iconjiantou"></view>
			</view>

			<button class="item-wrap" open-type="contact" :session-from="$app.getData('userInfo')" v-if="$app.getData('config').version != $app.getData('VERSION') &&  $app.getData('platform')=='MP-WEIXIN'">
				<view class="left-wrap">
					<image class="icon" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9E7MFExyreICyFJqp5RoRBLGBtJCqmhlXzuZaoribFll5kYOEewiaxiakgKM8RHibko8U2zWxIMVsdLPA/0"
					 mode="aspectFill"></image>
					<view class="text">在线客服
					<view class="tips flex-set red">回复<view style="font-weight: bold;">"1"</view>获取更多人气</view>
					</view>
				</view>
				<view class="right-wrap iconfont iconjiantou"></view>
			</button>

			<view class="item-wrap" v-else-if="$app.getData('config').version != $app.getData('VERSION') && $app.getData('platform')!='MP-WEIXIN'">
				<view class="left-wrap">
					<image class="icon" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9E7MFExyreICyFJqp5RoRBLGBtJCqmhlXzuZaoribFll5kYOEewiaxiakgKM8RHibko8U2zWxIMVsdLPA/0"
					 mode="aspectFill"></image>
					<view class="text" @tap="$app.copy(kefu)">客服微信：{{kefu}}<text class="tips">(点击复制)</text></view>
				</view>
			</view>

			<view v-if="$app.getData('config').version != $app.getData('VERSION') && $app.getData('platform')=='MP-WEIXIN'"
			 class="item-wrap" @tap="$app.goPage('/pages/user/push_index')">
				<view class="left-wrap">
					<image class="icon" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FQwQXv6GvPCnxTAabQ6CSgjfqGehWcXZZDKT6ib3q3X7OHu78RLROkjkTZdlEDslibgjgEneSPaSRQ/0"
					 mode="aspectFill"></image>
					<view class="text">数据订阅</view>
				</view>
				<view class="right-wrap iconfont iconjiantou"></view>
			</view>

			<view class="item-wrap" v-if="$app.getData('config').version != $app.getData('VERSION') && $app.getData('config').game_switch.open" @tap="$app.goPage('/pages/task/game')">
				<view class="left-wrap">
					<image class="icon" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FQwQXv6GvPCnxTAabQ6CSgtIPQE24csmD5a8XhhpIujtre8YqLmICrxtWTNRny1iaS2MfkUkk2bag/0"
					 mode="aspectFill"></image>
					<view class="text" v-if="$app.getData('userExt').totalCount>=$app.getData('config').game_switch.min_count">游戏试玩
						<view class="tips">每试玩一个+{{$app.getData('config').game_switch.award_coin}}金豆</view>
					</view>
					<view class="text" v-else>更多好玩</view>

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

			<view class="item-wrap" @tap="$app.goPage('/pages/user/setting')">
				<view class="left-wrap">
					<image class="icon" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9E7MFExyreICyFJqp5RoRBLAfUuB7zP0TVUIdw8AjXVEibArIEoZLSmHfzyqIY3pjT5xOVK97dianRQ/0"
					 mode="aspectFill"></image>
					<view class="text">设置</view>
				</view>
				<view class="right-wrap iconfont iconjiantou"></view>
			</view>

		</view>

		<view class="bottom-block"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				btn_cfg: this.$app.getData('config').btn_cfg,
				kefu: this.$app.getData('config').kefu,
				default_user_ad_url: this.$app.getData('config').user_ad.url,
				requestCount: 0,

				userInfo: {},
				userCurrency: {},
				userStar: {},
				modal: '',
				rechargeList: [],

				userLevel: {},
				userGap: 0,
			};
		},
		onLoad() {

		},
		onShow() {
			this.userInfo = {
				avatarurl: this.$app.getData('userInfo')['avatarurl'] || this.$app.getData('AVATAR'),
				nickname: this.$app.getData('userInfo')['nickname'] || this.$app.getData('NICKNAME'),
				type: this.$app.getData('userInfo')['type'] || 0,
				id: this.$app.getData('userInfo')['id'] || null,
			}
			this.userCurrency = this.$app.getData('userCurrency') || {
				coin: 0,
				stone: 0,
				trumpet: 0
			}
			this.userStar = this.$app.getData('userStar') || {}

			this.$app.request(this.$app.API.USER_CURRENCY, {}, res => {
				this.$app.setData('userCurrency', res.data)
				this.userCurrency = this.$app.getData('userCurrency')
			})

			this.getUserLevel()
		},
		onShareAppMessage(e) {
			const shareType = e.target && e.target.dataset.share
			return this.$app.commonShareAppMessage(shareType)
		},
		methods: {
			goPage(url) {
				if (this.$app.getData('userStar').id) {
					this.$app.goPage(url)
				} else {
					uni.showModal({
						content: '请先加入一个圈子',
						confirmText: '去加圈子',
						showCancel: false,
						success: res => {
							if (res.confirm) {
								this.$app.goPage('/pages/group/group')
							}
						}
					})
				}
			},
			copy() {
				uni.setClipboardData({
					data: 'ouridol',
					success: () => {
						this.$app.toast("微信号已复制\n请到微信中添加客服为好友")
					}
				})
			},
			exitGroup() {
				this.$app.modal(`只有一次机会\n并且会清除你的师徒关系\n是否退出${this.$app.getData('userStar').name}圈子？`, () => {
					this.$app.request(this.$app.API.USER_EXIT, {}, res => {
						this.$app.toast('退出成功')
						this.$app.setData('userStar', {}, true)
						this.userStar = {}
					})
				})
			},
			// HTTP
			getUserLevel() {
				this.$app.request('user/level', {
					user_id: this.userInfo.id
				}, res => {
					this.userLevel = res.data
					this.userGap = res.data.gap ? (res.data.gap / 10000).toFixed(1) + '万' : '0'
				})
			},
			/**
			 * 保存用户详细信息
			 */
			getUserInfo(e) {
				const userInfo = e.detail.userInfo
				if (userInfo && ~this.$app.getData('platform').indexOf('MP')) {
					const req = function() {
						this.$app.request(this.$app.API.USER_SAVEINFO, {
							iv: e.detail.iv,
							encryptedData: e.detail.encryptedData,
						}, res => {
							if (res.data.userInfo.id != this.$app.getData('userInfo').id) {
								// 同步其他平台账号数据
								this.$app.token = res.data.token
								this.$app.request('page/app', {}, res => {
									this.$app.setData('userCurrency', res.data.userCurrency)
									this.userCurrency = res.data.userCurrency

									this.$app.setData('userStar', res.data.userStar)
									this.userStar = res.data.userStar

									this.$app.setData('userExt', res.data.userExt)
								})
							}

							this.$app.setData('userInfo', res.data.userInfo)
							this.userInfo = res.data.userInfo

							this.$app.toast('更新成功')
						}, 'POST', true)
					}.bind(this)
					if (this.$app.getData('userInfo').nickname) {
						let text
						if (this.$app.getData('platform') == 'MP-WEIXIN') {
							text = '是否同步微信头像和昵称？'
						} else if (this.$app.getData('platform') == 'MP-QQ') {
							text = '是否同步QQ头像和昵称？'
						}
						this.$app.modal(text, () => {
							req()
						})
					} else {
						req()
					}
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.user-page-container {
		display: flex;
		flex-direction: column;
		min-height: 100%;

		.top-bg {
			background-color: $bg-color-2;
			height: 350upx;
			width: 100%;
			top: 0;
			border-bottom-left-radius: 10upx;
			border-bottom-right-radius: 10upx;
			position: absolute;
			z-index: 0;
		}

		.top-container {
			position: relative;
			z-index: 1;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-top: 40upx;

			.left-wrap {
				padding-left: 40upx;

				.avatar-wrap {
					position: relative;
					overflow: hidden;
					z-index: 1;
					border-radius: 50%;
					width: 120upx;
					height: 120upx;
					border: 2upx solid #ffffff;
					
					button{
						overflow: visible;
					}

					.tips {
						position: absolute;
						width: 100%;
						background-color: rgba(0, 0, 0, .3);
						bottom: 0;
						height: 34upx;
						color: #fff;
						font-size: 18upx;
						text-align: center;
						line-height: 30upx;
					}
				}

				.text-wrap {
					padding-left: 20upx;
					line-height: 1.7;
				}
			}

			.right-wrap {
				.btn-wrap {
					font-size: 24upx;
					background-color: #b25a1d;
					border-top-left-radius: 30upx;
					border-bottom-left-radius: 30upx;
					padding: 8upx 16upx;
					color: #ffffff;

					.iconfont {
						font-size: 18upx;
					}
				}
			}
		}

		.top-float-container {
			position: relative;
			z-index: 1;
			margin: 30upx 20upx;
			background-color: #ffffff;
			box-shadow: 0 4upx 32upx rgba(#666, .3);
			border-radius: 30upx;

			.row {
				display: flex;
				justify-content: space-between;
			}

			.row.row-1 {
				border-bottom: 2upx dashed #dadade;

				.item-wrap {
					flex: 1;
					padding: 20upx 40upx;

					.count {
						font-size: 26upx;
						display: flex;
						align-items: center;

						.icon {
							width: 32upx;
							height: 32upx;
						}

						.num {
							padding-left: 10upx;
						}
					}

					.text {
						display: flex;
						align-items: center;
						font-size: 24upx;
						color: #afafaf;
					}
				}
			}

			.row.row-2 {
				padding: 20upx 0;

				.item-wrap {
					flex: 1;
					text-align: center;

					.icon {
						width: 60upx;
						height: 60upx;
					}

					.text {
						// padding-top: 10upx;
					}
				}
			}
		}

		.ad-container {
			padding: 0 20upx;
		}

		.func-container {
			position: relative;
			z-index: 1;

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
						.red{
							color:#FC3131 ;
						}
					}
				}

				.right-wrap {
					font-size: 22upx;
					color: #999;
				}
			}

		}

		.bottom-block {
			min-height: 200upx;
			flex: 1;
			background-color: #f6f5fa;
		}
	}
</style>
