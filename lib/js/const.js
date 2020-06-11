// 基础常量
// const HOST = 'idolzone.cyoor.com';
const HOST = 'cs.adqz.xiaolishu.com'; 
const VERSION = 'v6';

export default {
	HOST,
	VERSION,
	BASE_URL: 'https://' + HOST,
	HTTP_URL: 'https://' + HOST + '/api/' + VERSION + '/',
	WSS_URL: 'wss://' + HOST + '/wss',
	
	APP_NAME: '爱豆圈子',

	QRCODE: 'https://mmbiz.qpic.cn/mmbiz_jpg/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTER7ticIBeMDqR2pXCv8JWMWN1JvTBURJyzAo6icibiaTP570BMZYRuOMLJ9Q/0',
	AVATAR: 'https://mmbiz.qpic.cn/mmbiz_jpg/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTER5kzPPpRZsIZTVGkic76VvZBcN0MzuCb4QUCab8x5M4lHoVQicHeAze4Q/0',
	NICKNAME: '神秘粉丝',

	GZH_APPID: 'wx3507654fa8d00974', // 关联公众号APPID

	// 微信广告
	adUnitId: "adunit-f1aae5d7bd2ce0a4", // 视频广告id
	bannerAdUnitId: "adunit-35ca8f0eac3ccba9", // banner广告id
	interstitialAd_adUnitId: "adunit-1f7632b40b7983fb", // 插屏广告id
	gridAd_adUnitId: "adunit-fe1856f7dc999e2a", // grid广告id
	videoAd_adUnitId: "adunit-7ac1d9a30a018c58", // 视频广告id

	// QQ广告
	qq_adUnitId: "2302dcbddf2b40f02713960076f7e729", // QQ激励视频广告id
	qq_bannerAdUnitId: "0c80535627c94ad826b8e1902f8c0aa0", // banner广告位
	qq_interstitialAd_adUnitId: "3324d5e3ec5cf64e02b05c75c48e7998", // 插屏广告id
	qq_feedsAdUnitId: "f56cfbc2697ec4adf7f0a4c56a2226ea", // feeds广告位
	qq_cardAdUnitId: "3892dbda0391a549fd93d59cfb0cdf5e", // card广告位
	qq_boxAdUnitId: "5543882a3dc39f43daa075b5f2737397", // 盒子广告位

	API: {
		AUTH_LOGIN: 'user/login', // 用户登录

		BANNER_LIST: 'banner/list',

		STAR_RANK: 'star/rank', // 明星榜单
		STAR_RANK_HISTORY: 'star/rank/history', // 明星榜单lishi
		STAR_INFO: 'star/info', // 明星信息
		STAR_CHART: 'star/chart', // 明星圈子聊天内容
		STAR_JOINCHART: 'star/joinchart', // 加入明星聊天室socket
		STAR_LEAVECHART: 'star/leavechart', // 离开明星聊天室socket
		STAR_SENDMSG: 'star/sendmsg', // 在圈子中发言
		STAR_SENDHOT: 'star/sendhot', // 给明星贡献人气
		STAR_FOLLOW: 'star/follow', // 加入明星圈子
		STAR_STEAL: 'star/steal', // 偷花
		STAR_DYNAMIC: 'star/dynamic', // 动态

		USER_SAVEINFO: 'user/saveinfo', // 保存用户信息
		USER_INFO: 'user/info', // 获取用户信息
		USER_STAR: 'user/star', // 用户加入的爱豆
		USER_CURRENCY: 'user/currency', // 用户货币信息
		USER_STEAL_TIME: 'user/steal/time', // 用户偷花倒计时
		USER_ITEM: 'user/item', // 用户道具
		USER_RANK: 'user/rank', // 用户排名
		USER_INVITLIST: 'user/invitlist', // 用户邀请信息
		USER_INVITAWARD: 'user/invitaward', // 用户邀请奖励
		USER_SAYWORLD: 'user/sayworld', // 世界喊话
		USER_EXIT: 'user/exit', // 退出圈子
		USER_FATHER: 'user/father', // 师徒关系
		USER_SONEARN: 'user/sonearn', // 获取徒弟的收益
		USER_CHECKEARN: 'user/checkearn', // 检查是否有收益


		SHARE_MASS: 'share/mass', // 分享集结
		SHARE_STARMASS: 'share/start', // 分享开始
		SHARE_JOINMASS: 'share/joinmass', // 加入集结
		SHARE_SETTLEMASS: 'share/settlemass', // 结算集结收益

		EXT_SAVEFORMID: 'user/saveformid', // 保存formId

		SPRITE_INFO: 'sprite', // 农场信息
		SPRITE_SETTLE: 'sprite/settle', // 农场结算
		SPRITE_UPGRAGE: 'sprite/upgrade', // 农场升级
		SPRITE_SKILL: 'sprite/skill', // 农场技能

		USER_BIND: 'user/bind', // 绑定client_id

		PAY_ORDER: 'pay/order', // 支付
		PAY_GOODS: 'pay/goods', // 商品列表

		TASK: 'task', // 任务
		TASK_SETTLE: 'task/settle', // 任务领取
		EXT_SHARETEXT: 'sharetext', // 分享文字
		TASK_WEIBO: 'task/weibo', // 提交微博链接

		EXT_ACTIVEINFO: 'active/info', // 活动信息
		EXT_ACTIVECARD: 'active/card', // 打卡
		EXT_ACTIVE_USERRANK: 'active/userrank', // 用户打开排名
		
		ACTIVE_SPECIAL_TASK_LIST: 'active/specialtasklist', // 618活动任务列表

		TREASURE: 'treasure', // 寻宝
		TREASURE_SETTLE: 'treasure/settle', // 寻宝结算

		ARTICLE: 'article', // 获取文章
		ARTICLE_LIST: 'article/list', // 全部文章

		CONFIG: 'config', // 配置信息
		EXT_FANCLUB_JOIN: 'fanclub/join', // 后援会加入

		USER_SIGNIN: 'user/signin', // 用户签到

		LOG: 'ext/log', // 用户日志
	},
}
