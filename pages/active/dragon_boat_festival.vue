<template>
	<view class="container">
		<view class="top">
			<view class="title">粉丝团前100名人气PK排名</view>
			<view class="time">活动时间：{{time_text}}</view>
			<view class="top-share">
				<view>
					<btnComponent type="default">
						<button class="btn" @tap="$app.goPage('/pages/notice/notice?id='+notice_id)">
							<view class="flex-set" style="width: 200upx; height: 60upx;">奖励说明</view>
						</button>
					</btnComponent>
				</view>
				<view>
					<btnComponent type="default">
						<button class="btn" open-type="share" data-sharetype="share">
							<view class="flex-set" style="width: 200upx; height: 60upx;">分享召集</view>
						</button>
					</btnComponent>
				</view>
			</view>
		</view>

		<!-- 列表 -->
		<view class="list-container">
			<view class="item" v-for="(item,index) in list" :key="index">
				<view class="item-cont">
					<view class="title-text">{{item.title}}：{{item.bonus}}元奖金</view>
					<view class="join-add">
						<view>
							<btnComponent type="yellow">
								<button class="btn" v-if="join_active_id">
									<view class="flex-set" v-if="join_active_id==item.id" style="width: 200upx; height: 60upx; font-size: 24rpx;">还差{{difference_first}}第一</view>
									<view class="flex-set" v-else style="width: 200upx; height: 60upx; font-size: 24rpx;">已加入其他场次</view>
								</button>
								<button class="btn" v-else @tap="joinClick(item.id)">
									<view class="flex-set" style="width: 200upx; height: 60upx;">立即参加</view>
								</button>
							</btnComponent>
						</view>
						<view>
							<btnComponent type="yellow">
								<button class="btn" @tap="$app.goPage('/pages/group/group')">
									<view class="flex-set" style="width: 200upx; height: 60upx;">增加人气</view>
								</button>
							</btnComponent>
						</view>
					</view>
					<view class="more" @tap="goPage('/pages/active/dragon_boat_festival_fanclub?active_id=',item.id)">更多></view>
					<view class="funsclub-list">
						<view class="funsclub-info" v-if="item.fanclub" v-for="(value,key) in item.fanclub" :key="key">
							<view class="funs-img">
								<image :src="value.fanclub_avatar || AVATAR" mode="aspectFill"></image>
							</view>
							<view class="funs-name">{{value.fanclub_name || NICKNAME}}</view>
							<view class="funs-total-hot">{{value.total_count>0?value.total_count:'暂无贡献'}}</view>
						</view>

						<!-- <view class="funsclub-info">
							<view class="funs-img"><image src="/static/sharemenu/qq.png" mode="widthFix"></image></view>
							<view class="funs-name">明星粉丝团</view>
							<view class="funs-total-hot">1000</view>
						</view> -->
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
						<view>黄金场</view>
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
				difference_first:0,
				time_text:'',
				is_admin:0,
				AVATAR: this.$app.getData('AVATAR'),
				NICKNAME: '暂无入驻',
			};
		},
		onLoad(option) {
			this.loadData()
		},
		onShareAppMessage(e) {
			const shareType = e.target && e.target.dataset.shareid
			return this.$app.commonShareAppMessage(shareType)
		},
		methods: {
			joinClick(active_id) {
				if(!this.fanclub_id){
					this.modal='tipsJoinFunsclub';
				}else if(this.is_admin==0){
					this.modal='tipsJoinActivity';
				}else{
					this.modal='joinActivity';
					this.active_id=active_id;
				}
			},
			join(){
				this.$app.request(this.$app.API.ACTIVE_DRAGON_BOAT_FESTIVAL_JOIN, {active_id:this.active_id}, res => {
					this.$app.toast('加入成功');
					this.modal = '';
					this.loadData();
				})
			},
			goPage(url, val='') {
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
				})
			},
		
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		.top {
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			padding: 0 40rpx;
			border-bottom: 4rpx solid #f2f3f4;

			.title {
				font-size: 36rpx;
				font-weight: bold;
				padding: 15rpx 0 5rpx 0;
			}

			.time {
				font-size: 28rpx;
				font-weight: bold;
				padding: 0 40rpx 10rpx 40rpx;

			}

			.top-share {
				width: 100%;
				display: flex;
				justify-content: space-around;
				padding-bottom: 20rpx;

				view {
					width: 40%;
				}
			}
		}

		.list-container {
			width: 100%;

			.item {
				padding: 20rpx 30rpx;

				.item-cont {

					width: 100%;
					padding: 20rpx 10rpx;
					border-radius: 25rpx;
					background-color: #FFFFFF;
					box-shadow: 0rpx 10rpx 10rpx 0rpx rgba(255, 108, 121, 0.1);
					border: 3rpx solid #F5E0E1;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;

					.title-text {
						font-size: 36rpx;
						font-weight: bold;
					}

					.join-add {
						width: 100%;
						display: flex;
						justify-content: space-around;
						padding: 20rpx 0;

						view {
							width: 40%;
						}
					}

					.more {
						width: 100%;
						text-align: right;
						color: #fed525;
						font-size: 24rpx;
						padding: 10rpx;
					}

					.funsclub-list {
						width: 100%;
						display: flex;
						flex-wrap: wrap;

						.funsclub-info {
							width: 25%;
							padding: 5rpx;

							view {
								width: 100%;
								display: flex;
								justify-content: center;
								align-items: center;
								font-size: 22rpx;

								image {
									width: 120rpx;
									height: 120rpx;
									border-radius: 50%;
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
