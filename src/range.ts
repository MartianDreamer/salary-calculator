/**
 * Represents a range of numbers with an open start and closed or infinite end.
 */
export class OpenStartRange<T> {
  constructor(
    private readonly _start: number,
    private readonly _end: number,
    private readonly _value: T,
  ) {}

  contains(value: number): boolean {
    return value > this._start && value <= this._end;
  }

  toString(): string {
    return `${this._start}-${this._end}-${this._value}`;
  }

  get start(): number {
    return this._start;
  }

  get end(): number {
    return this._end;
  }

  get value(): T {
    return this._value;
  }
}
