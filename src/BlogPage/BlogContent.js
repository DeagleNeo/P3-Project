import { Avatar, List, Space } from 'antd';
import React from 'react';
import {StarOutlined,LikeOutlined,MessageOutlined} from '@ant-design/icons'
const data = Array.from({
  length: 23,
}).map((_, i) => ({
  href: 'https://ant.design',
  title: `Linkhub Blog Part ${i}`,
  avatar: 'https://joeschmoe.io/api/v1/random',
  description:
    'Linkhub build up connection between your social medias.',
  content:
    'We are aiming at social influence and public relations by providing a creative design platorm. Once you build a personal profile here, you will have more opportunities to get attention.',
}));

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const BlogContent = () => (
  <List
    itemLayout="vertical"
    size="large"
    pagination={{
      onChange: (page) => {
        console.log(page);
      },
      pageSize: 3,
    }}
    dataSource={data}
    footer={
      <div>
      </div>
    }
    renderItem={(item) => (
      <List.Item 
        key={item.title}
        actions={[
          <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
          <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
          <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
        ]}
        extra={
          <img
            width={272}
            alt="logo"
            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
          />
        }
      >
        <List.Item.Meta
          avatar={<Avatar src={item.avatar} />}
          title={<a href={item.href}>{item.title}</a>}
          description={item.description}
        />
        {item.content}
      </List.Item>
    )}
  />
);

export default BlogContent;