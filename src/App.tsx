import React from 'react'
import './App.scss'
import { ElevatorZoomImage, ProductDetailInfo } from './components'

function App() {
  return (
    <div className="App container">
      <div className="row">
        <div className="col-6">
          <ElevatorZoomImage
            imageId="product-01"
            imageUrl="/images/product-01.svg"
            imageName="product-01"
          />
        </div>
        <div className="col-6">
          <ProductDetailInfo />
        </div>
      </div>
    </div>
  )
}

export default App
