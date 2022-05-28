import React, { useState } from 'react'
import { Layout, Button, Input, Space, Mentions } from 'antd'
import Nav from '../Nav'
import PhoneItem from '../PhoneFrame/PhoneItem'
import PhoneFrame from '../PhoneFrame'
import Designer from './Designer'
import { SketchPicker } from 'react-color'
import { useLocation } from 'react-router-dom'
import { RWebShare } from 'react-web-share'


const { Content, Footer } = Layout

const { Option } = Mentions;
const MOCK_DATA = {
  '@': ['Panny', 'Zoe', 'James'],
  '#': ['Facebook', 'Twitter', 'Youtube', 'Weibo'],
};

export default function Design(props) {

  const [prefix, setPrefix] = useState('@');

  const onSearch = (_, newPrefix) => {
    setPrefix(newPrefix);
  };

  const [link, setLink] = useState(0);
  const [lists, setLists] = useState(["a", "b"]);
  const listItems = lists.map((item) =>
    <li key="{item}">
      <PhoneItem link={item} />
    </li>
  );
  const [color, setColor] = useState('grey');
  const [img, setImg] = useState(`url("https://jrlinkhub.s3.ap-southeast-2.amazonaws.com/1.png")`);

  const location = useLocation();

  function handleClick() {
    setLists([...lists, link]);
    console.log("props " + location.state.portfolioName)
  }

  return (
    <Layout>
      <Nav />
      <Content style={{ width: '100%', display: 'flex' }}>
        <div style={{ paddingLeft: '10%', paddingTop: '1.5%' }}>
          <Input addonBefore='Portfolio Name ' defaultValue={location.state.portfolioName}></Input>
          <br />
          <br />
          <SketchPicker onChange={({ hex }) => { setColor(hex) }} />
          <br />
          <br />
          <div>
            <Input
              onChange={event => setLink(event.target.value)}
            />
            <Button
              onClick={handleClick}
            >add link</Button>
          </div>
          <br />
        </div>
        <PhoneFrame color={color} lists={lists} img={img} />
        <div style={{ paddingTop: '2%', paddingLeft: '10%', paddingRight:'5%'}}>
          <Mentions
            autosize
            style={{
              width: '150%',
              height: '30%'
            }}


            placeholder="input @ to mention people, # to mention tag"
            prefix={['@', '#']}
            onSearch={onSearch}
          >
            {(MOCK_DATA[prefix] || []).map((value) => (
              <Option key={value} value={value}>
                {value}
              </Option>
            ))}
          </Mentions>
          <Button style={{marginTop:'60%'}}>Save Page</Button>  
          <div style={{marginTop:'70%'}}>
          <RWebShare  
            data={{
              text: "Web Share - GfG",
              url: "http://connecttree.link",
              title: "GfG",
            }}
            onClick={() => console.log("shared successfully!")}
          >
            <Button>Share on Web</Button>
          </RWebShare>
          </div>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Linkhub ©2022 Copyright</Footer>
    </Layout>)
}
