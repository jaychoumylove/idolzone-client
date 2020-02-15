<template>
	<view class="container">
		

		<view class="item-wrapper" :class="{top:item.isTop}" v-for="(item,index) in articleList" :key="index" @tap="goArticle(item.id)">
			<view class="left text-overflow">{{item.title}}
				<image v-if="item.isTop" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GYPLed207KM6QRhfgRZzHJffMxEX9nT7ibDtKG8nNOfzSIJmEo46MfX7My2110ZiaIFNEiaDI4GokMw/0" mode="widthFix"></image>
				<image v-else-if="item.isNew" src="https://mmbiz.qpic.cn/mmbiz_gif/w5pLFvdua9H2awqYhgKRktNwUT19uEzicRMZbITUbzNRRpUPQUBLSBSrALbX6lI9whDkbhUYeyWW7YUJsicTkCqA/0" mode="widthFix"></image>
			</view>
			<view class="right">{{item.isTop?'':item.time}}</view>
		</view>
	</view>
</template>

<script>
	import listItemComponent from '@/components/listItemComponent.vue'
	export default {
		components: {
			listItemComponent,
		},
		data() {
			return {
				requestCount: 1,

				articleList: [],
			};
		},
		onLoad() {
			this.getArticleList()
		},
		methods: {
			goArticle(id) {
				this.$app.goPage('/pages/notice/notice?id=' + id)
			},
			getArticleList() {
				this.$app.request('article/noticelist', {}, res => {

					const resList = []
					for (let v of res.data) {
						resList.push({
							id: v.id,
							isTop: v.is_top,
							title: v.name,
							time: v.create_time.slice(0, 11),
							isNew: Date.now() / 1000 - this.$app.strToTime(v.create_time) < 2 * 24 * 3600
						})
					}
					this.articleList = resList
					this.$app.closeLoading(this)
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.container {

		.item-wrapper {
			padding: 10upx 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 2upx solid #efefef;

			height: 110upx;

			.left {
				margin-left: 40upx;
				font-size: 30upx;
				width: 450upx;
				
				image{
					width: 59upx;
					height: 32upx;
					margin-left: 10upx;
				}
			}

			.right {
				margin-right: 30upx;
			}
			
			.highlight {
				font-weight: 700;
			}
		}
		
	}
</style>
