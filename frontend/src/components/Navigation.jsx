import React from 'react'

import NavigationButtonCard from './NavigationButtonCard'

export default class Navigation extends React.Component {
  state = {
    activeItem: '',
  }

  handleItemClick = e => {
    this.setState({ activeItem: e.target.name })
  }

  render() {
    const { activeItem } = this.state

    return (
      <div>
        <NavigationButtonCard
          linkActiveItem={activeItem}
          linkTo="/waiter"
          linkName="waiter"
          linkOnClick={this.handleItemClick}
        >
          <i class="user icon"></i>
        </NavigationButtonCard>
        <NavigationButtonCard
          linkActiveItem={activeItem}
          linkTo="/kitchen"
          linkName="kitchen"
          linkOnClick={this.handleItemClick}
        >
          <i class="food icon"></i>
        </NavigationButtonCard>
        <NavigationButtonCard
          linkActiveItem={activeItem}
          linkTo="/manager"
          linkName="manager"
          linkOnClick={this.handleItemClick}
        >
          <i class="spy icon"></i>
        </NavigationButtonCard>
      </div>
    )
  }
}