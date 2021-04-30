/**
 * 基类
 */
export default class BaseClass {
  constructor() {
    this._events = []
  }

  destroy() {}

  /**
   * 绑定指定类型事件监听器
   * @param {EventType} type 事件类型
   * @param {function} fn 绑定的监听器回调方法
   * @param {object} context 侦听器的上下文(this关键字将指向的对象)
   */
  on(type, fn, context) {
    this._events[type] ? this._events[type].push({ context: context, fn: fn }) : (this._events[type] = [{ context: context, fn: fn }])
  }

  off(types, fn, context) {}
}
