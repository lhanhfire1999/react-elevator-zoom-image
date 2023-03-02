import React, { useRef } from 'react'
import styles from './ElevatorZoomImage.module.scss'

interface Props {
  imageId: string
  imageUrl: string
  imageName: string
}

interface ImageDistance {
  top: number
  left: number
}

const getCursorPosition = (
  e: React.MouseEvent,
  imageDistance: ImageDistance
) => {
  // imageDistance is the distance between image and page
  e = e || window.event // Cursor position move

  // (imageDistance.left + window.scrollX) calculate when has scrolling
  const x = e.pageX - (imageDistance.left + window.scrollX)
  const y = e.pageY - (imageDistance.top + window.scrollY)

  return { x, y }
}

const ElevateZoomImage: React.FC<Props> = ({
  imageId,
  imageUrl,
  imageName,
}) => {
  const wrapperImageRef = useRef<HTMLDivElement | null>(null)
  const lensRef = useRef<HTMLDivElement | null>(null)
  const zoomImageRef = useRef<HTMLDivElement | null>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (window.innerWidth < 1024) return null

    const wrapperImageElement = wrapperImageRef.current as HTMLElement

    const {
      top: imageTop,
      left: imageLeft,
      width: imageWidth,
      height: imageHeight,
    } = wrapperImageElement.getBoundingClientRect()

    // Get cursor's relative position in Image Element
    const cursorPosition = getCursorPosition(e, {
      top: imageTop,
      left: imageLeft,
    })

    // 1. Handle lens-element
    if (lensRef.current) {
      const {
        current: {
          offsetHeight: lensOffsetHeight,
          offsetWidth: lensOffsetWidth,
        },
      } = lensRef
      // Get lens's position
      const lensPosition = {
        x: cursorPosition.x - lensOffsetWidth / 2,
        y: cursorPosition.y - lensOffsetHeight / 2,
      }

      // Prevent lens at outside the image
      if (lensPosition.x < 0) lensPosition.x = 0
      if (lensPosition.x > imageWidth - lensOffsetWidth)
        lensPosition.x = imageWidth - lensOffsetWidth
      if (lensPosition.y < 0) lensPosition.y = 0
      if (lensPosition.y > imageHeight - lensOffsetHeight)
        lensPosition.y = imageHeight - lensOffsetHeight

      // Set style's attributes for Lens element
      lensRef.current.style.display = 'inline-block'
      lensRef.current.style.left = `${lensPosition.x}px`
      lensRef.current.style.top = `${lensPosition.y}px`

      // 2. Handle ZoomImage-element
      if (zoomImageRef.current) {
        const {
          current: {
            offsetHeight: zoomOffsetHeight,
            offsetWidth: zoomOffsetWidth,
          },
        } = zoomImageRef

        // get aspectRatio between zoomImage and lens element
        const aspectRatio = {
          x: zoomOffsetWidth / lensOffsetWidth,
          y: zoomOffsetHeight / lensOffsetHeight,
        }

        // Set style's attributes for ZoomImage element

        zoomImageRef.current.style.display = 'block'
        zoomImageRef.current.style.backgroundSize = `${
          aspectRatio.x * imageWidth
        }px ${aspectRatio.y * imageHeight}px`
        // Display what the lens "sees"
        zoomImageRef.current.style.backgroundPosition = `-${
          lensPosition.x * aspectRatio.x
        }px -${aspectRatio.y * lensPosition.y}px`
      }
    }
  }

  const handleMouseLeave = () => {
    if (lensRef.current) {
      lensRef.current.style.display = 'none'
    }

    if (zoomImageRef.current) {
      zoomImageRef.current.style.display = 'none'
    }
  }

  return (
    <div
      ref={wrapperImageRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={styles.container}
    >
      <img
        key={imageId}
        src={imageUrl}
        alt={imageName}
        width="100%"
        height="100%"
        // layout="fill"
        // objectFit="contain"
        className={styles.mainImage}
      />
      <div
        className={styles.lens}
        ref={lensRef}
        onMouseMove={handleMouseMove}
      />
      <div
        className={styles.elevateZoom}
        style={{ backgroundImage: `url('${imageUrl}')` }}
        onMouseMove={(e) => {
          e.stopPropagation() // stop onMouseMove function be bubbles
          handleMouseLeave()
        }}
        ref={zoomImageRef}
      />
    </div>
  )
}

export default React.memo(ElevateZoomImage)
