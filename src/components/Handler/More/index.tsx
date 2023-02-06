import React, { useState } from "react";
import {
  Popup, Grid, GridItem, Dialog,
} from "@nutui/nutui-react-taro";
import Taro from "@tarojs/taro";

import TextIcon from "../../TextIcon";

import "./index.less";

type IProps = {
}

const More: React.FC<IProps> = (props) => {
  const [visible, setVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const onDeleteHandler = () => {
    // Dialog.alert({
    //   title: '确认',
    //   content: '是否删除帖子？'
    // });
  }
  return (
    <>
      <TextIcon
        onClick={() => { setVisible(true); }}
        style={{ fontSize: 16, color: '#888' }}
        icon="more-s" />
      <Dialog
        title="组件调用"
        visible={deleteVisible}
        onOk={() => setDeleteVisible(false)}
        onCancel={() => setDeleteVisible(false)}
      >
        如果需要在弹窗内嵌入组件或其他自定义内容，可以使用组件调用的方式。
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
              <GridItem onClick={() => { Taro.navigateTo({ url: '/pages/post/create/index?plateType=help&plateTypeName=帮助' }) }} iconSize={20} icon="edit" text={<span className="morePopupActionsText">编辑</span>} />
              <GridItem onClick={() => { setDeleteVisible(true); setVisible(false); }} iconSize={20} icon="del" text={<span className="morePopupActionsText">删除</span>} />
              <GridItem iconSize={20} icon="addfollow" text={<span className="morePopupActionsText">加精</span>} />
            </Grid>
          </div>

          <div onClick={() => setVisible(false)} className="morePopupCancel">取消</div>
        </div>

      </Popup>
    </>
  );
}
export default More
