export function sortComparator(dir: 'asc' | 'desc', field: string = null) {
  return (a, b) => {
    const aVal = field ? a[field] : a;
    const bVal = field ? b[field] : b;
    return (dir === 'asc' ? 1 : -1) * aVal - bVal;
  };
}
