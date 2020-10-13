<template>
	<view class="manor-background-container">
	
		<view>
			<scroll-view scroll-x="true" class="scroll">
				<view class='tab-container'>
					<view 
						class="tab-item" 
						:class="{active: type == item.value}" 
						@tap="checkType(item.value)" 
						v-for="(item, index) in checkBtn" 
						:key="index"
					>
						{{item.label}}
					</view>
				</view>
			</scroll-view>
		</view>
		
		<view class="list-container">
			<view class="item" v-for="(item,index) in list" :key="index">
				<view class="background-img">
					<block v-if="left_time[index]">
						<view class="small" v-if="left_time[index].full > 0">
							<view class="p">距离结束还剩：</view>
							<view class="p">
								<block v-if="left_time[index].d">
									<text class="text">{{left_time[index].d}}</text>
									天
								</block>
								<text class="text">{{left_time[index].h}}</text>
								时
								<text class="text">{{left_time[index].i}}</text>
								分
								<text class="text">{{left_time[index].s}}</text>
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
					<block v-if="!item.locked">
						<btnComponent :type="item.able_lock ? 'success': 'default'">
							<view class="flex-set" style="width: 140upx;height: 60upx;" @tap="unlockBackground(item, index)">解锁</view>
						</btnComponent>
						<btnComponent type="default" v-if="item.try == 0">
							<view class="flex-set" style="width: 140upx;height: 60upx;" @tap="tryBackground(item, index)">试用</view>
						</btnComponent>
						<btnComponent type="disable" v-if="item.try == 1">
							<view class="flex-set" style="width: 140upx;height: 60upx;">试用中</view>		
						</btnComponent>
					</block>
					<block v-if="item.locked">
						<btnComponent type="default" v-if='!item.used'>
							<view class="flex-set" style="width: 140upx;height: 60upx;" @tap="useBackground(item, index)">使用</view>
						</btnComponent>
						<btnComponent type='disable' v-if='item.used'>
							<view class="flex-set" style="width: 140upx;height: 60upx;">使用中</view>							
						</btnComponent>
					</block>
				</view>
			</view>
		</view>
	
		<!-- 抽奖券解锁	 -->
		<modalComponent v-if="modal == 'unlockLucky'" type="center" title="提示" @closeModal="modal=''">
			<view class="modal-container unlock-modal-container">
				<view class="title">
					提示
				</view>
				<!-- <view class="buttom">
					当前存豆时间
					<text class="desc-red">{{$app.getData('temp').manor_max_output_hours || 8}}小时</text>
				</view> -->
				<view class="middle">
					<image mode="widthFix" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GqEna3Bu4hOUqY2ruicPUKo5M09v5iajLMIlAb5MR4ib0kA9OnkhXodC6M6SmjAjmjj7VcwgUYklmfA/0"></image>
					<view>
						<text class="desc-red">X10</text>
						解锁
					</view>
				</view>
				<!-- <view class="desc flex-set">	
					解锁后存豆时间加：
					<text class="desc-red">{{list[preUnlockIndex].add_hours || 0}}小时</text>
				</view> -->
				<view class="btn-wrap">
					<btnComponent type="default">
						<view class="btn" @tap="cancelUnlock">取消</view>
					</btnComponent>
					<btnComponent type="success">
						<view class="btn" style="color: white;" @tap="unlockBackgroundAction(preUnlockIndex)">确认</view>
					</btnComponent>
				</view>
				
				<!-- <view class="buttom">
					我的幸运抽奖券：{{list[preUnlockIndex].prop_num || 0}}张
				</view> -->
				<view class="buttom">
					解锁后庄园存豆时间为：
					<text class="desc-red">{{($app.getData('temp').manor_max_output_hours || 8)+(list[preUnlockIndex].add_hours || 0)}}小时</text>
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
			btnComponent,
		},
		data() {
			return {
				modal: '',
				type: '',
				left_time: [],
				left_timer: [],
				list:[],
				checkBtn: [],
				preUnlockIndex: null,
			};
		},
		onShow() {
			this.checkBtn = this.$app.getData('config').manor_animal.background_check_btn;
			if (!this.type) this.type = this.checkBtn[0].value;
			this.getBackgroundList(this.type);
		},
		onUnload() {
			this.cleanTimer();
		},
		methods: {
			checkType(type) {
				if (this.type == type) return;
				this.type = type;
				this.getBackgroundList(type);
			},
			getBackgroundList(type) {
				this.list = [];
				this.cleanTimer();
				this.$app.request(this.$app.API.MANOR_BACKGROUND, {type}, res => {
					this.list = res.data;
					this.list.map((item, index) => {
						if (item.end_time) {
							this.setTimer(item.end_time, index);
						}
					});
				})
			},
			unlockBackgroundAction(index) {
				const item = this.list[index];
				const background = item.id;
				uni.showLoading({
					mask:true,
					title:'解锁中...'
				});
				this.$app.request(this.$app.API.MANOR_BACKGROUND_UNLOCK, {background}, res => {
					this.cancelUnlock();
					this.$app.toast('解锁成功', 'success');
					let oldList = this.list;
					oldList[index].locked = true;
					this.list = oldList;
					if (item.lock_data.type == 'locky') {
						let userExt = this.$app.getData('userExt');
						const newLuckyNum = parseInt(userExt.lucky_num) - parseInt(item.lock_data.number);
						userExt.lucky_num = newLuckyNum;
						this.$app.setData('userExt', userExt);
					}
					if (item.add_hours > 0) {
						let temp = this.$app.getData('temp');
						temp.manor_max_output_hours += parseInt(item.add_hours);
						this.$app.setData('temp', temp);
					}
				}, 'POST', true, (res) => {
					uni.hideLoading();
					if (res.msg == '抽奖券不足') {
						this.modal = '';
						this.$app.modal(res.msg, () => {
							this.$app.goPage('/pages/lucky/lucky')
						}, '去获得');
					} else {
						this.$app.toast(res.msg, 'none');
					}
				})
			},
			unlockBackground(item, index) {
				if (item.lock_data.type == 'lucky') {
					this.preUnlockIndex = index;
					return this.modal = 'unlockLucky';
				} else {
					this.$app.modal(`确认解锁？`, () => {
						this.unlockBackgroundAction(index);
					})
				}
			},
			cancelUnlock() {
				this.modal = '';
				this.preUnlockIndex = null;
			},
			tryBackground(item, index) {
				const minute = this.$app.getData('config').manor_animal.background_try_minute;
				this.$app.modal(`只能试用一次\n一次试用${minute}分钟\n确认试用么？`, () => {
					const background = item.id;
					uni.showLoading({
						mask:true,
						title:'请稍后...'
					});
					this.$app.request(this.$app.API.MANOR_BACKGROUND_TRY, {background}, res => {
						this.$app.toast('试用成功', 'success');
						const oldList = this.list.map(i => {
							if (i.try == 1) {
								i.try = -1;
							}
							return i;
						});
						oldList[index].try = 1;
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
			setTimer(endTime, index) {
				this.left_timer[index] = setInterval(() => {
					const now = Math.round(Date.now() / 1000),
						diff = endTime - now;
					if (diff <= 0) {
						this.cleanTimer(index);
					} else {
						const time = this.$app.timeGethms(diff);
						
						this.left_time[index] = {
							full: endTime,
							d: time.day,
							h: time.hour,
							i: time.min,
							s: time.sec
						}
						
						this.$set(this.left_time,index,this.left_time[index])
					}
				}, 1000);
				
				this.$set(this.left_timer,index,this.left_timer[index])
			},
			cleanTimer(index) {
				if (!index) {
					this.left_timer.map(item => {
						clearInterval(item);
					})
					this.left_timer = [];
					this.left_time = [];
				} else {
					clearInterval(index);
					delete this.left_timer[index];
					delete this.left_time[index];
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.manor-background-container {
		.scroll {
			white-space: nowrap;
			width: 100%;
			height: 150rpx;
			padding: 20rpx 15rpx;
			border-bottom: 1rpx solid #eee;
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
					margin: 0 8upx;
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
						.p {
							white-space: nowrap;
						}
					}
				}

				.content {
					display: flex;
					justify-content: space-around;
					width: 100%;
					margin: 10rpx 0;
				}
			}
		}
		
		.modal-container {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-top: -80upx;
			padding: 40upx;
		
			.title {
				font-size: 36upx;
				font-weight: 700;
			}
			
			.title-lable {
				margin-left: auto;
				color: red;
				font-size: 30rpx;
				font-weight: 500;
				border-bottom: red 1rpx solid;
			}
		
			.bg {
				width: 250upx;
				height: 250upx;
			}
		
			.btn {
				padding: 10upx 30upx;
				font-size: 30upx;
				font-weight: 600;
			}
		
			.btn-wrap {
				margin: 10upx 0;
				text-align: center;
				display: flex;
				width: 100%;
				justify-content: space-between;
				padding: 0 20upx;
			}
		}
		
		.unlock-modal-container {
			.btn {
				font-size: 30upx;
				width: 220upx;
				white-space: nowrap;
				color: #643107;
				padding: 10rpx 20rpx !important;
			}
			.buttom {
				color: #643107;
				font-size: 24rpx;
			}
			.middle {
				display: flex;
				font-size: 40rpx;
				font-weight: 650;
				margin: 40rpx;
				view {
					margin-left: 20rpx;
					align-self: center;
				}
				image {
					width: 100rpx;
					height: 100rpx;
				}
			}
			.desc-red {
				color: red;
			}
			.btn-wrap {
				margin: 25rpx 0!important;
			}
			.desc {
				margin: 20rpx;
				padding: 20rpx;
				font-size: 24rpx;
				border: 1rpx #ccc dashed;
				border-radius: 40rpx;
			}
		}
	}
</style>
