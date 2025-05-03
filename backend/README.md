# Backend FastAPI

> Comandos bash para ambiente windows

1. ativar ambiente virtual

```bash
cd backend
python -m venv venv
.\venv\Scripts\activate
```

2. instalar dependencias

```bash
pip install -r .\requirements.txt
```

3. Subir banco de dados

4. Preencher .env

- gerar o SECRET_KEY no terminal do python:

```bash
import secrets
print(secrets.token_urlsafe(32))
```

5. Rodar aplicação

```bash
python main.py
```

Já é possível testar a api no ambiente [local na porta 8000](http://localhost:8000/), sugere-se utilizar algum ambiente como postman ou insomnia.

## Rotas

### Auth

> prefixo /auth 

- (get) / : caso logado (barear token header authorization) retorna mensagem "Esta é uma rota protegida" seguida pelo nome do usuario logado.
- (post) /registrar : cadastra usuário com senha protegida por hash jwt, segue o [UsuarioCreate](./auth/schemas.py) para formar o body da requisicao
- (post) /token : login, com usuario e senha enviados via form-data retorna access_token usado em rotas protegidas e token_type = bearer
- (get) /{id} : retorna informações do usuário com id = {id}
- (get) /usuarios/me : retorna id, nome e email do usuario logado, necessita de barear token na authorization

### Receitas

> prefixo /receitas 

- (get) / : retorna receitas cadastradas, limite de 10 receitas
- (post) / : cadastra receita com base em [ReceitaSchema](./schemas.py)
- (get) /{receita_id} : retorna receita de id = receita_id
- (put) /{receita_id} : atualiza receita de id = receita_id
- (patch) /{receita_id} : atualiza receita de id = receita_id
- (delete) /{receita_id} : deleta receita de id = receita_id