# Tarefa — Arthur — Página de confirmação (React)

Arthur, você vai passar para React a **página de confirmação** que você fez no vanilla: o resumo do agendamento e o aviso pelo WhatsApp. O conteúdo e o visual continuam os mesmos. O que muda é o jeito de escrever e de ler os dados da URL.

## O que você edita

- `src/pages/Confirmado.jsx` (já existe, com uma página provisória)
- `src/pages/Confirmado.css` (você cria)

## O que você NÃO pode mexer

- `src/styles/base.css`, `src/components/` e `src/App.jsx`
- Os arquivos das outras pessoas, incluindo o agendamento do David

## De onde vem o conteúdo

- Do vanilla: o `<main>` do `confirmado.html`, o `css/confirmado.css` e o `js/confirmado.js`
- Tela de referência: [06-agendamento-confirmado.png](../docs/prototipo/telas/06-agendamento-confirmado.png)

## Como passar do vanilla para o React

O seu arquivo já existe, com uma página provisória escrita "Em construção". Você troca o conteúdo do `return` pelo HTML da sua parte do vanilla, convertido para JSX (o "HTML do React").

O header e o footer **não** entram: eles já aparecem sozinhos em todas as páginas.

### 1. Tudo dentro de uma `div` com a sua classe

O `return` só pode devolver um elemento principal. Coloque as suas seções dentro de uma `div` com a classe `pagina-confirmado`:

```jsx
return (
  <div className="pagina-confirmado">
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

Crie o arquivo `src/pages/Confirmado.css` e importe no topo do `.jsx`:

```jsx
import "./Confirmado.css";
```

Copie o seu CSS do vanilla e **comece toda regra com `.pagina-confirmado`**:

```css
/* no vanilla */
.hero h1 { font-size: 4rem; }

/* no React */
.pagina-confirmado .hero h1 { font-size: 4rem; }
```

**Por que isso é obrigatório:** no vanilla, cada página carregava só o próprio CSS. No React, o CSS de todas as páginas fica carregado ao mesmo tempo. Sem o prefixo, uma regra de `.hero` da Home muda também o hero da PKZ e do One to One. Vale também para as regras dentro dos `@media`.

### 5. Ver o resultado

Com o `npm run dev` rodando (passo 5 do Git), abra http://localhost:5173/confirmado. A página atualiza sozinha toda vez que você salva. Se a tela ficar branca, aperte F12 e olhe a aba **Console**: o erro aparece lá, com o arquivo e a linha.

## O JavaScript da página (`js/confirmado.js`)

No React não existe mais o `document.getElementById(...).textContent = ...`. Você calcula cada valor no começo do componente e coloca direto no JSX.

**1. Ler a URL.** O David manda os dados exatamente como no vanilla: `nome`, `telefone`, `estudio`, `dia` (no formato `AAAA-MM-DD`) e `horario` (`HH:MM`). Use o `useSearchParams`:

```jsx
import { Link, useSearchParams } from "react-router-dom";

export default function Confirmado() {
  useTitulo("Agendamento confirmado — PKZ / One to One");
  const [params] = useSearchParams();

  const nome = params.get("nome")?.trim() || "Exemplo do vanilla";
  // ...telefone, estudio, dia e horario do mesmo jeito
```

**2. Manter as mesmas proteções do vanilla.** Se um campo faltar ou vier errado, aparece o exemplo do HTML do vanilla:

- `horario` só vale se passar na mesma regex (`/^([01]\d|2[0-3]):[0-5]\d$/`)
- `dia` só vale se tiver o formato `AAAA-MM-DD` e for uma data que existe (31/02 não)
- `estudio` passa pelo mesmo `Map` de unidades

Deixe essa conta numa função separada (ex.: `formatarDia(dia)`) para o componente ficar fácil de ler.

**3. Mostrar no JSX:**

```jsx
<dd>{nome}</dd>
```

O React já mostra o valor como texto. Se alguém colocar HTML na URL, ele não é executado, que era o motivo de você usar `textContent` no vanilla.

**4. Para testar sem depender do David**, abra direto:

http://localhost:5173/confirmado?nome=Ana%20Souza&telefone=(21)%2099999-0000&estudio=PKZ&dia=2026-11-20&horario=08:00

Teste também com a URL sem nada (`/confirmado`) e com valores errados (`dia=2026-02-31`, `horario=99:99`): tem que aparecer o exemplo, sem quebrar a página.

- "Voltar ao início" vira `<Link to="/">`.

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
- Se precisar mudar alguma dessas classes só na sua página, sobrescreva no **seu** CSS (com o prefixo `.pagina-confirmado`), nunca no `base.css`.
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
git checkout -b arthur
```

Nas próximas vezes, só entre nela:

```bash
git checkout arthur
```

**4. Antes de começar a mexer, puxe o que já foi aprovado na main**

```bash
git pull origin main
```

**5. Rode o site**

```bash
npm run dev
```

Abra http://localhost:5173/confirmado no navegador. Deixe esse terminal aberto enquanto trabalha e use outro terminal para os comandos do Git. Para parar o site, aperte `Ctrl + C`.

**6. Confira o que mudou.** Só os seus arquivos podem aparecer na lista:

```bash
git status
```

Se aparecer arquivo de outra pessoa, o `base.css` ou o `package.json`, desfaça com `git restore nome-do-arquivo` e me avise.

**7. Salve no Git (commit)**

```bash
git add src/pages/Confirmado.jsx src/pages/Confirmado.css
git commit -m "migra a pagina de confirmacao para react"
```

A mensagem tem que dizer o que você fez, curta e em português. Não use "update" nem "teste".

**8. Envie para o GitHub**

Na primeira vez:

```bash
git push -u origin arthur
```

Nas próximas, só `git push`.

**9. Abra o Pull Request**

1. Entre em https://github.com/leomautone/PFE-2026-2-AP2-Grupo3-terca-react
2. Vai aparecer um aviso amarelo "**arthur** had recent pushes". Clique em **Compare & pull request**.
3. Confira se está assim: `base: main` ← `compare: arthur`.
4. Coloque um título claro e, na descrição, uma linha sobre o que foi feito.
5. Clique em **Create pull request**.

Eu reviso e faço o merge. **Não clique em "Merge" você mesmo.** Se eu pedir ajuste, faça na mesma branch e repita os passos 6 a 8. O PR atualiza sozinho.

A entrega é dia **17/11**. Quanto antes o PR chegar, mais tempo sobra para os ajustes finais. Commits pequenos ao longo dos dias são melhores do que um commitzão no último dia.

## Checklist antes de abrir o PR

- [ ] O resumo mostra nome, telefone, estúdio, dia (com o dia da semana) e horário vindos da URL
- [ ] Com a URL vazia ou com valores errados, aparecem os exemplos e a página não quebra
- [ ] O aviso do WhatsApp e o botão "Voltar ao início" (`/`) estão funcionando
- [ ] Todas as regras do meu CSS começam com `.pagina-confirmado`
- [ ] Os links para outras páginas usam `<Link to="...">` e as imagens começam com `/img/`
- [ ] O Console (F12) não mostra erro vermelho
- [ ] Testei no computador e na largura de celular (F12 → ícone de celular), sem rolagem para o lado
- [ ] `git status` mostra só os meus arquivos
- [ ] PR aberto da branch `arthur` para a `main`

Qualquer dúvida, me chama. — Leonardo
