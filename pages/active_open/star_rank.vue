<template>
	<view class="star-rank-container">
		<view class="star-list">
			<view class="star-item" v-for="(item,index) in starList" :key="index">
				<view class="star-img">
					<image :src="item.star.head_img_s" mode="aspectFill"></image>
					<view class="rank flex-set">{{index+1}}</view>
				</view>
				<view class="star-info">
					<view class="star-info-top">
						<view class="star-name text-overflow">{{item.star.name || '神秘爱豆'}}</view>
						<view class="star-reward flex-set" v-if="pet_adventure.star_reward.list[index]">
							{{pet_adventure.star_reward.list[index]}}
						</view>
					</view>
					<view class="star-courage-num">
						获得勇气值：<view class="num">{{item.courage || 0}}</view>
					</view>
				</view>
				<view class="user-info" v-if="item.userStar.length>0">
					<view class="user">
						<view class="best-user">最佳助攻</view>
						<view class="best-user-info">
							<block v-for="(item,index) in item.userStar" :key="index">
								<image class="user-img" :src="item.user.avatarurl" mode="aspectFill"></image>
							</block>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import btnComponent from '@/components/btnComponent.vue';
	export default {
		components: {
			btnComponent
		},
		data() {
			return {
				courage_img: 'https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9Exvr8ppbZ5VVuxbP7tSmU4nKUGxoYVA4KdJwS3Jud6MOXdooRdAEHYuqBeib1976IIGUOvTcO5OoQ/0',
				page: 1,
				size: 10,
				type: 'star',
				select_star_id: '',
				rankField: 'courage',
				starList: [],
				pet_adventure: '',
			};
		},
		onShow() {
			this.pet_adventure = this.$app.getData('config').pet_adventure
			var that = this;
			this.getActiveRank('star', 10, function(data) {
				that.starList = data;
			});
		},
		onReachBottom() {
			this.page++;
			var that = this;
			this.getActiveRank('star', 10, function(data) {
				if (that.page == 1) {
					that.starList = data
				} else {
					that.starList = that.starList.concat(data)
				}
			});
		},
		methods: {
			getActiveRank(type, size, fcallback) {
				this.$app.request('activeopen/rank', {
					page: this.page,
					size: size,
					type: type,
					star_id: this.select_star_id,
					rankField: this.rankField,
				}, res => {
					fcallback(res.data);
				})
			},
			
		}
	}
</script>

<style lang="scss">
	.star-rank-container{
		height: 100%;
		padding: 20rpx;
		
		.courage {
			width: 40rpx;
		}
		
		.star-list{
			width: 100%;
			display: flex;
			flex-direction: column;
			.star-item{
				padding: 20rpx 30rpx;
				border-radius: 30rpx;
				background-color: #FCF6EA;
				display: flex;
				flex-direction: row;
				align-items: center;
				margin: 10rpx 0;
				
				.star-img {
					width: 100rpx;
				
					image {
						width: 100rpx;
						height: 100rpx;
						border-radius: 50%;
						border: 4rpx solid #FFC19D;
					}
				
					position: relative;
				
					.rank {
						width: 40rpx;
						height: 40rpx;
						color: #FFFFFF;
						font-size: 24rpx;
						font-weight: bold;
						background-color: #FFD840;
						border-radius: 50%;
						position: absolute;
						bottom: 0;
						right: 0;
					}
				}
			
				.star-info{
					display: flex;
					flex-direction: column;
					padding-left: 25rpx;
					.star-info-top{
						display: flex;
						flex-direction: row;
						align-items: center;
						.star-name {
							font-weight: bold;
							color: #8A4B36;
							padding-top: 5rpx;
							max-width: 180rpx;
						}
						.star-reward {
							min-width: 120rpx;
							height: 40rpx;
							color: #F88A4B;
							font-weight: bold;
							font-size: 24rpx;
							background-color: #FFDFC6;
							margin-left: 10rpx;
						}
					}
					.star-courage-num {
						color: #FFC19D;
						display: flex;
						flex-direction: row;
						align-items: center;
						font-size: 24rpx;
						padding-top: 10rpx;
					}
				}
				
				.user-info{
					display: flex;
					justify-content: flex-end;
					flex: 1 0%;
					color: #FFC19D;
					
					.user{
						display: flex;
						flex-direction: column;
						.best-user{
							font-size: 24rpx;
						}
						.best-user-info{
							padding-top: 10rpx;
							.user-img{
								width: 60rpx;
								height: 60rpx;
								border-radius: 50%;
							}
						}
					}
					
				}
			}
		}
	}
</style>
