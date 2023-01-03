import React from 'react'
import { Grid ,GridItem } from '@nutui/nutui-react-taro'

const Plate = () => {
  return (
     <Grid gutter={3}>
        <GridItem icon="dongdong" text="求助" />
        <GridItem icon="dongdong" text="帮助" />
    </Grid>
  )
}
export default Plate
