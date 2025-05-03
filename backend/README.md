## Backend FastAPI

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