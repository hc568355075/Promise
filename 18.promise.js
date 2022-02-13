// 构造函数
function Promise(executor){
    // 设置初始值
    this.promiseState = "pending"
    this.promiseRusult = null
    const self =this
    // resolve 函数
    function resolve(data){
        // console.log(this);
        // 设置代码只能修改一次，不能重失败改为成功
        if(self.promiseRusult !== "pending") return
        // 修改对象属性 (promiseState)
        self.promiseState = "fulfilled"
        // 修改对象的结果值 (promiseRuslt)
        self.promiseRusult = data
    }
    // reject 函数
    function reject(data){
        // 设置代码只能修改一次，不能重成功改为失败
        if(self.promiseRusult !== "prending") return 
        // 修改对象属性
        self.promiseState = "reject"
        // 修改对象的结果值
        self.promiseRusult = data
    }
    // 同步调用 执行器函数
    try {
        executor(resolve,reject)
    } catch (error) { //error就是抛出的值
        reject(error)
    }
}

// 添加then方法
Promise.prototype.then = function (onResolve,onReject){

}