import React, { Component, useCallback, useEffect, useState } from "react";
import useCloudFunction from "../../hooks/useCloudFunction";
import {
  Button,
  Divider,
  Tag,
  Notify,
  Avatar,
} from "@nutui/nutui-react-taro";
import Taro from "@tarojs/taro";
import TextIcon from "../TextIcon";
import More from './More';

import "./index.less";

type IProps = {
  data: Post.PostItem;
  onRefresh?: () => void;
  onAttitude?: (e: { loading: boolean, error?: string }) => void;
  onFavorite?: (e: { loading: boolean, error?: string }) => void;
}
const Handler: React.FC<IProps> = (props) => {
  const { data, onRefresh, onAttitude, onFavorite } = props;
  const { error: errorAttitude, run: runAttitude, loading: loadingAttitude } = useCloudFunction<Post.PostItem>({ name: 'router', path: 'postAttitude', body: { id: data.id }, manual: true });
  const { error: errorFavorite, run: runFavorite, loading: loadingFavorite } = useCloudFunction<Post.PostItem>({ name: 'router', path: 'postFavorite', body: { id: data.id }, manual: true });

  const onAttitudeHandler = async () => {
    onAttitude && onAttitude({ loading: true });
    await runAttitude();
    onAttitude && onAttitude({ loading: false, error: errorAttitude });
  }

  const onFavoriteHandler = async () => {
    onFavorite && onFavorite({ loading: true });
    await runFavorite();
    onFavorite && onFavorite({ loading: false, error: errorAttitude });
  }

  return (
    <div className="cmtHandler">
      <div
        className="cmtHandlerComment"
        onClick={() => {
          Taro.navigateTo({ url: `/pages/comment/create/index?postId=${data?.id}` });
        }}
      >
        <TextIcon style={{ fontSize: 14, color: '#888' }} text="我要回复" icon="message" />
      </div>
      <div onClick={onAttitudeHandler}>
        <TextIcon active={data.attitude} text={data.attitudeUserList?.length > 0 ? data.attitudeUserList.length : undefined} style={{ fontSize: 16, color: '#888' }} icon="fabulous" />
      </div>
      <div onClick={onFavoriteHandler}>
        <TextIcon active={data.favorite} style={{ fontSize: 16, color: '#888' }} icon="s-follow" />
      </div>

      <div
        className="cmtHandlerShare"
      >
        <Button
          openType="share"
          className="shareButton"
        >
          <TextIcon style={{ fontSize: 16, color: '#888' }} icon="share-n" />
        </Button>
      </div>
      <div>
        <More onRefresh={onRefresh} data={data} />
      </div>
    </div>
  )
}

export default Handler;
