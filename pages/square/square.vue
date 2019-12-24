<template>
	<view class="square-page-container">
		<view class="top-container" :style="{backgroundColor:starInfo.square_bg_color||'#856B5C'}">
			<!-- <image class="star-img" :src="starInfo.square_bg_img"></image> -->
			<view class="content-wrap">
				<view class="starname">
					<view class="name">{{starInfo.name||''}}</view>
					<image class="avatar" :src="starInfo.head_img_s" mode="aspectFill"></image>
				</view>
				<view class="score">
					<view class="item">
						<view class="no">NO.{{starInfo.star_rank&&starInfo.star_rank.week_hot_rank?starInfo.star_rank.week_hot_rank:''}}</view>
						<view class="tips">明星排行榜></view>
					</view>
					<view class="item">
						<view class="no">{{starInfo.star_rank&&starInfo.star_rank.week_hot?starInfo.star_rank.week_hot:''}}<text class="wan">万</text>
						</view>
						<view class="tips">本周人气></view>
					</view>
				</view>
				<view class="bottom-wrap">
					<view class="left flex-set">
						<view>{{starInfo.name||''}}热搜实时通知</view>
						<view class="subscribe-btn" :class="{sub:isSub==1}" @tap="subscribe">{{isSub==1?'已订阅':'马上订阅+'}}</view>
					</view>
					<view class="right send-btn" @tap="$app.goPage('/pages/group/group')">为TA打榜</view>
				</view>
			</view>
		</view>

		<!-- tab-btn -->
		<!-- <view class="tab-wrap">
			<view class="item" :class="{active:tabActive==0}" @tap="tabActive=0">明星动态</view>
			<view class="item" :class="{active:tabActive==1}" @tap="tabActive=1">粉丝圈</view>
			<view class="item" :class="{active:tabActive==2}" @tap="tabActive=2">应援</view>
		</view> -->

		<!-- 内容列表 -->
		<view class="article-list-container">
			<view class="article-item" v-for="(item,index) in artList" :key="index">
				<view class="top-wrap">
					<view class="left flex-set">
						<view class="dot" :class="{red:index%3==0,yellow:index%3==1,green:index%3==2}"></view>
						<view class="avatar">
							<image :src="item.avatarurl" mode="aspectFill"></image>
						</view>
						<view class="text">
							<view class="name">{{item.nickname}}</view>
							<view class="tips">{{item.tips}}</view>
						</view>
					</view>
					<!-- <view class="icon">热门</view> -->
					<view class="right" v-if="$app.getData('userStar').captain" @tap="deleteArticle(item.id)">
						<view class="iconfont iconclose"></view>
					</view>
				</view>
				<view class="content-wrap transmit">
					<rich-text :nodes="item.transmit_title"></rich-text>
				</view>
				<view class="content-wrap">
					<!-- 文字 -->
					<rich-text :nodes="item.title"></rich-text>
					<!-- 图片 -->
					<view class="imgs" v-if="item.imgs">
						<view class="img-wrap" v-for="(img,index_1) in item.imgs" :key="index_1">
							<image :class="{l:item.imgs.length==1||item.imgs.length==2||item.imgs.length==4}" lazy-load :src="img" mode="aspectFill"
							 @tap.stop="preImgs(item.imgs,index_1)"></image>
							<view class="extra-icon" v-if="~img.indexOf('.gif')">动图</view>
						</view>
					</view>

					<!-- 视频 -->
					<video class="video" v-if="item.video && ~item.video.indexOf('http')" :id="`video_${item.id}`" @play="videoPlay"
					 @error="videoError(item.id, index)" :src="item.video"></video>

					<!-- <view class="date">于12小时前进入微博热门搜索</view> -->
				</view>
			</view>

		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabActive: 0, // tab栏
				page: 1,
				artList: [],
				starInfo: {},
				isSub: 0, // 0未订阅 1已订阅
			};
		},
		onLoad(option) {
			this.video_id = ''
		},
		onShow() {
			if (!this.$app.getData('userStar').id) {
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
			} else {
				!this.loadSuccess && this.loadData()
			}
		},
		onShareAppMessage() {
			return this.$app.commonShareAppMessage()
		},
		onPullDownRefresh() {
			this.page = 1
			this.loadData()
		},
		onReachBottom() {
			this.page++
			this.loadData()
		},
		methods: {
			/**
			 * 删除文章
			 * @param {Object} id 文章id
			 */
			deleteArticle(id) {
				this.$app.modal('是否删除该文章', () => {
					this.$app.request('article/delete', {
						id
					}, res => {
						this.$app.toast('删除成功')
						for (let key in this.artList) {
							if (this.artList[key].id == id) {
								this.artList.splice(key, 1)
							}
						}
					}, 'POST', true)
				})
			},
			videoPlay(e) {
				if (e.currentTarget.id != this.video_id) {
					// 停止当前视频播放，开始播放下一个视频
					uni.createVideoContext(this.video_id).pause();
					this.video_id = e.currentTarget.id
				}
			},
			videoError(id, index) {
				this.$app.request('article/refrashVideo', {
					id
				}, res => {
					this.artList[index].video = res.data
				})
			},
			subscribe() {
				this.$app.request('article/subscribe', {}, res => {
					this.isSub = res.data.sub
					if (res.data.sub == 1) {
						this.$app.toast('订阅成功', 'success')
					}
				}, 'POST', true)
			},
			preImgs(imgs, current) {
				const urls = [].concat(imgs)
				for (let key in urls) {
					urls[key] = urls[key].replace('/small/', '/large/')
				}
				uni.previewImage({
					urls,
					current,
				})
			},
			loadData() {
				this.$app.request('page/square', {
					star_id: this.$app.getData('userStar').id,
					page: this.page,
					size: 3
				}, res => {
					this.loadSuccess = true
					uni.stopPullDownRefresh()
					if (this.page == 1) {
						this.artList = res.data.article
					} else {
						this.artList = this.artList.concat(res.data.article)
					}

					// 是否订阅
					this.isSub = res.data.subscribe
					// 明星信息
					res.data.starInfo.star_rank.week_hot = (res.data.starInfo.star_rank.week_hot / 10000).toFixed(1)
					this.starInfo = res.data.starInfo
					uni.setNavigationBarColor({
						backgroundColor: this.starInfo.square_bg_color || '#856B5C',
						frontColor: '#ffffff',
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.square-page-container {
		.top-container {
			height: 300upx;
			position: relative;
			color: #FFF;

			.star-img {
				position: absolute;
			}

			.content-wrap {
				height: 100%;
				padding: 0 40upx;
				position: relative;
				z-index: 1;

				.starname {
					font-size: 42upx;
					padding-top: 30upx;
					margin-bottom: -125upx;
					display: flex;
					align-items: flex-start;
					justify-content: space-between;

					.avatar {
						width: 160upx;
						height: 160upx;
						border-radius: 50%;
						margin-right: 40upx;
						border: 4upx solid #fff;
					}
				}

				.score {
					padding-top: 45upx;
					display: flex;

					.item {
						margin-right: 50upx;

						.no {
							font-family: 'Impact';
							font-size: 44upx;
							line-height: 1.1;

							.wan {
								font-size: $font-m;
								margin: 0 5upx;
							}
						}

						.tips {
							font-size: $font-s;
						}
					}
				}

				.bottom-wrap {
					padding-top: 32upx;
					display: flex;
					justify-content: space-between;
					font-size: $font-s;

					.subscribe-btn {
						background-color: #fbcc3e;
						color: #333333;
						border-radius: 20upx;
						padding: 0 20upx;
						margin: 0 20upx;
					}

					.subscribe-btn.sub {
						background-color: #fff9e5;
					}

					.send-btn {
						background-color: #fff9e5;
						color: #333333;
						border-radius: 20upx;
						padding: 0 20upx;
					}
				}
			}
		}

		.tab-wrap {
			padding: 25upx 40upx;
			display: flex;
			align-items: flex-end;
			justify-content: space-between;
			font-size: 32upx;

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

		.article-list-container {
			padding: 20upx 40upx;

			.article-item {
				margin-bottom: 20upx;

				.top-wrap {
					display: flex;
					align-items: center;
					justify-content: space-between;

					.dot {
						width: 16upx;
						height: 16upx;
						border-radius: 50%;
						margin-right: 14upx;
					}

					.dot.red {
						background-color: #DB4437;
					}

					.dot.yellow {
						background-color: #FFCD40;
					}

					.dot.green {
						background-color: #0F9D58;
					}

					.avatar {
						border-radius: 50%;
						overflow: hidden;
						width: 70upx;
						height: 70upx;
						z-index: 1;

					}

					.text {
						padding: 0 10upx;
						line-height: 1.3;

						.name {
							font-weight: 700;
							padding-top: 16upx;
						}

						.tips {
							font-size: 24upx;
							color: #a8a8a8;
						}
					}

					.icon {
						font-size: 20upx;
						padding: 0 5upx;
						border-radius: 2upx;
						color: #FFF;
						background-color: #f3b90b;
					}

					.right {
						.iconfont {
							color: #999;
						}
					}
				}

				.content-wrap {
					background-color: #fffbf8;
					padding: 10upx 30upx 10upx 30upx;
					margin: 10upx 0;
					border-radius: 20upx;

					.imgs {
						display: flex;
						flex-wrap: wrap;
						margin: 4upx 0;

						.img-wrap {
							position: relative;
							margin: 4upx;

							image {
								width: 190upx;
								height: 190upx;
								border-radius: 4upx;
							}

							image.l {
								width: 200upx;
								height: 200upx;
							}

							.extra-icon {
								position: absolute;
								background-color: rgba(#21A3F1, .8);
								bottom: 0;
								right: 0;
								color: #FFF;
								font-size: 22upx;
								padding: 0 8upx;

								border-radius: 5upx;
							}
						}

					}

					.video {
						width: 100%;
						height: 280upx;
					}

					.date {
						font-size: 20upx;
						color: #999999;
					}
				}

				.content-wrap.transmit {
					background-color: #FFF;
					padding: 0 60upx 0 110upx;
				}
			}

			.article-item.hide {
				animation: hide 1s forwards;

				@keyframes hide {
					50% {
						transform: translateX(-750upx);
					}

					100% {
						transform: translateX(-750upx);
						height: 0;
					}
				}
			}
		}

	}
</style>
