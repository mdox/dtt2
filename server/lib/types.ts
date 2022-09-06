export interface DriverClientPost {
  id: number;
  code: string;
  firstname: string;
  lastname: string;
  country: string;
  team: string;
  place: number;
  imgUrl: string;
}

export interface DriverServerPost extends Omit<DriverClientPost, "imgUrl"> {
  img_url: string;
}

export interface DriverServerPostToCreate
  extends Omit<DriverServerPost, "id"> {}
