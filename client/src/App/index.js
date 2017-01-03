import React from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
const Grid = WidthProvider(Responsive);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      layouts: {
        lg: [
          {i: 'a', x: 0, y: 0, w: 3, h: 2, minW: 2, maxW: 4, maxH: 4},
          {i: 'b', x: 3, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
          {i: 'c', x: 0, y: 3, w: 3, h: 2}
        ]
      },
      rowHeight: 100,
    }
  }

  resizeHeight(newBreakpoint, newCols) {
    debugger;
    console.log('breakpoint changed!');
    console.log('newBreakpoint:', newBreakpoint);
    console.log('newCols:', newCols);
    var heights = {
      lg: 100,
      md: 83,
      sm: 64,
      xs: 40,
      xxs: 20,
    }
    this.setState({ rowHeight: heights[newBreakpoint] });
  }

  render() {
    return (
      <div>
        <h1>Hello World</h1>
        <Grid className='layout' layouts={this.state.layouts}
        breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 240}}
        cols={{lg: 12, md: 12, sm: 12, xs: 12, xxs: 12}}
        onBreakpointChange={this.resizeHeight.bind(this)}
        rowHeight={this.state.rowHeight}>
          <div key={'a'}>a</div>
          <div key={'b'}>b</div>
          <div key={'c'}>c</div>
        </Grid>
      </div>
    )
  }
}

export default App;
