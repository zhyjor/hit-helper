import { Component } from "react";
import {
  Button,
  Cell,
  Input,
  TextArea,
} from "@nutui/nutui-react-taro";
import Taro from "@tarojs/taro";
import "./index.less";

const InputPost = () => {
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
        <Button className="inputPostPublish" type="primary">发布</Button>
      </div>
    </div>
  )
}

export default InputPost;
