import Taro from '@tarojs/taro'
import {
  Avatar,
} from "@nutui/nutui-react-taro";
import "./index.less";

const Post = () => {
  return (
    <div className="postWrapper">
      <div className="postContent">
        <div className="postItem">
          <Avatar icon="addfollow" onActiveAvatar={() => { Taro.navigateTo({ url: '/pages/post/create/index?plateType=askForHelp&plateTypeName=求助' }) }} size="large" bgColor="red" iconSize={16} color="#000" />
          <span className="postItemTxt">求助</span>
        </div>
        <div className="postItem">
          <Avatar icon="follow" onActiveAvatar={() => { Taro.navigateTo({ url: '/pages/post/create/index?plateType=help&plateTypeName=帮助' }) }} size="large" bgColor="rgb(253, 227, 207)" iconSize={16} color="#000" />
          <span className="postItemTxt">帮助</span>
        </div>
        <div></div>
      </div>
    </div>
  )
}

export default Post;
