import './Graph.scss';
import { GRAPH_PADDING, AXIS_STYLE, POINT_SIZE, LINE_STYLE, OUTLINE_SIZE, STROKE_WIDTH_THICK, CENTROID_SIZE } from './GraphStyles';

import { FC, useState, useRef, useEffect, ReactNode } from 'react';
import { VictoryChart, VictoryAxis, VictoryScatter, VictoryLine } from 'victory';

import { COLOR_EXTRA_LIGHT, COLOR_PURPLE, MAX_COORD, MIN_COORD } from '../../../constants';
import { DataPoint, GraphObject, Step, Line, GraphPoint, GraphPointType } from '../../../types';

interface GraphProps {
  dataset: DataPoint[];
  steps: Step[];
  step: number;
  onPointClick?: ({ x, y }: {x: number, y: number}) => void;
}

const Graph: FC<GraphProps> = ({ dataset, steps, step, onPointClick }) => {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0
  });
  const ref = useRef<HTMLDivElement>(null);

  const data = dataset.map(({ coords, label }) => ({ ...coords, color: label }));

  const renderGraphObject = (object: GraphObject): ReactNode | null => {
    if ((object as Line).start && (object as Line).end) {
      const { start,end, permanent  } = object as Line;

      return (
        <VictoryLine
          key={start.toString() + end.toString()}
          data={[
            { x: start.x, y: start.y },
            { x: end.x, y: end.y }
          ]}
          style={{
            data: {
              ...LINE_STYLE,
              stroke: permanent ? COLOR_PURPLE : COLOR_EXTRA_LIGHT
            }
          }}
        />
      );
    } else if ((object as GraphPoint).type === GraphPointType.OUTLINE) {
      const { coords, color } = object as GraphPoint;

      return (
        <VictoryScatter
          key={coords.toString() + color}
          style={{
            data: {
              fill: () => "transparent",
              stroke: color ? color : COLOR_EXTRA_LIGHT,
              strokeWidth: STROKE_WIDTH_THICK
            }
          }}
          data={[coords]}
          size={OUTLINE_SIZE}
        />
      );
    } else if ((object as GraphPoint).type === GraphPointType.LABEL) {
      const { coords, color } = object as GraphPoint;

      return (
        <VictoryScatter
          key={coords.toString() + color}
          style={{
            data: {
              fill: () => color ? color : COLOR_EXTRA_LIGHT,
              cursor: 'pointer'
            }
          }}
          data={[coords]}
          size={POINT_SIZE}
          events={[{
            target: 'data',
            eventHandlers: {
              // @ts-ignore
              onClick: (_, { datum }) => onPointClick ? onPointClick({ x: datum.x, y: datum.y }) : () => {}
            }
          }]}
        />
      );
    } else if ((object as GraphPoint).type === GraphPointType.CENTROID) {
      const { coords, color } = object as GraphPoint;

      return (
        <VictoryScatter
          key={coords.toString() + color}
          style={{
            data: {
              fill: () => color ? color : COLOR_EXTRA_LIGHT
            }
          }}
          data={[coords]}
          size={CENTROID_SIZE}
          symbol="triangleUp"
        />
      );
    }
  };

  const handeResize = () => {
    if (ref.current) {
      setDimensions({
        width: ref.current.clientWidth,
        height: ref.current.clientHeight
      });
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handeResize, false);
    if (ref.current) {
      setDimensions({
        width: ref.current.clientWidth,
        height: ref.current.clientHeight
      });
    }

    return () => {
      window.removeEventListener('resize', handeResize, false);
    }
  }, []);

  return (
    <div ref={ref} className="graph">
      <VictoryChart
        padding={GRAPH_PADDING}
        height={dimensions.height}
        width={dimensions.width}
      >
        <VictoryAxis crossAxis
          domain={[MIN_COORD, MAX_COORD]}
          standalone={false}
          style={AXIS_STYLE}
        />
        <VictoryAxis dependentAxis crossAxis
          domain={[MIN_COORD, MAX_COORD]}
          standalone={false}
          style={AXIS_STYLE}
        />
        {steps.length > 0 && steps[step].objects.map(object => {
          if (!(object as GraphPoint).type) return renderGraphObject(object);
          return null;
        })}
        <VictoryScatter
          style={{
            data: {
              fill: ({ datum }) => datum.color,
              cursor: 'pointer'
            },
          }}
          events={[{
            target: 'data',
            eventHandlers: {
              // @ts-ignore
              onClick: (_, { datum }) => onPointClick ? onPointClick({ x: datum.x, y: datum.y }) : () => {}
            }
          }]}
          data={data}
          size={POINT_SIZE}
        />
        {steps.length > 0 && steps[step].objects.map(object => {
          if ((object as GraphPoint).type) return renderGraphObject(object);
          return null;
        })}
      </VictoryChart>
    </div>
  );
};

export default Graph;