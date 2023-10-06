import { View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  row: {
    display: 'flex',
    flexDirection: 'row',
    gap: 24,
  },
  title: { flex: 2, fontWeight: 'bold' },
  items: { flex: 10 },
});

interface Props {
  title: string;
  items: string[];
}

export function ItemList(props: Props) {
  const { title, items } = props;

  return (
    <View style={styles.row}>
      <View style={styles.title}>
        <Text>{title}</Text>
      </View>
      <View style={styles.items} wrap>
        <Text>{items.join(', ')}</Text>
      </View>
    </View>
  );
}
