# Rafael Fossalussa — Landing page (V1)

Landing em **Next.js 14 (App Router)**. Verde-esmeralda sobre preto, sala ao vivo,
cursos, prova social por pasta e widgets de cotação (TradingView).

## Rodar (VS Code)

Precisa de **Node 18.18+** (ou 20+) e internet na primeira execução
(as fontes e os widgets de cotação carregam online).

```bash
npm install
npm run dev
```

Abra http://localhost:3000

## Onde editar as coisas (tudo num lugar só)

Abra **`app/config.js`**. Lá você troca:
- WhatsApp e Instagram
- Nome e número do **CNPI** (está como `[a confirmar]` — troque quando tiver)
- Preços e links de checkout (Hotmart)
- Dados da **"A semana da sala"** (positivo / negativo / aprendendo + referência)

O link do **Leilão do Dólar** está como `#` (o original estava quebrado).
Quando reemitir na Hotmart, troque em `app/config.js`.

## Prova social (depoimentos) — só soltar imagem

Jogue os prints/fotos em **`public/depoimentos/`** (png, jpg, webp...).
Elas aparecem sozinhas na seção "O que os alunos falam", com lightbox pra ampliar.
Não precisa mexer em código.

## Print da enquete da semana

Coloque a imagem da enquete em **`public/semana/enquete.png`**.
Se não existir, aparece um placeholder no lugar.

## Trocar as fotos do Rafael

- `public/rafael-hero.png` — foto recortada (fundo transparente) do hero
- `public/rafael-sala.png` — foto da seção "A sala"
- `public/rafael-historia.jpg` — foto da seção "Minha história"

## Deploy na VPS

```bash
npm run build
npm run start   # porta 3000 — use pm2 + nginx como proxy reverso
```

## Compliance

Sem promessa de ganho, sem porcentagem de retorno, sem forex. Dados da semana são
declarados pelos alunos (enquete), com caráter informativo. Aviso legal com CNPI no rodapé.
