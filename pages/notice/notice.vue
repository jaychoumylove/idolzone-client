<template>
	<view class="container">
		<web-view :src="webview" v-if="webview" progress=0></web-view>
		<block v-else v-for="(item,index) in article" :key="index">
			<view class="article-title" v-if="item.type=='title'">{{item.content}}</view>
			<text class="article-content" decode v-if="item.type=='content'">{{item.content}}</text>
			<image class="article-image" @tap="preImg(item.content)" v-if="item.type=='image'" :src="item.content" mode="widthFix"></image>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				article: '',
				webview: '',
				title:'',
				aid:'',
			};
		},
		onShareAppMessage(e) {
			const shareType = e.target && e.target.dataset.share;
			
			return this.$app.commonShareAppMessage(shareType)
		},
		onLoad(option) {
			console.log(option)
			if (option.url) {
				this.urlFetch(option.url)
			} else if (option.id) {
				this.getArticle(option.id)
			}
		},
		methods: {
			preImg(img) {
				this.$app.preImg(img)
			},
			urlFetch(url) {
				// #ifdef H5 
				this.$app.goPage(url)
				// #endif

				// #ifdef MP || APP-PLUS
				this.webview = url
				// #endif
			},
			getArticle(id) {
				this.$app.request('article/notice', {
					id
				}, res => {
					this.title = res.data.name
					this.aid =  res.data.id
					try {
						this.article = JSON.parse(res.data.value)
					} catch (e) {
						this.urlFetch(res.data.value)
					}

					uni.setNavigationBarTitle({
						title: res.data.name
					});
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.container {
		padding: 20upx 40upx;

		.article-title {
			display: flex;
			margin-top: 40upx;
			margin-bottom: 20upx;
			align-items: center;
			font-size: 32upx;
			border-left: 10upx solid $bg-color-2;
			padding-left: 20upx;
			font-weight: 700;
			line-height: 1.0;
		}

		.article-content {
			text-indent: 30upx;
			margin: 10upx;
			display: block;
		}

		.article-image {
			width: 60%;
			margin: 30upx auto;
			display: block;
			border-radius: 10upx;
		}
	}
</style>
