interface ICounterDataStructure {
	[index: string] : number;
}

export interface ICounter {
	add(key: string) : void;
	update(keys: Array<string>) : void;
	count(key: string) : number;
	mostCommon(n?: number) : Array<string> | never;
	values() : Array<number>;
	length() : number;
}

export class Counter implements ICounter {

	private counts_ : ICounterDataStructure;
	private length_ : number;

	public constructor(initList ?: Array<string>) {
		this.length_ = 0;
		this.counts_ = {};
		if(initList) {
			this.update(initList);
		}
	}
	
	public add(key : string) : void {
		if(this.counts_[key]) {
			++this.counts_[key];
		} else {
			this.counts_[key] = 1;
			++this.length_;
		}
	}

	public update(keys : Array<string>) : void {
		for(let key of keys) {
			this.add(key);
		}
	}

	public count(key: string) : number {
		return this.counts_[key] ? this.counts_[key] : 0;
	}

	public mostCommon(n ?: number) : Array<string> | never {
		const counts = this.counts_;
		// I'm checking if n is an argument, but I think that
		// if n is 0 then 0 will be falsey and this won't run
		if(n || n === 0) {
			if(n < 0) {
				throw new Error('argument must be positive');
			} else {
				// default sort is ascending order but the most common should be descending
				return Object.keys(counts).sort((a,b) => counts[b] - counts[a]).slice(0,n);
			}
		} else {
			return Object.keys(counts).sort((a,b) => counts[b] - counts[a]);
		}
	}

	public values() {
		return Object.values(this.counts_);
	}

	public length() {
		return this.length_;
	}
}