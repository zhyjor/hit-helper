import { Component, useEffect, useState } from "react";
import {
  Button,
  Cell,
  Input,
  TextArea,
} from "@nutui/nutui-react-taro";
import Taro from "@tarojs/taro";
import "./index.less";

type PlateType = 'help' | 'askForHelp';

const InputPost = () => {
  const [plateType, setPlateType] = useState<PlateType>('help');
  useEffect(() => {
   const $instance = Taro.getCurrentInstance();
   console.log($instance?.router?.params);
   setPlateType($instance?.router?.params.plateType as any);
  }, []);
  return (
    <div className="inputPostWrapper">
      <div className="inputPostWrapperInput">
        <Input
          name="text"
          required
          // label="文本"
          placeholder="请输入标题"
          className="inputPostInput"
        // defaultValue={state.text}
        />
        <TextArea className="inputPostTextArea" placeholder="请输入内容" />
      </div>
      <div className="inputPostFooter">
        <Button onClick={() => { Taro.navigateBack(); }} className="inputPostCancel">取消</Button>
        <Button className="inputPostPublish" type="primary">发布{plateType === 'askForHelp' ? '求助' : '帮助'}</Button>
      </div>
    </div>
  )
}

export default InputPost;
