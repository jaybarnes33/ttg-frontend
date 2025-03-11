import Svg, { Circle, G, Path } from 'react-native-svg';

type AlertState = 'muted' | 'active' | 'filled';

const Alert = ({ state = 'muted', size = 36 }: { state?: AlertState; size?: number }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 36 36">
      {state === 'active' && (
        <G transform="matrix(1,0,0,1,-1372.23,-1186.82)">
          <G transform="matrix(0.5,0,0,0.5,95.0922,691.681)">
            <Circle
              cx="2589.68"
              cy="1025.68"
              r="32.267"
              fill="#ECFF00"
              stroke="black"
              strokeWidth="6.26"
            />
            <G transform="matrix(1,0,0,1,-90.5333,2)">
              <Circle cx="2680.21" cy="1015.55" r="10.134" stroke="black" strokeWidth="6.26" />
            </G>
            <G transform="matrix(1,0,0,1,-4.3338,-53)">
              <Path
                d="M2579.55,1092.41L2608.48,1092.41"
                fill="none"
                stroke="black"
                strokeWidth="6.26"
              />
            </G>
          </G>
        </G>
      )}
      {state === 'filled' && (
        <G transform="matrix(1,0,0,1,-1372.23,-1186.82)">
          <G transform="matrix(0.5,0,0,0.5,95.0922,691.681)">
            <Circle
              cx="2589.68"
              cy="1025.68"
              r="32.267"
              fill="none"
              stroke="black"
              strokeWidth="6.26"
            />
            <G transform="matrix(1,0,0,1,-90.5333,2)">
              <Circle cx="2680.21" cy="1015.55" r="10.134" stroke="black" strokeWidth="6.26" />
            </G>
            <G transform="matrix(1,0,0,1,-4.3338,-53)">
              <Path
                d="M2579.55,1092.41L2608.48,1092.41"
                fill="none"
                stroke="black"
                strokeWidth="6.26"
              />
            </G>
          </G>
        </G>
      )}
      {state === 'muted' && (
        <G transform="matrix(1,0,0,1,-1507.57,-1186.82)">
          <G transform="matrix(0.5,0,0,0.5,230.425,691.681)">
            <Circle
              cx="2589.68"
              cy="1025.68"
              r="32.267"
              fill="none"
              stroke="rgb(159,159,159)"
              strokeWidth="6.26px"
            />
            <G transform="matrix(1,0,0,1,-90.5333,2)">
              <Circle
                cx="2680.21"
                cy="1015.55"
                r="10.134"
                fill="none"
                stroke="rgb(159,159,159)"
                strokeWidth="6.26px"
              />
            </G>
            <G transform="matrix(1,0,0,1,-4.3338,-53)">
              <Path
                d="M2579.55,1092.41L2608.48,1092.41"
                fill="none"
                stroke="rgb(159,159,159)"
                strokeWidth="6.26px"
              />
            </G>
          </G>
        </G>
      )}
    </Svg>
  );
};

export default Alert;
