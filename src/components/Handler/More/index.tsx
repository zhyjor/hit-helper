import React, { useState } from "react";
import {
  Popup, Grid, GridItem, Dialog, Toast,
} from "@nutui/nutui-react-taro";
import Taro from "@tarojs/taro";

import useCloudFunction from "../../../hooks/useCloudFunction";
import TextIcon from "../../TextIcon";

import "./index.less";

type IProps = {
  data: Post.PostItem;
  onRefresh?: () => void;
}

const More: React.FC<IProps> = (props) => {
  const { data, onRefresh } = props;
  const [showNotify, setShowNotify] = useState(false);
  const [notifyStates, setNotifyStates] = useState({
    msg: '',
    type: 'danger',
    duration: 2
  });

  const changeNotify = (msg: string, type: string) => {
    const change = Object.assign(notifyStates, { msg, type })
    setNotifyStates(change);
  }

  const [visible, setVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const { run: essenceEdit } = useCloudFunction({ name: 'router', path: 'postEditEssence', body: { id: data.id }, manual: true });
  const { loading: deletedLoading, run: deletePost } = useCloudFunction({ name: 'router', path: 'postDeleted', body: { id: data.id }, manual: true });
  const onDeleteHandler = async () => {
    const [error] = await deletePost({ id: data.id });
    if (error) {
      changeNotify(error, 'error');
      setShowNotify(true);
    } else {
      setDeleteVisible(false);
      changeNotify('删除成功', 'success');
      setShowNotify(true);
      setTimeout(() => {
        Taro.navigateBack({
          delta: 2
        });
      }, 2000);
    }
  }

  const onEditHandler = () => {
    Taro.navigateTo({ url: `/pages/post/create/index?plateType=${data.plateType}&plateTypeName=${data.plateTypeName}&id=${data.id}` })
  }

  const onEssenceEdit = async () => {
    const [e] = await essenceEdit({ id: data.id, isEssence: !data.isEssence });
    if (e) {
      changeNotify(e, 'error');
      setShowNotify(true);
    } else {
      changeNotify(`${data.isEssence ? '取消加精' : '加精'}成功`, 'success');
      setShowNotify(true);
      onRefresh && onRefresh();
    }

  }

  return (
    <>
      <TextIcon
        onClick={() => { setVisible(true); }}
        style={{ fontSize: 16, color: '#888' }}
        icon="more-s" />
      <Toast
        visible={showNotify}
        msg={notifyStates.msg}
        duration={notifyStates.duration}
        type={notifyStates.type}
        onClose={() => {
          setShowNotify(false);
        }}
        onClick={() => {
          console.log('click')
        }}
      />
      <Dialog
        title="确认"
        visible={deleteVisible}
        okBtnDisabled={deletedLoading}
        onOk={() => { onDeleteHandler(); }}
        onCancel={() => setDeleteVisible(false)}
      >
        是否删除帖子？
      </Dialog>
      <Popup
        visible={visible}
        style={{ height: '30%' }}
        position="bottom"
        onClose={() => { setVisible(false) }}
      >
        <div className="morePopupWrapper">
          <div className="morePopupActions">
            <Grid border={false}>
              <GridItem onClick={onEditHandler} iconSize={20} icon="edit" text={<span className="morePopupActionsText">编辑</span>} />
              <GridItem onClick={() => { setDeleteVisible(true); setVisible(false); }} iconSize={20} icon="del" text={<span className="morePopupActionsText">删除</span>} />
              <GridItem
                iconSize={20}
                icon="addfollow"
                onClick={onEssenceEdit}
                text={<span className="morePopupActionsText">{data.isEssence ? '取消加精' : '加精'}</span>} />
            </Grid>
          </div>

          <div onClick={() => setVisible(false)} className="morePopupCancel">取消</div>
        </div>

      </Popup>
    </>
  );
}
export default More
