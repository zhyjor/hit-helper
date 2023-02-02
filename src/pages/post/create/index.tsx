import { useCallback, useEffect, useState } from "react";
import {
  Button,
  Input,
  TextArea,
} from "@nutui/nutui-react-taro";
import Taro, { cloud } from "@tarojs/taro";

import "./index.less";


const InputPost = () => {
  const [plateType, setPlateType] = useState<Plate.PlateType>('help');
  const [plateTypeName, setPlateTypeName] = useState<string>('');

  const [subject, setSubject] = useState<string>('');
  const [body, setBody] = useState<string>('');

  useEffect(() => {
    const $instance = Taro.getCurrentInstance();
    console.log($instance?.router?.params);
    setPlateType($instance?.router?.params.plateType as any);
    setPlateTypeName($instance?.router?.params.plateTypeName as any);
  }, []);

  const submit = useCallback(async () => {
    console.log({ subject, body });
    const data = await cloud.callFunction({
      name: 'router',
      data: {
        $url: 'postCreate',
        data: {
          subject, body, plateType, plateTypeName,
        }
      }
    });
    // Notify.text(data.errMsg);

    if (data.result?.code === 200) {
      Taro.navigateBack();
    } else {
      // Notify.text(data.errMsg);
    }
  }, [subject, body])

  return (
    <div className="inputPostWrapper">
      <div className="inputPostWrapperInput">
        <Input
          name="text"
          required
          // label="文本"
          placeholder="请输入标题"
          className="inputPostInput"
          onChange={(e) => {
            setSubject(e);
          }}
          defaultValue={subject}
        />
        <TextArea
          className="inputPostTextArea"
          placeholder="请输入内容"
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
          disabled={!(body && subject)}
        >
          发布{plateTypeName}
        </Button>
      </div>
    </div>
  )
}

export default InputPost;
