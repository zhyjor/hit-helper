import { Button, Avatar } from "@nutui/nutui-react-taro";
import { useCallback, useMemo, useState } from "react";
import useLogin from '../../../hooks/useLogin';
import useCloudFunction from "../../../hooks/useCloudFunction";

import "./index.less";

const Edit = () => {
  const [userInfo] = useLogin();
  const [editInfo, setEditInfo] = useState<null | { nickName?: string, avatarUrl?: string }>(null);
  const { error, run, loading } = useCloudFunction<boolean>({ name: 'router', path: 'updateUserInfo', body: editInfo });

  const onSummit = useCallback(() => {
    console.log(editInfo);
    run();
  }, [editInfo]);

  const nickName = useMemo(() => {
    if (editInfo && editInfo.nickName) {
      return editInfo.nickName
    }
    return userInfo.nickName;
  }, [userInfo, editInfo]);

  const avatarUrl = useMemo(() => {
    if (editInfo && editInfo.avatarUrl) {
      return editInfo.avatarUrl
    }
    return userInfo.avatarUrl;
  }, [userInfo, editInfo]);

  const onChooseAvatar = (e) => {
    setEditInfo({ ...editInfo, avatarUrl: e.detail.avatarUrl });
  }
  const onNicknameChange = (e) => {
    setEditInfo({ ...editInfo, nickName: e.detail.value });
  }
  return (
    <div className="myEditWrapper">
      <div className="myEditHeader">
        <div className="myEditInfoItem">
          <Avatar className="avatar" url={avatarUrl} />
          <Button
            className="myEditInfoNicknameButton"
            open-type="chooseAvatar"
            onChooseAvatar={onChooseAvatar}
            size="small"
            type="primary"
          >
            使用微信头像
          </Button>
        </div>
        <div className="myEditInfoItem">
          <input
            value={nickName}
            type="nickname"
            defaultValue={nickName}
            placeholder="请输入昵称"
            onChange={onNicknameChange}
          />
        </div>
      </div>
      <div className="myEditFoot">
        <Button disabled={editInfo === null} type="primary" onClick={onSummit} className="myEditFootSummit">提交</Button>
      </div>
    </div>
  )
}

export default Edit;
