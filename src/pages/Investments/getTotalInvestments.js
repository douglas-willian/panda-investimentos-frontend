let totalInvested;

export default function getTotalIvestments(investments) {
  let totalOnVariable = 0;
  let totalOnFixed = 0;

  investments.forEach((investment) => {
    if (investment.type === 'variable') {
      totalOnVariable += 1;
    }

    if (investment.type === 'fixed') {
      totalOnFixed += 1;
    }
  });

  totalInvested = totalOnFixed + totalOnVariable;
  const percentageOnVariable = calculatePercentage(totalOnVariable);
  const percentageOnFixed = calculatePercentage(totalOnFixed);

  return { percentageOnVariable, percentageOnFixed };
}

const calculatePercentage = (type) => {
  if (!totalInvested) return 0
    return ((type / totalInvested) * 100).toFixed(2);
};
