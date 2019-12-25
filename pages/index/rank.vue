<template>
	<view class="container">

		<view class='tab-container' v-if="$app.getData('config').version != $app.getVal('VERSION')">
			<view class="tab-item" :class="{active:rankField == 'last_week_hot'}" @tap="changeField('last_week_hot')">上周</view>
			<view class="tab-item" :class="{active:rankField == 'last_month_hot_flower'}" @tap="changeField('last_month_hot_flower')">上月鲜花榜</view>
			<view class="tab-item" :class="{active:rankField == 'last_month_hot_coin'}" @tap="changeField('last_month_hot_coin')">上月金豆榜</view>
		</view>

		<!-- 列表 -->
		<view class="rank-list-container">

			<view class="rank-list-item" v-for="(item,index) in rankList" :key="index" @tap="goGroup(item.star_id)">
				<view class="num">{{index+1}}</view>
				<image class="avatar" :src="item.star.head_img_s" mode=""></image>
				<view class="content">
					<view class="top">
						<view class="name text-overflow">{{item.star.name}}</view>
					</view>
					<view class="bottom">
						<view class="hot-count">{{$app.formatNumber(item.hot)}}</view>
						<image class="icon-heart" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTERabwYgrRn5cjV3uoOa8BonlDPGMn7icL9icvz43XsbexzcqkCcrTcdZqw/0"
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
				rankField: 'last_week_hot',
				rankList: [],
			};
		},
		onLoad(option) {
			this.getRankList()
		},
		
		methods: {
			goGroup(starid) {
				// #ifdef H5
				this.modal = 'qrcode'
				return
				// #endif
			
				if (this.$app.getData('userStar')['id'] == starid) {
					this.$app.goPage('/pages/group/group')
				} else {
					this.$app.goPage('/pages/group/star?starid=' + starid)
				}
				return
			},
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
				background-color: $bg-color-2;
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
			
				.avatar {
					width: 80upx;
					height: 80upx;
					border-radius: 50%;
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
