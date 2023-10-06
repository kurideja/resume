import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  bulletPoint: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
  },
  bullet: {
    flexGrow: 0,
  },
  text: {
    flex: 1,
  },
});

interface Props {
  items: string[];
}

export function BulletList(props: Props) {
  const { items } = props;

  return (
    <>
      {items.map((item, i) => (
        <View key={i} style={styles.bulletPoint}>
          <Text style={styles.bullet}>{'\u2022'}</Text>
          <Text style={styles.text}>{item}</Text>
        </View>
      ))}
    </>
  );
}
