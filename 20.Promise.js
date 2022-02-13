function Promise (executor){

    this.promiseState = "pending"
    this.promiseRusult = null
    this.callback = {}
    const self = this
    function resolve (data){
        self.promiseState = "fulfilled"
        self.promiseRusult = data
        if(self.callback.onResolve){
            self.callback.onResolve(data)
        }
    }
    function reject (data){
        self.promiseState = "reject"
        self.promiseRusult = data
        if(self.callback.onResolve){
            self.callback.onResolve(data)
        }
    }
    executor(resolve,reject)
}

Promise.prototype.then = function(onResolve,onReject){
    // 调用回调函数 PromiseState
    
    if(this.promiseState === "fulfilled"){
        // 输出内容
        onResolve(this.promiseRusult)
    }
    if(this.promiseState === "reject"){
        onReject(this.promiseRusult)
    }
    if(this.promiseState === "pending"){
        this.callback={
            onResolve,
            onReject
        }
    }
}
