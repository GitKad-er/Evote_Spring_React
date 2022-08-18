import { Entreprise } from "src/environments/environment.prod";

export class Location {
  id: any;
  location_label?:string;
  code_entreprise= Entreprise
  code_agency?:string;
  code_post?:string;
  code?:string;
}
