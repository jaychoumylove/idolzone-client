<template>
	<view class="manor-list-container">
		<view class="user-info flex-set">
			<view class="avatar">
				<image src="https://wx.qlogo.cn/mmopen/vi_32/QNxwK0GqTw7MsuqAQA8EaHhtor4EU261v2cTH19eP2YSxRQtmGdU8RvHqDfXTofjP6uu4ZV4HoiaCXkTOwCGsnQ/132" mode="aspectFill"></image>
			</view>
			<view class="nickname text-overflow">姓名</view>
			<view class="week-output">
				<view class="output">产量：1金豆/10秒</view>
				<view>每日可偷：3次</view>
			</view>
		</view>
		
		<view class="list">
			<view class="list-bg flex-set">
				<image src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9HnqQXz07SO8rM1uzBoVhDxvibxEPbs73zlP1tDYtQ14qDEBBfkuEibruNTC56gAdWsDv0tARfGqKiaA/0"></image>
			</view>
			<view class="check-btn">
				<view :class="{active: type == 'all'}" @tap="checkoutType('all')">全部</view>
				<view :class="{active: type == 'yet'}" @tap="checkoutType('yet')">未拥有</view>
			</view>
			
			<scroll-view scroll-y class="scroll-wrapper">
				<block v-for="(item, index) in list" :key='index'>
					<view class="animal-list scroll-item">
						<view class="animal-item" v-for="(value, key) in item" :key='key'>
							<view class="lv">Lv.{{value.lv}}</view>
							<view class="name">{{value.name}}</view>
							<image :src="value.image" mode="aspectFit"></image>
							<view v-if="value.output" class="desc">每10秒/{{value.output}}金豆</view>
							<view v-if="value.steal" class="desc">每日可偷{{value.steal}}次</view>
							<view class="up" @tap="getAnimalInfo(value.id)">
								升级宠物
							</view>
						</view>
					</view>
				</block>
			</scroll-view>
		</view>
		
		<view class="bottom-desc">
			<view class="desc-label">宠物说明:</view>
			<view class="desc-content">
				<view class="p">所有产豆宝宝产量相加为每10秒总产量</view>
				<view class="p">所有偷豆宝宝总次数相加为每日可偷次数</view>
			</view>
		</view>
		
		<!-- 升级 -->
		<modalComponent v-if="modal == 'lvUp'" type="center" title="提示" @closeModal="modal=''">
			<view class="modal-container lvup-modal-container">
				<view class="title">{{animalInfo.animal.name}}</view>
				<image class="bg" :src="animalInfo.animal.image"
					   mode="aspectFit"></image>
				<view class="lv-info">
					<view class="current-lv">
						<view class="lv-number">当前等级：Lv.{{animalInfo.lv.level}}</view>
						<view class="lv-desc">
							<text v-if="animalInfo.lv.output">每10秒/{{animalInfo.lv.output}}金豆</text>
							<text v-if="animalInfo.lv.steal">每日可偷{{animalInfo.lv.steal}}次</text>
						</view>
					</view>
					<view class="middle">
						》》》
					</view>
					<view class="next-lv">
						<view class="lv-number">下一等级：Lv.{{animalInfo.next_lv.level}}</view>
						<view class="lv-desc">
							<text v-if="animalInfo.lv.output">每10秒/{{animalInfo.next_lv.output}}金豆</text>
							<text v-if="animalInfo.lv.steal">每日可偷{{animalInfo.next_lv.steal}}次</text>
						</view>
					</view>
				</view>
				<view class="btn-wrap">
					<btnComponent type="default">
						<view class="btn" @tap="levelUp(animalInfo.animal.id)">{{animalInfo.scrap.name}}X{{animalInfo.next_lv.number}}升级</view>
					</btnComponent>
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
				modal: 'lvUp',
				type: 'all',
				list: []
			};
		},
		onShow() {
			this.getAnimalList(this.type);
		},
		methods: {
			checkoutType(type) {
				if (this.type == type) return;
				this.type = type;
				getAnimalList(type);
			},
			getAnimalList(type) {
				this.list = [];
				this.$app.request(this.$app.API.ANIMAL_LIST, {type}, res => {
					this.list = this.supportNumebrGroup(res.data, 3);
				})
			},
			getAnimalInfo (animal_id) {
				uni.showLoading({
					mask:true,
					title:'请稍后...'
				})
				
				this.$app.request(this.$app.API.ANIMAL_INFO, {animal_id}, res => {
					uni.hideLoading();
					this.animalInfo = res.data;
					this.modal = 'lvUp';
				})
			},
			levelUp(animal_id) {
				uni.showLoading({
					mask:true,
					title:'升级中...'
				})
				
				this.$app.request(this.$app.API.ANIMAL_UP, {animal_id}, res => {
					this.$app.toast('升级成功');
					this.$app.request(this.$app.API.ANIMAL_INFO, {animal_id}, res => {
						this.animalInfo = res.data;
					})
					this.modal = 'lvUp';
				})
			},
			supportNumebrGroup(list, number) {
				if (!list.length) return [];
				let newList = [];
				const length = list.length,
					lineNum = length % number === 0 ? length / number: Math.floor((length / number) + 1);
					
				for (let i = 0; i < lineNum; i ++) {
					let item = list.slice(i*number, i*number + number);
					newList.push(item);
				}
				return newList;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.manor-list-container {
		background-image: url("https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9HnqQXz07SO8rM1uzBoVhDxyrvoy2uibbD5myzWgH4hrQOgAjqiafI0gk1Ha5y5cVxdwKNSnKkL1TSw/0");
		background-position: center center;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		height: 100%;
		width: 100%;
		
		.user-info {
			border-radius: 50rpx;
			width: 400rpx;
			margin: 0 auto;
			flex-direction: column;
			color: #653208;
			.avatar {
				image {
					width: 170rpx;
					height: 170rpx;
					border-radius: 100rpx;
				}
				margin: 20rpx 0;
			}
			.nickname {
				text-align: center;
				max-width: 300rpx;
				margin-bottom: 20rpx;
				// border-bottom: white 1rpx solid;
				font-size: 38rpx;
				font-weight: 650;
			}
			.week-output {
				white-space: nowrap;
				display: flex;
				justify-content: space-around;
				background-color: rgba(white, 0.5);
				border-radius: 50rpx;
				padding: 10rpx 20rpx;
				margin-bottom: 20rpx;
				width: 500rpx;
			}
		}
		
		.list {
			position: relative;
			.list-bg {
				image {
					width: 700rpx;
					height: 900rpx;
				}
			}
			.scroll-wrapper {
				position: absolute;
				transform: translate(-50%,-50%);
				top: 56%;
				left: 50%;
				width: 600rpx;
				height: 650rpx;
				.animal-list {
					display: flex;
					flex-wrap: wrap;
					justify-content: space-around;
					.animal-item {
						width: 170rpx;
						height: 223rpx;
						background-image: url("https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9HnqQXz07SO8rM1uzBoVhDxTF2BC1ibhWdNOMZnQpmYpdjibWvic8Ahiaibib3Eko3ODu6ObWaB2pNUGicPg/0");
						background-position: center center;
						background-repeat: no-repeat;
						background-size: 100% 100%;
						position: relative;
						margin-bottom: 20rpx;
						image {
							position: absolute;
							width: 100rpx;
							height: 100rpx;
							transform: translate(-50%,-50%);
							top: 30%;
							left: 50%;
						}
						.lv {
							position: absolute;
							transform: translate(-50%, -50%);
							left: 10%;
							top: 17%;
							font-size: 24rpx;
							writing-mode: vertical-rl;
						}
						.name {
							position: absolute;
							transform: translate(-50%, -50%);
							left: 10%;
							top: 37%;
							font-size: 20rpx;
						}
						.desc {
							transform: translateX(-50%);
							left: 50%;
							bottom: 28%;
							position: absolute;
							text-align: center;
							font-size: 20rpx;
							color: #653208;
							white-space: nowrap;
						}
						.up {
							font-size: 24rpx;
							transform: translateX(-50%);
							left: 50%;
							bottom: 5%;
							position: absolute;
							text-align: center;
							padding: 5rpx 10rpx;
							background-color: #FDEB40;
							color: #653208;
							white-space: nowrap;
							border-radius: 20rpx;
						}
					}
				}
			}
			.check-btn {
				position: absolute;
				transform: translate(-50%,-50%);
				top: 5%;
				left: 50%;
				width: 500rpx;
				display: flex;
				justify-content: space-around;
				font-size: 34rpx;
				color: #643208;
				.active {
					color: #F2394B;
					border-bottom: 6rpx #F2394B solid;
				}
			}
		}
		
		.bottom-desc {
			display: flex;
			justify-content: center;
			color: #643208;
			font-size: 20rpx;
			margin: 20rpx 0;
			padding-bottom: 10rpx;
			.desc-label {
				margin-right: 10rpx;
			}
			.desc-content {
				.p {
					margin-bottom: 10rpx;
				}
			}
		}
		
		.lvup-modal-container {
			color: #643107;
			.btn {
				font-size: 26rpx;
				font-weight: 500;
				white-space: nowrap;
				padding: 10rpx 20rpx !important;
			}
			.btn-wrap {
				margin: 25rpx 0!important;
				justify-content: space-around!important;
			}
			
			.lv-info {
				display: flex;
				margin: 20rpx 0;
				justify-content: space-around;
				width: 560rpx;
				.current-lv,.next-lv {
					.lv-number {
						font-size: 30rpx;
					}
					.lv-desc {
						font-size: 22rpx;
					}
				}
				.middle {
					align-self: center;
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
	}
</style>
