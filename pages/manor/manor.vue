<template>
	<view class="manor-container" :class="{'manor-container-modal-content': modal=='box'}">
		<!-- <view class="background"></view> -->
		<image class='bg' :style="{height: dheight +'px'}" v-if="tryBackground.url" :src='tryBackground.url'></image>
		<image class='bg' :style="{height: dheight +'px'}" v-else :src='mainBackground.url'></image>
		<!-- <image class='bg' :style="{height: dheight +'px'}" src='https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GORNqMVibKH3lQqEq8pJ6wOFnhvGIhu9pRxxRicDI5ExhicTJMPSeyhcroKiaYdzicwgSKbsjLcV2Cfqg/0'></image> -->
		<!-- <image class='bg' mode="widthFix" src='https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GORNqMVibKH3lQqEq8pJ6wOFnhvGIhu9pRxxRicDI5ExhicTJMPSeyhcroKiaYdzicwgSKbsjLcV2Cfqg/0'></image> -->
		<view class="header" :class="fix.header">
			<view class="left iconfont iconjiantou flex-set" @tap='goBack'></view>
			<view class="right title" :class="title_class">庄园</view>
		</view>
		<view class="user-info" :class="fix.userInfo">
			<image class="avatar" :src="$app.getData('userInfo').avatarurl || AVATAR" mode="aspectFill"></image>
			<view class="info">
				<view class="nickname text-overflow" @tap="$app.goPage('/pages/notice/notice?id=65')">
					{{$app.getData('userInfo').nickname || NICKNAME}}
					<text style="padding-left: 20rpx;" class="iconfont iconicon-test1"></text>
				</view>
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
		<view class="try-timer" :class="fix.tryTimer" v-if="tryBackground.url">
			<view>试用：</view>
			<view>
				<text class="text">{{tryTimeDetail.i}}</text>
				分
				<text class="text">{{tryTimeDetail.s}}</text>
				秒
			</view>
		</view>
		
		<view class="right-btn-list" :class="fix.rightList">
			<block v-for="(item, index) in btn" :key="index" v-if="item.path||item.modal">
				<view
					v-if="item.change"
					class="item" 
					:style="{'background-image': 'url('+(callType == 'goSupple' ? item.image_s: item.image)+')'}"
					@tap="goModelOrPage(item)"
				>
				</view>
				<view
					v-else
					class="item"
					:style="{'background-image': 'url('+item.image+')'}"
					@tap="goModelOrPage(item)"
				>
				</view>
			</block>
		</view>
		
		<view class="main-animal" :class='{"normal-main": mainAnimal.type == "NORMAL", "secret-main": mainAnimal.type == "SECRET"}'>
			<view class="word">{{word||"记得常来看我"}}</view>
			<image class="animal secret" :class="fix.mainAnimal" v-if="mainAnimal.type == 'SECRET'" mode="widthFix" :src="mainAnimal.image"></image>
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
						<view class="btn" @tap="$app.goPage('/pages/manor/animal_list')">去升级</view>
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
		
		<!-- 国庆中秋回馈 -->
		<modalComponent v-if="modal == 'nationalReward'" type="center" title="提示" @closeModal="modal=''">
			<view class="modal-container flowerreward-modal-container">
				<view class="title" style="margin-bottom: 40rpx;">国庆中秋回馈</view>
				<!-- <image class="bg" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9Fic6VmPQYib2ktqATmSxJmUtVH7OoNPjuMs2xwl26pXQGbQn74vvibp5mUNuJk7ucxzdXGAd8OlHJDA/0"
					   mode="aspectFill"></image> -->
				<view class="flex-set" v-if="nationalReward.spend_panacea">庄园上线后，你使用了{{nationalReward.spend_panacea}}灵丹</view>
				<view class="coin-count" v-if="nationalReward.panacea">你获得<text style="color: #FC6257;padding: 0 10rpx;">{{nationalReward.panacea}}</text>灵丹回馈礼</view>
				<view class="flex-set" v-if="nationalReward.spend_lucky">庄园上线后，你使用了{{nationalReward.spend_lucky}}幸运碎片</view>
				<view class="coin-count" v-if="nationalReward.lucky">你获得<text style="color: #FC6257;padding: 0 10rpx;">{{nationalReward.lucky}}</text>幸运碎片回馈礼</view>
				<view class="btn-wrap">
					<btnComponent type="default">
						<view class="btn" @tap="modal=''">确认收到</view>
					</btnComponent>
				</view>
			</view>
		</modalComponent>
	
		<!-- 好友列表 -->
		<modalComponent v-if="modal == 'friendList'" headimg="/static/image/icon/lx.png" title="好友" @closeModal="modal=''">
			<view class="invit-modal-container">
				<view class="explain-wrapper">
					<view class="top flex-set">
						<view class="">我的好友</view>
						<btnComponent type="default">
							<button class="btn" open-type="share" :data-share="friendShareId">
								<view class="flex-set" style="width: 140upx; height: 60upx;">添加好友</view>
							</button>
						</btnComponent>
					</view>
				</view>
				<view class="desc flex-set">
					说明：以下列表中的好友可以抽取你宝箱中的宠物碎片
				</view>
				<view class="notice">
					<image class="notice-icon" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GqEna3Bu4hOUqY2ruicPUKoPXtMTFLV2ydAKSiawiapkia2icuuW67SfcBKp3mbQWicrWJb4rJskIWFuhQ/0"></image>
					<view class="notice-info">
						<swiper 
							:indicator-dots="false" 
							:autoplay="true" 
							:interval="3000" 
							:duration="1000" 
							vertical="true"
							touchable="false"
							circular='true'
							disable-touch="true"
						>
							<swiper-item v-for="(item, index) in boxLogList" :key="index">
								<view class="notice-item">
									<image class="notice-avatar" :src="item.user.avatarurl"></image>
									<view class="notice-con">
										{{item.content}}
									</view>
								</view>
							</swiper-item>
							<swiper-item v-if="!boxLogList.length">
								<view class="notice-item">
									<view class="notice-con">
										暂无数据~
									</view>
								</view>
							</swiper-item>
						</swiper>
					</view>
				</view>
				<scroll-view scroll-y class="list-wrapper" @scrolltolower="reachBottomFriends" v-if="friendList.length">
					<view class="item" v-for="(item,index) in friendList" :key="index" @longpress="removeFriend(index)">
						<view class='avatar'>
							<image :src="item.friend.avatarurl" mode="aspectFill"></image>
						</view>
						<view class="text-container">
							<view class="nickname text-overflow">{{item.friend.nickname}}</view>
							<view class="bottom-text">
								<view class="hot-count">产量：每10秒/{{item.manor_output}}金豆</view>
							</view>
						</view>
						<view class="box">
							<view class="scrap" v-if="item.box.scrap_img&&item.box.scrap_name">
								<image mode="widthFix" class="scrap-img" :src="item.box.scrap_img"></image>
								<view>{{item.box.scrap_name}}</view>
							</view>
							<view class="num flex-set" v-if="item.box.number">
								{{item.box.number}}个
							</view>
						</view>
						<view class="btn">
							<btnComponent type="default">
								<view class="flex-set" @tap="goOtherManor(item.friend.id)" style="width: 130upx;height: 65upx;" v-if="manor.day_lottery_box">
									{{manor.day_lottery_box.indexOf(item.friend.id) > -1 ? '已领取': '去拜访'}}
								</view>
								<view class="flex-set" @tap="goOtherManor(item.friend.id)" style="width: 130upx;height: 65upx;" v-else>
									去拜访
								</view>
							</btnComponent>
						</view>
					</view>
				</scroll-view>
				<view v-else class="flex-set list-wrapper">
					您还没有好友哦
				</view>
			</view>
		</modalComponent>
		<modalComponent v-if="modal == 'box'" headimg="/static/image/icon/lx.png" title="宝箱" @closeModal="modal=''">
			<view class="box-container">
				<view class="title">我宝箱内的宠物碎片</view>
				<view class="desc">
					<view class="flex-set">
						说明：仅限好友抽取，24小时后过期消失。
					</view>
				</view>
				<view class="notice">
					<image class="notice-icon" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GqEna3Bu4hOUqY2ruicPUKoPXtMTFLV2ydAKSiawiapkia2icuuW67SfcBKp3mbQWicrWJb4rJskIWFuhQ/0"></image>
					<view class="notice-info">
						<swiper 
							:indicator-dots="false" 
							:autoplay="true" 
							:interval="3000" 
							:duration="1000" 
							vertical="true"
							touchable="false"
							circular='true'
							disable-touch="true"
						>
							<swiper-item v-for="(item, index) in boxLogList" :key="index">
								<view class="notice-item">
									<image class="notice-avatar" :src="item.user.avatarurl"></image>
									<view class="notice-con">
										{{item.content}}
									</view>
								</view>
							</swiper-item>
							<swiper-item v-if="!boxLogList.length">
								<view class="notice-item">
									<view class="notice-con">
										暂无数据~
									</view>
								</view>
							</swiper-item>
						</swiper>
					</view>
				</view>
				<view class="main">
					<image src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FkdUhHPgXyfkQlic4PyAIfcQkbDhgXTicIJrMdPXZfU1icAAVibDjicBw81PCb6iapIREdsgYUwIr0emHg/0" class="main-image position-set"></image>
					<view class="box-position" :class="'position-'+ite.position" v-for="(ite, ind) in boxScrapList" :key="ind">
						<view class="box-scrap">
							<image class="scrap-bg position-set" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FkdUhHPgXyfkQlic4PyAIfce5tqyprFJXAXiaaalhH02TW0SjricBxWWr3KGHQBwpq2NW7GDEd7Arrg/0"></image>
							<image class="scrap-item position-set" :src="ite.scrap_img"></image>
							<view v-if="ite.number > 1" class="scrap-num">X{{ite.number}}</view>
						</view>
					</view>
				</view>
				<view class="bottom">
					<view class="desc">
						召唤灵宠可增加自己宝箱内的宠物碎片。每用灵丹召唤获得10宠物碎片，宝箱额外入账1张同等宠物碎片。额外赠送的宠物碎片24小时后过期消失。
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
				title_class: 'title-ios',
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
				maxAddCount: 0,
				dheight: 0,
				fixBottom: '',
				panaceaReward: 0,
				word: "",
				lottery_max: 0,
				goSupple: {},
				goCall: {},
				callType: 'goCall',
				fix: {
					header: '',
					mainAnimal: '',
					userInfo: '',
					tryTimer: '',
					rightList: '',
					rightBottom: ''
				},
				fixAnimalScreen: '',
				tryBackground: {},
				tryTimer: '',
				tryTimeDetail: {},
				mainBackground: {
					url:"https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9EYo3y2NlFPAWCnsfj8xr36WkoItYoGoC20F1N49sXdnmrLwodF6x2icITRfQ4GN999WzPyMmDib7fw/0",
				},
				boxLogList: [],
				friendList: [],
				friendPager: {
					page: 1,
					size: 10,
				},
				friendShareId: '',
				boxScrapList: [],
				userCurrency: this.$app.getData('userCurrency') || {
					coin: 0,
					panacea: 0
				},
				nationalReward: null
			};
		},
		onLoad(option) {
			if (option.modal) {
				this.modal = option.modal;
			}
		},
		onShareAppMessage(e) {
			const shareType = e.target && e.target.dataset.share;
			return this.$app.commonShareAppMessage(shareType)
		},
		onShow() {
			const system = uni.getSystemInfoSync();
			this.dheight = system.windowHeight;
			if (system.platform == 'ios') {
				this.title_class = 'title-ios';
			}
			if (system.platform == 'android') {
				this.title_class = 'title-and';
			}
			if (this.dheight > 750) {
				this.fix.header = 'fix-header-large';
				this.fix.userInfo = 'fix-user-info-large';
				this.fix.tryTimer = 'fix-try-timer-large';
				this.fix.rightList = 'fix-right-btn-list-large';
			}
			if (this.dheight < 600) {
				this.fix.header = 'fix-header-small';
				this.fix.userInfo = 'fix-user-info-small';
				this.fix.tryTimer = 'fix-try-timer-small';
				this.fix.rightList = 'fix-right-btn-list-small';
				this.fix.rightBottom = 'fix-bottom'
				this.fix.mainAnimal = 'small-screen'
			}
			if (this.dheight >= 600 && this.dheight <= 640) {
				this.fix.header = 'fix-header-640';
				this.fix.userInfo = 'fix-user-info-640';
				this.fix.tryTimer = 'fix-try-timer-640';
				this.fix.rightList = 'fix-right-btn-list-640';
				this.fix.rightBottom = 'fix-bottom'
				this.fix.mainAnimal = 'small-screen'
			}
			if (this.dheight > 640 && this.dheight <= 750) {
				this.fix.mainAnimal = 'normal-screen'
			}
			const {
				manor_animal: {
					manor_rbtn,
					lottery: {
						types,
						go_call,
						go_supple
					},
					friend_share_id
				},
			} = this.$app.getData('config');
			this.btn = manor_rbtn;
			this.callBtn = types;
			this.goSupple = go_supple;
			this.goCall = go_call;
			this.friendShareId = friend_share_id;
			this.getManorInfo();
			this.getCurrency();
			this.getFriends(this.friendPager);
			this.getBoxScrap();
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
			setTryTimer(endTime) {
				clearInterval(this.tryTimer);
				this.tryTimer = setInterval(() => {
					const now = Math.round(Date.now() / 1000),
						diff = endTime - now;
					
					if (diff <= 0) {
						this.cleanTryTimer();
					} else {
						const time = this.$app.timeGethms(diff);
						
						this.tryTimeDetail = {
							full: endTime,
							d: time.day,
							h: time.hour,
							i: time.min,
							s: time.sec
						}
					}
				}, 1000);
			},
			cleanTryTimer() {
				clearInterval(this.tryTimer);
				this.tryTimer = '';
				this.tryBackground = '';
				this.tryTimeDetail = {};
			},
			goBack() {
				const pages = getCurrentPages();
				if (pages.length == 1) {
					uni.reLaunch({
						url:"/pages/index/index"
					})
				} else {
					uni.navigateBack();
				}
			},
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
							// this.$app.toast();
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
						national_reward,
						word,
						max_lottery,
						main_background,
						try_background,
						call_type,
						box_log,
						max_output_hours
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
					this.tryBackground = try_background;
					this.callType = call_type;
					this.boxLogList = box_log;
					if (try_background) {
						this.setTryTimer(try_background.time);
					}
					this.maxAddCount = parseInt(output) * parseInt(limit_time);
					if (parseInt(panacea_reward) > 0) {
						this.panaceaReward = parseInt(panacea_reward);
						// this.modal = 'flowerReward'; // 庄园上线活动已结束
					}
					if (national_reward) {
						this.nationalReward = national_reward;
						this.modal = 'nationalReward';
					}
					if (!this.addCountTimer) this.setTimer();
					let temp = this.$app.getData('temp');
					temp.manor_max_output_hours = max_output_hours;
					this.$app.setData('temp', temp);
				})
			},
			getFriends (pager) {
				this.$app.request("manor/friend_list", pager, res => {
					if (pager.page == 1) {
						this.friendList = res.data;
					} else {
						this.friendList = this.friendList.concat(res.data);
					}
				})
			},
			removeFriend(index) {
				const friend = this.friendList[index].friend;
				this.$app.modal(`确认移除${friend.nickname}么？`, () => {
					this.$delete(this.friendList, index)
					this.$app.toast('已移除');
					this.$app.request('manor/remove_friend', {friend: friend.id}, res => {})
				}, '狠心移除', () => {}, '我再想想');
			},
			getBoxScrap() {
				let data = {};
				if (!this.isSelf) {
					data = {user_id: this.user_id};
				}
				this.$app.request("animal_box/list", data, res => {
					this.boxScrapList = res.data;
				})
			},
			goOtherManor(user_id) {
				if (!user_id) return false;
				uni.navigateTo({
					url:`/pages/manor/other_manor?user=${user_id}`
				})
			},
			reachBottomFriends () {
				this.friendPager.page ++;
				this.getFriends(this.friendPager);
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
					this.getBoxScrap();
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
	.manor-container-modal-content {
		/deep/ .container .content {
			padding-top: unset!important;
		}
	}
	.manor-container {
		position: relative;
		
		// 屏幕兼容 start
		.secret.normal-screen {
			width: 750rpx!important;
		}
		.secret.small-screen {
			width: 650rpx!important;
		}
		.fix-header-small {
			top: 70rpx!important;
		}
		.fix-user-info-small {
			top: 170rpx!important;
		}
		.fix-try-timer-small {
			top: 280rpx!important;
		}
		.fix-right-btn-list-small {
			top: 170rpx!important;
		}
		.fix-header-640 {
			top: 60rpx!important;
		}
		.fix-user-info-640 {
			top: 160rpx!important;
		}
		.fix-try-timer-640 {
			top: 270rpx!important;
		}
		.fix-right-btn-list-640 {
			top: 160rpx!important;
		}
		.fix-header-large {
			top: 90rpx!important;
		}
		.fix-user-info-large {
			top: 190rpx!important;
		}
		.fix-try-timer-large {
			top: 300rpx!important;
		}
		.fix-right-btn-list-large {
			top: 190rpx!important;
		}
		// end
		
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
			padding-left: 30rpx;
			line-height: 60rpx;
			display: flex;
			width: 90%;
			font-size: 32rpx;
			.title {
				display: inline-block;
			}
			.title-and {
				padding-left: 10rpx;
			}
			.title-ios {
				flex: 1;
				text-align: center;
			}
			.left {
				width: 60rpx;
				height: 60rpx;
				transform: rotateY(180deg);
			}
		}
		
		.user-info {
			position: absolute;
			top: 140rpx;
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
					font-weight: 600;
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
		
		.try-timer {
			position: absolute;
			top: 250rpx;
			left: 40rpx;
			color: #fff;
			background-color: rgba(#000, .8);
			border-radius: 30upx;
			padding: 5upx 20upx;
			font-size: 24upx;
			display: flex;
			.text {
				padding: 0 10upx;
				color: yellow;
			}
		}
	
		.right-btn-list {
			position: absolute;
			right: 30rpx;
			top: 140rpx;
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
		
		.invit-modal-container {
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			color: #000;
		
			.explain-wrapper {
				padding: 20upx 40upx;
				padding-top: 0;
		
				.top {
					justify-content: space-between;
		
					font-size: 34upx;
					font-weight: 700;
		
					text {
						color: orange;
					}
				}
		
				.title {
					font-size: 30upx;
					font-weight: 600;
					padding: 10upx;
				}
		
				.bottom {
					font-size: 22upx;
				}
		
				.row.between {
					display: flex;
					justify-content: space-between;
				}
			}
			.desc {
				background:rgba(248,226,207,0.42);
				color:rgba(120,67,16,1);
				font-size: 24rpx;
				padding: 10rpx 20rpx;
				margin: 0 auto;
				border-radius: 20rpx;
			}
		
			.notice {
				margin: 30upx 20upx 0;
				background:rgba(248,226,207,0.57);
				border-radius:19upx;
				display: flex;
				justify-content: flex-start;
				.notice-icon {
					margin:0;
					margin-left: 4%;
					width: 35upx;
					align-self: center;
					height: 35upx;
					border-radius:50%;
				}
				.notice-info {
					margin: 10upx 5%;
					flex: 1;
					display: inline-block;
					overflow: hidden;
					height: 50upx;
					swiper {
						height: 50upx;
					}
					.notice-item {
						display: flex;
						justify-content: flex-start;
						.notice-avatar {
							width: 50upx;
							height: 50upx;
							border-radius:50%;
							margin-right: 10upx;
						}
						.notice-con {
							flex: 1;
							height: 50upx;
							margin-right: 10%;
							display: inline-block;
							font-size:26upx;
							line-height: 50upx;
						}
					}
				}
			}
			.info {
				width: 100%;
				background-color: #f7f7f7;
				display: flex;
				justify-content: space-around;
				padding: 10upx;
				font-size: 26upx;
			}
		
			.list-wrapper {
				overflow-y: auto;
				height: 536upx;
		
				.item {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					padding: 20upx 30upx;
					border-bottom: 1px solid #EEE;
		
					.rank-num {
						width: 90upx;
						text-align: center;
					}
		
					.avatar image {
						width: 90upx;
						height: 90upx;
						border-radius: 50%;
					}
					
					.box {
						width: 140rpx;
						display: flex;
						justify-content: space-between;
						.scrap {
							display: flex;
							flex-direction: column;
							align-items: center;
							.scrap-img {
								width: 40rpx;
							}
							view {
								white-space: nowrap;
								font-size: 20rpx;
							}
						}
						.num {
							white-space: nowrap;
							font-size: 20rpx;
						}
					}
		
					.text-container {
						flex: 1;
						padding: 0 30upx;
						line-height: 44upx;
						
						.nickname {
							max-width: 285rpx;
						}
						.bottom-text {
							display: flex;
							align-items: center;
		
							.hot-count {
								color: $text-color-1;
								margin-right: 4upx;
								font-size: 20rpx;
							}
		
							.icon-heart {
								width: 30upx;
								height: 30upx;
							}
						}
					}
				}
		
			}
		
			.user-list {
				width: 100%;
		
				.user-list-avatar {
					width: 80upx;
					height: 80upx;
					border-radius: 50%;
					margin: 20upx;
				}
			}
		
			.btn-wrap {
				margin-top: 40upx;
				margin-bottom: 40upx;
				display: flex;
				justify-content: space-around;
				width: 100%;
				padding: 0 60upx;
		
				.fsend-btn {
					// background-color: #0EC52F;
					// font-size: 32upx;
					color: #333;
					padding: 0 20upx;
					flex-direction: column;
		
					image {
						width: 80upx;
						height: 80upx;
					}
				}
		
				.save-btn {
					background-color: #FF7E00;
					border-radius: 10upx;
					font-size: 32upx;
					color: #FFF;
					padding: 0 20upx;
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
	
		.box-container {
			background: linear-gradient(0deg, #EFFFEC, #7ACFFF);
			.title {
				text-align: center;
				width: 100%;
				padding-top: 40rpx;
			}
			.desc {
				background:rgba(248,226,207,0.42);
				color:rgba(120,67,16,1);
				font-size: 24rpx;
				padding: 10rpx 20rpx;
				border-radius: 20rpx;
				margin: 20rpx auto;
				width: 90%;
			}
			.notice {
				margin: 20upx;
				background:#fff;
				border-radius:19upx;
				display: flex;
				justify-content: flex-start;
				.notice-icon {
					margin:0;
					margin-left: 4%;
					width: 35upx;
					align-self: center;
					height: 35upx;
					border-radius:50%;
				}
				.notice-info {
					margin: 10upx 5%;
					flex: 1;
					display: inline-block;
					overflow: hidden;
					height: 50upx;
					swiper {
						height: 50upx;
					}
					.notice-item {
						display: flex;
						justify-content: flex-start;
						.notice-avatar {
							width: 50upx;
							height: 50upx;
							border-radius:50%;
							margin-right: 10upx;
						}
						.notice-con {
							flex: 1;
							height: 50upx;
							margin-right: 10%;
							display: inline-block;
							font-size:26upx;
							line-height: 50upx;
						}
					}
				}
			}
			.main {
				width: 100%;
				height: 500rpx;
				position: relative;
				.main-image{
					height: 360rpx;
					width: 460rpx;
				}
				.position-1 {
					left: 150rpx;
					top: 40rpx
				}
				.position-2 {
					left: 120rpx;
					top: 140rpx;
				}
				.position-3 {
					left: 150rpx;
					top: 240rpx;
				}
				.position-4 {
					left: 220rpx;
					top: 340rpx;
				}
				.position-5 {
					left: 320rpx;
					top: 320rpx;
				}
				.position-6 {
					left: 270rpx;
					top: 40rpx;
				}
				.position-7 {
					left: 440rpx;
					top: 340rpx;
				}
				.position-8 {
					left: 460rpx;
					top: 210rpx;
				}
				.position-9 {
					right: 180rpx;
					top: 60rpx;
				}
				.position-10 {
					left: 550rpx;
					top: 270rpx;
				}
				.position-11 {
					left: 550rpx;
					top: 140rpx;
				}
				.position-12 {
					left: 380rpx;
					top: 0rpx;
				}
				.box-position {
					position: absolute;
					.box-scrap {
						position: relative;
						width: 100rpx;
						height: 100rpx;
						.scrap-bg {
							width: 100rpx;
							height: 100rpx;
							z-index: 2;
						}
						.scrap-item {
							z-index: 1;
							width: 80rpx; 
							height: 80rpx;
						}
						.scrap-num {
							position: absolute;
							right: 0;
							bottom: 0;
							z-index: 2;
						}
					}
				}
			}
		
			.bottom {
				padding: 0 40rpx 40rpx;
				.desc {
					background-color: #fff;
					border-radius: 50rpx;
					color: #B5B5B4;
					padding: 20rpx 30rpx;
				}
				.btn {
					padding: unset;
				}
			}
		}
	}
</style>
