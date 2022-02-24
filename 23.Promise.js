function Promise (executor){

    this.promiseState = "pending"
    this.promiseRusult = null
    this.callbacks = []
    const self = this
    function resolve (data){
        self.promiseState = "fulfilled"
        self.promiseRusult = data
        
        self.callbacks.forEach(item=>{
            if(item.onResolve){
                item.onResolve(data)
            }  
        })
    }
    function reject (data){
        self.promiseState = "reject"
        self.promiseRusult = data
        self.callbacks.forEach(item=>{
            if(item.onReject){
                item.onReject(data)
            }
        })
    }
    executor(resolve,reject)
}

Promise.prototype.then = function(onResolve,onReject){
    const self = this
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
    // 调用回调函数 PromiseState
    return new Promise ((resolve,reject)=>{
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
