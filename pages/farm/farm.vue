<template>
	<view class="farm-page-container">

		<image mode='widthFix' class='bg' src='https://mmbiz.qpic.cn/mmbiz_jpg/w5pLFvdua9G9p0qicKzuicwqfrKLg0Uevia01w2koB8wXZK73y8RXSrwYyJtO8fj1QIqibm3LTpIqyXW5W755aESkw/0'></image>
		<view class='content'>
			<view class='userinfo'>
				<view class='avator'>
					<image class='ftbg' src='https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9G9p0qicKzuicwqfrKLg0UevianIMuvu5NUMXfEOtaXkB4ZSDEc75mgTricW1iaAdMV0FdxlVeic3Kiba85Q/0'></image>
					<image class='npc-icon' src='https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9G9p0qicKzuicwqfrKLg0UeviavX3uA5tQFmLiaUpnG5hbtZ13onTI3ylXUwUEsyxrUtpZOUicJtqhG8rQ/0'></image>
				</view>

				<view class='coin' data-name='aniExchangeModel' data-showname='showExchangeModel'>
					<image class='ftbg' src='https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9G9p0qicKzuicwqfrKLg0UeviaZuwokJeicRWJcog5FgWdqyn5MJgJZ2rsqciaLhHMsEmSDDGnwLfQEs8A/0'></image>
					<image class='coin-icon' src='https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FctOFR9uh4qenFtU5NmMB5uWEQk2MTaRfxdveGhfFhS1G5dUIkwlT5fosfMaW0c9aQKy3mH3XAew/0'></image>
					<view class='coin-add'>
						<view class='coin-add-wrapper' v-if="coinAddShow">+{{coinAddNum}}</view>
					</view>

					<text class="coin-count" :class="[coinAddShow?'scale':'','coin']">{{userCurrency.coin}}</text>
				</view>
				<view class='diamond' data-name='aniDiamondModel' data-showname='showDiamondModel'>
					<image class='ftbg' src='https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9G9p0qicKzuicwqfrKLg0UeviaSr8crhahL6zibWPHMnUC4x7aq0mlD58OlufolnPAUOcjld2NfyTVj5g/0'></image>
					<image class='diamond-icon' src='https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTERibO7VvqicUHiaSaSa5xyRcvuiaOibBLgTdh8Mh4csFEWRCbz3VIQw1VKMCQ/0'></image>
					<text>{{userCurrency.stone}}</text>
				</view>
			</view>

			<view class='farmerhouse' @tap='getSkill(5)'>
				<image class='house' :src="farm.house_img || primary_house_img"></image>
				<image class='up-icon house' v-if="farm.house_level<5" src='https://mmbiz.qpic.cn/mmbiz_gif/w5pLFvdua9EqVxh70XuVn1VhJLyPnEbxbemFNAA89E03EbTcPAT3Q9m8ERr6sZRGtDpJ1uKPDV2JG0jLXricW2w/0'></image>
			</view>

			<view class='speed'>
				<image src='https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FctOFR9uh4qenFtU5NmMB5uWEQk2MTaRfxdveGhfFhS1G5dUIkwlT5fosfMaW0c9aQKy3mH3XAew/0'></image>
				<text>{{farm.total_speed_coin?farm.total_speed_coin:0}}枚/<text class='small'>100秒</text></text>
			</view>
			<!-- <view class='settleCounter'>
				<text>{{settleTime}}</text>
			</view> -->
			<!-- 地 -->
			<view class='ground'>
				<image class="bg-img" src='https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9HwicF1tVq5W0eW4Ow73MEzIs07zJtcFgxsk7YefgibS2BcfUdh2nmVn87ib5kgKfEkT3UDexOxSX0dQ/0'></image>
				<image class='up-icon land1' v-if="farm.land_1_level<22" @tap='farm.tree_1_level==15?getSkill(8):getSkill(6)' src='https://mmbiz.qpic.cn/mmbiz_gif/w5pLFvdua9EqVxh70XuVn1VhJLyPnEbxbemFNAA89E03EbTcPAT3Q9m8ERr6sZRGtDpJ1uKPDV2JG0jLXricW2w/0'></image>
				<image class='up-icon land2' v-if="farm.land_2_level<22" @tap='farm.tree_2_level==15?getSkill(9):getSkill(7)' src='https://mmbiz.qpic.cn/mmbiz_gif/w5pLFvdua9EqVxh70XuVn1VhJLyPnEbxbemFNAA89E03EbTcPAT3Q9m8ERr6sZRGtDpJ1uKPDV2JG0jLXricW2w/0'></image>
				<view class='lands'>
					<image class='land ld1 img' :src="farm.land_1_img || primary_land1_img"></image>
					<image class='land ld2 img' :src="farm.land_2_img || primary_land2_img"></image>
				</view>
				<view class='sprites'>
					<image mode='aspectFit img' @tap='farm.tree_1_level==15?getSkill(8):getSkill(6)' class='sprite sp1' :src="farm.tree_1_img || primary_tree1_img"></image>
					<image mode='aspectFit img' @tap='farm.tree_2_level==15?getSkill(9):getSkill(7)' class='sprite sp2' :src="farm.tree_2_img || primary_tree2_img"></image>
				</view>
			</view>
			
			<!-- 用户铭牌 -->
			<view class='jackstraw'>
				<image class='uname' src='https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9Gicuwj2icibianoEKQBGibZIic45e1qO0BV6XgibeLhyfuTHSMQYw61cgKmNOzj13OCOlKXe2YgdPZfUuUA/0'></image>
				<view class='welcome'>
					<block v-if="$app.getData('userInfo').nickname">
						<view class='nickname'>{{$app.getData('userInfo').nickname}}</view>'S
					</block>
					<view>FARM</view>
				</view>
			</view>

			<!-- 狗 -->
			<image v-if="skillOneRemainTime=='领取钻石'" class='dog' @tap="skillShow=!skillShow" src='https://tva1.sinaimg.cn/large/007X8olVly1g8ua8c4dp9g307007ct8v.gif'></image>
			<image v-else class='dog' @tap="skillShow=!skillShow" src='https://tva1.sinaimg.cn/large/007X8olVly1g8u9po94z0g307007cmx9.gif'></image>

			<view class="mask-wrap" v-if="skillShow" @tap="skillShow=!skillShow"></view>
			<!-- 狗的技能 -->
			<view class="side-wrap right-wrap" @tap="skillShow=!skillShow" :class="{show:skillShow}">
				<!-- 挖钻石 -->
				<view class="btn-wrap one" @tap="getSkill(1);modal='skill'">
					<image class="icon" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FctOFR9uh4qenFtU5NmMB5TVlulTu5ROdmlibyyeWB6Glia2ALG8BehAN9PGJEbbIhJS46YiaVQSGaA/0"
					 mode="aspectFill"></image>
					<view class="text">{{skillOneRemainTime}}</view>
				</view>
				<!-- 挖金豆 -->
				<view class="btn-wrap two" @tap="getSkill(2);modal='skill'">
					<image class="icon" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FctOFR9uh4qenFtU5NmMB5GusQpnkq1bE2iamkm82iaIIvd4ncT5VsECpf0GJtNjwLroialSKMv5ibdw/0"
					 mode="aspectFill"></image>
					<view class="text">挖金豆{{skillTwoRemainCount||0}}次</view>
				</view>
				<view class="btn-wrap three" @tap="getSkill(3);modal='skill'">
					<image class="icon" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FctOFR9uh4qenFtU5NmMB5IlJwmZhzhgbSnnXLhPHmZFBFDzibYRYqI8CuTgictRDnBB7QqYvVjyIw/0"
					 mode="aspectFill"></image>
					<view class="text">离线收益</view>
				</view>
				<view class="btn-wrap four">
					<image class="icon" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FctOFR9uh4qenFtU5NmMB5yCU7TO4mjsUPicBSYlc9EXE49FuArcD6iaQKOfRmjWF0ibxK9elIaQjCw/0"
					 mode="aspectFill"></image>
					<view class="text">敬请期待</view>
				</view>
			</view>

			<!-- 左侧fix按钮 -->
			<image class='charge-btn help-btn' src='https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9Gicuwj2icibianoEKQBGibZIic45O9VISGePLn218y3vGBpeopmcRsia3Wicjib3Qnib7rAz7YL4ozyduPduUg/0' @tap="$app.goPage('/pages/notice/notice?id=2')"></image>
			<image class='charge-btn help-btn btn3' src='https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9HwicF1tVq5W0eW4Ow73MEzIwbLFt1AHBiawQgPt2ficIOq9bic15hMylyQDAsczJicArnyxyfaec1wMtQ/0'
			 @tap='speedModal'></image>
			<view class="speed-content">农场加速</view>

		</view>

		<!-- modal -->
		<!-- 技能modal -->
		<modalComponent v-if="modal == 'skill'" type="center" title="提示" @closeModal="modal=''">
			<view class="modal-container">
				<view class="title" v-if="skillType==1">挖钻石</view>
				<view class="title" v-if="skillType==2">养家糊口</view>
				<view class="title" v-if="skillType==3">精心护理</view>

				<!-- 挖钻石 -->
				<image v-if="skillType==1" class="bg" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9HUWa4ibYRGeP9Kkz6Vd4icsiaYhw3c8VbuhCrUW0xLiaGRyeV7Dle0ZuLN9LW0hh47BQiaDr4icqf361Yg/0"
				 mode="aspectFill"></image>
				<!-- 离线收益 -->
				<image v-if="skillType==3" class="bg" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9F3NAxlopF2oyvfuiaEjgJIt5WfJDfUDFicqFqjs0GGoK5icRRflIj1oU27Ad4HrpQP3TutO28z1brGg/0"
				 mode="aspectFill"></image>
				<!-- 房子 -->
				<image v-if="skillType==5" class="bg" :src="farm.house_img" mode="widthFix"></image><!-- 房子 -->
				<!-- 树1 -->
				<image v-if="skillType==6" class="bg" :src="farm.tree_1_img" mode="widthFix"></image>
				<!-- 树2 -->
				<image v-if="skillType==7" class="bg" :src="farm.tree_2_img || primary_tree2_img" mode="widthFix"></image><!-- 树1 -->
				<!-- 地1 -->
				<image v-if="skillType==8" class="bg" :src="farm.land_1_img" mode="widthFix"></image>
				<!-- 地2 -->
				<image v-if="skillType==9" class="bg" :src="farm.land_2_img" mode="widthFix"></image>

				<!-- 主动技能 -->
				<!-- 挖钻石 -->
				<view class="btn-row-wrap" v-if="skillType == 1">
					<btnComponent type="fangde">
						<view class="btn center" v-if="skillOneRemainTime=='领取钻石'" @tap="skillSettle">领取钻石</view>
						<view class="btn center" v-else>还剩{{skillOneRemainTime}}</view>
					</btnComponent>
				</view>
				<!-- 搞金豆 -->
				<block v-if="skillType == 2">
					<view class="skill2-count flex-set">基础值:<text style="color:#fec300;">{{baseCoinCount}}</text>
						<image class="img-s" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9FctOFR9uh4qenFtU5NmMB5uWEQk2MTaRfxdveGhfFhS1G5dUIkwlT5fosfMaW0c9aQKy3mH3XAew/0"
						 mode=""></image>
					</view>
					<view class="btn-wrap">
						<btnComponent type="fangde">
							<view class="btn center" @tap="skillSettle">搞点金豆</view>
						</btnComponent>
						<btnComponent type="fangde">
							<view class="btn scenter" @tap="skill2Current=!skill2Current">{{skill2Current?'升级技能':'爆豆概率'}}</view>
						</btnComponent>
					</view>
					<view>今天还可使用{{skillTwoRemainCount}}({{skillTwoRemainOffset}})次</view>

				</block>
				<!-- 挖金豆爆率 -->
				<view v-if="skillType==2&&skill2Current" class="rate-list-wrap">
					<view style="text-align: center;margin-top: 40upx;">每次爆豆可获得倍数的概率</view>
					<view class="item" v-for="(item,index) in rateList" :key="index">
						<view class="left-wrap">{{item.rate}}倍：<text class="rate-num" :class="[item.change]">{{item.chance}}%</text>概率获得</view>
						<!-- <view class="right-wrap" v-if="item.stone" @tap="increaseRate(item)">提升概率</view> -->
					</view>
				</view>
				<block v-else>
					<view class="row">
						<view class="top">
							<view class="left">当前等级 Lv.{{skillInfo&&skillInfo.myskill&&skillInfo.myskill.level?skillInfo.myskill.level:0}} {{skillInfo.nextskill===null?'(最高等级)':''}}</view>
							<view class="right"></view>
						</view>
						<view class="desc" v-if="skillInfo&&skillInfo.myskill">{{skillInfo.myskill.desc}}</view>
					</view>
					<view class="row" v-if="skillInfo&&skillInfo.nextskill">
						<view class="top">
							<view class="left">下一等级 Lv.{{skillInfo.nextskill.level}}</view>
							<btnComponent type="fangde">
								<view class="right flex-set" @tap="upgrade()">升级<image class="img-s" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTERibO7VvqicUHiaSaSa5xyRcvuiaOibBLgTdh8Mh4csFEWRCbz3VIQw1VKMCQ/0"
									 mode="aspectFill"></image>{{skillInfo.nextskill.stone}}</view>
							</btnComponent>
						</view>
						<view class="desc">{{skillInfo.nextskill.desc}}</view>
					</view>
				</block>
			</view>

		</modalComponent>

		<!-- 离线收益 -->
		<modalComponent v-if="modal == 'offline'" type="center" title="提示" @closeModal="modal=''">
			<view class="modal-container offline-modal-container">
				<view class="title">收益到账</view>
				<view style="font-size: 24upx;color:#888;">({{(offlinePercent/0.2).toFixed(2)}}倍离线收益)</view>
				<image class="bg" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9HUWa4ibYRGeP9Kkz6Vd4icsiaYpD3ibbGnqhb5tK3xEm7q35pVl5QibibGUtaGkmtvzA5zRlb0Re6VtNvg/0"
				 mode="aspectFill"></image>
				<view class="coin-count">+{{coinAddNum}}</view>
				<view class="btn-wrap">
					<btnComponent type="default">
						<view class="btn" @tap="modal=''">我知道了</view>
					</btnComponent>

					<btnComponent type="success">
						<view class="btn" @tap="getSkill(3)">去升级</view>
					</btnComponent>
				</view>
			</view>
		</modalComponent>

		<modalComponent v-if="modal == 'speed'" type="center" title="提示" @closeModal="modal=''">
			<view class="modal-container speed-modal">
				<view class="title">农场加速</view>

				<view class="tips">
					每天可以让自己的农场加速200秒。
					好友助力可提升5倍产量，最多40倍。
					可助力他人5次，每次可获得1000金豆。
				</view>
				<view class="list-wrap">
					<view class="item" v-for="(item,index) in helperList" :key="index">
						<image class='inner' :src="item.helper.avatarurl||$app.AVATAR"></image>
						<view class="list-nickname text-overflow">{{item.helper.nickname||'神秘粉丝'}}</view>
					</view>
					<view class="item" v-for="(item,index) in 8-helperList.length" :key="index">
						<button class="inner flex-set" open-type="share" data-share="10">+</button>
						<view class="list-nickname text-overflow"></view>
					</view>
				</view>
				<view class="btn-wrap">
					<button open-type="share" data-share="10">
						<btnComponent type="fangde">
							<view class="btn">召唤好友加速</view>
						</btnComponent>
					</button>
					
					<btnComponent type="fangde">
						<view class="btn" @tap="helpstart">立即加速</view>
					</btnComponent>
				</view>
			</view>
		</modalComponent>
	</view>
</template>

<script>
	import modalComponent from '@/components/modalComponent.vue'
	import btnComponent from '@/components/btnComponent.vue'
	import listItemComponent from '@/components/listItemComponent.vue'
	export default {
		components: {
			modalComponent,
			btnComponent,
			listItemComponent
		},
		data() {
			return {
				userCurrency: {},
				modal: '',

				farm: {}, // 
				skillInfo: {},
				skillType: '',

				coinAddNum: 0,
				coinAddShow: false,
				settleTime: 100,

				skillShow: false,

				skillOneRemainTime: '', // 挖钻石的倒计时显示

				skillTwoRemainCount: 0, // 搞点金豆剩余使用次数 
				baseCoinCount: 0, // 基础暴击金豆数额
				rateList: [], // 暴击概率列表
				skill2Current: false, // 切换
				skillTwoRemainOffset: 0, // 还可用钻石增加次数

				skillThreePercent: '', // 离线增强百分数

				helperList: [],
				offlinePercent: '',
				primary_house_img:'https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9Gicuwj2icibianoEKQBGibZIic45awPD7e5IuDzoBoks0fLjVdwsUXliamwQDb6M1kHbtja6I7ogz2p2AQA/0',
				primary_land1_img:'https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9Gicuwj2icibianoEKQBGibZIic45DbvLwianQO7amMCrjEoPbyZyQX1HD3getqlCaqElzFV0Xianf5XufuoQ/0',
				primary_land2_img:'https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9Gicuwj2icibianoEKQBGibZIic45DbvLwianQO7amMCrjEoPbyZyQX1HD3getqlCaqElzFV0Xianf5XufuoQ/0',
				primary_tree1_img: 'https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9Gicuwj2icibianoEKQBGibZIic45ibdoeICBZgic5qIAmx5VTA9amISbmU2KIrFaaVd4EIgnmQ7h4HL8uXMg/0',
				primary_tree2_img:'https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9Gicuwj2icibianoEKQBGibZIic45NwbKYxUZT69EbL1ic7EU8JF6Y184rhuzuKLCibHKyzOouqa74DX834YA/0',
			};
		},
		onShareAppMessage(e) {
			const shareType = e.target && e.target.dataset.share
			return this.$app.commonShareAppMessage(shareType)
		},
		onLoad() {
			this.initInterval()
		},
		onShow() {
			this.getSpriteInfo()
			this.userCurrency = this.$app.getData('userCurrency')
		},
		methods: {
			increaseRate(item) {
				this.$app.modal(`爆豆${item.rate}倍目前概率${item.chance}%\n是否使用${item.stone}钻石提高1%的概率`, () => {
					this.$app.request('sprite/skill2rateIncrease', {
						rate: item.rate,
						stone: item.stone,
					}, res => {
						this.$app.toast('提升成功')
						this.rateList = res.data
					}, 'POST', true)
				})
			},
			helpstart() {
				this.$app.request('sprite/helpstart', {}, res => {
					this.$app.toast('加速成功，金豆+' + res.data)
					this.modal = ''
				}, 'POST', true)
			},
			speedModal() {
				this.modal = 'speed'
				this.$app.request('sprite/helplist', {}, res => {
					this.helperList = res.data
				})
			},
			// 技能结算
			skillSettle() {
				const func = function() {
					this.$app.request('sprite/skill_settle', {
						type: this.skillType
					}, res => {
						this.$app.modal(res.data.msg);
						this.getSkill(this.skillType)
						this.$app.request(this.$app.API.USER_CURRENCY, {}, res => {
							this.$app.setData('userCurrency', res.data)
							this.userCurrency = this.$app.getData('userCurrency')
						})
					}, 'POST', true)
				}.bind(this)

				if (this.skillType == 2) {
					if (this.skillTwoRemainCount > 0) {
						this.$app.modal('金豆需要全投给爱豆', () => func())
					} else {
						if (this.skillTwoRemainOffset > 0) {
							this.$app.modal('金豆需要全投给爱豆\n并且现在需要使用1钻石', () => func())
						} else {
							this.$app.toast(`今日使用次数已用完，请明日再来`)
						}
					}
				} else {
					func()
				}
			},
			// 技能信息
			getSkill(type) {
				this.skillType = type
				this.$app.request(this.$app.API.SPRITE_SKILL, {
					type
				}, res => {
					this.skillInfo = res.data
					this.modal = "skill"

					if (type == 1) {
						// 挖钻石
						this.initSkillOne(res.data.remainTime)
					} else if (type == 2) {
						// 挖金豆
						this.skillTwoRemainCount = res.data.remainTimes
						this.baseCoinCount = res.data.baseCount
						this.rateList = res.data.rate
						this.skillTwoRemainOffset = res.data.remainOffset
					} else if (type == 3) {
						// 离线金豆
						this.skillThreePercent = res.data.myskill.percent
					}
				})
			},

			// 挖钻石倒计时
			initSkillOne(remainTime) {
				clearInterval(this.skillOneTimeId)
				if (remainTime === true) {
					this.skillOneRemainTime = '领取钻石'
				} else {
					let time = this.$app.timeGethms(remainTime)
					this.skillOneRemainTime = `${time.hour}:${time.min}:${time.sec}`
					this.skillOneTimeId = setInterval(() => {
						let time = this.$app.timeGethms(--remainTime)
						this.skillOneRemainTime = `${time.hour}:${time.min}:${time.sec}`

						if (remainTime <= 0) {
							clearInterval(this.skillOneTimeId)
							this.skillOneRemainTime = '领取钻石'
						}
					}, 1000)
				}
			},
			// 升级 0农场本体 1挖钻石 2挖金豆 
			upgrade() {
				this.$app.request(this.$app.API.SPRITE_UPGRAGE, {
					type: this.skillType
				}, res => {
					this.$app.request(this.$app.API.USER_CURRENCY, {}, res => {
						this.$app.setData('userCurrency', res.data)
						this.userCurrency = this.$app.getData('userCurrency')
					})
					this.getSpriteInfo()
					if (this.skillType != 0) {
						this.getSkill(this.skillType)
					}
					this.$app.toast('升级成功', 'success')
				}, 'POST', true)
			},
			// 金豆收益定时器
			initInterval() {
				const coinSettle = function() {
					this.$app.request('sprite/settle', {}, res => {
						if (res.data.earn) {
							this.coinAddNum = res.data.earn
							this.offlinePercent = res.data.percent
							this.coinAddShow = true
							setTimeout(() => {
								this.coinAddShow = false
							}, 500)
							this.$app.request(this.$app.API.USER_CURRENCY, {}, res => {
								this.$app.setData('userCurrency', res.data)
								this.userCurrency = this.$app.getData('userCurrency')
							})

							if (res.data.mode == 1) {
								// 离线
								this.modal = 'offline'
							}
						}

					})
				}.bind(this)

				coinSettle()
				clearInterval(this.timeId)
				this.timeId = setInterval(() => {
					if (--this.settleTime < 0) {
						coinSettle()
						this.settleTime = 100
					}
				}, 1000)
			},
			// 农场信息
			getSpriteInfo() {
				this.$app.request(this.$app.API.SPRITE_INFO, {
					user_id: this.$app.getData('userInfo').id
				}, res => {
					this.farm = res.data.spriteInfo

					this.initSkillOne(res.data.skillOneRemainTime)
					this.skillTwoRemainCount = res.data.skillTwoRemainTimes
					this.skillThreePercent = res.data.skillThreePercent
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.sprites {
		.sprite {
			height: 320upx;
			width: 240upx;
		}
	}

	button {
		background-color: transparent;
		line-height: 1.5;
	}

	.button-hover {
		background-color: transparent;
	}

	page {
		overflow: hidden;
		background-color: #42B6E7;
	}

	image.bg {
		width: 100%;
		overflow: hidden;
	}

	.content {
		width: 750upx;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		color: #fff;
	}

	.userinfo {
		font-size: 28upx;
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-top: 20upx;
		position: relative;
	}

	.userinfo text {
		height: 64upx;
		line-height: 60upx;
		position: absolute;
		left: 55upx;
	}

	.speed {
		display: inline-block;
		background-color: rgba(0, 0, 0, 0.4);
		margin-left: 20upx;
		margin-top: 15upx;
		font-size: 28upx;
		border-radius: 30upx;
		padding: 8upx 20upx;
	}

	.settleCounter {
		position: absolute;
		width: 54upx;
		height: 54upx;
		left: 380upx;
		top: 109upx;
		text-shadow: 0 0 10upx #fff,
			0 0 20upx #fff,
			0 0 30upx #fff,
			0 0 40upx #ff00de,
			0 0 70upx #ff00de,
			0 0 80upx #ff00de,
			0 0 100upx #ff00de,
			0 0 150upx #ff00de;
	}

	.speed>image {
		width: 35upx;
		height: 35upx;
	}

	.avator {
		margin-left: 20upx;
		position: relative;
	}

	.avator .ftbg {
		width: 80upx;
		height: 64upx;
	}

	.npc-icon {
		width: 65upx;
		height: 65upx;
		position: absolute;
		top: -20upx;
		left: 10upx;
	}

	.bean-icon,
	.coin-icon,
	.diamond-icon {
		width: 38upx;
		height: 38upx;
		position: absolute;
		top: 12upx;
		left: 15upx;
	}

	.bean,
	.coin,
	.diamond {
		margin-left: 10upx;
		position: relative;
		display: flex;
		position: relative;
	}

	.diamond {
		margin-left: 20upx;
	}

	.coin-wen,
	.coin-add,
	.diamond-jia {
		z-index: 2;
		position: absolute;
		width: 37upx;
		height: 36upx;
	}

	.coin-add {
		right: 40upx;
		top: 16upx;
		font-size: 22upx;
		min-width: 90upx;
	}

	.coin-count {
		transition: transform .6s;
	}

	.coin-count.scale {
		transform: scale(1.5);
	}

	.coin-add-wrapper {
		text-align: center;
	}

	.coin-wen {
		left: 330upx;
		top: 10upx;
	}

	.diamond-jia {
		left: 125upx;
		top: 10upx;
	}

	.bean .ftbg {
		width: 200upx;
		height: 64upx;
	}

	.coin .ftbg {
		width: 360upx;
		height: 64upx;
	}

	.diamond .ftbg {
		width: 155upx;
		height: 64upx;
	}

	.progress {
		font-size: 28upx;
		width: 140upx;
	}

	.progress image {
		width: 42upx;
		height: 42upx;
	}

	.progress1 {
		text-align: center;
		width: 120upx;
		z-index: 3;
		position: absolute;
		left: 155upx;
		top: 505upx;
	}

	.progress2 {
		text-align: center;
		width: 120upx;
		z-index: 3;
		position: absolute;
		left: 367upx;
		top: 590upx;
	}

	.farmerhouse {
		display: flex;
		flex-direction: row;
		align-items: center;
		position: relative;
	}

	.farmer {
		position: absolute;
		left: -37upx;
		top: 190upx;
		width: 224upx;
		height: 183upx;
	}

	.house {
		position: absolute;
		right: 10upx;
		top: 78upx;
		width: 439upx;
		height: 373upx;
	}

	.house-up {
		position: absolute;
		right: 5upx;
		top: 120upx;
		width: 100upx;
		height: 113upx;
	}

	/*地块*/

	.ground {
		position: relative;
	}

	.bg-img {
		position: absolute;
		width: 709upx;
		height: 365upx;
		left: 10upx;
		top: 368upx;
	}

	.land {
		width: 296upx;
		height: 152upx;
		position: absolute;
	}

	.ld1 {
		left: 134upx;
		top: 425upx;
	}

	.ld2 {
		left: 325upx;
		top: 504upx;
	}

	.sprite {
		max-width: 280upx;
		max-height: 280upx;
		position: absolute;
	}

	.sprite-up {
		width: 54upx;
		height: 54upx;
		position: absolute;
	}

	.sp1 {
		left: 147upx;
		top: 258upx;
	}

	.sp2 {
		left: 344upx;
		top: 340upx;
	}

	.sp1-up {
		left: 105upx;
		top: 390upx;
	}

	.sp2-up {
		left: 579upx;
		top: 551upx;
	}

	.jackstraw {
		height: 100%;
	}

	.jackstraw image.uname {
		position: absolute;
		width: 202upx;
		height: 238upx;
		left: 31upx;
		bottom: 10%;
	}

	.jackstraw .welcome {
		position: absolute;
		width: 170upx;
		line-height: 32upx;
		left: 44upx;
		bottom: 13.8%;
		text-align: center;
		color: #a74c16;
		font-size: 26upx;
		font-weight: bold;
	}

	.jackstraw .nickname {
		display: inline-block;
		max-width: 130upx;
		white-space: nowrap;
		overflow: hidden;
	}

	.dog {
		position: absolute;
		width: 235upx;
		height: 233upx;

		right: 136upx;
		bottom: 7%;
		z-index: 2;
	}

	.dog-hand {
		position: absolute;
		right: 218upx;
		bottom: 23%;
		width: 84upx;
		height: 142upx;
	}

	.charge-btn {
		position: absolute;
		width: 85upx;
		height: 90upx;
		left: 20upx;
		top: 190upx;
	}

	.exchange-btn {
		top: 300upx;
	}

	.help-btn {
		top: 190upx;
		/*410upx;*/
	}

	.help-btn.btn3 {
		top: 320upx;
		height: 85upx;
	}

	.speed-content {
		position: absolute;
		top: 400upx;
		left: 15upx;
		font-size: 24upx;
	}

	.music {
		position: absolute;
		width: 54upx;
		height: 54upx;
		left: 277upx;
		top: 16upx;
	}

	.rotate-true {
		animation: musciRotate 3s linear infinite;
	}

	.rotate-false {
		animation: none;
	}

	.farmhelp {
		text-align: left;
	}

	/* 图片旋转效果  */

	@keyframes musciRotate {
		0% {
			transform: rotate(0deg);
		}

		50% {
			transform: rotate(180deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}

	.upgrade {
		position: absolute;
		width: 91upx;
		height: 53upx;
		left: 190upx;
		top: 110upx;
	}

	.share-flower {
		color: #42b6e7;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.invited-btn {
		background-color: #ffd302;
		color: #000;
	}

	.collectTree1 {
		position: absolute;
		left: 342upx;
		top: 602upx;
		width: 42upx;
		height: 42upx;
		opacity: 0;
	}

	.collectTree2 {
		position: absolute;
		left: 404upx;
		top: 692upx;
		width: 42upx;
		height: 42upx;
		opacity: 0;
	}

	/*通用弹框  */
	.share-header-text {
		position: absolute;
		right: 50upx;
		top: -8upx;
		font-weight: bold;
		color: #fdd043;
		font-size: 28upx;
	}

	.middle .starModelScroll {
		margin-bottom: 2upx;
		height: 100%;
	}

	.middle .share-box {
		color: #fff;
		background-color: #77c5e9;
		border-radius: 20upx;
		font-size: 30upx;
		width: 450upx;
	}

	.share-model {
		font-size: 30upx;
		height: 40%;
	}

	.share-model .top,
	.share-model .middle {
		width: 560upx;
	}

	.share-model .middle {
		height: 700upx;
		top: 50upx;
		line-height: 100%;
		text-align: left;
	}

	.share-model .starModelScroll {
		height: 62%;
	}

	.share-model .share-box {
		width: 560upx;
	}

	.share-model .share-box>image {
		width: 60upx;
		height: 60upx;
	}

	.middle .share-box .share-num {
		width: 360upx;
	}

	.share-model .invited-btn {
		width: 120upx;
		height: 48upx;
		line-height: 48upx;
	}

	.share-model .share-get-btn {
		width: 110upx;
		height: 54upx;
		line-height: 54upx;
		margin: 0;
		padding: 0;
	}

	.share-model .share-friend {
		font-size: 26upx;
		font-weight: 700;
	}

	.share-model .share-flower {
		color: #307a9d;
		font-weight: bold;
	}

	.share-model .farm-close-btn {
		top: 43upx;
		right: -47upx;
	}

	.share-model .top .title {
		top: 13upx;
	}

	.share-model .share-box>image {
		margin-left: 15upx;
		margin-right: 10upx;
	}

	.small {
		font-size: 28upx;
	}

	.speed .small {
		color: #fff;
		font-size: 24upx;
	}

	.offline-coins {
		width: 321upx;
		height: 225upx;
	}

	.offline-coins-text {
		font-size: 40upx;
		font-weight: bold;
	}

	.shadow {
		color: #fdd043;
		-webkit-text-stroke: 1upx #a54a49;
	}

	/*房子升级*/

	.house-model .starModelScroll {
		height: 88%;
	}

	/**/

	.help-model .middle {
		padding: 0 40upx;
	}

	/*离线收益*/

	.offline-model .middle {
		background-color: transparent;
		box-shadow: none;
		height: 690upx;
	}

	.guanghuan {
		position: absolute;
		left: 50%;
		top: 40upx;
		transform: translateX(-50%);
		width: 400upx;
		z-index: -1;
		height: 408upx;
	}

	/*用户授权*/

	.jackstraw button.give-box {
		width: 54upx;
		height: 54upx;
		overflow: visible;
		padding: 0;
		margin-left: 184upx;
		margin-top: 698upx;
		background-color: transparent;
	}

	.jackstraw button.give-box::after {
		border: 0;
		padding: 0;
	}

	.jackstraw .sp3-up {
		width: 54upx;
		height: 54upx;
	}

	/*我关注的明星列表*/

	.head image {
		margin-right: 10upx;
		width: 50upx;
		height: 50upx;
	}

	.mystar-box .head {
		padding: 20upx 20upx 0 20upx;
	}

	.mystar-box {
		padding: 0 20upx;
		color: #fff;
	}

	.mystar-box .give-btn {
		width: 160upx;
		height: 55upx;
		background: #ff7e00;
		border-radius: 50upx;
		text-align: center;
		line-height: 55upx;
		color: #fff;
		font-size: 30upx;
	}

	.mystar-box .give-btn image {
		width: 134upx;
		height: 52upx;
	}

	.mystar-box .give-item {
		width: 100%;
		height: 118upx;
		margin-top: 20upx;
		display: flex;
		align-items: center;
		color: #fff;
		position: relative;
	}

	.mystar-box .give-item .row {
		display: flex;
		flex-direction: row;
		font-size: 22upx;
		justify-content: center;
		align-items: baseline;
	}

	.mystar-box .give-item>image {
		width: 80upx;
		height: 80upx;
		border-radius: 50%;
		margin-left: 10upx;
		margin-right: 30upx;
	}

	.mystar-box .give-item .message {
		width: 400upx;
	}

	.mystar-box .give-item .message .nickname {
		font-size: 32upx;
		text-align: left;
	}

	.mystar-box .num text {
		color: #fff;
		font-size: 24upx;
	}

	.mystar-box .num image {
		width: 23upx;
		height: 28upx;
		vertical-align: middle;
		margin-left: 8upx;
	}

	.mystar-box .color {
		text-decoration: underline;
	}

	.common-model .middle-title {
		display: flex;
		justify-content: center;
	}

	.common-model .middle-title image {
		width: 350upx;
		height: 84upx;
		margin: auto;
	}

	.common-model .middle-title .text {
		position: absolute;
		line-height: 84upx;
		font-size: 36upx;
		color: red;
		font-weight: 700;
	}

	.common-model .share-friend image {
		width: 30upx;
		height: 30upx;
	}

	.pet-skill-modal {
		height: 30%;
	}

	.pet-skill-modal .share-box {
		position: relative;
		margin-top: 30upx;
		width: 100%;
	}

	.pet-skill-modal .share-box .tips {
		font-size: 20upx;
	}

	.pet-skill-modal .share-get-btn {
		background-color: #ffd302;
	}

	.pet-skill-modal .get-invited-btn {
		min-width: 110upx;
		width: auto;
		padding: 0 10upx;
	}

	.pet-skill-modal .get-invited-btn.unuseful {
		background-color: #989898;
		color: #fff;
	}

	.pet-skill-modal .share-box .block {
		width: 60upx;
		height: 100%;
		background-color: #fff;
	}

	.pet-skill-modal .share-box .share-box-img {
		width: 120upx;
		height: 120upx;
		position: absolute;
		left: 0;
		bottom: 0;
		z-index: 1;
		margin: 0;
	}

	.pet-skill-modal .share-box .explain {
		line-height: 36upx;
		margin-left: 120upx;
		width: 210upx;
	}

	.pet-skill-modal .share-box .share-box-img-badge {
		width: 42upx;
		height: 42upx;
		left: 70upx;
		bottom: 10upx;
		position: absolute;
		z-index: 2;
	}

	.up-icon {
		width: 45upx;
		height: 45upx;
		position: absolute;
		z-index: 1;
	}

	.up-icon.house {
		top: 359upx;
		right: 48upx;
	}

	.up-icon.land1 {
		top: 466upx;
		left: 115upx;
	}

	.up-icon.land2 {
		top: 545upx;
		right: 116upx;
	}

	.locg-img::before {
		content: '';
		background-image: url(https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9Gicuwj2icibianoEKQBGibZIic45YXT5dPiaM9suUYDSlH623Wv3THBDArlvS1I2vZias7OSh58usP1XtS8Q/0);
	}

	.offline-model .btn-wrapper {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}

	.btn-wrapper .submit {
		margin: 40upx 20upx;
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

		.tips {
			padding: 20upx;
		}

		.coin-count {
			font-size: 50upx;
			padding-bottom: 20upx;
			margin-top: -20upx;
			font-weight: 700;
			color: $bg-color-2;
		}

		.bg {
			width: 300upx;
			height: 300upx;
		}

		.btn {
			padding: 10upx 30upx;
			font-size: 30upx;
			font-weight: 600;
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

		.skill2-count {
			margin: 20upx;
			font-weight: 700;
			color: #888;
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

	.side-wrap {
		position: absolute;
		z-index: 3;
		right: 67upx;
		bottom: 3%;
		display: flex;
		width: 400upx;
		height: 350upx;
		transition: .3s;
		transform: scale(0);

		.btn-wrap {
			position: absolute;
			text-align: center;

			.icon {
				width: 80upx;
				height: 80upx;
			}

			.text {
				text-align: center;
				font-size: 24upx;
				width: 120upx;
			}
		}

		.btn-wrap.one {
			left: 20upx;
			top: 20upx;
		}

		.btn-wrap.two {
			left: 20upx;
			bottom: 20upx;
		}

		.btn-wrap.three {
			right: 20upx;
			top: 20upx;
		}

		.btn-wrap.four {
			right: 20upx;
			bottom: 20upx;
		}

	}

	.side-wrap.show {
		transform: scale(1);
	}

	.mask-wrap {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
		background-color: rgba(0, 0, 0, .6);
	}


	.speed-modal .list-wrap {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		margin: 10rpx 20rpx;
	}

	.speed-modal .list-wrap .list-nickname {
		font-size: 24rpx;
		margin-top: -10rpx;
		width: 100rpx;
		height: 50rpx;
		text-align: center;
	}

	.speed-modal .submit {
		margin-top: 0;
	}

	.speed-modal .list-wrap .item {
		display: flex;
		flex-direction: column;
		align-items: center;

		.inner {
			border-radius: 50%;
			width: 80rpx;
			height: 80rpx;
			box-shadow: 0rpx 2rpx 8rpx rgba(0, 0, 0, .3);
			overflow: hidden;
		}
	}

	.offline-modal-container {
		.btn {
			font-size: 30upx;
			width: 220upx;
		}
	}
</style>
