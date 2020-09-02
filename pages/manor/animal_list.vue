<template>
	<view class="manor-list-container">
		<view class="user-info flex-set">
			<view class="avatar">
				<image :src="$app.getData('userInfo').avatarurl || AVATAR" mode="aspectFill"></image>
			</view>
			<view class="nickname text-overflow">{{$app.getData('userInfo').nickname || NICKNAME}}</view>
			<view class="week-output">
				<view class="output">产量：{{output}}金豆/10秒</view>
				<!-- <view>每日可偷：{{stealLeft}}次</view> -->
			</view>
		</view>
		
		<view class="list">
			<view class="list-bg flex-set">
				<image src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9HnqQXz07SO8rM1uzBoVhDxvibxEPbs73zlP1tDYtQ14qDEBBfkuEibruNTC56gAdWsDv0tARfGqKiaA/0"></image>
			</view>
			<view class="check-btn">
				<view :class="{active: type == item.type}" @tap="checkoutType(item.type)" v-for="(item, index) in checkBtn" :key="index">{{item.btn_text}}</view>
			</view>
			
			<scroll-view scroll-y class="scroll-wrapper">
				<block v-for="(item, index) in list" :key='index'>
					<radio-group @change="changeMain">
						<view class="animal-list scroll-item">
							<view class="animal-item" v-for="(value, key) in item" :key='key'>
								<block v-if="['secret', 'twelve'].indexOf(type) > -1">
									<label>
										<view class="lv">Lv.{{value.user_animal ? value.user_animal.level: 1}}</view>
										<view class="name">{{value.name}}</view>
										<radio :value="value.id" :checked="value.id == mainAnimalId" class="check" v-if="value.user_animal" /></radio>
										<image :src="value.user_animal ? value.image: value.empty_img" mode="aspectFit"></image>
										<view v-if="value.lv_info.output" class="desc">每10秒/{{value.lv_info.output}}金豆</view>
										<view v-if="value.lv_info.steal" class="desc">每日可偷{{value.lv_info.steal}}次</view>
									</label>
									<view class="up" @tap="getAnimalInfo(value.id)" v-if="value.user_animal">
										升级宠物
									</view>
									<block v-else>
										<view v-if="type== 'twelve'">
											<view class="up" @tap="$app.goPage('/pages/manor/manor?modal=goCall')">
												去召唤
											</view>
										</view>
										<block v-else>
											<view class="up" @tap="unlock(value)" v-if="value.exchanged">
												解锁
											</view>
											<view class="up" @tap="$app.goPage('/pages/lucky/lucky')" v-else>
												去收集
											</view>
										</block>
									</block>
								</block>
								
								<block v-if="type=='all'">
									<label>
										<view class="lv">Lv.{{value.user_animal ? value.user_animal.level: 1}}</view>
										<view class="name">{{value.name}}</view>
										<radio :value="value.id" :checked="value.id == mainAnimalId" class="check" v-if="value.user_animal" /></radio>
										<image :src="value.user_animal ? value.image: value.empty_img" mode="aspectFit"></image>
										<view v-if="value.lv_info.output" class="desc">每10秒/{{value.lv_info.output}}金豆</view>
										<view v-if="value.lv_info.steal" class="desc">每日可偷{{value.lv_info.steal}}次</view>
									</label>
									<view class="up" @tap="getAnimalInfo(value.id)" v-if="value.user_animal">
										升级宠物
									</view>
									<view class="up" @tap="$app.goPage('/pages/manor/manor?modal=goCall')" v-else>
										去召唤
									</view>
								</block>
								<block v-if="type=='yet'">
									<view class="lv">Lv.1</view>
									<view class="name">{{value.name}}</view>
									<image :src="value.empty_img" mode="aspectFit"></image>
									<view v-if="value.lv_info.output" class="desc">每10秒/{{value.lv_info.output}}金豆</view>
									<view v-if="value.lv_info.steal" class="desc">每日可偷{{value.lv_info.steal}}次</view>
									<view class="up" @tap="unlock(value)" v-if="value.exchanged">
										解锁
									</view>
									<view class="up" @tap="$app.goPage('/pages/lucky/lucky')" v-else>
										去收集
									</view>
								</block>
								<block v-if="type=='allready'">
									<label>
										<view class="lv">Lv.{{value.level}}</view>
										<view class="name">{{value.animal.name}}</view>
										<radio :checked="value.animal_id == mainAnimalId" :value="value.animal_id" class="check" /></radio>
										<image :src="value.image" mode="aspectFit"></image>
										<view v-if="value.lv_info.output" class="desc">每10秒/{{value.lv_info.output}}金豆</view>
										<view v-if="value.lv_info.steal" class="desc">每日可偷{{value.lv_info.steal}}次</view>
									</label>
									<view class="up" @tap="getAnimalInfo(value.animal_id)">
										升级宠物
									</view>
								</block>
							</view>
						</view>
					</radio-group>
				</block>
			</scroll-view>
		</view>
		
		<view class="bottom-desc">
			<view class="desc-label">宠物说明:</view>
			<view class="desc-content">
				<view class="p">所有产豆宝宝产量相加为每10秒总产量</view>
				<!-- <view class="p">所有偷豆宝宝总次数相加为每日可偷次数</view> -->
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
						<image src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GF0Ayowf19yN8oiaLKldV6QFz56VoiaPibRyzUqDA5icTvp4017Rk7AGlfMg0knnOicYGUiaAcIUC7ZldQ/0" mode="aspectFit"></image>
					</view>
					<view class="next-lv">
						<block v-if="animalInfo.next_lv">
							<view class="lv-number">下一等级：Lv.{{animalInfo.next_lv.level}}</view>
							<view class="lv-desc">
								<text v-if="animalInfo.lv.output">每10秒/{{animalInfo.next_lv.output}}金豆</text>
								<text v-if="animalInfo.lv.steal">每日可偷{{animalInfo.next_lv.steal}}次</text>
							</view>
						</block>
						
						<view v-if="!animalInfo.next_lv" class="lv-number">已是最高等级</view>
					</view>
				</view>
				<view class="btn-wrap">
					<block v-if="animalInfo.next_lv">
						<btnComponent type="default">
							<view class="btn" @tap="levelUp(animalInfo.animal.id)">{{animalInfo.animal.scrap_name}}X{{animalInfo.next_lv.number}}升级</view>
						</btnComponent>
					</block>
				</view>
				<view class="bottom">
					拥有{{animalInfo.animal.scrap_name}}X{{animalInfo.scrap_num}}
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
				list: [],
				animalInfo: {},
				output: 0,
				addCount: 0,
				stealLeft: 0,
				mainAnimalId: 1,
				checkBtn: [],
			};
		},
		onShow() {
			this.checkBtn = this.$app.getData('config').manor_animal.check_btn;
			if (!this.type) this.type = this.checkBtn[0].type;
			this.getAnimalList(this.type);
		},
		methods: {
			checkoutType(type) {
				if (this.type == type) return;
				this.type = type;
				this.getAnimalList(type);
			},
			getAnimalList(type) {
				this.list = [];
				this.$app.request(this.$app.API.ANIMAL_LIST, {type}, res => {
					const {output, add_count, list, steal_left, main_animal} = res.data;
					this.list = this.supportNumebrGroup(list, 3);
					this.output = output;
					this.addCount = add_count;
					this.stealLeft = steal_left;
					this.mainAnimalId = main_animal;
				})
			},
			unlock (item) {
				this.$app.modal(`确认解锁${item.name}？`, () => {
					uni.showLoading({
						mask:true,
						title:'解锁中...'
					})
					
					this.$app.request(this.$app.API.ANIMAL_UNLOCK, {animal_id: item.id}, res => {
						this.$app.toast('解锁成功', 'success');
						this.getAnimalList(this.type);
					})
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
					this.getAnimalList(this.type);
					this.$app.request(this.$app.API.ANIMAL_INFO, {animal_id}, res => {
						this.animalInfo = res.data;
					})
				})
			},
			changeMain(e) {
				const animal_id = parseInt(e.detail.value);
				this.$app.request(this.$app.API.ANIMAL_CHANGE, {animal_id}, res => {
					this.mainAnimalId = animal_id;
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
							width: 20rpx;
						}
						.check {
							position: absolute;
							transform: translate(-50%, -50%) scale(0.7);
							right: 8%;
							top: 8%;
							width: 20rpx;
							height: 20rpx;
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
					display: flex;
					flex-direction: column;
					justify-content: center;
					.lv-number {
						font-size: 30rpx;
					}
					.lv-desc {
						font-size: 22rpx;
					}
				}
				.middle {
					align-self: center;
					image {
						width: 100rpx;
						height: 60rpx;
					}
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
