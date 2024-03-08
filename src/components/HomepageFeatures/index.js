import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Easy to Run node',
    Svg: require('@site/static/img/settings.svg').default,
    description: (
      <>
        Very Easy game
        {' '}<a href="/docs/intro">More</a>
      </>
    ),
  },
  {
    title: 'Explorer',
    Svg: require('@site/static/img/block.svg').default,
    description: (
      <>
      Explorer with VNBnode
        {' '}<a href="https://explorer.vnbnode.com/">Learn more</a>
      </>
    ),
  },
  {
    title: 'Community',
    Svg: require('@site/static/img/community.svg').default,
    description: (
      <>
      Join
{' '}<a href="https://t.me/VNBnodegroup">Telegram</a>
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
