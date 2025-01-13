# Sistema de Gerenciamento de Patentes

Este é um sistema de gerenciamento de patentes desenvolvido com React, Zustand, React Router e Axios. Ele permite gerenciar patentes de forma eficiente, com autenticação segura utilizando JWT e uma API REST.

## Funcionalidades

- **Autenticação**: Login e logout com validação de token JWT.
- **Rotas protegidas**: Acesso restrito a usuários autenticados.
- **CRUD de Patentes**:
  - Criação de novas patentes.
  - Busca de patentes existentes.
  - Visualização dos detalhes de uma patente.
  - Atualização de informações de uma patente.
  - Exclusão de patentes.
- **Pesquisa de patentes**: Busca por palavras-chave.
- **Interface amigável**: Navegação intuitiva e responsiva.

---

## Tecnologias Utilizadas

### Frontend
- React
- Zustand (Gerenciamento de estado global)
- React Router (Gerenciamento de rotas)
- Axios (Requisições HTTP)
- Lucide-react (Ícones)

### Backend
- API REST hospedada no Vercel.

---

## Arquitetura

Este projeto foi desenvolvido como uma **Single Page Application (SPA)**. Todas as interações com o sistema acontecem em uma única página carregada, com navegação gerenciada pelo React Router. Isso garante uma experiência fluida e rápida para o usuário.

---

## Interface e Design

- Layout projetado para uma experiência de usuário intuitiva, com navegação clara e responsiva.
- Feedback visual em ações como login, busca e edição de patentes.
- Design responsivo para dispositivos móveis e desktops, utilizando CSS moderno e flexível.

---

## Fluxo de Navegação

- **Login**: Página inicial para autenticação do usuário.
- **Lista de Patentes**: Exibe todas as patentes cadastradas.
- **Detalhes de Patente**: Permite visualizar e editar uma patente específica.
- **Novo Cadastro**: Formulário para criação de uma nova patente.

---