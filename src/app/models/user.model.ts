export interface User{
  status: boolean;
  email: string;
  id: number;
  nome: string;
  senha: string;
}

export interface CreateUserDto{
  nome: string;
  email: string;
  senha: string;
}
