# scheduling-assistant

```js
const sa = require("./SchedulingAssistant.js")
```

# Classes

## SchedulingAssistant.ScheduledFunction

Data structure to help create and manage interval functions.

### Constructor

```js
new SchedulingAssistant.ScheduledFunction(foo, interval, offset[, arg1, arg2, ...])
```

#### foo

The function to run  
Type: `Function`  

#### interval

The length of the schedule interval in milliseconds  
Type: `Number`  

#### offset

The offset of the schedule interval relative to the Epoch in milliseconds  
Type: `Number`  

#### args

Arguments to pass to foo  
Type: `Any`  

### Properties

#### .interval

The length of the schedule interval in milliseconds  
Type: `Number`  

#### .offset

The offset of the schedule interval relative to the Epoch in milliseconds  
Type: `Number`  

#### .running

Whether the scheduled function was started and has not been halted  
Type: `?Boolean`  

### Methods

#### .forceTick()

Force the scheduled function to run now. This will not affect other ticks on the schedule  
Returns: `?V` (value returned by the ScheduledFunction's function)  

#### .getNextDelay()

Get the time remaining until the next tick in milliseconds  
Returns: `Number`  

#### .getNextTimestamp()

Get the timestamp of the next tick in milliseconds since the Epoch  
Returns: `Number`  

#### .halt()

Halts the schedule  
Returns: `ScheduledFunction`  

#### .start()

Starts the schedule. Can be used to restart a scheduled function after a .halt()  
Returns: `ScheduledFunction`  

## SchedulingAssistant.Units

Assist with math involving milliseconds

### Properties

`.Second`  
`.Minute`  
`.Hour`  
`.Day`  
`.Week`  

## SchedulingAssistant.Intervals

Assist with math involving milliseconds

### Properties

`.Secondly`  
`.Minutely`  
`.Hourly`  
`.Daily`  
`.Weekly`  

## SchedulingAssistant.Offsets

Assist with math involving milliseconds

### Properties

`.Sunday`  
`.Monday`  
`.Tuesday`  
`.Wednesday`  
`.Thursday`  
`.Friday`  
`.Saturday`  
`.Noon`  

# Examples

```js
const { ScheduledFunction, Intervals, Offsets, Units } = require("./SchedulingAssistant.js")
```

Create and start a scheduled function that will run foo weekly on Mondays at 17:00 UTC  
```js
const someScheduledFunction = new ScheduledFunction(
  foo,
  Intervals.Weekly,
  Offsets.Monday + Units.Hour*17
).start()
```

Scheduled functions can also be created and ran later  
```js
const conditionalScheduledFunction = new ScheduledFunction(
  foo,
  Intervals.Secondly*10,
  0
)
if (someBoolean) conditionalScheduledFunction.start()
```
