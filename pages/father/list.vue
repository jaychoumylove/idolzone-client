<template>
	<view class="container">

		<!-- 列表 -->
		<view class="list-container">
			<view class="item" v-for="(item,index) in list" :key="index">

				<view class='avatar-wrap'>
					<image class="avatar" :src="item.avatarurl || $app.getData('AVATAR')" mode="aspectFill"></image>
					<image v-if="item&&item.headwear&&item.headwear.img" class="headwear position-set" :src="item.headwear.img" mode=""></image>
				</view>
				<view class="text-container">
					<view class="top">
						{{item.nickname || $app.getData('NICKNAME')}}
						<image class="img-s" :src="`/static/image/user_level/lv${item.user_level}.png`" mode=""></image>
					</view>
					<view class="tips">{{item.father_open_msg}}</view>
				</view>
				<view class="count">
					<btnComponent type="default">
						<view class="btn" @tap="baishi(item.id, item.nickname)">拜师</view>
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
			baishi(father_uid, nickname) {
				this.$app.modal(`确定拜${nickname}为师？`, () => {
					this.$app.request('father/baishi', {
						father_uid,
						son_uid: this.$app.getData('userInfo').id
					}, res => {
						this.$app.toast('拜师成功！', 'success')
						setTimeout(() => {
							uni.navigateBack()
						}, 1500)
					}, 'POST', true)
				})
			},
			loadData() {
				this.$app.request('father/fatherList', {

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
