import React from 'react';
import Grid from 'react-grid-layout';

class App extends React.Component {
  constructor(props) {
    super(props);
    var width = window.outerWidth / 2 - 9;
    var rowHeight = width / 15;
    this.state = {
      layout: [],
      images: {},
      width,
      rowHeight,
    }

    this.updateLayout = this.updateLayout.bind(this);
  }

  componentDidMount() {
    this.getPage();
    window.addEventListener("resize", () => {
      var width = window.outerWidth / 2 - 9;
      var rowHeight = width / 15;
      this.setState({
        width,
        rowHeight
      })
    })
  }

  getPage() {
    var app = this;
    fetch('/api/page')
      .then(response => response.json())
      .then(page => {
        app.setState(page);
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
        onLayoutChange={this.updateLayout} cols={8}
        rowHeight={this.state.rowHeight} width={this.state.width}
        style={{ width: this.state.width }}>
          {this.state.layout.map(panel => {
            let image = this.state.images[panel.i];
            let image_src = '';
            let image_style = {};
            if (image) {
              image_src = image.src;
              image_style = image.style;
            }
            return (
              <div key={panel.i}>
                <img className='images' src={image_src} style={image_style}/>
              </div>
            )
          })}
        </Grid>
      </div>
    )
  }
}

export default App;
