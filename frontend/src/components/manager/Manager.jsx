import React from 'react'
import { Layout, Menu, Button, Tooltip } from 'antd'
import 'antd/dist/antd.css'

import './default.css'
import { ContentType } from './Constant'
import MenuItemModal from './MenuItemModal'
import CategoryModal from './CategoryModal'
import { fetchMenuApi } from '../apis/actions/menus'

const { Header, Content, Sider } = Layout
const { DASHBOARD, STAFFS, MENUS } = ContentType

class Manager extends React.Component {
  state = {
    openCategoryId: '',
    displayIndex: DASHBOARD,
    showMenuItemModal: false,
    showCategoryModal: false,
    currentParam: null,
    currentMenu: null,
  }

  //fetch data before rendering the component
  UNSAFE_componentWillMount = () => {
    this.onFetchCurrentMenu()
  }

  onSetCurrentMenu = data => {
    this.setState({
      currentMenu: data,
    })
  }

  onFetchCurrentMenu = async () => {
    await fetchMenuApi(this.props.restaurantId, this.onSetCurrentMenu)
  }

  renderMenuItem = category => {
    if (
      this.state.currentMenu === null ||
      this.state.currentMenu.menuItems.length === 0
    ) {
      return <div>add menuItem</div>
    }
    return (
      <div>
        {this.state.currentMenu.menuItems.map(item => {
          if (item.category._id === category._id) {
            return (
              <li key={item._id}>
                {item.name}
                <span>{item.price}</span>
              </li>
            )
          }
        })}
      </div>
    )
  }

  onOpenChange = clickId => {
    if (this.state.openCategoryId && this.state.openCategoryId === clickId)
      this.setState({ openCategoryId: '' })
    else this.setState({ openCategoryId: clickId })
  }

  handleMenuItemEdit = clickId => {
    // this.onOpenChange(clickId)
    this.setState({
      showMenuItemModal: true,
    })
  }

  onCloseMenuItemModal = () => {
    this.setState({
      showMenuItemModal: false,
    })
  }

  handleCategoryEdit = () => {
    this.setState({
      showCategoryModal: true,
    })
  }

  onCloseCategoryModal = () => {
    this.setState({
      showCategoryModal: false,
    })
  }

  renderCategories = () => {
    if (
      this.state.currentMenu === null ||
      this.state.currentMenu.categories.length === 0
    ) {
      return (
        <div className="ui floating message menu-tips">
          <p>Create your first category</p>
        </div>
      )
    }
    return this.state.currentMenu.categories.map(item => (
      <div className="menu-content" key={item._id}>
        <label>{item.name}</label>
        <Tooltip
          placement="topLeft"
          title="display all menu items"
          arrowPointAtCenter
        >
          <span className="right" onClick={() => this.onOpenChange(item._id)}>
            {this.state.openCategoryId === item._id ? (
              <i className="clickable chevron up icon" />
            ) : (
              <i className="clickable chevron down icon" />
            )}
          </span>
        </Tooltip>
        <Tooltip
          placement="topLeft"
          title="create a menu item"
          arrowPointAtCenter
        >
          <span
            className="right"
            onClick={() => this.handleMenuItemEdit(item._id)}
          >
            <i className="clickable plus circle icon"></i>
          </span>
        </Tooltip>
        <Tooltip
          placement="topLeft"
          title="change the category"
          arrowPointAtCenter
        >
          <span
            className="right"
            onClick={() => {
              this.setState({ currentParam: item })
              this.handleCategoryEdit()
            }}
          >
            <i className="clickable pencil alternate icon"></i>
          </span>
        </Tooltip>
        {this.state.openCategoryId === item._id && this.renderMenuItem(item)}
      </div>
    ))
  }

  renderMenuBuilder = () => {
    if (this.state.currentMenu === {}) {
      return <div>Create your menu</div>
    }
    return (
      <div className="menu-builder">
        <h1>Edit your menu: {this.state.currentMenu.name}</h1>
        <div className="menu-segment">{this.renderCategories()}</div>
        <Button
          type="primary"
          shape="round"
          className="button"
          onClick={() => {
            this.setState({
              currentParam: null,
            })
            this.handleCategoryEdit()
          }}
        >
          New Category
        </Button>
      </div>
    )
  }

  renderContent = () => {
    if (this.state.displayIndex === DASHBOARD) {
      return <div>Report</div>
    }
    if (this.state.displayIndex === STAFFS) {
      return <div>staff</div>
    }
    if (this.state.displayIndex === MENUS) {
      return <div>{this.renderMenuBuilder()}</div>
    }
  }

  render() {
    const { restaurantId } = this.props
    return (
      <Layout>
        <MenuItemModal
          visible={this.state.showMenuItemModal}
          onCancel={this.onCloseMenuItemModal}
          restaurantId={restaurantId}
          currentParam={this.state.currentParam}
          onFetchCurrentMenu={this.onFetchCurrentMenu}
        />
        <CategoryModal
          visible={this.state.showCategoryModal}
          onCancel={this.onCloseCategoryModal}
          restaurantId={restaurantId}
          currentParam={this.state.currentParam}
          onFetchCurrentMenu={this.onFetchCurrentMenu}
        />
        <Header className="header">
          <h1>Hi, Manager! How do you feel today?</h1>
        </Header>
        <Layout>
          <Sider>
            <Menu className="sider-menu">
              <Menu.Item
                onClick={() => this.setState({ displayIndex: DASHBOARD })}
              >
                <i className="chart pie icon"></i>
                Dashboard
              </Menu.Item>
              <Menu.Item
                onClick={() => this.setState({ displayIndex: STAFFS })}
              >
                <i className="users icon"></i>
                Staff
              </Menu.Item>
              <Menu.Item onClick={() => this.setState({ displayIndex: MENUS })}>
                <i className="list icon"></i>
                Menu
              </Menu.Item>
            </Menu>
          </Sider>
          <Content className="content">
            <div className="container">{this.renderContent()}</div>
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default Manager
