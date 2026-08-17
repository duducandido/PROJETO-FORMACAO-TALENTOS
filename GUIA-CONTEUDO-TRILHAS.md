# 📚 Guia rápido — Como montar o conteúdo de uma trilha (.md)

Este guia é para **admins** da plataforma Formação de Talentos. Ele explica
como escrever o conteúdo de uma trilha num arquivo **Markdown (`.md`)** e subir
no painel **Admin → Trilhas → Editar → "Importar conteúdo de um .md"**.

O site pega esse arquivo e **divide automaticamente em módulos**, com conteúdo
formatado, links, imagens e até **quiz** por módulo.

---

## 1. Como funciona a divisão em módulos

O site quebra o arquivo **a cada título**. Você usa `#` (ou `##`) para marcar o
começo de cada módulo. **Cada título = um módulo.**

```markdown
## Módulo 1 — História da TI
Conteúdo do módulo 1 aqui...

## Módulo 2 — Hardware e Software
Conteúdo do módulo 2 aqui...
```

> ✅ Regra de ouro: **um título por módulo**. O texto que vem embaixo do título
> é o conteúdo daquele módulo, até começar o próximo título.

Depois de colar/subir o arquivo, o site mostra **"X módulo(s) detectado(s)"**.
Clique em **"Dividir em módulos"** para gerar.

---

## 2. Como escrever o conteúdo (formatação)

O conteúdo usa **Markdown** — texto simples com marcações. Os principais:

```markdown
**negrito**  e  *itálico*

- item de lista
- outro item

1. lista numerada
2. segundo passo

> Isto vira uma citação em destaque.

`código` no meio da frase

### Subtítulo dentro do módulo
```

Também funcionam **tabelas**:

```markdown
| Parte | Exemplo |
|-------|---------|
| Hardware | Teclado |
| Software | Windows |
```

---

## 3. Links para fora (YouTube, Drive, sites…)

Escreva assim — o link **abre em uma nova aba** automaticamente:

```markdown
Assista à aula: [Vídeo no YouTube](https://youtube.com/watch?v=...)

Baixe o material: [Apostila em PDF](https://drive.google.com/...)
```

> 💡 Além dos links no texto, cada módulo também pode ter uma **lista de
> conteúdos por link** (vídeo, PDF, etc.), adicionada no editor do Admin em
> **"Adicionar conteúdo"**. Esses aparecem numa seção **"Materiais e links"** em
> destaque no fim do módulo.

### 🎥 Vídeo do YouTube embutido
Se você adicionar um conteúdo com um **link do YouTube** (em "Adicionar conteúdo",
tipo *Vídeo*), o vídeo aparece **embutido** dentro do módulo — a pessoa assiste
sem sair da plataforma. Funciona com links `youtube.com/watch?v=...`,
`youtu.be/...` e `/shorts/...`.

---

## 4. Imagens

```markdown
![Descrição da imagem](https://link-da-imagem.png)
```

A imagem aparece dentro do módulo, ajustada ao tamanho da tela.

---

## 5. Quiz do módulo (avaliação obrigatória)

Para cobrar que a pessoa aprendeu antes de liberar o próximo módulo, adicione um
bloco **`## Quiz`** no fim do módulo.

- Cada pergunta começa com **`P:`**
- Cada alternativa é uma linha começando com **`- [ ]`** (errada) ou
  **`- [x]`** (correta)
- O **`[x]`** marca a resposta certa

```markdown
## Módulo 2 — Segurança
Nunca compartilhe sua senha com ninguém.

## Quiz
P: Você deve compartilhar sua senha?
- [ ] Sim, com colegas
- [x] Não, nunca

P: Qual o tema deste módulo?
- [x] Segurança
- [ ] Culinária
```

**Importante:**
- O bloco `## Quiz` pertence ao **módulo logo acima** dele (não vira um módulo
  separado).
- Pode ter **quantas perguntas** quiser (cada uma começa com `P:`).
- Cada pergunta pode ter **2 ou mais** alternativas.

### Regra de aprovação (padrão atual)
Para concluir o módulo e liberar o próximo, a pessoa pode **errar no máximo 1
pergunta**. Exemplos: num quiz de 3, precisa acertar 2; num quiz de 5, precisa
acertar 4. **Exceção:** se o quiz tem **1 pergunta só**, tem que acertar ela.
Se reprovar, o site mostra o placar e ela pode **refazer**.

> Se um módulo **não tiver** bloco `## Quiz`, ele é concluído com um botão
> **"Concluí este módulo"** (sem avaliação).

---

## 6. Exemplo completo de arquivo

```markdown
## Módulo 1 — Boas-vindas
Bem-vindo(a) à trilha! Aqui você aprende o **básico** de forma prática.

- O que vamos ver
- Como funciona a jornada

Material extra: [Vídeo de introdução](https://youtube.com/...)

## Quiz
P: A jornada é dividida em quê?
- [x] Módulos sequenciais
- [ ] Um vídeo só

## Módulo 2 — Primeiros passos
Vamos configurar seu ambiente.

![Tela de exemplo](https://exemplo.com/tela.png)

Guia completo: [Documentação](https://docs.exemplo.com)

## Quiz
P: Onde fica a documentação?
- [x] No link do módulo
- [ ] Não existe
- [ ] Só no papel
```

Esse arquivo gera **2 módulos**, cada um com conteúdo, link externo e um quiz.

---

## 7. Passo a passo no painel

1. Entre como **admin** → aba **Admin** → **Trilhas**.
2. **Editar** a trilha (ou **Nova trilha**).
3. No painel **"Importar conteúdo de um .md"**, **cole o texto** ou clique em
   **"Enviar arquivo .md"**.
4. Confira **"X módulo(s) detectado(s)"** e clique em **"Dividir em módulos"**.
5. Revise cada módulo (dá pra editar o texto e o quiz, com botão **Preview**).
6. Clique em **"Salvar trilha"**.

Pronto! Os colaboradores já veem o conteúdo novo na aba **Minha Trilha**, com o
**bloqueio sequencial** (um módulo por vez) e o **quiz** funcionando.

---

## Dúvidas comuns

**O quiz não apareceu / virou um módulo separado.**
Confirme que o bloco começa com um título `## Quiz` (a palavra "Quiz") e vem
**logo depois** do conteúdo do módulo.

**Quero um módulo sem quiz.**
É só não colocar o bloco `## Quiz` nele. O módulo é concluído pelo botão
"Concluí este módulo".

**Posso misturar links no texto e a lista de conteúdos do Admin?**
Sim. Os dois aparecem no módulo e abrem em nova aba.
