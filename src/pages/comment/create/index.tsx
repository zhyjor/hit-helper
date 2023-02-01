import { Component, useCallback, useEffect, useState } from "react";
import {
  Button,
  Input,
  TextArea,
  Notify,
} from "@nutui/nutui-react-taro";
import Taro, { cloud } from "@tarojs/taro";
import Loading from "../../../components/Loading";
import useCloudFunction from "../../../hooks/useCloudFunction";

import "./index.less";


const InputPost = () => {
  const $instance = Taro.getCurrentInstance();
  const { postId, parentCommentId, receiverNickName, rootCommentId } = $instance?.router?.params;

  const [body, setBody] = useState<string>('');

  const { run, loading } = useCloudFunction({
    name: 'router', path: 'commentCreate', body: {
      body, postId, parentCommentId, rootCommentId,
    }, manual: true,
  });


  const [plateType, setPlateType] = useState<Plate.PlateType>('help');
  const [plateTypeName, setPlateTypeName] = useState<string>('');


  useEffect(() => {
    const $instance = Taro.getCurrentInstance();
    console.log($instance?.router?.params);
    setPlateType($instance?.router?.params.plateType as any);
    setPlateTypeName($instance?.router?.params.plateTypeName as any);
  }, []);

  const onSubmit = async () => {
    await run();
    Taro.navigateBack();
  }


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
          onClick={onSubmit}
          // loading={loading}
          disabled={!(body)}
        >
          发布{plateTypeName}
        </Button>
      </div>
      <Loading visible={loading} />
    </div>
  )
}

export default InputPost;
