<template>
	<view class="rank-container">
		<!-- 只有领袖粉才可以上传 -->
		<view class="fixed-btn" v-if="$app.getData('userStar').captain">
			<btnComponent type="css">
				<view class="flex-set" style="width: 200upx;height: 65upx;" @tap="$app.goPage('/pages/open/upload')">我要上传</view>
			</btnComponent>
		</view>
		<view class="fixed-btn-desc">
			<btnComponent type="yellow" class="right-btn">
				<view class="desc" @tap="openDesc">
					<text class="iconfont iconinfo"></text>
					<view>{{$app.getData('config').open.content[type].help.label}}</view>
				</view>
			</btnComponent>
		</view>
		<view :style="{'background': 'url('+$app.getData('config').open.content[type].banner+') no-repeat left top', 'background-size': 'cover'}" class="banner" @tap="openDesc"></view>
		<view class="scroll-wrap">
			<view class="item" :class="{active:rankType=='rank'}" @tap="setRankType('rank')">人气排名</view>
			<view class="item" :class="{active:rankType=='star'}" @tap="setRankType('star')">只看{{$app.getData('userStar').name}}</view>
			<!-- 只有领袖粉才可以上传 -->
			<view v-if="$app.getData('userStar').captain" class="item" :class="{active:rankType=='my'}" @tap="setRankType('my')">我的上传</view>
		</view>

		<view class="list-container">
			<view class="item" v-for="(item,index) in list" :key="index">
				<image class="img" lazy-load="true" :src="item.img_url" mode="aspectFill" @tap="goDetail(item)"></image>
				<view class="content">
					<view class="content-container">
						<view class="star-name mb2" @tap="goDetail(item)">{{item.star.name}}</view>
						<view class="open-hot mb2 text-overflow" @tap="goDetail(item)">
							<view>获得 <text class="disinl pdlf10" style="color: red;">{{$app.formatNumber(item.hot)}}</text></view>
							<image lazy-load="true" class="img4" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTERabwYgrRn5cjV3uoOa8BonlDPGMn7icL9icvz43XsbexzcqkCcrTcdZqw/0"
								 mode="widthFix"></image>
						</view>
						<view class="label mb2" @tap="goDetail(item)">
							<view>最佳助攻</view>
							<view class="go-detail">
								<text class="iconfont iconjiantou"></text>
							</view>
						</view>
						<view class="assist-list" @tap="goDetail(item)">
							<view class="assist-item mb2" v-if="assistIndex < 3" v-for="(assistItem,assistIndex) in item.open_rank" :key="assistIndex">
								<view class="avatar-wrap">
									<image lazy-load="true" v-if="assistIndex < 1" class="bg" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GCJoNu16zcgxj3gUbIRdCyJvaLiaX672IMaCuJuficOtzP8dB7Wr3lNv7ruRF0dSLPaovw9KMBSjzw/0"
									 mode=""></image>
									<image lazy-load="true" v-if="assistIndex == 1" class="bg" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GCJoNu16zcgxj3gUbIRdCyYP1h97Ciaiayibsenjv84IOZTueq4kx0qqcu3BGibXIWPKJcoRiaqjFVmew/0"
							 mode=""></image>
									<image lazy-load="true" v-if="assistIndex == 2" class="bg" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GCJoNu16zcgxj3gUbIRdCyiaSzL249agiaZudkwtFeg93PBjokvM0euYDiaCJ29ROibQOzMAJFMg0iczw/0"
							 mode=""></image>
									<image lazy-load="true" :src="assistItem.user_info.avatarurl" mode="aspectFill" class="avatar position-set"></image>
								</view>
								<view class="assist-info">
									<view class="user-name">{{assistItem.user_info.nickname}}</view>
									<view class="send-hot">
										<view>
											贡献  
											<text class="disinl pdlf10" style="color: red;">{{$app.formatNumber(assistItem.count)}}</text>
										</view>
										<image class="img4" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTERabwYgrRn5cjV3uoOa8BonlDPGMn7icL9icvz43XsbexzcqkCcrTcdZqw/0"
								 mode="widthFix"></image>
									</view>
								</view>
							</view>
							<view class="mb2 flex-set" style="text-align: center;" v-if="!item.open_rank.length">
								<text class="iconfont iconempty"></text>
								暂无贡献
							</view>
						</view>
						<view class="action" v-if="$app.getData('userStar').id == item.star_id">
							<btnComponent type="css">
								<view class="flex-set" style="width: 130upx;height: 50upx;" @tap="openSend(item)">打榜助力</view>
							</btnComponent>
							<btnComponent type="yellow" class="right-btn">
								<button class="btn" open-type="share" data-share="109" :data-otherparam="item.id" :data-image="item.img_url">
									<view class="flex-set" style="width: 130upx;height: 50upx;">
										<text class="iconfont iconshare"></text>
										分享拉票
									</view>
								</button>
							</btnComponent>
						</view>
					</view>
				</view>
				
				<view class="rank-cover">
					<view class="rank-pos">
						<image class="img" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GCJoNu16zcgxj3gUbIRdCy9fyul1YdnQEAUBtOGI3icphl5GDgw4xic2IE1L0UicpBkOJSLMM0Sym8Q/0" mode="aspectFill" @tap="goDetail(item)"></image>
						<block v-if="item.rank >= 99">
							<view class="rank position-set" style="">99</view>
							<view style="position: absolute;right: 50upx; top: 30upx;font-size: 30upx;font-weight: 500;" class="rank">+</view>
						</block>
						<view v-else class="rank position-set">{{item.rank+1}}</view>
					</view>
				</view>
				<view class="uploader-cover">
					<view class="uploader-pos">
						<image class="img" :src="item.uploader.avatarurl" mode="aspectFill"></image>
						<view class="pdlf10 text-overflow" style="max-width: 140upx;color: gold;"> {{item.uploader.nickname}} </view>
						<view>上传</view>
					</view>
				</view>
				<view class="remove-cover flex-set" v-if="item.user_id == $app.getData('userInfo').id" @tap="remove(item)">
					<view class="remove-pos">
						<image src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9HEap8qicrNnBS27libbHBCjX6uIiaKudB7L0oWwphXjZeu9xcIz6eYNCbIB1Xs8X9ibwNOhCr6Mg1QjQ/0" mode="aspectFit"></image>
					</view>
				</view>
			</view>
			
			<view class="flex-set" style="margin: 30upx auto;" v-if="!list.length">
				<view class="flex-set" v-if="loading">正在查询...</view>
				<view class="flex-set" v-else>暂无数据</view>
			</view>
		</view>
			
		<!-- 打榜 -->
		<modalComponent type="send" v-if="modal == 'send'" title="pick" @closeModal="modal=''">
			<view class="send-modal-container">
				<view class="switch-wrap">
					<switch :checked="!danmakuClosed" @change="danmakuSwitch" />弹幕
					
					<block v-if="extHot.percent&&extHot.percent>0">
						<view class="absolute-dog4" v-if="current==0" @tap="goExtraHotPage">
							冲榜后额外赠送<text style="color: #fb8100;">{{extHot.percent*100}}%</text>
							<text>金豆<text class="iconfont iconicon-test1"></text></text>
						</view>
						<view class="absolute-dog4" v-if="current==1" @tap="goExtraHotPage">
							冲榜后额外赠送<text style="color: #FF0019;">{{extHot.percent*100}}%</text>
							<text>鲜花<text class="iconfont iconicon-test1"></text></text>
						</view>
						<text class="absolute-go-dog">1{{current==0 ? "金豆": "鲜花"}} = 1人气</text>
					</block>
					<text v-else class="absolute-go">1{{current==0 ? "金豆": "鲜花"}} = 1人气</text>
				</view>
		
				<view v-if="$app.getData('config').version != $app.getVal('VERSION')" :class="{mt6: extHot.percent&&extHot.percent>0}" class="swiper-change flex-set">
					<view class="item" :class="{select:current==0}" @tap="current = 0;sendCount=''">送金豆</view>
					<view class="item" :class="{select:current==1}" @tap="current = 1;sendCount=''">送鲜花</view>
					<view class="item" v-if="$app.getData('config').old_coin_open=='1'&&userCurrency.old_coin>0" :class="{select:current==2}"
					 @tap="current = 2;sendCount=''">送旧豆</view>
				</view>
		
				<view class="swiper-item">
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
	import btnComponent from '@/components/btnComponent.vue'
	import modalComponent from '@/components/modalComponent.vue'
	export default {
		components: {
			btnComponent,
			modalComponent,
		},
		data() {
			return {
				modal: '',
				list: [],
				danmakuClosed: false,
				type: '',
				page: 1,
				size: 10,
				sendId: '',
				end: false,
				current: 0,
				extHot: {},
				loading: false,
				userCurrency: {},
				send_num_list: [99, 520, 1314, 9999, 66666, '全送'],
				sendCount: '',
				my: undefined,
				rankType: 'rank',
				rankTypeMap: {
					rank: {},
					star: {
						star_id: this.$app
					}
				},
			};
		},
		onShow() {
			this.type = this.$app.getData('config').open.current
			this.danmakuClosed = this.$app.getData('danmakuClosed')
			this.userCurrency = this.$app.getData('userCurrency')
			this.getExtraSendHot()
			this.refresh()
		},
		onShareAppMessage(e) {
			const shareType = e.target && e.target.dataset.share,
				otherparam = e.target && e.target.dataset.otherparam,
				shareData = {
					image: e.target.dataset.image
				};
			
			return this.$app.commonShareAppMessage(shareType, 'id=' + otherparam, shareData)
		},
		onReachBottom() {
			if (!this.end) {
				this.page++
				this.getList()
			}
		},
		methods: {
			openDesc() {
				const id = this.$app.getData('config').open.content[this.type].help.article;
				this.$app.goPage('/pages/notice/notice?id=' + id);
			},
			goDetail(item) {
				this.$app.goPage('/pages/open/detail?id=' + item.id);
			},
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
			goExtraHotPage() {
				uni.navigateTo({
					url: "/pages/active/weal"
				})
			},
			setSendCount(e) {
				this.sendCount = e.target.value;
			},
			setRankType(e) {
				if (this.rankType != e) {
					this.rankType = e;
					this.list = [];
					this.loading = true;
					this.refresh()
				}
			},
			refresh() {
				this.page = 1
				this.end = false
				this.getList()
			},
			goPage(url) {
				this.$app.goPage(url)
			},
			openSend(item) {
				if (this.$app.getData('userStar').id != item.star_id) {
					return this.$app.toast('不能给其他的爱豆送花哦');
				}
				this.modal = 'send';
				this.sendId = item.id;
			},
			openShare(item, index) {
				if (this.$app.getData('userStar').id != item.star_id) {
					return this.$app.toast('不能给其他的爱豆分享哦');
				}
				this.drawCanvas(item, index);
			},
			cleanSend() {
				this.modal = '';
				this.sendId = 0;
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
				const sendData = {
					id: this.sendId, 
					hot: this.sendCount, 
					type: this.type, 
					current:this.current,
					danmaku: Number(!this.danmakuClosed),
				};
				uni.showLoading({
					title:"助力中...",
					mask: true
				})
				this.$app.request(this.$app.API.OPEN_SEND_HOT, sendData, res => {
					this.cleanSend()
					this.$app.toast("助力成功", 'success')

					this.$app.request(this.$app.API.USER_CURRENCY, {}, res => {
						this.$app.setData('userCurrency', res.data)
						this.userCurrency = res.data
					})
					this.refresh();
				}, 'POST', true)
			},
			getList() {
				const {end, page, type, size,rankType} = this;
				if (end) {
					this.loading = false;
					return;
				}
				let data = {page,size,type,rank: rankType};
				this.$app.request('open/select', data, res => {
					this.list = (this.page > 1) ? this.list.concat(res.data.list):res.data.list;
					if (res.data.list.length < size) {
						this.end = true;
					}
					this.loading = false;
				})
			},
			getMyOpen() {
				this.$app.request(this.$app.API.OPEN_INFO, {self: 1}, res => {
					if (res.data.hasOwnProperty('info')) {
						this.my = res.data.info
					}
				})
			},
			remove(item) {
				uni.showModal({
					title: '提示',
					content:"你确认删除这张图片么",
					success: (res) => {
						if (res.cancel) return;
						if (res.confirm) {
							uni.showLoading({
								title: '正在删除...',
								mask: true
							})
						
							this.$app.request(this.$app.API.OPEN_REMOVE, {open_id: item.id}, res => {
								this.$app.toast('删除成功');
								this.refresh();	
							})
						}
					}, 
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.reply {
		color: #FC3131;
		border-bottom: 2rpx solid #FFD4D4;
		font-size: 23rpx;
	}
	.disinl {
		display: inline-block;
	}
	.mt6 {
		margin-top: 60upx;
	}
	.pdlf10 {
		padding: 0 10upx;
	}
	.img4 {
		width: 40upx;
		height: 40upx;
	}
	.rank-container {
		padding: 10upx 20upx;
		
		.scroll-wrap {
			margin: 20upx;
			display: flex;
			overflow-y: auto;
		
			.item {
				color: #9a9a9a;
				border: 2upx solid #9a9a9a;
				border-radius: 40upx;
				padding: 5upx 20upx;
				white-space: nowrap;
				margin-right: 20upx;
			}
		
			.item.active {
				border-color: #ff89ad;
				color: #ff89ad;
			}
		}
		
		.banner {
			width: 690upx;
			height: 250upx;
			margin: 20upx;
			border-radius: 20upx;
		}

		.fixed-btn {
			position: fixed;
			bottom: 13%;
			left: 35%;
			z-index: 2;
			width: 30%;
		}
		.fixed-btn-my {
			position: fixed;
			bottom: 40upx;
			left: 40upx;
			z-index: 2;
		}
		.fixed-btn-desc {
			position: fixed;
			top: 40upx;
			right: 10upx;
			z-index: 2;
			width: 40upx;
			height: auto;
			line-height: 28upx;
			text-align: center;
			font-size: $font-s;
			.desc {
				height: 150upx;
				padding: 10upx;
				width: 40upx;
			}
		}
		.title-container {
			font-size: $font-l;
			font-weight: 700;
		}

		.list-container {
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;

			.item {
				display: flex;
				flex-direction: row;
				position: relative;
				align-items: center;
				text-align: center;
				border-radius: 5%;
				overflow: hidden;
				margin: 20upx;
				background-color: #FFF;
				box-shadow: 0 2upx 8upx rgba(#000, 0.3);
				width: 100%;
				.img {
					width: 330upx;
					height: 580upx;
				}
				.rank-cover {
					position: absolute;
					left: -45upx;
					top: -30upx;
					.rank-pos {
						.img {
							width: 180upx;
							height: 180upx;
						}
						.rank {
							top:40%;
							font-size: 45upx;
							font-weight: 700;
							color: white;
						}
					}
				}
				.uploader-cover {
					position: absolute;
					bottom: 20upx;
					left: 20upx;
					.uploader-pos {
						display: flex;
						flex-direction: row;
						justify-content: flex-start;
						line-height: 40upx;
						height: 40upx;
						color: white;
						background-color: rgba($color: #e25b45, $alpha: 0.6);
						border-radius: 20upx;
						padding-right: 20upx;
						image {
							width: 40upx;
							height: 40upx;
							border-radius: 50%;
							margin-right: 10upx;
						}
					}
				}
				.remove-cover {
					position: absolute;
					box-sizing: border-box;
					top: 20upx;
					right: 20upx;
					width: 40upx;
					height: 40upx;
					// border-radius: 20upx;
					// border: 4upx solid #ccc;
					.remove-pos {
						height: 40upx;
						image {
							width: 40upx;
						}
					}
				}

				.content {
					flex: 1;
					height: 580upx;
					font-size: 24upx;
					.content-container {
						margin: 30upx 20upx;
						.mb2 {
							margin-bottom: 10upx;
						}
						.star-name {
							font-size: 36upx;
							font-weight: 700;
						}
						.open-hot {
							height: 40upx;
							line-height: 40upx;
							color: $text-color-1;
							display: flex;
							justify-content: center;
							flex-direction: row;
						}
						.label {
							display: flex;
							justify-content: flex-start;
							
							.go-detail {
								margin-left: auto;
								color: #FC7025;
							}
						}
						.assist-list {
							height: 300upx;
							.assist-item {
								display: flex;
								justify-content: flex-start;
								flex-direction: row;
								.avatar-wrap {
									position: relative;
									.bg {
										width: 90upx;
										height: 90upx;
									}
									.avatar {
										position: absolute;
										width: 60upx;
										height: 60upx;
										border-radius: 50%;
									}
								}
								.assist-info {
									flex: 1;
									display: flex;
									flex-direction: column;
									justify-content: center;
									view {
										text-align: left;
									}
									.send-hot {
										font-size: 20upx;
										display: flex;
										flex-direction: row;
										justify-content: flex-start;
										line-height: 40upx;
									}
								}
							}
						}
						.action {
							display: flex;
							justify-content: flex-start;
							margin-top: 20upx;
							font-size: 22upx;
							.right-btn {
								margin-left: auto;
								button {
									font-size: 22upx;
								}
							}
						}
					}
				}
			}
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
				left: 250rpx;
				top: 0;
				width: 500rpx;
				font-size: 40upx;
				font-weight: 500;
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
