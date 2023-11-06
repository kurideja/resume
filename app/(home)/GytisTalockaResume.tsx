import { Page, Text, View, Document, StyleSheet, Link, Font } from '@react-pdf/renderer';
import {
  ResumeSection,
  Education,
  ItemList,
  Experience,
  BulletList,
  PageNumber,
  Paragraphs,
  Paragraph,
  List,
} from '@/components/pdf';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 24,
    fontFamily: 'Computer Modern',
  },
  title: {
    fontSize: 18,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  link: {
    textDecoration: 'none',
  },
  contacts: {
    fontSize: 11,
    display: 'flex',
    flexDirection: 'row',
    columnGap: 8,
  },
  header: {
    alignItems: 'center',
    margin: 10,
  },
});

Font.register({
  family: 'Computer Modern',
  fonts: [
    { src: './fonts/computer-modern/cmunrm.ttf', fontWeight: 'normal' },
    {
      src: './fonts/computer-modern/cmunbx.ttf',
      fontWeight: 'bold',
    },
    {
      src: './fonts/computer-modern/cmunci.ttf',
      fontStyle: 'italic',
    },
  ],
});

const skills: [string, string[]][] = [
  [
    'Frontend',
    [
      'TypeScript',
      'React.js',
      'Next.js',
      'Material UI',
      'Redux.js',
      'React Testing Library',
      'jotai',
      'Bootstrap',
      'SASS',
      'Storybook',
      'Storyblok CMS',
      'Angular',
      'RxJS',
      'NgRx',
    ],
  ],
  ['DevOps', ['Docker', 'Docker Compose', 'Helm Charts', 'GitLab CI/CD']],
  ['Social', ['Public speaking', '1-on-1 sessions', 'Mentoring', 'Interviewing candidates']],
  ['Agile', ['Scrum', 'Facilitating retrospectives', 'XP']],
];

export function GytisTalockaResume() {
  return (
    <Document title="Gytis Taločka Resume" author="Gytis Taločka" subject="Gytis Taločka Resume">
      <Page size="A4" style={styles.page}>
        <View style={styles.header} fixed>
          <Text style={styles.title}>Gytis Taločka</Text>
          <View style={styles.contacts}>
            <Text>+370 605 24771</Text>
            <Text>Vilnius, Lithuania</Text>
          </View>
          <View style={styles.contacts}>
            <Link src="mailto:gytistalocka@gmail.com" style={styles.link}>
              gytistalocka@gmail.com
            </Link>
            <Link src="http://www.linkedin.com/in/gytis-talocka" style={styles.link}>
              linkedin.com/in/gytis-talocka
            </Link>
          </View>
        </View>

        <View>
          <ResumeSection title="About me">
            <Text>
              I am a frontend developer with almost a decade of experience in crafting front-end
              applications, seeking full-time remote positions. My true passion lies in utilizing my
              expertise to assist and empower others within the context of an organizational
              setting.
            </Text>
          </ResumeSection>

          <ResumeSection title="Skills">
            <List>
              {skills.map(([title, items]) => (
                <ItemList key={title} title={title} items={items} />
              ))}
            </List>
          </ResumeSection>

          <ResumeSection title="Experience">
            <Experience
              role="Lead Frontend Engineer"
              company="Saldo Bank"
              achievements={[
                'Led the tech transition from Nuxt.js to Next.js for the landing page',
                'Assisted in recruiting a new team of 4 frontend developers',
                'Successfully launched a Minimum Viable Product (MVP) self-service solution in the Swedish and Lithuanian markets',
                'Facilitated 1-on-1 sessions with frontend developers',
              ]}
              startDate="2021-06-01"
            />

            <Experience
              role="Frontend Engineer"
              company="Treatwell"
              achievements={[
                'Migrated the project from Gitflow to a trunk-based development model by introducing feature toggles and making necessary adjustments to Dockerfiles and GitLab pipelines. This transition enabled frequent releases and streamlined the development workflow',
                'Diligently upheld maintenance support for a B2B salon management SaaS, remaining committed until the product naturally reached the conclusion of its active development phase',
              ]}
              startDate="2020-01-01"
              endDate="2021-06-01"
            />

            <Experience
              role="Frontend Engineer"
              company="Visma Lietuva"
              achievements={[
                'I was the primary Angular front-end developer behind Document, Agreement management and Cash reconciliation platforms, Customer portal and admin panel',
                'Developed the first version of a mobile app (Ionic) for accessing web-based applications with ease',
                'Enabled the separation of deployments versus releases by leading a custom feature toggles solution',
                'Led transformation towards #NoEstimates way of working',
                'Set up guidelines for an in-house design system',
                'Mentored other front-end developers, held 1-on-1 sessions',
              ]}
              startDate="2014-07-01"
              endDate="2019-10-01"
            />
          </ResumeSection>
        </View>

        <View>
          <ResumeSection title="Education">
            <Education
              programme="Strategic Information Systems Management"
              degree="Master"
              institution="Vilnius University"
              start={2016}
              end={2018}
              thesis={{
                title: 'Leadership in insight-driven culture',
                src: 'https://www.lvb.lt/permalink/f/16nmo04/ELABAETD36050040',
              }}
            />

            <Education
              programme="Management Information Systems"
              degree="Bachelor"
              institution="Vilnius University"
              start={2012}
              end={2016}
              thesis={{
                title: 'Radial visualization in data mining',
                src: 'https://www.lvb.lt/permalink/f/16nmo04/ELABAETD36156281',
              }}
            />
          </ResumeSection>

          <ResumeSection title="Extra-curricular activities">
            <BulletList
              items={[
                'Attended Agile meetups and facilitated two workshops, presenting various retrospective formats—one in Vilnius and another in Kaunas',
                'Authored a whitepaper on the outcomes of 100 Scrum sprints and the insights gained from them',
                "Wrote several blog posts for Visma's blog",
                'Represented Visma at conference booths',
                'Participated in the No Trolls Allowed camp, delivering presentations multiple times',
              ]}
            />
          </ResumeSection>

          <ResumeSection title="Preferred way of working">
            <Paragraphs>
              <Paragraph>
                Having delved into <Text style={{ fontWeight: 'bold' }}>Accelerate</Text>{' '}
                <Text style={{ fontStyle: 'italic' }}>
                  (by Gene Kim, Jez Humble, and Nicole Forsgren)
                </Text>
                , I have garnered valuable insights into the fundamental principles that enable
                organizations to achieve more frequent and rapid releases. I firmly believe that
                design systems, feature toggling, and trunk-based development are pivotal in
                creating an environment conducive to smoother and more efficient development.
              </Paragraph>

              <Paragraph>
                My philosophy centers around the idea that &#34;slow is smooth, and smooth is
                fast&#34;. I recognize that streamlining processes, reducing frictions, and
                mitigating release-related anxieties are paramount to achieving a higher release
                cadence. To put these beliefs into practice, I actively contribute to various
                initiatives, including automated testing, the implementation of feature toggles, and
                the optimization of developer experience (DX) in general. This involves enhancing
                documentation, scripting, and refining Docker Compose files for local development,
                all with the aim of fostering a more frictionless and productive development
                environment.
              </Paragraph>
            </Paragraphs>
          </ResumeSection>
        </View>

        <PageNumber />
      </Page>
    </Document>
  );
}
