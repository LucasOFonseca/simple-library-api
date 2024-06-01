export interface UserRequestDTO {
  name: string;
  contact: string;
  document: string;
}

export interface UserDTO extends UserRequestDTO {
  id: string;
}
