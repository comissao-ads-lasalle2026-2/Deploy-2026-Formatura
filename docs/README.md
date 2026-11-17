# 📁 PASTA DE DOCUMENTOS OFICIAIS (PDF, DOC, DOCX)
> **Portal da Formatura ADS 2026/2 • Unilasalle**

Esta pasta foi criada para armazenar todos os arquivos e documentos para download e consulta direta dos colegas de turma.

---

### 🚀 Como funciona:
1. Coloque qualquer arquivo `.pdf`, `.doc`, `.docx` ou `.xlsx` dentro desta pasta (`docs/`).
2. Como o projeto é publicado no GitHub Pages, o arquivo fica imediatamente acessível na web pelo link:
   ```text
   docs/nome-do-arquivo.pdf
   ```
   Ou pelo link completo no navegador:
   ```text
   https://comissao-ads-lasalle2026-2.github.io/Deploy-2026-Formatura/docs/nome-do-arquivo.pdf
   ```

---

### 📋 Como cadastrar um novo documento no Portal:
No arquivo `assets/js/data.js`, dentro da lista `documentosOficiais`, basta adicionar o item:
```javascript
{
  id: "manual-do-formando",
  titulo: "Manual do Formando 2026/2",
  formato: "PDF",
  tamanho: "1.5 MB",
  data: "17/11/2026",
  arquivo: "docs/manual-do-formando.pdf",
  descricao: "Edital completo com regras de protocolo, togas e colação de grau."
}
```
O portal criará automaticamente o card com o botão de download/visualização!
