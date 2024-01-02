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

export type FontOptions = {
	size? :number;
	family? :string;
	color? :string;
	lineHeight? :number;
	weight? :number | 'bold' | 'bolder' | 'lighter' |'normal';
};

export type AxisNameOptions = {
	padding? :[number, number, number, number];
	fontOptions? :FontOptions;
};

export type LineStyle = {
	width?: number;
	color? :Color;
};

export type StateOptions = {
	show? :boolean;
};

export type SymbolOptions = {
	size? :number;
	color? :Color;
	borderWidth? :number;
	borderColor? :Color;
};

export type AxisOptions = {
	name? :string;
	nameOptions? :AxisNameOptions;
	offset? :number;
	fontOptions? :FontOptions;
	tickOptions? :StateOptions & LineStyle & {inside?: boolean};
	lineOptions? :StateOptions & LineStyle;
	formatter? :((value :string | number, index :number) => string);
};

export type GridOptions = {
	top? :number;
	right? :number;
	bottom? :number;
	left? :number;
};

export type SerieOptions = {
	fill? :Color;
	stroke? :Color;
	opacity? :number;
	fontOptions? :FontOptions;
	lineOptions? :StateOptions & LineStyle;
	symbolOptions? :SymbolOptions;
};
	