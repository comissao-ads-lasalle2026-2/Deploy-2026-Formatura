/**
 * GOOGLE APPS SCRIPT - SISTEMA DE VOTAÇÃO DA FORMATURA ADS 2026/2
 * ==============================================================
 * Como instalar em 2 minutos:
 * 1. Abra o Google Drive na sua conta (drive.google.com).
 * 2. Crie uma nova Planilha Google com o nome: "Votacao_Formatura_ADS_2026_2".
 * 3. No menu da planilha, clique em: Extensões > Apps Script.
 * 4. Apague qualquer código que estiver lá e cole este arquivo inteiro.
 * 5. Clique no botão azul "Implantar" (canto superior direito) > "Nova implantação".
 * 6. Em "Tipo", selecione "App da Web" (Web app).
 * 7. Configure:
 *    - Descrição: "API Votação Formatura ADS"
 *    - Executar como: "Eu" (seu e-mail)
 *    - Quem pode acessar: "Qualquer pessoa" (permite que o portal envie o voto)
 * 8. Clique em "Implantar" e copie a "URL do App da Web" gerada!
 * 9. Cole essa URL no arquivo assets/js/app.js onde indicado.
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Cria cabeçalhos automaticamente na primeira execução
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Data/Hora", "Enquete", "Nome do Formando", "Matrícula", "Voto Escolhido", "IP/Origem"]);
      sheet.getRange(1, 1, 1, 6).setFontWeight("bold").setBackground("#06b6d4").setFontColor("#ffffff");
    }

    var data;
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else {
      data = e.parameter;
    }

    var enqueteId = (data.enqueteId || "homenagem-familiares").toString().trim();
    var nome = (data.nome || "").toString().trim();
    var matricula = (data.matricula || "").toString().trim();
    var voto = (data.voto || "").toString().trim(); // 'arvore' ou 'cartaz'

    // Validações básicas de preenchimento
    if (!nome || nome.length < 3) {
      return responseJson({ status: "erro", mensagem: "Por favor, preencha seu nome completo." });
    }
    if (!matricula || matricula.length < 4) {
      return responseJson({ status: "erro", mensagem: "Por favor, informe uma matrícula válida." });
    }
    if (!voto || (voto !== "arvore" && voto !== "cartaz")) {
      return responseJson({ status: "erro", mensagem: "Por favor, selecione uma opção de voto válida." });
    }

    // 🔒 REGRA DO VOTO ÚNICO: Verifica se a matrícula já votou nesta enquete
    var rows = sheet.getDataRange().getValues();
    for (var i = 1; i < rows.length; i++) {
      var rowEnquete = rows[i][1].toString().trim();
      var rowMatricula = rows[i][3].toString().trim();
      
      if (rowEnquete === enqueteId && rowMatricula === matricula) {
        return responseJson({
          status: "duplicado",
          mensagem: "⚠️ Esta matrícula já registrou seu voto nesta enquete!",
          votoAnterior: rows[i][4],
          placar: getPlacar(sheet, enqueteId)
        });
      }
    }

    // Registra o voto com data e hora
    var dataHora = Utilities.formatDate(new Date(), "America/Sao_Paulo", "dd/MM/yyyy HH:mm:ss");
    sheet.appendRow([dataHora, enqueteId, nome, matricula, voto, "Portal ADS GitHub Pages"]);

    return responseJson({
      status: "sucesso",
      mensagem: "🎉 Seu voto foi computado com sucesso!",
      votoRegistrado: voto,
      placar: getPlacar(sheet, enqueteId)
    });

  } catch (err) {
    return responseJson({ status: "erro", mensagem: "Erro ao processar voto: " + err.toString() });
  }
}

function doGet(e) {
  // Permite consultar o placar atual via GET
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var enqueteId = (e.parameter.enqueteId || "homenagem-familiares").toString().trim();
    var placar = getPlacar(sheet, enqueteId);
    return responseJson({ status: "sucesso", placar: placar });
  } catch (err) {
    return responseJson({ status: "erro", mensagem: err.toString() });
  }
}

function getPlacar(sheet, enqueteId) {
  var rows = sheet.getDataRange().getValues();
  var arvore = 0;
  var cartaz = 0;
  
  for (var i = 1; i < rows.length; i++) {
    var rowEnquete = rows[i][1].toString().trim();
    var rowVoto = rows[i][4].toString().trim().toLowerCase();
    
    if (rowEnquete === enqueteId) {
      if (rowVoto === "arvore") arvore++;
      else if (rowVoto === "cartaz") cartaz++;
    }
  }
  
  var total = arvore + cartaz;
  var pctArvore = total > 0 ? Math.round((arvore / total) * 100) : 50;
  var pctCartaz = total > 0 ? Math.round((cartaz / total) * 100) : 50;

  return {
    total: total,
    arvore: arvore,
    cartaz: cartaz,
    pctArvore: pctArvore,
    pctCartaz: pctCartaz
  };
}

function responseJson(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
