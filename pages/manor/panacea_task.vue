<template>
	<view class="panacea-task-container">
		<scroll-view scroll-y class="scroll-wrapper" :style="{height: dheight+'px'}">
			<view class="item" v-for="(item,index) in taskList" :key="index" v-if="!($app.getData('config').version == $app.getData('VERSION') || $app.chargeSwitch() == 1)">
				<view class="left-content badge-type">
					<image class="img" :src="'/static/image/user_level/lv'+level+'.png'" v-if="item.key == 'LEVEL'"></image>
					<image class="img" :src="item.icon" mode="" v-else></image>
					<view class="content">
						<view class="text-overflow">{{item.name}}</view>
						<view class="bottom" v-if="item.desc">{{item.desc}}</view>
						<block v-if="item.type != 'RANK'">
							<view class="bottom" v-if="item.key == 'USE_POINT'">({{item.done_times ? $app.formatFloatNum(item.done_times/10000):0}}/{{item.done ? $app.formatFloatNum(item.done/10000):0}})</view>
							<view class="bottom" v-else>({{$app.formatNumber(item.done_times||0)}}/{{$app.formatNumber(item.done || 0)}})</view>
						</block>
					</view>
				</view>

				<view class="right-content">
					<view class="earn">
						<view class="right-item" v-if="item.type != 'RANK'">
							<image src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9Fic6VmPQYib2ktqATmSxJmUtVH7OoNPjuMs2xwl26pXQGbQn74vvibp5mUNuJk7ucxzdXGAd8OlHJDA/0" mode="widthFix"></image>
							<view class="add-count">+{{item.reward}}</view>
						</view>
						<view class="right-item" v-if="item.type == 'RANK'">
							<image src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9Fic6VmPQYib2ktqATmSxJmUtVH7OoNPjuMs2xwl26pXQGbQn74vvibp5mUNuJk7ucxzdXGAd8OlHJDA/0" mode="widthFix"></image>
							<view class="add-count">{{item.reward}}</view>
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
		</scroll-view>

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
				weiboUrl: '',
				weibo_zhuanfa: {},
				level: undefined,
				dheight: 0,
			};
		},
		onLoad() {
			this.getShareText()
		},
		onShow() {
			this.dheight = uni.getSystemInfoSync().windowHeight;
			this.getTaskList()
		},
		methods: {
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
					// #ifdef MP
					if (task.hasOwnProperty('open_type') && !!task.open_type) {
						return;
					}
					// #endif
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
				this.$app.request(this.$app.API.PANACEA_FINISH_TASK, {
					task_id
				}, res => {
					uni.showToast({
						mask:true,
						title:"领取成功",
						icon:'success'
					})
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
				this.$app.request(this.$app.API.PANACEA_TASK_LIST, {}, res => {
					this.taskList = res.data;
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.panacea-task-container {
		background-image: url("https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9HnqQXz07SO8rM1uzBoVhDxyrvoy2uibbD5myzWgH4hrQOgAjqiafI0gk1Ha5y5cVxdwKNSnKkL1TSw/0");
		background-position: center center;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		height: 100%;
		width: 100%;
		color: #653208;
		.scroll-wrapper {
			padding-top: 40rpx;
			.item {
				margin: 20upx;
				display: flex;
				padding: 20upx 40upx;
				justify-content: space-between;
				align-items: center;
				border-radius: 60upx;
				// border: 2upx solid #FC6257;
				background-color: white;
				height: 100rpx;

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
