import * as React from 'react'
import Svg, { ClipPath, Path } from 'react-native-svg'
export default SlimImageMask = React.forwardRef(
  ({ children, ...props }, ref) => {
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={252}
        height={329}
        fill="none"
        {...props}
        ref={ref}
      >
        <ClipPath id="clip-slim_image_mask">
          <Path
            fill={props.fill ?? '#162436'}
            d="M240.44.032 9.11 20.686A10 10 0 0 0 0 30.646V319c0 5.523 4.477 10 10 10h212.976a10 10 0 0 0 9.983-9.407l18.353-309.008c.362-6.1-4.784-11.096-10.872-10.553Z"
          />
        </ClipPath>
        {children}
      </Svg>
    )
  }
)
