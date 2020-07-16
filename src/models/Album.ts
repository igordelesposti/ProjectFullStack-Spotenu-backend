import { Genre } from "./Genre";

export interface Album {
  id: string;
  name: string;
  created_by: string;
  id_genre: Genre[];
}

export interface albumDTO {
  name: string;
  created_by: string;
  id_genre: Genre[];
}
