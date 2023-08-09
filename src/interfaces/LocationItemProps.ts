import Location from './Location';

export default interface LocationItemProps {
    item: Location;
    index: number;
    removeLocation: (index: number) => void;
  }