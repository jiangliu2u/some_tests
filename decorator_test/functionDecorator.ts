function funcDec() {
    /**
    * @param target 被装饰方法所在类的prototype的值，比如 function a() {};a.prototype.func = function()   {},
    * target就是a.prototype，所以可以给类追加方法
    * @param propertyKey 被修饰function的名称字符串
    * @param PropertyDescriptor 被修饰的方法的属性和值 configurable:true，enumerable:true，value:function () { … }，
    * writable:true
    */
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log(arguments)
        console.log('target');
        console.log(target.detail);
        console.log(propertyKey);
        console.log(descriptor);
        // 为被修饰的类追加 addfunc这个方法
        target.addfunc = function() {

        }
        if(propertyKey == 'detail') {
            // 装饰器这个中模式意图是无入侵式的修饰
            let originFunc = descriptor.value;
            descriptor.value = function(...param: any[]) {
                console.log('funcDec detail 1'); //①
                console.log(funcDec,(<any>this).name);//②
                originFunc.call(this,...param);//③
            }            
        }

    }
}
class func {
    name = 'heheh';
    @funcDec()
    detail() {
        //④
        console.log(this.name)
        console.log(' detail origin func');
    }
    detail2() {
        console.log(this.name)
        console.log('origin func');        
    }
}
console.log(func)
let instance = new func();
console.log('excute function detail');
instance.detail();
console.log(instance);