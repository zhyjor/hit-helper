
declare namespace Post {
  interface PostItem {
    body: string;
    createTime: string;
    disableComment: boolean;
    isAnonymous: boolean;
    isDraft: boolean;
    nickName: string;
    subject: string;
    updateTime: string;
    _id: string;
    isExtract: boolean; // 精华
    plateType: Plate.PlateType;
    plateTypeName: string;
    avatarUrl: string;
  }
}
