<template>
	<view class="container">
		<view class="banner">
			<swiper v-if="banner.length > 1" class="banner-swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
				<swiper-item v-for="(item, index) in banner" :key="index">
					<view @tap="goActive(item)" class="swiper-item" :style="{'background': 'url('+item.img_url+') no-repeat center center', 'background-size': 'cover'}"></view>
				</swiper-item>
			</swiper>
			<view v-else class="banner-swiper">
				<view v-if="banner.length" @tap="goActive(banner[0])" class="swiper-item" :style="{'background': 'url('+banner[0].img_url+') no-repeat center center', 'background-size': 'cover'}"></view>
			</view>
		</view>
		<view class="normal-container" v-for="(item,index) in active" :key="index" :class="{unb: item.list.length == 1}">
			<view class="header" v-if="item.head">
				<view class="title">
					{{item.head.title}}
				</view>
				<view class="goPage" @tap="goHeadPage(item.head.gopage)">
					<text>{{item.head.page_desc}}</text>
				</view>
			</view>
			<block v-if="item.type == 'scroll'">
				<scroll-view scroll-x="true" class="scroll">
					<view class='scroll-container'>
						<block v-for="(ite,ind) in item.list" :key="ind">
							<view :id="'scroll'+ind" class="scroll-item" @tap="goActive(ite)">
								<view class="active-item">
									<!-- <view class="wait-hover" v-if="ite.status == 'WAIT'"></view> -->
									<view class="active-tip tip-s flex-set" v-if="ite.tip">
										{{ite.tip}}
									</view>
									<image class="active-image" mode="aspectFit" :src="ite.img"></image>
									<view class="active-title">{{ite.title}}</view>
									<view class="active-desc">{{ite.desc}}</view>
									<view class="active-btn">
										<btnComponent type="unset">
											<block v-if="ite.open_type">
												<button class="btn" :open-type="ite.open_type" :data-shareid="ite.shareid" @tap.stop>
													<view class="flex-set" :class="ite.btn_class">
														{{ite.btn_text||'去参与'}}
													</view>
												</button>
											</block>
											<view v-else @tap="goActive(ite)" class="flex-set" :class="ite.btn_class">
												{{ite.btn_text||'去参与'}}
											</view>
										</btnComponent>
									</view>
								</view>
							</view>
						</block>
					</view>
				</scroll-view>
			</block>
			<view class="flex" v-if="item.type == 'flex'" :class="{one: item.list.length == 1, two: item.list.length == 2}">
				<view class="active-item" v-for="(ite,ind) in item.list" :key="ind"  @tap="goActive(ite)">
					<!-- <view class="wait-hover" v-if="ite.status == 'WAIT'"></view> -->
					<view class="active-tip tip-s flex-set" v-if="ite.tip">
						{{ite.tip}}
					</view>
					<block v-if="item.list.length > 2">
						<image class="active-image" mode="aspectFit" :src="ite.img"></image>
						<view class="active-title">{{ite.title}}</view>
						<view class="active-desc">{{ite.desc}}</view>
					</block>
					
					<view class="active-center" v-if="item.list.length < 3">
						<view class="active-lr">
							<image class="left-image" mode="aspectFit" :src="ite.img"></image>
							<view class="right">
								<view class="title">{{ite.title}}</view>
								<view class="desc">{{ite.desc}}</view>
							</view>
							<view class="right-btn flex-set" v-if="item.list.length == 1">
								<btnComponent type="unset">
									<block v-if="item.list[0].open_type">
										<button class="btn" :open-type="item.list[0].open_type" :data-shareid="item.list[0].shareid" @tap.stop>
											<view class="flex-set" :class="item.list[0].btn_class">
												{{item.list[0].btn_text||'去参与'}}
											</view>
										</button>
									</block>
									<view v-else @tap="goActive(item.list[0])" class="flex-set" :class="item.list[0].btn_class">
										{{item.list[0].btn_text||'去参与'}}
									</view>
								</btnComponent>
							</view>
						</view>
					</view>
					<view class="active-btn" v-if="item.list.length > 1">
						<btnComponent type="unset">
							<block v-if="ite.open_type">
								<button class="btn" :open-type="ite.open_type" :data-shareid="ite.shareid" @tap.stop>
									<view class="flex-set" :class="ite.btn_class">
										{{ite.btn_text||'去参与'}}
									</view>
								</button>
							</block>
							<view v-else @tap="goActive(ite)" class="flex-set" :class="ite.btn_class">
								{{ite.btn_text||'去参与'}}
							</view>
						</btnComponent>
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
				indicatorDots: true,
				autoplay: true,
				interval: 4000,
				duration: 500,
				banner: [],
				active: [],
				loading: false,
			}
		},
		onShow() {
			this.getConform();
		},
		methods: {
			goHeadPage (url) {
				if (url) {
					this.$app.goPage(url);
				}
			},
			getConform() {
				if (!this.active.length) {
					this.loading = true;
					uni.showLoading({
						mask:true,
						title:"请稍后"
					})	
				}
				this.$app.request(this.$app.API.ACTIVE_CONFORM, {}, res => {
					const {banner, active} = res.data
					this.banner = banner;
					this.active = active;
					if (this.loading) {
						uni.hideLoading();
						this.loading = false;
					}
				})
			},
			goActive(active) {
				if (active.open_type) {
					return;
				}
				if (active.gopage) {
					this.$app.goPage(active.gopage);
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		width: 100%;
		.banner {
			height: 250upx;
			margin: 20upx;
			
			.banner-swiper {
				height: 250upx;
				
				.swiper-item {
					display: block;
					height: 250upx;
					line-height: 250upx;
					border-radius: 20upx;
					text-align: center;
					color: white;
					font-size: $font-l;
					font-weight: 700;
				}
			}
		}
		.unb {
			border-top: unset !important;
		}
		.normal-container {
			&:not(:first-child) {
				border-top: rgba(240,235,242,1) 4upx solid;
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
						height: 250upx;
						.active-item {
							height: 200upx;
						}
					}
				}
			}
			
			.flex {
				display: flex;
				justify-content: flex-start;
				width: 100%;
				padding: 0 30upx 20upx 30upx;
				height: 250upx;
				
				.active-item {
					margin: 0 5upx 20upx 5upx;
					width: unset;
					flex: 1;
					border-radius: 30upx;
					height: 200upx;
				}
			}
			
			.one {
				height: unset;
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
			
			.wait-hover{
				background-color: rgba(#000, 0.3);
				z-index: 1;
				width: 100%;
				height: 100%;
				top: 50%;
				left: 50%;
				transform: translate(-50%,-50%);
				position: absolute;
				border-radius: 20rpx;
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
					color: #FFD773;
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
						display: flex;
						flex-direction: row;
						justify-content: space-around;
						// height: 120upx;
						.left-image {
							width: 80upx;
							height: 80upx;
							// z-index:1;
							// object-fit: cover;
							margin: auto 20upx;
							max-width: 100upx;
							max-height: 100upx;
						}
						.right {
							flex: 1;
							width: 100%;
							text-align: left;
							display: flex;
							flex-direction: column;
							justify-content: center;
							.title {
								font-size: 30rpx;
								font-weight: 650;
								margin-bottom: 10rpx;
							}
							.desc {
								font-size: 20rpx;
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
					width: 80upx;
					height: 80upx;
				}
				.active-title {
					position: absolute;
					top: 55%;
					width: 100%;
					font-size: 26rpx;
					font-weight: 600;
					text-align: center;
				}
				.active-desc {
					position: absolute;
					top: 72%;
					width: 100%;
					font-size: 20rpx;
					color: #928F8E;
					text-align: center;
				}
				.btn-s {
					width: 150rpx;
					height: 40upx;
					font-size: 24rpx;
					border-radius: 20upx;
					padding: 0 8upx;
				}
				.btn-m {
					height: 44upx;
					font-size: 28rpx;
					border-radius: 22upx;
					padding: 10upx 20upx;
				}
				.btn-l {
					height: 50upx;
					font-size: 30rpx;
					border-radius: 25upx;
					padding: 10upx 20upx;
				}
				.normal {
					background-color: #FDEB3F;
				}
				.hot {
					background: linear-gradient(103deg, #fba934, #fb669c);;
					color: white;
				}
				.active-btn {
					position: absolute;
					left: 50%;
					transform: translate(-50%, -50%);
					bottom: -24%;
					z-index: 2;
					button {
						font-size: 19upx;
					}
				}
			}
			
		}
	}
</style>
