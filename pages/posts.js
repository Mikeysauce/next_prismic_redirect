import React, { Component } from 'react'

export default class extends Component {
  static getInitialProps ({ query: { id } }) {
    console.log(id)
    if (id === "2" || id === 2) {
      console.log('match')
      return { postId: 'ROF'}
    }
    return { postId: id }
  }

  render () {
    return <div>
      <h1>My blog post #{this.props.postId}</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </div>
  }
}
