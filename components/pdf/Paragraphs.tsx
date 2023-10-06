import { StyleSheet, View } from '@react-pdf/renderer';
import { PropsWithChildren } from 'react';

const styles = StyleSheet.create({
  paragraphs: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
});

export function Paragraphs(props: PropsWithChildren) {
  const { children } = props;

  return <View style={styles.paragraphs}>{children}</View>;
}
