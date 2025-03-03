export interface User{
  id?: number;
  status?: boolean;
  email: string;
  nome: string;
  senha: string;
}

export interface CreateUserDto{
  nome: string;
  email: string;
  senha: string;
}
