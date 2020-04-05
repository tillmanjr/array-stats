'use strict;'

const add = (x, y) => x+y
const arrayStats = {
  sqrs:   (arr) => arr.map(x => x * x),
  diffs:  (arr, diffValue) => arr.map(value => (value - diffValue)),
  min:    (arr) => Math.min(...arr),
  max:    (arr) => Math.max(...arr),
  sum:    (arr) => arr.reduce(add),
  mean:   (arr) => arrayStats.sum(arr)/arr.length,
  stdDev: (arr) => {
      const mean = arrayStats.mean(arr)
      const diffs = arrayStats.diffs(arr, mean)
      const sqrDiffs = arrayStats.sqrs(diffs)
      const meanSqrDiffs = arrayStats.mean(sqrDiffs)
    
      return Math.sqrt(meanSqrDiffs)
    },
  // this calculates all with a single pass, 2 if stdDev is included
  stats: (arr, calculateStdDev) => {
    const population = arr.length
    let arrMin = arr[0]
    let arrMax = arr[0]
    let arrSum = 0
    arr.forEach(value => {
      if (value < arrMin) {arrMin = value}
      if (value > arrMax) {arrMax = value}
      arrSum = arrSum + value
    })
    const arrMean = arrSum/population

    const calcStdDev = () => {
      let sqrDiffsSum = 0

      arr.forEach(value => {
        const diff = value - arrMean
        sqrDiffsSum = sqrDiffsSum + (diff * diff)
      })
      const sdsMean = sqrDiffsSum/population
      return Math.sqrt(sdsMean)
    }
    
    const stdDev = calculateStdDev
      ? calcStdDev()
      : 0.0
    
    return {
      population: population,
      min: arrMin,
      max: arrMax,
      sum: arrSum,
      mean: arrMean,
      stdDev: stdDev
    }
  }
}

module.exports - arrayStats
