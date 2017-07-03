import React from 'react'
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import Fish from './Fish'

import base from '../base'
import fishes from '../sample-fishes'

class App extends React.Component {
  constructor() {
    super()
    this.addFish = this.addFish.bind(this)
    this.loadSamples = this.loadSamples.bind(this)
    this.addToOrder = this.addToOrder.bind(this)

    this.state = {
      fishes: {},
      order: {}
    }
  }

  componentWillMount() {
    this.ref = base.syncState(`${this.props.params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    })
  }

  componentWillUnmount() {
    base.removeBinding(this.ref)
  }

  addFish(fish) {
    // copy state
    const fishes = {...this.state.fishes}

    // add new fish
    const timestamp = Date.now()
    fishes[`fish-${timestamp}`] = fish

    // set state
    this.setState({fishes})
  }

  loadSamples() {
    this.setState({fishes})
  }

  addToOrder(key) {
    const order = {...this.state.order}
    order[key] = order[key] + 1 || 1
    this.setState({order})
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="list-of-fishes">
            {
              Object
                .keys(this.state.fishes)
                .map(key => <Fish key={key} idx={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />)
            }
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order} />
        <Inventory addFish={this.addFish} loadSamples={this.loadSamples} />
      </div>
    )
  }
}

export default App
