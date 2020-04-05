# array-stats
Basic stat functions for an array of number. 
The are fairly simplistic and basic.  
I typically use them when doing quick and dirtly profiling (got tired of rewriting the same basic functions again and again)  
  
## The collection includes:  
* Basic stat functions  
* Two array transformations  
* A stats function to calculate all more efficiently  
  
### Array statistics  
`min (arr)`   - returns the minimum value of the array  
`max( arr)`   - returns the maximum value of the array  
`sum (arr)`   - retruns the sum of values in the array  
`mean (arr)`  - retruns the arithmetic mean of values in the array  
`stdDev (arr)` - retruns the standard deviation of values in the array  

### Array transformations:
`sqrs (arr)`  - returns a new array containing the square of each value of the input array  
`diffs (arr), diffValue`   - returns a new array containing the diffference between `diffValue` and each value of the input array  

### Stats function  
`stats (arr, calculateStdDev)`  
    - calculates and returns all the stats  
    - standard deviation will only be calculated if `caclculateStdDev` is `true`, otherwise it will be returned as 0.0  
#### if you need more than one or two values, use the stats function - it's a lot FASTER     
Calcutating a statistic requires at least one pass through the valuues,  calculatingstandard deviation can require several.
Calculating each of the included stat functions independently would result 6 separate passes through the data.

The `stats` function calculates all of the stats except Standard Deviation in a single pass trhough the data; if Standard Deviation is included it requires a total of two passes through the data. Either way, much better than siz passes.  


The difference can be significant. 
Here's are some perf timeings (using `perf.hrtime`) results of an array with 900 numbers (pulled from some function profiling) calculated using the various approaches  (on unladen i9700 with 64 gig RAM )  

__with 900 elements__  
```
0 s, 0.858 ms - Calculated separately, w/o std dev
0 s, 0.580 ms - Calculated separately, with std dev
0 s, 0.229 ms - Calculated using stats(), w/o std dev
0 s, 0.335 ms - Calculated using stats(), with std dev
```  
__with 90,000 elements__   
```
0 s, 23.389 ms - Calculated separately, w/o std dev
0 s, 47.578 ms - Calculated separately, with std dev
0 s, 2.530 ms - Calculated using stats(), w/o std dev
0 s, 3.714 ms - Calculated using stats(), with std dev
```



and the formatted results:  
```
900 samples
┌─────────┬────────────┬─────────┬─────────┬─────────┬─────────┬─────────┐
│ (index) │ population │   min   │   max   │   sum   │  mean   │ stdDev  │
├─────────┼────────────┼─────────┼─────────┼─────────┼─────────┼─────────┤
│    0    │ '900.000'  │ '0.002' │ '1.598' │ '8.492' │ '0.009' │ '0.000' │
└─────────┴────────────┴─────────┴─────────┴─────────┴─────────┴─────────┘
┌─────────┬────────────┬─────────┬─────────┬─────────┬─────────┬─────────┐
│ (index) │ population │   min   │   max   │   sum   │  mean   │ stdDev  │
├─────────┼────────────┼─────────┼─────────┼─────────┼─────────┼─────────┤
│    0    │ '900.000'  │ '0.002' │ '1.598' │ '8.492' │ '0.009' │ '0.069' │
└─────────┴────────────┴─────────┴─────────┴─────────┴─────────┴─────────┘
┌─────────┬────────────┬─────────┬─────────┬─────────┬─────────┬─────────┐
│ (index) │ population │   min   │   max   │   sum   │  mean   │ stdDev  │
├─────────┼────────────┼─────────┼─────────┼─────────┼─────────┼─────────┤
│    0    │ '900.000'  │ '0.002' │ '1.598' │ '8.492' │ '0.009' │ '0.000' │
└─────────┴────────────┴─────────┴─────────┴─────────┴─────────┴─────────┘
┌─────────┬────────────┬─────────┬─────────┬─────────┬─────────┬─────────┐
│ (index) │ population │   min   │   max   │   sum   │  mean   │ stdDev  │
├─────────┼────────────┼─────────┼─────────┼─────────┼─────────┼─────────┤
│    0    │ '900.000'  │ '0.002' │ '1.598' │ '8.492' │ '0.009' │ '0.069' │
└─────────┴────────────┴─────────┴─────────┴─────────┴─────────┴─────────┘

90,000 elements
┌─────────┬─────────────┬─────────┬─────────┬───────────┬─────────┬─────────┐
│ (index) │ population  │   min   │   max   │    sum    │  mean   │ stdDev  │
├─────────┼─────────────┼─────────┼─────────┼───────────┼─────────┼─────────┤
│    0    │ '90000.000' │ '0.001' │ '0.265' │ '135.576' │ '0.002' │ '0.000' │
└─────────┴─────────────┴─────────┴─────────┴───────────┴─────────┴─────────┘
┌─────────┬─────────────┬─────────┬─────────┬───────────┬─────────┬─────────┐
│ (index) │ population  │   min   │   max   │    sum    │  mean   │ stdDev  │
├─────────┼─────────────┼─────────┼─────────┼───────────┼─────────┼─────────┤
│    0    │ '90000.000' │ '0.001' │ '0.265' │ '135.576' │ '0.002' │ '0.002' │
└─────────┴─────────────┴─────────┴─────────┴───────────┴─────────┴─────────┘
┌─────────┬─────────────┬─────────┬─────────┬───────────┬─────────┬─────────┐
│ (index) │ population  │   min   │   max   │    sum    │  mean   │ stdDev  │
├─────────┼─────────────┼─────────┼─────────┼───────────┼─────────┼─────────┤
│    0    │ '90000.000' │ '0.001' │ '0.265' │ '135.576' │ '0.002' │ '0.000' │
└─────────┴─────────────┴─────────┴─────────┴───────────┴─────────┴─────────┘
┌─────────┬─────────────┬─────────┬─────────┬───────────┬─────────┬─────────┐
│ (index) │ population  │   min   │   max   │    sum    │  mean   │ stdDev  │
├─────────┼─────────────┼─────────┼─────────┼───────────┼─────────┼─────────┤
│    0    │ '90000.000' │ '0.001' │ '0.265' │ '135.576' │ '0.002' │ '0.002' │
└─────────┴─────────────┴─────────┴─────────┴───────────┴─────────┴─────────┘
```

