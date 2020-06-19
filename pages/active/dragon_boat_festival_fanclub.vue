<template>
	<view class="container">
		<view class="top">
			<view class="bonus_total">{{active_info.title || ''}}：{{active_info.bonus || ''}}元奖金</view>
			<view class="bonus">
				<view>第一名：{{active_info.first_bonus || ''}}元</view>
				<view>第二名：{{active_info.second_bonus || ''}}元</view>
				<view>第三名：{{active_info.three_bonus || ''}}元</view>
			</view>
		</view>
		<view class="text-time">
			<view class="bonus_time">活动时间：{{active_info.time_text || ''}}</view>
			<view v-if="is_exit" @tap="modal='exit'" class="exit">退出比赛</view>
		</view>
		<view class="invite_user">
			<btnComponent type="default">
				<button class="btn" open-type="share" data-sharetype="share">
					<view class="flex-set" style="width: 300upx; height: 60upx;">喊团员一起打榜拿第一</view>
				</button>
			</btnComponent>
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
					<view>
						粉丝团:{{item.fanclub_name || NICKNAME}}
					</view>
					<view>
						所属爱豆：{{item.star_name}}
					</view>
					<view class="count">
						<view>本场人气:{{item.total_count}}</view>
					</view>
				</view>
				<view v-if="item.is_mine" class="count" style="border-bottom: 2rpx solid #ff8421;" @tap="goPage('/pages/active/dragon_boat_festival_fanclub_user?active_id=',item.active_id)">
					<view>团员贡献人气</view>
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
				AVATAR: this.$app.getData('AVATAR'),
				NICKNAME: '神秘粉丝团',
				is_exit:false,
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
				if (this.page > 10) return
				this.$app.request(this.$app.API.ACTIVE_DRAGON_BOAT_FESTIVAL_FANCLUB, {
					page: this.page,
					active_id:this.active_id,
				}, res => {
					this.active_info = res.data.active_info;
					this.is_exit = res.data.is_exit
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
		.top{
			width: 100%;
			display: flex;
			flex-direction: column;
			padding: 0 40rpx;
			border-bottom: 4rpx solid #f2f3f4;
			
			.bonus_total{
				font-size: 36rpx;
				font-weight: bold;
				padding: 15rpx 0;
			}
			.bonus{
				display: flex;
				flex-direction: row;
				view{
					flex:1 1 0%
				}
			}
		}
		.text-time{
			width: 100%;
			display: flex;
			justify-content: space-between;
			.bonus_time{
				font-size: 28rpx;
				font-weight: bold;
				padding: 15rpx 20rpx 15rpx 40rpx;
				
			}
			.exit{
				padding: 15rpx 40rpx 15rpx 20rpx;
				font-size: 28rpx;
				color: #f00f00;
			}
		}
		
		.invite_user{
			width: 100%;
			padding: 0 25% 15rpx 25%;
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
					margin: 0 20upx;
					width: 300upx;
					font-size: 24rpx;

					.bottom-text {
						display: flex;
						align-items: center;
						color: $text-color-1;
					}
				}

				.count {
					color: #ff8421;
				}


			}
		}

		
	}
</style>
