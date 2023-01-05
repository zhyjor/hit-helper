export default defineAppConfig({
  pages: [
    'pages/layout/index',
    'pages/post/details/index', // 帖子详情
    'pages/post/create/index', // 发布帖子
    'pages/comment/index', // 评论列表
    'pages/comment/create/index', // 发布评论
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
})
