export function Entity() {
	return function (constructor: Function) {};
}

export function PrimaryGeneratedColumn() {
	return function (target: any, propertyKey: string) {};
}

export function Column(option?: { name?: string; unique?: boolean; default?: string }) {
	return function (target: any, propertyKey: string) {};
}
