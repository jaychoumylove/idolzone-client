<template>
	<view class="index-page-container">
		<!-- <button type="primary" @tap="consolee">CONSOLE</button> -->
		<!-- 顶部navi -->
		<view class="top-container">
			<view class="left-wrap">
				<text class="iconfont iconfangdajing flex-set"></text>
				<input class="input" type="text" :value="keywords" @input="searchInput" placeholder="搜索爱豆名字" />
			</view>

			<view v-if="$app.getData('config').version != $app.getData('VERSION') ||  $app.getData('platform')!='MP-WEIXIN'"
			 class="right-wrap" @tap="$app.goPage('/pages/notice/notice?id=1')">榜单福利<text class="iconfont iconinfo"></text></view>
		</view>

		<!-- banner风云榜 -->
		<view class="swiper-container" v-if="topImg.star" @tap="goTofengyun()">
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
		<view class="swiper-container" v-else @tap="$app.goPage(default_index_banner_url)">
			<image class='img' :src="$app.getData('config').index_banner.img" mode="aspectFill"></image>
		</view>

		<!-- tab -->
		<view class="tab-container">
			<view class="left-wrap">
				<block v-for="(item,index) in $app.getData('config').index_rank" :key="index">
					<view class="tab-item" :class="{active:rankField == item.field, colorful:item.style}" @tap="changeField" :data-item="item">
						{{item.name}}					
						<image v-if="item.style" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9EvovQTL1wN2eVOwZPOcrpFzOIch0hHclOYTgBP53aRpIYOBEReaeD20Pnib51Qf9HQ1bO2GMV0icHA/0"
						 mode="aspectFill" style="width: 34upx; height: 28upx;"></image>
					</view>
				</block>
			</view>
			<view class="right-wrap" @tap="$app.goPage('/pages/index/rank')">往期榜单<text class="iconfont iconicon_workmore"></text></view>
		</view>
		<block v-if="rankField!='fengyun'">
			<!-- 前三 -->
			<view class="topthree-container" v-if="!keywords">
				<!-- <view class="remaintime">本期截止：{{cutOffDate}}</view> -->
				<view class="row-info">

					<view class="content" @tap="goGroup(rankList[1]&&rankList[1].star.id)">
						<view class="avatar-wrap">
							<image class="bg" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9Equ3ngUPQiaWPxrVxZhgzk9eJFfnnRCICicicZI1QKbEwDTLpCAqbUlCFhYFp0okTicNRpoZHaxXJXNQ/0"
							 mode=""></image>
							<image class='avatar position-set' :src="rankList[1]&&rankList[1].star.head_img_s" mode="aspectFill"></image>
						</view>
						<view class="starname">{{rankList[1]&&rankList[1].star.name}}</view>
						<view class="hot">
							<image src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTERabwYgrRn5cjV3uoOa8BonlDPGMn7icL9icvz43XsbexzcqkCcrTcdZqw/0"
							 mode=""></image>{{$app.formatNumber(rankList[1]&&rankList[1].hot||0)}}
						</view>
						<view class="score" v-if="rankList[1]&&rankList[1].score">累计{{rankList[1]&&rankList[1].score||0}}分</view>
					</view>
					<view class="content mid" @tap="goGroup(rankList[0]&&rankList[0].star.id)">
						<view class="avatar-wrap">
							<image class="bg" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9Equ3ngUPQiaWPxrVxZhgzk9D0G7NbQic3qWC5phiaopNWhKb9a2IY29hBLbOtqRblDq7kA98uz4GYiaA/0"
							 mode=""></image>
							<image class='avatar position-set' :src="rankList[0]&&rankList[0].star.head_img_s" mode="aspectFill"></image>
						</view>
						<view class="starname">{{rankList[0]&&rankList[0].star.name}}</view>
						<view class="hot">
							<image src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTERabwYgrRn5cjV3uoOa8BonlDPGMn7icL9icvz43XsbexzcqkCcrTcdZqw/0"
							 mode=""></image>{{$app.formatNumber(rankList[0]&&rankList[0].hot||0)}}
						</view>
						<view class="score" v-if="rankList[0]&&rankList[0].score">累计{{rankList[0]&&rankList[0].score||0}}分</view>
					</view>
					<view class="content" @tap="goGroup(rankList[2]&&rankList[2].star.id)">
						<view class="avatar-wrap">
							<image class="bg" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9Equ3ngUPQiaWPxrVxZhgzk9WneYzo7nmBCMjaicxicaSRQKU3xytQClx6t9kuM4HTg5P4YLxNhmhzcw/0"
							 mode=""></image>
							<image class='avatar position-set' :src="rankList[2]&&rankList[2].star.head_img_s" mode="aspectFill"></image>
						</view>
						<view class="starname">{{rankList[2]&&rankList[2].star.name}}</view>
						<view class="hot">
							<image src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTERabwYgrRn5cjV3uoOa8BonlDPGMn7icL9icvz43XsbexzcqkCcrTcdZqw/0"
							 mode=""></image>{{$app.formatNumber(rankList[2]&&rankList[2].hot||0)}}
						</view>
						<view class="score" v-if="rankList[2]&&rankList[2].score">累计{{rankList[2]&&rankList[2].score||0}}分</view>
					</view>

				</view>
				<image class='three-taijie' src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9Equ3ngUPQiaWPxrVxZhgzk9XQawnfQibl4Xfmpv9QndYf6ImwrXWsYWuybIj1drd6FUPQlHG8iaMpOg/0"
				 mode="aspectFill"></image>
			</view>

			<!-- 列表 -->
			<view class="rank-list-container">
				<view class="rank-list-item" v-for="(item,index) in rankList" :key="index" v-if="keywords || index>2" @tap="goGroup(item.star.id)">

					<listItemComponent :rank="!keywords?index+1:''" :avatar="item.star.head_img_s">

						<template v-slot:left-container>
							<view class="left-container">
								<view class="star-name">{{item.star.name}}</view>
								<view class="bottom-text">
									<view class="hot-count">{{$app.formatNumber(item.hot)}}</view>
									<image class="icon-heart" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTERabwYgrRn5cjV3uoOa8BonlDPGMn7icL9icvz43XsbexzcqkCcrTcdZqw/0"
									 mode=""></image>
								</view>
							</view>
						</template>
						
						<template v-slot:center-container>
							<view class="center-container">
								<view class="score" v-if="item.score">累计{{item.score}}分</view>
							</view>
						</template>

						<template v-slot:right-container>
							<view class="right-container">
								<view class="btn flex-set">打榜</view>
							</view>
						</template>
					</listItemComponent>

				</view>
				<!-- <loadIconComponent v-if="showBottomLoading"></loadIconComponent> -->

			</view>
		</block>
		<view class="rank-list-container" v-else>
			<view class="rank-list-item-s" v-for="(item,index) in rankList" :key="index">
				<view class="num">{{index+1}}</view>
				<image class="avatar" :src="item.user.avatarurl" mode=""></image>
				<view class="content">
					<view class="top">
						<view class="name text-overflow">{{item.user.nickname}}</view>
						<view class="star flex-set text-overflow">{{item.star.name}}</view>
					</view>
					<view class="bottom">贡献{{item.count||''}}</view>
				</view>
			</view>

		</view>

		<view class="open-ad-container flex-set" v-if="($app.getData('config').version != $app.getData('VERSION') ||  $app.getData('platform')!='MP-WEIXIN') && modal=='indexBanner' && $app.getData('config').index_open && $app.getData('config').index_open.img">
			<block v-if="$app.getData('config').isBirthday==1">
				<view class="mains">
					<view class="birStarHead"> 
						<image src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9HGIVCLeG1pTUpKKvSl87hVCWia9B0QxJmPJpj1mBh7FDXDBibBSFSLGKTSgA6obibnFdWV8jicsXs4XQ/0"></image>
						<image class="birStarHeadImg" :src="$app.getData('userStar').head_img_s"></image>
					
					<image src="/static/image/birthday/cake.png" mode="aspectFit" class="birStarCake"></image>
					</view>
					<view class="birContent">
					<view style="font-size: 40rpx;" class="birMarginLg"><text style="color: #F1AF00;">{{$app.getData('userStar').name}}</text>生日快乐</view>
					
					<view v-if="$app.chargeSwitch()!=1" class="birMarginLg"><view>圈子内专属特权</view>今日购买鲜花可获得<text style="color: #D42D00;">双倍奖励</text></view>
					<view v-if="$app.chargeSwitch()==2" class="birMarginLg"><button open-type="contact" :session-from="$app.getData('userInfo')" class="birButton" @tap="modal = ''">回复“1”去购买</button></view>
					<view v-if="$app.chargeSwitch()==0" class="birMarginLg" ><button @tap="modal = '',$app.goPage('/pages/charge/charge')" class="birButton">去充值</button></view>
					<view v-if="$app.chargeSwitch()==1" class="birMarginLg" ><button @tap="modal = ''" class="birButton">我知道了</button></view>
					</view>
				</view>
			</block>
			<block v-else>
				<image class="main" :src="$app.getData('config').index_open.img" mode="aspectFill" @tap="modal='';$app.goPage($app.getData('config').index_open.url)"></image>
			</block>
			<view class="close-btn flex-set iconfont iconclose" @tap="modal = ''"></view>
		</view>
	</view>
</template>

<script>
	import modalComponent from '@/components/modalComponent.vue'
	import bannerComponent from '@/components/bannerComponent.vue';
	import btnComponent from '@/components/btnComponent.vue';
	import listItemComponent from '@/components/listItemComponent.vue';
	export default {
		components: {
			bannerComponent,
			btnComponent,
			listItemComponent,
			modalComponent,
		},
		data() {
			return {
				default_index_banner_url: this.$app.getData('config').index_banner && this.$app.getData('config').index_banner.url ||
					'',
				theme: this.$app.getData('theme') || 0,
				modal: 'indexBanner',
				showBottomLoading: true,

				page: 1, // 当前页码
				keywords: '', // 关键字搜索
				rankField: 'week_hot', // 排名类别
				sign: 0, // 标记
				rankList: this.$app.getData('index_rankList') || [], // 排名列表

				topImg: {}, // 风云榜
				// bannerList: [],

				cutOffDate: '', // 截止日期
				// muti: false,
			};
		},

		onLoad(option) {
			this.getSunday()

			// 跳转到指定页
			if (option.path) {
				return this.$app.goPage(option.path)
			}
			// 跳转到明星页
			if (option.starid) {
				this.starid = option.starid
				return this.goGroup(this.starid)
			}
		},
		onShow() {
			this.page = 1
			this.keywords = ''
			this.getRankList()
			this.getBannerList()
		},
		onShareAppMessage() {
			return this.$app.commonShareAppMessage()
		},
		onHide() {
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 0,
			})
		},
		/**
		 * 上拉加载
		 */
		onReachBottom() {
			if (!~this.rankField.indexOf('last')) {
				this.page++
				this.getRankList()
			}
		},
		methods: {
			goTofengyun() {
				if (this.$app.getData('config').version == this.$app.getData('VERSION')) return
				this.$app.goPage('/pages/index/fengyun')
			},
			/**
			 * 去圈子
			 */
			goGroup(starid) {
				this.modal = 'qrcode'

				if (this.$app.getData('userStar')['id'] == starid) {
					this.$app.goPage('/pages/group/group')
				} else {
					this.$app.goPage('/pages/group/star?starid=' + starid)
				}
				return
			},
			getLast() {
				var date = new Date();
				var currentMonth = date.getMonth();
				var nextMonth = ++currentMonth;
				var nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
				var oneDay = 1000 * 60 * 60 * 24;
				let dateTime = new Date(nextMonthFirstDay - oneDay);

				this.cutOffDate = dateTime.getMonth() + 1 + '月' + dateTime.getDate() + '日'
			},
			getSunday() {
				const time = new Date()
				const day = time.getDay() || 7
				time.setDate(time.getDate() - day + 7)
				this.cutOffDate = (time.getMonth() + 1) + '月' + time.getDate() + '日'
			},
			changeField(e) {
				let item = e.target.dataset.item
				if (item.field) {
					this.page = 1
					this.keywords = ''
					this.rankField = item.field
					this.getRankList()
				} else if (item.url) {
					this.$app.goPage(item.url)
				}
			},
			searchInput(e) {
				if (!this.keywords || !e.detail.value) this.rankList = []
				this.page = 1
				this.sign = 0
				this.rankField = 'week_hot'
				this.keywords = e.detail.value
				this.getRankList()
			},

			getBannerList() {
				this.$app.request('banner/top', {}, res => {
					this.topImg = res.data
				})
			},
			getRankList() {
				this.$app.request(this.$app.API.STAR_RANK, {
					page: this.page,
					rankField: this.rankField,
					keywords: this.keywords,
					sign: this.sign,
				}, res => {
					if (this.rankField != 'fengyun') {
						if (res.data.length < 10) {
							// 内容不足隐藏loadicon
							this.showBottomLoading = false
						}

						if (this.page == 1) {
							this.rankList = res.data
							this.$app.setData('index_rankList', res.data)
						} else {
							// 追加data
							this.rankList = this.rankList.concat(res.data)
						}
					} else {
						// 小时贡献榜
						if (this.page == 1) {
							this.rankList = res.data
						} else {
							this.rankList = this.rankList.concat(res.data)
						}
					}

				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.index-page-container {
		.score{
			color: #D89D59;
		}
		
		.top-container {
			padding: 20upx 30upx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.left-wrap {
				flex: 1;
				position: relative;
				color: #c6c9cc;

				.iconfont {
					position: absolute;
					left: 20upx;
					top: 50%;
					transform: translateY(-50%);
				}

				.input {
					background-color: #f1f2f6;
					border-radius: 30upx;
					padding: 0 60upx;
					height: 50upx;
					color: $text-color-1;
				}
			}

			.right-wrap {
				margin-left: 20upx;

				.iconfont {
					margin: 0 10upx;
				}
			}
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
			font-size: 28upx;
			display: flex;
			padding: 20upx 20upx;
			align-items: center;
			justify-content: space-between;

			.left-wrap {
				display: flex;
				align-items: center;

				.tab-item {
					position: relative;
					margin: 0 15upx;
				}

				.tab-item.active {
					font-size: 34upx;
					font-weight: 700;
				}

				.tab-item.active::before {
					position: absolute;
					content: "";
					height: 8upx;
					width: 50upx;
					width: 60%;
					border-radius: 14upx;
					bottom: -10upx;
					left: 50%;
					transform: translateX(-50%);
					background-color: $bg-color-2;
				}
				
				.colorful{
					color: #E938A3;
				}
			}

		}

		.topthree-container {
			padding: 0 30upx;
			margin: 30upx 0 -25upx;
			position: relative;

			.remaintime {
				position: absolute;
				right: 40upx;
				top: -50upx;
				font-size: 18upx;
				color: #bbb;
			}

			.row-info {
				position: relative;
				z-index: 2;
				padding: 0 30upx;
				display: flex;
				justify-content: space-between;

				.content {
					flex: 1;
					height: 100%;
					display: flex;
					flex-direction: column;
					align-items: center;

					.avatar-wrap {
						position: relative;

						.bg {
							width: 148upx;
							height: 148upx;
						}

						.avatar {
							position: absolute;
							border-radius: 50%;
							width: 100upx;
							height: 100upx;
						}
					}

					.starname {
						margin-top: -20upx;
						font-weight: 700;
					}

					.hot {
						text-align: center;
						color: $text-color-2;
						display: flex;
						align-items: center;

						image {
							width: 24upx;
							height: 24upx;
							margin-right: 10upx;
						}
					}

				}

				.content.mid {
					margin-top: -40upx;
				}
			}

			.three-taijie {
				width: 100%;
				height: 210upx;
				margin-top: -125upx;
				position: relative;
				z-index: 1;
			}
		}

		.rank-list-container {

			.rank-list-item {
				margin: 20upx 30upx;
				box-shadow: 0 2upx 16upx rgba(#999, .3);

				border-radius: 30upx;
				overflow: hidden;


				.left-container {
					line-height: 44upx;

					.bottom-text {
						display: flex;
						align-items: center;

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

				.right-container {
					margin-right: 40upx;

					.btn {
						border: 2upx solid #ff8aaa;
						border-radius: 30upx;
						padding: 5upx 30upx;
						color: #ff8aaa;
					}
				}
			}

			.rank-list-item-s {
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

				.avatar {
					width: 80upx;
					height: 80upx;
					border-radius: 50%;
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

				.son-wrap {
					display: flex;

					.avatar {
						width: 40upx;
						height: 40upx;
						border-radius: 50%;
						margin: 5upx;
					}
				}

			}
		}

		.open-ad-container {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 9;
			background-color: rgba(0, 0, 0, .6);
			flex-direction: column;

			.main {
				width: 500rpx;
				height: 800upx;
				border-radius: 20upx;

			}
			.mains{
				width: 500rpx;
				height: 700upx;
				border-radius: 20upx;
				background-color: #FFFFFF;padding: 20rpx;
				image{width: 212rpx;height: 252rpx;}
				.birStarHead{position: relative;top:-160rpx;right:-134rpx}
				.birStarHeadImg{border-radius: 50%;width: 204rpx;height: 204rpx;position: absolute;top: 46rpx;left: 4rpx;}
				.birStarCake{width:200rpx;height: 200rpx;position: absolute;top: 288rpx;right: 260rpx;}
				.birContent{margin-top: 120rpx; text-align: center;}
				.birMarginLg{margin-top: 30rpx;font-weight: bold;
				.birButton{border-radius: 40rpx; width: 300rpx;height: 80rpx;line-height: 80rpx; text-align: center;border: 2rpx solid #9C694D ;margin: 5rpx auto}
				}
				.birBuy{border-bottom: 2rpx solid #9C694D; font-size: 25rpx; width: 190rpx; margin: 0 auto;}
			}

			.close-btn {
				width: 80upx;
				height: 80upx;
				margin-top: 10upx;
				z-index: 10;
				border-radius: 50%;
				background-color: rgba(0, 0, 0, .5);
				color: #FFF;
				font-size: 45upx;
			}
		}
	}
</style>
