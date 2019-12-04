<template>
	<view class='square-page-container'>
		<!-- 文章 -->
		<view class="art-item" v-for="(item,index) in artList" :key="index" @tap="goArticle(item)">
			<view class="top-wrap">
				<view class="avatar">
					<image :src="item.user.avatarurl" mode="widthFix"></image>
				</view>
				<view class="text">
					<view class="name">{{item.user.nickname}}</view>
					<view class="tips">{{item.create_time}}</view>
				</view>
			</view>

			<view class="title">
				{{item.title}}
				<text class="long-title" v-if="item.longTitle">全文</text>
			</view>
			<view class="imgs">
				<image v-for="(img,index_1) in item.imgs" :key="index_1" :src="img" mode="aspectFill" @tap.stop="preImgs(item.imgs,index_1)"></image>
			</view>

			<view class="bottom-wrap">
				<view class="tag text-overflow" :class="{hidden:!item.tag}">{{item.tag}}</view>
				<view class="btn flex-set">
					<view class="item flex-set">
						<text class="iconfont iconshare"></text>{{item.share_count||0}}
					</view>
					<view class="item flex-set" @tap.stop="goArticle(item, 1)">
						<text class="iconfont iconpinglun"></text>{{item.comment_count||0}}
					</view>
					<view class="item flex-set">
						<text class="iconfont icondianzan"></text>{{item.like_count||0}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page: 1,
				artList: [],
			};
		},
		onShow() {
			this.loadData()
		},
		methods: {
			goArticle(article, comment = 0) {
				this.$app.setData('curArticle', article)
				this.$app.goPage(`/pages/square/article?id=${article.id}&comment=${comment}`)
			},
			preImgs(imgs, current) {
				uni.previewImage({
					urls: imgs,
					current,
				})
			},
			loadData() {
				this.$app.request('article/list', {
					page: this.page
				}, res => {
					for (let key in res.data) {
						const value = res.data[key]

						if (value.title.length > 30) {
							res.data[key].title = value.title.slice(0, 100) + '... '
							res.data[key].longTitle = true
						}
					}

					if (this.page == 1) {
						this.artList = res.data
					} else {
						this.artList = this.artList.concat(res.data)
					}
				})
			}

		},
	}
</script>

<style lang="scss">
	.square-page-container {
		background-color: #FFF;

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

				.long-title {
					color: #5887b3;
				}
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
							margin: 0 6upx;
						}
					}
				}
			}
		}
	}
</style>
