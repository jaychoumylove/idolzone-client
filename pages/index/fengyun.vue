<template>
	<view class="container">
		<view class="swiper-container" v-if="topImg.star">
			<image class='img' :src="topImg.star.head_img_l" mode="aspectFill"></image>
			<view class="bottom-hold" v-if="$app.getData('config').version != $app.getData('VERSION') ||  $app.getData('platform')!='MP-WEIXIN'">
				<image class="bg" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FctOFR9uh4qenFtU5NmMB5TZUvVibQBxK00NyCdWmK7QNRDKdkAn4xFuXtEYgY4ib2gL4dEh0RIyIg/0"
				 mode=""></image>
				<view class="content position-set flex-set">
					<image :src="topImg.user.avatarurl" class="avatar" mode=""></image>
					<text class="text-overflow" style="max-width: 250upx;">{{topImg.user.nickname}}</text> 为 <text>{{topImg.star.name}}</text>
					占领了封面
				</view>
			</view>
		</view>
		<view class="swiper-container" v-else @tap="$app.goPage('/pages/notice/notice?id=1')">
			<image class='img' :src="$app.getData('config').index_banner.img" mode="aspectFill"></image>
		</view>
		
		<view class="occopy">
			<view class="diff flex-set" v-if="!rankList.length">
				无人占领
			</view>
			<view class="diff flex-set" v-else>
				<view v-if="diff>0">
					还差{{$app.formatNumber(diff)}}
					<image src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTERziauZWDgQPHRlOiac7NsMqj5Bbz1VfzicVr9BqhXgVmBmOA2AuE7ZnMbA/0"
					 mode="widthFix"></image>
					第一
				</view>
				<text v-else>您已占领</text>
			</view>
			<view class="btn" @tap="openSend">
				<btnComponent type="default">
					<view class="get-bg">
						打榜抢占封面
					</view>
				</btnComponent>
			</view>
		</view>
		
		<view class="recharge">
			<view class="content">
				<view class="header">
					<view class="bg">
						{{notice.title || ''}}
					</view>
				</view>
				<view class="desc">
					<view class="p" v-for="(item, index) in notice.content" :key="index">{{item}}</view>
				</view>
			</view>
		</view>
		
		<!-- 列表 -->
		<view class="rank-list-container">
			<view class="rank-list-item" v-for="(item,index) in rankList" :key="index">
				<view class="num">{{index+1}}</view>
				<view class='avatar-wrap'>
					<image class="avatar" :src="item.user.avatarurl" mode="aspectFill"></image>
					<image class="headwear position-set" :src="item.user.headwear&&item.user.headwear.img" mode=""></image>
				</view>
				<view class="content">
					<view class="top">
						<view class="name text-overflow">{{item.user.nickname}}</view>
						<view class="star flex-set text-overflow">{{item.star.name}}</view>
					</view>
					
					<view class="bottom">
						贡献{{$app.formatNumber(item.count||0)}}
						<image class="icon-heart" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTERziauZWDgQPHRlOiac7NsMqj5Bbz1VfzicVr9BqhXgVmBmOA2AuE7ZnMbA/0"
						 mode=""></image>
					</view>
				</view>
				
				<view class="right" v-if="index < 1">
					{{item.top_minute > 0 ? `占领${item.top_minute}分钟`: '刚刚占领'}}
				</view>
			</view>

		</view>

		<!-- 打榜 -->
		<modalComponent type="send" v-if="modal == 'send'" title="pick" @closeModal="modal=''">
			<view class="send-modal-container">
				<view class="switch-wrap">
					<switch :checked="!danmakuClosed" @change="danmakuSwitch" />弹幕
					
					<block v-if="extHot.percent&&extHot.percent>0">
						<!-- <view class="absolute-dog4" v-if="current==0" @tap="goExtraHotPage">
							冲榜后额外赠送<text style="color: #fb8100;">{{$app.formatFloatNum(extHot.percent*100, 2)}}%</text>
							<text>金豆<text class="iconfont iconicon-test1"></text></text>
						</view> -->
						<view class="absolute-dog4" v-if="current==1" @tap="goExtraHotPage">
							冲榜后额外赠送<text style="color: #FF0019;">{{$app.formatFloatNum(extHot.percent*100, 2)}}%</text>
							<text>鲜花<text class="iconfont iconicon-test1"></text></text>
						</view>
						<text class="absolute-go-dog" style="left: 400rpx;">1{{current==0 ? "金豆": "鲜花"}} = 1人气</text>
					</block>
					<text v-else class="absolute-go">1{{current==0 ? "金豆": "鲜花"}} = 1人气</text>
					<!-- <text class="absolute-go">1{{current==0 ? "金豆": "鲜花"}} = 1人气</text> -->
				</view>

				<!-- <view v-if="$app.getData('config').version != $app.getVal('VERSION')" :class="{mt6: extHot.percent&&extHot.percent>0}" class="swiper-change flex-set">
					<view class="item" :class="{select:current==0}" @tap="current = 0;sendCount=''">送金豆</view>
					<view class="item" :class="{select:current==1}" @tap="current = 1;sendCount=''">送鲜花</view>
					<view class="item" v-if="$app.getData('config').old_coin_open=='1'&&userCurrency.old_coin>0" :class="{select:current==2}"
					 @tap="current = 2;sendCount=''">送旧豆</view>
				</view> -->

				<view class="swiper-item" :class="{mt6: extHot.percent&&extHot.percent>0}">
					<view class="wrap">
						<view class="btn-wrapper">
							<view class="btn flex-set" @tap="sendHot(item)" v-for="(item,index) in send_num_list" :key="index">
								<image v-if="current==0" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FctOFR9uh4qenFtU5NmMB5uWEQk2MTaRfxdveGhfFhS1G5dUIkwlT5fosfMaW0c9aQKy3mH3XAew/0"
								 mode="widthFix"></image>
								<image v-if="current==1" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTERziauZWDgQPHRlOiac7NsMqj5Bbz1VfzicVr9BqhXgVmBmOA2AuE7ZnMbA/0"
								 mode="widthFix"></image>
								<image v-if="current==2" src="https://mmbiz.qpic.cn/mmbiz_png/h9gCibVJa7JXlbbzMr1KRN6DJJyCKicqpD86VGeUeoibFPryXF3iaSF1bJba11sBtrCg6SNpEAxxPCyB2ictoq4Iia2Q/0"
								 mode="widthFix"></image>
								+{{item}}
							</view>

							<view class="btn flex-set self-input">
								<input class="" :value="sendCount" @input="setSendCount" type="number" placeholder="自定义数额" />
							</view>
							<view class="btn flex-set pick" @tap="sendHot()">冲榜</view>
						</view>

						<view class="bottom-wrapper">
							<view v-if="current==0" class="text left flex-set">我的金豆：{{userCurrency['coin']}}</view>
							<view v-if="current==1" class="text left flex-set">我的鲜花：{{userCurrency['flower']}}</view>
							<view v-if="current==2" class="text left flex-set">我的旧豆：{{userCurrency['old_coin']}}</view>
							<block v-if="$app.getData('config').version != $app.getData('VERSION') ||  $app.getData('platform')!='MP-WEIXIN'">
								<view v-if="$app.chargeSwitch()==0" class="right" @tap="$app.goPage('/pages/charge/charge')">
									充值<text class="iconfont iconjiantou"></text>
								</view>
								<button v-else-if="$app.chargeSwitch()==2&&current==0" open-type="contact">
									<view class="right reply">回复"1"获取更多金豆</view>
								</button>
								<button v-else-if="$app.chargeSwitch()==2&&current==1" open-type="contact">
									<view class="right reply">回复"1"获取更多鲜花</view>
								</button>
							</block>

						</view>
					</view>
				</view>
			</view>
		</modalComponent>
	</view>
</template>

<script>
	import listItemComponent from '@/components/listItemComponent.vue';
	import btnComponent from "@/components/btnComponent.vue";
	import modalComponent from "@/components/modalComponent.vue";
	
	export default {
		components: {
			listItemComponent,
			btnComponent,
			modalComponent,
		},
		data() {
			return {
				rankField: 'fengyun',
				rankList: [],
				page: 1,
				size: 10,
				end: false,
				star: {},
				topImg: {},
				my: 0,
				diff: 0,
				danmakuClosed: false,
				current: 1,
				extHot: {},
				userCurrency: {},
				send_num_list: [99, 520, 1314, 9999, 66666, '全送'],
				sendCount: '',
				modal: '',
				notice: {},
			};
		},
		onShow() {
			this.notice = this.$app.getData('config').occupy_notice;
			this.getBannerTop()
			this.getMyRank()
			this.getRankList()
			this.getExtraSendHot()
			this.userCurrency = this.$app.getData('userCurrency')
			this.star = this.$app.getData('userStar')
		},
		onReachBottom() {
			this.page++
			this.getRankList()
		},
		methods: {
			// 打榜弹幕开关
			danmakuSwitch(e) {
				this.danmakuClosed = !e.detail.value
				this.$app.setData('danmakuClosed', !e.detail.value)
			},
			// 获取打榜额外的加成
			getExtraSendHot() {
				this.$app.request(this.$app.API.STAR_EXTRA_SEND_HOT, {}, res => {
					this.extHot = res.data;
				})
			},
			setSendCount(e) {
				this.sendCount = e.target.value;
			},
			openSend() {
				this.modal = 'send';
			},
			cleanSend() {
				this.modal = '';
				this.sendCount = '';
			},
			sendHot(count) {
				if (count == '全送') {
					const typeMap = ['coin', 'flower', 'old_coin'];
					this.sendCount = this.userCurrency[typeMap[this.current]];
				} else {
					if (count) this.sendCount = parseInt(count)
					if (!this.sendCount) {
						return this.$app.toast('数额不正确')
					}
					const typeMap = ['coin', 'flower', 'old_coin'];
					const numbers = this.userCurrency[typeMap[this.current]];
					if (this.sendCount > numbers) {
						const typeMsgMap = ['金豆', '鲜花', '旧豆'];
						return this.$app.toast(`${typeMsgMap[this.current]}不足`);
					}
				}
				uni.showLoading({
					title:"打榜中...",
					mask: true
				});
				const sendData = {
					starid: this.star.id,
					hot: parseInt(this.sendCount),
					type: this.current + 1,
					danmaku: Number(!this.danmakuClosed),
				};
				this.$app.request(this.$app.API.STAR_SENDHOT, sendData, res => {
					this.cleanSend()
					this.$app.toast("打榜成功", 'success')

					this.$app.request(this.$app.API.USER_CURRENCY, {}, res => {
						this.$app.setData('userCurrency', res.data)
						this.userCurrency = res.data
					})
					this.refresh();
					this.getBannerTop();
					this.getMyRank();
				}, 'POST', true)
			},
			goExtraHotPage() {
				uni.navigateTo({
					url: "/pages/active/weal"
				})
			},
			getMyRank() {
				this.$app.request(this.$app.API.STAR_MYRANK, {}, res => {
					this.my = res.data;
					if (this.topImg.hasOwnProperty('count')) {
						const diff = parseInt(this.topImg.count - this.my)
						if (diff < 0) {
							this.getBannerTop()
						} else {
							this.diff = diff
						}
					}
				})
			},
			getBannerTop() {
				this.$app.request('banner/top', {}, res => {
					if (res.data instanceof Array) {
						if (res.data.length) this.topImg = res.data;
					}
					if (res.data instanceof Object) {
						const length = Object.keys(res.data).length;
						if (length) this.topImg = res.data;
					}
					this.diff = parseInt(this.topImg.count - this.my)
				})
			},
			changeField(field) {
				this.page = 1
				this.rankField = field
				this.keywords = ''
				this.end = false;
				this.getRankList()
			},
			refresh() {
				this.page = 1;
				this.end = false;
				this.getRankList()
			},
			getRankList() {
				if (this.end) return;
				this.$app.request(this.$app.API.STAR_RANK, {
					page: this.page,
					size: this.size,
					rankField: this.rankField,
				}, res => {
					this.rankList = this.page == 1 ? res.data: this.rankList.concat(res.data);
					if (res.data.length < this.size) this.end = true;
				})
			},
		},
	}
</script>

<style lang="scss" scoped>
	.container {
		.reply {
			color: #FC3131;
			border-bottom: 2rpx solid #FFD4D4;
			font-size: 23rpx;
		}
		.swiper-container {
			margin: 5upx 30upx;
			height: 250upx;
			border-radius: 30upx;
			overflow: hidden;
			position: relative;
			z-index: 1;
		
			.banner {
				width: 690upx;
				height: 250upx;
				background: url('https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTERVpWtSSpwicFERRz0Wa4Nw9AG4iaH5mBbnjW6zmm26oETkLm86mfk8srw/0') no-repeat left top;
				background-size: cover;
			}
		
			.bottom-hold {
				position: absolute;
				z-index: 3;
				bottom: 0;
				left: 0;
				height: 100upx;
				width: 100%;
				.bg {
					position: absolute;
				}
				.content {
					top: 73%;
					width: 100%;
					color: #FFF;
					font-size: 26upx;
		
					.avatar {
						width: 40upx;
						height: 40upx;
						border-radius: 50%;
					}
					text {
						color: #fbb225;
						margin: 0 4upx;
					}
				}
			}
		
		}
		
		.tab-container {
			padding: 20upx 40upx;
			display: flex;
			align-items: center;
			justify-content: space-around;

			.tab-item {
				position: relative;
				margin: 0 20upx;
			}

			.tab-item.active {
				font-size: 30upx;
				font-weight: 700;
			}

			.tab-item.active::before {
				position: absolute;
				content: "";
				height: 8upx;
				width: 50upx;
				border-radius: 14upx;
				bottom: -10upx;
				left: 50%;
				transform: translateX(-50%);
				background-color: #f00;
			}
		}
		.occopy {
			margin: 30upx auto;
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			height: 66upx;
			.diff {
				white-space: nowrap;
				background: url("https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9HUKRibxkbQUYy5TEicA6o19gNcLebseoWjl26dZtg8I3O23xxlMR3411YubWXiaLWDpQhmdiaIs1ywyQ/0") no-repeat center center/100% 100%;
				color: #723511;
				padding: 10rpx 30rpx;
				font-size: 24rpx;
				line-height: 45rpx;
				border-radius: 30rpx;
				view {
					image {
						width: 40rpx;
						height: 40rpx;
						padding: 0 5rpx;
					}
				}
			}
			.btn {
				.get-bg {
					background: url("https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FDIxqXSWnDQQ5LzdoiabR5H9ExaSicdZ8yqq8r8icAYB1hdgETfL2MWCkbj47rm6ljtHITZdeAB8RoQ/0") no-repeat center center;
					background-size: cover;
					padding: 10upx 30upx;
					font-size:24upx;
					color: white;
					line-height:45upx;
					border-radius:30upx;
				}
			}
		}
		
		.recharge {
			margin: 60upx 20upx 0;
			background: rgba(#FFE5D5, 0.35);
			
			.content {
				position: relative;
				.header {
					position: absolute;
					top: 0;
					left: 50%;
					transform: translate(-50%,-50%);
					background:rgba(255,230,115,1);
					border-radius:0px 0px 60px 60px;
					padding: 5upx 10upx;
					.bg {
						background:rgba(236,121,52,1);
						border-radius:0px 0px 60px 60px;
						padding: 10upx 40upx;
						font-size: 24upx;
						color: white;
						margin: 0 auto;
						text-align: center;
						white-space: nowrap;
					}
				}
				.desc {
					padding: 40upx 40upx 20upx;
					font-size: 24upx;
					color: rgba(0,0,0,0.5);
				}
			}
		}

		.rank-list-container {

			.rank-list-item {
				display: flex;
				align-items: center;
				background-color: #FFF;
				margin: 20upx 30upx;
				box-shadow: 0 2upx 16upx rgba(#999, .3);

				border-radius: 30upx;
				overflow: hidden;

				.num {
					width: 80upx;
					padding: 10upx 20upx;
				}
				
				.avatar-wrap {
					position: relative;
					
					.avatar {
						width: 80upx;
						height: 80upx;
						border-radius: 50%;
					}
				
					.headwear {
						width: 150%;
						height: 150%;
					}
				}

				.content {
					padding: 10upx 20upx;
					line-height: 1.6;
					max-width: 470upx;

					.top {
						display: flex;
						align-items: center;

						.name {
							font-size: 30upx;
							color: #000;
							flex: 1;
						}

						.star {
							border-radius: 20upx;
							background-color: #82c7d4;
							color: #FFF;
							padding: 0 10upx;
							margin: 0 10upx;
							font-size: 22upx;
						}
					}
				}
				
				.right {
					margin: auto;
					margin-right: 30upx;
					background: url("https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FDIxqXSWnDQQ5LzdoiabR5HFHgxY7B1FfibCtvYOGsAZKp7iaax42lMLw045SsDttnu8QR56y21vE7g/0") no-repeat center center;
					background-size: cover;
					width: 170upx;
					height: 60upx;
					line-height: 50upx;
					text-align: center;
					color: #723511;
				}
				.bottom {
					display: flex;
					align-items: center;
					font-size: 26upx;
				
					.hot-count {
						color: $text-color-1;
						margin-right: 4upx;
					}
				
					.icon-heart {
						width: 24upx;
						height: 24upx;
					}
				}

			}

		}

		.mt6 {
			margin-top: 60upx !important;
		}
		
		.img4 {
			width: 40upx;
			height: 40upx;
		}
	
		.send-modal-container {
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			position: relative;

			.switch-wrap {
				position: absolute;
				top: -60upx;
				left: 20upx;
				font-size: 34upx;
				transform: scale(0.7);
			}
			
			.absolute-dog4 {
				position: absolute;
				left: 100%;
				top: 0;
				width: 440%;
				font-size: 40upx;
				font-weight: 500;
				text-align: center;
			}

			.absolute-go {
				position: absolute;
				left: 400rpx;
				width: 220rpx;
			}

			.absolute-go-dog {
				position: absolute;
				left: 0rpx;
				top: 80rpx;
				width: 220rpx;
			}

			.explain-wrapper {
				font-size: 24upx;
			}

			.swiper-change {
				margin: 30upx;
				border-radius: 30upx;
				overflow: hidden;
				box-shadow: 0 2upx 4upx rgba(0, 0, 0, .3);

				.item {
					width: 200upx;
					height: 50upx;
					line-height: 50upx;
					background-color: #FFF;
					text-align: center;
				}

				.item.select {
					background-color: #ffc918;
					color: #2d1408;
				}

			}

			swiper {
				width: 100%;
				height: 100%;
			}

			.swiper-item {
				flex: 1;

				.wrap {
					position: relative;
					width: 100%;
				}
				.mt5 {
					margin-top: 50upx;
				}
			}

			.btn-wrapper {
				display: flex;
				flex-wrap: wrap;
				justify-content: center;

				.btn {
					border-radius: 10upx;
					margin: 8upx 16upx;
					width: 190upx;
					height: 100upx;
					color: $text-color-1;
					border: 2upx solid $text-color-1;

					image {
						width: 40upx;
						height: 40upx;
					}
				}

				.btn.self-input {
					width: 412upx;

					input {
						// background-color: ￥;
						border-radius: 60upx;
						width: 100%;
						height: 110upx;
						text-align: center;
						line-height: 110upx;
					}
				}

				.btn.pick {
					font-size: 34upx;
					font-weight: 700;
					background-color: #f8648a;
					color: #FFF;
				}
			}

			.bottom-wrapper {
				border-top: 2upx solid #EEE;
				margin: 20upx 60upx;
				padding: 20upx 0;
				color: $text-color-1;
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 80%;

				.btn {
					text-decoration: underline;
					margin: 10upx;
				}

				.right {
					font-weight: 700;

					.iconfont {
						font-size: 24upx;
					}
				}
			}
		}
	}
</style>
