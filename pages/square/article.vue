<template>
	<view class="article-page-container">
		<view class="art-item">
			<view class="top-wrap">
				<view class="avatar">
					<image :src="article.user.avatarurl" mode="widthFix"></image>
				</view>
				<view class="text">
					<view class="name">{{article.user.nickname}}</view>
					<view class="tips">{{article.create_time}}</view>
				</view>
			</view>
			<view class="title">{{article.title}}</view>
			<view class="imgs">
				<image v-for="(img,index_1) in article.imgs" :key="index_1" :src="img" mode="aspectFill" @tap="preImgs(article.imgs,index_1)"></image>
			</view>
			<view class="bottom-wrap">
				<view class="tag text-overflow" :class="{hidden:!article.tag}">{{article.tag}}</view>
			</view>
		</view>
		<!-- 评论区 -->
		<view class="user-comment-container">
			<view class="top-wrap">
				<view class="left flex-set">
					<view class="item" :class="{active:active=='share'}" @tap="active='share'">转发 {{article.share_count||0}}</view>
					<view class="item" :class="{active:active=='comment'}" @tap="active='comment'">评论 {{article.comment_count||0}}</view>
				</view>
				<view class="right">
					<view class="item" :class="{active:active=='like'}" @tap="active='like'">点赞 {{article.like_count||0}}</view>
				</view>
				<view class="bottom-line" :class="[active]"></view>
			</view>

			<view class="extra-wrap">
				<view class="comment-item" v-for="(item,index) in extraList" :key="index">
					<view class="left">
						<image :src="item.user.avatarurl" mode="aspectFill" class="avatar"></image>
					</view>
					<view class="right">
						<view class="nickname">{{item.user.nickname}}</view>
						<view class="content">{{item.content}}</view>
						<view class="bottom">
							<view class="date">{{item.create_time}}</view>
						</view>
					</view>

				</view>
			</view>
		</view>

		<!-- 底部btn -->
		<view class="bottom-btn-container">
			<view class="item flex-set">
				<text class="iconfont iconshare"></text>转发
			</view>
			<view class="split">|</view>
			<view class="item flex-set" @tap="modal='comment'">
				<text class="iconfont iconpinglun"></text>评论
			</view>
			<view class="split">|</view>
			<view class="item flex-set">
				<text class="iconfont icondianzan"></text>点赞
			</view>
		</view>

		<!-- modal -->
		<view v-if="modal=='comment'" class="comment-modal-container" @tap="modal=''">
			<view class="comment-wrap" @tap.stop>
				<textarea class="input" value="" focus adjust-position placeholder="评论..." style="height: 100%;"/>
				<view class="btn flex-set">发送</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				modal: '',

				article: {}, // 文章内容
				active: 'comment', // 当前选择tab:默认是评论
				extraList: [],
			};
		},
		onLoad(option) {
			// 使用缓存中的文章内容
			this.article = this.$app.getData('curArticle') || {}
			// 文章ID
			this.article.id = option.id
			// 是否定位到评论区
			this.scrollToComment = option.comment
		},
		onShow() {
			this.getArticle()
			this.getArticleExtra()
		},
		methods: {
			preImgs(imgs, current) {
				uni.previewImage({
					urls: imgs,
					current,
				})
			},
			getArticle() {
				this.$app.request('article', {
					id: this.article.id,
				}, res => {
					this.article = res.data

					if (this.scrollToComment == '1') {
						this.$nextTick(function() {
							this.$app.getEle('.user-comment-container', res => {
								uni.pageScrollTo({
									scrollTop: res[0].top,
									duration: 0
								}) 
							})
						})
					}
				})
			},
			getArticleExtra() {
				this.$app.request('article/extra', {
					id: this.article.id,
					active: this.active,
				}, res => {
					this.extraList = res.data
				})
			}
		}
	}
</script>

<style lang="scss">
	.article-page-container {
		.art-item {
			padding: 20upx 30upx;
			border-bottom: 14upx solid #EFEFEF;

			.top-wrap {
				display: flex;
				align-items: center;

				.avatar {
					border-radius: 50%;
					overflow: hidden;
					width: 80upx;
					height: 80upx;
				}

				.text {
					padding: 0 20upx;

					.name {}

					.tips {
						font-size: $font-s;
						color: $text-color-2;
					}
				}
			}

			.title {
				font-size: $font-l;
				padding-top: 20upx;
			}

			.imgs {
				margin: 10upx 0;
				display: grid;
				grid-template-columns: repeat(3, 1fr);

				image {
					margin: 4upx 0;
					width: 225upx;
					height: 225upx;
					border-radius: 10upx;
				}
			}

			.bottom-wrap {
				display: flex;
				justify-content: space-between;
				padding: 10upx 0;

				.tag {
					background-color: #f2f2f2;
					padding: 10upx 20upx;
					border-radius: 40upx;
					margin-right: 20upx;
					font-size: $font-s;
				}

				.tag.hidden {
					opacity: 0;
				}

				.btn {
					.item {
						color: #9494b0;
						width: 120upx;
						text-align: center;

						.iconfont {
							font-size: $font-xl;
							margin: 0 5upx;
						}
					}
				}
			}
		}

		.user-comment-container {
			.top-wrap {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 20upx 30upx;
				border-bottom: 2upx solid #EFEFEF;
				position: relative;

				.item {
					width: 150upx;
					text-align: center;
				}

				.item.active {
					font-weight: 700;
				}


				.bottom-line {
					position: absolute;
					width: 80upx;
					height: 6upx;
					background-color: #FC7025;
					border-radius: 40upx;
					bottom: 6upx;
					transition: transform .3s;
				}

				.bottom-line.share {
					transform: translateX(34upx);
				}

				.bottom-line.comment {
					transform: translateX(184upx);
				}

				.bottom-line.like {
					transform: translateX(578upx);
				}
			}

			.fixed-bottom {}

			.extra-wrap {
				.comment-item {
					padding: 20upx;
					display: flex;
					border-bottom: 2upx solid #efefef;

					.left {
						.avatar {
							border-radius: 50%;
							overflow: hidden;
							width: 80upx;
							height: 80upx;
						}
					}

					.right {
						flex: 1;
						margin-left: 20upx;

						.nickname {
							font-size: $font-s;
							color: #505050;
						}

						.content {
							padding: 10upx 0;
						}

						.bottom {
							.date {
								color: #8f8f8f;
								font-size: $font-s;
							}
						}
					}
				}

				.comment-item:last-child {
					border-bottom: 200upx solid #efefef;
				}
			}
		}

		.bottom-btn-container {
			position: fixed;
			width: 100%;
			bottom: 0;
			background-color: #f8f8fa;
			border-top: 2upx solid #efefef;
			display: flex;
			justify-content: space-around;
			height: 90upx;
			align-items: center;

			.item {
				text-align: center;
				flex: 1;
				height: 100%;

				.iconfont {
					margin: 0 10upx;
					font-size: $font-l;
				}
			}

			.split {
				color: #efefef;
			}
		}

		.comment-modal-container {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background-color: rgba(#333, .6);

			.comment-wrap {
				position: absolute;
				bottom: 0;
				width: 100%;
				background-color: #f8f8f8;
				padding: 20upx;
				display: flex;
				height: 200upx;

				.input {
					height: 100%;
					border: 2upx solid #d8d8d8;
					border-radius: 10upx;
					background-color: #FFF;
					flex: 1;
					padding: 20upx;
				}

				.btn {
					width: 120upx;
					border: 2upx solid #d8d8d8;
					background-color: #EFEFEF;
					border-radius: 10upx;
					margin-left: 20upx;
				}
			}
		}
	}
</style>
