export type TIngredientType = 'bun' | 'main' | 'sauce';

export interface TIngredient {
	_id: string;
	name: string;
	type: TIngredientType;
	price: number;
	image: string;
	image_mobile: string;
	image_large: string;
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	__v?: number;
	uid?: string;
}

export interface TConstructorIngredient extends TIngredient {
	uid: string;
}

export interface TIngredientsResponse {
	success: boolean;
	data: TIngredient[];
}

export interface TOrderResponse {
	success: boolean;
	name: string;
	order: { number: number };
}

export type TLocationState = {
	background?: import('history').Location;
	from?: string | import('history').Location;
};
