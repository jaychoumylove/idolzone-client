<template>
	<view class="container">
		<view class="top">
			<view class="top-share">
				<view>
					还剩 22 22 22 22
				</view>
				<view style="width: 30%;">
					<btnComponent type="custom4">
						<button class="btn" @tap="$app.goPage('/pages/notice/notice?id='+notice_id)">
							<view class="flex-set" style="width: 150upx; height: 50upx; font-size: 28rpx;">活动说明</view>
						</button>
					</btnComponent>
				</view>
			</view>
		</view>

		<!-- 列表 -->
		<view class="list-container">
			<view class="item" v-for="(item,index) in list" :key="index">
				<view class="item-cont" :class="[ join_active_id==item.id?'item-border-join':'item-border-nojoin' ]">
					<view class="top-title">
						<image class="bg" v-if="join_active_id==item.id" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9Equ3ngUPQiaWPxrVxZhgzk9W1BibcOu04iaTBwBo7jxz0htMqHohEE7XqrCSqOKnQCWfTDHKnJZZiaibw/0"
						 mode="aspectFill"></image>
						<image class="bg" v-else src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9Equ3ngUPQiaWPxrVxZhgzk9obQkq8GWNOia2UmbcaDv7BoMiba0C7sa0sAxtD7lM1wyZDT0YcGelcEg/0"
						 mode="aspectFill"></image>
						<view class="title-text">{{item.title}}：{{item.bonus}}元奖金</view>
					</view>
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
					<view class="join-add">
						<view  v-if="join_active_id && join_active_id==item.id">
							<btnComponent type="custom3">
								<button class="btn">
									<view class="flex-set join-add-button">立即冲榜</view>
								</button>
							</btnComponent>
						</view>
						<view v-else-if="!join_active_id">
							<btnComponent type="custom1">
								<button class="btn" @tap="joinClick(item.id)">
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
			padding: 20rpx 40rpx;

			.top-share {
				width: 100%;
				display: flex;
				justify-content: space-between;

			}
		}

		.list-container {
			width: 100%;

			.item {
				padding: 40rpx 30rpx;
				
				.item-border-join{
					border: 4upx solid #ff9303;
					box-shadow: 0 2upx 4upx #870c0e;
				}
				.item-border-nojoin{
					border: 4upx solid #999999;
					box-shadow: 0 2upx 4upx #666666;
				}
				
				.item-cont {

					width: 100%;
					padding: 20rpx 10rpx;
					border-radius: 30rpx;
					background-color: #FFFFFF;
					display: flex;
					flex-direction: column;
					
					.top-title{
						width: 100%;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						.bg{
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

					.join-add {
						width: 100%;
						display: flex;
						justify-content: space-around;
						padding: 20rpx 0;

						view {
							width: 40%;
						}
						
						.join-add-button{
							width: 220upx; 
							height: 70upx; 
							font-size: 24rpx;
						}
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
