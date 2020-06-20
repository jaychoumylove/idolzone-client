<template>
	<view class="container">
		<view class="top">
			<view class="top-share">
				<view class="time-text" >
					活动时间：{{active_info.time_text || ''}}
				</view>
				<view style="width: 30%;">
					<btnComponent type="custom3">
						<button class="btn" @tap="$app.goPage('/pages/notice/notice?id='+notice_id)">
							<view class="flex-set" style="width: 150upx; height: 50upx; font-size: 28rpx;">活动说明</view>
						</button>
					</btnComponent>
				</view>
			</view>
		</view>
		<view class="tips ">{{tips}}</view>
		<view class="bonus-cont">
			<view class="bonus-title">
				<view class="bonus_total">{{active_info.title || ''}}：{{active_info.bonus || ''}}奖金</view>
				<view class="bonus">
					<view>第一名：{{active_info.first_bonus || ''}}</view>
					<view>第二名：{{active_info.second_bonus || ''}}</view>
					<view>第三名：{{active_info.three_bonus || ''}}</view>
				</view>
			</view>
		</view>
		
		<view v-if="myClubInfo" class="mineinfo">
			<view class="mineinfo-box">
				<view class="mineinfo-cont">
					<view class="mineinfo-rank">
						<view>NO</view>
						<view>{{myClubInfo.rank || '0'}}</view>
					</view>
					<view class="mineinfo-img">
						<image :src="myClubInfo.fanclub_avatar || AVATAR" mode="aspectFill"></image>
					</view>
					<view class="mineinfo-text">
						<view class="funs-name-all">
							<view class="funs-name">{{myClubInfo.fanclub_name || NICKNAME}}</view>
							<view class='starname'>{{myClubInfo.star_name || ''}}</view>
						</view>
						<view v-if="myClubInfo.total_count>0" class="funs-total-hot">
							<text>本场贡献</text>
							<text style="color: #FBCC3E; padding: 0 10rpx;">{{myClubInfo.total_count}}</text>
							<image src='https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9F3NAxlopF2oyvfuiaEjgJItws1tcmzFFLo4WGc38l7kibxxk1atGAcjALuqvyvLib3icFPyAicbsOOl3g/0' mode="widthFix"></image>
						</view>
						<view v-else class="funs-total-hot">暂无贡献</view>
						<view v-if="myClubInfo.rank>1 && myClubInfo.difference_first>0" class="difference_first">
							距离第一名还差<text style="color: #FBCC3E; padding: 0 10rpx;">{{myClubInfo.difference_first}}</text>人气
						</view>
					</view>
				</view>
				
				<view class="join-add">
					<view @tap="$app.goPage('/pages/group/group')">
						<btnComponent type="default">
							<button class="btn">
								<view class="flex-set join-add-button">立即冲榜</view>
							</button>
						</btnComponent>
					</view>
					<view>
						<btnComponent type="custom2">
							<button class="btn" @tap="goPage('/pages/active/dragon_boat_festival_fanclub_user?active_id=',myClubInfo.id)">
								<view class="flex-set join-add-button">成员贡献>></view>
							</button>
						</btnComponent>
					</view>
					<view class="text-time">
						<view v-if="is_exit" @tap="modal='exit'" class="exit">退出团战</view>
					</view>
				</view>
			</view>
			
		</view>
		<!-- 列表 -->
		<view class="list-container">
			
			<view class="item" v-for="(item,index) in fanclubRank" :key="index">
				<view class="rank-num">
					<image class="icon" v-if="index==0" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTERPO5dPoLHgkajBHNM2z9fooSUMLxB0ogg1mYllIAOuoanico1icDFfYFA/0"
					 mode=""></image>
					<image class="icon" v-else-if="index==1" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTERcWnBrw6yAIeVRx4ibIfShZ3tn26ubDUiakNcrwf2F43JI97MYEaYiaib9A/0"
					 mode=""></image>
					<image class="icon" v-else-if="index==2" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTER7oibKWZCN5ThjI799sONJZAtZmRRTIQmo1R9j26goVMBJ43giaJHLIlA/0"
					 mode=""></image>
					<view v-else>{{index-0+1}}</view>
				</view>
				<view class='avatar-wrap'>
					<image class="avatar" :src="item.fanclub_avatar || AVATAR" mode="aspectFill"></image>
				</view>
				<view class="text-container">
					<view class="funs-name-all">
						<view class="funs-name">{{item.fanclub_name || NICKNAME}}</view>
						<view class='starname'>{{item.star_name || ''}}</view>
					</view>
					<view v-if="item.total_count>0" class="funs-total-hot"> 
						<text>本场贡献</text>
						<text style="color: #FBCC3E; padding: 0 10rpx;">{{item.total_count}}</text>
						<image src='https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9F3NAxlopF2oyvfuiaEjgJItws1tcmzFFLo4WGc38l7kibxxk1atGAcjALuqvyvLib3icFPyAicbsOOl3g/0' mode="widthFix"></image>
					</view>
					<view v-else class="funs-total-hot">暂无贡献</view>
				</view>
				
			</view>
		</view>
		
		<!-- 退出活动 -->
		<prompt v-if="modal=='exit'" title="退出活动粉丝团人气将清零,重新参加则从零开始" placeholder="输入你的ID确认退出本次活动" @confirm="exitGroup"
		 @closeModal="modal=''">
		
		</prompt>
	
	</view>
</template>

<script>
	import prompt from "@/components/zz-prompt/index.vue";
	import btnComponent from '@/components/btnComponent.vue'
	export default {
		components: {
			btnComponent,
			prompt,
		},
		data() {
			return {
				fanclubRank: [],
				active_info:[],
				active_id:0,
				modal:'',
				page: 1,
				tips:'',
				notice_id:'',
				is_exit:false,
				myClubInfo:'',
				AVATAR: this.$app.getData('AVATAR'),
				NICKNAME: '神秘粉丝团',
			};
		},
		onLoad(option) {
			if(!option.active_id){
				this.$app.toast('网络延时')
				this.goPage('/pages/active/dragon_boat_festival');
			}
			this.active_id=option.active_id;
			this.loadData()
		},
		onReachBottom() {
			if (this.page < 10) {
				this.page++;
				this.loadData()
			}
		},
		onShareAppMessage(e) {
			const shareType = e.target && e.target.dataset.shareid
			return this.$app.commonShareAppMessage(shareType)
		},
		methods: {
			goPage(url, val='') {
				this.$app.goPage(url + val);
			},
			loadData() {
				this.$app.request(this.$app.API.ACTIVE_DRAGON_BOAT_FESTIVAL_FANCLUB, {
					page: this.page,
					active_id:this.active_id,
				}, res => {
					this.active_info = res.data.active_info;
					this.myClubInfo = res.data.myClubInfo;
					this.is_exit = res.data.is_exit;
					this.notice_id = res.data.notice_id;
					this.tips = res.data.tips;
					
					if (this.page == 1) {
						this.fanclubRank = res.data.list
					} else {
						this.fanclubRank = this.fanclubRank.concat(res.data.list)
					}
				})
			},
			exitGroup(val) {
				if (val != this.$app.getData('userInfo').id * 1234) {
					this.$app.toast('ID输入不正确')
					return
				}
				this.$app.request(this.$app.API.ACTIVE_DRAGON_BOAT_FESTIVAL_EXIT, {}, res => {
					this.$app.toast('退出成功')
					this.modal = ''
					this.$app.goPage('/pages/active/dragon_boat_festival');
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		.tips{
			width: 100%;
			display: flex;
			justify-content: center;
			padding: 10rpx 0;
			color: #818286;
		}
		.top {
			width: 100%;
			display: flex;
			flex-direction: column;
			padding: 20rpx 40rpx;
		
			.top-share {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
		
				.time-text {
					color: #412b13;
					font-size: 28rpx;
				}
			}
		}
		
		.bonus-cont{
			width: 100%;
			padding: 0rpx 40rpx;
			
			.bonus-title{
				width: 100%;
				display: flex;
				flex-direction: column;
				background: #3F907C;
				border-radius: 25rpx;
				padding: 20rpx;
				color: #FFFFFF;
				
				.bonus_total{
					font-size: 36rpx;
					font-weight: bold;
					padding: 10rpx 0;
				}
				.bonus{
					display: flex;
					justify-content: space-between;
					view{
						font-size: 24rpx;
					}
				}
			}
			
		}
		
		.mineinfo{
			width: 100%;
			padding: 20rpx 20rpx;
			.mineinfo-box{
				width: 100%;
				padding: 20rpx 0;
				display: flex;
				flex-direction: column;
				border-top: 2rpx solid #d2d2d3;
				border-bottom: 2rpx solid #d2d2d3;
				font-size: 28rpx;
				.mineinfo-cont{
					width: 100%;
					display: flex;
					flex-direction: row;
					.mineinfo-rank{
						width: 10%;
						color: #999999;
						font-weight: bold;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
					}
					.mineinfo-img{
						width: 90rpx;
						padding-left: 10rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						image{
							width: 80rpx;
							height: 80rpx;
							border-radius: 50%;
						}
					}
					.mineinfo-text{
						width: 100%;
						padding-left: 20rpx;
						.funs-name-all{
							width: 100%;
							display: flex;
							flex-direction: row;
							align-items: center;
							.funs-name{
								max-width: 60%;
								font-size: 28rpx;
								font-weight: bold;
								white-space:nowrap;
								word-break:break-all;
								overflow:hidden;
								text-overflow:ellipsis;
							}
							.starname {
								background: -webkit-linear-gradient(#ff7e00, #fccd9f);
								color: #fff;
								padding: 0 12rpx;
								border-radius: 12rpx;
								font-size: 22rpx;
								box-shadow: 0 0 2rpx rgba(0, 0, 0, .3);
								display: flex;
								align-items: center;
								margin-left: 10rpx;
								height: 35rpx;
							}
						}
						.funs-total-hot{
							font-size: 22rpx;
							color: #818286;
							image{
								width: 25rpx;
								height: 25rpx;
							}
						}
						.difference_first{
							font-size: 24rpx;
							color: #68696c;
						}
					}
				}
				.join-add {
					width: 100%;
					display: flex;
					justify-content: space-around;
					padding: 20rpx 0 10rpx 0;
				
					view {
						width: 30%;
					}
				
					.join-add-button {
						width: 150upx;
						height: 60upx;
						font-size: 24rpx;
					}
					.text-time{
						display: flex;
						align-items: center;
						text-align: center;
						.exit{
							width: 100%;
							font-size: 28rpx;
							color: #f00f00;
						}
					}
				}
			}
			
		}

		.list-container {
			padding-bottom: 130upx;

			.item {
				height: 130upx;
				display: flex;
				align-items: center;

				.rank-num {
					text-align: center;
					width: 100upx;

					.icon {
						width: 50upx;
						height: 50upx;
					}
				}

				.avatar-wrap {
					position: relative;

					.avatar {
						width: 100upx;
						height: 100upx;
						border-radius: 50%;
					}

					.headwear {
						width: 150%;
						height: 150%;
					}
				}

				.text-container {
					width: 100%;
					padding-left: 20upx;

					.funs-name-all{
						width: 100%;
						display: flex;
						flex-direction: row;
						align-items: center;
						.funs-name{
							max-width: 60%;
							font-size: 28rpx;
							font-weight: bold;
							white-space:nowrap;
							word-break:break-all;
							overflow:hidden;
							text-overflow:ellipsis;
						}
						.starname {
							background: -webkit-linear-gradient(#ff7e00, #fccd9f);
							color: #fff;
							padding: 0 12rpx;
							border-radius: 12rpx;
							font-size: 22rpx;
							box-shadow: 0 0 2rpx rgba(0, 0, 0, .3);
							display: flex;
							align-items: center;
							margin-left: 10rpx;
							height: 35rpx
						}
						
					}
					.funs-total-hot{
						padding-top: 10rpx;
						font-size: 22rpx;
						color: #818286;
						image{
							width: 25rpx;
							height: 25rpx;
						}
					}
					.difference_first{
						font-size: 24rpx;
						color: #68696c;
					}
				}

				.count {
					color: #ff8421;
				}


			}
		}

		
	}
</style>
