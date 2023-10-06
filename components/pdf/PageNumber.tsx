import { StyleSheet, Text } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 16,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
});

export function PageNumber() {
  return (
    <Text
      style={styles.pageNumber}
      render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
      fixed
    />
  );
}
