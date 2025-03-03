export interface JwtToken{
  access_token: string;
  token_type: string;
}

export interface Login extends JwtToken{
  grant_type?: string | null;
  scope?: string;
  client_secret?: | null;
}
