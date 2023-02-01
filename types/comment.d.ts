declare namespace Comment {
  interface CommentItem {
    id: string;
    body: string;
    createTime: string;
    OPENID: string;
    nickName: string;
    avatarUrl: string;
    approvalStatus: string;
    isAnonymous: string;
    isAuthor: string; // 楼主
    children: CommentItem[];
    floor: number;
    childrenCount: number;
    receiverOpenId: string;
    receiverNickName: string;
    receiverAvatarUrl: string;
    hasPower: boolean;
    hasEditPower: boolean; // 是否可编辑
    rootCommentId?: string; // 根评论ID
    parentCommentId: string;
    postId: string;
    attitude: boolean; // 点赞
    attitudeUserList: Array<User.SimpleUserInfo>;
  }
}
