# Tarefa — David — Página de agendamento (React)

David, você vai passar para React a **página de agendamento**: calendário com filtro e disponibilidade, lateral, modal do dia, validação e ida para a confirmação. É a parte com mais JavaScript do site, porque o `js/agendamento.js` vai ser reescrito do jeito do React. Comece cedo e me chama se travar.

O site **não vai ter back-end**. Por isso, **a disponibilidade continua simulada, como no vanilla**. Você só deixa a simulação num arquivo separado, para a página ficar mais fácil de ler.

## O que você edita

- `src/pages/Agendamento.jsx` (já existe, com uma página provisória)
- `src/pages/Agendamento.css` (você cria)
- `src/pages/dadosAgendamento.js` (você cria)

## O que você NÃO pode mexer

- `src/styles/base.css`, `src/components/` e `src/App.jsx`
- Os arquivos das outras pessoas, incluindo a confirmação do Arthur

## De onde vem o conteúdo

- Do vanilla: o `<main>` do `agendamento.html`, o `css/agendamento.css` e o `js/agendamento.js`
- Telas de referência: [04-agendamento-calendario.png](../docs/prototipo/telas/04-agendamento-calendario.png), [05a-agendamento-incompleto.png](../docs/prototipo/telas/05a-agendamento-incompleto.png), [05b-agendamento-erro.png](../docs/prototipo/telas/05b-agendamento-erro.png) e [05-agendamento-mini-tela.png](../docs/prototipo/telas/05-agendamento-mini-tela.png)

## Como passar do vanilla para o React

O seu arquivo já existe, com uma página provisória escrita "Em construção". Você troca o conteúdo do `return` pelo HTML da sua parte do vanilla, convertido para JSX (o "HTML do React").

O header e o footer **não** entram: eles já aparecem sozinhos em todas as páginas.

### 1. Tudo dentro de uma `div` com a sua classe

O `return` só pode devolver um elemento principal. Coloque as suas seções dentro de uma `div` com a classe `pagina-agendamento`:

```jsx
return (
  <div className="pagina-agendamento">
    {/* suas seções aqui */}
  </div>
);
```

### 2. O que muda do HTML para o JSX

| No vanilla (HTML) | No React (JSX) |
|---|---|
| `class="card"` | `className="card"` |
| `<label for="nome">` | `<label htmlFor="nome">` |
| `<img ...>`, `<input ...>`, `<br>` | `<img ... />`, `<input ... />`, `<br />` (toda tag sem fechamento termina com `/>`) |
| `<!-- comentário -->` | `{/* comentário */}` |
| `style="width: 72%"` | `style={{ width: "72%" }}` |
| `autocomplete`, `inputmode`, `tabindex` | `autoComplete`, `inputMode`, `tabIndex` |
| `src="img/pkz/foto.jpg"` | `src="/img/pkz/foto.jpg"` (com `/` no começo; as fotos já estão em `public/img/`) |
| `&amp;` dentro de um link | `&` |

Os atributos `aria-*` e `data-*` continuam iguais.

Se quiser uma ajuda, o site https://transform.tools/html-to-jsx converte HTML em JSX automaticamente. Mesmo assim, confira o resultado e ajuste os links e as imagens (passos 3 e 2).

### 3. Links para outras páginas viram `<Link>`

No topo do arquivo:

```jsx
import { Link } from "react-router-dom";
```

E no lugar do `<a>`:

```jsx
<Link to="/agendamento" className="botao botao-claro">Agendar aula</Link>
```

| No vanilla | No React |
|---|---|
| `href="index.html"` | `to="/"` |
| `href="pkz.html"` | `to="/pkz"` |
| `href="onetoone.html"` | `to="/onetoone"` |
| `href="agendamento.html"` | `to="/agendamento"` |

Links para um lugar da mesma página (ex.: `href="#sobre"`) e links para outros sites continuam como `<a href="...">`.

### 4. CSS

Crie o arquivo `src/pages/Agendamento.css` e importe no topo do `.jsx`:

```jsx
import "./Agendamento.css";
```

Copie o seu CSS do vanilla e **comece toda regra com `.pagina-agendamento`**:

```css
/* no vanilla */
.hero h1 { font-size: 4rem; }

/* no React */
.pagina-agendamento .hero h1 { font-size: 4rem; }
```

**Por que isso é obrigatório:** no vanilla, cada página carregava só o próprio CSS. No React, o CSS de todas as páginas fica carregado ao mesmo tempo. Sem o prefixo, uma regra de `.hero` da Home muda também o hero da PKZ e do One to One. Vale também para as regras dentro dos `@media`.

### 5. Ver o resultado

Com o `npm run dev` rodando (passo 5 do Git), abra http://localhost:5173/agendamento. A página atualiza sozinha toda vez que você salva. Se a tela ficar branca, aperte F12 e olhe a aba **Console**: o erro aparece lá, com o arquivo e a linha.

## O JavaScript da página (`js/agendamento.js`)

A grande diferença: no vanilla, o JS **mexia no HTML** (`createElement`, `replaceChildren`, `hidden = true`, `classList`...). No React, você **guarda o estado** em variáveis com `useState`, e o JSX é desenhado de novo sozinho toda vez que o estado muda. Quase nenhum `document.querySelector` sobrevive.

### 1. Separe a simulação em `dadosAgendamento.js`

Leve para esse arquivo os dados simulados e exporte com `export`: a lista de `horarios`, a lista de `estudios` e a função `obterVagas(data, estudio)`. Deixe um comentário no topo, por exemplo: "Dados simulados: o site não tem back-end."

A página importa assim:

```jsx
import { horarios, estudios, obterVagas } from "./dadosAgendamento.js";
```

### 2. Estado da página

As variáveis `let` do vanilla viram estado:

```jsx
import { useState } from "react";

const [mesVisivel, setMesVisivel] = useState(() => {
  const hoje = new Date();
  return new Date(hoje.getFullYear(), hoje.getMonth(), 1);
});
const [filtro, setFiltro] = useState("Todos");
const [dataSelecionada, setDataSelecionada] = useState(null); // null = modal fechado
const [estudio, setEstudio] = useState("");
const [horario, setHorario] = useState("");
const [nome, setNome] = useState("");
const [telefone, setTelefone] = useState("");
const [erros, setErros] = useState({});
```

**Importante:** no vanilla, o calendário começava fixo em outubro de 2026 (`new Date(2026, 9, 1)`). No React ele começa no **mês atual**, como no código acima.

### 3. Calendário

Em vez do `renderizarCalendario()` criando elementos, monte uma lista com os dias do mês (com os espaços vazios do começo) e desenhe com `.map()`:

```jsx
{dias.map((dia, i) =>
  dia === null
    ? <div key={i} className="dia-vazio" aria-hidden="true" />
    : <button key={i} type="button" className="dia" onClick={() => abrirModal(dia)}>...</button>
)}
```

- O status de cada dia (livre, poucos horários, lotado, fechado) vem das mesmas funções `obterDisponibilidade` e `obterStatus`, que agora leem o `filtro` do estado.
- Mês anterior e próximo mês: `setMesVisivel(new Date(ano, mes - 1, 1))` e `setMesVisivel(new Date(ano, mes + 1, 1))`.
- Filtro: `onClick={() => setFiltro("PKZ")}`, com `aria-pressed={filtro === "PKZ"}` e a classe `ativo` no botão escolhido.
- O `innerHTML` do indicador vira JSX normal: `<span className={"status-ponto " + status.classe} aria-hidden="true" />`.

### 4. Modal do dia

- Abrir é `setDataSelecionada(dia)`, e fechar é `setDataSelecionada(null)`. O modal só aparece quando tem dia escolhido: `{dataSelecionada && ( ...modal... )}`.
- Os campos viram campos controlados: `<input value={nome} onChange={(e) => setNome(e.target.value)} />`. O mesmo vale para o telefone.
- Os horários livres do dia são botões com `onClick={() => setHorario(h)}`.
- **Mantenha a acessibilidade do vanilla:** ao abrir, o foco vai para o modal (`useRef` + `useEffect`), o `Escape` e o clique fora fecham, e ao fechar o foco volta para o dia que foi clicado.
- **Calendário no celular:** o excesso de colunas fica para os ajustes finais (item A02 do Scrum). Por enquanto, só não deixe a página com rolagem para o lado.

### 5. Validação (tela 05b)

Mesmas regras e mensagens do vanilla. No `onSubmit` do formulário:

```jsx
function confirmar(evento) {
  evento.preventDefault();
  const novosErros = {};
  if (!nome.trim()) novosErros.nome = "Informe o nome do aluno.";
  // ...telefone (vazio ou sem 10/11 dígitos), estúdio e horário, com as mesmas mensagens do vanilla
  setErros(novosErros);
  if (Object.keys(novosErros).length > 0) return;
  // tudo certo: vai para a confirmação (passo 6)
}
```

No JSX, o aviso do topo aparece com `{Object.keys(erros).length > 0 && ...}`, e cada campo com erro ganha a classe vermelha e a mensagem embaixo. Quando a pessoa corrige o campo, o erro dele some, como no vanilla.

### 6. Ida para a confirmação

O Arthur lê os dados da URL, então mande **exatamente os mesmos nomes do vanilla**: `nome`, `telefone`, `estudio`, `dia` (`AAAA-MM-DD`) e `horario`.

```jsx
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();
// dentro do confirmar(), depois da validação:
const parametros = new URLSearchParams({ nome: nome.trim(), telefone: telefone.trim(), estudio, dia, horario });
navigate("/confirmado?" + parametros.toString());
```

## Regras que valem para todo mundo

- **Não edite** o `src/styles/base.css`, a pasta `src/components/` (header, footer e layout), o `src/App.jsx`, o `src/main.jsx`, o `index.html` nem o `package.json`. Precisa de alguma mudança neles? Fala comigo.
- **Não instale pacotes** (`npm install alguma-coisa`) sem falar comigo antes.
- **Não mexa na parte de outra pessoa**, nem para "só arrumar um detalhe". Viu algo errado? Avise no grupo.
- **Não apague o `useTitulo(...)`** do topo da página: é ele que muda o título da aba do navegador.
- As classes do `base.css` são as mesmas do vanilla. Use-as para o site todo ficar com a mesma cara:
  - Cores: `var(--azul-marinho)`, `var(--azul-pkz)`, `var(--azul-onetoone)`, `var(--lilas)`, `var(--texto-suave)`
  - Seções: `.container`, `.secao`, `.secao-clara`, `.secao-escura`, `.secao-pkz` e `.secao-onetoone`
  - Textos: `.etiqueta`, `.subtitulo`, `.numero`
  - Organização: `.grade-2`, `.grade-3`, `.grade-4` e `.card`
  - Detalhes: `.pilula`, `.estrelas`, `.foto`
  - Botões: `.botao .botao-claro` (sobre fundo escuro) e `.botao .botao-escuro` (sobre fundo claro)
- Se precisar mudar alguma dessas classes só na sua página, sobrescreva no **seu** CSS (com o prefixo `.pagina-agendamento`), nunca no `base.css`.
- O conteúdo é o mesmo do vanilla: mesmos textos, dados fictícios e fotos provisórias. As fotos oficiais entram depois.
- Referências:
  - Repositório do vanilla, de onde vem o seu código: https://github.com/leomautone/PFE-2026-2-AP2-Grupo3-terca-vanilla
  - Protótipo no Figma: https://www.figma.com/design/CQmuVXYjxTUkLDg5CzWbk0

## Passo a passo no Git

Faça na ordem. Se der qualquer erro, me manda print no grupo antes de tentar "consertar".

**1. Clonar o repositório (só na primeira vez)**

Este é um repositório novo, diferente do vanilla:

```bash
git clone https://github.com/leomautone/PFE-2026-2-AP2-Grupo3-terca-react.git
cd PFE-2026-2-AP2-Grupo3-terca-react
```

**2. Instalar as dependências (na primeira vez e sempre que o `package.json` mudar)**

Precisa do Node.js instalado (https://nodejs.org, versão LTS).

```bash
npm install
```

Isso cria a pasta `node_modules`. Ela é grande e **não vai para o GitHub** (o `.gitignore` já cuida disso).

**3. Criar a sua branch (só na primeira vez)**

```bash
git checkout -b david
```

Nas próximas vezes, só entre nela:

```bash
git checkout david
```

**4. Antes de começar a mexer, puxe o que já foi aprovado na main**

```bash
git pull origin main
```

**5. Rode o site**

```bash
npm run dev
```

Abra http://localhost:5173/agendamento no navegador. Deixe esse terminal aberto enquanto trabalha e use outro terminal para os comandos do Git. Para parar o site, aperte `Ctrl + C`.

**6. Confira o que mudou.** Só os seus arquivos podem aparecer na lista:

```bash
git status
```

Se aparecer arquivo de outra pessoa, o `base.css` ou o `package.json`, desfaça com `git restore nome-do-arquivo` e me avise.

**7. Salve no Git (commit)**

```bash
git add src/pages/Agendamento.jsx src/pages/Agendamento.css src/pages/dadosAgendamento.js
git commit -m "migra o calendario do agendamento para react"
```

A mensagem tem que dizer o que você fez, curta e em português. Não use "update" nem "teste".

**8. Envie para o GitHub**

Na primeira vez:

```bash
git push -u origin david
```

Nas próximas, só `git push`.

**9. Abra o Pull Request**

1. Entre em https://github.com/leomautone/PFE-2026-2-AP2-Grupo3-terca-react
2. Vai aparecer um aviso amarelo "**david** had recent pushes". Clique em **Compare & pull request**.
3. Confira se está assim: `base: main` ← `compare: david`.
4. Coloque um título claro e, na descrição, uma linha sobre o que foi feito.
5. Clique em **Create pull request**.

Eu reviso e faço o merge. **Não clique em "Merge" você mesmo.** Se eu pedir ajuste, faça na mesma branch e repita os passos 6 a 8. O PR atualiza sozinho.

A entrega é dia **17/11**. Quanto antes o PR chegar, mais tempo sobra para os ajustes finais. Commits pequenos ao longo dos dias são melhores do que um commitzão no último dia.

## Checklist antes de abrir o PR

- [ ] O calendário abre no mês atual e navega para os meses anterior e seguinte
- [ ] O filtro (Todos, PKZ e One to One) muda a disponibilidade dos dias
- [ ] Clicar num dia disponível abre o modal, e Escape, clique fora, "Cancelar" e "×" fecham
- [ ] A validação mostra o aviso e os campos em vermelho (tela 05b), e os erros somem ao corrigir
- [ ] Confirmar leva para `/confirmado` com os dados certos na URL
- [ ] A simulação (horários, estúdios e `obterVagas`) está só no `dadosAgendamento.js`
- [ ] Todas as regras do meu CSS começam com `.pagina-agendamento`
- [ ] Os links para outras páginas usam `<Link to="...">` e as imagens começam com `/img/`
- [ ] O Console (F12) não mostra erro vermelho
- [ ] Testei no computador e na largura de celular (F12 → ícone de celular), sem rolagem para o lado
- [ ] `git status` mostra só os meus arquivos
- [ ] PR aberto da branch `david` para a `main`

Qualquer dúvida, me chama. — Leonardo
