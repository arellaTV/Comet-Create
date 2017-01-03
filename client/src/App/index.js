import React from 'react';
import Grid from 'react-grid-layout';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      layout: []
    }

    this.updateLayout = this.updateLayout.bind(this);
  }

  componentDidMount() {
    this.getPage();
  }

  getPage() {
    var app = this;
    fetch('/api/page')
      .then(response => response.json())
      .then(layout => {
        console.log(layout);
        app.setState({ layout });
      });
  }

  postPage(layout) {
    var app = this;
    var body = { layout }
    fetch('/api/page', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(layout => app.setState({ layout }))
  }

  updateLayout(layout) {
    this.postPage(layout);
  }

  render() {
    return (
      <div>
        <h1>Hello World</h1>
        <Grid className='layout' layout={this.state.layout}
        onLayoutChange={this.updateLayout} cols={8} rowHeight={80} width={640}>
          {this.state.layout.map(panel => {
            return (
              <div key={panel.i}>{panel.i}</div>
            )
          })}
        </Grid>
      </div>
    )
  }
}

export default App;
