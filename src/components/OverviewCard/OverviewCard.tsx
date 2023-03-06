import styles from './OverviewCard.module.css'

type OverviewCardProps = {
  name: string;
  value: number;
  percent: string;
};

const OverviewCard: React.FunctionComponent<OverviewCardProps> = ({ name, value, percent }) => {
  return (
    <>
      <main className={styles.overviewContainer}>
          <span className={styles.overviewItemName}>{name}</span>
          <span className={styles.overviewItemValue}>{value}</span>
          <span className={styles.overviewItemPercent}>{percent}</span>
      </main>
    </>
  )
}

export default OverviewCard