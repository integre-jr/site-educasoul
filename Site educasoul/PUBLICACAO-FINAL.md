# Publicação final — passo a passo

Enquanto o site é prévia (`educasoul.pages.dev`), todas as páginas têm `noindex` (o Google não indexa)
e o rodapé mostra "Protótipo para apresentação · conteúdo ilustrativo". Na publicação final, os dois saem.

**Só faça isto depois de:** site aprovado pela cliente, `TODO-CLIENTE` resolvidos e domínio
`educasoul.com` apontado para a Cloudflare com o e-mail preservado.

1. Na pasta `Site educasoul`, rodar no PowerShell:

   ```powershell
   powershell -ExecutionPolicy Bypass -File .\publicacao-final.ps1
   ```

   Ele tira 3 linhas de cada uma das 10 páginas e termina com
   `OK: nenhuma página com noindex ou aviso de protótipo.` Rodar de novo não estraga nada.
2. Conferir com `git diff`: só podem aparecer linhas removidas (30 no total).
3. Commit (ex.: "Publicação final: remove noindex e aviso de protótipo") e republicar
   (comando em "Republicar" na memória do projeto / guia de hospedagem).
4. Abrir o site, ver o código-fonte de uma página e confirmar que não há `noindex`.
5. Opcional: cadastrar o domínio no Google Search Console e pedir a indexação da página inicial.

**Formulários (FormSubmit):** na primeira mensagem real enviada pelo site, chega em
atendimento@educasoul.com um e-mail do FormSubmit pedindo ativação — a Educasoul clica em "Activate".
Até lá, o visitante vê o aviso de que o e-mail não foi enviado e o WhatsApp funciona normalmente.
Depois de ativar, dá para trocar o e-mail em `site/js/main.js` (`emailEndpoint`) pelo código aleatório
que o FormSubmit manda, para o endereço não ficar visível no código do site.
