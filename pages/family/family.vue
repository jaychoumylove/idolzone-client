<template>
	<view class="new-page-container">

		<view class="top-container">
			<view class="left-wrap">
				<view class="top-wrap">
					<view>
						{{info.clubname||''}}
						<text class="iconfont iconeditor" v-if="info.leader" style="color: #999;" @tap="$app.goPage(`/pages/family/family_new?fid=${info.id}`)"></text>
					</view>
					<btnComponent type="green" v-if="info.cansettle"  @tap="settle()">
						<view class="flex-set" style="padding: 4upx 16upx;font-size: 22upx;">领取{{$app.getData('config').family_switch.field_lastname}}奖励</view>
					</btnComponent>
					
					<btnComponent type="disable" v-else>
						<view class="flex-set" style="padding: 4upx 16upx;font-size: 22upx;">领取{{$app.getData('config').family_switch.field_lastname}}奖励</view>
					</btnComponent>
				</view>
				<view class="content-wrap">
					<view class="block" @tap="$app.goPage('/pages/family/family_list')">
						<view class="item">NO.{{info.rank||''}}</view>
						<view class="item bottom">排名<text class="iconfont iconjiantou"></text></view>
					</view>
					<view class="block">
						<view class="item">{{info.mem_count||0}}/{{info.allow_count||0}}人</view>
						<view class="item bottom">成员</view>
					</view>
					<view class="block">
						<view class="item">{{(info.hot/10000).toFixed(1)+'万'||0}}</view>
						<view class="item bottom">{{$app.getData('config').family_switch.field_name}}贡献</view>
					</view>
				</view>
			</view>
			<view class="right-wrap">
				<view class="avatar-wrap" @tap="$app.goPage('/pages/group/group')">
					<image class="avatar" :src="info.avatar||$app.getData('AVATAR')" mode="aspectFill"></image>
					<view class="bottom flex-set">
						<image class="btn" src="https://mmbiz.qpic.cn/mmbiz_png/h9gCibVJa7JXsqa9U7hNge9bVPRa04Tia6LcFf0micBuNEvUO2Fd4iaP8EcuBBFJDGAeKVZtupWHFUNiafibUSySNp7A/0"
						 mode="aspectFill"></image>
						<view class="text">为TA冲榜</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 列表 -->
		<view class="list-container">
			<view class="item" v-for="(item,index) in userRank" :key="index">
				<view class="rank-num">
					<image class="icon" v-if="index==0" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTERPO5dPoLHgkajBHNM2z9fooSUMLxB0ogg1mYllIAOuoanico1icDFfYFA/0"
					 mode=""></image>
					<image class="icon" v-else-if="index==1" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTERcWnBrw6yAIeVRx4ibIfShZ3tn26ubDUiakNcrwf2F43JI97MYEaYiaib9A/0"
					 mode=""></image>
					<image class="icon" v-else-if="index==2" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTER7oibKWZCN5ThjI799sONJZAtZmRRTIQmo1R9j26goVMBJ43giaJHLIlA/0"
					 mode=""></image>
					<view v-else>{{index+1}}</view>
				</view>
				<view class='avatar-wrap'>
					<image class="avatar" :src="item.user && item.user.avatarurl||$app.getData('AVATAR')" mode="aspectFill"></image>
					<image class="headwear position-set" :src="item.headwear" mode=""></image>
					<view class="badge-wrap">
						<view class="leader" v-if="item.user_id==leader_uid">族长</view>
					</view>
				</view>
				<view class="text-container">
					<view class="star-name text-overflow">
						{{item.user && item.user.nickname||$app.getData('NICKNAME')}}
						<image class="img-s" :src="`/static/image/user_level/lv${item.level}.png`" mode=""></image>
					</view>
					<view class="star-name text-overflow">
						<view class="count">{{$app.getData('config').family_switch.field_name}}贡献人气 {{item.hot}}</view>
					</view>
				</view>				
				<image class="exit" src="https://mmbiz.qpic.cn/mmbiz_png/h9gCibVJa7JWwlVcSNe42f7cdITecxbg4vgXqHL191U954COPpyUJZk3bVFibGKvBO6lw9qBP2iaJLsB1U01mLcug/0"
				 mode="aspectFill"  @tap="exit(item.user_id)" v-if="item.user_id==$app.getData('userInfo').id"></image>				 
				 <view class="exit iconfont iconclose" @tap="exit(item.user_id)" v-else-if="leader_uid==$app.getData('userInfo').id"></view>
			</view>
		</view>

		<view class="btn-container">
			<button class="btn-wrap" @tap="$app.goPage('/pages/group/group')">
				<view class="content">打榜</view>
			</button>
			<button class="btn-wrap" v-if="info.leader" @tap="$app.goPage('/pages/family/apply_list')">
				<view class="content">申请列表</view>
			</button>
			<button class="btn-wrap" open-type="share" data-shareid="14" @tap="buttonHandler" data-sharetype="share">
				<view class="content">家族招人</view>
			</button>

		</view>

		<shareModalComponent ref="shareModal"></shareModalComponent>
	</view>
</template>

<script>
	import btnComponent from '@/components/btnComponent.vue';
	import modalComponent from "@/components/modalComponent.vue"

	export default {
		components: {
			btnComponent,
			modalComponent,
		},
		data() {
			return {
				current: 1, // 任务类别
				leader_uid: 0,
				userRank: [],
				fid: 0,
				modal: '',
				info: {
					thisweek_count: 0,
					cansettle: false
				},
			};
		},
		onLoad(option) {
			this.fid = option.fid
		},
		onShow() {
			this.loadData()
		},
		onShareAppMessage(e) {
			const shareType = e.target && e.target.dataset.shareid
			return this.$app.commonShareAppMessage(shareType)
		},
		methods: {
			// 领取奖励
			settle() {
				this.$app.request('family/settle', {
				}, res => {
					this.info.cansettle = false
					let toast = '领取成功'
					if (res.data.coin) toast += '，金豆+' + res.data.coin
					if (res.data.flower) toast += '，鲜花+' + res.data.flower
					if (res.data.stone) toast += '，钻石+' + res.data.stone
					if (res.data.trumpet) toast += '，喇叭+' + res.data.trumpet
					this.$app.toast(toast)
				}, 'POST', true)
			},
			
			exit(uid) {
				let msg = `退出家族，你在家族内的贡献会清空`
				if(this.leader_uid==uid) msg = `解散家族，家族内所有贡献会清空`
				else if(uid!=this.$app.getData('userInfo').id) msg = `请出家族，TA在家族内贡献会清空`
				this.$app.modal(msg, () => {
					this.$app.request('family/exit', {
						user_id: uid,
					}, res => {
						this.$app.toast(`操作成功`)
						setTimeout(() => {
							uni.reLaunch({
								url: '/pages/family/family_list'
							})
						}, 1000)
					}, 'POST', true)
				})
			
			},
			buttonHandler(e) {
				const sharetype = e.target.dataset.sharetype
				if (sharetype == 'share') {
					// 分享
					const shareType = e.target && e.target.dataset.shareid
					// #ifdef APP-PLUS
					const shareOptions = this.$app.commonShareAppMessage(shareType)
					this.$refs.shareModal.shareShow(shareOptions)
					// #endif
				}
			},
			loadData() {
				this.$app.request('family/info', {
					fid: this.fid || 0
				}, res => {
					this.info = res.data
				})
				this.getMember()
			},
			getMember() {
				this.$app.request('family/member', {
					fid: this.fid,
					page: this.page,
				}, res => {
					this.leader_uid = res.data.leader_uid
					if (this.page == 1) {
						this.userRank = res.data.list
					} else {
						this.userRank = this.userRank.concat(res.data.list)
					}
				})
			}

		}
	}
</script>

<style lang="scss">
	.new-page-container {
		display: flex;
		flex-direction: column;

		.top-container {
			height: 220upx;
			border-radius: 0 0 60upx 60upx;
			padding: 20upx;
			background-color: #856B5C;
			display: flex;
			color: #fff;

			.left-wrap {
				flex: 1;

				.top-wrap {
					font-weight: 700;
					font-size: 34upx;
					margin: 20upx 0;
					display: flex;
					justify-content:space-between;
				}

				.content-wrap {
					display: flex;

					.block {
						flex: 1;
						white-space: nowrap;

						.bottom {
							font-size: 24upx;
						}
					}
				}

			}

			.right-wrap {
				.avatar-wrap {
					position: relative;
					margin: 10upx;

					.avatar {
						width: 160upx;
						height: 160upx;
						border-radius: 50%;
						box-shadow: 0 2upx 16upx rgba(#999, .6);
					}

					.bottom {
						width: 150upx;
						height: 34upx;
						position: absolute;
						left: 50%;
						transform: translateX(-50%);
						bottom: -10upx;

						.btn {
							position: absolute;
							z-index: -1;
						}

						.text {
							font-size: 26upx;
							color: #333;
						}
					}
				}
			}

		}

		.list-container {
			
			.item {
				height: 100upx;
				display: flex;
				align-items: center;

				.rank-num {
					text-align: center;
					width: 100upx;

					.icon {
						width: 40upx;
						height: 40upx;
					}
				}

				.avatar-wrap {
					position: relative;

					.avatar {
						width: 70upx;
						height: 70upx;
						border-radius: 50%;
					}

					.headwear {
						width: 150%;
						height: 150%;
					}

					.badge-wrap {
						position: absolute;
						bottom: 0;
						right: 0;

						.leader {
							background-color: rgba(#F99152, .8);
							border-radius: 12upx;
							padding: 0 6upx;
							color: #FFF;
							font-size: 20upx;
						}
					}
				}

				.text-container {
					margin: 0 20upx;
					width: 400upx;

					.bottom-text {
						display: flex;
						align-items: center;
						color: $text-color-1;
					}
				}

				.count {
					font-size: 22upx;
					color: #ff8421;
				}

				.exit {
					width: 40upx;
					height: 30upx;
					margin-left: 30upx;
				}

			}
		}

		.btn-container {
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 130upx;

			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-around;

			.btn-wrap {
				border-radius: 32upx;
				padding: 10upx 30upx;
				background: linear-gradient(to right bottom, #fed525, #fed525);
				box-shadow: 0 2upx 4upx rgba(102, 102, 102, 0.3);
				color: #412b13;
			}
		}

		.title-wrap {
			margin: 10upx 20upx;
		}


	}
</style>
