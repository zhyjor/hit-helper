// import { useLocalStore, observer } from '@tarojs/mobx'
import useLogin from '../../hooks/useLogin';

import {
  Button,
  Avatar,
} from "@nutui/nutui-react-taro";
import "./index.less";

const My = () => {
  const [userInfo, login] = useLogin();

  /**
   * @description: 获取用户信息
   * @param {Object} detail onGetUserInfo 所返回的用户基本信息
   * @return null
   */
  const getUserInfo = ({ detail }) => {
    login(detail.userInfo);
  }

  return (
    <div className="myWrapper">
      <div className="myHeader">
        <div className="myHeaderInfo">
          <Avatar size="large" url={userInfo?.avatarUrl} />
          {
            userInfo ? (
              <span className='myHeaderNickName'>{userInfo?.nickName}</span>
            ) : (
              <Button
                openType='getUserInfo'
                onGetUserInfo={getUserInfo}
                type="primary"
                className='myHeaderLogin'
              >
                点击登录
              </Button>
            )

          }

        </div>
      </div>
      <div className="myInfoFoot">

      </div>
    </div>
  )
}

export default (My);
