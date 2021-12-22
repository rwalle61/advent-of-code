export const getDepthMeasurementIncreases = (report: number[]): number =>
  report.reduce((currentIncreases, depth, index) => {
    if (index === report.length - 1) {
      return currentIncreases;
    }
    const nextDepth = report[index + 1];
    if (nextDepth > depth) {
      return currentIncreases + 1;
    }
    return currentIncreases;
  }, 0);

// Part 2

const toDepthMeasurementIncreases = (report: number[]): number[] =>
  report.reduce((currentWindowDepths, firstDepthInWindow, index) => {
    if (index === report.length - 2) {
      return currentWindowDepths;
    }
    const secondDepthInWindow = report[index + 1];
    const thirdDepthInWindow = report[index + 2];
    const windowDepth =
      firstDepthInWindow + secondDepthInWindow + thirdDepthInWindow;
    return currentWindowDepths.concat(windowDepth);
  }, []);

export const getDepthMeasurementIncreasesAcrossWindows = (
  report: number[]
): number => getDepthMeasurementIncreases(toDepthMeasurementIncreases(report));
