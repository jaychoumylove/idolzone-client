<template>
	<view class="container">

		<!-- <view class="swiper-change flex-set">
			<view class="swiper-item" :class="{select:current==0}" @tap="current = 0;getTaskList();">新手任务</view>
			<view class="swiper-item" :class="{select:current==1}" @tap="current = 1;getTaskList();">每日任务</view>
		</view> -->


		<view class="item" v-for="(item,index) in taskList" :key="index"
			v-if="(item.id!=7) || (item.id==7&&$app.getData('config').version != $app.getVal('VERSION'))">
			<!-- 有些任务不显示 -->
			<view v-if="current != 2" class="left-content">
				<image class="img" :src="item.icon" mode=""></image>
				<view class="content ">
					<view class="top text-overflow">{{item.name}}</view>
					<view class="bottom" v-if="item.desc">{{item.desc}}</view>
					<view class="bottom" v-else-if="item.times">({{item.doneTimes}}/{{item.times}})</view>
				</view>
			</view>
			<view v-else class="left-content badge-type">
				<image class="img" :src="item.icon" mode=""></image>
				<view class="content">
					<view class="top text-overflow">{{item.name}}</view>
					<view class="bottom" v-if="item.desc">{{item.desc}}({{item.doneTimes}}/{{item.count}})</view>
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
				<view v-if="current!=2" class="btn" @tap="doTask(item,index)">
					
					<btnComponent type="default" v-if="item.status == 0">
						<button v-if="item.id==7&&~$app.getData('sysInfo').system.indexOf('iOS')&&$app.getData('config').ios_switch==2" class="btn" open-type="contact" @tap.stop>
							<!-- ios充值去公众号 -->
							<view class="flex-set" style="width: 130upx;height: 65upx;">{{item.btn_text||'去完成'}}</view>
						</button>
						<button v-else class="btn" :open-type="item.open_type">
							<view class="flex-set" style="width: 130upx;height: 65upx;">{{item.btn_text||'去完成'}}</view>
						</button>
					</btnComponent>
					
					<btnComponent type="success" v-if="item.status == 1">
						<view class="flex-set" style="width: 130upx;height: 65upx;">可领取</view>
					</btnComponent>
					
					<btnComponent type="disable" v-if="item.status == 2">
						<view class="flex-set" style="width: 130upx;height: 65upx;">已完成</view>
					</btnComponent>
					
				</view>
				<view v-else class="btn" @tap="useBadge(item,index)">
					<btnComponent type="default" v-if="item.status == 0">
						<!-- 分享 -->
						<button class="btn" open-type="share" v-if="item.type == 1">
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

		<modalComponent v-if="modal == 'weibo'" type="center" title="提示" @closeModal="modal=''">
			<view class="weibo-modal-container flex-set">
				<view class="row-line">
					<view class="left">第一步</view>
					<view class="right">
						<view class="btn" style="text-decoration: underline;" @tap="$app.copy(this.shareText)">点击复制微博格式</view>
					</view>
				</view>
				<view class="row-line">
					<view class="left">第二步</view>
					<view class="right">
						<view class="">在支持的爱豆微博超话中发布复制的微博格式的帖子，每日需要发布新的帖子哦</view>
						<image :src="$app.getData('config').weibo_demo_img" mode="widthFix"></image>
					</view>
				</view>
				<view class="row-line">
					<view class="left">第三步</view>
					<view class="right">
						<view class="">发布的帖子可以直接复制微博链接，在下方输入框提交，系统判定后即可领取奖励</view>
						<input type="text" @input="weiboUrl = $event.detail.value" placeholder="帖子链接" />
					</view>
				</view>

				<btnComponent type="default">
					<view class="flex-set btn" style="width: 160upx;height: 80upx;" @tap="weiboCommit(0)">提交</view>
				</btnComponent>
			</view>
		</modalComponent>

		<modalComponent v-if="modal == 'weibo_zhuanfa'" type="center" title="提示" @closeModal="modal=''">
			<view class="weibo-modal-container flex-set">
				<view class="row-line">
					<view class="left">第一步</view>
					<view class="right">
						<view class="">进入{{weibo_zhuanfa.host}}主页查看{{weibo_zhuanfa.text}}</view>
						<image class="trans" :src="weibo_zhuanfa.img" mode="widthFix"></image>
					</view>
				</view>
				<view class="row-line">
					<view class="left">第二步</view>
					<view class="right">
						<view class="">发布的帖子可以直接复制微博链接，在下方输入框提交，系统判定后即可领取奖励</view>
						<input type="text" @input="weiboUrl = $event.detail.value" placeholder="帖子链接" />
					</view>
				</view>

				<btnComponent type="default">
					<view class="flex-set btn" style="width: 160upx;height: 80upx;" @tap="weiboCommit(1)">提交</view>
				</btnComponent>
			</view>
		</modalComponent>
	</view>
</template>

<script>
	import btnComponent from '@/components/btnComponent.vue'
	import modalComponent from '@/components/modalComponent.vue'

	export default {
		components: {
			btnComponent,
			modalComponent,
		},
		data() {
			return {
				$app: this.$app,
				requestCount: 1,
				taskList: this.$app.getData('taskList') || [],
				modal: '',

				shareText: '',
				weiboUrl: '',
				weibo_zhuanfa: {},

				current: 1, // 任务类别
			};
		},
		onShow() {
			this.getTaskList()
		},
		onLoad() {
			this.getShareText()
		},
		onShareAppMessage(e) {
			const shareType = e.target && e.target.dataset.share
			return this.$app.commonShareAppMessage(shareType)
		},
		methods: {
			/**显示视频广告*/
			openAdver() {
				this.$app.openVideoAd(() => {
					this.taskSettle(19)
				})
			},
			clipboard() {
				uni.setClipboardData({
					data: this.shareText,
					success: () => {
						this.$app.toast('复制成功', 'success')
					}
				});
			},
			weiboCommit(type = 0) {
				if (!this.weiboUrl) return
				this.$app.request(this.$app.API.TASK_WEIBO, {
					weiboUrl: this.weiboUrl,
					type,
				}, res => {
					this.$app.toast('提交成功', 'success')
					this.modal = ''
					this.weiboUrl = ''
					this.getTaskList()
				})
			},
			// 佩戴/卸下徽章
			useBadge(item) {
				if (item.status == 0) {
					if (item.type == 1) {
						// 拉新
						return
					}
				} else {
					this.$app.request('badge/use', {
						badge_id: item.id
					}, res => {
						this.getTaskList()
					}, 'POST', true)

				}
			},
			doTask(task, index) {
				if (task.status == 0) { // 做任务
					if (task.id == 8) {
						// 微博超话
						this.modal = 'weibo'
					} else if (task.id == 9) {
						// 微博转发
						this.modal = 'weibo_zhuanfa'
					} else if (task.id == 19) {
						// 观看视频
						this.openAdver()
					} else if (task.gopage) {
						// 跳转页面
						this.$app.goPage(task.gopage)
					}

				} else if (task.status == 1) { // 去领取
					this.taskList[index].status = 2
					this.taskSettle(task.id)
				}
			},
			// 领取奖励
			taskSettle(task_id) {
				this.$app.request(this.$app.API.TASK_SETTLE, {
					task_id
				}, res => {
					let toast = '领取成功'
					if (res.data.coin) toast += '，金豆+' + res.data.coin
					if (res.data.flower) toast += '，鲜花+' + res.data.flower
					if (res.data.stone) toast += '，钻石+' + res.data.stone
					if (res.data.trumpet) toast += '，喇叭+' + res.data.trumpet
				
					this.$app.toast(toast)
					this.getTaskList()
					this.$app.request(this.$app.API.USER_CURRENCY, {}, res => {
						this.$app.setData('userCurrency', res.data)
					})
				}, 'POST', true)
			},
			//HTTP
			getShareText() {
				this.$app.request(this.$app.API.EXT_SHARETEXT, {}, res => {
					this.shareText = res.data.share_text
					this.weibo_zhuanfa = res.data.weibo_zhuanfa
				})
			},
			getTaskList() {
				this.$app.request(this.$app.API.TASK, {
					type: this.current
				}, res => {
					this.taskList = res.data
					this.$app.setData('taskList', res.data)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		.swiper-change {
			margin: 30upx;
			border-radius: 30upx;
			overflow: hidden;
			box-shadow: 0 2upx 4upx rgba(0, 0, 0, .3);

			.swiper-item {
				flex: 1;
				height: 70upx;
				line-height: 70upx;
				background-color: #f5f5f5;
				color: #ff648d;
				text-align: center;

			}

			.swiper-item.select {
				background-color: #ff648d;
				color: #f5f5f5;
			}

		}


		.item {
			margin: 20upx;
			display: flex;
			padding: 20upx 40upx;
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
					align-items: center;
				}
			}

		}

		.weibo-modal-container {
			height: 100%;
			padding: 30upx;
			flex-direction: column;
			justify-content: center;
			color: #333;
			margin-top: -40upx;

			.row-line {
				display: flex;
				width: 100%;
				margin: 10upx;

				.left {
					width: 20%;
				}

				.right {
					flex: 1;
					font-size: 26upx;

					.btn {
						display: inline-block;
					}

					image {
						width: 60%;
						margin: 10upx auto;
						box-shadow: 0 4upx 8upx rgba(0, 0, 0, .3);
					}

					image.trans {}
				}

			}

			input {
				margin: 10upx 0;
				background-color: #eee;
				border-radius: 60upx;
				height: 70upx;
				padding: 0 20upx;
				color: #333;
			}
		}

	}
</style>
