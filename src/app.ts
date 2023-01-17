import { useEffect } from 'react'
import Taro from '@tarojs/taro'

import './app.less'

const App = (props) => {
  useEffect(() => {
    Taro.cloud.init(
      {
        traceUser: true,
        // env: "hit-helper"
        env: "hit-helper-3g7q095q412bef1b"
      }
    );
  }, []);

  return props.children;
}
export default App
