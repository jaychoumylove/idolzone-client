<template>
	<view class="pet-container">
		<image class="bg-img" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GcjvbhGA8hnWrkuicbhygVsuXiciaj4Rwx8jIyia93B6A5oic1Lbc9ichUWj4o4HrzdGcl8qHqPEbtO1dA/0"
		 mode="aspectFill"></image>
		<!-- 顶部 -->
		<view class="top-row-container">

			<image class="coin" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9E5sBeCnmnj6DXf1Hk73ewfE3vESVicZDw9ARM8285QibWLvcxUic2icyNBplPrPwEPb6NTs2teQEE16Q/0"
			 mode="aspectFill"></image>

			<view class="text-wrap">
				<view class="top"><text class="big" :class="{'active':coinSettleShow}">{{userCurrency.coin||0}}</text> <text class="small"
					 v-if="coinSettleShow">+{{coinAddNum}}</text>
				</view>
				<view class="bottom">{{spriteInfo.cfg_sprite.earn||0}}颗/100秒</view>
			</view>
		</view>
		<view class="offline-wrap" @tap.stop="getSkill(3);modal='skill'">
			<image class="img" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GcjvbhGA8hnWrkuicbhygVsibCBTTRRT3gnDLyoCYwm8EYkXBHZYqsObCUazWsyvq0yrlRriby9sGew/0"
			 mode="aspectFill"></image>

			<view class="count">{{Math.round(skillThreePercent*100)+'%'}}</view>
		</view>

		<!-- 两侧边 -->
		<view class="side-wrap left-wrap" @tap.stop>

			<view class="btn-wrap">
				<image class="icon" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GcjvbhGA8hnWrkuicbhygVsugQ9sUGHMdzR6Y7B47OVpmLSiaChO9jxyXiaVU9pUXYrLO4NDicAibezOQ/0"
				 mode="aspectFill"></image>
			</view>
		</view>
		<view class="side-wrap right-wrap" @tap.stop>
			<!-- 挖钻石 -->
			<view class="btn-wrap" @tap="getSkill(1);modal='skill'">
				<image class="icon" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GcjvbhGA8hnWrkuicbhygVshj8bApey6m791b44hCJeicOBWYXhPHvwNDmJcSceeZqsF9G7qRvX4RQ/0"
				 mode="aspectFill"></image>
				<view class="text">{{skillOneRemainTime}}</view>
			</view>
			<!-- 挖金豆 -->
			<view class="btn-wrap" @tap="getSkill(2);modal='skill'">
				<image class="icon" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GcjvbhGA8hnWrkuicbhygVsY0KNF7n3t7TsfmJtqFHicNDxthAuc04oxFZy9bcicJy3fVGpdpdJ4WfQ/0"
				 mode="aspectFill"></image>
				<view class="text">{{skillTwoRemainCount||0}}次</view>
			</view>

		</view>

		<view class="pet-wrap" @tap="upgrade(0)">
			<view class="top-wrap" v-if="spriteInfo.need_stone&&userCurrency.stone>=spriteInfo.need_stone">
				<image src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9E5sBeCnmnj6DXf1Hk73ewfG5cGV5JBpibjahjQ3qgRYkmZfVU8B3vXE7KbzveBmEQYmT0s482ic5Gw/0"
				 mode="aspectFill"></image>
			</view>
			<image class="pet-main" :src="spriteInfo.cfg_sprite.image"
			 mode="aspectFill"></image>
			<image v-if="spriteInfo.need_stone&&userCurrency.stone>=spriteInfo.need_stone" class="magic-circle" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9E5sBeCnmnj6DXf1Hk73ewfmSGiauenwlNgoRW5jqvxJGZajlCu14icZg9LicHic7fkJj3PGfN2LhEN6g/0"
			 mode="aspectFill"></image>
			<image v-else class="magic-circle" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9E5sBeCnmnj6DXf1Hk73ewf2SIz5EibKzAdVSQGdQUDbD1JoOcRFQRZmRorsHROST9utWicibPz59tyg/0"
			 mode="aspectFill"></image>

			<view class="progress-wrap">
				<image class="level" :src="`/static/image/level/${spriteInfo.sprite_level}.png`" mode="aspectFill"></image>
				<!-- 进度条 -->
				<view class="progress-out">
					<view class="progress-inner" :style="{width: userCurrency.stone/spriteInfo.need_stone * 100 + '%'}"></view>
					<view class="text position-set">
						<image class="img-s" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTERibO7VvqicUHiaSaSa5xyRcvuiaOibBLgTdh8Mh4csFEWRCbz3VIQw1VKMCQ/0"
						 mode=""></image> {{userCurrency.stone}}/{{spriteInfo.need_stone||'已满级'}}
					</view>
				</view>
			</view>
		</view>

		<!-- modal -->
		<modalComponent v-if="modal == 'skill'" type="center" title="提示" @closeModal="modal=''">
			<view class="modal-container">
				<!-- 钻石图标 -->
				<image v-if="skillType==1" class="bg" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9HUWa4ibYRGeP9Kkz6Vd4icsiaYhw3c8VbuhCrUW0xLiaGRyeV7Dle0ZuLN9LW0hh47BQiaDr4icqf361Yg/0"
				 mode="aspectFill"></image>
				<!-- 金豆图标 -->
				<image v-if="skillType==2" class="bg" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9HUWa4ibYRGeP9Kkz6Vd4icsiaYpD3ibbGnqhb5tK3xEm7q35pVl5QibibGUtaGkmtvzA5zRlb0Re6VtNvg/0"
				 mode="aspectFill"></image>

				<btnComponent type="default" v-if="skillType == 1">
					<view class="btn center" v-if="skillOneRemainTime=='领取'" @tap="skillSettle">领取</view>
					<view class="btn center" v-else>还剩{{skillOneRemainTime}}</view>
				</btnComponent>
				<btnComponent type="default" v-if="skillType == 2">
					<view class="btn center" @tap="skillSettle">搞点金豆</view>
				</btnComponent>

				<view v-if="skillType == 2" class="desc">还剩{{skillTwoRemainCount||0}}次</view>
				<view v-if="skillType == 3" class="desc">离线时可获得的收益：{{Math.round(skillThreePercent*100)+'%'}}</view>

				<view class="row">
					<view class="top">
						<view class="left">当前等级 Lv.{{skillInfo.myskill.level||''}} {{skillInfo.nextskill===null?'(最高等级)':''}}</view>
						<view class="right"></view>
					</view>
					<view class="desc" v-if="skillInfo.myskill">{{skillInfo.myskill.desc}}</view>
				</view>
				<view class="row" v-if="skillInfo.nextskill">
					<view class="top">
						<view class="left">下一等级 Lv.{{skillInfo.nextskill.level}}</view>
						<btnComponent type="default">
							<view class="right flex-set" @tap="upgrade(skillType)">升级<image class="img-s" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTERibO7VvqicUHiaSaSa5xyRcvuiaOibBLgTdh8Mh4csFEWRCbz3VIQw1VKMCQ/0"
								 mode="aspectFill"></image>{{skillInfo.nextskill.stone}}</view>
						</btnComponent>
					</view>
					<view class="desc">{{skillInfo.nextskill.desc}}</view>
				</view>
			</view>

		</modalComponent>

		<!-- 离线收益 -->
		<modalComponent v-if="modal == 'offline'" type="center" title="提示" @closeModal="modal=''">
			<view class="modal-container">
				<view class="title">离线收益</view>
				<image class="bg" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9HUWa4ibYRGeP9Kkz6Vd4icsiaYpD3ibbGnqhb5tK3xEm7q35pVl5QibibGUtaGkmtvzA5zRlb0Re6VtNvg/0"
				 mode="aspectFill"></image>
				<view class="coin-count">+{{coinAddNum}}</view>
				<btnComponent type="default">
					<view class="btn center" @tap="offlineSettle">领取</view>
				</btnComponent>

			</view>
		</modalComponent>

	</view>
</template>

<script>
	import modalComponent from '@/components/modalComponent.vue'
	import btnComponent from '@/components/btnComponent.vue'
	import listItemComponent from '@/components/listItemComponent.vue'
	export default {
		components: {
			modalComponent,
			btnComponent,
			listItemComponent
		},
		data() {
			return {
				requestCount: 1,
				spriteInfo: {},

				userCurrency: this.$app.getData('userCurrency') || {
					coin: 0,
					stone: 0,
					trumpet: 0,
				},

				modal: '',

				coinSettleShow: false, // 金豆收益动画
				coinAddNum: '', // 增加的金豆数额
				canUpgrage: false, // 农场可升级

				skillInfo: {}, // 技能信息
				skillType: '', // 技能id
				skillOneRemainTime: '', // 挖钻石的倒计时显示
				skillTwoRemainCount: '', // 搞点金豆剩余使用次数 
				skillThreePercent: '', // 离线增强百分数
				skillBtnContent: '',

			};
		},
		onShareAppMessage(e) {
			const shareType = e.target && e.target.dataset.share
			return this.$app.commonShareAppMessage(shareType)
		},
		onLoad() {
			uni.hideTabBarRedDot({
				index: 1
			})

			this.initInterval()
		},
		onShow() {
			this.getSpriteInfo()

			this.userCurrency = this.$app.getData('userCurrency') || {
				coin: 0,
				stone: 0,
				trumpet: 0,
			}
		},
		methods: {
			// 技能结算
			skillSettle() {
				const func = function() {
					this.$app.request('sprite/skill_settle', {
						type: this.skillType
					}, res => {
						this.$app.modal(res.data.msg);
						this.getSkill(this.skillType)
						this.$app.request(this.$app.API.USER_CURRENCY, {}, res => {
							this.$app.setData('userCurrency', res.data)
							this.userCurrency = this.$app.getData('userCurrency')
						})
					}, 'POST', true)
				}.bind(this)

				if (this.skillType == 2) {
					this.$app.modal('金豆全投给爱豆？', () => func())
				} else {
					func()
				}
			},
			// 技能信息
			getSkill(type) {
				this.skillType = type
				this.$app.request(this.$app.API.SPRITE_SKILL, {
					type
				}, res => {
					this.skillInfo = res.data

					if (type == 1) {
						// 挖钻石
						this.initSkillOne(res.data.remainTime)
					} else if (type == 2) {
						// 挖金豆
						this.skillTwoRemainCount = res.data.remainTimes
					} else if (type == 3) {
						// 离线金豆
						this.skillThreePercent = res.data.myskill.percent
					}
				})
			},
			// 挖钻石倒计时
			initSkillOne(remainTime) {
				clearInterval(this.skillOneTimeId)
				if (remainTime === true) {
					this.skillOneRemainTime = '领取'
				} else {
					let time = this.$app.timeGethms(remainTime)
					this.skillOneRemainTime = `${time.hour}:${time.min}:${time.sec}`
					this.skillOneTimeId = setInterval(() => {
						let time = this.$app.timeGethms(--remainTime)
						this.skillOneRemainTime = `${time.hour}:${time.min}:${time.sec}`

						if (remainTime <= 0) {
							clearInterval(this.skillOneTimeId)
							this.skillOneRemainTime = '领取'
						}
					}, 1000)
				}
			},
			// 升级 0农场本体 1挖钻石 2挖金豆
			upgrade(type) {
				this.$app.request(this.$app.API.SPRITE_UPGRAGE, {
					type
				}, res => {
					this.$app.request(this.$app.API.USER_CURRENCY, {}, res => {
						this.$app.setData('userCurrency', res.data)
						this.userCurrency = this.$app.getData('userCurrency')
					})
					this.getSpriteInfo()
					if (type != 0) {
						this.getSkill(type)
					}
					this.$app.toast('升级成功', 'success')
					this.modal = ''
				}, 'POST', true)
			},
			// 金豆收益定时器
			initInterval() {
				const coinSettle = function() {
					this.$app.request('sprite/settle', {}, res => {
						if (res.data.earn) {
							this.coinAddNum = res.data.earn
							if (res.data.mode == 0) {
								// 在线
								this.coinSettleShow = true
								setTimeout(() => {
									this.coinSettleShow = false
								}, 2000)
								this.$app.request(this.$app.API.USER_CURRENCY, {}, res => {
									this.$app.setData('userCurrency', res.data)
									this.userCurrency = this.$app.getData('userCurrency')
								})
							} else if (res.data.mode == 1) {
								// 离线
								this.modal = 'offline'
							}
						}

					})
				}.bind(this)

				coinSettle()
				clearInterval(this.timeId)
				this.timeId = setInterval(() => {
					coinSettle()
				}, 1000 * 100)
			},

			offlineSettle() {
				this.modal = ''
				this.$app.toast('领取成功', 'success')
				this.coinSettleShow = true
				setTimeout(() => {
					this.coinSettleShow = false
				}, 2000)
				this.$app.request(this.$app.API.USER_CURRENCY, {}, res => {
					this.$app.setData('userCurrency', res.data)
					this.userCurrency = this.$app.getData('userCurrency')
				})
			},

			getSpriteInfo() {
				this.$app.request(this.$app.API.SPRITE_INFO, {
					user_id: this.$app.getData('userInfo').id
				}, res => {
					this.spriteInfo = res.data.spriteInfo

					this.initSkillOne(res.data.skillOneRemainTime)
					this.skillTwoRemainCount = res.data.skillTwoRemainTimes
					this.skillThreePercent = res.data.skillThreePercent

					console.log(this.skillTwoRemainCount)
				})

			}
		}
	}
</script>

<style lang="scss" scoped>
	.pet-container {

		.bg-img {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: -1;
		}

		.top-row-container {
			display: flex;
			align-items: center;
			padding: 40upx 20upx 0;

			.coin {
				width: 110upx;
				height: 110upx;
			}

			.text-wrap {
				margin-left: 20upx;
				color: #ff8500;
				line-height: 1.3;

				.top {

					.big {
						font-size: 64upx;
					}

					.big.active {
						animation: scaleA 0.8s linear;

						@keyframes scaleA {

							0%,
							100% {
								transform: scale(1);
							}

							60% {
								transform: scale(2);
							}
						}
					}

					.small {
						font-size: 26upx;
					}
				}

				.bottom {}
			}

		}

		.offline-wrap {
			position: relative;
			width: 284upx;
			height: 50upx;
			margin: 20upx;
			z-index: 1;

			.img {}

			.count {
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				right: 60upx;

				font-weight: 700;
				color: #fff;
			}
		}

		.side-wrap {
			position: absolute;
			top: 50%;
			z-index: 1;
			transform: translateY(-50%);

			.btn-wrap {
				margin: 20upx;

				.icon {
					width: 136upx;
					height: 136upx;
				}

				.text {
					text-align: center;
					line-height: 1.3;
				}
			}


			.icon {
				width: 120upx;
				height: 120upx;
			}
		}

		.side-wrap.right-wrap {
			right: 0;
		}

		.pet-wrap {
			position: absolute;
			left: 50%;
			transform: translate(-50%, -50%);
			top: 54%;
			width: 750upx;
			height: 750upx;

			.top-wrap {
				width: 300upx;
				height: 300upx;
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				top: -8%;
			}

			.pet-main {
				width: 490upx;
				height: 490upx;
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);

				animation: bounce 4s ease-in-out infinite;

				@keyframes bounce {

					0%,
					100% {
						transform: translate(-50%, -50%);
					}

					65% {
						transform: translate(-50%, -53%);
					}
				}
			}

			.magic-circle {
				width: 500upx;
				height: 500upx;
				position: absolute;
				left: 50%;
				top: 25%;
				transform: translateX(-50%);
				z-index: -1;
			}

			.progress-wrap {
				width: 750upx;
				display: flex;
				padding: 20upx 60upx;
				align-items: center;
				left: 50%;
				top: 85%;
				position: absolute;
				transform: translateX(-50%);

				.level {
					width: 162upx;
					height: 162upx;
					margin-right: 20upx;
				}

				.progress-out {
					background-color: #471e0a;
					border: 8upx solid #703214;
					flex: 1;
					border-radius: 30upx;
					height: 38upx;
					display: flex;
					align-items: center;
					position: relative;

					.progress-inner {
						height: 100%;
						background: #fae349;
						border-radius: 30upx;
					}

					.text {
						color: #fff;
						font-size: 24upx;
					}
				}
			}
		}

		.modal-container {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-top: -80upx;
			padding: 40upx;

			.title {
				font-size: 32upx;
				font-weight: 700;
			}

			.coin-count {
				font-size: 50upx;
				padding-bottom: 20upx;
				margin-top: -20upx;
				font-weight: 700;
				color: $bg-color-2;
			}

			.bg {
				width: 300upx;
				height: 300upx;
			}

			.btn.center {
				padding: 5upx 40upx;
				font-size: 36upx;
				font-weight: 600;
			}

			.desc {
				padding-top: 10upx;
			}

			.row {
				width: 100%;
				padding: 20upx;

				.top {
					display: flex;
					justify-content: space-between;
					align-items: center;
					height: 60upx;

					.left {
						font-weight: 600;
						border-left: 8upx solid $bg-color-2;
						padding: 0 20upx;
						line-height: 1.2;
					}

					.right {
						padding: 5upx 20upx;
					}
				}
			}
		}
	}
</style>
