import { StyleSheet, View } from '@react-pdf/renderer';
import { PropsWithChildren } from 'react';

const styles = StyleSheet.create({
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
});

export function List(props: PropsWithChildren) {
  const { children } = props;

  return <View style={styles.list}>{children}</View>;
}
