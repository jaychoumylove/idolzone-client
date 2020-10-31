<template>
	<view class="container">
		<view class="top-header flex-set">
			<view class="left"></view>
			<view class="main">{{topHeader.title}}</view>
			<view class="right"></view>
			<view class="tip" @tap="goOther(topHeader.tip.gopage)">{{topHeader.tip.label}}<text class="iconfont iconicon-test1"></text></view>
		</view>
		<view class="banner">
			<view class="banner-swiper">
				<view v-if="banner.length" @tap="goOther(banner[currentType].img_url.gopage)" class="swiper-item" :style="{'background': 'url('+banner[currentType].img_url+') no-repeat center center/ 100% 100%'}"></view>
			</view>
		</view>
		
		<view class="main-container">
			<view>
				<scroll-view scroll-x="true" class="scroll">
					<view class='tab-container'>
						<block v-for="(item,index) in btnGroup" :key="index">
							<view :id="'scroll'+index" class="tab-item" :class="{active:index == currentType}" @tap="changeLabel(index, 0)">
								{{item.label}}
							</view>
						</block>
					</view>
				</scroll-view>
			</view>
			
			<view class="rank-btn">
				<view class="rank-item" v-for="(i, j) in btnGroup[currentType].btn" :key="j">
					<view class="bg flex-set" :class="{active: j == currentBtnType}" @tap="changeLabel(currentType, j)">
						{{i.label}}
					</view>
				</view>
			</view>
			

			<!-- 列表 -->
			<view class="rank-list-container">
				<view class="loading flex-set" v-if="rankloading.length">
					请稍后...
				</view>
				<view class="empty flex-set" v-if="!rankList.length&&!rankloading.length">
					暂无数据
				</view>
				<view class="rank-list-item" v-if="!rankloading.length" v-for="(item,index) in rankList" :key="index">
					<view class="num" v-if="index < 3" :class="{first: index == 0, second: index == 1, third: index == 2}"></view>
					<view class="num flex-set other" v-if="index > 2" :class="{ten: index < 10}">{{index+1}}</view>
					<view class='avatar-wrap'>
						<image class="avatar" :src="item.user.avatarurl" mode="aspectFill"></image>
						<image class="headwear position-set" :src="item.headwear&&item.headwear.img" mode=""></image>
					</view>
					<view class="content">
						<view class="top">
							<view class="name text-overflow">{{item.user.nickname}}</view>
							<view class="star flex-set text-overflow">{{item.star.name}}</view>
						</view>
						<view class="bottom" v-if="btnGroup[currentType].value == 'flower_time'">
							累计邀请: {{$app.formatNumber(item.count||0)}}人
						</view>
						<view class="bottom" v-if="btnGroup[currentType].value == 'pk'">
							累计贡献: {{$app.formatNumber(item.count||0)}}人气
						</view>
						<view class="bottom" v-if="btnGroup[currentType].value == 'flower'">
							累计贡献: {{$app.formatNumber(item.count||0)}}鲜花
						</view>
						<view class="bottom" v-if="btnGroup[currentType].value == 'newguy'">
							累计贡献: {{$app.formatNumber(item.count||0)}}人气
						</view>
					</view>
					<view class="right">
						<block v-if="item.num">
							<view class="desc">累计获得</view>
							<image :src="item.img" mode="aspectFit"></image>
							<view class="desc-num">X{{item.num}}</view>
						</block>
					</view>
				</view>
				<view class="end flex-set" v-if="end&&rankList.length">
					已经到底了
				</view>
			</view>
		</view>
		
		<view class="my-rank rank-list-container" v-if="true">
			<view class="rank-list-item">
				<block v-if="my.rank">
					<view class="num" v-if="my.rank < 4" :class="{first: my.rank == 1, second: my.rank == 2, third: my.rank == 3}"></view>
					<view class="num flex-set other" v-if="my.rank > 3" :class="{ten: my.rank < 11}">{{my.rank}}</view>
					<view class="num flex-set other" v-if="my.rank == 'no'">no</view>
				</block>
				<view class="num flex-set other" v-else>no</view>
				<view class='avatar-wrap'>
					<image class="avatar" :src="my.user.avatarurl||$app.getData('userInfo').avatarurl||$app.getData('AVATAR')" mode="aspectFill"></image>
					<image class="headwear position-set" :src="my.headwear&&my.headwear.img" mode=""></image>
				</view>
				<view class="content">
					<view class="top">
						<view class="name text-overflow">{{my.user.nickname||$app.getData("userInfo").nickname||$app.getData('NICKNAME')}}</view>
						<view class="star flex-set text-overflow">{{my.star.name||$app.getData("userStar").name||""}}</view>
					</view>
					<view class="bottom" v-if="btnGroup[currentType].value == 'flower_time'">
						累计邀请: {{$app.formatNumber(my.count||0)}}人
					</view>
					<view class="bottom" v-if="btnGroup[currentType].value == 'pk'">
						累计贡献: {{$app.formatNumber(my.count||0)}}人气
					</view>
					<view class="bottom" v-if="btnGroup[currentType].value == 'flower'">
						累计贡献: {{$app.formatNumber(my.count||0)}}鲜花
					</view>
					<view class="bottom" v-if="btnGroup[currentType].value == 'newguy'">
						累计贡献: {{$app.formatNumber(my.count||0)}}人气
					</view>
				</view>
				<view class="right">
					<block v-if="my.num">
						<view class="desc">累计获得</view>
						<image :src="my.img" mode="aspectFit"></image>
						<view class="desc-num">X{{my.num||0}}</view>
					</block>
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
				banner: [],
				rankList: [],
				pager: {
					size: 10,
					page: 1,
				},
				currentType: 0,
				currentBtnType: 0,
				end: false,
				btnGroup: [],
				topHeader: {},
				showing: false,
				rankloading: [],
				my: {}, // 用于记录我的排名
			}
		},
		onLoad(option) {
			if (option.type) {
				this.currentType = option.type;
			}
		},
		onShow() {
			this.showing = true;
			this.getRankList(1);
			this.getMyRankInfo();
		},
		onReachBottom() {
			this.pager.page = this.pager.page + 1;
			this.getRankList(0)
		},
		methods: {
			goOther(url) {
				if (url) {
					this.$app.goPage(url);
				}
			},
			changeLabel(type, rankType) {
				this.currentType = type;
				this.currentBtnType = rankType;
				let loading = this.rankloading;
				loading.push(1);
				this.rankloading = loading;
				this.pager.page = 1;
				this.end = false;
				this.my = {};
				this.rankList = [];
				this.getRankList(0);
				this.getMyRankInfo();
			},
			getMyRankInfo() {
				const data = {
					type: this.currentType,
					rank_type: this.currentBtnType,
				};
				this.$app.request(this.$app.API.PAGE_ACHIEVEMENT_MY_RANK, data, res => {
					this.my = res.data;
				})
			},
			getRankList(config) {
				if (this.end) {
					let loading = this.rankloading;
					if (loading.length) {
						loading.pop();
						this.rankloading = loading;
					}
					if (this.showing) {
						uni.hideLoading();
						this.showing = false;
					}
					return;
				}
				
				const data = {
					type: this.currentType,
					rank_type: this.currentBtnType,
					config
				};
				if (this.showing) {
					uni.showLoading({
						mask:true,
						title:"请稍后..."
					})
				}
				
				this.$app.request(this.$app.API.PAGE_ACHIEVEMENT, Object.assign(this.pager, data), res => {
					if (res.data.hasOwnProperty('config')) {
						const config = res.data.config;
						this.banner = config.banner;
						this.btnGroup = config.rank_group;
						this.topHeader = config.top_header;
					}
					let list = res.data.list;
					this.rankList = this.pager.page == 1 ? list: this.rankList.concat(list);
					let loading = this.rankloading;
					if (loading.length) {
						loading.pop();
						this.rankloading = loading;
					}
					if (res.data.list.length < this.pager.size) {
						this.end = true;
					}
					if (this.showing) {
						uni.hideLoading();
						this.showing = false;
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		width: 100%;
		
		.top-header {
			line-height: 40rpx;
			height: 40rpx;
			margin: 20rpx auto;
			position: relative;
			.left,.right {
				width: 160rpx;
				height: 20rpx;
				background-position: center center;
				background-repeat: no-repeat;
				background-size: 100% 100%;
				background-image: url("https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9HYKTMib185fwujoD0wb2EuD9pQLalmaDRfEhVMy1xkVr5NllYCM9IlcW0x0QSa300KxOQtFT2H9FQ/0");
			}
			.main {
				margin: 0 20rpx;
				font-size: 30rpx;
				font-weight: 650;
			}
			.left {
				transform: rotateX(180deg);
			}
			.tip {
				position: absolute;
				transform: translate(-50%,-50%);
				right: -2%;
				top: 50%;
				font-size: 24rpx;
				color: #FBCC3E;
				text {
					padding-left: 5rpx;
					color: black;
				}
			}
		}
		.banner {
			height: 170upx;
			margin: 20upx;
			
			.banner-swiper {
				height: 170upx;
				.swiper-item {
					display: block;
					height: 170upx;
					line-height: 250upx;
					border-radius: 20upx;
					text-align: center;
					color: white;
					font-size: $font-l;
					font-weight: 700;
				}
			}
		}
		.my-rank {
			position: fixed;
			width: 100%;
			background-color: rgba(247,245,254,1);
			padding: unset!important;
			bottom: 0;
		}
		.rank-list-container {
			padding: 130rpx 0 10rpx;
			.empty,.loading,.end {
				margin: 20rpx 0;
			}
			.rank-list-item {
				display: flex;
				align-items: center;
				background-color: #FFF;
				margin: 20upx 30upx;
				box-shadow: 0 2upx 16upx rgba(#999, .3);
				border-radius: 30upx;
				overflow: hidden;
				padding: 0 20rpx;
				// justify-content: space-around;
				.num {
					width: 80rpx;
					height: 60rpx;
				}
				.first,.second,.third {
					background-position: center center;
					background-repeat: no-repeat;
					background-size: 50rpx 40rpx;
				}
				.first {
					background-image: url("https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9EVmf6wUAMKg0xuNYSRD53ZKwFjgKJrGLYZa1g2egHV5qcHfIgqsjygD74JMjHtAic8zFica0ce4wwg/0");
				}
				.second {
					background-image: url("https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9EVmf6wUAMKg0xuNYSRD53ZcGVq5JGWjmibjgjAxIjm5o6Bfqs9a7NZFDnhuAOZ30SzolLvJmh5B8g/0");
				}
				.third {
					background-image: url("https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9EVmf6wUAMKg0xuNYSRD53ZSkJAzIEiaCBOwo6hicqI7jtfhPz8T3rWPkv6ib45bY0xj8qlMBuX7ibzWg/0");
				}
				.other {
					text-shadow: -1rpx 0 black, 0 1rpx black, 1rpx 0 black, 0 -1rpx black;
					color: white;
				}
				.ten {
					font-weight: 500;
					font-size: 24px;
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
					padding: 20upx;
					line-height: 1.6;
					max-width: 470upx;
		
					.top {
						display: flex;
						align-items: center;
		
						.name {
							font-size: 15px;
							color: #000;
							max-width: 160rpx;
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
					// width: 200rpx;
					margin-left: auto;
					display: flex;
					// justify-content: space-around;
					.desc {
						white-space: nowrap;
						align-self: center;
						color: #A5A5A5;
						font-size: 20rpx;
					}
					.desc-num {
						white-space: nowrap;
						align-self: flex-end;
						color: #EC7934;
						font-size: 24rpx;
					}
					image {
						width: 60upx;
						height: 60upx;
					}
				}
				.bottom {
					display: flex;
					align-items: center;
					font-size: 20upx;
					color: rgba(black, 0.4);
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
	
		.main-container {
			margin: 60rpx 20rpx 180rpx;
			background-color: rgba(247,245,254,1);
			border-radius:30px;
			position: relative;
			.scroll {
				position: absolute;
				transform: translate(-50%,-50%);
				left: 50%;
				top: 0;
				white-space: nowrap;
				width: 100%;
				padding: 20rpx 15rpx;
				.tab-container {
					display: flex;
					justify-content: flex-start;
				
					.tab-item {
						border-radius: 32upx;
						padding: 10upx 30upx;
						font-size: 30upx;
						margin-right: 30upx;
						width: auto;
						text-align: center;
						background-position: center center;
						background-repeat: no-repeat;
						background-size: 100% 100%;
						color: white;
						background-image: url("https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9HYKTMib185fwujoD0wb2EuDZkk2elXmXOyrWHjpUHibbx0EQLgiaZY3ibrTronmsrBtuZsaqSXcaKxQg/0");
					}
				
					.tab-item.active {
						background-image: url("https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9HYKTMib185fwujoD0wb2EuDiar8pkXBKEk5CXN8H11Te7VTJAo6UicE5YHaFZHWsE1XQQHtoWfFIqNA/0");
						color: #492D0D;
					}
				}
			}
			
			.rank-btn {
				display: flex;
				justify-content: space-around;
				background-image: url("https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9HYKTMib185fwujoD0wb2EuDk0AmiaAkjPIFRSbuEFSxQg9EZHcGaF8KEGEoS9F6rNMl4VTJib2ummVw/0");
				background-position: center center;
				background-repeat: no-repeat;
				background-size: 100% 100%;
				padding: 20rpx 10rpx;
				position: absolute;
				top: 90rpx;
				width: 98%;
				left: 50%;
				transform: translate(-50%, -50%);
				.rank-item {
					view {
						padding: 10rpx 20rpx;
					}
					.active {
						color: #FBCC3E;
						background-color: white;
						border-top-left-radius: 20rpx;
						border-top-right-radius: 20rpx;
					}
				}
			}
		}
	}
</style>
