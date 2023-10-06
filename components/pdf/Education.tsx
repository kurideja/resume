import { StyleSheet, View, Text, Link } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  thesis: {
    fontStyle: 'italic',
    marginTop: 4,
  },
  institution: {},
  timeline: {
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
  },
});

interface Props {
  programme: string;
  degree: string;
  institution: string;
  start: number;
  end: number;
  thesis: {
    title: string;
    src: string;
  };
}

export function Education(props: Props) {
  const { programme, degree, institution, start, end, thesis } = props;
  return (
    <View style={styles.wrapper}>
      <View>
        <View style={styles.row}>
          <Text>
            {programme}, {degree}
          </Text>
          <Text style={styles.institution}>, {institution}</Text>
        </View>

        <View style={[styles.row, styles.thesis]}>
          <Text>Thesis: </Text>
          <Link src={thesis.src}>{thesis.title}</Link>
        </View>
      </View>

      <View style={styles.timeline}>
        <Text>{start}</Text>
        <Text>-</Text>
        <Text>{end}</Text>
      </View>
    </View>
  );
}
