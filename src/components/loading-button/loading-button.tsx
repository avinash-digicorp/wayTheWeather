import {
  Canvas,
  Circle,
  Group,
  ImageSVG,
  Path,
  Skia,
  fitbox,
  rect,
} from '@shopify/react-native-skia';
import {useEffect, useMemo} from 'react';
import Animated, {
  Easing,
  cancelAnimation,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

export type ActivityStatus = 'idle' | 'loading' | 'success' | 'error';

type LoadingButtonProps = {
  size?: number;
  status: ActivityStatus;
  color: string;
};

const svgSize = 24;

const DoneSvg = Skia.SVG.MakeFromString(
  `<svg xmlns="http://www.w3.org/2000/svg" fill="white" width="24" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>`,
)!;
const ErrorSvg = Skia.SVG.MakeFromString(
  `<svg xmlns="http://www.w3.org/2000/svg" fill="white" width="24" height="24" viewBox="0 0 24 24"><path d="M12 8c-1.062 0-2.073.211-3 .587v-3.587c0-1.654 1.346-3 3-3s3 1.346 3 3v1h2v-1c0-2.761-2.238-5-5-5-2.763 0-5 2.239-5 5v4.761c-1.827 1.466-3 3.714-3 6.239 0 4.418 3.582 8 8 8s8-3.582 8-8-3.582-8-8-8zm0 10c-1.104 0-2-.896-2-2s.896-2 2-2 2 .896 2 2-.896 2-2 2z"/></svg>`,
)!;

const useLoadingArcProgress = (status: ActivityStatus) => {
  const loadingArcProgress = useSharedValue(0);

  useEffect(() => {
    if (status !== 'loading') {
      // Reset the animation
      cancelAnimation(loadingArcProgress);
      loadingArcProgress.value = 0;
      return;
    }
    loadingArcProgress.value = withRepeat(
      withTiming(6 * Math.PI, {
        duration: 2100,
        easing: Easing.bezier(0.35, 0.7, 0.29, 0.32),
      }),
      -1,
      false,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return loadingArcProgress;
};

export const LoadingButtonLoader: React.FC<LoadingButtonProps> = ({
  size = 25,
  status = 'loading',
  color,
}) => {
  const internalStrokeWidth = 4;
  const loadingArcProgress = useLoadingArcProgress(status);
  const arcPath = useMemo(() => {
    const path = Skia.Path.Make();
    path.addArc(
      rect(
        internalStrokeWidth / 2,
        internalStrokeWidth / 2,
        size - internalStrokeWidth,
        size - internalStrokeWidth,
      ),
      0,
      90,
    );
    return path;
  }, [internalStrokeWidth, size]);
  const arcTransform = useDerivedValue(() => {
    return [{rotate: loadingArcProgress.value}];
  });
  const loadingGroupOpacity = useDerivedValue(() => {
    return withTiming(status === 'loading' ? 1 : 0);
  }, [status]);
  const successOrErrorGroupOpacity = useDerivedValue(() => {
    return withTiming(status === 'success' || status === 'error' ? 1 : 0);
  }, [status]);

  const svgMap = useMemo(() => {
    return {
      success: DoneSvg,
      error: ErrorSvg,
    };
  }, []);

  const successOrErrorSvg = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const svg = (svgMap as any)[status];

    const src = rect(0, 0, svgSize, svgSize);
    const iconSize = size * 0.5;

    const offset = (size - iconSize) / 2;

    const dst = rect(offset, offset, iconSize, iconSize);

    return (
      <Group transform={fitbox('contain', src, dst)}>
        <ImageSVG svg={svg} x={0} y={0} width={iconSize} height={iconSize} />
      </Group>
    );
  }, [size, status, svgMap]);

  const rContainerStyle = useAnimatedStyle(() => {
    const dimension = withTiming(status === 'idle' ? 0 : size);

    return {
      alignItems: 'center',
      justifyContent: 'center',
      height: dimension,
      width: dimension,
    };
  }, [status, size]);

  return (
    <Animated.View
      style={[rContainerStyle, status !== 'idle' && {marginRight: 10}]}>
      <Canvas
        style={{
          height: size,
          aspectRatio: 1,
          borderRadius: size / 2,
        }}>
        <Group opacity={loadingGroupOpacity}>
          <Group
            origin={{
              x: size / 2,
              y: size / 2,
            }}
            transform={arcTransform}>
            <Path
              path={arcPath}
              strokeWidth={internalStrokeWidth}
              style={'stroke'}
              color={color}
              strokeCap={'round'}
            />
          </Group>
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={size / 2 - internalStrokeWidth / 2}
            color={color}
            opacity={0.1}
            style="stroke"
            strokeWidth={internalStrokeWidth}
          />
        </Group>
        <Group opacity={successOrErrorGroupOpacity}>
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={size / 2 - internalStrokeWidth / 2}
            color={color}
            strokeWidth={internalStrokeWidth}
          />
          {successOrErrorSvg}
        </Group>
      </Canvas>
    </Animated.View>
  );
};
