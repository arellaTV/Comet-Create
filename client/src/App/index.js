import React from 'react';
import Grid from 'react-grid-layout';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      layout: [
        {i: 'a', x: 0, y: 0, w: 8, h: 4, maxW: 8, maxH: 8},
        {i: 'b', x: 0, y: 4, w: 4, h: 4, maxW: 8, maxH: 8},
        {i: 'c', x: 4, y: 4, w: 4, h: 4, maxW: 8, maxH: 8}
      ]
    }

    this.updateLayout = this.updateLayout.bind(this);
  }

  getPage() {
    var app = this;
    fetch('/api/page')
      .then(response => response.json())
      .then(layout => app.setState({ layout }))
  }

  updateLayout(layout) {
    this.setState({ layout });
    console.log(this.state.layout);
  }

  render() {
    return (
      <div>
        <h1>Hello World</h1>
        <Grid className='layout' layout={this.state.layout}
        onLayoutChange={this.updateLayout} cols={8} rowHeight={80} width={640}
        verticalCompact={false}>
          <div key={'a'}>a</div>
          <div key={'b'}>b</div>
          <div key={'c'}>c</div>
        </Grid>
      </div>
    )
  }
}

export default App;
