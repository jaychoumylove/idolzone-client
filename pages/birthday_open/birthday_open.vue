<template>
	<view class="birthday-open-container">
		<view class="top-tab">
			<view class="top-tab-list">
				<view class="tab-item flex-set" :class="{active:type==1}" @tap="currentType(1)">
					<text>做助力任务</text>
				</view>
				<view class="tab-item flex-set" :class="{active:type==2}" @tap="currentType(2)">
					<text>助力值排行</text>
				</view>
				<view class="tab-item flex-set" :class="{active:type==3}" @tap="currentType(3)">
					<text>解锁生日开屏</text>
				</view>
			</view>
		</view>

		<view class="help-user-container" v-if="type == 1">
			<view class="help_desc">
				<text>{{taskInfo.notice.help_desc}}</text>
				<view class="log" @tap="goOtherLog('birthday_open_help_log')">领取明细>></view>
			</view>
			<view class="list-wrapper">
				<view class="item" v-for="(item,index) in taskInfo.help_task_list" :key="index">
					<view class="left-content badge-type">
						<image class="img" :src="item.icon" mode="aspectFill"></image>
						<view class="content">
							<view class="text-overflow">{{item.title}}</view>
							<view class="bottom">{{item.desc}}{{$app.formatNumber(item.need_num)}}{{item.name}}</view>
							<view class="bottom">({{$app.formatNumber(item.count)}}/{{$app.formatNumber(item.need_num)}})</view>
						</view>
					</view>

					<view class="right-content">
						<view class="earn">
							<view class="right-item">
								<image class="help_num" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9Hlt9tIaEI9nvsCuYic6ug9viajc7iaHKbG4oCM2QeD3l0ScEkotHcKiaW6H7t39VKthHH4AJ2kpFmnPA/0" mode="widthFix"></image>
								<view class="add-count">+{{item.get_help_num?item.get_help_num:item.help_num}}</view>
							</view>

						</view>
						<view class="btn" @tap="doTask(item,index)">

							<btnComponent type="default" v-if="item.status == 0">
								<button class="btn">
									<view class="flex-set" style="width: 130upx;height: 65upx;">{{item.btn_text||'去完成'}}</view>
								</button>
							</btnComponent>

							<btnComponent type="success" v-if="item.status == 1">
								<view class="flex-set" style="width: 130upx;height: 65upx;">可领取</view>
							</btnComponent>


						</view>

					</view>
				</view>


			</view>
			<view class="yingyuan_img">
				<image :src="taskInfo.yingyuan_reward_img" mode="widthFix"></image>
			</view>
		</view>

		<view class="rank-container" v-if="type == 2">
			<view class="user-list-three">
				<view class="user-item" v-for="(item,index) in userList" :key="index" v-if="index<3" @tap="goOtherManor(item.user_id)">
					<view class="user-item-cont">
						<view class="top-animal-img flex-set">
							<image class="bg-img" v-if="index==0" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FD3Srp4OIkJXZJK36LesDT0Bibg3Fh1F8rbZfdy2T3NlSW4wn67ZA2XESEAt1IflYj7LMRA8ymavg/0"
							 mode="widthFix"></image>
							<image class="bg-img" v-if="index==1" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FD3Srp4OIkJXZJK36LesDT9lt8bNnWEDwcgbpp3icjHxoIc8HMnHxdKof1M6ia46wsYm8GTIRYMIgA/0"
							 mode="widthFix"></image>
							<image class="bg-img" v-if="index==2" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FD3Srp4OIkJXZJK36LesDTRR9iatepFcecf9j77C7IHfQAxbyAQicE0EQPexVENBH6dljGia0JBBbcQ/0"
							 mode="widthFix"></image>
							<image class="animal-img" v-if="index==0" style="width: 90%" :src="item.animal_img" mode="widthFix"></image>
							<image class="animal-img" v-if="index==1" style="width: 150%" :src="item.animal_img" mode="widthFix"></image>
							<image class="animal-img" v-if="index==2" :src="item.animal_img" mode="widthFix"></image>
						</view>
						<view class="user-item-info flex-set" :class="{'item-info-color1':index==0,'item-info-color2':index==1,'item-info-color3':index==2}">
							<image v-if="index==1" style="width: 20%;" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FD3Srp4OIkJXZJK36LesDTbZF23B2C02WicaR181peBxjWa9mwGrZ4lKRHCtaIfxCtIslibUDiaLAuA/0"
							 mode="widthFix"></image>
							<view class="user-info">
								<view class="user-img">
									<image :src="item.user.avatarurl || $app.getData('AVATAR') " mode="aspectFill"></image>
									<view class="user-rank flex-set">{{index==2?'3':(index==1?'1':'2')}}</view>
								</view>
								<view class="user-name text-overflow">{{item.user.nickname || $app.getData('NICKNAME')}}</view>
							</view>
							<view class="star-name text-overflow">
								<text>{{item.star_info.name || '神秘爱豆'}}</text>
							</view>
							<view class="user-courage-num">
								<image class="help_num" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9Hlt9tIaEI9nvsCuYic6ug9viajc7iaHKbG4oCM2QeD3l0ScEkotHcKiaW6H7t39VKthHH4AJ2kpFmnPA/0" mode="widthFix"></image>
								<view class="num">{{item.help_num || 0}}</view>
							</view>
						</view>
					</view>
				</view>
				<view v-if="userList.length==0" style="width: 100%; text-align: center; font-size: 24rpx; padding-top: 20rpx; color: #999999;">
					暂时无人助力
				</view>
			</view>
			<view class="user-list">
				<view class="item" v-for="(item,index) in userList" :key="index" v-if="index>=3" @tap="goOtherManor(item.user_id)">
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
	
		<view class="star-rank-container" v-if="type == 3">
			<view class="rank-tips flex-set" v-if="taskInfo.notice.rank_tips1">
				<view>{{taskInfo.notice.rank_tips1}}</view>
				<view>{{taskInfo.notice.rank_tips2}}</view>
			</view>
			<view class="star-list">
				<view class="star-item" v-for="(item,index) in starList" :key="index">
					<view class="star-img">
						<image :src="item.star.head_img_s" mode="aspectFill"></image>
						<view class="rank flex-set">{{index+1}}</view>
					</view>
					<view class="star-info">
						<view class="star-info-top">
							<view class="star-name text-overflow">{{item.star.name || '神秘爱豆'}}</view>
							<view class="star-reward flex-set" v-if="item.star.birthday_text">
								{{item.star.birthday_text}}
							</view>
						</view>
						<view class="star-courage-num">
							获得助力值：<view class="num">{{item.help_num || 0}}</view>
						</view>
					</view>
					<view class="user-info" v-if="item.userStar.length>0">
						<view class="user" @tap="goStarGroup(item.star.id)">
							<view class="best-user">最佳助攻>></view>
							<view class="best-user-info">
								<block v-for="(item,index) in item.userStar" :key="index">
									<image class="user-img" :src="item.user.avatarurl" mode="aspectFill"></image>
								</block>
							</view>
						</view>
					</view>
				</view>
				<view v-if="starList.length==0" style="width: 100%; text-align: center; font-size: 24rpx; padding-top: 40rpx; color: #999999;">
					暂时无人助力爱豆
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
				page: 1,
				size: 15,
				type: 1,
				taskInfo: [],
				starList: [],
				userList: [],
			};
		},
		onShow() {
			this.getTaskList()
		},
		onReachBottom() {
			this.page++;
			if(this.type==2){
				var that = this;
				this.getActiveRank('user', function(data) {
					if (that.page == 1) {
						that.userList = data
					} else {
						that.userList = that.userList.concat(data)
					}
				});
			}
			if(this.type==3){
				var that = this;
				this.getActiveRank('star', function(data) {
					if (that.page == 1) {
						that.starList = data
					} else {
						that.starList = that.starList.concat(data)
					}
				});
			}
		},
		methods: {
			goOtherLog(type){
				if (!type) return false;
				uni.navigateTo({
					url:`/pages/log_other/log_other?type=${type}`
				})
			},
			currentType(type) {
				this.type = type;
				this.page = 1;
				if(type==1){
					this.getTaskList();
				}else if(type==2){
					var that = this;
					this.getActiveRank('user', function(data) {
						that.userList = data;
					});
				}else if(type==3){
					var that = this;
					this.getActiveRank('star', function(data) {
						that.starList = data;
					});
				}
			},
			doTask(task, index) {
				if (task.gopage && task.status == 0) {
					// 跳转页面
					this.$app.goPage(task.gopage)
				} else if (task.status == 1) { // 去领取
					this.taskSettle(index)
				}
			},
			// 领取奖励
			taskSettle(index) {
				uni.showLoading({
					mask: true,
					title: "正在领取..."
				});
				this.$app.request('birthday_open/task_settle', {
					index:index
				}, res => {
					uni.showToast({
						mask: true,
						title: "领取成功",
						icon: 'success'
					})
					this.getTaskList()
				}, 'POST', true)
			},
			getTaskList() {
				this.$app.request('birthday_open/task_info', {}, res => {
					this.taskInfo = res.data;
				})
			},
			getActiveRank(type, fcallback) {
				this.$app.request('birthday_open/rank_list', {
					page: this.page,
					size: this.size,
					type: type,
				}, res => {
					fcallback(res.data);
				})
			},
			goOtherManor(user_id) {
				if (!user_id) return false;
				uni.navigateTo({
					url:`/pages/manor/other_manor?user=${user_id}`
				})
			},
			goStarGroup(star_id) {
				if (!star_id) return false;
				uni.navigateTo({
					url:`/pages/birthday_open/birthday_open_rank?star_id=${star_id}`
				})
			},
		},
	}
</script>

<style lang="scss">
	.birthday-open-container {
		padding: 20rpx;

		.top-tab {
			width: 100%;
			border-bottom: 2rpx solid #F8F6FF;
			padding: 20rpx 40rpx 40rpx;

			.top-tab-list{
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				border: 4rpx solid #FFD52A;
				border-radius: 60rpx;
				.tab-item {
					width: 33.3%;
					padding: 15rpx 0;
					text{
						width: 200rpx; 
						font-size: 24rpx; 
						text-align: center;
					}
				}
				.tab-item.active {
					background-color: #FFD52A !important;
					color: #FFFFFF !important;
					border-radius: 60rpx;
				}
			}
			
		}
		
		.help_num{
			width: 40rpx;
		}

		.help-user-container {
			.help_desc{
				padding: 20rpx 10rpx;
				display: flex;
				justify-content: space-between;
				text{
					padding: 5rpx 20rpx;
				}
				.log{
					color: #EC7934;
				}
			}
			.list-wrapper {
				padding: 20rpx 0;
				background-color: #F7F5FE;
				border-radius: 40rpx;

				.item {
					margin: 20upx;
					display: flex;
					padding: 20upx;
					justify-content: space-between;
					align-items: center;
					border-radius: 60upx;
					background-color: white;
					height: 150rpx;

					.left-content {
						display: flex;
						align-items: center;

						.img {
							width: 80upx;
							height: 80upx;
							border-radius: 50%;
						}

						.content {
							margin-left: 20upx;
							display: flex;
							flex-direction: column;
							justify-content: space-around;

							.top {
								max-width: 250upx;
							}

							.bottom {
								font-size: 22upx;
								color: #888;
							}
						}
					}

					.left-content.badge-type {}

					.right-content {
						display: flex;

						.earn {
							display: flex;
							flex-direction: column;
							justify-content: space-around;
							align-items: flex-start;
							margin-right: 30upx;
							min-width: 140upx;

							.right-item {

								display: flex;
								align-items: center;

							}
						}

						.btn {
							display: flex;
							align-items: center;
						}
					}

				}
			}
		
			.yingyuan_img{
				width: 100%;
				padding-top: 20rpx;
				image{
					border-radius: 40rpx;
				}
			}
		}

		.rank-container {
			padding-top: 40rpx;
			.user-list-three {
				display: flex;
				flex-wrap: wrap;
		
				.user-item {
					width: 33.3%;
					min-height: 420rpx;
					position: relative;
		
					.user-item-cont {
						width: 100%;
						display: flex;
						flex-direction: column;
						position: absolute;
						bottom: 0;
		
						.top-animal-img {
							width: 100%;
							position: relative;
		
							.bg-img {
								width: 100%;
								position: absolute;
								bottom: 0;
								z-index: 1;
							}
		
							.animal-img {
								width: 80%;
								position: relative;
								z-index: 4;
							}
						}
		
						.item-info-color1 {
							background-color: #FF774D;
							border-top-left-radius: 30rpx;
						}
		
						.item-info-color2 {
							background-color: #FFD664;
							border-top-left-radius: 30rpx;
							border-top-right-radius: 30rpx;
						}
		
						.item-info-color3 {
							background-color: #40D5FD;
							border-top-right-radius: 30rpx;
						}
		
						.user-item-info {
							width: 100%;
							display: flex;
							flex-direction: column;
							color: #FFFFFF;
							margin-top: -20rpx;
							padding-top: 10rpx;
							position: relative;
							z-index: 5;
		
							.user-info {
								width: 100%;
								display: flex;
								flex-direction: row;
								justify-content: center;
								padding: 10rpx 0;
		
								.user-img {
									width: 50rpx;
		
									image {
										width: 50rpx;
										height: 50rpx;
										border-radius: 50%;
									}
		
									position: relative;
		
									.user-rank {
										width: 20rpx;
										height: 20rpx;
										font-size: 12rpx;
										color: #FF5174;
										background-color: #FFFFFF;
										border-radius: 50%;
										font-weight: bold;
										position: absolute;
										bottom: -5rpx;
										right: 0;
									}
								}
		
								.user-name {
									max-width: 150rpx;
									font-size: 28rpx;
									padding-left: 10rpx;
								}
							}
		
							.star-name {
								max-width: 70%;
		
								text {
									padding: 2rpx 10rpx;
									background-color: #FFFFFF;
									border-radius: 20rpx;
									font-size: 24rpx;
									color: #FF5174;
								}
							}
		
							.user-courage-num {
								display: flex;
								flex-direction: row;
								align-items: center;
								font-size: 24rpx;
								padding: 10rpx 0 20rpx;
							}
						}
					}
		
				}
			}
		
			.user-list {
				width: 100%;
				display: flex;
				flex-direction: column;
				margin-top: 20rpx;
		
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
	
		.star-rank-container{
			padding: 20rpx 0;
			.rank-tips{
				display: flex;
				flex-direction: column;
				font-size: 24rpx;
				view{
					padding: 5rpx 0;
				}
			}
			.star-list{
				width: 100%;
				display: flex;
				flex-direction: column;
				.star-item{
					padding: 20rpx 30rpx;
					border-radius: 30rpx;
					background-color: #F7F5FE;
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
							color: #888888;
							display: flex;
							flex-direction: row;
							align-items: center;
							font-size: 24rpx;
							padding-top: 10rpx;
							.num{
								color: #FFC19D;
							}
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
	}
</style>
