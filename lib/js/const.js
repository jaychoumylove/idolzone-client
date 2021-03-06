// 基础常量
// const HOST = "idolzone.cyoor.com";
// const VERSION = "v6"; // 审核版本
const HOST = 'cs.adqz.xiaolishu.com';
const VERSION = 'v0'; // 测试版本

export default {
  HOST,
  VERSION,
  BASE_URL: "https://" + HOST,
  HTTP_URL: "https://" + HOST + "/api/" + VERSION + "/",
  WSS_URL: "wss://" + HOST + "/wss",

  APP_NAME: "爱豆圈子",

  QRCODE:
    "https://mmbiz.qpic.cn/mmbiz_jpg/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTER7ticIBeMDqR2pXCv8JWMWN1JvTBURJyzAo6icibiaTP570BMZYRuOMLJ9Q/0",
  AVATAR:
    "https://mmbiz.qpic.cn/mmbiz_jpg/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTER5kzPPpRZsIZTVGkic76VvZBcN0MzuCb4QUCab8x5M4lHoVQicHeAze4Q/0",
  NICKNAME: "神秘粉丝",

  GZH_APPID: "wx3507654fa8d00974", // 关联公众号APPID

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
    AUTH_LOGIN: "user/login", // 用户登录

    BANNER_LIST: "banner/list",

    STAR_RANK: "star/rank", // 明星榜单
    STAR_RANK_HISTORY: "star/rank/history", // 明星榜单lishi
    STAR_INFO: "star/info", // 明星信息
    STAR_CHART: "star/chart", // 明星圈子聊天内容
    STAR_JOINCHART: "star/joinchart", // 加入明星聊天室socket
    STAR_LEAVECHART: "star/leavechart", // 离开明星聊天室socket
    STAR_SENDMSG: "star/sendmsg", // 在圈子中发言
    STAR_SENDHOT: "star/sendhot", // 给明星贡献人气
    STAR_FOLLOW: "star/follow", // 加入明星圈子
    STAR_STEAL: "star/steal", // 偷花
    STAR_DYNAMIC: "star/dynamic", // 动态

    STAR_MYRANK: "star/myrank", //我的鲜花贡献信息
    STAR_EXTRA_SEND_HOT: "star/extrasendhot", // 动态

    USER_SAVEINFO: "user/saveinfo", // 保存用户信息
    USER_INFO: "user/info", // 获取用户信息
    USER_STAR: "user/star", // 用户加入的爱豆
    USER_CURRENCY: "user/currency", // 用户货币信息
    USER_BLESSING_BAG: "user/userBlessingBag", // 用户福袋信息
    USER_STEAL_TIME: "user/steal/time", // 用户偷花倒计时
    USER_ITEM: "user/item", // 用户道具
    USER_RANK: "user/rank", // 用户排名
    USER_INVITLIST: "user/invitlist", // 用户邀请信息
    USER_INVITAWARD: "user/invitaward", // 用户邀请奖励
    USER_SAYWORLD: "user/sayworld", // 世界喊话
    USER_EXIT: "user/exit", // 退出圈子
    USER_NERVER_QUIT: "user/neverquit", // 永不退圈
    USER_FATHER: "user/father", // 师徒关系
    USER_SONEARN: "user/sonearn", // 获取徒弟的收益
    USER_CHECKEARN: "user/checkearn", // 检查是否有收益

    SHARE_MASS: "share/mass", // 分享集结
    SHARE_STARMASS: "share/start", // 分享开始
    SHARE_JOINMASS: "share/joinmass", // 加入集结
    SHARE_SETTLEMASS: "share/settlemass", // 结算集结收益

    EXT_SAVEFORMID: "user/saveformid", // 保存formId

    SPRITE_INFO: "sprite", // 农场信息
    SPRITE_SETTLE: "sprite/settle", // 农场结算
    SPRITE_UPGRAGE: "sprite/upgrade", // 农场升级
    SPRITE_SKILL: "sprite/skill", // 农场技能

    USER_BIND: "user/bind", // 绑定client_id

    PAY_ORDER: "pay/order", // 支付
    PAY_GOODS: "pay/goods", // 商品列表

    TASK: "task", // 任务
    TASK_SETTLE: "task/settle", // 任务领取
    EXT_SHARETEXT: "sharetext", // 分享文字
    TASK_WEIBO: "task/weibo", // 提交微博链接

    EXT_ACTIVEINFO: "active/info", // 活动信息
    EXT_ACTIVECARD: "active/card", // 打卡
    EXT_ACTIVE_USERRANK: "active/userrank", // 用户打开排名

    ACTIVE_BLESSING_TASK_LIST: "active/blessingTaskList", // 618活动任务列表
    ACTIVE_BLESSING_LIST: "active/blessingList", // 618活动列表
    ACTIVE_GET_BLESSING_BAG: "active/getBlessingBag", // 618活动福气领取
    ACTIVE_USE_BLESSING_BAG: "active/useBlessingBag", // 618活动福袋使用
    ACTIVE_LOG_BLESSING_BAG: "active/logBlessingBag", // 618活动福袋日志

    ACTIVE_WEAL_TASK_LIST: "active/wealtask", // 618活动任务列表
    ACTIVE_WEAL_LIST: "active/weallist", // 618活动列表
    ACTIVE_WEAL_BAG_GET: "active/getwealbag", // 618活动福气领取
    ACTIVE_WEAL_BAG_USE: "active/usewealbag", // 618活动福袋使用
    ACTIVE_WEAL_LOG: "active/weallog", // 618活动福袋日志

    ACTIVE_DRAGON_BOAT_FESTIVAL: "active/dragon_boat_festival", // 端午活动列表
    ACTIVE_DRAGON_BOAT_FESTIVAL_JOIN: "active/dragon_boat_festival_join", // 加入端午活动
    ACTIVE_DRAGON_BOAT_FESTIVAL_FANCLUB: "active/dragon_boat_festival_fanclub", // 端午活动粉丝团列表
    ACTIVE_DRAGON_BOAT_FESTIVAL_FANCLUB_USER:
      "active/dragon_boat_festival_fanclub_user", // 端午活动粉丝团用户列表
    ACTIVE_DRAGON_BOAT_FESTIVAL_EXIT: "active/dragon_boat_festival_exit", // 粉丝团退出端午活动

    TREASURE: "treasure", // 寻宝
    TREASURE_SETTLE: "treasure/settle", // 寻宝结算

    ARTICLE: "article", // 获取文章
    ARTICLE_LIST: "article/list", // 全部文章

    CONFIG: "config", // 配置信息
    BTN_CFG_GROUP: "config/btn_cfg_group",
    ACTIVE_CONFORM: "config/active_conform",
    EXT_FANCLUB_JOIN: "fanclub/join", // 后援会加入

    USER_SIGNIN: "user/signin", // 用户签到

    OPEN_SEND_HOT: "open/sendhot", // 开屏贡献
    OPEN_LIST: "open/select", // 用户签到
    OPEN_UPLOAD: "open/upload", // 用户上传
    OPEN_RANK: "open/rank", // 开屏排名贡献
    OPEN_INFO: "open/info", // 开屏信息
    OPEN_REMOVE: "open/remove", // 开屏信息

    LOG: "ext/log", // 用户日志

    // // 福利抽奖页面
    USER_PAID_INFO: "user/paid/info", // 领取充值福利
    USER_PAID_SETTLE: "user/paid/settle", // 获取充值福利信息
    USER_PAID_LOG: "user/paid/log", // 领取充值福利日志
    LUCKY_DRAW_INFO: "lucky/draw/info", // 获取抽奖信息
    LUCKY_DRAW_START: "lucky/draw/start", // 点击抽奖
    LUCKY_DRAW_START_FIFTY: "lucky/draw/startfifty", // 点击五十抽奖
    LUCKY_DRAW_START_MORE: "lucky/draw/startmore", // 点击抽奖
    LUCKY_DRAW_LOG: "lucky/draw/log", // 抽奖记录
    LUCKY_DRAW_DAY_EARN: "lucky/draw/day/earn", // 每日抽奖合集
    PAGE_LUCKY_CHARGE: "page/luckycharge", // 页面聚合信息
    LUCKY_DRAW_EXCHANGE: "lucky/draw/exchange", // 兑换碎片
    LUCKY_DRAW_EXCHANGE_ANIMAL: "lucky/draw/exchange_animal", // 兑换碎片
    LUCKY_DRAW_EXCHANGE_LUCKY: "lucky/draw/exchange_lucky", // 兑换幸运碎片
    LUCKY_DRAW_EXCHANGE_MORE: "lucky/draw/exchange_more", // 兑换幸运碎片

    PAGE_ACHIEVEMENT: "page/achievement", // 成就列表
    PAGE_ACHIEVEMENT_MY_RANK: "page/my_achievement", // 成就列表

    WELFARE_INFO: "welfare/info",
    WELFARE_RANK: "welfare/rank",

    PAGE_INVITE_ASSIST: "page/invite_assist",
    INVITE_SETTLE_REC: "invite/settle_rec",
    INVITE_SETTLE: "invite/settle",
    INVITE_RANK: "invite/rank",
    FANS_REMOVE_ALL: "fans/remove_all",

    MANOR_PAGE: "page/manor", //庄园信息
    OTHER_MANOR_PAGE: "page/other_manor", //庄园信息
    ANIMAL_LIST: "animal/list", //宠物列表
    ANIMAL_INFO: "animal/info", //宠物信息
    ANIMAL_UP: "animal/up", //宠物升级
    ANIMAL_LOTTERY_INFO: "animal/lottery_info", //宠物抽奖池
    ANIMAL_LOTTERY: "animal/lottery", //宠物信息
    ANIMAL_STEAL: "animal/steal", //宠物偷豆
    ANIMAL_STEAL_LIST: "animal/steallist", //偷取用户列表
    ANIMAL_STEAL_LOG: "animal/steallog", //偷取日志
    ANIMAL_OUTPUT: "animal/output", //宠物产豆
    ANIMAL_UNLOCK: "animal/unlock", //宠物解锁
    ANIMAL_CHANGE: "animal/change", //宠物更换
    ANIMAL_CHANGE_IMAGE: "animal/checkout_image", //萌宠形象更换
    ANIMAL_CHANGE_SUPER_IMAGE: "animal/checkout_super_image", //灵宠形象更换
    PANACEA_TASK_LIST: "panacea/task_list", // 灵丹任务列表
    PANACEA_FINISH_TASK: "panacea/task_settle", // 完成灵丹任务
    MANOR_BACKGROUND: "manor/background", //庄园背景列表
    MANOR_BACKGROUND_USE: "manor/use_background", //使用庄园背景
    MANOR_BACKGROUND_TRY: "manor/try_background", //试用庄园背景
    MANOR_BACKGROUND_UNLOCK: "manor/unlock_background", //解锁庄园背景
    MANOR_LOG: "manor/log", //庄园日志
    MANOR_RANK: "manor/idolrank", //爱豆庄园排行
    MANOR_ZONE_RANK: "manor/fansrank", //圈内庄园排行
    MANOR_FANS_RANK: "manor/allfansrank", //全服庄园排行

    YINGYUAN_INFO: "yingyuan/info",
    YINGYUAN_LIST: "yingyuan/list",
    YINGYUAN_CARD: "yingyuan/card",
    YINGYUAN_REWARD: "yingyuan/reward",
    YINGYUAN_LOG: "yingyuan/log",
  },
};
