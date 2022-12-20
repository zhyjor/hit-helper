import { Component } from "react";
import Taro from '@tarojs/taro'
import {
  Button,
  Cell,
  Avatar,
} from "@nutui/nutui-react-taro";
import "./index.less";

const Post = () => {
  return (
    <div className="postWrapper">
      <div className="postContent">
        <div className="postItem">
          <Avatar icon="addfollow" onActiveAvatar={() => { Taro.navigateTo({ url: '/pages/post/inputPost/index' }) }} size="large" bgColor="red" iconSize={16} color="#000" />
          <span className="postItemTxt">求助</span>
        </div>
        <div className="postItem">
          <Avatar icon="follow" onActiveAvatar={() => { Taro.navigateTo({ url: '/pages/post/inputPost/index' }) }} size="large" bgColor="rgb(253, 227, 207)" iconSize={16} color="#000" />
          <span className="postItemTxt">我有资源</span>
        </div>
        <div></div>
      </div>
    </div>
  )
}

export default Post;
