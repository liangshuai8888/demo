class Person{
	constructor(name,age){
		this.name = name;
		this.age = age;
	}

	say(){
		//return '我是' + ${this.name}',我今年' + ${this.age} + '岁了。';
		//字符换模板 用的是 反引号 ${变量}
		return `我是 ${this.name},我今年${this.age}岁了`;
	}
}

export default Person;