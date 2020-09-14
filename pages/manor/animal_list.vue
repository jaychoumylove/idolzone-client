<template>
	<view class="manor-list-container">
		<view class="user-info flex-set">
			<view class="avatar">
				<image :src="$app.getData('userInfo').avatarurl || AVATAR" mode="aspectFill"></image>
			</view>
			<view class="nickname text-overflow">{{$app.getData('userInfo').nickname || NICKNAME}}</view>
			<view class="nickname text-overflow" style="font-size: 28rpx;" @tap="$app.goPage('/pages/manor/log')">
				我的庄园日志
				<!-- <text class="iconfont iconinfo"></text>
				<text class="iconfont iconxin"></text>
				<text class="iconfont iconfangdajing"></text>
				<text class="iconfont iconjiantou"></text>
				<text class="iconfont icondui"></text>
				<text class="iconfont icondianzan"></text>
				<text class="iconfont iconclose"></text>
				<text class="iconfont iconshipin"></text> -->
				<text class="iconfont iconjiludanzilishijilu"></text>
				<!-- <text class="iconfont iconeditor"></text>
				<text class="iconfont iconempty"></text>
				<text class="iconfont iconicon_signal"></text>
				<text class="iconfont iconicon_star"></text>
				<text class="iconfont iconicon_workmore"></text>
				<text class="iconfont .iconicon-test"></text>
				<text class="iconfont iconicon-test1"></text>
				<text class="iconfont iconshare"></text>
				<text class="iconfont iconjinzhi"></text> -->
			</view>
			<view class="week-output">
				<view class="output">产量：{{output}}金豆/10秒</view>
				<view class="scrap-num">幸运碎片：{{scrapNum}}</view>
			</view>
		</view>
		
		<view class="list">
			<view class="list-bg flex-set">
				<image src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9HnqQXz07SO8rM1uzBoVhDxvibxEPbs73zlP1tDYtQ14qDEBBfkuEibruNTC56gAdWsDv0tARfGqKiaA/0"></image>
			</view>
			<view class="check-btn">
				<view 
					:class="{active: type == item.type}" 
					@tap="checkoutType(index)" 
					v-for="(item, index) in checkBtn" 
					:key="index"
				>
					{{item.btn_text}}
				</view>
			</view>
			
			<scroll-view scroll-y class="scroll-wrapper">
				<block v-for="(item, index) in list" :key='index'>
					<radio-group @change="changeMain">
						<view class="animal-list scroll-item">
							<block v-for="(value, key) in item" :key='key'>
								<view class="animal-item" :class="type == 'twelve' ? 'normal-item': type == 'secret' ? 'secret-item': ''">
									<block v-if="['secret', 'twelve'].indexOf(type) > -1">
										<label>
											<view class="scrap-right-num" v-if="type=='secret'">
												已拥有碎片<text class="number">{{value.scrap_num}}</text>
											</view>
											<view class="lv">Lv.{{value.user_animal ? value.user_animal.level: 1}}</view>
											<view class="name">{{value.name}}</view>
											<radio :value="value.id" :checked="value.id == mainAnimalId" class="check" v-if="value.user_animal" /></radio>
											<image :src="value.user_animal ? value.image: value.empty_img" mode="aspectFit"></image>
											<view v-if="value.lv_info.output" class="desc">每10秒/{{value.lv_info.output}}金豆</view>
											<view v-if="value.lv_info.steal" class="desc">每日可偷{{value.lv_info.steal}}次</view>
											<block v-if="type == 'secret'">
												<view class="lv-up-desc">
													需要{{value.scrap_name}}X{{value.need_scrap}}{{value.user_animal ? '升级': '解锁'}}
												</view>
											</block>
										</label>
										<view class="up" :class="{'up-able': value.up_able}" @tap="getAnimalInfo(value.id)" v-if="value.user_animal">
											{{value.up_able ? '可升级': '升级宠物'}}
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
							</block>
						</view>
					</radio-group>
				</block>
			</scroll-view>
		</view>
		
		<view class="bottom-desc">
			<view class="desc-label">宠物说明:</view>
			<view class="desc-content">
				<view class="p">所有产豆宝宝产量相加为每10秒总产量</view>
			</view>
		</view>
		
		<!-- 升级 -->
		<modalComponent v-if="modal == 'lvUp'" type="center" title="提示" @closeModal="modal=''">
			<view class="modal-container">
				<view class="title">{{animalInfo.animal.name}}</view>
				<view class="label flex-set">拥有{{animalInfo.animal.scrap_name}}：{{animalInfo.scrap_num}}个</view>
				<image class="bg" :src="animalInfo.animal.image" mode="widthFix"></image>
				<view class="row">
					<view class="top">
						<view class="left">当前等级 Lv.{{animalInfo.lv.level}}</view>
					</view>
					<view class="desc">
						<text v-if="animalInfo.lv.output">每10秒/{{animalInfo.lv.output}}金豆</text>
						<text v-if="animalInfo.lv.steal">每日可偷{{animalInfo.lv.steal}}次</text>
					</view>
				</view>
				<view class="row" v-if="animalInfo.next_lv">
					<view class="top">
						<view class="left">下一等级 Lv.{{animalInfo.next_lv.level}}</view>
						
						<btnComponent type="fangde">
							<view class="right flex-set" @tap="levelUp(animalInfo.animal.id)">
								{{animalInfo.next_lv.number}}
								<image 
									class="img-s" 
									:src="animalInfo.animal.scrap_img"
								    mode="aspectFill">
								</image>
								升级
							</view>
						</btnComponent>
					</view>
					<view class="desc">
						<text v-if="animalInfo.next_lv.output">每10秒/{{animalInfo.next_lv.output}}金豆</text>
						<text v-if="animalInfo.next_lv.steal">每日可偷{{animalInfo.next_lv.steal}}次</text>
					</view>
				</view>
				<view class="row" v-if="!animalInfo.next_lv">
					<view class="top">
						<view class="left">已是最高等级</view>
					</view>
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
				scrapNum: 0
			};
		},
		onLoad(option) {
			if (option.hasOwnProperty('type')) {
				this.type = option.type;
			}
		},
		onShow() {
			this.checkBtn = this.$app.getData('config').manor_animal.check_btn;
			if (!this.type) this.type = this.checkBtn[0].type;
			this.getAnimalList(this.type);
		},
		methods: {
			checkoutType(index) {
				const item = this.checkBtn[index];
				if (item.hasOwnProperty('path')) {
					return this.$app.goPage(item.path);
				}
				if (this.type == item.type) return;
				this.type = item.type;
				this.getAnimalList(item.type);
			},
			getAnimalList(type) {
				this.list = [];
				this.$app.request(this.$app.API.ANIMAL_LIST, {type}, res => {
					const {output, add_count, list, steal_left, main_animal, list_support, scrap_num} = res.data;
					this.list = this.supportNumebrGroup(list, list_support);
					this.output = output;
					this.addCount = add_count;
					this.stealLeft = steal_left;
					this.scrapNum = scrap_num;
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
				this.$app.modal(`确认升级么？`, () => {
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
				.scrap-num {
					margin-left: 20rpx;
				}
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
					.normal-item {
						width: 170rpx;
						height: 223rpx;
						background-image: url("https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9HnqQXz07SO8rM1uzBoVhDxTF2BC1ibhWdNOMZnQpmYpdjibWvic8Ahiaibib3Eko3ODu6ObWaB2pNUGicPg/0");
						.lv {
							left: 10%;
							top: 17%;
							font-size: 24rpx;
						}
						.name {
							left: 10%;
							top: 37%;
							font-size: 20rpx;
						}
						image {
							width: 100rpx;
							height: 100rpx;
						}
						.check {
							right: 8%;
							top: 8%;
						}
					}
					.secret-item {
						width: 269rpx;
						height: 372rpx;
						background-image: url('https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GORNqMVibKH3lQqEq8pJ6wOvrPyzTlbqnemWicmVqESia578zhTpVmjbiciciaHq5XpxN7BDbdTiaEnFriaA/0');
						.lv {
							left: 7%;
							top: 14%;
							font-size: 28rpx;
						}
						.name {
							width: 28rpx;
							height: 28rpx;
							line-height: 28rpx;
							top: 26%;
							// left: 7%;
							left: 5.5%;
							font-size: 28rpx;
						}
						image {
							width: 200rpx;
							height: 200rpx;
						}
						.check {
							right: 20%;
							top: 5%;
						}
						.scrap-right-num {
							position: absolute;
							transform: translate(-50%, -50%);
							width: 28rpx;
							right: -4%;
							top: 8%;
							font-size: 24rpx;
							height: 24rpx;
							line-height: 24rpx;
							.number {
								padding-top: 10rpx;
								writing-mode: vertical-rl;
								color: #F23A4C;
							}
						}
						.lv-up-desc {
							background-color: rgba(#F23A4C, 0.14);
							transform: translateX(-50%);
							left: 50%;
							bottom: 20%;
							position: absolute;
							text-align: center;
							font-size: 20rpx;
							color: #653208;
							white-space: nowrap;
							width:100%;
							padding: 10rpx 0;
						}
						.desc {
							bottom: 34%!important;
						}
						.up {
							padding: 8rpx 20rpx !important;
						}
					}
					.animal-item {
						background-position: center center;
						background-repeat: no-repeat;
						background-size: 100% 100%;
						position: relative;
						margin-bottom: 20rpx;
						image {
							position: absolute;
							transform: translate(-50%,-50%);
							top: 30%;
							left: 50%;
						}
						.lv {
							position: absolute;
							transform: translate(-50%, -50%);
							writing-mode: vertical-rl;
						}
						.name {
							position: absolute;
							transform: translate(-50%, -50%);
							width: 20rpx;
						}
						.check {
							transform: translate(-50%, -50%) scale(0.7);
							position: absolute;
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
						.up-able {
							background-color: #962de0 !important;
							color: white;
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
				// width: 560rpx;
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
			
			.title {
				font-size: 36upx;
				font-weight: 700;
			}
		
			.tips {
				padding: 20upx;
			}
			.label{
				font-size: 24rpx;
				color: #888;
				margin: 10rpx 0;
			}
		
			.coin-count {
				font-size: 50upx;
				padding-bottom: 20upx;
				margin-top: -20upx;
				font-weight: 700;
				color: $bg-color-2;
			}
		
		
			.btn.s {
				padding: 5upx 20upx;
				font-size: 30upx;
			}
		
			.btn-wrap {
				margin: 10upx 0;
				text-align: center;
				display: flex;
				width: 100%;
				justify-content: space-around;
				padding: 0 20upx;
			}
		
			.desc {
				padding-top: 10upx;
			}
		
			.row {
				width: 100%;
				padding: 10upx 20upx;
		
				.top {
					display: flex;
					justify-content: space-between;
					align-items: center;
					height: 60upx;
		
					.left {
						font-weight: 600;
						border-left: 8upx solid $bg-color-2;
						padding: 0 20upx;
						line-height: 1.2;
					}
		
					.right {
						padding: 5upx 20upx;
					}
				}
			}
		
			.btn-row-wrap {
				position: relative;
		
				.tips-btn {
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
					right: -100upx;
				}
			}
		
			.rate-list-wrap {
				width: 100%;
		
				.item {
					margin: 10upx 0;
					padding: 5upx 10upx;
					padding-left: 20upx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					background-color: #816acd;
					border-radius: 30upx;
					color: #fff;
		
					.right-wrap {
						margin: 5upx 0;
						border-radius: 30upx;
						padding: 5upx 20upx;
						background-color: #e2def2;
						color: #816acd;
					}
		
					.rate-num.in {
						color: orange;
					}
				}
			}
		}
	}
</style>
