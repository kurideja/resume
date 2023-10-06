import { StyleSheet, Text } from '@react-pdf/renderer';
import { PropsWithChildren } from 'react';

const styles = StyleSheet.create({
  paragraph: {
    textIndent: 16,
  },
});

export function Paragraph(props: PropsWithChildren) {
  const { children } = props;

  return <Text style={styles.paragraph}>{children}</Text>;
}
