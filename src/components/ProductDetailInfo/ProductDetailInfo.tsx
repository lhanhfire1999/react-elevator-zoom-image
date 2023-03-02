import React from 'react'
import styles from './ProductDetailInfo.module.scss'

const ProductDetailInfo = () => {
  return (
    <div className={styles.title}>
      <h3 className={styles.title}>
        8-in-1 Portable Steel Multi-Purpose Screwdriver
      </h3>
      <div className={styles.sku}>SCREW001</div>
      <p className={styles.description}>
        High-end handle design, slip resistant grip reduces hand fatigue. Four
        sizes of bits : PH2 CR-V 1/4 and PH1 CR-V 3/16 T15 CR-V T20 and T25 CR-V
        T30. Suitable for home, auto repair, outdoor and other working occasions
        without additional screwdriver, a group of 8 in 1 screwdriver solve all
        your troubles. High-end steel is used, the drill bit after precision
        processing and heat treatment is more rigid and durable. Easy to carry
        out outdoor use, give men the best tool gifts
      </p>
    </div>
  )
}

export default ProductDetailInfo
