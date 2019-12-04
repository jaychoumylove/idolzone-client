<template>
	<view class="container">

		<!-- <view class='tab-container'>
			<view class="tab-item" :class="{active:rankField == 'fengyun'}" @tap="changeField('fengyun')">粉丝风云榜</view>
		</view> -->

		<!-- 列表 -->
		<view class="rank-list-container">

			<view class="rank-list-item" v-for="(item,index) in rankList" :key="index">
				<view class="num">{{index+1}}</view>
				<view class='avatar-wrap'>
					<image class="avatar" :src="item.user.avatarurl" mode="aspectFill"></image>
					<image class="headwear position-set" :src="item.user.headwear&&item.user.headwear.img" mode=""></image>
				</view>
				<view class="content">
					<view class="top">
						<view class="name text-overflow">{{item.user.nickname}}</view>
						<view class="star flex-set text-overflow">{{item.star.name}}</view>
					</view>
					<view class="bottom">贡献{{item.count||''}}
						<image class="icon-heart" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTERziauZWDgQPHRlOiac7NsMqj5Bbz1VfzicVr9BqhXgVmBmOA2AuE7ZnMbA/0"
						 mode=""></image>
					</view>
				</view>
			</view>

		</view>

	</view>
</template>

<script>
	import listItemComponent from '@/components/listItemComponent.vue';
	export default {
		components: {
			listItemComponent
		},
		data() {
			return {
				rankField: 'fengyun',
				rankList: [],
				page: 1,
			};
		},
		onLoad(option) {
			this.getRankList()
		},
		onReachBottom() {
			this.page++
			this.getRankList()
		},
		methods: {
			changeField(field) {
				this.page = 1
				this.rankField = field
				this.keywords = ''
				this.getRankList()
			},
			getRankList() {
				this.$app.request(this.$app.API.STAR_RANK, {
					page: this.page,
					rankField: this.rankField,
				}, res => {
					if (this.page == 1) {
						this.rankList = res.data
					} else {
						this.rankList = this.rankList.concat(res.data)
					}
				})
			},
		},
	}
</script>

<style lang="scss" scoped>
	.container {
		.tab-container {
			padding: 20upx 40upx;
			display: flex;
			align-items: center;
			justify-content: space-around;

			.tab-item {
				position: relative;
				margin: 0 20upx;
			}

			.tab-item.active {
				font-size: 30upx;
				font-weight: 700;
			}

			.tab-item.active::before {
				position: absolute;
				content: "";
				height: 8upx;
				width: 50upx;
				border-radius: 14upx;
				bottom: -10upx;
				left: 50%;
				transform: translateX(-50%);
				background-color: #f00;
			}
		}

		.rank-list-container {

			.rank-list-item {
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
				
				.bottom {
					display: flex;
					align-items: center;
					font-size: 26upx;
				
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


	}
</style>
