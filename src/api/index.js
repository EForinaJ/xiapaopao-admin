/*
 * @Author: eforinaj eforinaj@gimail.com
 * @Date: 2022-10-07 13:45:00
 * @LastEditors: eforinaj eforinaj@gimail.com
 * @LastEditTime: 2024-03-14 20:20:25
 * @FilePath: \back\src\api\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const api = {
  // ------------- 设置项 登录
  Login: '/auth/login',// 登录接口
  Logout: '/auth/logout',// 登录接口
  getCaptcha: '/system/imageCaptcha',// 获取验证码
  getSystemInfo: '/system/info',// 获取配置项信息(需要动态路由参数）
 
  // -------------  管理员接口
  getAccount: '/manger/info',// 获取登录管理的信息
  getMangerAuthority: '/manger/authority',// 获取菜单信息
  getMangerList: '/manger/list',// 获取用户列表
  postMangerCreate: '/manger/create',// 创建用户
  getMangerMeta: '/manger/create/meta',// 获取列表
  getMangerEditInfo: '/manger/edit/info',// 获取信息
  postMangerEdit: '/manger/edit',// 修改用户
  postReviewManger: '/manger/review',// 审核
  postRemoveManger: '/manger/remove',// 删除用户

  // ------------- 权限 接口
  getAuthorityList: '/authority/list',// 获取菜单信息
  postaAuthorityCreate: '/authority/create',// 创建菜单
  getAuthorityEditInfo: '/authority/edit/info',// 获取信息
  postAuthorityEdit: '/authority/edit',// 修改
  postAuthorityRemove: '/authority/remove',// 菜单删除
  // ------------- 角色 接口
  getRoleList: '/role/list',// 获取角色列表
  getRoleEditInfo: '/role/edit/info',// 获取信息
  postRoleEdit: '/role/edit',// 修改
  postRoleCreate: '/role/create',// 创建角色
  postRemoveRole: '/role/remove',// 角色删除
  
  // ------------- 设置项 接口
  getSystemSettingInfo: '/system/setting',// 获取配置项信息(需要动态路由参数）
  postSystemSettingSave: '/system/save',// 保存配置项

  // ------------- 分类 接口
  getCateList: '/category/list',// 获取列表
  getCateByModule: '/category/module',// 获取列表
  postCateCreate: '/category/create',// 创建
  getCateEditInfo: '/category/edit/info',// 获取编辑信息
  postCateEdit: '/category/edit',// 编辑
  postCateRemove: '/category/remove',// 删除

  // ------------- 版块 接口
  getForumAll: '/forum/all',// 获取列表
  getForumList: '/forum/list',// 获取列表
  postForumCreate: '/forum/create',// 创建
  getForumEditInfo: '/forum/edit/info',// 获取编辑信息
  postForumEdit: '/forum/edit',// 编辑
  postForumDelete: '/forum/delete',// 删除
  // ------------- 公告 接口
  getAnnouncementAll: '/announcement/all',// 获取列表
  getAnnouncementList: '/announcement/list',// 获取列表
  postAnnouncementCreate: '/announcement/create',// 创建
  getAnnouncementEditInfo: '/announcement/edit/info',// 获取编辑信息
  postAnnouncementEdit: '/announcement/edit',// 编辑
  postAnnouncementDelete: '/announcement/delete',// 删除
  // ------------- 字典 接口
  getDictionaryList: '/dictionary/list',// 获取列表
  postDictionaryCreate: '/dictionary/create',// 创建
  getDictionaryEditInfo: '/dictionary/edit/info',// 获取编辑信息
  postDictionaryEdit: '/dictionary/edit',// 编辑
  postDictionaryDelete: '/dictionary/delete',// 删除
  // ------------- 勋章 接口
  getMedalList: '/medal/list',// 获取列表
  postMedalCreate: '/medal/create',// 创建
  getMedalEditInfo: '/medal/edit/info',// 获取编辑信息
  postMedalEdit: '/medal/edit',// 编辑
  postMedalDelete: '/medal/delete',// 删除
  // ------------- 标签 接口
  getTagHots: '/tag/hots',// 获取列表
  getTagList: '/tag/list',// 获取列表
  postTagTop: '/tag/top',// 创建
  postTagRemove: '/tag/remove',// 删除
  // ------------- 页面 接口
  getPageList: '/page/list',// 获取列表
  postPageCreate: '/page/create',// 创建
  getPageEditInfo: '/page/edit/info',// 获取编辑信息
  postPageEdit: '/page/edit',// 编辑
  postPageRemove: '/page/remove',// 删除
  // ------------- 意见 接口
  getSuggestList: '/suggest/list',// 获取列表
  postSuggestRemove: '/suggest/remove',// 删除
  // ------------- 媒体 接口
  getMediaList: '/media/list',// 获取列表
  postMediaRemove: '/media/remove',// 删除
  // ------------- 上传文件 接口
  postuploadFile:  "/upload/minFile",
  UploadChunk:  "/upload/chunk",
  mergeChunk:  "/upload/mergeChunk",


  // ------------- 用户 接口
  getUserList: '/user/list',// 获取用户列表
  postUserCreate: '/user/create',// 创建用户
  getUserMeta: '/user/create/meta',// 获取列表
  getUserEditInfo: '/user/edit/info',// 获取信息
  postUserEdit: '/user/edit',// 修改用户
  postReviewUser: '/user/review',// 审核
  postRemoveUser: '/user/remove',// 删除用户


  // ------------- 认证 接口
  getVerifyList: '/verify/list',// 获取列表
  postRemoveVerify: '/verify/remove',// 删除
  postReviewVerify: '/verify/review',// 审核
  // ------------- 员工 接口
  getPlayerList: '/player/list',// 获取列表
  postDeletePlayer: '/player/delete',// 删除
  postReviewPlayer: '/player/review',// 审核
  // ------------- 接单 接口
  getGainList: '/gain/list',// 获取列表
  postDeleteGain: '/gain/delete',// 删除
  postReviewGain: '/gain/review',// 审核
  // ------------- 佣金 接口
  getCommissionList: '/commission/list',// 获取列表
  postDeleteCommission: '/commission/delete',// 删除
  postReviewCommission: '/commission/review',// 审核
  postPaymentCommission: '/commission/payment',// 打款
  
  // ------------- 等级 接口
  getGradeList: '/grade/list',// 获取角色列表
  getGradeEditInfo: '/grade/edit/info',// 获取信息
  postGradeEdit: '/grade/edit',// 修改
  postGradeCreate: '/grade/create',// 创建角色
  postRemoveGrade: '/grade/remove',// 角色删除

  // ------------- 会员 接口
  getVipList: '/vip/list',// 获取角色列表
  getVipEditInfo: '/vip/edit/info',// 获取信息
  postVipEdit: '/vip/edit',// 修改
  postVipCreate: '/vip/create',// 创建角色
  postRemoveVip: '/vip/remove',// 角色删除


  // ------------- 项目 接口
  getProjectList: '/project/list',// 获取列表
  getProjectInfo: '/project/info',// 获取信息
  postProjectCreate: '/project/create',// 创建
  getProjectEditInfo: '/project/edit/info',// 获取信息
  postProjectEdit: '/project/edit',// 修改
  postRemoveProject: '/project/remove',// 删除
  postDeleteProject: '/project/delete',// 移入回收站
  postReductionProject: '/project/reduction',// 还原
  postReviewProject: '/project/review',// 审核
  postCheckAndAcceptProject: '/project/checkAndAccept',// 验收
  postPayDocumentAndModeProject: '/project/payDocumentAndMode',// 后面接入支付可以删除

  // ------------- 项目 接口
  getReservationList: '/reservation/list',// 获取列表
  getReservationInfo: '/reservation/info',// 获取信息
  postReservationCreate: '/reservation/create',// 创建
  getReservationEditInfo: '/reservation/edit/info',// 获取信息
  postReservationEdit: '/reservation/edit',// 修改
  postRemoveReservation: '/reservation/remove',// 删除
  postDeleteReservation: '/reservation/delete',// 移入回收站
  postReductionReservation: '/reservation/reduction',// 还原
  postReviewReservation: '/reservation/review',// 审核
  postCheckAndAcceptReservation: '/reservation/checkAndAccept',// 验收
  postPayDocumentAndModeReservation: '/reservation/payDocumentAndMode',// 后面接入支付可以删除
  

  // ------------- 订单 接口
  getOrderList: '/order/list',// 获取列表
  getOrderInfo: '/order/info',// 获取列表
  postRemoveOrder: '/order/remove',// 删除
  postReviewOrder: '/order/review',// 审核

  // ------------- 提现 接口
  getWithdrawList: '/withdraw/list',// 获取列表
  postRemoveWithdraw: '/withdraw/remove',// 删除
  postReviewWithdraw: '/withdraw/review',// 审核
  // ------------- 充值 接口
  getRechargeList: '/recharge/list',// 获取列表
  postRemoveRecharge: '/recharge/remove',// 删除
  postReviewRecharge: '/recharge/review',// 审核
  // ------------- 卡密 接口
  getCardList: '/card/list',// 获取列表
  postRemoveCard: '/card/remove',// 删除
  postCreateCard: '/card/create',// 审核
  // ------------- 积分 接口
  getIntegralList: '/integral/list',// 获取列表
  postDeleteIntegrale: '/integral/delete',// 删除
  // postReviewRecharge: '/integral/review',// 审核

  // ------------- 字典 接口
  getDictType: '/dict/type',// 获取

  // ------------- 勋章 接口
  getFlashList: '/flash/list',// 获取列表
  postFlashCreate: '/flash/create',// 创建
  getFlashEditInfo: '/flash/edit/info',// 获取编辑信息
  postFlashEdit: '/flash/edit',// 编辑
  postFlashDelete: '/flash/delete',// 删除
  postReviewFlash: '/flash/review',// 审核


  // ------------- 玩家 接口
  getArticleMeta: '/article/meta',// 获取列表
  getArticleList: '/article/list',// 获取列表
  getArticleInfo: '/article/info',// 获取信息
  postArticleCreate: '/article/create',// 创建
  getArticleEditInfo: '/article/edit/info',// 获取信息
  postArticleEdit: '/article/edit',// 修改
  postRemoveArticle: '/article/remove',// 删除
  postDeleteArticle: '/article/delete',// 移入回收站
  postReductionArticle: '/article/reduction',// 还原
  postReviewArticle: '/article/review',// 审核
  postAuthenticationArticle: '/article/authentication',// 审核

  // ------------- 文章 接口
  getArticleList: '/article/list',// 获取列表
  postArticleCreate: '/article/create',// 创建
  getArticleEditInfo: '/article/edit/info',// 获取信息
  postArticleEdit: '/article/edit',// 修改
  postRemoveArticle: '/article/remove',// 删除
  postDeleteArticle: '/article/delete',// 移入回收站
  postReductionArticle: '/article/reduction',// 还原
  postReviewArticle: '/article/review',// 审核
  // ------------- 话题 接口
  getPostList: '/post/list',// 获取列表
  postPostCreate: '/post/create',// 创建
  getPostEditInfo: '/post/edit/info',// 获取信息
  postPostEdit: '/post/edit',// 修改
  postRemovePost: '/post/remove',// 删除
  postDeletePost: '/post/delete',// 移入回收站
  postReductionPost: '/post/reduction',// 还原
  postReviewPost: '/post/review',// 审核
  postTopPost: '/post/top',// 审核
  // ------------- 连接 接口
  getLinkList: '/link/list',// 获取列表
  getLinkMeta: '/link/createMeta',// 获取列表
  postLinkCreate: '/link/create',// 创建
  getLinkEditInfo: '/link/edit/info',// 获取信息
  postLinkEdit: '/link/edit',// 修改
  postDeleteLink: '/link/delete',// 删除
  postRemoveLink: '/link/remove',// 移入回收站
  postReductionLink: '/link/reduction',// 还原
  postReviewLink: '/link/review',// 审核
  // ------------- 评论 接口
  getCommentList: '/comment/list',// 获取列表
  postRemoveComment: '/comment/remove',// 移入回收站
  postReductionComment: '/comment/reduction',// 还原
  postDeleteComment: '/comment/delete',// 删除
  postReviewComment: '/comment/review',// 审核
  // ------------- 举报 接口
  getReportList: '/report/list',// 获取列表
  postDeleteReport: '/report/delete',// 删除
  postReviewReport: '/report/review',// 审核
}
  export default api
  