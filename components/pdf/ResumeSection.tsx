import { StyleSheet, View, Text } from '@react-pdf/renderer';
import { PropsWithChildren } from 'react';

const styles = StyleSheet.create({
  title: {
    borderBottom: '1px solid black',
    paddingBottom: 4,
    marginBottom: 8,
    marginTop: 16,
    textTransform: 'uppercase',
    fontSize: 11,
    fontWeight: 'bold',
  },
  content: {
    fontSize: 11,
  },
});

interface Props {
  title: string;
}

export function ResumeSection(props: PropsWithChildren<Props>) {
  const { title, children } = props;

  return (
    <View wrap={false}>
      <View style={styles.title}>
        <Text>{title}</Text>
      </View>
      <View style={styles.content}>{children}</View>
    </View>
  );
}
