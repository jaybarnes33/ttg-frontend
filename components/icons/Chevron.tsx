import Svg, { G, Path } from 'react-native-svg';

const Chevron = ({
  size = 20,
  color = 'black',
  direction = 'right',
}: {
  size?: number;
  color?: string;
  direction?: 'right' | 'left';
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 20 29"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="1.5">
      {direction === 'right' ? (
        <G transform="matrix(1,0,0,1,-1640.42,-1190.32)">
          <G transform="matrix(0.477508,0,0,0.657913,551.502,-77.787)">
            <G transform="matrix(0.795902,-0.565734,0.44924,0.790593,-403.73,1706.38)">
              <Path
                d="M2291.48,1922.4L2311.48,1961"
                fill="none"
                stroke={color}
                strokeWidth="7.22px"
              />
            </G>
            <G transform="matrix(0.795902,0.565734,0.44924,-0.790593,-403.73,2191.73)">
              <Path
                d="M2291.48,1922.4L2311.48,1961"
                fill="none"
                stroke={color}
                strokeWidth="7.22px"
              />
            </G>
          </G>
        </G>
      ) : (
        <G transform="matrix(1,0,0,1,-1332.42,-1190.32)">
          <G transform="matrix(-0.477508,0,0,0.657913,2440.34,-77.787)">
            <G transform="matrix(0.795902,-0.565734,0.44924,0.790593,-403.73,1706.38)">
              <Path
                d="M2291.48,1922.4L2311.48,1961"
                fill="none"
                stroke={color}
                strokeWidth="7.22px"
              />
            </G>
            <G transform="matrix(0.795902,0.565734,0.44924,-0.790593,-403.73,2191.73)">
              <Path
                d="M2291.48,1922.4L2311.48,1961"
                fill="none"
                stroke={color}
                strokeWidth="7.22px"
              />
            </G>
          </G>
        </G>
      )}
    </Svg>
  );
};

export default Chevron;
