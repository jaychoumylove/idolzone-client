<template>
	<view class="page-container">
		<image class="bg" :src="$app.getData('config').laren_img" mode="widthFix"></image>

		<view class="top">我的爱心：<text class="count">{{myAixin}}</text>

			<view class="btn-center">
				<btnComponent type="style2">
					<button open-type="share" data-shareid="11" class="share"><text class="iconfont iconshare"></text>去邀请</button>
				</btnComponent>
			</view>
		</view>

		<view class="right-btn" @tap="$app.goPage('/pages/notice/notice?id='+noticeId)"></view>

		<view class="list-wrap l-1">
			<view class="item" v-for="(item,index) in list[1]['list']" :key="index">
				<view class="block">
					<view class="badge" v-if="item.achieve">已解锁</view>
					<view class="badge out" v-else-if="item.remain_count<=0">已售完</view>
				</view>
				<view class="row">还剩{{item.remain_count}}份</view>
				<view class="btn" @tap="openModal(item)"></view>

				<view class="rank" :class="{red:$app.getData('userStar').id==item.top.star_id}" v-if="item.top">
					<view class="num">1.</view>
					<image class="avatar" :src="item.top.star.head_img_s" mode=""></image>
					<text>{{item.top.count}}</text>
					<image class="icon-aixin" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GXekg3ydLp7sf9ictb8WY4oTXWGicNjJYyLflG8icBdbSLrCdkic3uzLoJGIKkJ1NAM3LleXXQJIS8mQ/0"
					 mode="aspectFill"></image>
				</view>
				<view class="rank" v-if="item.self" :class="{red:$app.getData('userStar').id==item.self.star_id}">
					<view class="num">{{item.self.rank}}.</view>
					<image class="avatar" :src="item.self.star.head_img_s" mode=""></image>
					<text>{{item.self.count}}</text>
					<image class="icon-aixin" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GXekg3ydLp7sf9ictb8WY4oTXWGicNjJYyLflG8icBdbSLrCdkic3uzLoJGIKkJ1NAM3LleXXQJIS8mQ/0"
					 mode="aspectFill"></image>
				</view>
			</view>
		</view>
		<view class="list-wrap l-2">
			<view class="item" v-for="(item,index) in list[2]['list']" :key="index">
				<view class="block">
					<view class="badge" v-if="item.achieve">已解锁</view>
					<view class="badge out" v-else-if="item.remain_count<=0">已售完</view>
				</view>
				<view class="row">还剩{{item.remain_count}}份</view>
				<view class="btn" @tap="openModal(item)"></view>

				<view class="rank" :class="{red:$app.getData('userStar').id==item.top.star_id}" v-if="item.top">
					<view class="num">1.</view>
					<image class="avatar" :src="item.top.star.head_img_s" mode=""></image>
					<text>{{item.top.count}}</text>
					<image class="icon-aixin" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GXekg3ydLp7sf9ictb8WY4oTXWGicNjJYyLflG8icBdbSLrCdkic3uzLoJGIKkJ1NAM3LleXXQJIS8mQ/0"
					 mode="aspectFill"></image>
				</view>
				<view class="rank" v-if="item.self" :class="{red:$app.getData('userStar').id==item.self.star_id}">
					<view class="num">{{item.self.rank}}.</view>
					<image class="avatar" :src="item.self.star.head_img_s" mode=""></image>
					<text>{{item.self.count}}</text>
					<image class="icon-aixin" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GXekg3ydLp7sf9ictb8WY4oTXWGicNjJYyLflG8icBdbSLrCdkic3uzLoJGIKkJ1NAM3LleXXQJIS8mQ/0"
					 mode="aspectFill"></image>
				</view>
			</view>
		</view>
		<view class="list-wrap l-3">
			<view class="item" v-for="(item,index) in list[3]['list']" :key="index">
				<view class="btn" @tap="openModal(item)"></view>
			</view>
		</view>

		<view class="list-wrap l-4">
			<scroll-view scroll-y="true">
				<view class="item" v-for="(item,index) in rank" :key="index">
					<view class="rank">{{index+1}}</view>
					<view class="avatar-wrap">
						<image class="avatar" :src="item.user.avatarurl||$app.getData('AVATAR')" mode="aspectFill"></image>
					</view>
					<view class="content">{{item.user.nickname||$app.getData('NICKNAME')}}<text class="star">{{item.star.name}}</text></view>

					<view class="count">贡献{{item.total}}爱心</view>
				</view>
			</scroll-view>
		</view>
		<!-- Modal -->
		<modalComponent type="center" v-if="modal == 'send'" title="pick" @closeModal="modal=''">
			<view class="send-modal-container">

				<view class="wrap">
					<view class="title">{{active_title}}</view>
					<view class="btn-wrapper">
						<view class="btn flex-set self-input">
							<input class="" :value="sendCount" @input="sendCount = $event.detail.value" type="number" placeholder="自定义爱心数额" />

							<image class="icon" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GXekg3ydLp7sf9ictb8WY4oTXWGicNjJYyLflG8icBdbSLrCdkic3uzLoJGIKkJ1NAM3LleXXQJIS8mQ/0"
							 mode=""></image>
						</view>
						<view class="btn flex-set pick" @tap="sendAixin()">送爱心</view>
					</view>

					<view class="bottom-wrapper"></view>
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
			btnComponent
		},
		data() {
			return {
				modal: '',
				myAixin: 0, // 我的爱心
				list: [],
				sendCount: 0, // 送出多少爱心
				active_id: 0,
				active_title: '',
				rank: [],
				noticeId: 0,
			};
		},
		onLoad() {
			this.loadData()
		},
		onShareAppMessage(e) {
			const shareType = e.target && e.target.dataset.shareid
			return this.$app.commonShareAppMessage(shareType)
		},
		methods: {
			openModal(item) {
				if (item.remain_count <= 0 || item.achieve) return
				this.active_id = item.id
				this.active_title = item.title
				this.sendCount = this.myAixin
				this.modal = 'send'
			},
			// 送爱心
			sendAixin() {
				if (parseInt(this.sendCount) <= 0) {
					this.$app.toast('请输入正确的数值')
					return
				}
				this.modal = ''
				this.$app.request('active/sendAixin', {
					active_id: this.active_id,
					count: parseInt(this.sendCount),
				}, res => {
					this.$app.toast('操作成功', 'success')
					this.loadData()
				}, 'POST', true)

			},
			loadData() {
				this.$app.request('active/laren', {}, res => {
					this.myAixin = res.data.myAixin
					this.list = res.data.list
					this.rank = res.data.rank
					this.noticeId = res.data.noticeId
				})
			}
		}
	}
</script>

<style lang="scss">
	.page-container {
		.bg {
			height: auto;
			position: absolute;
			/* #ifndef H5 */
			z-index: -1;
			/* #endif */
		}

		.top {
			color: #fff;
			position: absolute;
			font-size: 32upx;
			top: 212upx;
			left: 20upx;
			display: flex;
			align-items: center;

			.count {
				color: #fcf141;
				margin-right: 20upx;
			}

			.share {
				font-weight: 700;
				padding: 2upx 30upx;
			}
		}

		.right-btn {
			position: absolute;
			top: 212upx;
			right: 30upx;

			width: 155upx;
			height: 40upx;
		}

		.list-wrap {
			width: 100%;
			padding: 20upx;
			display: flex;
			justify-content: space-between;
			position: absolute;

			.item {
				color: #fff;
				flex: 1;
				text-align: center;
				font-size: 26upx;
				display: flex;
				flex-direction: column;
				align-items: center;

				.block {
					width: 225upx;
					height: 260upx;
					position: relative;

					.badge {
						position: absolute;
						bottom: 10upx;
						right: 0upx;
						padding: 0 10upx;
						border-radius: 20upx;
						border: 2upx solid red;
						color: red;
						background-color: #fff;
						transform: rotate(-30deg);
					}

					.badge.out {
						border: 2upx solid grey;
						color: grey;
					}
				}

				.btn {
					height: 44upx;
					width: 195upx;
				}

				.rank {
					width: 100%;
					padding: 5upx 30upx;
					display: flex;
					align-items: center;
					justify-content: flex-start;

					.num {
						width: 40upx;
					}

					text {
						padding: 0 5upx;
					}



					.avatar {
						width: 40upx;
						height: 40upx;
						border-radius: 50%;
					}
				}

				.rank.red {
					color: #ff5202;
				}
			}
		}

		.list-wrap.l-1 {
			top: 390upx;
		}

		.list-wrap.l-2 {
			top: 828upx;
		}

		.list-wrap.l-3 {
			top: 1547upx;
		}

		.list-wrap.l-4 {
			top: 1672upx;
			display: flex;
			flex-direction: column;

			scroll-view {
				height: 630upx;

				.item {
					font-size: 28upx;
					display: flex;
					flex-direction: row;
					padding: 20upx 0;
					margin: 0 20upx;
					border-bottom: 0.5upx solid #c2c2c2;

					justify-content: space-between;
					align-items: center;

					.content {
						flex: 1;
						height: auto;
						padding: 0;

						.star {
							background: linear-gradient(#ff7e00, #fccd9f);
							color: #fff;
							padding: 0 12rpx;
							border-radius: 12rpx;
							font-size: 20rpx;
							box-shadow: 0 0 1px rgba(0, 0, 0, .3);
							line-height: 34rpx;
							margin: 0 5rpx;
							white-space: nowrap;
						}
					}

					.rank {
						padding: 0;
						width: 60upx;
					}

					.count {
						color: #ffe95b;
						width: 200upx;
						font-weight: 700;
					}

					.avatar-wrap {
						.avatar {
							width: 100upx;
							height: 100upx;
							border-radius: 50%;
						}
					}
				}
			}
		}

		.icon-aixin {
			width: 30upx;
			height: 30upx;
		}

		.send-modal-container {
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			position: relative;
			

			swiper {
				width: 100%;
				height: 100%;
			}
			
			.title {
				text-align: center;
				font-weight: 700;
				margin: 30upx 0;
				font-size: 32upx;
			}
			
			.swiper-item {
				flex: 1;

				.wrap {
					position: relative;
					width: 100%;
				}
			}

			.btn-wrapper {
				display: flex;
				flex-wrap: wrap;
				justify-content: center;

				.btn {
					border-radius: 30upx;
					margin: 50upx 16upx;
					width: 190upx;
					height: 80upx;
					color: $text-color-1;

					image {
						width: 40upx;
						height: 40upx;
					}
				}

				.btn.self-input {
					width: 412upx;
					position: relative;

					input {
						border: 2upx solid $text-color-1;
						// background-color: ￥;
						border-radius: 60upx;
						width: 100%;
						height: 90upx;
						text-align: center;
						line-height: 90upx;
					}

					.icon {
						position: absolute;
						top: 50%;
						transform: translateY(-50%);

						right: 30upx;
					}
				}

				.btn.pick {
					font-size: 34upx;
					font-weight: 700;
					background-color: #f8648a;
					color: #FFF;
				}
			}

			.bottom-wrapper {
				margin: 20upx 60upx;
			}

		}
	}
</style>
