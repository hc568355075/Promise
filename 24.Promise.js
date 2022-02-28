function Promise (executor){
    // 添加属性
    this.promiseState = "pending"
    this.promiseRusult = null
    // 声明属性
    this.callbacks = []
    const self = this
    function resolve (data){
        // 判断状态
        if(self.promiseState !== 'pending') return
        // 修改对象的状态
        self.promiseState = "fulfilled"
        // 修改对象的结果值
        self.promiseRusult = data
        // 调用成功的回调函数
        self.callbacks.forEach(item=>{
            if(item.onResolve){
                item.onResolve(data)
            }  
        })
    }
    function reject (data){
        // 判断转台
        if(self.promiseState !== 'pending') return
        // 修改对象的状态
        self.promiseState = "reject"
        // 修改对象的结果值
        self.promiseRusult = data
        // 调用失败的回调函数
        self.callbacks.forEach(item=>{
            if(item.onReject){
                item.onReject(data)
            }
        })
    }
    try {
        executor(resolve,reject)
    } catch (error) {
        reject(error)
    }
}

Promise.prototype.then = function(onResolve,onReject){
    const self = this
    // 判断回调函数参数
    if(typeof onReject !== 'function'){
        onReject = reason =>{
            throw reason
        }
    }
    if(typeof onResolve !== 'function'){
        onResolve = reasolve => reasolve // reasolve=> {return reasolve}  ES6语法
    }
    // 调用回调函数 PromiseState
    return new Promise ((resolve,reject)=>{
        // 封装
        function callback(type){
            try {
                // 输出内容
                let result = type(self.promiseRusult)
                if(result instanceof Promise){
                    result.then(value=>{
                        resolve(value)
                    },reason=>{ 
                        reject(reason)
                    })
                }else{
                    resolve(result)
                }
            }catch (error) {
                reject(error)
            }
        }
        if(this.promiseState === "fulfilled"){
            callback(onResolve)
        }
        if(this.promiseState === "reject"){
            callback(onReject)
         }
        if(this.promiseState === "pending"){
            this.callbacks.push({
                    onResolve: function(){
                       callback(onResolve)
                    },
                    onReject: function(){
                        callback(onReject)
                    }
            })
        }
    })
}
Promise.prototype.catch = function(onReject){
    return this.then(undefined,onReject)
}