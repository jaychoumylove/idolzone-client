<template>
	<view class="manor-container" :class="{'manor-container-modal-content': modal=='box'}">
		<!-- <view class="background"></view> -->
		<image class='bg' :style="{height: dheight +'px'}" v-if="tryBackground.url" :src='tryBackground.url'></image>
		<image class='bg' :style="{height: dheight +'px'}" v-else :src='mainBackground.url'></image>
		<!-- <image class='bg' :style="{height: dheight +'px'}" src='https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GORNqMVibKH3lQqEq8pJ6wOFnhvGIhu9pRxxRicDI5ExhicTJMPSeyhcroKiaYdzicwgSKbsjLcV2Cfqg/0'></image> -->
		<!-- <image class='bg' mode="widthFix" src='https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GORNqMVibKH3lQqEq8pJ6wOFnhvGIhu9pRxxRicDI5ExhicTJMPSeyhcroKiaYdzicwgSKbsjLcV2Cfqg/0'></image> -->
		<view class="header" :class="fix.header">
			<view class="left iconfont iconjiantou flex-set" @tap='goBack'></view>
			<view class="right title" :class="title_class">庄园</view>
		</view>
		<view class="user-info" :class="fix.userInfo">
			<image class="avatar" :src="userInfo.avatarurl" mode="aspectFill"></image>
			<view class="info">
				<view class="nickname text-overflow">{{userInfo.nickname}}</view>
				<view class="week-output"></view>
			</view>
		</view>
		<view class="try-timer" :class="fix.tryTimer" v-if="tryBackground.url">
			<view>试用：</view>
			<view>
				<text class="text">{{tryTimeDetail.i}}</text>
				分
				<text class="text">{{tryTimeDetail.s}}</text>
				秒
			</view>
		</view>
		
		<view class="right-btn-list" :class="fix.rightList">
			<block v-for="(item, index) in btn" :key="index" v-if="item.path||item.modal">
				<view v-if="!item.visitor_hidden">
					<view
						class="item" 
						:style="{'background-image': 'url('+(item.visitor ? item.image_s: item.image)+')'}"
						@tap="goModelOrPage(item)"
					>
					</view>
				</view>
			</block>
		</view>
		
		<view class="main-animal" :class='{"normal-main": mainAnimal.type == "NORMAL", "secret-main": mainAnimal.type == "SECRET"}'>
			<view class="word">{{word||"记得常来看我"}}</view>
			<image class="animal secret" :class="fix.mainAnimal" v-if="mainAnimal.type == 'SECRET'" mode="widthFix" :src="mainAnimal.image"></image>
			<image class="animal normal" v-if="mainAnimal.type == 'NORMAL'" mode="aspectFit" :src="mainAnimal.image"></image>
		</view>
		<modalComponent v-if="modal == 'box'" headimg="/static/image/icon/lx.png" title="宝箱" @closeModal="modal=''">
			<view class="box-container">
				<view class="title">宠物碎片</view>
				<view class="notice">
					<image class="notice-icon" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GqEna3Bu4hOUqY2ruicPUKoPXtMTFLV2ydAKSiawiapkia2icuuW67SfcBKp3mbQWicrWJb4rJskIWFuhQ/0"></image>
					<view class="notice-info">
						<swiper 
							:indicator-dots="false" 
							:autoplay="true" 
							:interval="3000" 
							:duration="1000" 
							vertical="true"
							touchable="false"
							circular='true'
							disable-touch="true"
						>
							<swiper-item v-for="(item, index) in boxLogList" :key="index">
								<view class="notice-item">
									<image class="notice-avatar" :src="item.user.avatarurl || AVATAR"></image>
									<view class="notice-con">
										{{item.content}}
									</view>
								</view>
							</swiper-item>
							<swiper-item v-if="!boxLogList.length">
								<view class="notice-item">
									<view class="notice-con">
										暂无数据~
									</view>
								</view>
							</swiper-item>
						</swiper>
					</view>
				</view>
				<view class="main">
					<image src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FkdUhHPgXyfkQlic4PyAIfcQkbDhgXTicIJrMdPXZfU1icAAVibDjicBw81PCb6iapIREdsgYUwIr0emHg/0" class="main-image position-set"></image>
					<view class="box-position" :class="'position-'+ite.position" v-for="(ite, ind) in boxScrapList" :key="ind">
						<view class="box-scrap">
							<image class="scrap-bg position-set" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FkdUhHPgXyfkQlic4PyAIfce5tqyprFJXAXiaaalhH02TW0SjricBxWWr3KGHQBwpq2NW7GDEd7Arrg/0"></image>
							<image class="scrap-item position-set" :src="ite.scrap_img"></image>
							<view v-if="ite.number > 1" class="scrap-num">X{{ite.number}}</view>
						</view>
					</view>
				</view>
				<view class="bottom">
					<view class="btn flex-set" v-if="lotteryStatus == -1">
						<btnComponent type="disable">
							<view class="flex-set" style="padding: 15rpx 60rpx;">今日抽取次数已用完</view>
						</btnComponent>
					</view>
					<view class="btn flex-set" v-if="lotteryStatus == 1">
						<btnComponent type="disable">
							<view class="flex-set" style="padding: 15rpx 60rpx;">已抽取</view>
						</btnComponent>
					</view>
					<view class="btn flex-set" v-if="lotteryStatus == 0" @tap="lotteryBoxScrap">
						<btnComponent type="default">
							<view class="flex-set" style="padding: 15rpx 60rpx;">抽取一张</view>
						</btnComponent>
					</view>
				</view>
			</view>
		</modalComponent>
		</view>
</template>

<script>
	import modalComponent from '@/components/modalComponent.vue'
	import btnComponent from '@/components/btnComponent.vue'
	export default {
		components: {
			modalComponent,
			btnComponent,
		},
		data() {
			return {
				title_class: 'title-ios',
				modal: '',
				btn: [],
				manor: {},
				mainAnimal: {},
				dheight: 0,
				fixBottom: '',
				word: "",
				fix: {
					header: '',
					mainAnimal: '',
					userInfo: '',
					tryTimer: '',
					rightList: '',
					rightBottom: ''
				},
				fixAnimalScreen: '',
				tryBackground: {},
				tryTimer: '',
				tryTimeDetail: {},
				mainBackground: {
					url:"https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9EYo3y2NlFPAWCnsfj8xr36WkoItYoGoC20F1N49sXdnmrLwodF6x2icITRfQ4GN999WzPyMmDib7fw/0",
				},
				boxLogList: [],
				boxScrapList: [],
				user_id: 0,
				userInfo: {
					avatarurl: this.$app.getData('AVATAR'),
					nickname: this.$app.getData('NICKNAME'),
					id: 0,
				},
				lotteryStatus: 0,
			};
		},
		onLoad(option) {
			if (option.user) {
				this.user_id = option.user;
			} else {
				uni.navigateBack();
			}
		},
		onShareAppMessage(e) {
			const shareType = e.target && e.target.dataset.share;
			return this.$app.commonShareAppMessage(shareType)
		},
		onShow() {
			const system = uni.getSystemInfoSync();
			this.dheight = system.windowHeight;
			if (system.platform == 'ios') {
				this.title_class = 'title-ios';
			}
			if (system.platform == 'android') {
				this.title_class = 'title-and';
			}
			if (this.dheight > 750) {
				this.fix.header = 'fix-header-large';
				this.fix.userInfo = 'fix-user-info-large';
				this.fix.tryTimer = 'fix-try-timer-large';
				this.fix.rightList = 'fix-right-btn-list-large';
			}
			if (this.dheight < 600) {
				this.fix.header = 'fix-header-small';
				this.fix.userInfo = 'fix-user-info-small';
				this.fix.tryTimer = 'fix-try-timer-small';
				this.fix.rightList = 'fix-right-btn-list-small';
				this.fix.rightBottom = 'fix-bottom'
				this.fix.mainAnimal = 'small-screen'
			}
			if (this.dheight >= 600 && this.dheight <= 640) {
				this.fix.header = 'fix-header-640';
				this.fix.userInfo = 'fix-user-info-640';
				this.fix.tryTimer = 'fix-try-timer-640';
				this.fix.rightList = 'fix-right-btn-list-640';
				this.fix.rightBottom = 'fix-bottom'
				this.fix.mainAnimal = 'small-screen'
			}
			if (this.dheight > 640 && this.dheight <= 750) {
				this.fix.mainAnimal = 'normal-screen'
			}
			const {
				manor_animal: {
					manor_rbtn,
				},
			} = this.$app.getData('config');
			this.getUserInfo();
			this.btn = manor_rbtn;
			this.getManorInfo();
			this.getBoxScrap();
		},
		methods: {
			setTryTimer(endTime) {
				clearInterval(this.tryTimer);
				this.tryTimer = setInterval(() => {
					const now = Math.round(Date.now() / 1000),
						diff = endTime - now;
					
					if (diff <= 0) {
						this.cleanTryTimer();
					} else {
						const time = this.$app.timeGethms(diff);
						
						this.tryTimeDetail = {
							full: endTime,
							d: time.day,
							h: time.hour,
							i: time.min,
							s: time.sec
						}
					}
				}, 1000);
			},
			cleanTryTimer() {
				clearInterval(this.tryTimer);
				this.tryTimer = '';
				this.tryBackground = '';
				this.tryTimeDetail = {};
			},
			goBack() {
				const pages = getCurrentPages();
				if (pages.length == 1) {
					uni.reLaunch({
						url:"/pages/manor/manor"
					})
				} else {
					uni.navigateBack();
				}
			},
			goModelOrPage(item) {
				if (item.hasOwnProperty('path')) {
					this.$app.goPage(item.path);
				}
				if (item.hasOwnProperty('modal')) {
					this.modal = item.modal;
				}
			},
			getUserInfo() {
				this.$app.request('user/info', {
					user_id: this.user_id
				}, res => {
					if (res.data.nickname) {
						this.userInfo = res.data
					} else {
						uni.navigateBack({
							
						})
					}
				})
			},
			getManorInfo() {
				this.$app.request(this.$app.API.OTHER_MANOR_PAGE, {user_id: this.user_id}, res => {
					const {
						manor, 
						main_animal, 
						panacea_reward,
						word,
						main_background,
						try_background,
						box_log,
						lottery_status,
					} = res.data;
					this.manor = manor;
					this.mainAnimal = main_animal;
					this.word = word;
					this.mainBackground = main_background;
					this.tryBackground = try_background;
					this.boxLogList = box_log;
					this.lotteryStatus = lottery_status;
					if (try_background) {
						this.setTryTimer(try_background.time);
					}
				})
			},
			getBoxScrap() {
				let data = {user_id: this.user_id};
				
				this.$app.request("animal_box/list", data, res => {
					this.boxScrapList = res.data;
				})
			},
			lotteryBoxScrap() {
				let data = {user_id: this.user_id};
				uni.showLoading({
					mask:true,
					title:"抽取中..."
				})
				this.$app.request("animal_box/lottery", data, res => {
					const msg = `恭喜你获得${res.data.name}`;
					this.getBoxScrap();
					this.getManorInfo();
					return this.$app.toast(msg, 'success');
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.manor-container-modal-content {
		/deep/ .container .content {
			padding-top: unset!important;
		}
	}
	.manor-container {
		position: relative;
		
		// 屏幕兼容 start
		.secret.normal-screen {
			width: 750rpx!important;
		}
		.secret.small-screen {
			width: 650rpx!important;
		}
		.fix-header-small {
			top: 70rpx!important;
		}
		.fix-user-info-small {
			top: 170rpx!important;
		}
		.fix-try-timer-small {
			top: 280rpx!important;
		}
		.fix-right-btn-list-small {
			top: 170rpx!important;
		}
		.fix-header-640 {
			top: 60rpx!important;
		}
		.fix-user-info-640 {
			top: 160rpx!important;
		}
		.fix-try-timer-640 {
			top: 270rpx!important;
		}
		.fix-right-btn-list-640 {
			top: 160rpx!important;
		}
		.fix-header-large {
			top: 90rpx!important;
		}
		.fix-user-info-large {
			top: 190rpx!important;
		}
		.fix-try-timer-large {
			top: 300rpx!important;
		}
		.fix-right-btn-list-large {
			top: 190rpx!important;
		}
		// end
		
		.background {
			width: 100%;
			height: 1284rpx;
			background-image: url("https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GORNqMVibKH3lQqEq8pJ6wOg2JicOAwYjdt5sjQrbqydPvXRHq98kE39iczYbAtibHPutF1X14FzFLhw/0");
			// background-image: url("https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9EYo3y2NlFPAWCnsfj8xr36xVGzlKdeqOnW4G5JmiavsgjHzgx1jTomDoUxx4KgCickAapmaNt2DerQ/0");
			background-repeat: no-repeat;
			background-position: center center;
			background-size: 100% 100%;
		}
		.bg {
			width: 100%;
			overflow: hidden;
		}
		.add {
			background-color: #FC6257;
			border-radius: 30rpx;
			color: white;
			width: 30rpx;
			height: 30rpx;
		}
		.header {
			position: absolute;
			width: 100%;
			height: 60rpx;
			top: 50rpx;
			padding-left: 30rpx;
			line-height: 60rpx;
			display: flex;
			width: 90%;
			font-size: 32rpx;
			.title {
				display: inline-block;
			}
			.title-and {
				padding-left: 10rpx;
			}
			.title-ios {
				flex: 1;
				text-align: center;
			}
			.left {
				width: 60rpx;
				height: 60rpx;
				transform: rotateY(180deg);
			}
		}
		
		.user-info {
			position: absolute;
			top: 140rpx;
			left: 40rpx;
			display: flex;
			flex-direction: row;
			background-color: rgba(white, 0.5);
			border-radius: 50rpx;

			.avatar {
				width: 100rpx;
				height: 100rpx;
				border-radius: 50rpx;
			}
			.info {
				display: flex;
				flex-direction: column;
				justify-content: center;
				padding: 0 40rpx 0 20rpx;
				.nickname {
					max-width: 300rpx;
					margin-bottom: 5rpx;
					color: #653208;
				}
				.week-output {
					border-top: white 1rpx solid;
					white-space: nowrap;
					display: flex;
					justify-content: space-around;
					.right {
						margin-left: 40rpx;
					}
					.left,.right {
						display: flex;
						justify-content: space-around;
						align-items: center;
						// font-size: 22rpx;
						.icon {
							width: 32upx;
							height: 32upx;
							margin:0 10rpx;
						}
						.number {
							color:#643208;
						}
						.number-label {
							color: #643208;
						}
					}
				}
			}
		}
		
		.try-timer {
			position: absolute;
			top: 250rpx;
			left: 40rpx;
			color: #fff;
			background-color: rgba(#000, .8);
			border-radius: 30upx;
			padding: 5upx 20upx;
			font-size: 24upx;
			display: flex;
			.text {
				padding: 0 10upx;
				color: yellow;
			}
		}
	
		.right-btn-list {
			position: absolute;
			right: 30rpx;
			top: 140rpx;
			z-index: 1; // 防止被图片挡住
			.item {
				width: 110rpx;
				height: 110rpx;
				font-weight: 500;
				// border-radius: 55rpx;
				// background-color: rgba(white, 0.5);
				// background-image: url("https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9EYo3y2NlFPAWCnsfj8xr36ZVutLiajia46W0EWctVh3v8fib8Vk4AhPWcylNb7gluxvJGWI7Gb6lt0g/0");
				background-repeat: no-repeat;
				background-position: center center;
				background-size: 100% 100%;
				display: flex;
				flex-direction: column;
				justify-content: flex-end;
				align-items: center;
				text-shadow: -4rpx 0 black, 0 4rpx black, 4rpx 0 black, 0 -4rpx black;
				color: white;
				// &:not(:last-of-type) {
				// 	margin-bottom: 20rpx;
				// }
			}
		}
		
		.normal-main {
			transform: translate(-50%, -50%);
			left: 44%;
			top: 60%;
		}
		.secret-main {
			transform: translate(-50%);
			bottom: 170rpx;
			left: 50%;
		}
		.main-animal {
			position: absolute;

			.word {
				width: 260rpx;
				color: #653208;
				height: 80rpx;
				text-align: center;
				background-image: url('https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9EYo3y2NlFPAWCnsfj8xr36oMHsTH5c6R9rEEcUr4ICtc4DbkYSahVc5Y8dbsn2wZWroBzepkThMQ/0');
				background-position: center center;
				background-repeat: no-repeat;
				background-size: 100% 100%;
				padding-top: 15rpx;
				margin: 0 auto;
			}
			
			.animal {
				// width: 400rpx;
				// height: 400rpx;
			}
			.secret {
				width: 850rpx;
			}
			.normal {
				width: 400rpx;
				height: 400rpx;
			}
			
		}
		
		.box-container {
			background: linear-gradient(0deg, #EFFFEC, #7ACFFF);
			.title {
				text-align: center;
				width: 100%;
				padding-top: 40rpx;
			}
			.notice {
				margin: 20upx;
				background:#fff;
				border-radius:19upx;
				display: flex;
				justify-content: flex-start;
				.notice-icon {
					margin:0;
					margin-left: 4%;
					width: 35upx;
					align-self: center;
					height: 35upx;
					border-radius:50%;
				}
				.notice-info {
					margin: 10upx 5%;
					flex: 1;
					display: inline-block;
					overflow: hidden;
					height: 50upx;
					swiper {
						height: 50upx;
					}
					.notice-item {
						display: flex;
						justify-content: flex-start;
						.notice-avatar {
							width: 50upx;
							height: 50upx;
							border-radius:50%;
							margin-right: 10upx;
						}
						.notice-con {
							flex: 1;
							height: 50upx;
							margin-right: 10%;
							display: inline-block;
							font-size:26upx;
							line-height: 50upx;
						}
					}
				}
			}
			.main {
				width: 100%;
				height: 500rpx;
				position: relative;
				.main-image{
					height: 360rpx;
					width: 460rpx;
				}
				.position-1 {
					left: 150rpx;
					top: 40rpx
				}
				.position-2 {
					left: 120rpx;
					top: 140rpx;
				}
				.position-3 {
					left: 150rpx;
					top: 240rpx;
				}
				.position-4 {
					left: 220rpx;
					top: 340rpx;
				}
				.position-5 {
					left: 320rpx;
					top: 320rpx;
				}
				.position-6 {
					left: 270rpx;
					top: 40rpx;
				}
				.position-7 {
					left: 440rpx;
					top: 340rpx;
				}
				.position-8 {
					left: 460rpx;
					top: 210rpx;
				}
				.position-9 {
					right: 180rpx;
					top: 60rpx;
				}
				.position-10 {
					left: 550rpx;
					top: 270rpx;
				}
				.position-11 {
					left: 550rpx;
					top: 140rpx;
				}
				.position-12 {
					left: 380rpx;
					top: 0rpx;
				}
				.box-position {
					position: absolute;
					.box-scrap {
						position: relative;
						width: 100rpx;
						height: 100rpx;
						.scrap-bg {
							width: 100rpx;
							height: 100rpx;
							z-index: 2;
						}
						.scrap-item {
							z-index: 1;
							width: 80rpx; 
							height: 80rpx;
						}
						.scrap-num {
							position: absolute;
							right: 0;
							bottom: 0;
							z-index: 2;
						}
					}
				}
			}
		
			.bottom {
				padding: 0 40rpx 40rpx;
				.desc {
					background-color: #fff;
					border-radius: 50rpx;
					color: #B5B5B4;
					padding: 20rpx 30rpx;
				}
				.btn {
					padding: unset;
				}
			}
		}
	}
</style>
