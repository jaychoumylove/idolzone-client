<template>
	<view class="page-container">
		<!-- 没有师徒 -->
		<view class="type-1" v-if="!father && !sonCount">
			<image class="bg-img" src="https://mmbiz.qpic.cn/mmbiz_jpg/w5pLFvdua9HpdKa9zTbvwsKmJ6hE0kNdoO1lyh6ENicAb4DlbKfJaJlEYUibVlibR5bMxOISVHcoRKfKbo3mVziaEQ/0"
			 mode="aspectFill"></image>
			<view class="btn-wrap flex-set" v-if="type==2">
				<view class="btn b-2 flex-set" @tap="$app.goPage('/pages/father/list')">师父列表</view>
				<button class="btn b-1 flex-set" open-type="share" data-shareid="12">我要拜师</button>
			</view>
			<view class="btn-wrap flex-set" v-if="type==1">
				<view class="btn b-2 flex-set" @tap="modal='editmsg'">招徒宣言</view>
				<button class="btn b-1 flex-set" open-type="share" data-shareid="13">我要收徒</button>
			</view>

			<view class="notice-container">
				<image class="bg-img" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9HpdKa9zTbvwsKmJ6hE0kNdRiaib4VBCv9v3aCwWFuicaYm24w6wyvr2QFBbZfLfGILEickoNzPhiatyHA/0"
				 mode="aspectFill"></image>
				<view class="content">
					<view class="title">师徒玩法</view>
					<view class="p">1、 师徒玩法次</view>
					<view class="p">1、 师徒玩法次</view>
					<view class="p">1、 师徒玩法次</view>
					<view class="p">1、 师徒玩法次</view>

				</view>
			</view>
		</view>
		<!-- 有一个以上师徒 -->
		<view class="type-2" v-else>
			<!-- 顶部信息 -->
			<view class="top-container">
				<image class="avatar" :src="$app.getData('userInfo').avatarurl" mode="aspectFill"></image>

				<view class="text-wrapper text-overflow left">
					<view class="row-wrapper flex-set" v-if="father">
						我的师父：<text class="bold">{{father.father.nickname}}</text>
					</view>
					<view class="row-wrapper flex-set" v-if="sonCount">
						我的徒弟：<text class="bold">{{sonCount}}</text>
					</view>
					<view class="row-wrapper flex-set s">
						累计收益：
						<view class="right-item" v-if="earn.coin">
							<image class="img-s" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FctOFR9uh4qenFtU5NmMB5uWEQk2MTaRfxdveGhfFhS1G5dUIkwlT5fosfMaW0c9aQKy3mH3XAew/0"
							 mode="widthFix"></image>
							<view class="count">{{earn.coin}}</view>
						</view>
						<view class="right-item" v-if="earn.stone">
							<image class="img-s" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTERibO7VvqicUHiaSaSa5xyRcvuiaOibBLgTdh8Mh4csFEWRCbz3VIQw1VKMCQ/0"
							 mode="widthFix"></image>
							<view class="count">{{earn.stone}}</view>
						</view>
						<view class="right-item" v-if="earn.flower">
							<image class="img-s" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTERziauZWDgQPHRlOiac7NsMqj5Bbz1VfzicVr9BqhXgVmBmOA2AuE7ZnMbA/0"
							 mode="widthFix"></image>
							<view class="count">{{earn.flower}}</view>
						</view>
						<view class="right-item" v-if="earn.trumpet">
							<image class="img-s" src="/static/image/user/trumpet-icon.png" mode="widthFix"></image>
							<view class="count">{{earn.trumpet}}</view>
						</view>
					</view>
				</view>
				<view class="text-wrapper btn" v-if="sonCount">
					<view class="btn-wrap b-2 flex-set" @tap="modal='editmsg'">招徒宣言</view>
					<button class="btn-wrap b-1 flex-set" open-type="share" data-shareid="13">我要收徒</button>
				</view>
			</view>
			<!-- 公告 -->
			<view class="notice-container" @tap="$app.goPage('/pages/notice/notice?id='+article.id)">
				<text class="left-wrap">【公告】</text>
				<text class="center-wrap">xxx</text>
				<text class="right-wrap" @tap.stop="modal='notice'">更多></text>
			</view>
			<!-- 徒弟等级分别 -->
			<view class="tab-wrap">
				<view class="item" :class="{active:tabActive==0}" @tap="changeTab(0)">入门弟子</view>
				<view class="item" :class="{active:tabActive==1}" @tap="changeTab(1)">核心弟子</view>
				<view class="item" :class="{active:tabActive==2}" @tap="changeTab(2)">亲传弟子</view>
				<view class="item" :class="{active:tabActive==3}" @tap="changeTab(3)">关门弟子</view>
			</view>
			<!-- 徒弟列表 -->
			<view class="list-container" v-if="sonCount">
				<view class="item" v-for="(item,index) in sonList" :key="index">
					<view class='avatar-wrap'>
						<image class="avatar" :src="item.son.avatarurl || $app.getData('AVATAR')" mode="aspectFill"></image>
						<image v-if="item&&item.headwear&&item.headwear.img" class="headwear position-set" :src="item.headwear.img" mode=""></image>
					</view>
					<view class="text-container">
						<view>
							{{item.son.nickname || $app.getData('NICKNAME')}}
							<image class="img-s" :src="`/static/image/user_level/lv${item.level}.png`" mode=""></image>
						</view>
					</view>
					<view class="count">
						<view class="btn">任务进度（{{item.complete}}）</view>
					</view>
				</view>
			</view>
			<!-- 任务列表 -->
			<view v-if="father" class="task item" v-for="(item,index) in taskList" :key="index">
				<view class="left-content">
					<image class="img" :src="item.icon" mode=""></image>
					<view class="content ">
						<view class="top text-overflow">{{item.name}}</view>
						<view class="bottom" v-if="item.desc">{{item.desc}}</view>
						<view class="bottom" v-else-if="item.times">({{item.doneTimes}}/{{item.times}})</view>
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
					<view class="btn" @tap="doTask(item,index)">

						<btnComponent type="default" v-if="item.status == 0">
							<button class="btn" :open-type="item.open_type">
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
				</view>
			</view>

		</view>

		<modalComponent v-if="modal == 'editmsg'" type="center" title="提示" @closeModal="modal=''">
			<view class="modal-container editmsg-modal-container">
				<view class="row flex-set">招徒宣言</view>
				<view class="row">
					<view class="title">消息</view>
					<view class="input-wrap">
						<textarea class="input" :value="father_open_msg" @input="father_open_msg=$event.detail.value" placeholder=""></textarea>
					</view>
				</view>
				<view class="row">
					<view class="title">图片</view>
					<view class="image-content" @tap='upload'>
						<image class="img" :src="father_open_img" mode=""></image>
						<view class="icon iconfont iconeditor"></view>
					</view>
				</view>

				<view class="btn-wrap flex-set">
					<btnComponent type="default">
						<view class="btn" @tap="editMsg()">修改</view>
					</btnComponent>
				</view>
			</view>
		</modalComponent>
		<modalComponent v-if="modal == 'notice'" type="center" title="提示" @closeModal="modal=''">
			<view class="modal-container editmsg-modal-container">
				<view class="row flex-set">公告</view>
				<view class="row">
					<view class="input-wrap">
						<textarea class="input" :value="father_open_msg" @input="father_open_msg=$event.detail.value" placeholder=""></textarea>
					</view>
				</view>
		
				<view class="btn-wrap flex-set">
					<btnComponent type="default">
						<view class="btn" @tap="editMsg()">修改</view>
					</btnComponent>
				</view>
			</view>
		</modalComponent>
	</view>
</template>

<script>
	import prompt from "@/components/zz-prompt/index.vue";
	import btnComponent from '@/components/btnComponent.vue'
	import modalComponent from '@/components/modalComponent.vue'
	export default {
		components: {
			prompt,
			btnComponent,
			modalComponent,
		},
		data() {
			return {
				modal: '',
				type: 0, // 0 用户没有建立师徒关系 1有
				father: null, // 师父
				sonCount: null, // 徒弟数量
				earn: null, // 累计收益
				sonList: null, // 徒弟列表
				taskList: null, // 任务列表

				tabActive: 0, // 入门弟子
				father_open_msg: '', // 招徒宣言
				father_open_img: '', // 招徒宣言
			};
		},
		onShow() {
			this.loadData()
		},
		onShareAppMessage(e) {
			let share = {
				'path': this.$app.getData('config').share_cfg[13].path,
				'imageUrl': this.father_open_img || this.$app.getData('config').share_cfg[13].imageUrl,
				'title': this.father_open_msg || this.$app.getData('config').share_cfg[13].title
			}
			return this.$app.commonShareAppMessage(share)
		},
		methods: {
			upload() {
				uni.chooseImage({
					count: 1,
					success: res => {
						let img = res.tempFiles[0]
						if (img.size > 2097152) {
							this.$app.toast('图片过大，请上传2M以下的图片')
						} else {
							this.$app.upload(img.path, res => {
								this.father_open_img = res[0]
							})
						}
					}
				});
			},
			changeTab(index) {
				this.tabActive = index
				if (this.father) {
					this.getTaskList()
				} else if (this.sonCount) {
					this.getSonList()
				}
			},
			doTask(task, index) {
				if (task.status == 0) { // 做任务
					if (task.gopage) {
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
				this.$app.request('father/taskSettle', {
					task_id
				}, res => {
					let toast = '领取成功'
					if (res.data.coin) toast += '，金豆+' + res.data.coin
					if (res.data.flower) toast += '，鲜花+' + res.data.flower
					if (res.data.stone) toast += '，钻石+' + res.data.stone
					if (res.data.trumpet) toast += '，喇叭+' + res.data.trumpet

					this.$app.toast(toast)
					this.loadData()
					this.$app.request(this.$app.API.USER_CURRENCY, {}, res => {
						this.$app.setData('userCurrency', res.data)
					})
				}, 'POST', true)
			},
			editMsg(val) {
				this.modal = ''
				this.$app.request('father/editMsg', {
					msg: this.father_open_msg,
					img: this.father_open_img,
				}, res => {
					this.$app.toast('操作成功', 'success')
					this.loadData()
				})
			},
			getTaskList() {
				this.$app.request('father/taskList', {
					active: this.tabActive
				}, res => {
					this.taskList = res.data
				})
			},
			getSonList() {
				this.$app.request('father/sonList', {
					active: this.tabActive
				}, res => {
					this.sonList = res.data
				})
			},
			loadData() {
				this.$app.request('father/info', {

				}, res => {
					this.type = res.data.type
					this.earn = res.data.earn
					this.father = res.data.father
					this.sonCount = res.data.sonCount
					this.father_open_msg = res.data.father_open_share.father_open_msg || this.$app.getData('config').share_cfg[13].title
					this.father_open_img = res.data.father_open_share.father_open_img || this.$app.getData('config').share_cfg[13].imageUrl

					if (this.father) {
						this.getTaskList()
					} else if (this.sonCount) {
						this.getSonList()
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.page-container {
		.bg-img {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: -1;
		}

		.type-1 {
			.btn-wrap {
				height: 600upx;
				font-size: 24upx;
				flex-direction: column;

				.btn {
					border-radius: 30upx;
					color: #fff;
					padding: 20upx 60upx;
					margin: 30upx;
					font-size: 36upx;
				}

				.btn.b-1 {
					background: linear-gradient(to bottom, #fcc200, #f4930c);
				}

				.btn.b-2 {
					background: linear-gradient(to bottom, #7576ff, #534dfd);
				}
			}

			.notice-container {
				position: relative;
				width: 724upx;
				height: 504upx;
				margin: auto;

				.bg-img {
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
				}

				.content {
					text-align: left;
					font-size: 26upx;
					padding: 55upx;

					.title {
						text-align: center;
						font-size: 34upx;
						padding-bottom: 12upx;
					}
				}
			}
		}

		.type-2 {
			.top-container {
				padding: 20upx 40upx;
				display: flex;
				align-items: center;

				.avatar {
					position: relative;
					overflow: hidden;
					border-radius: 50%;
					width: 120upx;
					height: 120upx;
				}

				.text-wrapper {
					line-height: 1.5;

					.row-wrapper {
						justify-content: flex-start;
						font-size: 34upx;

						.bold {
							font-weight: 700;
						}

						.right-item {
							display: flex;
							justify-content: center;
							align-items: center;
						}
					}

					.row-wrapper.s {
						font-size: 26upx;
					}

				}

				.text-wrapper.left {
					flex: 1;
					margin: 0 20upx;
				}

				.text-wrapper.btn {

					.btn-wrap {
						border-radius: 30upx;
						color: #fff;
						padding: 10upx 20upx;
						margin: 10upx 0;
					}

					.btn-wrap.b-1 {
						background: linear-gradient(to bottom, #fcc200, #f4930c);
					}

					.btn-wrap.b-2 {
						background: linear-gradient(to bottom, #7576ff, #534dfd);
					}
				}
			}

			.notice-container {
				align-items: center;
				font-size: 26upx;
				padding: 20upx 40upx;

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

			.tab-wrap {
				padding: 15upx 30upx;
				display: flex;
				align-items: flex-end;
				justify-content: space-between;
				font-size: 32upx;

				.item {
					position: relative;
					line-height: 1.2;
					padding: 0 16upx;
				}

				.item.active {
					font-size: 36upx;
					font-weight: 700;
				}

				.item.active::after {
					content: "";
					position: absolute;
					bottom: 0;
					height: 14upx;
					width: 100%;
					left: 50%;
					transform: translateX(-50%);
					border-radius: 20upx;
					background-color: #ffd75e;
					z-index: -1;

				}
			}

			.list-container {

				.item {
					display: flex;
					margin: 0 40upx;
					padding: 20upx 0;
					justify-content: space-between;
					align-items: center;

					border-bottom: 2upx solid #efefef;

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

						.bottom-text {
							display: flex;
							align-items: center;
							color: $text-color-1;
						}
					}

					.count {
						margin: 0 30upx;
						color: #ff8421;

						.btn {
							padding: 10upx 30upx;
						}
					}
				}
			}

			.task.item {
				display: flex;
				margin: 0 40upx;
				padding: 20upx 0;
				justify-content: space-between;
				align-items: center;

				border-bottom: 2upx solid #efefef;

				.left-content {
					display: flex;

					.img {
						width: 90upx;
						height: 90upx;
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
