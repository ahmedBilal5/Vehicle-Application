export class vehicle{
    id:number;
    brand: string;
    condition: string;
    fuel: string;
    engine_capacity: string;
    steering: string;
    kms_driven: number;
    model: string;
    price: number;
    registered_city: string;
    transaction_type: string;
    year: number;
    rating: number;
    image: string;
    seller_name: string;
    seller_image: string;
    seller_comments: string[];


    constructor(id: number, brand: string, condition: string, fuel: string, engine_capacity: string, steering: string, kms_driven: number, model: string, price: number, registered_city: string, transaction_type: string, year: number, rating: number, image: string, seller_name: string, seller_image: string, seller_comments: string[]){
        this.id = id;
        this.brand= brand;
        this.condition= condition;
        this.fuel= fuel;
        this.engine_capacity= engine_capacity;
        this.steering = steering;
        this.kms_driven = kms_driven;
        this.model = model;
        this.price= price;
        this.registered_city = registered_city;
        this.transaction_type = transaction_type;
        this.year = year;
        this.rating = rating;
        this.image = image;
        this.seller_name = seller_name;
        this.seller_image = seller_image;
        this.seller_comments = seller_comments;
    }

//Here I have added a new comment! Ha Ha

}