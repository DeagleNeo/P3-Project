import React, { useState } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Tree } from 'antd';
const treeData = [
  {
    "id": 1,
    "title": "首页",
    "key": "/home",
    "pagepermisson": 1,
    "grade": 1,
    "children": []
  },
  {
    "id": 2,
    "title": "用户管理",
    "key": "/user-manage",
    "pagepermisson": 1,
    "grade": 1,
    "children": [
      {
        "id": 3,
        "title": "添加用户",
        "rightId": 2,
        "key": "/user-manage/add",
        "grade": 2
      },
      {
        "id": 4,
        "title": "删除用户",
        "rightId": 2,
        "key": "/user-manage/delete",
        "grade": 2
      },
      {
        "id": 5,
        "title": "修改用户",
        "rightId": 2,
        "key": "/user-manage/update",
        "grade": 2
      },
      {
        "id": 6,
        "title": "用户列表",
        "rightId": 2,
        "key": "/user-manage/list",
        "pagepermisson": 1,
        "grade": 2,
        "pagepermission": 0
      }
    ]
  },
  {
    "id": 7,
    "title": "权限管理",
    "key": "/right-manage",
    "pagepermisson": 1,
    "grade": 1,
    "children": [
      {
        "id": 8,
        "title": "角色列表",
        "rightId": 7,
        "key": "/right-manage/role/list",
        "pagepermisson": 1,
        "grade": 2
      },
      {
        "id": 9,
        "title": "权限列表",
        "rightId": 7,
        "key": "/right-manage/right/list",
        "pagepermisson": 1,
        "grade": 2
      },
      {
        "id": 10,
        "title": "修改角色",
        "rightId": 7,
        "key": "/right-manage/role/update",
        "grade": 2
      },
      {
        "id": 11,
        "title": "删除角色",
        "rightId": 7,
        "key": "/right-manage/role/delete",
        "grade": 2
      },
      {
        "id": 12,
        "title": "修改权限",
        "rightId": 7,
        "key": "/right-manage/right/update",
        "grade": 2
      },
      {
        "id": 13,
        "title": "删除权限",
        "rightId": 7,
        "key": "/right-manage/right/delete",
        "grade": 2
      }
    ]
  },
  {
    "id": 14,
    "title": "新闻管理",
    "key": "/news-manage",
    "pagepermisson": 1,
    "grade": 1,
    "children": [
      {
        "id": 15,
        "title": "新闻列表",
        "rightId": 14,
        "key": "/news-manage/list",
        "grade": 2
      },
      {
        "id": 16,
        "title": "撰写新闻",
        "rightId": 14,
        "key": "/news-manage/add",
        "grade": 2,
        "pagepermisson": 1
      },
      {
        "id": 17,
        "title": "新闻更新",
        "rightId": 14,
        "key": "/news-manage/update/:id",
        "grade": 2,
        "routepermisson": 1
      },
      {
        "id": 18,
        "title": "新闻预览",
        "rightId": 14,
        "key": "/news-manage/preview/:id",
        "grade": 2,
        "routepermisson": 1
      },
      {
        "id": 19,
        "title": "草稿箱",
        "rightId": 14,
        "key": "/news-manage/draft",
        "pagepermisson": 1,
        "grade": 2
      },
      {
        "id": 20,
        "title": "新闻分类",
        "rightId": 14,
        "key": "/news-manage/category",
        "pagepermisson": 1,
        "grade": 2
      }
    ]
  },
  {
    "id": 21,
    "title": "审核管理",
    "key": "/audit-manage",
    "pagepermisson": 1,
    "grade": 1,
    "children": [
      {
        "id": 22,
        "title": "审核新闻",
        "rightId": 21,
        "key": "/audit-manage/audit",
        "pagepermisson": 1,
        "grade": 2
      },
      {
        "id": 23,
        "title": "审核列表",
        "rightId": 21,
        "key": "/audit-manage/list",
        "pagepermisson": 1,
        "grade": 2
      }
    ]
  },
  {
    "id": 24,
    "title": "发布管理",
    "key": "/publish-manage",
    "pagepermisson": 1,
    "grade": 1,
    "children": [
      {
        "id": 25,
        "title": "待发布",
        "rightId": 24,
        "key": "/publish-manage/unpublished",
        "pagepermisson": 1,
        "grade": 2
      },
      {
        "id": 26,
        "title": "已发布",
        "rightId": 24,
        "key": "/publish-manage/published",
        "pagepermisson": 1,
        "grade": 2
      },
      {
        "id": 27,
        "title": "已下线",
        "rightId": 24,
        "key": "/publish-manage/sunset",
        "pagepermisson": 1,
        "grade": 2
      }
    ]
  }
]

const Demo = () => {
    const [expandedKeys, setExpandedKeys] = useState(['0-0-0', '0-0-1']);
    const [checkedKeys, setCheckedKeys] = useState(['0-0-0']);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [autoExpandParent, setAutoExpandParent] = useState(true);
  
    const onExpand = (expandedKeysValue) => {
      console.log('onExpand', expandedKeysValue); // if not set autoExpandParent to false, if children expanded, parent can not collapse.
      // or, you can remove all expanded children keys.
  
      setExpandedKeys(expandedKeysValue);
      setAutoExpandParent(false);
    };
  
    const onCheck = (checkedKeysValue) => {
      console.log('onCheck', checkedKeysValue);
      setCheckedKeys(checkedKeysValue);
    };
  
    const onSelect = (selectedKeysValue, info) => {
      console.log('onSelect', info);
      setSelectedKeys(selectedKeysValue);
    };
  
    return (
      <Tree
        checkable
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        onCheck={onCheck}
        checkedKeys={checkedKeys}
        onSelect={onSelect}
        selectedKeys={selectedKeys}
        treeData={treeData}
      />
    );
  };
  
  export default Demo;