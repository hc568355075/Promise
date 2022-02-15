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
    // 调用回调函数 PromiseState
    return new Promise ((resolve,reject)=>{
        if(this.promiseState === "fulfilled"){
           try {
                // 输出内容
            let result = onResolve(this.promiseRusult)
            if(result instanceof Promise){
                result.then(value=>{
                    resolve(value)
                },reason=>{ 
                    reject(reason)
                })
            }else{
                resolve(result)
            }
           } catch (error) {
               reject(error)
           }
        }
        if(this.promiseState === "reject"){
            onReject(this.promiseRusult)
         }
        if(this.promiseState === "pending"){
            this.callbacks.push( {
                onResolve: function(){
                    onResolve(resolve)
                },
                onReject: onReject
            })
        }
    })
}
