import React, { useEffect, useRef, useState } from "react";
import { Avatar, Card, Col, Drawer, List, Row } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import axios from "axios";
import * as echarts from "echarts";
import _ from "lodash";

const { Meta } = Card;

export default function Home() {
  const [viewList, setViewList] = useState([]);
  const [starList, setStarList] = useState([]);
  const [allList, setAllList] = useState([])
  const [visible, setvisible] = useState(false);
  const barRef = useRef();
  const pieRef = useRef();
  const [pieChart, setPieChart] = useState(null)
  useEffect(() => {
    axios
      .get(
        "/news?publishState=2&_expand=category&_sort=view&_order=desc&_limit=6"
      )
      .then((res) => {
        // console.log(res.data)
        setViewList(res.data);
      })
  }, []);

  useEffect(() => {
    axios
      .get(
        "/news?publishState=2&_expand=category&_sort=star&_order=desc&_limit=6"
      )
      .then((res) => {
        // console.log(res.data)
        setStarList(res.data);
      });
  }, []);

  useEffect(() => {
    axios.get("/news?publishState=2&_expand=category").then((res) => {
      // console.log(_.groupBy(res.data, item=>item.category.title))
      renderBarView(_.groupBy(res.data, (item) => item.category.title));
      setAllList(res.data)
    });

    return () => {
      window.onresize = null;
    };
  }, []);

  const renderBarView = (obj) => {
    
    var myChart = echarts.init(barRef.current);

    // 指定图表的配置项和数据
    var option = {
      title: {
        text: "新闻分类图示",
      },
      tooltip: {},
      legend: {
        data: ["数量"],
      },
      xAxis: {
        data: Object.keys(obj),
        axisLabel: {
          rotate: "45",
          interval: 0,
        },
      },
      yAxis: {
        minInterval: 1,
      },
      series: [
        {
          name: "数量",
          type: "bar",
          data: Object.values(obj).map((item) => item.length),
        },
      ],
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

    window.onresize = () => {
      myChart.resize();
    };
  };

  const renderPieView = (obj) => {
    //数据处理

    let currentList = allList.filter(item=>item.author===username)
    let groupObj = _.groupBy(currentList, item=>item.category.title)
    let list = []
    for (let i in groupObj){
      list.push({
        name:i,
        value:groupObj[i].length
      })
    }
    console.log(list)

    let myChart
    if(!pieChart){
      myChart = echarts.init(pieRef.current)
      setPieChart(myChart)
    }else{
      myChart = pieChart
    }

    var option = {
      title: {
        text: "当前用户新闻分类图示",
        // subtext: "Fake Data",
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        left: "left",
      },
      series: [
        {
          name: "发布数量",
          type: "pie",
          radius: "50%",
          data: list,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };

    option && myChart.setOption(option);
  };

  const {
    username,
    region,
    role: { roleName },
  } = JSON.parse(localStorage.getItem("token"));

  return (
    <div className="site-card-wrapper">
      <Row gutter={16}>
        <Col span={8}>
          <Card title="用户最长浏览" bordered={true}>
            <List
              size="large"
              // header={<div>Header</div>}
              // footer={<div>Footer</div>}
              // bordered
              dataSource={viewList}
              renderItem={(item) => (
                <List.Item>
                  <a href={`#/news-manage/preview/${item.id}`}>{item.title}</a>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="用户点赞最多" bordered={true}>
            <List
              size="large"
              // header={<div>Header</div>}
              // footer={<div>Footer</div>}
              // bordered
              dataSource={starList}
              renderItem={(item) => (
                <List.Item>
                  <a href={`#/news-manage/preview/${item.id}`}>{item.title}</a>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            // style={{width: 300}}
            cover={
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
            }
            actions={[
              <SettingOutlined
                key="setting"
                // setTimeout does not work here, whereas async-await works
                onClick={async () => {
                  await setvisible(true)
                  renderPieView()              
              }}
              />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Meta
              avatar={
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              }
              title={username}
              description={
                <div>
                  <b>{region ? region : "全球"}</b>
                  <span
                    style={{
                      paddingLeft: "30px",
                    }}
                  >
                    {roleName}
                  </span>
                </div>
              }
            />
          </Card>
        </Col>
      </Row>

      <Drawer
        width="500px"
        title="个人新闻分类"
        placement="right"
        onClose={() => {
          setvisible(false);
        }}
        visible={visible}
      >
        <div
          ref={pieRef}
          style={{
            width: "100%",
            height: "400px",
            marginTop: "30px",
          }}
        ></div>
      </Drawer>

      <div
        ref={barRef}
        style={{
          width: "100%",
          height: "400px",
          marginTop: "30px",
        }}
      ></div>
    </div>
  );
}
