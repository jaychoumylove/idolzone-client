<template>
	<view class="birthday-open-rank-container">
		<view class="user-list">
			<view class="item" v-for="(item,index) in userList" :key="index">
				<view class="cont flex-set">
					<view class="user-img">
						<image :src="item.user.avatarurl || $app.getData('AVATAR') " mode="aspectFill"></image>
						<view class="user-rank flex-set">{{index+1}}</view>
					</view>
				</view>
				<view class="cont flex-set">
					<view class="user-name text-overflow">{{item.user.nickname || $app.getData('NICKNAME')}}</view>
					<view class="star-name text-overflow"><text>{{item.star_info.name || '神秘爱豆'}}</text></view>
				</view>
				<view class="cont flex-set">
					<image class="animal-img" :src="item.animal_img" mode="widthFix"></image>
				</view>
				<view class="cont flex-set">
					<view class="user-courage-num">
						<view class="flex-set">
							<image class="help_num" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9Hlt9tIaEI9nvsCuYic6ug9viajc7iaHKbG4oCM2QeD3l0ScEkotHcKiaW6H7t39VKthHH4AJ2kpFmnPA/0" mode="widthFix"></image>
							<text>助力值</text>
						</view>
		
						<view class="num">{{item.help_num || 0}}</view>
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
				size: 15,
				type: 'user',
				select_star_id: '',
				userList: [],
			};
		},
		onLoad(option) {
			this.select_star_id = option.star_id;
			var that = this;
			this.getActiveRank('user', function(data) {
				that.userList = data;
			});
		},
		onReachBottom() {
			this.page++;
			var that = this;
			this.getActiveRank('user', function(data) {
				if (that.page == 1) {
					that.userList = data
				} else {
					that.userList = that.userList.concat(data)
				}
			});
		},
		methods: {
			getActiveRank(type, fcallback) {
				this.$app.request('birthday_open/rank_list', {
					page: this.page,
					size: this.size,
					type: type,
					star_id: this.select_star_id,
				}, res => {
					fcallback(res.data);
				})
			},
			
		}
	}
</script>

<style lang="scss">
	.birthday-open-rank-container{
		
		.help_num{
			width: 40rpx;
		}
		
		.user-list {
			width: 100%;
			display: flex;
			flex-direction: column;
			margin-top: 20rpx;
			padding: 0 20rpx;
				
			.item {
				width: 100%;
				background-color: #F7F5FE;
				border-radius: 20rpx;
				margin: 10rpx 0;
				padding: 20rpx;
				display: flex;
				flex-wrap: wrap;
				
				.cont {
					flex: 1 0%;
					display: flex;
					flex-direction: column;
					position: relative;
				
					.user-img {
						width: 100rpx;
				
						image {
							width: 90rpx;
							height: 90rpx;
							border-radius: 50%;
							border: 4rpx solid #FFC19D;
						}
				
						position: relative;
				
						.user-rank {
							width: 40rpx;
							height: 40rpx;
							color: #FFFFFF;
							font-weight: bold;
							background-color: #FFD840;
							border-radius: 50%;
							position: absolute;
							bottom: 0;
							right: 0;
						}
					}
				
					.user-name {
						max-width: 100%;
						color: #6B6B6B;
					}
				
					.star-name {
						max-width: 80%;
						margin-top: 10rpx;
				
						text {
							padding: 4rpx 10rpx;
							background-color: #FFC19D;
							border-radius: 20rpx;
							font-size: 24rpx;
							color: #FFFFFF;
						}
					}
				
					.animal-img {
						width: 80%;
						position: absolute;
					}
				
					.user-courage-num {
						display: flex;
						flex-direction: column;
						align-items: center;
						font-size: 24rpx;
						color: #888888;
				
						.num {
							padding-top: 10rpx;
							color: #FFC19D;
						}
					}
				}
			}
		}
	}
</style>
