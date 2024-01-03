<style lang="scss" scoped>
	.container {
		width: 50vw;
		height: 50vh;
		border: 1px solid red;
	}
</style>

<template>
	<div class="container">
		
	</div>
</template>

<script setup lang="ts">
	import type {
		EChartsOption
	} from 'echarts';

	import * as echarts from 'echarts';

	import {
		onMounted
	} from 'vue';

	const config = {
		margin: 22,
		widht: 14,
		maxLapse: 3 / 4
	};

	type DistanceJudgesConfig = {
		margin :[number, number];
		widht :[number, number];
		ratios :number;
	};

	const getMaxData = (
		dis :'row' | 'col',
		data :unknown[][]
	) => {
		if(dis === 'row'){
			return data.slice(1).map(
				row => row.filter(value => typeof value === 'number') as number[]
			).map(
				row => row.sort((a, b) => a > b ? -1 : 1)[0]
			).sort((a, b) => a > b ? -1 : 1)[0];
		}else if(dis === 'col'){
			return data.map(
				row => row.slice(1).filter(value => typeof value === 'number') as number[]
			).map(
				row => row.sort((a, b) => a > b ? -1 : 1)[0]
			).sort((a, b) => a > b ? -1 : 1)[0];
		}else {
			throw new Error('the dis is error');
		}
	};

	const createDistanceJudges = (
		config :DistanceJudgesConfig
	) => {
		let [_margin, _width, _requireDistance] = [0, 0, 0];

		return (
			count :number,
			distance :number,
		) => {
			_requireDistance = (config.widht[0] * count) + (config.margin[0] * (count - 1));

			if(_requireDistance <= distance * config.ratios) return {
				widht: config.widht[0],
				margin: config.margin[0],
				requireDistance: _requireDistance
			};

			_margin = config.margin[0] - (Math.abs(_requireDistance - (distance * config.ratios)) / (count - 1));

			if(_margin >= config.margin[1]) return {
				widht: config.widht[0],
				margin: _margin,
				requireDistance: _requireDistance
			};

			_width = config.widht[0] - (Math.abs(_margin - config.margin[1]) * (count - 1));
			_margin = config.margin[1];
			
			if(_width >= config.widht[1]) return {
				widht: _width,
				margin: _margin,
				requireDistance: _requireDistance
			};

			throw new Error('to much data');
		};
	};

	const distanceJudges = createDistanceJudges({
		margin: [22, 4],
		widht: [14, 10],
		ratios: 3 / 4,
	});

	onMounted(() => {
		const maxData = getMaxData('col', [
			['item1', 10, 20],
			['item2', 20, 30],
			['item3', 30, 40],
		]);

		echarts.init(
			document.querySelector('.container') as HTMLElement
		).setOption({
			dataset: {
				sourceHeader: false,
				source: [
					['item1', 10, 20],
					['item2', 20, 30],
					['item3', 30, 40],
				]
			},
			xAxis: {
				type: 'category',
				axisTick: {
					alignWithLabel: true,
				},
			},
			yAxis: {
				type: 'value'
			},
			series: [
				{
					type: 'custom',
					encode: {
						x: 0,
						y: [1, 2]
					},
					renderItem: (params, api) => {
						const [
							xAxisValues,
							yAxisValues,
							nextXAxisValues,
							preXAxisValues
						] = [
							params.encode.x.map(dis => api.value(dis)),
							params.encode.y.map(dis => api.value(dis)),
							params.encode.x.map(dis => api.value(dis, params.dataIndexInside + 1)),
							params.encode.x.map(dis => api.value(dis, params.dataIndexInside ? params.dataIndexInside - 1 : 0)),
						];

						const [
							x, y, originY, nextX, preX, maxY
						] = [
							xAxisValues.map(value => api.coord([value, 0])[0]),
							yAxisValues.map(value => api.coord([0, value])[1]),
							api.coord([0, 0])[1],
							nextXAxisValues.map(value => api.coord([value, 0])[0]),
							preXAxisValues.map(value => api.coord([value, 0])[0]),
							api.coord([0, maxData])[1],
						];

						const xAxisDiff = Math.abs((nextX[0] ? nextX[0] : preX[0]) - x[0]);

						const {
							widht: dataBarWidht, 
							margin: dataBarMargin, 
							requireDistance
						} = distanceJudges(params.encode.y.length, xAxisDiff);

						const [
							coverBarX, coverBarY, coverBarWidth, coverBarHeight,
						] = [
							x[0] - (requireDistance / 2),
							maxY,
							requireDistance,
							Math.abs(maxY - originY),
						];



/* 					
					(widht + margin) * index

					1:
						x: coverBarX		=> index: 0

					2:
						x: coverBarX + widht + margin		=> index: 1

					3:
						x: coverBarX + widht + margin + widht + margin		=> index: 2
 */


						const itemList = y.map((value, index) => {
							return {
								type: 'rect',
								style: {
									fill: 'red'
								},
								shape: {
									x: coverBarX + (index * (dataBarWidht + dataBarMargin)),
									y: value,
									width: dataBarWidht,
									height: Math.abs(value - originY)
								}
							}
						})

/* 
						console.log(
							'@demo', '\r\n',
							'xAxisValues : ', xAxisValues,'\r\n',
							'x : ', x,'\r\n',
							'preXAxisValues : ', preXAxisValues,'\r\n',
							'preX : ', preX,'\r\n',
							'nextXAxisValues : ', nextXAxisValues,'\r\n',
							'nextX : ', nextX,'\r\n',
							'nextX : ', nextX,'\r\n',
							'xAxisDiff : ', xAxisDiff,'\r\n',
							'distance : ', requireDistance,'\r\n',
							'x', x,'\r\n',
							'y', y,'\r\n',
							'\r\n\r\n'
						);
 */
						return {
							type: 'group',
							children: [
								{
									type: 'rect',
									shape: {
										x: coverBarX,
										y: coverBarY,
										width: coverBarWidth,
										height: coverBarHeight
									}
								},
								...itemList,
							]
						}
					}
				},
			]
		} as EChartsOption);
	});
</script>