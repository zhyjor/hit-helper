import { getStorageSync, cloud } from '@tarojs/taro';
import { useState, useEffect } from 'react';

type UserInfo = {
  nickName: string;
  openId: string;
}

const useLogin = () => {
  let [userInfo, setUserInfo] = useState<Partial<UserInfo>>({});

  useEffect(() => {
    getCloudInfo();
  }, []);

  const login = (e) => {
    if (e) {
      let _userInfo = Object.assign({}, userInfo, e);
      setUserInfo(_userInfo);
      cloud.callFunction({
        name: 'router',
        data: {
          $url: 'saveUserInfo',
          data: _userInfo
        }
      });
    }
  };

  const readInfo = () => {
    const localUserInfo = getStorageSync('userInfo');
    const _userInfo = Object.assign({}, userInfo, localUserInfo);
    setUserInfo(_userInfo);
  }

  const getCloudInfo = () => {
    cloud
      .callFunction({
        name: 'router',
        data: {
          $url: 'login'
        }
      })
      .then((res: any) => {
        console.log({ res });
        const cloudUserInfo = res.result.data || {};
        const _userInfo = Object.assign({}, userInfo, cloudUserInfo);
        setUserInfo(_userInfo);
      });
  }
  return [userInfo, login as any];
}
export default useLogin;
