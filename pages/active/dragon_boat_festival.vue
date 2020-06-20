<template>
	<view class="container">
		<view class="top">
			<view class="top-share">
				<view class="time-text">
					活动时间：{{time_text}}
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

		<!-- 列表 -->
		<view class="list-container">
			<view class="item" v-for="(item,index) in list" :key="index">
				<view class="item-cont" :class="[ join_active_id==item.id?'item-border-join':'item-border-nojoin' ]">
					<view class="top-title">
						<image class="bg" v-if="join_active_id==item.id" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9Equ3ngUPQiaWPxrVxZhgzk9W1BibcOu04iaTBwBo7jxz0htMqHohEE7XqrCSqOKnQCWfTDHKnJZZiaibw/0"
						 mode="aspectFill"></image>
						<image class="bg" v-else src="https://mmbiz.qpic.cn/mmbiz_png/h9gCibVJa7JVicicwqPAD1rdia7hqPIHbyK8aOUOANicmOqKDN4RQZdOEcsFXqqkIaozgTTibJrW3B8CtAxWPUkfTU5w/0"
						 mode="aspectFill"></image>
						<view class="title-text">{{item.title}}：{{item.bonus}}元奖金</view>
					</view>
					<view class="funsclub-list">
						<view class="funsclub-info" v-if="item.fanclub" v-for="(value,key) in item.fanclub" :key="key">
							<view class="funs-img">
								<image :src="value.fanclub_avatar || AVATAR" mode="aspectFill"></image>
								<view v-if="key==0" class="funs-rank" style="background-color: #ffa726;">1</view>
								<view v-else-if="key==1" class="funs-rank" style="background-color: #993300;">2</view>
								<view v-else-if="key==2" class="funs-rank" style="background-color: #ff7043;">3</view>
								<view v-else-if="key==3" class="funs-rank" style="background-color: #7a89a0;">4</view>
							</view>
							<view class="funs-cont">
								<view class="funs-name-all">
									<view class="funs-name">{{value.fanclub_name || NICKNAME}}</view>
									
								</view>
								<view v-if="value.total_count>0" class="funs-total-hot">
									<!-- <view>
										本场贡献
									</view> -->
									<view>
										<text style="color: #FBCC3E; padding-right: 10rpx;">{{value.total_count}}</text>
										<image src='https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9F3NAxlopF2oyvfuiaEjgJItws1tcmzFFLo4WGc38l7kibxxk1atGAcjALuqvyvLib3icFPyAicbsOOl3g/0' mode="widthFix"></image>
									</view>
								</view>
								<view v-else class="funs-total-hot">暂无贡献</view>
							</view>
						</view>

					</view>
					<view v-if="join_active_id && join_active_id==item.id" class="mineinfo">
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
								<view v-if="myClubInfo.rank>1 && myClubInfo.difference_first>0" class="difference_first">距离第一名还差{{myClubInfo.difference_first}}人气</view>
							</view>
						</view>
					</view>
					<view class="join-add">
						<view v-if="join_active_id && join_active_id==item.id" @tap="$app.goPage('/pages/group/group')">
							<btnComponent type="default">
								<button class="btn">
									<view class="flex-set join-add-button">立即冲榜</view>
								</button>
							</btnComponent>
						</view>
						<view v-else-if="!join_active_id">
							<btnComponent type="custom1">
								<button class="btn" @tap="joinClick(item.id,item.title)">
									<view class="flex-set join-add-button">报名参加</view>
								</button>
							</btnComponent>
						</view>
						<view>
							<btnComponent type="custom2">
								<button class="btn" @tap="goPage('/pages/active/dragon_boat_festival_fanclub?active_id=',item.id)">
									<view class="flex-set join-add-button">查看全部排名>></view>
								</button>
							</btnComponent>
						</view>
					</view>
					<view v-if="join_active_id && join_active_id==item.id" class="invite_user">
						<btnComponent type="custom1">
							<button class="btn" open-type="share" data-sharetype="share">
								<view class="flex-set" style="width: 320upx; height: 60upx;">召唤团员一起打榜拿第一</view>
							</button>
						</btnComponent>
					</view>
				</view>
			</view>
		</view>

		<!-- 加入活动 -->
		<modalComponent v-if="modal == 'joinActivity'" type="center" @closeModal="modal=''">
			<view class="joinActivity flex-set">
				<view class="box">
					<view class="title">
						<view>参加粉丝团百人人气PK</view>
						<view>{{active_name}}</view>
						<view>一个粉丝团只能参加一个场次PK</view>
						<view>可随时退出，退出人气全部清零</view>
					</view>
					<view class="btn-confirm">
						<view @tap="modal=''">
							<btnComponent type="default">
								<button class="btn">
									<view class="flex-set" style="width: 200rpx; height: 60rpx;">取消</view>
								</button>
							</btnComponent>
						</view>
						<view @tap="join()">
							<btnComponent type="default">
								<button class="btn">
									<view class="flex-set" style="width: 200rpx; height: 60rpx;">确认</view>
								</button>
							</btnComponent>
						</view>
					</view>

				</view>

			</view>
		</modalComponent>
		<!-- 提示团长管理员才可参加活动 -->
		<modalComponent v-if="modal == 'tipsJoinActivity'" type="center" @closeModal="modal=''">
			<view class="joinActivity flex-set">
				<view class="box">
					<view class="title">
						<view style="color: #f00f00;">提示</view>
						<view>只有粉丝团团长和管理员才能报名参加粉丝团前一百名成员人气PK</view>
					</view>
					<view class="btn-confirm">
						<view @tap="modal=''">
							<btnComponent type="default">
								<button class="btn">
									<view class="flex-set" style="width: 200rpx; height: 60rpx;">我知道了</view>
								</button>
							</btnComponent>
						</view>
						<view>
							<btnComponent type="default">
								<button class="btn">
									<view class="flex-set" style="width: 200rpx; height: 60rpx;">喊团长报名</view>
								</button>
							</btnComponent>
						</view>
					</view>

				</view>

			</view>
		</modalComponent>
		<!-- 提示加入粉丝团才可参加活动 -->
		<modalComponent v-if="modal == 'tipsJoinFunsclub'" type="center" @closeModal="modal=''">
			<view class="joinActivity flex-set">
				<view class="box">
					<view class="title">
						<view style="color: #f00f00;">提示</view>
						<view>你还没有加入粉丝团，无法参加本次活动，快前往加入吧！</view>
					</view>
					<view class="btn-confirm">
						<view @tap="modal=''">
							<btnComponent type="default">
								<button class="btn">
									<view class="flex-set" style="width: 200rpx; height: 60rpx;">我知道了</view>
								</button>
							</btnComponent>
						</view>
						<view @tap="$app.goPage('/pages/fans/fans_list')">
							<btnComponent type="default">
								<button class="btn">
									<view class="flex-set" style="width: 200rpx; height: 60rpx;">去加入粉丝团</view>
								</button>
							</btnComponent>
						</view>
					</view>

				</view>

			</view>
		</modalComponent>
	</view>
</template>

<script>
	import modalComponent from '@/components/modalComponent.vue'
	import btnComponent from '@/components/btnComponent.vue'
	export default {
		components: {
			modalComponent,
			btnComponent,
		},
		data() {
			return {
				list: [],
				modal: '',
				notice_id: '',
				join_active_id: 0,
				fanclub_id: '',
				difference_first: 0,
				time_text: '',
				is_admin: 0,
				myClubInfo:'',
				tips:'',
				active_name:'',
				AVATAR: this.$app.getData('AVATAR'),
				NICKNAME: '虚位以待',
			};
		},
		onShow(option) {
			this.loadData()
		},
		onShareAppMessage(e) {
			const shareType = e.target && e.target.dataset.shareid
			return this.$app.commonShareAppMessage(shareType)
		},
		methods: {
			joinClick(active_id,active_name) {
				if (!this.fanclub_id) {
					this.modal = 'tipsJoinFunsclub';
				} else if (this.is_admin == 0) {
					this.modal = 'tipsJoinActivity';
				} else {
					this.modal = 'joinActivity';
					this.active_id = active_id;
				}
				this.active_name=active_name;
			},
			join() {
				this.$app.request(this.$app.API.ACTIVE_DRAGON_BOAT_FESTIVAL_JOIN, {
					active_id: this.active_id
				}, res => {
					this.$app.toast('加入成功');
					this.modal = '';
					this.loadData();
				})
			},
			goPage(url, val = '') {
				this.$app.goPage(url + val);
			},
			loadData() {
				this.$app.request(this.$app.API.ACTIVE_DRAGON_BOAT_FESTIVAL, {}, res => {
					this.list = res.data.list;
					this.notice_id = res.data.notice_id;
					this.fanclub_id = res.data.fanclub_id;
					this.join_active_id = res.data.join_active_id;
					this.difference_first = res.data.difference_first;
					this.time_text = res.data.time_text;
					this.is_admin = res.data.is_admin;
					this.myClubInfo = res.data.myClubInfo;
					this.tips = res.data.tips;
				})
			},

		}
	}
</script>

<style lang="scss" scoped>
	.container {
		color: #412b13;
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
					font-size: 28rpx;
				}
			}
		}

		.list-container {
			width: 100%;

			.item {
				padding: 40rpx 30rpx;

				.item-border-join {
					border: 4upx solid #FC7419;
					box-shadow: 0 2upx 4upx #870c0e;
				}

				.item-border-nojoin {
					border: 4upx solid #948069;
					box-shadow: 0 2upx 4upx #666666;
				}

				.item-cont {

					width: 100%;
					padding: 20rpx 10rpx;
					border-radius: 30rpx;
					background-color: #FFFFFF;
					display: flex;
					flex-direction: column;

					.top-title {
						width: 100%;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;

						.bg {
							width: 481upx;
							height: 76upx;
							margin-top: -80rpx;
						}

						.title-text {
							color: #FFFFFF;
							font-size: 28rpx;
							font-weight: bold;
							margin-top: -65rpx;
						}
					}
					.mineinfo{
						width: 100%;
						padding: 20rpx 20rpx;
						
						.mineinfo-cont{
							width: 100%;
							padding: 20rpx 0;
							display: flex;
							flex-direction: row;
							font-size: 28rpx;
							border-top: 2rpx solid #d2d2d3;
							border-bottom: 2rpx solid #d2d2d3;
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
									display: flex;
									flex-direction: row;
									align-items: center;
									.funs-name{
										font-size: 28rpx;
										font-weight: bold;
										max-width: 70%;
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
					}

					.join-add {
						width: 100%;
						display: flex;
						justify-content: space-around;
						padding: 10rpx 0;

						view {
							width: 40%;
						}

						.join-add-button {
							width: 220upx;
							height: 60upx;
							font-size: 28rpx;
						}
					}
					
					.invite_user{
						width: 100%;
						padding: 15rpx 5% 15rpx 5%;
					}


					.funsclub-list {
						width: 100%;
						display: flex;
						flex-wrap: wrap;
						padding: 10rpx 0;

						.funsclub-info {
							width: 50%;
							display: flex;
							flex-direction: row;
							align-items: center;
							padding: 20rpx 10rpx;
							font-size: 28rpx;
							
							.funs-img{
								width: 100rpx;
								display: flex;
								
								image{
									width: 70rpx;
									height: 70rpx;
									border-radius: 50%;
								}
								.funs-rank{
									width: 30rpx;
									height: 30rpx;
									color: #FFFFFF;
									font-size: 22rpx;
									border-radius: 50%;
									display: flex;
									justify-content: center;
									margin-left: -20rpx;
									margin-top: -10rpx;
								
								}
							}
							.funs-cont{
								width: 100%;
								padding-left: 10rpx;
								.funs-name-all{
									display: flex;
									flex-direction: row;
									align-items: center;
									.funs-name{
										width: 70%;
										font-weight: bold;
										white-space:nowrap;
										word-break:break-all;
										overflow:hidden;
										text-overflow:ellipsis;
									}
								}
								
								.funs-total-hot{
									display: flex;
									flex-direction: column;
									font-size: 22rpx;
									color: #818286;
									image{
										width: 20rpx;
										height: 20rpx;
									}
								}
							}
							
						}
					}
				}
			}
		}

		.joinActivity {
			width: 100%;
			display: flex;
			flex-direction: column;

			.box {
				width: 80%;

				.title {
					width: 100%;
					font-weight: bold;

					view {
						display: flex;
						align-items: center;
						justify-content: center;
					}
				}

				.btn-confirm {
					width: 100%;
					display: flex;
					justify-content: space-around;
					margin: 20rpx 0;
				}
			}

		}

	}
</style>
