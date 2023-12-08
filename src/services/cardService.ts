import {
	repeatDelay
} from '@/utils';

export default class CardService {
	protected static observer :ResizeObserver;
	protected static primaryKey = 0;
	protected static idList :number[] = [];

	protected element :HTMLElement;

	public static builder(
		element: HTMLElement
	) {
		const cardId = element.getAttribute('card-id');

		if(
			cardId &&
			this.idList
				.includes(parseInt(cardId))
		) return;

		if(! this.observer) {

		}

		return new CardService(element);
	}

	protected constructor(
		element: HTMLElement
	) {
		this.element =this.elementDecorationer(element);
	};

	protected elementDecorationer(
		element: HTMLElement
	) :HTMLElement {
		CardService.primaryKey++;
		CardService.idList
			.push(CardService.primaryKey);
		element.setAttribute(
			'card-id',
			(CardService.primaryKey).toString()
		);
		return element;
	};
};