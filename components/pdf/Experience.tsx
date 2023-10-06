import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { BulletList } from './BulletList';
import { useShortDate } from '@/hooks/useDate';

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  timeline: {
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
  },
  achievements: {
    fontSize: 10,
  },
  wrapper: {
    marginBottom: 8,
  },
});

interface Props {
  role: string;
  company: string;
  achievements: string[];
  startDate: string;
  endDate: string;
}

export function Experience(props: Props) {
  const { role, company, achievements, startDate, endDate } = props;
  const startDateFormatted = useShortDate(startDate);
  const endDateFormatted = useShortDate(endDate);

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <View>
          <Text style={{ fontWeight: 'bold' }}>{role}</Text>
          <Text>{company}</Text>
        </View>

        <View style={styles.timeline}>
          <Text>{startDateFormatted}</Text>
          <Text>-</Text>
          <Text>{endDateFormatted}</Text>
        </View>
      </View>

      <View style={styles.achievements}>
        <BulletList items={achievements} />
      </View>
    </View>
  );
}
