import React, { useState } from 'react';
import Dog from './Dog';
import './App.css';

function App() {
  const [count, setCount] = useState(2);
  let vartest = 2

  function myFunction(){
    let exp = count * count

    setCount(count => exp)
  }

  return (
    <div>
      <Dog></Dog>


    </div>
  )
}

export default App;
