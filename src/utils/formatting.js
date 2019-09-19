const BN = window.web3.BigNumber;

export const renderMicroValue = (value, decimals=18) => {
  value = new BN(value)
  return value / 10**decimals;
}