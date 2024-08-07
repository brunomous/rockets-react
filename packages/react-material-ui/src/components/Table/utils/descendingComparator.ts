/**
 * @param a - Comparator A
 * @param b - Comparator B
 * @param orderBy - Order By
 */
function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export default descendingComparator;
