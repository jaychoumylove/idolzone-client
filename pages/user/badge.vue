<template>
	<view class="container">
		<!-- 顶部用户头像 -->
		<view class="avatar-wrap flex-set">
			<view class="avatar-block">
				<image class="avatar" :src="$app.getData('userInfo').avatarurl"></image>
			</view>
			<view>{{$app.getData('userInfo').nickname||''}}</view>			
			<view class="badge-box">
			<block v-for="(item, index) in curBadge" :key="index">
				<image class="badge-item" v-if="item.simg" :src="item.simg"></image>
			</block>
			</view>
		</view>

		<view class="swiper-change flex-set">
			<view class="swiper-item" :class="{select:btype==0}" @tap="btype = 0;loadData(btype);">成就徽章</view>
			<view class="swiper-item" :class="{select:btype==1}" @tap="btype = 1;loadData(btype);">节日徽章</view>
			<view class="swiper-item" :class="{select:btype==2}" @tap="btype = 2;loadData(btype);">限定徽章</view>
		</view>

		<view class="list-wrap">
			<block v-for="(slist, stype) in list" :key="stype">
				<view v-if="stype==1" class="item-title">
					<image src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GwUKKwxfCN8b4IqicoNG1hJm783osCzsnkJVY6z5F6a8nK2iawIicvAxzN3dxmMnibic8bIpzruf02icGA/0"></image>
				</view>
				<view v-else-if="stype==2" class="item-title">
					<image src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GwUKKwxfCN8b4IqicoNG1hJB1STOc7TOSx4jUsDveDpKGnlCbic8W7icAopIBLTE1rZ8xIonfKkjuPA/0"></image>
				</view>
				<view v-else-if="stype==3" class="item-title">
					<image src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GwUKKwxfCN8b4IqicoNG1hJt8j2T6E5Id4q0XE6JwBEibJlzHzFP6A1mmODlQFVDpa0PzPryM9yicoQ/0"></image>
				</view>
				<view v-else-if="stype==4" class="item-title">
					<image src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GwUKKwxfCN8b4IqicoNG1hJxsEpu5arvJl0hMhRT8VwY0O6hPHnh0f3vlW9fpAnyZmnI979NnWk1A/0"></image>
				</view>
				<view v-else-if="stype==5" class="item-title">
					<image src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GwUKKwxfCN8b4IqicoNG1hJAJaDpDicBicmlOKMaf9EPMTibF4AeTkoUSxTasfwZbpsVzibkfVLt4W0ibw/0"></image>
				</view>
				<view v-else-if="stype==6" class="item-title">
					<image src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GwUKKwxfCN8b4IqicoNG1hJXwcdrekISpWAcFkQ7GU0LezsPaJWcdshDhcgR6s1Rnib3FbZqcMbNNg/0"></image>
				</view>
				
				<view class="item" v-for="(item, index) in slist" :key="index">
				<view class="top-wrap flex-set" :class="{use:item.status==1}">
					<image :class="{gray:item.status==-1}" :src="item.bimg"></image>
				</view>
				<text>{{item.name}}</text>
				<view v-if="item.status==-1">
					<progress :percent="[item.percent]" activeColor="#09BB07" border-radius="30"/>
				</view>
				<view v-else class="fee">{{item.create_time_has}}获得</view>
				<view v-if="item.status==-1" class="btn flex-set" @tap="goPage(item)">去解锁</view>
				<view v-if="item.status==0" class="btn flex-set success" @tap="use(item)">佩戴</view>
				<view v-if="item.status==1" class="btn flex-set disable" @tap="cancel(item)">摘下</view>
			</view>
			</block>

		</view>
	</view>
</template>

<script>
	import badgeComponent from "@/components/badgeComponent.vue"
	import btnComponent from "@/components/btnComponent.vue"
	import modalComponent from "@/components/modalComponent.vue"
	export default {
		components: {
			badgeComponent,
			modalComponent,
			btnComponent
		},
		data() {
			return {
				btype: 0,//徽章大类
				list: [],//徽章列表
				curBadge: [],//当前佩戴的
				
			};
		},
		onLoad() {
			this.loadData()
		},
		onShow() {

		},
		onShareAppMessage(e) {
			const shareType = e.target && e.target.dataset.share
			return this.$app.commonShareAppMessage(shareType)
		},
		methods: {
			goPage(item) {
				this.$app.goPage(item.gopage)
			},
			use(item) {
				this.$app.request('badge/use', {
					stype: item.stype,
					badgeId: item.id
				}, (res) => {
					this.$app.toast(res.msg)
					this.loadData()
				}, 'POST', true)
			},
			cancel(item) {
				this.$app.request('badge/cancel', {
					badgeId: item.id
				},(res) => {
					this.$app.toast(res.msg)
					this.loadData()
				}, 'POST', true)
			},
			loadData() {
				this.$app.request('badge/select', {
					btype: this.btype
				}, (res) => {
					this.list = res.data.list
					this.curBadge = res.data.curBadge
				}, 'POST', true)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		display: flex;
		flex-direction: column;
		height: 100%;

		.avatar-wrap {
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 20upx;
			position: relative;
			width: 750upx;
			height: 440upx;
			background: url('https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GwUKKwxfCN8b4IqicoNG1hJ39AibGo1zzZEYt679yBmcloibNm4eMOCDm0Quf7DDvc3ZKjs98Iz9VhQ/0') no-repeat top left;
			background-size: cover;
		}

		.avatar-wrap .avatar-block {
			margin: 20upx;
			width: 140upx;
			height: 140upx;
			position: relative;
		}

		.avatar-wrap .avatar {
			width: 100%;
			height: 100%;
			border-radius: 50%;
		}
		.avatar-wrap .badge-box {
			margin-top: 30upx;
		}

		.avatar-wrap .badge-item {
			width: 55upx;
			height: 55upx;
		}

		//切换tab
		.swiper-change {
			margin: 12upx 30upx;
			border-radius: 30upx;
			overflow: hidden;
			box-shadow: 0 2upx 4upx rgba(0, 0, 0, .3);
		
			.swiper-item {
				flex: 1;
				height: 70upx;
				line-height: 70upx;
				background-color: #f5f5f5;
				color: #ff648d;
				text-align: center;
		
			}
		
			.swiper-item.select {
				background-color: #fbcc3e;
				color: #000;
			}
		
		}

		.list-wrap {
			flex: 1;
			overflow-y: scroll;
			overflow-x: hidden;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
		}

		.list-wrap .item-title {
			width: 714upx;
			height: 67upx;
			margin: 40upx 0 10upx 0;

		}

		.list-wrap .item {
			font-size: 24upx;
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 250upx;
			border-right: 1px solid #eee;
			border-bottom: 1px solid #eee;
			margin-right: -1px;
			margin-bottom: -1px;
		}
		
		.list-wrap .item image {
			width: 80%;
			height: 80%;
		}
		
		.list-wrap .item image.gray {
			filter: grayscale(100%);
		}
		
		.list-wrap progress {
			width: 140upx;
			height: 20upx;
			margin: 12upx 0;
		}
		.list-wrap .fee {
			word-break:break-all; 
		}

		.list-wrap .item .top-wrap {
			height: 180upx;
			margin-top: 10upx;
			margin-bottom: 10upx;
			width: 230upx;
			background-color: #fafafa;
			position: relative;
		}

		.list-wrap .item .top-wrap.use {
			background-color: #e6f8fc;
		}

		.list-wrap .item .top-wrap .badge {
			width: 30upx;
			height: 30upx;
			position: absolute;
			right: 10upx;
			top: 10upx;
		}

		.list-wrap .item .btn {
			border-radius: 50upx;
			background-color: #fd523e;
			color: #FFF;
			width: 150upx;
			height: 50upx;
			margin: 10upx;

		}

		.list-wrap .item .btn.success {
			background-color: #17b6f0;
		}

		.list-wrap .item .btn.disable {
			background-color: #999;
		}
	}
</style>
