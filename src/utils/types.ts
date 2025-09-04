export type TIngredientType = 'bun' | 'sauce' | 'main';

export type TIngredient = {
	_id: string;
	name: string;
	type: TIngredientType;
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	price: number;
	image: string;
	image_mobile: string;
	image_large: string;
	__v?: number;
	uid?: string;
};

export type TOrderStatus = 'created' | 'pending' | 'done';

export type TOrder = {
	_id: string;
	number: number;
	name: string;
	status: TOrderStatus;
	ingredients: string[];
	createdAt: string;
	updatedAt: string;
};
export interface TConstructorIngredient extends TIngredient {
	uid: string;
}

export interface TOrdersFeedMessage {
	success: boolean;
	orders: TOrder[];
	total: number;
	totalToday: number;
}

export interface TOrderByNumberResponse {
	success: boolean;
	orders: TOrder[];
}

export type TLocationState = {
	background?: import('history').Location;
	from?: string | import('history').Location;
};
