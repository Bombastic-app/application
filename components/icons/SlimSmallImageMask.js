import * as React from 'react'
import Svg, { ClipPath, Path } from 'react-native-svg'
export default SlimSmallImageMask = React.forwardRef(
  ({ children, ...props }, ref) => {
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={101}
        height={132}
        fill="none"
        {...props}
        ref={ref}
      >
        <ClipPath id="clip-slim_image_mask">
          <Path
            fill={props.fill ?? '#162436'}
            d="M89.24 1.032L9.11 8.187A10 10 0 000 18.147V122c0 5.523 4.477 10 10 10h73.536a10 10 0 009.983-9.407l6.593-111.008c.362-6.1-4.784-11.096-10.872-10.553z"
          />
        </ClipPath>
        {children}
      </Svg>
    )
  }
)
