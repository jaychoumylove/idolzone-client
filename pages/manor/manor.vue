<template>
	<view class="manor-container">
		<!-- <view class="background"></view> -->
		<image class='bg' :style="{height: dheight +'px'}" :src='mainBackground'></image>
		<!-- <image class='bg' :style="{height: dheight +'px'}" src='https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GORNqMVibKH3lQqEq8pJ6wOFnhvGIhu9pRxxRicDI5ExhicTJMPSeyhcroKiaYdzicwgSKbsjLcV2Cfqg/0'></image> -->
		<!-- <image class='bg' mode="widthFix" src='https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GORNqMVibKH3lQqEq8pJ6wOFnhvGIhu9pRxxRicDI5ExhicTJMPSeyhcroKiaYdzicwgSKbsjLcV2Cfqg/0'></image> -->
		<!-- <view class="header">
			<view class="left iconfont iconclose"></view>
			<view class="right title" :class="title_class">庄园</view>
		</view> -->
		<view class="user-info">
			<image class="avatar" :src="$app.getData('userInfo').avatarurl || AVATAR" mode="aspectFill"></image>
			<view class="info">
				<view class="nickname text-overflow">{{$app.getData('userInfo').nickname || NICKNAME}}</view>
				<view class="week-output">
					<!-- https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9Fic6VmPQYib2ktqATmSxJmUtLVejGdtb4PKTC5U7sYIsm670AARV24Rg8Abam1NjMoemVcPnSTiaPQA/0 -->
					<!-- https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9Fic6VmPQYib2ktqATmSxJmUtqibsjoz4q50r0xxB6XBXYdcsFzFDw78QynvK8AiagO92tUyrhhCgFk3Q/0 -->
					<view class="left">
						<view class="number">{{userCurrency.coin || 0}}</view>
						<image class="icon" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTERgEQSHS0566j091KHGzhdQNKZpBKHPuWicKkHxXxNdSneZX4JLGn7BqQ/0"
						mode="aspectFill"></image>
					</view>
					<view class="right" @tap="$app.goPage('/pages/manor/panacea_task')">
						<view class="number">{{userCurrency.panacea || 0}}</view>
						<image class="icon" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9Fic6VmPQYib2ktqATmSxJmUtVH7OoNPjuMs2xwl26pXQGbQn74vvibp5mUNuJk7ucxzdXGAd8OlHJDA/0"
						mode="aspectFill"></image>
						<!-- <view class="add flex-set">+</view> -->
						<image class="icon" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9Fic6VmPQYib2ktqATmSxJmUtqibsjoz4q50r0xxB6XBXYdcsFzFDw78QynvK8AiagO92tUyrhhCgFk3Q/0"></image>
					</view>
				</view>
			</view>
		</view>
		
		<view class="right-btn-list">
			<view 
				class="item" 
				v-for="(item, index) in btn" 
				:key="index" 
				v-if="item.path||item.modal"
				:style="{'background-image': 'url('+item.image+')'}"
				@tap="goModelOrPage(item)"
			>
			</view>
		</view>
		
		<view class="main-animal" :class='{"normal-main": mainAnimal.type == "NORMAL", "secret-main": mainAnimal.type == "SECRET"}'>
			<view class="word">{{word||"记得常来看我"}}</view>
			<image class="animal secret" :class="fixAnimalScreen" v-if="mainAnimal.type == 'SECRET'" mode="widthFix" :src="mainAnimal.image"></image>
			<image class="animal normal" v-if="mainAnimal.type == 'NORMAL'" mode="aspectFit" :src="mainAnimal.image"></image>
		</view>
		
		<view class="right-bottom" :class="fixBottom">
			<view class="word" @tap="$app.goPage('/pages/manor/animal_list')">
				<view class="output">
					<view class="info">产量：10秒/{{output}}颗</view>
					<!-- <view class="add flex-set">+</view> -->
					<image class="icon" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9Fic6VmPQYib2ktqATmSxJmUtLVejGdtb4PKTC5U7sYIsm670AARV24Rg8Abam1NjMoemVcPnSTiaPQA/0"></image>
					<!-- <view class="add flex-set">+</view> -->
				</view>
			</view>
			<view class="outputing">
				<progress :percent="addCountProgress" stroke-width="10" activeColor="#ff9f08" border-radius="5" />
				<view class="times">{{addCountTimeNumber}}</view>
			</view>
			<view class="outputleft" @tap="manorOutputSettle">
				<view class="outleft flex-set">{{addCount}}</view>
				<image class="buttom"></image>
			</view>
		</view>
		<!-- <view class="steal-list">
			<view class="title">最新动态</view>
			<view v-if="!stealLog.length" class="flex-set" style="margin-top: 20rpx;">暂无数据～</view>
			<view class="steal-item" v-for="(item, index) in stealLog" :key="index">
				<view class="time">{{item.create_time}}</view>
				<view class="info">
					<view class="left flex-set">
						<image :src="item.user.avatarurl"></image>
					</view>
					<view class="middle">
						<view class="name text-overflow">{{item.user.nickname || NICKNAME}}</view>
						<view class="log">偷走1000金豆</view>
					</view>
					<view class="right flex-set">
						<btnComponent type="default">
							<view class="flex-set right-btn" @tap='steal(item.user.id)'>回偷</view>
						</btnComponent>
					</view>
				</view>
			</view>
		</view> -->
		
		<!-- 召唤宠物 -->
		<modalComponent v-if="modal == 'goCall'" type="center" title="提示" @closeModal="modal=''">
			<view class="modal-container gocall-modal-container">
				<view class="title">召唤宠物</view>
				<view class="title-lable" @tap="getRewardPool">奖池详情</view>
				<image class="bg" :src="callImage|| ''" mode="aspectFit"></image>
				
				<view class="desc flex-set">
					说明：使用灵丹召唤宠物，如果你已经获得过这个宠物，将获得这个宠物的宠物碎片，宠物碎片可用来升级宠物。
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
						<view class="btn" @tap="modal=''">知道了</view>
					</btnComponent>
					<btnComponent type="success">
						<view class="btn" @tap="modal='goCall'">继续召唤</view>
					</btnComponent>
				</view>
			</view>
		</modalComponent>
		
		<!-- 往期鲜花结算 -->
		<modalComponent v-if="modal == 'flowerReward'" type="center" title="提示" @closeModal="modal=''">
			<view class="modal-container flowerreward-modal-container">
				<view class="title">往期鲜花收益</view>
				<image class="bg" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9Fic6VmPQYib2ktqATmSxJmUtVH7OoNPjuMs2xwl26pXQGbQn74vvibp5mUNuJk7ucxzdXGAd8OlHJDA/0"
					   mode="aspectFill"></image>
				<view class="coin-count">恭喜你获得<text style="color: #FC6257;padding: 0 10rpx;">{{panaceaReward}}</text>灵丹</view>
				<view class="flex-set">你可以使用这些灵丹召唤宠物</view>
				<view class="btn-wrap">
					<btnComponent type="default">
						<view class="btn" @tap="modal=''">收下了</view>
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
				title_class: 'title-and',
				modal: '',
				btn: [],
				callBtn: [],
				manor: {},
				rewardPool: [],
				reward: [],
				rewardHasNew: false,
				stealLogPage: {
					page: 1,
					size: 10,
				},
				stealLog: [],
				addCount: 0,// 累计收集数
				output: 0,// 每10秒产量
				stealLeft: 0,
				lotteryLeft: 0,
				addCountTimer: '',
				addCountProgress: 0,
				addCountTimeNumber: 0,
				addCountAuto: false,
				mainAnimal: {},
				callImage: '',
				maxAddCount: 0,
				dheight: 0,
				fixBottom: '',
				panaceaReward: 0,
				userCurrency: {},
				word: "",
				lottery_max: 0,
				fixAnimalScreen: '',
				mainBackground: "https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9EYo3y2NlFPAWCnsfj8xr36WkoItYoGoC20F1N49sXdnmrLwodF6x2icITRfQ4GN999WzPyMmDib7fw/0",
			};
		},
		onLoad(option) {
			if (option.modal) {
				this.modal = option.modal;
			}
		},
		onShow() {
			this.dheight = uni.getSystemInfoSync().windowHeight;
			if (this.dheight < 500) {
				this.fixBottom = 'fix-bottom'
				this.fixAnimalScreen = 'small-screen'
			}
			if (this.dheight > 500 && this.dheight <= 750) {
				this.fixAnimalScreen = 'normal-screen'
			}
			const {manor_animal: {manor_rbtn,lottery: {types,image}}} = this.$app.getData('config');
			this.btn = manor_rbtn;
			this.callImage = image;
			this.callBtn = types;
			this.getManorInfo();
			this.getCurrency();
			// this.getStealLogList();
		},
		onReachBottom() {
			// this.stealLogPage.page ++;
			// this.getStealLogList();
		},
		onUnload() {
			// this.cleanTimer();
		},
		methods: {
			cleanTimer () {
				clearInterval(this.addCountTimer);
				this.addCountTimer = '';
			},
			setTimer() {
				if (this.addCount >= this.maxAddCount) {
					this.addCount = this.maxAddCount;
					this.addCountTimeNumber = 10;
					this.addCountProgress = 100;
					return;
				}
				this.addCountTimeNumber = 1;
				this.addCountProgress = 10;
				this.addCountTimer = setInterval(() => {
					if (this.addCountTimeNumber == 10) {
						if (this.addCount >= this.maxAddCount) {
							this.addCount = this.maxAddCount;
							this.cleanTimer();
						} else {
							this.addCountTimeNumber = 1;
							this.addCountProgress = 10;
							this.addCount += this.output;
						}
						if (this.addCountAuto) {
							this.$app.request(this.$app.API.ANIMAL_OUTPUT, {}, res => {
								this.getManorInfo();
							})
						}
					} else {
						this.addCountTimeNumber += 1;
						this.addCountProgress += 10;
					}
				}, 1000);
			},
			goModelOrPage(item) {
				if (item.hasOwnProperty('path')) {
					this.$app.goPage(item.path);
				}
				if (item.hasOwnProperty('modal')) {
					this.modal = item.modal;
				}
			},
			getManorInfo() {
				this.$app.request(this.$app.API.MANOR_PAGE, {}, res => {
					const {
						manor, 
						output, 
						add_count, 
						auto_count, 
						main_animal, 
						steal_left, 
						lottery_left, 
						limit_time,
						panacea_reward,
						word,
						max_lottery,
						main_background,
					} = res.data;
					this.manor = manor;
					this.output = parseInt(output);
					this.stealLeft = parseInt(steal_left);
					this.addCount = parseInt(add_count);
					this.addCountAuto = auto_count;
					this.mainAnimal = main_animal;
					this.lotteryLeft = lottery_left;
					this.word = word;
					this.lottery_max = max_lottery;
					this.mainBackground = main_background;
					this.maxAddCount = parseInt(output) * parseInt(limit_time);
					if (parseInt(panacea_reward) > 0) {
						this.panaceaReward = parseInt(panacea_reward);
						this.modal = 'flowerReward';
					}
					if (!this.addCountTimer) this.setTimer();
				})
			},
			getCurrency () {
				this.$app.request(this.$app.API.USER_CURRENCY, {}, res => {
					this.userCurrency = res.data;
					this.$app.setData('userCurrency', res.data)
				})
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
			randNumber(min, max) {
				let minInt = Math.ceil(min);
				let maxInt = Math.floor(max);
				return Math.floor(Math.random() * (maxInt - minInt + 1)) + minInt;
			},
			callReward(item) {
				uni.showLoading({
					mask:true,
					title:'召唤中...'
				})
				
				const {type, number} = item;
				
				this.$app.request(this.$app.API.ANIMAL_LOTTERY, {type}, res => {
					this.reward = res.data.list;
					this.rewardHasNew = res.data.has_new;
					this.lotteryLeft = parseInt(this.lotteryLeft) - parseInt(number)
					this.getManorInfo();
					this.getCurrency();
					setTimeout(() => {
						uni.hideLoading();
						this.modal = 'callResult';
					}, 200)
				})
			},
			getStealLogList() {
				this.$app.request(this.$app.API.ANIMAL_STEAL_LOG, this.stealLogPage, res => {
					this.stealLog = this.stealLogPage.page == 1 ? res.data: this.stealLog.concat(res.data);
				})
			},
			steal(user_id) {
				if (!user_id) {
					return this.$app.toast('请选择偷取的人哦！')
				}
				
				uni.showLoading({
					mask:true,
					title:'正在偷取...'
				})
				this.$app.request(this.$app.API.ANIMAL_STEAL, {user_id}, res => {
					this.$app.toast('偷取成功');
				})
			},
			manorOutputSettle() {
				if (this.addCount > 0) {
					uni.showLoading({
						mask:true,
						title:'正在收取...'
					})
					this.$app.request(this.$app.API.ANIMAL_OUTPUT, {}, res => {
						this.$app.toast('收取成功');
						this.getCurrency();
						this.getManorInfo();
					})
				}
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
		}
	}
</script>

<style lang="scss" scoped>
	.manor-container {
		position: relative;
		.background {
			width: 100%;
			height: 1284rpx;
			background-image: url("https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GORNqMVibKH3lQqEq8pJ6wOg2JicOAwYjdt5sjQrbqydPvXRHq98kE39iczYbAtibHPutF1X14FzFLhw/0");
			// background-image: url("https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9EYo3y2NlFPAWCnsfj8xr36xVGzlKdeqOnW4G5JmiavsgjHzgx1jTomDoUxx4KgCickAapmaNt2DerQ/0");
			background-repeat: no-repeat;
			background-position: center center;
			background-size: 100% 100%;
		}
		.bg {
			width: 100%;
			overflow: hidden;
		}
		.add {
			background-color: #FC6257;
			border-radius: 30rpx;
			color: white;
			width: 30rpx;
			height: 30rpx;
		}
		.header {
			position: absolute;
			width: 100%;
			height: 60rpx;
			top: 50rpx;
			padding-left: 50rpx;
			line-height: 60rpx;
			display: flex;
			width: 85%;
			.title {
				display: inline-block;
			}
			.title-and {
				padding-left: 30rpx;
			}
			.title-ios {
				flex: 1;
				text-align: center;
			}
		}
		
		.user-info {
			position: absolute;
			top: 30rpx;
			left: 40rpx;
			display: flex;
			flex-direction: row;
			background-color: rgba(white, 0.5);
			border-radius: 50rpx;

			.avatar {
				width: 100rpx;
				height: 100rpx;
				border-radius: 50rpx;
			}
			.info {
				display: flex;
				flex-direction: column;
				justify-content: center;
				padding: 0 40rpx 0 20rpx;
				.nickname {
					max-width: 300rpx;
					margin-bottom: 5rpx;
					color: #653208;
				}
				.week-output {
					border-top: white 1rpx solid;
					white-space: nowrap;
					display: flex;
					justify-content: space-around;
					.right {
						margin-left: 40rpx;
					}
					.left,.right {
						display: flex;
						justify-content: space-around;
						align-items: center;
						// font-size: 22rpx;
						.icon {
							width: 32upx;
							height: 32upx;
							margin:0 10rpx;
						}
						.number {
							color:#643208;
						}
						.number-label {
							color: #643208;
						}
					}
				}
			}
		}
	
		.right-btn-list {
			position: absolute;
			right: 30rpx;
			top: 90rpx;
			z-index: 1; // 防止被图片挡住
			.item {
				width: 110rpx;
				height: 110rpx;
				font-weight: 500;
				// border-radius: 55rpx;
				// background-color: rgba(white, 0.5);
				// background-image: url("https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9EYo3y2NlFPAWCnsfj8xr36ZVutLiajia46W0EWctVh3v8fib8Vk4AhPWcylNb7gluxvJGWI7Gb6lt0g/0");
				background-repeat: no-repeat;
				background-position: center center;
				background-size: 100% 100%;
				display: flex;
				flex-direction: column;
				justify-content: flex-end;
				align-items: center;
				text-shadow: -4rpx 0 black, 0 4rpx black, 4rpx 0 black, 0 -4rpx black;
				color: white;
				// &:not(:last-of-type) {
				// 	margin-bottom: 20rpx;
				// }
			}
		}
		
		.normal-main {
			transform: translate(-50%, -50%);
			left: 44%;
			top: 60%;
		}
		.secret-main {
			transform: translate(-50%);
			bottom: 170rpx;
			left: 50%;
		}
		.main-animal {
			position: absolute;

			.word {
				width: 260rpx;
				color: #653208;
				height: 80rpx;
				text-align: center;
				background-image: url('https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9EYo3y2NlFPAWCnsfj8xr36oMHsTH5c6R9rEEcUr4ICtc4DbkYSahVc5Y8dbsn2wZWroBzepkThMQ/0');
				background-position: center center;
				background-repeat: no-repeat;
				background-size: 100% 100%;
				padding-top: 15rpx;
				margin: 0 auto;
			}
			
			.animal {
				// width: 400rpx;
				// height: 400rpx;
			}
			.secret {
				width: 850rpx;
			}
			.normal {
				width: 400rpx;
				height: 400rpx;
			}
			
			.normal-screen {
				width: 750rpx!important;
			}
			
			.small-screen {
				width: 650rpx!important;
			}
		}
		
		.right-bottom {
			position: absolute;
			right: 20rpx;
			bottom: 80rpx;
			z-index: 1; // 防止被图片挡住
			.word {
				width: 260rpx;
				height: 80rpx;
				color: #653208;
				text-align: center;
				background-image: url('https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9EYo3y2NlFPAWCnsfj8xr36hRLMglxCbvkDrNW0skG2RIatbFSVlNMLibbPuOzUzDeg2Bz4ibh4ZUkg/0');
				background-position: center center;
				background-repeat: no-repeat;
				background-size: 100% 100%;
				padding-top: 15rpx;
				.output {
					display: flex;
					justify-content: space-around;
					.info {
						font-size: 22rpx;
					}
					.icon {
						width: 32upx;
						height: 32upx;
						margin:0 10rpx;
					}
				}
			}
			.outputing {
				margin: 20rpx auto;
				width: 100rpx;
				position: relative;
				border: 1rpx solid #653208;
				border-radius: 5px;
				.times {
					color: black;
					position: absolute;
					left: 50%;
					transform: translate(-50%, -50%);
					top: 50%;
					font-size: 22rpx;
				}
			}
			.outputleft {
				width: 160rpx;
				margin: 10rpx auto;
				.outleft, .buttom {
					background-position: center center;
					background-repeat: no-repeat;
					background-size: 100% 100%;
					width: 160rpx;
				}
				.outleft {
					background-image: url('https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9EYo3y2NlFPAWCnsfj8xr36iaTEyc8ptBZ9NShb9NmfC2BsI4R3UgXff7oLmK15BibickLuaz1Acl36Q/0');
					height: 80rpx;
					color: white;
				}
				.buttom {
					background-image: url('https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9EYo3y2NlFPAWCnsfj8xr36zicDIwaxZQl2IIsAdqxvJyUs0a1ZVIWnicwfUKRL8lAR9L39SJUicgW9A/0');
					height: 30rpx;
				}
			}
		}
	
		.steal-list {
			position: absolute;
			top: 1100rpx;
			left: 0;
			border-radius: 40rpx;
			background-color: rgba(245,245,245,1);
			width: 100%;
			padding: 20rpx;

			.title {
				font-size: 34rpx;
				font-weight: 650;
				margin-bottom: 20rpx;
				padding-left: 30rpx;
			}
			.steal-item {
				margin-bottom: 20rpx;

				.time {
					font-size: 24rpx;
					padding-left: 20rpx;
					margin-bottom: 20rpx;
				}
				.info {
					background-color: white;
					border-radius: 65rpx;
					height: 130rpx;
					display: flex;
					.left {
						margin: 0 15rpx;
						image {
							width: 100rpx;
							height: 100rpx;
							border-radius: 50rpx;
						}
					}
					.middle {
						display: flex;
						flex-direction: column;
						justify-content: center;

						.name {
							margin-bottom: 10rpx;
							color: #444444;
							max-width: 300rpx;
							font-size: 30rpx;
							font-weight: 500;
						}
						.log {
							color: #7D7D7D;
							font-size: 22rpx;
						}
					}
					.right {
						margin-left: auto;
						margin-right: 20rpx;
						.right-btn {
							padding: 10rpx 30rpx;
						}
					}
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
		
		.flowerreward-modal-container {
			color: #643107;
			.btn-wrap {
				justify-content: space-around;
			}
			.bg {
				width: 150rpx;
				height: 150rpx;
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
	}
</style>
