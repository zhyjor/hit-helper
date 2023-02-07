
declare namespace Post {
  interface PostItem {
    body: string;
    createTime: string;
    commentCount: number;
    disableComment: boolean;
    isAnonymous: boolean;
    isDraft: boolean;
    nickName: string;
    subject: string;
    updateTime: string;
    id: string;
    isExtract: boolean; // 精华
    plateType: Plate.PlateType;
    plateTypeName: string;
    avatarUrl: string;
    attitude: boolean; // 点赞
    attitudeUserList: Array<User.SimpleUserInfo>;
    favorite: boolean; // 收藏
    favoriteUserList: Array<User.SimpleUserInfo>;
    viewCount: number;
    isEssence?: boolean;
    isDeleted?: boolean;
  }
}
