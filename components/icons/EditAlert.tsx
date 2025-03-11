import React from 'react';
import Svg, { G, Path } from 'react-native-svg';

const EditAlert = ({ size = 37 }: { size?: number }) => {
  return (
    <Svg
      width={size}
      height={size}
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={1.5}>
      <G transform="matrix(1,0,0,1,-2541.83,-1210.37)">
        <G transform="matrix(0.358437,0,0,0.358437,1342.94,884.191)">
          <G transform="matrix(1,0,0,0.724726,1.33333,266.138)">
            <Path
              d="M3348.2,895.002L3348.2,1035.47"
              fill="none"
              stroke="rgb(13,0,255)"
              strokeWidth={10.89}
            />
          </G>
          <Path
            d="M3429.53,982.002L3429.53,996.002C3429.53,999.866 3426.4,1003 3422.53,1003L3367.2,1003C3363.34,1003 3360.2,999.866 3360.2,996.002L3360.2,982.002C3360.2,978.139 3363.34,975.002 3367.2,975.002L3422.53,975.002C3426.4,975.002 3429.53,978.139 3429.53,982.002Z"
            fill="rgb(13,0,255)"
          />
          <G transform="matrix(1.25,0,0,1,-840.05,-48)">
            <Path
              d="M3429.53,982.002L3429.53,996.002C3429.53,999.866 3427.03,1003 3423.93,1003L3365.8,1003C3362.71,1003 3360.2,999.866 3360.2,996.002L3360.2,982.002C3360.2,978.139 3362.71,975.002 3365.8,975.002L3423.93,975.002C3427.03,975.002 3429.53,978.139 3429.53,982.002Z"
              fill="rgb(13,0,255)"
            />
          </G>
        </G>
      </G>
    </Svg>
  );
};

export default EditAlert;
