
function controllerModule(name: string) {
    return function <T extends { new(...args: any[]): {} }>(target: T) {
        return class extends target {
            __modulename: string = name;
            __actions = {};

            constructor(...args) {
                super(...args);
                const self = this as any;
                self.__registerAction = self.__registerAction || function () { };
                self.__registerAction.call(this);
                console.log(target)
            }

        };
    }
}

@controllerModule("haha")
class Haha{

}

let a = new Haha();
console.log(a);