<template>
	<view class="container">
		<view class="banner">
			<swiper v-if="bannerList.length > 1" class="banner-swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
				<swiper-item v-for="(item, index) in bannerList" :key="index">
					<view class="swiper-item" :style="{'background': 'url('+item.img_url+') no-repeat left top', 'background-size': 'cover'}"></view>
				</swiper-item>
			</swiper>
			<view v-else class="banner-swiper">
				<view class="swiper-item" :style="{'background': 'url('+bannerList[0].img_url+') no-repeat left top', 'background-size': 'cover'}"></view>
			</view>
		</view>
		<view class="normal-container">
			<view class="header">
				<view class="title">
					每日精彩活动
				</view>
				<view class="goPage">
					活动说明>
				</view>
			</view>
			
			<scroll-view scroll-x="true" class="scroll">
				<view class='scroll-container'>
					<block v-for="(item,index) in scrollList" :key="index">
						<view :id="'scroll'+index" class="scroll-item" @tap="changeLabel(item.value)" :data-item="item">
							<view class="active-item">
								<view class="active-tip tip-s flex-set">
									{{item.tip}}
								</view>
								<image class="active-image" mode="aspectFit" :src="item.img"></image>
								<view class="active-title">{{item.title}}</view>
								<view class="active-desc">{{item.desc}}</view>
								<view class="active-btn">
									<btnComponent type="unset">
										<block v-if="item.open_type">
											<button class="btn" :open-type="item.open_type" :data-shareid="item.shareid" @tap.stop>
												<view class="flex-set" :class="{'hot-s-bg': index == 0, 'normal-s-bg': index > 0}">
													{{item.btn_text||'去参与'}}
												</view>
											</button>
										</block>
										<view v-else @tap="$app.goPage(item.gopage)" class="flex-set">
											{{item.btn_text||'去参与'}}
										</view>
									</btnComponent>
								</view>
							</view>
						</view>
					</block>
				</view>
			</scroll-view>
		</view>
		
		<view class="normal-container" v-if="1 < 0">
			<view class="header">
				<view class="title">
					领取更多人气
				</view>
				<view class="goPage">
					玩法说明>
				</view>
			</view>
			
			<view class="flex">
				<view class="active-item" v-for="(item,index) in flexList" :key="index">
					<view class="active-tip tip-s flex-set">
						{{item.tip}}
					</view>
					<image class="active-image" mode="aspectFit" :src="item.img"></image>
					<view class="active-title">{{item.title}}</view>
					<view class="active-desc">{{item.desc}}</view>
					<view class="active-btn">
						<btnComponent type="unset">
							<block v-if="item.open_type">
								<button class="btn" :open-type="item.open_type" :data-shareid="item.shareid" @tap.stop>
									<view class="flex-set" :class="{'hot-s-bg': index == 0, 'normal-s-bg': index > 0}">
										{{item.btn_text||'去参与'}}
									</view>
								</button>
							</block>
							<view v-else @tap="$app.goPage(item.gopage)" class="flex-set">
								{{item.btn_text||'去参与'}}
							</view>
						</btnComponent>
					</view>
				</view>
			</view>
		</view>
		<view class="normal-container" v-for="(ite, ind) in [1,2]" :key="ind">
			<view class="header">
				<view class="title">
					福利活动
				</view>
				<view class="goPage">
					往期福利发放>
				</view>
			</view>
			
			<view class="flex two">
				<view class="active-item" v-for="(item,index) in flexList" :key="index" v-if="index < 2">
					<view class="active-tip tip-l flex-set">
						{{item.tip}}
					</view>
					<view class="active-center">
						<view class="active-lr">
							<image class="left-image" mode="aspectFit" :src="item.img"></image>
							<view class="right">
								<view class="title">{{item.title}}</view>
								<view class="desc">{{item.desc}}</view>
							</view>
						</view>
					</view>
					<view class="active-btn">
						<btnComponent type="unset">
							<block v-if="item.open_type">
								<button class="btn" :open-type="item.open_type" :data-shareid="item.shareid" @tap.stop>
									<view class="flex-set normal-m-bg">
										{{item.btn_text||'去参与'}}
									</view>
								</button>
							</block>
							<view v-else @tap="$app.goPage(item.gopage)" class="flex-set">
								{{item.btn_text||'去参与'}}
							</view>
						</btnComponent>
					</view>
				</view>
			</view>
		</view>
		
		<view class="normal-container" v-if="1 < 0">
			<view class="flex one">
				<view class="active-item">
					<!-- <view class="active-tip tip-l flex-set">
						{{flexList[0].tip}}
					</view> -->
					<view class="active-center">
						<view class="active-lr">
							<image class="left-image" mode="aspectFit" :src="flexList[0].img"></image>
							<view class="right">
								<view class="title">{{flexList[0].title}}</view>
								<view class="desc">{{flexList[0].desc}}</view>
							</view>
							<view class="right-btn">
								<btnComponent type="unset">
									<block v-if="flexList[0].open_type">
										<button class="btn" :open-type="flexList[0].open_type" :data-shareid="flexList[0].shareid" @tap.stop>
											<view class="flex-set normal-m-bg">
												{{flexList[0].btn_text||'去参与'}}
											</view>
										</button>
									</block>
									<view v-else @tap="$app.goPage(flexList[0].gopage)" class="flex-set">
										{{flexList[0].btn_text||'去参与'}}
									</view>
								</btnComponent>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import btnComponent from "@/components/btnComponent.vue";
	
	export default {
		components:{
			btnComponent
		},
		
		data() {
			return {
				type: '',
				indicatorDots: true,
				autoplay: true,
				interval: 4000,
				duration: 500,
				bannerList: [],
				scrollList: [],
				flexList: [],
			}
		},
		onShow() {
			this.type = this.$app.getData('config').open.current;
			this.bannerList = this.$app.getData('config').open.content[this.type].banner;
			const item = {
				img: 'https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9EGbxgC4CjR5wKtNQuKiaDnrSibVnxo0Xj1f435iaTTmStDN9Roojib89LNwXzqfTeqoicdcEuKPo7ktqg/0',
				title: "团战PK",
				desc: '超多奖励',
				gopage: "",
				shareid: '4',
				tip: 'NEW',
				'open_type': "share",
				'btn_text': '立即参与',
			}, scrollmap = [], flexMap = [];
			for (let i = 0; i < 9; i++) {
				scrollmap.push(item);
			}
			this.scrollList = scrollmap;
			for (let i = 0; i < 4; i++) {
				flexMap.push(item);
			}
			this.flexList = flexMap;
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		width: 100%;
		.banner {
			height: 250upx;
			border-radius: 20upx;
			
			.banner-swiper {
				height: 250upx;
				
				.swiper-item {
					display: block;
					height: 250upx;
					line-height: 250upx;
					text-align: center;
					color: white;
					font-size: $font-l;
					font-weight: 700;
				}
			}
		}
		.normal-container {
			&:not(:last-child) {
				border-bottom: rgba(240,235,242,1) 4upx solid;
			}
			.header {
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				
				margin: 20upx 40upx;
				.title {
					font-size: $font-m;
					font-weight:bold;
					color: #000000;
				}
				.goPage {
					margin-left: auto;
					font-size: $font-s;
					font-weight:bold;
					color: #928F8E;
				}
			}
			
			.scroll {
				white-space: nowrap;
				width: 100%;
				padding: 0 30upx 10upx 30upx;
				.scroll-container {
					display: flex;
					justify-content: flex-start;
					.scroll-item {
						margin-right: 10upx;
						height: 220upx;
					}
				}
			}
			
			.flex {
				display: flex;
				justify-content: flex-start;
				width: 100%;
				padding: 0 30upx 20upx 30upx;
				height: 230upx;
				
				.active-item {
					margin: 0 5upx 20upx 5upx;
					width: unset;
					flex: 1;
					border-radius: 30upx;
				}
			}
			
			
			.one {
				.active-item {
					height: 120upx;
					flex: 1;
					.right-btn {
						margin-right: 20upx;
						button {
							font-size: 19upx;
						}
					}
				}
			}
			
			.active-item {
				position: relative;
				width:170upx;
				height: 180upx;
				background:rgba(251,246,253,1);
				border-radius:10upx;
				.active-tip {
					position: absolute;
					right: 0;
					top: 0;
					color: white;
				}
				.tip-s {
					width: 52upx;
					height: 26upx;
					background-color: #926CD6;
					border-radius: 18upx;
					border-bottom-right-radius: 0;
					font-size: 19upx;
				}
				.tip-l {
					width: 112upx;
					height: 39upx;
					font-size: 21upx;
					background-color: #926CD6;
					border-radius: 18upx;
					border-bottom-right-radius: 0;
				}
				.active-center {
					width: 100%;
					height: 100%;
					display: flex;
					justify-content: center;
					flex-direction: column;
					.active-lr {
						margin-left: 10%;
						display: flex;
						flex-direction: row;
						justify-content: flex-start;
						.left-image {
							width: 100%;
							height: 100%;
							object-fit: cover;
							max-width: 120upx;
							max-height: 95upx;
						}
						.right {
							flex: 1;
							width: 100%;
							text-align: left;
							margin-left: 10upx;
							display: flex;
							flex-direction: column;
							justify-content: center;
							.title {
								font-size: 26upx;
								font-weight: 600;
							}
							.desc {
								font-size: 20upx;
								color: #928F8E;
							}
						}
					}
				}
				.active-image {
					position: absolute;
					top: 60upx;
					left: 50%;
					transform: translate(-50%, -50%);
					width: 55upx;
					height: 55upx;
				}
				.active-title {
					position: absolute;
					top: 55%;
					width: 100%;
					font-size: 22upx;
					font-weight: 600;
					text-align: center;
				}
				.active-desc {
					position: absolute;
					top: 75%;
					width: 100%;
					font-size: 15upx;
					color: #928F8E;
					text-align: center;
				}
				.normal-s-bg {
					width: 100upx;
					height: 40upx;
					font-size: 20upx;
					border-radius: 20upx;
					background-color: #FDEB3F;
				}
				.normal-m-bg {
					width: 150upx;
					height: 50upx;
					font-size: 22upx;
					border-radius: 25upx;
					background-color: #FDEB3F;
				}
				.hot-s-bg {
					width: 100upx;
					font-size: 20upx;
					height: 40upx;
					border-radius: 20upx;
					background: linear-gradient(103deg, #fba934, #fb669c);;
					color: white;
				}
				.active-btn {
					position: absolute;
					left: 50%;
					transform: translate(-50%, -50%);
					bottom: -24%;
					button {
						font-size: 19upx;
					}
				}
			}
			
		}
	}
</style>
