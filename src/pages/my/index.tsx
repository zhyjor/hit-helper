import { useEffect, useState } from 'react';
import useLogin from '../../hooks/useLogin';
import useCloudFunction from "../../hooks/useCloudFunction";

import {
  Button,
  Avatar,
  Icon,
} from "@nutui/nutui-react-taro";
import Taro from '@tarojs/taro';
import List from './list';
import AdvanceScrollView from '../../components/AdvanceScrollView';

import "./index.less";

const PAGESIZE = 10;

const checkHasMore = (pageNo, total) => {
  return pageNo * PAGESIZE < total;
}

const My = () => {
  const [selectKey, setSelectKey] = useState<Feature.TabKey>('mine');
  const [userInfo, login] = useLogin();
  const [list, setList] = useState<Post.PostItem[]>([])
  const [hasMore, setHasMore] = useState(true);
  const [pageNo, setPageNo] = useState(1);
  const { run: fetList, loading } = useCloudFunction<Base.Page<Post.PostItem>>({ manual: true, name: 'router', path: 'postList', body: { pageNo, pageSize: 10, mine: selectKey === 'mine', favorite: selectKey === 'favorite' } });


  useEffect(() => {
    onRefresherRefresh();
  }, [selectKey]);

  /**
   * @description: 获取用户信息
   * @param {Object} detail onGetUserInfo 所返回的用户基本信息
   * @return null
   */
  const getUserInfo = ({ detail }) => {
    login(detail.userInfo);
  }

  const onRefresherRefresh = async () => {
    if (loading) return;
    setList([]);
    const [e, data] = await fetList({ pageNo: 1, pageSize: PAGESIZE, mine: selectKey === 'mine', favorite: selectKey === 'favorite' });
    console.log(data);
    if (data) {
      setList(data?.list!);
      setPageNo(data.pageNo);
      setHasMore(checkHasMore(data.pageNo, data.total));
    }
  }

  const onReachBottomHandler = async () => {
    if (loading || !hasMore) return;
    const [e, data] = await fetList({ pageNo: pageNo + 1, pageSize: PAGESIZE, mine: selectKey === 'mine', favorite: selectKey === 'favorite' });
    console.log(data);
    if (data) {
      setHasMore(checkHasMore(data.pageNo, data.total));
      setPageNo(data.pageNo);
      const _list = list.concat(data.list ?? []);
      console.log(_list);
      setList(_list);
    }
  }

  const onTabChangeHandler = (e) => {
    setSelectKey(e);
  }

  return (
    <div className="myWrapper">
      <AdvanceScrollView
        hasMore={hasMore}
        className='myScroll'
        onLoadMore={onReachBottomHandler}
        onRefresh={onRefresherRefresh}
      >
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
          <div className="myHeaderEdit" onClick={() => {
            Taro.navigateTo({ url: '/pages/my/edit/index' });
          }}>
            <div>
              编辑
            </div>
            <Icon name="right" />
          </div>
        </div>
        <div className="myInfoFoot">
          <List list={list} tabKey={selectKey} onTabChange={onTabChangeHandler} />
        </div>
      </AdvanceScrollView>
    </div>
  )
}

export default (My);
