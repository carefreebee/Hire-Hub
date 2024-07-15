export function Entity() {
	return function (constructor: Function) {};
}

export function PrimaryKey() {
	return function (target: any, propertyKey: string) {};
}

export function Column(type: string) {
	return function (propertyKey: string) {};
}
