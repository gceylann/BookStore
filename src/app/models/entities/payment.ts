export interface Payment{
  orderId:number;
  nameSurname:string;
  creditCardNumber:string;
  expirationDate:string;
  cvc:string;
  saveCard:boolean;
}