import type {
	PatternObject,
	LinearGradientObject,
	RadialGradientObject
} from 'echarts/core';

export type UEScreenMessage = {
	ctid :number;
	[key :string] :unknown;
};

export type RemoveIndex<T> = {
	[ K in keyof T as string extends K ? 
		never : number extends K ?
		never : symbol extends K ?
		never : K
	]: T[K];
};

export type DirectExtract<
	T,
	K extends keyof RemoveIndex<T>,
	S = Pick<Required<RemoveIndex<T>>, K>
> =
	S extends Record<K, S[keyof S]> ?
	S[keyof S] : never;
	

export type Color = 
| string 
| PatternObject 
| LinearGradientObject 
| RadialGradientObject;

export type FontsOptions = {
	size? :number;
	family? :string;
	color? :string;
	lineHeight? :number;
	weight? :number | 'bold' | 'bolder' | 'lighter' |'normal';
};
	