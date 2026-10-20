# PFE 2026.2 — AP2 — Grupo 3 (terça-feira)

Projeto da disciplina **Projeto Front-end** (2026.2), avaliação **AP2**. Este repositório guarda o **site em React** (produto final da AP2, publicado no Vercel) e a **documentação oficial** do projeto.

## Integrantes

- Leonardo Camero (líder e Scrum Master)
- David Madureira
- Santiago Alejo
- João Duarte
- Pedro Henrique Godoy
- Kaue Reis
- Arthur Aires

## Sobre o projeto

O cliente é a **PKZ / One to One**, formada por dois estúdios de treinamento esportivo: o PKZ, focado em atletas jovens e adolescentes, e o One to One, de personal training para todas as idades. Na AP1, o grupo entrevistou o cliente, levantou as demandas e montou o protótipo no Figma. Na AP2, esse protótipo vira site.

### Escopo da AP2

- Site institucional com Home, página PKZ, página One to One e agendamento de aula experimental.
- **Sem** cadastro, **sem** login e **sem** cards ou dados de treino de atletas.
- A única integração com back-end é o **agendamento de aula experimental**.
- As telas 07 (perfil do aluno) e 08 (relatório para os pais) do protótipo ficaram **fora do escopo da AP2**, porque dependem de login e de dados do back-end.

### Entregas

| Entrega | Tecnologia | Publicação | Repositório |
|---|---|---|---|
| Site vanilla | HTML, CSS e JS puro (agendamento só visual) | GitHub Pages | [PFE-2026-2-AP2-Grupo3-terca-vanilla](https://github.com/leomautone/PFE-2026-2-AP2-Grupo3-terca-vanilla) |
| Site React (AP2) | React (agendamento integrado ao back-end) | Vercel | este repositório |

O código React começa depois que o site vanilla estiver pronto. Por enquanto, este repositório tem só a documentação.

- **Protótipo no Figma:** https://www.figma.com/design/CQmuVXYjxTUkLDg5CzWbk0
- **Repositório da AP1:** https://github.com/leomautone/PFE-2026-2-AP1-Grupo3-terca

## Estrutura do repositório

```
docs/
  entrevista/       # transcrição da entrevista com o cliente (v1) e demandas organizadas em tópicos (v2)
  brainstorm/       # ideias levantadas pelo grupo a partir das demandas
  mindmap/          # mapa mental do problema
  5w2h/             # plano de ação
  doc-visao/        # documento de visão
  aht/              # análise hierárquica de tarefas
  prototipo/        # descrição do protótipo e telas exportadas do Figma (telas/)
  scrum/            # backlog e registro das sprints (AP1 e AP2)
```

A documentação veio da AP1 e é atualizada aqui ao longo da AP2. O andamento das tarefas fica em [docs/scrum/07-backlog-scrum.md](docs/scrum/07-backlog-scrum.md).
