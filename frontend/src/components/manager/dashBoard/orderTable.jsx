import React, { Component } from 'react'
import { groupBy } from '../../Waiter/Dishes'
import { Button, Modal, Table } from 'antd'
import { numberWithCommas } from './totalSale'

class OrderTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      groupByOrder: new Map(),
      detailVisible: {},
      orders: [],
    }
    this.itemColums = [
      {
        title: 'Dish',
        dataIndex: 'name',
        key: 'name',
        fixed: 'left',
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        render: price => `$${numberWithCommas(price)}`,
      },
      {
        title: 'Cooked By',
        dataIndex: 'cookedBy',
        key: 'cookedBy',
      },
      {
        title: 'Cooked At',
        dataIndex: 'readyTime',
        key: 'readyTime',
      },
      {
        title: 'Served By',
        dataIndex: 'servedBy',
        key: 'servedBy',
      },
      {
        title: 'Served At',
        dataIndex: 'serveTime',
        key: 'serveTime',
        fixed: 'right',
      },
    ]
    this.columns = [
      {
        title: 'Order Id',
        dataIndex: 'orderId',
        key: 'orderId',
      },
      {
        title: 'Table',
        dataIndex: 'tableId',
        key: 'tableId',
      },
      {
        title: 'Served At',
        dataIndex: 'serveTime',
        key: 'serveTime',
        defaultSortOrder: 'descend',
        sorter: (a, b) => new Date(a.serveTime) - new Date(b.serveTime),
      },
      {
        title: 'Total Price',
        dataIndex: 'totalPrice',
        key: 'totalPrice',
        render: price => `$${numberWithCommas(price)}`,
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.totalPrice - b.totalPrice,
      },
      {
        title: 'Action',
        key: 'action',
        render: order => (
          <div>
            <Button
              type="primary"
              onClick={() => this.toggleShowDetail(order.orderId)}
            >
              Detail
            </Button>
            <Modal
              title={order.orderId}
              visible={this.state.detailVisible[order.orderId]}
              onOk={() => this.toggleShowDetail(order.orderId)}
              onCancel={() => this.toggleShowDetail(order.orderId)}
              okText="OK"
              width={700}
            >
              <Table
                columns={this.itemColums}
                dataSource={this.state.groupByOrder.get(order.orderId)}
                scroll={{ x: 800 }}
                pagination={{ pageSize: 3 }}
              />
            </Modal>
          </div>
        ),
      },
    ]
  }

  setData() {
    const { data } = this.props
    // console.log(this.props)

    const groupByOrder = groupBy(data, 'order')
    let detailVisible = {}
    let orders = []
    for (let [orderId, orderItems] of groupByOrder) {
      detailVisible[orderId] = false
      let totalPrice = orderItems.map(_ => _.price).reduce((a, b) => a + b, 0)
      let order = {
        key: orderId,
        orderId,
        tableId: orderItems[0].placedBy,
        serveTime: orderItems[orderItems.length - 1].serveTime,
        totalPrice,
      }
      orders.push(order)
    }

    this.setState({ groupByOrder, detailVisible, orders })
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) this.setData()
  }

  toggleShowDetail = orderId => {
    let detailVisible = { ...this.state.detailVisible }
    detailVisible[orderId] = !detailVisible[orderId]
    this.setState({ detailVisible })
  }

  render() {
    const { orders } = this.state
    const columns = this.columns
    return (
      <Table
        columns={columns}
        dataSource={orders}
        pagination={{ pageSize: 7 }}
      />
    )
  }
}

export default OrderTable
