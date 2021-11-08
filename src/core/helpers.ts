import moment from 'moment';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function isEmpty(s: any): boolean {
  if (Array.isArray(s)) return s.length === 0;
  return [null, undefined, ''].includes(s);
}

export function generalComparator(inverse = false): (a: any, b: any) => number {
  return (a, b) => {
    if (Array.isArray(a) && Array.isArray(b)) {
      return inverse ? b.length - a.length : a.length - b.length;
    }
    if (typeof a === 'number' && typeof b === 'number') {
      return inverse ? b - a : a - b;
    }
    if (typeof a === 'string' && typeof b === 'string') {
      return inverse ? b.localeCompare(a) : a.localeCompare(b);
    }
    if (typeof a === 'object' && typeof b === 'object') {
      if (a.name && b.name) {
        return generalComparator(inverse)(a.name, b.name);
      }
      return generalComparator(inverse)(a.id, b.id);
    }
    return 0;
  };
}

export function getDisplayDate(date: Date): string {
  return moment(date).format('ddd DD MMM, YYYY [at] HH:mm');
}
