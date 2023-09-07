export const TypeFlags = {
  empty: 0,
  wall : 0b1,
  space: 0b10,
  grass: 0b100,
  water: 0b1001,
  stone: 0b10001,
  hole : 0b100001,
}

const flagTypes = new Map();
Object.entries(TypeFlags).forEach((item) => {
  const [type, flag] = item;
  flagTypes.set(flag, type);
});

export const FlagTypes = flagTypes;

export const MaxImmovableCount = 5;

export const Side = {
  top: 'top',
  bottom: 'bottom',
  left: 'left',
  right: 'right'
};

export const LimitSpace = 3;