/*
 * A very naive copy-on-write immutable stack. Since the size of the stack
 * is equal to the depth of the embedded resources for one HAL resource, the bad
 * performance for the copy-on-write approach is probably not a problem at all.
 * Might be replaced by a smarter solution later. Or not. Whatever.
 */

export class ImmutableStack {

  private _array: any[];

  constructor(arr?: any[]) {
    if (arr) {
      this._array = arr;
    } else {
      this._array = [];
    }
  }

  public array() {
    return this._array;
  }

  public isEmpty() {
    return this._array.length === 0;
  }

  public push(element) {
    const array = this._array.slice(0);
    array.push(element);

    return new ImmutableStack(array);
  }

  public pop() {
    const array = this._array.slice(0, this._array.length - 1);

    return new ImmutableStack(array);
  }

  public peek() {
    if (this.isEmpty()) {
      throw new Error('can\'t peek on empty stack');
    }

    return this._array[this._array.length - 1];
  }

}
