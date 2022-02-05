
class ScheduledFunction {
	#foo
	#args
	#halted
	
	constructor(foo, interval, offset, ...args) {
		if (typeof foo !== "function") {
			throw new TypeError("foo is not a function")
		} else {
			this.#foo = foo
		}
		
		if (typeof interval !== "number") {
			throw new TypeError("interval is not a number")
		} else if (interval <= 0) {
			throw new RangeError("interval must be greater than 0")
		} else {
			if (interval < 1000) {
				console.warn("Warning! Short intervals may result in missed ticks!")
			}
			this.interval = interval
		}
		
		if (offset === null) {
			this.offset = 0
		} else if (typeof offset !== "number") {
			throw new TypeError("offset is not a number")
		} else {
			this.offset = offset
		}
		
		this.#args = args
	}
	
	forceTick() {
		return this.#foo(...this.#args)
	}
	
	getNextDelay() {
		return (this.offset - Date.now()) % this.interval + this.interval
	}
	
	getNextTimestamp() {
		return this.getNextDelay() + Date.now()
	}
	
	halt() {
		this.running = false
		this.#halted = true
		return this
	}
	
	start() {
		this.running = true
		this.#halted = false
		setTimeout(
			() => {
				if (this.#halted) {
					return
				}
				this.forceTick()
				this.start()
			},
			this.getNextDelay()
		)
		return this
	}
}

const Units = {
	Second: 1000,
	Minute: 60*1000,
	Hour: 60*60*1000,
	Day: 24*60*60*1000,
	Week: 7*24*60*60*1000,
}

const Intervals = {
	Secondly: Units.Second,
	Minutely: Units.Minute,
	Hourly: Units.Hour,
	Daily: Units.Day,
	Weekly: Units.Week,
}

const Offsets = {
	Sunday: Units.Day*3,
	Monday: Units.Day*4,
	Tuesday: Units.Day*5,
	Wednesday: Units.Day*6,
	Thursday: 0,
	Friday: Units.Day,
	Saturday: Units.Day*2,
	Noon: Units.Hour*12,
}

exports.ScheduledFunction = ScheduledFunction
exports.Units = Units
exports.Intervals = Intervals
exports.Offsets = Offsets
