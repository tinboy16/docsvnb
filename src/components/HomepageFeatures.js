import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Easy to Run node',
    Svg: require('../../static/img/settings.svg').default,
    description: (
      <>
        Verry Easy game
        {' '}<a href="/docs/intro">More</a>
      </>
    ),
  },
  {
    title: 'Explorer',
    Svg: require('../../static/img/block.svg').default,
    description: (
      <>
Explorer with VNBnode
  {' '}<a href="https://explorer.vnbnode.com/">Learn more</a>
</>

    ),
  },
  {
    title: 'Community',
    Svg: require('../../static/img/community.svg').default,
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
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
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
