<template>
	<view class="new-page-container">

		<view class="top-container">
			<view class="left-wrap">
				<view class="top-wrap">
					<view class="flex-set">
					<image class="avatar" :src="info.avatar||$app.getData('AVATAR')" mode="aspectFill"></image>
					<text class="text">{{info.clubname||''}}</text>
					<text v-if="info.leader" class="iconfont iconeditor" style="color: #999;" @tap="$app.goPage(`/pages/fans/fans_new?fid=${info.id}`)"></text>
					</view>
					<view v-if="info.leader||info.admin" class="btn" @tap="$app.goPage(`/pages/fans/apply_list?fid=${info.id}`)">{{info.apply_count}}人申请></view>
				</view>
				<view class="content-wrap">
					<view class="block" @tap="$app.goPage('/pages/fans/fans_list')">
						<view class="item">NO.{{info.week_rank||''}}</view>
						<view class="item bottom">排名<text class="iconfont iconjiantou"></text></view>
					</view>
					<view class="block" @tap="$app.goPage('/pages/fans/member?fid=' + info.id)">
						<view class="item">{{info.mem_count||0}}人</view>
						<view class="item bottom">成员<text class="iconfont iconjiantou"></text></view>
					</view>
					<view class="block">
						<view class="item">{{(info.week_hot/10000).toFixed(1)+'万'||0}}</view>
						<view class="item bottom">本周热度</view>
					</view>
					<view class="block">
						<view class="item">{{(info.week_count/10000).toFixed(1)+'万'||0}}</view>
						<view class="item bottom">本周贡献</view>
					</view>
				</view>
			</view>
			<view class="right-wrap">
				<view class="avatar-wrap" @tap="$app.goPage('/pages/fans/member?fid=' + info.id)">
					<image class="avatar" :src="info.user.avatarurl||$app.getData('AVATAR')" mode="aspectFill"></image>
					<view class="bottom flex-set">
						<image class="btn" src="https://mmbiz.qpic.cn/mmbiz_png/h9gCibVJa7JXsqa9U7hNge9bVPRa04Tia6LcFf0micBuNEvUO2Fd4iaP8EcuBBFJDGAeKVZtupWHFUNiafibUSySNp7A/0"
						 mode="aspectFill"></image>
						<view class="text">{{info.user.nickname||$app.getData('NICKNAME')}}</view>
					</view>
				</view>
			</view>

		</view>

		<!-- 公告 -->
		<view class="notice-container">
			<view class="left-wrap">【公告】</view>
			<view class="center-wrap text-overflow">{{info.notice || '暂无公告'}}</view>
			<view class="right-wrap" @tap="modal='notice'">查看></view>
		</view>
		
		<view class="center-container">
			<view class="btn-container">
				<button class="btn-wrap" open-type="share" data-shareid="7" @tap="buttonHandler" data-sharetype="share">
					<image class="bg" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9EsP1YK72GM1EGI8VsBLl4vtrkIyuHtPrkLnE4q7PExBxKZHWCvpvibtJ2tse0qyjQnt3iaCeFwcYRw/0"
					 mode="aspectFill"></image>

					<view class="content">
						<view class="text">{{info.mass_people||0}}人</view>
						<view class="times">{{info.mass_time||''}}集结中</view>
						<!-- <view class="text">热度+{{info.mass_total||0}}</view> -->
						<view class="fans-rank-wrap">
							<image class="avatar" v-for="(item,index) in info.mass_user" :key="index" :src="item.user.avatarurl||$app.getData('AVATAR')"
							 mode="aspectFill"></image>
						</view>
						<view class="bottom">立即集结</view>
					</view>
				</button>

				<button class="btn-wrap" open-type="share" data-shareid="6" @tap="buttonHandler" data-sharetype="share">
					<image class="bg" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9EsP1YK72GM1EGI8VsBLl4vVlgubYlzs8FCz0vgxVeoOicJ02rKvAj6QfR6gaThFRotgxiaeyD01Yog/0"
					 mode="aspectFill"></image>
					<view class="content">
						<view class="text">{{info.new_people||0}}人</view>
						<view class="times">今日新加入</view>
						<view class="fans-rank-wrap">
							<image class="avatar" v-for="(item,index) in info.new_user" :key="index" :src="item.user.avatarurl||$app.getData('AVATAR')"
							 mode="aspectFill"></image>
						</view>
						<view class="bottom">邀请成员加入</view>
					</view>
				</button>

			</view>
		</view>

		<view class="title-wrap" v-if="taskList.length>0">粉丝团每周任务（奖励由团长领取）</view>

		<view class="taskitem" v-for="(item,index) in taskList" :key="index">
			<view v-if="current != 2" class="left-content">
				<image class="img" :src="item.icon" mode=""></image>
				<view class="content ">
					<view class="top text-overflow">{{item.name}}</view>
					<view class="bottom" v-if="item.desc">{{item.desc}}</view>
					<block v-else-if="item.times">
						<view class="bottom">本周({{item.doneTimes}}/{{item.times}})</view>
						<view class="bottom">上周({{item.lastWeek_doneTimes}}/{{item.times}}) <icon type="success" size="12" v-if="item.status>0"></icon>
						</view>
					</block>
				</view>
			</view>
			<view v-else class="left-content badge-type">
				<image class="img" :src="item.icon" mode=""></image>
				<view class="content">
					<view class="top text-overflow">{{item.name}}</view>
					<block v-if="item.desc">
						<view class="bottom">{{item.desc}},本周({{item.doneTimes}}/{{item.count}})</view>
						<view class="bottom">{{item.desc}},上周({{item.lastWeek_doneTimes}}/{{item.count}}) <icon type="success" size="12"
							 v-if="item.status>0"></icon>
						</view>
					</block>
				</view>
			</view>

			<view class="right-content">
				<view class="earn">
					<view class="right-item" v-if="item.coin">
						<image src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FctOFR9uh4qenFtU5NmMB5uWEQk2MTaRfxdveGhfFhS1G5dUIkwlT5fosfMaW0c9aQKy3mH3XAew/0"
						 mode="widthFix"></image>
						<view class="add-count">+{{item.coin}}</view>
					</view>
					<view class="right-item" v-if="item.stone">
						<image src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTERibO7VvqicUHiaSaSa5xyRcvuiaOibBLgTdh8Mh4csFEWRCbz3VIQw1VKMCQ/0"
						 mode="widthFix"></image>
						<view class="add-count">+{{item.stone}}</view>
					</view>
					<view class="right-item" v-if="item.flower">
						<image src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTERziauZWDgQPHRlOiac7NsMqj5Bbz1VfzicVr9BqhXgVmBmOA2AuE7ZnMbA/0"
						 mode="widthFix"></image>
						<view class="add-count">+{{item.flower}}</view>
					</view>
					<view class="right-item" v-if="item.trumpet">
						<image src="/static/image/user/trumpet-icon.png" mode="widthFix"></image>
						<view class="add-count">+{{item.trumpet}}</view>
					</view>

				</view>
				<view v-if="current!=2" class="btn">

					<btnComponent type="default" v-if="item.status != 1 || !info.leader">
						<button v-if="!item.gopage" class="btn" :open-type="item.open_type" :data-shareid="item.shareid" @tap="buttonHandler">
							<view class="flex-set" style="width: 130upx;height: 65upx;">{{item.btn_text||'去完成'}}</view>
						</button>
						<button v-else class="btn" @tap="doTask(item,index)">
							<view class="flex-set" style="width: 130upx;height: 65upx;">{{item.btn_text||'去完成'}}</view>
						</button>
					</btnComponent>

					<btnComponent type="success" v-if="item.status == 1 && info.leader" @tap="doTask(item,index)">
						<view class="flex-set" style="width: 130upx;height: 65upx;">可领取</view>
					</btnComponent>

					<view v-if="item.status == 2" class="flex-set" style="font-size: 22upx;margin-top: 4upx;">上周已领</view>

				</view>
				<view v-else class="btn" @tap="useBadge(item,index)">
					<btnComponent type="default" v-if="item.status == 0">
						<!-- 分享 -->
						<button class="btn" :open-type="item.open_type" @tap="buttonHandler" v-if="item.type == 1">
							<view class="flex-set" style="width: 130upx;height: 65upx;">{{item.btn_text||'去完成'}}</view>
						</button>

						<!-- 默认 -->
						<view v-else class="flex-set" style="width: 130upx;height: 65upx;">
							{{item.btn_text||'去完成'}}
						</view>
					</btnComponent>

					<btnComponent type="success" v-if="item.status == 1">
						<view class="flex-set" style="width: 130upx;height: 65upx;">佩戴</view>
					</btnComponent>
					<btnComponent type="disable" v-if="item.status == 2">
						<view class="flex-set" style="width: 130upx;height: 65upx;">卸下</view>
					</btnComponent>
				</view>
			</view>
		</view>


		<shareModalComponent ref="shareModal"></shareModalComponent>
		
		<modalComponent v-if="modal == 'notice'" type="center" title="提示" @closeModal="modal=''">
			<view class="modal-container editmsg-modal-container">
				<view class="row flex-set">公告</view>
				<view class="row">
					<view class="input-wrap">
						<textarea v-if="info.leader" class="input" @input="info.notice=$event.detail.value"
						 placeholder="请输入内容:)"></textarea>
						<view v-else class="input">{{info.notice || '暂无公告'}}</view>
					</view>
		
				</view>
		
				<view class="btn-wrap flex-set">
					<btnComponent type="default">
						<view class="btn" v-if="info.leader" @tap="editNotice()">修改</view>
						<view class="btn" v-else @tap="modal=''">确定</view>
					</btnComponent>
				</view>
			</view>
		</modalComponent>
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
				taskList: [],
				fid: 0,
				modal: '',
				info: {
					week_count: 0,
					week_hot: 0,
					notice: '暂无公告',
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
			mass(type) {
				this.$app.request('ext/fansclubMass', {
					type
				}, res => {
					this.$app.toast('集结成功', 'success')
					this.modal = ''
				}, 'POST', true)
			},
			ad() {
				const timeTask = {
					url :'ext/fansclubMass', 
					data:{
						type:1
					},
				};
				this.$app.setData('timeTask', timeTask);
				this.$app.openVideoAd(() => {
					this.$app.setData('timeTask', null);
					this.mass(1)
				},this.$app.getData('config').kindness_switch)
			},
			loadData() {
				this.$app.request('fans/info', {
					fid: this.fid || 0
				}, res => {
					this.info = res.data
				})
				this.getTaskList()
			},
			getTaskList() {
				this.$app.request('fans/task', {
					type: this.current
				}, res => {
					this.taskList = res.data
				})
			},
			doTask(task, index) {
				if (task.status !=1 || !this.info.leader) {
					this.$app.goPage(task.gopage)
				}
				else if(task.status == 1 && this.info.leader) this.taskSettle(task.id, index)
			},

			// 领取奖励
			taskSettle(task_id, index) {
				this.$app.request('fans/tasksettle', {
					task_id
				}, res => {
					this.taskList[index].status = 2
					let toast = '领取成功'
					if (res.data.coin) toast += '，金豆+' + res.data.coin
					if (res.data.flower) toast += '，鲜花+' + res.data.flower
					if (res.data.stone) toast += '，钻石+' + res.data.stone
					if (res.data.trumpet) toast += '，喇叭+' + res.data.trumpet

					this.$app.toast(toast)
					this.getTaskList()
				}, 'POST', true)
			},
			
			editNotice(val) {
				this.modal = ''
				if(this.info.notice.length>30){
					this.$app.toast('公告不能超过30个字')
					return
				}
				this.$app.request('fans/editNotice', {
					fid: this.fid,
					notice: this.info.notice,
				}, res => {
					this.$app.toast('操作成功', 'success')
					this.loadData()
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
			color: #fff;
			background-color: #2b3849;
			display: flex;

			.left-wrap {
				flex: 1;

				.top-wrap {
					font-weight: 700;
					font-size: 34upx;
					margin: 20upx 0;
					display: flex;
					justify-content: space-between;
					
					.flex-set{
						display: flex;
						justify-content: start;
						
						.text{
							max-width: 300upx;
							text-overflow: ellipsis;
							white-space: nowrap;
							overflow: hidden;
						}
					}
					
					.btn{
						font-weight: normal;
						font-size: 28upx;
					}
					
					image{
						width: 40upx;
						height: 40upx;
						margin-right: 10upx;
					}
				}

				.content-wrap {
					display: flex;

					.block {
						flex: 1;
						white-space: nowrap;

						.bottom {
							font-size: 24upx;
							color: #dce0e1;
						}
					}
				}

			}

			.right-wrap {
				.avatar-wrap {
					position: relative;
					margin: 40upx;

					.avatar {
						width: 120upx;
						height: 120upx;
						border-radius: 50%;
						box-shadow: 0 2upx 16upx rgba(#999, .6);
					}

					.bottom {
						width: 120upx;
						height: 34upx;
						overflow: hidden;
						position: absolute;
						left: 50%;
						transform: translateX(-50%);
						bottom: -10upx;
						text-align: center;

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
		
		.notice-container {
			display: flex;
			align-items: center;
			font-size: 26upx;
			padding: 10upx 30upx;
		
			.left-wrap {
				color: #e3ba0c;
			}
		
			.center-wrap {
				color: #666666;
				flex: 1;
			}
		
			.right-wrap {
				color: #b1b1b1;
			}
		}

		.center-container {
			// border-radius: 30rpx;
			// box-shadow: 0 2rpx 16rpx rgba(153, 153, 153, 0.3);
			// margin: 20rpx;

			.btn-container {
				display: flex;
				justify-content: space-between;
				padding: 15upx;
				color: #fff;

				.btn-wrap {
					margin: auto;
					position: relative;
					width: 340upx;
					height: 260upx;
					border-radius: 20upx;
					overflow: hidden;
					z-index: 1;
					text-align: left;

					.bg {
						position: absolute;
						z-index: -1;
					}

					.content {
						padding: 20upx;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						align-items: center;

						.text {
							font-size: 40upx;
							font-weight: bold;
						}

						.fans-rank-wrap {
							height: 40upx;
							display: flex;

							.avatar {
								width: 50upx;
								height: 50upx;
								border-radius: 50%;
								margin-left: -10upx;
							}
						}

						.bottom {
							border-radius: 30upx;
							background-color: #ee7d03;
							width: 260upx;
							font-size: 32upx;
							margin: 20upx 0;
							text-align: center;
						}
					}
				}

			}


		}

		.title-wrap {
			margin: 10upx 20upx;
		}

		.taskitem {
			margin: 6upx;
			display: flex;
			padding: 10upx 20upx;
			justify-content: space-between;
			align-items: center;
			border-radius: 60upx;
			border: 2upx solid #efefef;

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
						font-size: 24upx;
						color: #888;
					}
				}
			}

			.left-content.badge-type {
				.img {
					width: 169upx;
					height: 51upx;
					border-radius: 0;
				}
			}

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

						image {
							width: 40upx;
						}
					}
				}

				.btn {
					display: flex;
					flex-direction: column;
					align-items: center;
				}
			}

		}
		
		
		.editmsg-modal-container {
			margin-top: -80upx;
		
			.row {
				display: flex;
				align-items: center;
				margin: 40upx;
		
				.title {
					font-size: 32upx;
					width: 110upx;
				}
		
				.input-wrap {
					flex: 1;
		
					.input {
						width: 100%;
						height: 120upx;
						padding: 10upx 20upx;
						border: 1upx solid #ccc;
						border-radius: 20upx;
					}
				}
		
				.image-content {
					width: 250upx;
					height: 200upx;
					border-radius: 20upx;
					overflow: hidden;
					position: relative;
		
					.icon {
						position: absolute;
						font-size: 32upx;
						right: 10upx;
						bottom: 10upx;
					}
				}
			}
		
			.btn-wrap {
				margin: 40upx;
		
				.btn {
					padding: 20upx 80upx;
				}
			}
		
		
		}
		

	}
</style>
