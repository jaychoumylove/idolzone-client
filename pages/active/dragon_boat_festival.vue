<template>
	<view class="container">
		<view class="top">
			<view class="title">粉丝团前100名人气PK排名</view>
			<view class="time">活动时间：6月25日-7月1日</view>
			<view class="top-share">
				<view>
					<btnComponent type="default">
						<button class="btn" open-type="share" data-sharetype="share">
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
			<view class="item">
				<view class="title-text">黄金场：1400元奖金</view>
				<view class="join-add">
					<view>
						<btnComponent type="yellow">
							<button class="btn" open-type="share" data-sharetype="share">
								<view class="flex-set" style="width: 200upx; height: 60upx;">立即参加</view>
							</button>
						</btnComponent>
					</view>
					<view>
						<btnComponent type="yellow">
							<button class="btn" open-type="share" data-sharetype="share">
								<view class="flex-set" style="width: 200upx; height: 60upx;">增加人气</view>
							</button>
						</btnComponent>
					</view>
				</view>
				<view class="more">更多></view>
				<view class="funsclub-list">
					<view class="funsclub-info">
						<view class="funs-img"><image src="/static/sharemenu/qq.png" mode="widthFix"></image></view>
						<view class="funs-name">明星粉丝团</view>
						<view class="funs-total-hot">1000</view>
					</view>
					<view class="funsclub-info">
						<view class="funs-img"><image src="/static/sharemenu/qq.png" mode="widthFix"></image></view>
						<view class="funs-name">明星粉丝团</view>
						<view class="funs-total-hot">1000</view>
					</view>
					<view class="funsclub-info">
						<view class="funs-img"><image src="/static/sharemenu/qq.png" mode="widthFix"></image></view>
						<view class="funs-name">明星粉丝团</view>
						<view class="funs-total-hot">1000</view>
					</view>
					<view class="funsclub-info">
						<view class="funs-img"><image src="/static/sharemenu/qq.png" mode="widthFix"></image></view>
						<view class="funs-name">明星粉丝团</view>
						<view class="funs-total-hot">1000</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 退出活动 -->
		<prompt v-if="modal=='exit'" title="退出活动粉丝团人气将清零,重新参加则从零开始" placeholder="输入你的ID确认退出本次活动" @confirm="exitGroup"
		 @closeModal="modal=''">
		
		</prompt>
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
						<view>
							<btnComponent type="default">
								<button class="btn">
									<view class="flex-set" style="width: 200rpx; height: 60rpx;">取消</view>
								</button>
							</btnComponent>
						</view>
						<view>
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
						<view>
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
						<view>
							<btnComponent type="default">
								<button class="btn">
									<view class="flex-set" style="width: 200rpx; height: 60rpx;">我知道了</view>
								</button>
							</btnComponent>
						</view>
						<view>
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
	import prompt from "@/components/zz-prompt/index.vue";
	export default {
		components: {
			modalComponent,
			btnComponent,
			prompt,
		},
		data() {
			return {
				funsclubRank: [],
				modal:'',
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
			loadData() {
				this.$app.request(this.$app.API.ACTIVE_DRAGON_BOAT_FESTIVAL, {}, res => {
					
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
			justify-content: center;
			align-items: center;
			padding: 0 40rpx;
			border-bottom: 4rpx solid #f2f3f4;
			
			.title{
				font-size: 36rpx;
				font-weight: bold;
				padding: 15rpx 0 5rpx 0;
			}
			.time{
				font-size: 28rpx;
				font-weight: bold;
				padding: 0 40rpx 10rpx 40rpx;
				
			}
			.top-share{
				width: 100%;
				display: flex;
				justify-content: space-around;
				padding-bottom: 20rpx;
				view{
					width: 40%;
				}
			}
		}
		
		.list-container {
			width: 100%;
			padding: 20rpx;
			.item {
				width: 100%;
				padding: 20rpx 10rpx;
				border-radius: 25rpx;
				background-color: #FFFFFF;
				box-shadow:0rpx 10rpx 10rpx 0rpx rgba(255,108,121,0.1);
				border:3rpx solid #F5E0E1;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;

				.title-text {
					font-size: 36rpx;
					font-weight: bold;
				}
				.join-add{
					width: 100%;
					display: flex;
					justify-content: space-around;
					padding: 20rpx 0;
					view{
						width: 40%;
					}
				}
				.more{
					width: 100%;
					text-align: right;
					color: #fed525;
					font-size: 24rpx;
					padding: 10rpx;
				}
				.funsclub-list{
					width: 100%;
					display: flex;
					flex-wrap: wrap;
					
					.funsclub-info{
						width: 25%;
						padding: 5rpx;
						view{
							width: 100%;
							display: flex;
							justify-content: center;
							align-items: center;
							font-size: 22rpx;
							image{
								width: 80%;
								border-radius: 50%;
							}
						}
					}
				}


			}
		}
		
		.joinActivity{
			width: 100%;
			display: flex;
			flex-direction: column;
			
			.box{
				width: 80%;
				
				.title{
					width: 100%;
					font-weight: bold;
					view{
						display: flex;
						align-items: center;
						justify-content: center;
					}
				}
				.btn-confirm{
					width: 100%;
					display: flex;
					justify-content: space-around;
					margin: 20rpx 0;
				}
			}
			
		}

	}
</style>
