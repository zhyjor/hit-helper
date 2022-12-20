import { Component } from "react";
import {
  Button,
  Cell,
} from "@nutui/nutui-react-taro";
import "./index.less";

class Index extends Component<PropsWithChildren> {
  constructor(props: any) {
    super(props);
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <Button type="primary" className="btn">
        NutUI React Button My
      </Button>
    );
  }
}
export default Index
