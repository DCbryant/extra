function runner(_gen){//接收一个生成器
  return new Promise((resolve, reject)=>{
    var gen=_gen();

    _next();
    function _next(_last_res){
        var res=gen.next(_last_res);//返回一个thunk函数

        if(!res.done){//如果生成器没有结束，就继续执行promise
          var obj=res.value;

          if(obj.then){
            obj.then((res)=>{
              _next(res);
            }, (err)=>{
              reject(err);
            });
          }else if(typeof obj=='function'){//如果obj是一个函数
            if(obj.constructor.toString().startsWith('function GeneratorFunction()')){
              runner(obj).then(res=>_next(res), reject);
            }else{//是函数就继续递归执行_next()，是生成器就继续递归执行runner
              _next(obj());
            }
          }else{
            _next(obj);
          }
        }else{//如果生成器结束了
          resolve(res.value);
        }
    }
  });
}
