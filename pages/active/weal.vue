<template>
	<view class="container">
		<view class="top">
			<view class="left-label">
				<image src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9HaRS8zyO4qfZ6KE3GsvdKcKQ1Tj3Dic4V8UibaicVxQbnYiblStG6lzUG3s0FZY7vxaywUEU9HWjIGPQ/0"
				mode="aspectFit"></image>
				<view class="position-set">夏日福利</view>
			</view>
			<view class="dialog">
				<view style="position: relative;">
					<image class="bg" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9HaRS8zyO4qfZ6KE3GsvdKcJm83ucaLXo2HBW2T0KRPrH6yBbnsvk9340iaQPnvPX7uembUMVTibdoA/0"
					mode="aspectFit"></image>
					<view class="position-set tip">
						<view class="tip-content">
							当前冲榜增加
							<text class="percent">{{myinfo.lucky || 0}}%</text>
							额外人气
							<text class="iconfont iconicon-test trip"></text>
						</view>
					</view>
				</view>
			</view>
			<image class="fudai-img" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9HaRS8zyO4qfZ6KE3GsvdKcvuXhdSjohDPXfudibqhwhhu7UVIhyBwd9SNEHGueXOPEwt6Bj4edMMQ/0"
			mode="aspectFit"></image>
			<view class="progress">
				<progress class="per-info" :percent="myinfo.lucky || 0" stroke-width="10" activeColor="#ff9f08" border-radius="5" />
			</view>
			<view class="percent-num">{{myinfo.lucky || 0}}%</view>
			<view class="go-log" @tap="$app.goPage('/pages/active/weal_log')">领取记录</view>
		</view>
		<view class="tips">
			<view class="tips-left">做任务得夏日福袋、提高幸运值</view>
			<view class="tips-right" @tap="$app.goPage('/pages/active/weal_list')">福气榜></view>
		</view>
		<view class="item" v-for="(item,index) in taskList" :key="index" v-if="!($app.getData('config').version == $app.getData('VERSION') || $app.chargeSwitch() == 1)">

			<view class="left-content badge-type">
				<image class="img" :src="item.icon" mode=""></image>
				<view class="content">
					<view class="text-overflow">{{item.name}}</view>
					<view class="bottom" v-if="item.desc">{{item.desc}}</view>
					<view class="bottom" v-if="item.key == 'USE_POINT'">({{item.done_times ? $app.formatFloatNum(item.done_times/10000):0}}/{{item.done ? $app.formatFloatNum(item.done/10000):0}})</view>
					<view class="bottom" v-else>({{item.done_times||0}}/{{item.done||0}})</view>
				</view>
			</view>

			<view class="right-content">
				<view class="earn">
					<view class="right-item">
						<image src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTERabwYgrRn5cjV3uoOa8BonlDPGMn7icL9icvz43XsbexzcqkCcrTcdZqw/0" mode="widthFix"></image>
						<view class="add-count">*{{item.reward}}</view>
					</view>
				</view>
				<view class="btn" @tap="doTask(item,index)">
					<btnComponent type="default" v-if="item.status == 0">
						<block v-if="item.id==6 && $app.chargeSwitch()==2">
							<button class="btn" open-type="contact" @tap.stop>
								<view class="flex-set" style="width: 130upx;height: 65upx;">回复"1"</view>
							</button>
						</block>
						<block v-else-if="item.open_type">
							<button class="btn" :open-type="item.open_type" :data-shareid="item.shareid" @tap="buttonHandler">
								<view class="flex-set" style="width: 130upx;height: 65upx;">{{item.btn_text||'去完成'}}</view>
							</button>
						</block>
						<block v-else>
							<button class="btn">
								<view class="flex-set" style="width: 130upx;height: 65upx;">{{item.btn_text||'去完成'}}</view>
							</button>
						</block>
					</btnComponent>

					<btnComponent type="success" v-if="item.status == 1">
						<view class="flex-set" style="width: 130upx;height: 65upx;">可领取</view>
					</btnComponent>

					<btnComponent type="disable" v-if="item.status == 2">
						<view class="flex-set" style="width: 130upx;height: 65upx;">已完成</view>
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

		<shareModalComponent ref="shareModal"></shareModalComponent>
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
				taskList: [],
				modal: '',
				myinfo: {},
				weiboUrl: '',
				weibo_zhuanfa: {},

			};
		},
		onShow() {
			this.getTaskList()
		},
		onLoad() {
			this.getShareText()
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
			/**显示视频广告*/
			openAdver() {
				this.$app.openVideoAd(() => {
					this.taskSettle(4)
				}, this.$app.getData('config').kindness_switch)
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
			doTask(task, index) {
				if (task.key == 'WEIBO_SUPER' && task.status == 0) {
					// 微博超话
					this.modal = 'weibo'
				} else if (task.key == 'WEIBO_RE_POST' && task.status == 0) {
					// 微博转发
					this.modal = 'weibo_zhuanfa'
				// } else if (task.id == 4 && task.status == 0) {
				// 	// 观看视频
				// 	this.openAdver()
				} else if (task.gopage && task.status == 0) {
					// 跳转页面
					this.$app.goPage(task.gopage)
				} else if (task.status == 1) { // 去领取
					this.taskSettle(task.id)
				}
			},
			// 领取奖励
			taskSettle(task_id) {
				uni.showLoading({
					mask:true,
					title:"正在领取..."
				});
				this.$app.request(this.$app.API.ACTIVE_WEAL_BAG_GET, {
					task_id
				}, res => {
					let toast = '领取成功，幸运值+' + res.data;
					this.$app.toast(toast, 'success')
					this.getTaskList()
				}, 'POST', true)
			},
			getShareText() {
				this.$app.request(this.$app.API.EXT_SHARETEXT, {}, res => {
					this.shareText = res.data.share_text
					this.weibo_zhuanfa = res.data.weibo_zhuanfa
				})
			},
			getTaskList() {
				this.$app.request(this.$app.API.ACTIVE_WEAL_TASK_LIST, {}, res => {
					this.taskList = res.data.list;
					this.myinfo = res.data.myinfo;
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		.top {
			position: relative;
			width: 100%;
			height:367upx;
			background:rgba(251,204,62,0.16);
			// opacity:0.16;
			.left-label {
				position: absolute;
				left: 46upx;
				top: 69upx;
				image {
					width: 84upx;
					height: 230upx;
				}
				view {
					font-size: 26upx;
					width: 24upx;
					color: white;
					line-height: 34upx;
					font-weight: 500;
					margin: 0 auto;
				}
			}
			.dialog {
				position: absolute;
				top: 79upx;
				left:390upx;
				width: 332upx;
				height: 66upx;
				.bg{
					width: 332upx;
					height: 66upx;
				}
				.tip {
					width: 330upx;
					height: 30upx;
					line-height: 20upx;
					text-align: center;
					.tip-content {
						color: white;
						font-size: 20upx;
						.percent {
							color: #D86215;
							font-size: 30upx;
							display: inline-block;
							padding:0 7upx;
						}
						.trip {
							width: 20upx;
							padding-left: 5upx;
							height: 20upx;
							padding: auto;
							display: inline-block;
						}
					}
				}
			}
			.fudai-img {
				position: absolute;
				width: 117upx;
				height: 109upx;
				left: 318upx;
				top: 141upx;
			}
			.progress {
				position: absolute;
				top: 275upx;
				left: 222upx;
				width: 260upx;
				height: 30upx;
			}
			.percent-num {
				position: absolute;
				left: 500upx;
				top: 264upx;
				width: 60upx;
				height: 20upx;
				color: #8D857A;
			}
			.go-log {
				position: absolute;
				top: 20upx;
				left: 605upx;
				font-size: 30upx;
				width: 130upx;
				height: 30upx;
				font-weight: 500;
				text-decoration:underline;
				color:rgba(255,114,0,1);
			}
		}
		.tips {
			width: 100%;
			padding: 10rpx 40rpx;
			display: flex;
			justify-content: space-between;
			font-size: 30rpx;

			.tips-right {
				color: #e3ba0c;
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
