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
	max? :number;
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
	width? :number;
	height? :number;
};

type LegendData = {
	name? :string;
	color? :Color;
	colorGroup? :Color[];
};

export type LegendOptions = {
	data? :LegendData[];
	fontOptions? :FontOptions;
	grid? :GridOptions;
	gap? :number;
};

export type TooltipOptions = {
	fontOptions? :FontOptions;
	fill? :Color;
	padding? :[number, number, number, number];
	data? :Map<string, string[]>;
	borderWidth? :number;
	borderColor? :Color;
};

export type ChartsOptions<T extends unknown[]> = {
	designWidth :number;
	data? :T
	xAxis? :AxisOptions;
	yAxis? :AxisOptions;
	yAxisGroup? :AxisOptions[];
	series? :SerieOptions;
	gridOptions? :GridOptions;
	legendOptions? :LegendOptions;
	tooltipOptions?	:TooltipOptions;
	colorMap? :Map<string, Color>;
};
	