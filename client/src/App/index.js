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
      currentSelection: {},
      counter: 0
    }

    this.updateLayout = this.updateLayout.bind(this);
    this.selectPanel = this.selectPanel.bind(this);
    this.toggle = this.toggle.bind(this);
    this.addPanel = this.addPanel.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
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
    var body = {
      layout,
      images: this.state.images
    }
    fetch('/api/page', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(page => {
        app.setState({
          layout: page.layout,
          images: page.images
        })
      });
  }

  updateLayout(layout) {
    this.postPage(layout);
  }

  toggle(selection) {
    this.setState({ currentSelection: {} })

    var panels = document.getElementsByClassName('panel-container');
    for (var i = 0; i < panels.length; i++) {
      if (panels[i] !== selection) {
        panels[i].classList.remove('selected');
      }
    };

    if (selection.classList.contains('selected')) {
      selection.classList.remove('selected');
    } else {
      selection.classList.add('selected');
      this.setState({ currentSelection: selection })
    }

  }

  selectPanel(e) {
    var currentSelection = e.target;

    if (currentSelection.classList.contains('panel-container')) {
      this.toggle(currentSelection);
    } else {
      this.toggle(currentSelection.parentNode);
    }
  }

  addPanel() {
    this.state.counter++;
    var panel = {
      i: this.state.counter.toString(),
      x: 0,
      y: 0,
      w: 4,
      h: 4,
      maxW: 8,
      maxH: 8
    }

    var layout = this.state.layout.concat(panel);
    this.postPage(layout);
  }

  uploadImage(e) {
    e.preventDefault();
    var inputURL = e.target[0].value;
    if (this.state.currentSelection.id) {
      var panelId = this.state.currentSelection.id;
      this.state.images[panelId] = {};
      this.state.images[panelId].src = inputURL;
      this.state.images[panelId].style = {
        width: '100%',
        margin: 'auto auto'
      }
      this.setState({ images: this.state.images });
      this.postPage(this.state.layout)
    }
  }

  render() {
    return (
      <div>
        <h1>Comet</h1>
        <h3>Current Selection: {this.state.currentSelection.id}</h3>
        <button onClick={this.addPanel}>Add Panel</button>
        <form onSubmit={this.uploadImage}>
          <input type='text' />
          <input type='submit' />
        </form>
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
                <div className='panel-container' id={panel.i} onClick={this.selectPanel}>
                  <img className='images' src={image_src} style={image_style}/>
                </div>
              </div>
            )
          })}
        </Grid>
      </div>
    )
  }
}

export default App;
