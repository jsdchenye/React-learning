/*
** react源码中关于setState的实现部分
 */
HTMLOptionsCollection.prototype.setState = function(partialState, callback) {
  invariant(
    typeof partialState === 'object' ||
    typeof partialState === 'function' ||
    partialState == null
  );
  this.updater.enqueueSetState(this, partialState, callback, 'setState');
}

/*
** react源码中关于setState的实现部分(包裹了promise之后的异步实现)
** 改方案会带来很多问题（未被react纳入）
 */

HTMLOptionsCollection.prototype.setState = function(partialState, callback) {
  invariant(
    typeof partialState === 'object' ||
    typeof partialState === 'function' ||
    partialState == null
  );
  let callbackPromise = null;
  if (!callback) {
    class Deffered {
      constructor() {
        this.promise = new Promise((resolve, reject) => {
          this.reject = reject;
          this.resolve = resolve;
        });
      }
    }
    callbackPromise = new Deffered();
    callback = () => {
      callbackPromise.resolve();
    };
  }
  this.updater.enqueueSetState(this, partialState, callback, 'setState');

  if (callbackPromise) {
    return callbackPromise.promise;
  }
}