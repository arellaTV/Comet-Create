import React from 'react';
import Grid from 'react-grid-layout';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      layout: [],
      images: {}
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
    // console.log(layout);
    // this.postPage(layout);
  }

  checkHeight(layout, oldItem, newItem, placeholder, e, element) {
    const currentHeight = newItem.y + newItem.h;
    // console.log(currentHeight);
    // if (currentHeight > newItem.maxH) {
    //   console.log('bigger than container height');
    // }
  }

  render() {
    return (
      <div>
        <h1>Hello World</h1>
        <Grid className='layout' layout={this.state.layout}
        onLayoutChange={this.updateLayout} cols={8} rowHeight={80} width={640}
        onResizeStop={this.checkHeight}>
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
