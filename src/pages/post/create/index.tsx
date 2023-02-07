import { useCallback, useEffect, useState } from "react";
import {
  Button,
  Input,
  TextArea,
} from "@nutui/nutui-react-taro";
import Taro, { cloud } from "@tarojs/taro";


import Loading from "../../../components/Loading";
import useCloudFunction from "../../../hooks/useCloudFunction";

import "./index.less";


const InputPost = () => {
  const $instance = Taro.getCurrentInstance();
  const plateType: Plate.PlateType = $instance?.router?.params.plateType as any;
  const plateTypeName = $instance?.router?.params.plateTypeName as any;
  const id = $instance?.router?.params.id;
  const { run: details, data, loading } = useCloudFunction<Post.PostItem>({ name: 'router', path: 'postDetails', body: { id }, manual: true });


  const [subject, setSubject] = useState<string>('');
  const [body, setBody] = useState<string>('');

  const fetchDetails = async () => {
    const [error, data] = await details({ id });
    if (data) {
      setBody(data.body);
      setSubject(data.subject);

    }

    if (error) console.log(error);
  }

  useEffect(() => {
    if (id) {
      fetchDetails();
    }
  }, [id]);

  const submit = useCallback(async () => {
    console.log({ subject, body });
    const data = await cloud.callFunction({
      name: 'router',
      data: {
        $url: 'postCreate',
        data: {
          subject, body, plateType, plateTypeName, id,
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
        {
          ((id && data) || !data) && (
            <>
              <Input
                name="text"
                required
                // label="文本"
                placeholder="请输入标题"
                className="inputPostInput"
                onChange={(e) => {
                  setSubject(e);
                }}
                defaultValue={data?.subject}
              />
              <TextArea
                className="inputPostTextArea"
                placeholder="请输入内容"
                onChange={(e) => {
                  setBody(e);
                }}
                defaultValue={data?.body}
              />
            </>
          )
        }

      </div>
      <div className="inputPostFooter">
        <Button onClick={() => { Taro.navigateBack(); }} className="inputPostCancel">取消</Button>
        <Button
          className="inputPostPublish"
          type="primary"
          onClick={submit}
          disabled={!(body && subject)}
        >
          {id ? `修改${plateTypeName}` : `发布${plateTypeName}`}
        </Button>
      </div>
      <Loading visible={loading} />
    </div>
  )
}

export default InputPost;
