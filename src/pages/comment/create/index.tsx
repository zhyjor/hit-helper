import { Component, useCallback, useEffect, useState } from "react";
import {
  Button,
  Input,
  TextArea,
  Notify,
} from "@nutui/nutui-react-taro";
import Taro, { cloud } from "@tarojs/taro";

import "./index.less";


const InputPost = () => {
  const $instance = Taro.getCurrentInstance();
  console.log($instance?.router?.params);
  const { postId, parentCommentId, receiverNickName } = $instance?.router?.params;


  const [plateType, setPlateType] = useState<Plate.PlateType>('help');
  const [plateTypeName, setPlateTypeName] = useState<string>('');

  const [body, setBody] = useState<string>('');

  useEffect(() => {
    const $instance = Taro.getCurrentInstance();
    console.log($instance?.router?.params);
    setPlateType($instance?.router?.params.plateType as any);
    setPlateTypeName($instance?.router?.params.plateTypeName as any);
  }, []);

  const submit = useCallback(async () => {
    const submitData: any = {
      body,
    };
    if (postId) submitData.postId = postId;
    if (parentCommentId) submitData.parentCommentId = parentCommentId;
    const data = await cloud.callFunction({
      name: 'router',
      data: {
        $url: 'commentCreate',
        data: submitData,
      }
    });
    // Notify.text(data.errMsg);
    console.log(data);
    if (data.result?.code === 200) {
      // Taro.navigateBack();
    } else {
      // Notify.text(data.errMsg);
    }
  }, [body])

  return (
    <div className="inputPostWrapper">
      <div className="inputPostWrapperInput">
        <TextArea
          className="inputPostTextArea"
          placeholder={receiverNickName ? `回复${receiverNickName}` : "输入内容"}
          onChange={(e) => {
            setBody(e);
          }}
          defaultValue={body}
        />
      </div>
      <div className="inputPostFooter">
        <Button onClick={() => { Taro.navigateBack(); }} className="inputPostCancel">取消</Button>
        <Button
          className="inputPostPublish"
          type="primary"
          onClick={submit}
          disabled={!(body)}
        >
          发布{plateTypeName}
        </Button>
      </div>
    </div>
  )
}

export default InputPost;
