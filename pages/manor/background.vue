<template>
	<view class="manor-background-container">
		<view class='tab-container'>
			<view class="tab-item" :class="{active:type == 'normal'}" @tap="checkType('normal')">通用背景</view>
			<view class="tab-item" :class="{active:type == 'star'}" @tap="checkType('star')">专属背景</view>
			<view class="tab-item" :class="{active:type == 'active'}" @tap="checkType('active')">限定背景</view>
		</view>
		
		<view class="list-container">
			<view class="item" v-for="(item,index) in list" :key="index">
				<view class="background-img">
					<block v-if="false">
						<view class="small" v-if="left_time.full >= 0">
							<view>距离结束还剩：</view>
							<view>
								<block v-if="left_time.d">
									<text class="text">{{left_time.d}}</text>
									天
								</block>
								<text class="text">{{left_time.h}}</text>
								时
								<text class="text">{{left_time.i}}</text>
								分
								<text class="text">{{left_time.s}}</text>
								秒
							</view>
						</view>
						<view class="small" v-else>
							活动已截止
						</view>
					</block>
					<image class="img" mode="aspectFill" :src="item.url"></image>
				</view>
				<view class="lock-desc">
					{{item.desc}}
				</view>
				<view class="content">
					<btnComponent type="default" v-if='!item.locked'>
						<view class="flex-set" style="width: 160upx;height: 60upx;" @tap="unlockBackground(item, index)">解锁</view>
					</btnComponent>
					<block v-if="item.locked">
						<btnComponent type="default" v-if='!item.used'>
							<view class="flex-set" style="width: 160upx;height: 60upx;" @tap="useBackground(item, index)">使用</view>
						</btnComponent>
						<btnComponent type='disable' v-if='item.used'>
							<view class="flex-set" style="width: 160upx;height: 60upx;">使用中</view>							
						</btnComponent>
					</block>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import modalComponent from '@/components/modalComponent.vue'
	import btnComponent from '@/components/btnComponent.vue'
	export default {
		components: {
			modalComponent,
			btnComponent,
		},
		data() {
			return {
				modal: '',
				type: 'normal',
				left_time: {
					full: 0,
					d: 0,
					h: 0,
					i: 0,
					s: 0,
				},
				left_timer: undefined,
				list:[]
			};
		},
		onShow() {
			this.getBackgroundList(this.type);
		},
		methods: {
			checkType(type) {
				if (this.type == type) return;
				this.type = type;
				this.getBackgroundList(type);
			},
			getBackgroundList(type) {
				this.list = [];
				this.$app.request(this.$app.API.MANOR_BACKGROUND, {type}, res => {
					this.list = res.data;
				})
			},
			unlockBackground(item, index) {
				this.$app.modal(`确认解锁？`, () => {
					const background = item.id;
					uni.showLoading({
						mask:true,
						title:'解锁中...'
					});
					this.$app.request(this.$app.API.MANOR_BACKGROUND_UNLOCK, {background}, res => {
						this.$app.toast('解锁成功', 'success');
						const oldList = this.list;
						oldList[index].locked = true;
						this.list = oldList;
					}, 'POST', true)
				})
			},
			useBackground(item, index) {
				this.$app.modal(`确认使用？`, () => {
					const background = item.id;
					uni.showLoading({
						mask:true,
						title:'使用中...'
					});
					this.$app.request(this.$app.API.MANOR_BACKGROUND_USE, {background}, res => {
						this.$app.toast('使用成功', 'success');
						const oldList = this.list.map(i => {
							if (i.used) {
								i.used = !i.used;
							}
							return i;
						});
						oldList[index].used = true;
						this.list = oldList;
					}, 'POST', true)
				})
			},
			setTimer(endTime) {
				this.left_timer = setInterval(() => {
					const now = Math.round(Date.now() / 1000),
						diff = endTime - now;
					
					if (diff <= 0) {
						console.info(11);
					} else {
						const time = this.$app.timeGethms(diff);
						
						this.left_time = {
							full: endTime,
							d: time.day,
							h: time.hour,
							i: time.min,
							s: time.sec
						}
					}
				}, 1000);
			},
		}
	}
</script>

<style lang="scss" scoped>
	.manor-background-container {
		.tab-container {
			padding: 25upx;
			display: flex;
			align-items: center;
		
			.tab-item {
				border-radius: 32upx;
				padding: 10upx 30upx;
				justify-content: center;
				display: flex;
				font-size: 30upx;
				margin: 0 20upx;
				flex: 1;
				color: #FF7E00;
				border: 1upx solid #FFEAC9;
			}
		
			.tab-item.active {
				background-color: #FFEAC9;
				text-align: center;
				color: #FF9B2E;
			}
		}

		.list-container {
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			.item {
				display: flex;
				flex-direction: column;
				align-items: center;
				text-align: center;
				border-radius: 10upx;
				overflow: hidden;
				margin: 20upx;
				background-color: #FFF;
				box-shadow: 0 2upx 8upx rgba(#000, 0.3);

				.background-img {
					position: relative;
					.img {
						width: 330upx;
						height: 660upx;
					}
					.small {
						position: absolute;
						transform: translateX(-50%);
						bottom: 20upx;
						left: 50%;
						color: #fff;
						background-color: rgba(#000, .8);
						border-radius: 30upx;
						padding: 5upx 20upx;
						font-size: 24upx;
						.text {
							padding: 0 10upx;
							color: yellow;
						}
					}
				}

				.content {
					padding: 10upx;
				}
			}
		}
	}
</style>
