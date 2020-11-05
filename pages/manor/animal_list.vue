<template>
	<view class="manor-list-container">
		<view class="user-info flex-set">
			<view class="avatar">
				<image :src="$app.getData('userInfo').avatarurl || AVATAR" mode="aspectFill"></image>
			</view>
			<view class="nickname text-overflow">{{$app.getData('userInfo').nickname || NICKNAME}}</view>
			<!-- <text class="iconfont iconinfo"></text>
			<text class="iconfont iconxin"></text>
			<text class="iconfont iconfangdajing"></text>
			<text class="iconfont iconjiantou"></text>
			<text class="iconfont icondui"></text>
			<text class="iconfont icondianzan"></text>
			<text class="iconfont iconclose"></text>
			<text class="iconfont iconshipin"></text>
			<text class="iconfont iconeditor"></text>
			<text class="iconfont iconempty"></text>
			<text class="iconfont iconicon_signal"></text>
			<text class="iconfont iconicon_star"></text>
			<text class="iconfont iconicon_workmore"></text>
			<text class="iconfont .iconicon-test"></text>
			<text class="iconfont iconicon-test1"></text>
			<text class="iconfont iconshare"></text>
			<text class="iconfont iconjinzhi"></text> -->
			<!-- <view class="nickname text-overflow" style="font-size: 28rpx;" @tap="$app.goPage('/pages/manor/log')">
				我的庄园日志
				<text class="iconfont iconjiludanzilishijilu"></text>
			</view> -->
			
			<view class="tab">
				<scroll-view scroll-x="true" class="scroll">
					<view class='tab-container'>
						<view class="tab-item" @tap="$app.goPage('/pages/manor/panacea_task')">获取灵丹</view>
						<view class="tab-item" @tap="modal='goCall'">召唤宠物</view>
						<view class="tab-item" @tap="$app.goPage('/pages/manor/log')">庄园日志</view>
					</view>
				</scroll-view>
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
									<block v-if="['SUPER_SECRET', 'STAR_SECRET'].indexOf(value.type) > -1&&!value.has_secret">
										<view class="model">
											<image mode="aspectFit" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9HMNbdHUu694DBUIbeljCsvwKJa64kv1roib7eLbQYPXkAsg9MDCiaiaak1PmZiaIVXvicZticfPcasO7pw/0"></image>
											<view class="lock-desc">
												<view class="p" v-for="(ite, ind) in animalListModel[value.type]" :key="ind">{{ite}}</view>
											</view>
										</view>
									</block>
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
											<block v-else>
												<view v-if='value.type == "SUPER_SECRET"' class="up" @tap="$app.goPage('/pages/manor/panacea_task')">
													去收集
												</view>
												<view v-else class="up" @tap="$app.goPage('/pages/lucky/lucky')">
													去收集
												</view>
											</block>
										</block>
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
		<!-- 召唤宠物 -->
		<modalComponent v-if="modal == 'goCall'" type="center" title="提示" @closeModal="modal=''">
			<view class="modal-container gocall-modal-container">
				<view class="title" v-if="callType=='goCall'">{{goCall.title}}</view>
				<view class="title" v-if="callType=='goSupple'">{{goSupple.title}}</view>
				<view class="title-lable" @tap="getRewardPool">奖池详情</view>
				<image class="bg" v-if="callType=='goCall'" :src="goCall.image" mode="aspectFit"></image>
				<image class="bg" v-if="callType=='goSupple'" :src="goSupple.image" mode="aspectFit"></image>
				<view class="desc flex-set" v-if="callType=='goCall'">
					{{goCall.desc}}
				</view>
				<view class="desc" v-if="callType=='goSupple'">
					<view class="p" v-for="(ite,ind) in goSupple.desc" :key="ind">{{ite}}</view>
				</view>
				<view class="btn-wrap">
					<btnComponent type="default" v-for="(item, index) in callBtn" :key="index">
						<view class="btn" @tap="callReward(item)">{{item.text}}</view>
					</btnComponent>
				</view>
				
				<view class="buttom">
					今日剩余次数：{{lotteryLeft || 0}}/{{lottery_max}}
				</view>
			</view>
		</modalComponent>
		<!-- 奖池详情 -->
		<modalComponent v-if="modal == 'callPool'" type="center" title="提示" @closeModal="modal='goCall'">
			<view class="modal-container callpoll-modal-container">
				<view class="title">奖池详情</view>
				
				<scroll-view scroll-y class="scroll-wrapper">
					<block v-for="(item, index) in rewardPool" :key='index'>
						<view class="call-list scroll-item">
							<view class="call-item" v-for="(value, key) in item" :key='key'>
								<view class="name">{{value.animal.name}}</view>
								<image :src="value.animal.image" mode="aspectFit"></image>
								<view class="percent">概率：{{value.chance}}%</view>
								<view class="has-scrap">拥有：{{value.scrap_num}}碎片</view>
							</view>
						</view>
					</block>
				</scroll-view>
			</view>
		</modalComponent>
		
		<!-- 召唤结果 -->
		<modalComponent v-if="modal == 'callResult'" type="center" title="提示" @closeModal="modal=''">
			<view class="modal-container callresult-modal-container">
				<view class="title">召唤结果</view>
				
				<view class="result">
					<view class="call-list">
						<view class="call-item" v-for="(item, index) in reward" :key='index'>
							<image :src="item.animal_info.scrap_img" mode="aspectFit"></image>
							<view class="number">X{{item.number}}</view>
						</view>
					</view>
					
					<view class="new-list" v-if="rewardHasNew">
						<view class="new-item" v-for="(item, index) in reward" v-if="item.new" :key='index'>
							<view class="name">{{item.animal_info.name}}</view>
							<image class="position-set" :src="item.animal_info.image" mode="aspectFit"></image>
						</view>
					</view>
				</view>
				
				<view class="btn-wrap">
					<btnComponent type="default">
						<view class="btn" @tap="modal=''">确认</view>
					</btnComponent>
					<btnComponent type="success">
						<view class="btn" @tap="modal='goCall'">继续召唤</view>
					</btnComponent>
				</view>
			</view>
		</modalComponent>
		
		<!-- 升级 -->
		<modalComponent v-if="modal == 'lvUp'" type="center" title="提示" @closeModal="modal=''">
			<view class="modal-container">
				<view class="title">{{animalInfo.animal.type == 'STAR_SECRET' ? animalInfo.animal.use_name: animalInfo.animal.name}}</view>
				<view class="label flex-set">拥有{{animalInfo.animal.scrap_name}}：{{animalInfo.scrap_num}}个</view>
				<view class="super_secret" v-if="animalInfo.animal.type == 'SUPER_SECRET'">
					<image class="bg" :src="animalInfo.animal.use_image" mode="widthFix"></image>
					<scroll-view scroll-y="true" class="scroll">
						<view 
							class="checkBtn" 
							:key="ind" 
							v-for="(ite, ind) in animalInfo.animal.image_group"  
						>
							<block v-if="ite.image.lock">
								<btnComponent type='disable'>
									<view class="lock-desc">
										<view>Lv.{{ite.level}}  </view>
										<image mode="aspectFit" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9HMNbdHUu694DBUIbeljCsvwKJa64kv1roib7eLbQYPXkAsg9MDCiaiaak1PmZiaIVXvicZticfPcasO7pw/0"></image>
									</view>
								</btnComponent>
							</block>
							<block v-if="!ite.image.lock">
								<btnComponent type='success' v-if="ite.image.url == animalInfo.animal.use_image">
									Lv.{{ite.level}}  {{ite.image.name}}
								</btnComponent>
								<btnComponent type='default' v-else @tap="changeSuperImage(ite.level)">
									Lv.{{ite.level}}  {{ite.image.name}}
								</btnComponent>
							</block>
						</view>
					</scroll-view>
				</view>
				<image v-else class="bg" :src="['STAR_SECRET']==animalInfo.animal.type ? animalInfo.animal.use_image: animalInfo.animal.image" mode="widthFix"></image>
				<view class="row">
					<view class="top">
						<view class="left">当前等级 Lv.{{animalInfo.lv.level}}</view>
						<btnComponent type="fangde" v-if="animalInfo.animal.type == 'STAR_SECRET'">
							<view class="right flex-set" @tap="changeImage">
								切换形象
							</view>
						</btnComponent>
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
				scrapNum: 0,
				callBtn: [],
				goSupple: {},
				goCall: {},
				callType: 'goCall',
				lottery_max: 0,
				lotteryLeft: 0,
				rewardHasNew: false,
				reward: [],
				rewardPool: [],
				animalListModel: null
			};
		},
		onLoad(option) {
			if (option.hasOwnProperty('type')) {
				this.type = option.type;
			}
		},
		onShow() {
			const {
				manor_animal: {
					lottery: {
						types,
						go_call,
						go_supple
					},
					check_btn,
					animal_list_model
				},
			} = this.$app.getData('config');
			this.callBtn = types;
			this.goSupple = go_supple;
			this.goCall = go_call;
			this.checkBtn = check_btn;;
			this.animalListModel = animal_list_model;
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
					const {output, add_count, list, steal_left, main_animal,lottery_left, list_support, scrap_num,max_lottery,call_type} = res.data;
					this.list = this.supportNumberGroup(list, list_support);
					this.output = output;
					this.addCount = add_count;
					this.stealLeft = steal_left;
					this.scrapNum = scrap_num;
					this.lotteryLeft = lottery_left;
					this.mainAnimalId = main_animal;
					this.lottery_max = max_lottery;
					this.callType = call_type;
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
			changeImage() {
				this.$app.modal(`确认更换萌宠形象么？`, () => {
					uni.showLoading({
						mask:true,
						title:'更换中...'
					})
					
					this.$app.request(this.$app.API.ANIMAL_CHANGE_IMAGE, {}, res => {
						this.$app.toast('更换成功');
						this.getAnimalList(this.type);
						this.$app.request(this.$app.API.ANIMAL_INFO, {animal_id: this.animalInfo.animal.id}, res => {
							this.animalInfo = res.data;
						})
					})
				})
			},
			changeSuperImage(lv) {
				this.$app.modal(`确认更换灵宠形象么？`, () => {
					uni.showLoading({
						mask:true,
						title:'更换中...'
					})
					
					this.$app.request(this.$app.API.ANIMAL_CHANGE_SUPER_IMAGE, {level: lv}, res => {
						this.$app.toast('更换成功');
						this.getAnimalList(this.type);
						this.$app.request(this.$app.API.ANIMAL_INFO, {animal_id: this.animalInfo.animal.id}, res => {
							this.animalInfo = res.data;
						})
					})
				})
			},
			supportNumberGroup(list, number) {
				if (!list.length) return [];
				let newList = [];
				const length = list.length,
					lineNum = length % number === 0 ? length / number: Math.floor((length / number) + 1);
					
				for (let i = 0; i < lineNum; i ++) {
					let item = list.slice(i*number, i*number + number);
					newList.push(item);
				}
				return newList;
			},
			getRewardPool() {
				uni.showLoading({
					mask:true,
					title:'请稍后...'
				})
				
				this.$app.request(this.$app.API.ANIMAL_LOTTERY_INFO, {}, res => {
					uni.hideLoading();
					this.rewardPool = this.supportNumberGroup(res.data, 3);
					this.modal = 'callPool';
				})
			},
			callReward(item) {
				uni.showLoading({
					mask:true,
					title:'召唤中...'
				})
				
				const {type, times} = item;
				
				this.$app.request(this.$app.API.ANIMAL_LOTTERY, {type}, res => {
					this.reward = res.data.list;
					this.rewardHasNew = res.data.has_new;
					this.lotteryLeft = parseInt(this.lotteryLeft) - parseInt(times)
					setTimeout(() => {
						uni.hideLoading();
						this.modal = 'callResult';
					}, 200)
				})
			},
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
		
		.scroll {
			white-space: nowrap;
			width: 100%;
			height: 110rpx;
			padding: 20rpx 15rpx;
			// border-bottom: 1rpx solid #eee;
			.tab-container {
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
					background-color: #FDEB40;
					color: black;
					box-shadow: 0 2upx 4upx rgba(102, 102, 102, 0.3);
					
					// color: #F2394B;
					// border: 1upx solid white;
				}
		
				// .tab-item.active {
				// 	background-color: #FFEAC9;
				// 	text-align: center;
				// 	color: white;
				// }
			}
		}
		
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
						.model {
							width: 100%;
							height: 100%;
							position: absolute;
							transform: translate(-50%, -50%);
							top: 50%;
							left: 50%;
							/* background-color: rgba(#000,0.1); */
							background-color: rgba(#000000, 0.8);
							color: white;
							z-index: 9;
							border-radius: 30rpx;
							display: flex;
							flex-direction: column;
							image {
								width: 80rpx;
								height: 80rpx;
								top: 20%;
							}
							.lock-desc {
								margin-top: 45%;
								padding: 10rpx 20rpx;
								font-size: 24rpx;
							}
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
		.gocall-modal-container {
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
		.callpoll-modal-container {
			.scroll-wrapper {
				margin-top: 40rpx;
				overflow-y: auto;
				height: 500rpx;
			}
			.call-list {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-around;
				.call-item {
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
						top: 40%;
						left: 50%;
					}
					.name {
						position: absolute;
						transform: translate(-50%, -50%);
						left: 10%;
						top: 20%;
						font-size: 22rpx;
					}
					.percent {
						white-space: nowrap;
						height: 50rpx;
						// background-image: url('https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9EYo3y2NlFPAWCnsfj8xr36Yu6KcWXLNIq5PXPICp52ibWGtAoDqLY6PJ6rX6ARgK1Yso9vc3fndNg/0');
						// background-position: center center;
						// background-repeat: no-repeat;
						// background-size: 100% 100%;
						transform: translateX(-50%);
						left: 50%;
						bottom: 15%;
						position: absolute;
						text-align: center;
						line-height: 50rpx;
						font-size: 24rpx;
						color: #643107;
					}
					.has-scrap {
						white-space: nowrap;
						height: 50rpx;
						// background-image: url('https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9EYo3y2NlFPAWCnsfj8xr36Yu6KcWXLNIq5PXPICp52ibWGtAoDqLY6PJ6rX6ARgK1Yso9vc3fndNg/0');
						// background-position: center center;
						// background-repeat: no-repeat;
						// background-size: 100% 100%;
						transform: translateX(-50%);
						left: 50%;
						bottom: 0%;
						color: #643107;
						position: absolute;
						text-align: center;
						line-height: 50rpx;
						font-size: 20rpx;
					}
				}
			}
		}
		.callresult-modal-container {
			.result {
				background: #F5F5F5;
				border-radius: 30px;
				width: 100%;
				padding: 20rpx;
				margin: 30rpx 0;
			}
			.call-list {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-around;
				.call-item {
					position: relative;
					image {
						width: 100rpx;
						height: 100rpx;
					}
					margin-bottom: 20rpx;
					.number {
						text-align: right;
						font-size: 22rpx;
						color: #FC6258;
					}
				}
				
			}
			.new-list {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-around;
				// margin: 20rpx 0;
				.new-item {
					margin: 10rpx 0;
					width: 150rpx;
					height: 180rpx;
					background-image: url("https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9HnqQXz07SO8rM1uzBoVhDxTF2BC1ibhWdNOMZnQpmYpdjibWvic8Ahiaibib3Eko3ODu6ObWaB2pNUGicPg/0");
					background-position: center center;
					background-repeat: no-repeat;
					background-size: 100% 100%;
					position: relative;
					.name {
						position: absolute;
						transform: translate(-50%, -50%);
						left: 10%;
						top: 20%;
						font-size: 20rpx;
					}
					image {
						width: 130rpx;
						height: 130rpx;
					}
				}
			}
			.btn-wrap {
				justify-content: space-around;
			}
		}
		
		.super_secret {
			display: flex;
			.scroll {
				white-space: nowrap;
				width: 250rpx;
				height: 250rpx;;
				padding: 0 20rpx;
				
				.check-btn {
					margin-bottom: 20rpx;
					height: 60rpx;
					line-height: 60rpx;
					text-align: center;
					background-color: white;
					color: #007AFF;
					font-size: 24rpx;
					white-space: nowrap;
					border-radius: 50rpx;
					box-shadow: 0 2upx 4upx rgba($color: #007AFF, $alpha: 0.3);
					.btn {
						padding: 0;
					}
				}
				.checkBtn {
					margin-bottom: 20rpx;
					height: 60rpx;
					line-height: 60rpx;
					.lock-desc {
						display: flex;
						justify-content: space-between;
						image {
							width: 40rpx;
							height: 40rpx;
							align-self: center;
							margin-left: 20rpx;
						}
					}
				}
				.active {
					background-color: #007AFF !important;
					color: white !important;
					box-shadow: 0 2upx 4upx rgba($color: white, $alpha: 0.3);
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
