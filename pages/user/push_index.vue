<template>
	<!-- 公众号消息订阅 -->
	<view class="container">

		<block v-if="subscribe">
			<view class="item" v-for="(e,i) in list" :key="i">
				<view class="left">{{e.title}}</view>
				<switch checked="true" @change="change" :data-id="e.id" :checked="e.check" />
			</view>
		</block>
		<view class="no-data-container flex-set" v-else>
			<view class="title">进入聊天窗口点击右下角卡片</view>

			<image class="img" src="https://mmbiz.qpic.cn/mmbiz_png/w5pLFvdua9GtNAcPVLQic64wJ4ialJUhsoQVRpufrK9T88PunUuiaXd7MpuG0fibrQeqKic0SNO1kBW9c2njFpGzx8g/0"
			 mode="widthFix"></image>

			<button open-type="contact" show-message-card :session-from="sessionFrom">
				<btnComponent type="default">
					<view class="btn">马上关注</view>
				</btnComponent>
			</button>

			<view class="tips">关注公众号，开启数据订阅</view>
		</view>
	</view>

</template>

<script>
	import btnComponent from "@/components/btnComponent.vue"
	export default {
		components: {
			btnComponent
		},
		data() {
			return {
				subscribe: 1, // 已关注
				list: [],
				modal: '',
				sessionFrom: '{"receive_param":"消息订阅"}',
			};
		},
		onLoad() {

		},
		onShow() {
			this.loadData()
		},
		onShareAppMessage(e) {
			const shareType = e.target && e.target.dataset.share
			return this.$app.commonShareAppMessage(shareType)
		},
		methods: {
			change(e) {
				this.$app.request('ext/gzhPushSubscribe', {
					push_id: e.target.dataset.id,
					checked: Number(e.detail.value)
				}, res => {

				}, 'POST', true)
			},
			loadData() {
				this.$app.request('page/gzhSubscribe', {}, res => {
					this.subscribe = res.data.subscribe
					this.list = res.data.list
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		.no-data-container {
			flex-direction: column;

			.title {
				font-size: 40upx;
				margin: 40upx;
				padding-top: 100upx;
			}

			.img {
				width: 450upx;
				margin: 40upx;
			}

			.btn {
				font-size: 40upx;
				padding: 20upx 60upx;
			}

			.tips {
				margin: 40upx;
				color: grey;
			}
		}

		.item {
			font-size: 32upx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin: 0 20upx;
			padding: 20upx;
			border-bottom: 1upx solid #efefef;
		}
	}
</style>
