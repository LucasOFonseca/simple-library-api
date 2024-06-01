export interface CreateUserDTO {
  name: string;
  contact: string;
  document: string;
}

export interface UserDTO extends CreateUserDTO {
  id: string;
}
