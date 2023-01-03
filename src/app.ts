import { useEffect } from 'react'
import Taro from '@tarojs/taro'

import './app.less'

const App = (props) => {
  useEffect(() => {
    Taro.cloud.init(
      {
        traceUser: true,
        env: "hit-helper"
      }
    );
  }, []);

  return props.children;
}
export default App
