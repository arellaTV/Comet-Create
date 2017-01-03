import React from 'react';
import Grid from 'react-grid-layout';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var layout = [
      {i: 'a', x: 0, y: 0, w: 1, h: 2, static: true},
      {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
      {i: 'c', x: 4, y: 0, w: 1, h: 2}
    ];
    return (
      <div>
        <h1>Hello World</h1>
        <Grid className='layout' layout={layout} cols={12} rowHeight={30} width={1200}>
          <div key={'a'}>a</div>
          <div key={'b'}>b</div>
          <div key={'c'}>c</div>
        </Grid>
      </div>
    )
  }
}

export default App;
