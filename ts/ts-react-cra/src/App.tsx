import React from 'react';
import { Route, Link } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import Employee from './employee'

import './App.css'

const { Header, Content, Footer } = Layout

const App: React.FC = ({ match }: any) => {
  const defaultKey = match.url.replace('/', '') || 'employee'
  return (
    <Layout>
      <Header>
        <Menu
          className="menu"
          mode="horizontal"
          theme="dark"
          defaultSelectedKeys={[defaultKey]}
        >
          <Menu.Item key="employee">
            <Link to="/employee">员工管理</Link>
          </Menu.Item>
          <Menu.Item key="setting">
            <Link to="/setting">系统设置</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content className="contentWrap">
        <div className="content">
          <Route path="/" exact component={Employee} />
          <Route path="/employee" component={Employee} />
          <Route path="/setting" />
        </div>
      </Content>
      <Footer className="footer">Hello TypeScript</Footer>
    </Layout>
  );
}

export default App;
