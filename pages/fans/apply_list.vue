<template>
	<view class="container">

		<!-- 列表 -->
		<view class="list-container">
			<view class="item" v-for="(item,index) in list" :key="index">

				<view class='avatar-wrap'>
					<image class="avatar" :src="item.user.avatarurl" mode="aspectFill"></image>
				</view>
				<view class="text-container">
					<view class="top">
						{{item.user.nickname}}
						<image class="img-s" :src="`/static/image/user_level/lv${item.user_level}.png`" mode=""></image>
					</view>
				</view>
				<view class="count">
					<btnComponent type="default">
						<view class="flex-set" style="padding: 10upx 40upx;" @tap="join(item.fanclub_id,item.user_id,item.user.nickname)">操作</view>
					</btnComponent>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import listItemComponent from '@/components/listItemComponent.vue';
	import btnComponent from '@/components/btnComponent.vue'
	export default {
		components: {
			listItemComponent,
			btnComponent
		},
		data() {
			return {
				list: [],
			};
		},
		onLoad(option) {
			this.loadData()
		},
		onPullDownRefresh() {
			this.loadData()
		},

		methods: {
			join(fid, uid, nickname) {
				this.$app.modal(`${nickname} 想要加入`, () => {
					this.$app.request('fans/applydeal', {
						fid,
						uid,
						status: 2
					}, res => {
						this.$app.toast('加入成功', 'success')
						setTimeout(() => {
							this.loadData()
						}, 1000)
					}, 'POST', true)
				},'允许', () => {
					this.$app.request('fans/applydeal', {
						fid,
						uid,
						status: -1
					}, res => {
						this.$app.toast('已拒绝', 'success')
						setTimeout(() => {
							this.loadData()
						}, 1000)
					}, 'POST', true)
				},'拒绝')
			},
			loadData() {
				this.$app.request('fans/applylist', {

				}, res => {
					this.list = res.data
					uni.stopPullDownRefresh()
				})
			},
		},
	}
</script>

<style lang="scss" scoped>
	.container {
		.tab-container {
			padding: 20upx 40upx;
			display: flex;
			align-items: center;
			justify-content: space-around;

			.tab-item {
				position: relative;
				margin: 0 20upx;
			}

			.tab-item.active {
				font-size: 30upx;
				font-weight: 700;
			}

			.tab-item.active::before {
				position: absolute;
				content: "";
				height: 8upx;
				width: 50upx;
				border-radius: 14upx;
				bottom: -10upx;
				left: 50%;
				transform: translateX(-50%);
				background-color: $bg-color-2;
			}
		}

		.list-container {

			.item {
				padding: 20upx 40upx;
				display: flex;
				align-items: center;

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
						width: 80upx;
						height: 80upx;
						border-radius: 50%;
					}

					.headwear {
						width: 150%;
						height: 150%;
					}
				}

				.text-container {
					margin: 0 20upx;
					width: 350upx;

					.top {
						display: flex;
						align-items: center;
					}

					.tips {
						font-size: 26upx;
						color: #999;
					}
				}

				.count {

					.btn {
						padding: 15upx 45upx;
					}
				}


			}
		}


	}
</style>
