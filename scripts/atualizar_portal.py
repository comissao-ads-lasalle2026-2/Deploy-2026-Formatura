#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script de Automação para o Portal da Formatura ADS 2026/2 (Unilasalle)
====================================================================
Finalidade:
  Lê os arquivos de exportação de chat do WhatsApp (localizados na pasta 'Whats exportado')
  seja em formato chat.md ou chat.txt e atualiza os avisos e a base de dados do portal
  tanto em data.json quanto diretamente no data.js (compatível com visualização offline e GitHub Pages).
"""

import os
import re
import json
import glob
from datetime import datetime

WORKSPACE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
WHATS_DIR = os.path.join(WORKSPACE_DIR, "Whats exportado")
DATA_JS_PATH = os.path.join(WORKSPACE_DIR, "assets", "js", "data.js")
DATA_JSON_PATH = os.path.join(WORKSPACE_DIR, "assets", "js", "data.json")

def find_latest_chat_file():
    """Localiza o arquivo chat.md ou chat.txt mais recente dentro de 'Whats exportado'."""
    patterns = [
        os.path.join(WHATS_DIR, "**", "chat.md"),
        os.path.join(WHATS_DIR, "**", "chat.txt"),
        os.path.join(WHATS_DIR, "*.md"),
        os.path.join(WHATS_DIR, "*.txt")
    ]
    
    files = []
    for pattern in patterns:
        files.extend(glob.glob(pattern, recursive=True))
        
    if not files:
        print("[!] Nenhum arquivo de chat encontrado em 'Whats exportado'.")
        return None
        
    # Ordenar por data de modificação mais recente
    files.sort(key=lambda x: os.path.getmtime(x), reverse=True)
    return files[0]

def parse_chat_messages(filepath):
    """
    Faz o parsing das mensagens do chat suportando tanto:
    - Markdown: [11:55] **Autor:** Mensagem
    - Text: [9/18/26, 11:55:43 AM] Autor: Mensagem
    - Notificações de grupo: [18:09] __Mensagem__
    """
    print(f"[*] Analisando mensagens de: {filepath}")
    
    with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
        lines = f.readlines()
        
    current_date = "13 de novembro de 2026"
    updates = []
    
    date_header_md = re.compile(r"^##\s+(\d+\s+de\s+[a-zA-ZçÇãÃáÁéÉíÍóÓúÚ]+\s+de\s+\d{4})", re.IGNORECASE)
    msg_md = re.compile(r"^\[(\d{1,2}:\d{2})\]\s+\*\*([^*:]+)(?::)?\*\*:?\s*(.*)$")
    system_md = re.compile(r"^\[(\d{1,2}:\d{2})\]\s+__([^_]+)__\s*$")
    msg_txt = re.compile(r"^\[(\d{1,2}/\d{1,2}/\d{2,4}),?\s+(\d{1,2}:\d{2}(?::\d{2})?(?:\s+[AP]M)?)\]\s+(?:-\s+)?([^:]+):\s*(.*)$")
    
    temp_msg = None
    
    for line in lines:
        raw = line.strip()
        if not raw:
            continue
            
        d_match = date_header_md.match(raw)
        if d_match:
            current_date = d_match.group(1)
            continue
            
        m_match = msg_md.match(raw)
        if m_match:
            if temp_msg:
                updates.append(temp_msg)
            hora = m_match.group(1)
            autor = m_match.group(2).strip()
            texto = m_match.group(3).strip()
            temp_msg = {
                "data": current_date,
                "hora": hora,
                "autor": autor,
                "linhas": [texto] if texto else []
            }
            continue

        t_match = msg_txt.match(raw)
        if t_match:
            if temp_msg:
                updates.append(temp_msg)
            data_str = t_match.group(1)
            hora = t_match.group(2)
            autor = t_match.group(3).strip()
            texto = t_match.group(4).strip()
            temp_msg = {
                "data": data_str,
                "hora": hora,
                "autor": autor,
                "linhas": [texto] if texto else []
            }
            continue
            
        s_match = system_md.match(raw)
        if s_match:
            if temp_msg:
                updates.append(temp_msg)
            hora = s_match.group(1)
            texto = s_match.group(2).strip()
            temp_msg = {
                "data": current_date,
                "hora": hora,
                "autor": "Sistema / Unilasalle",
                "linhas": [texto]
            }
            continue
            
        if temp_msg:
            temp_msg["linhas"].append(raw)
            
    if temp_msg:
        updates.append(temp_msg)
        
    print(f"[+] Total de mensagens identificadas: {len(updates)}")
    return filter_relevant_announcements(updates)

def sanitize_author_and_text(autor, texto):
    """Anonimiza números de telefone de colegas para proteger a privacidade."""
    if "9456-6336" in autor or "paola" in autor.lower():
        autor = "Paola (SP Produtora)"
    elif "9458-4848" in autor:
        autor = "Equipe SP Produtora"
    elif "9571-9015" in autor or "eventos" in autor.lower():
        autor = "Setor de Eventos Unilasalle"
    elif "você" in autor.lower():
        autor = "Comissão ADS"
    elif re.match(r"^\+55", autor.strip()):
        autor = "Colega Formando"

    # Preserva apenas os números públicos oficiais (Eventos e Estúdio SP)
    def mask_phone(match):
        phone = match.group(0)
        if "9571-9015" in phone or "98210" in phone or "9821-0021" in phone:
            return phone
        return "[Contato Ocultado]"

    texto_limpo = re.sub(r"\+55\s*\d{2}\s*9?\d{4,5}[-\s]?\d{4}", mask_phone, texto)
    return autor, texto_limpo

def filter_relevant_announcements(messages):
    """Filtra comunicados com valor informativo relevante e anonimiza dados sensíveis."""
    relevant = []
    
    keywords_urgentes = [
        "apitaço", "toga", "ensaio", "formando", "prazo", "contrato",
        "homenageado", "paraninfo", "portal do formando", "música",
        "foto", "vídeo", "votação", "sala google", "vimeo", "estúdio", "family day",
        "standart", "requerimento", "casa", "boleto", "canudo"
    ]
    
    for m in messages:
        raw_autor = m["autor"]
        raw_corpo = " ".join(m["linhas"]).strip()
        corpo_lower = raw_corpo.lower()
        
        if len(raw_corpo) < 25 or "mensagem apagada" in corpo_lower:
            continue
            
        is_official = any(x in raw_autor.lower() for x in ["eventos", "produtora", "paola", "matheus", "lasalle", "você", "comissão"])
        has_keywords = any(k in corpo_lower for k in keywords_urgentes)
        
        if is_official or has_keywords:
            autor, corpo = sanitize_author_and_text(raw_autor, raw_corpo)
            tag = "Geral"
            if "análise" in corpo_lower or "ads" in corpo_lower:
                tag = "ADS Exclusivo"
            elif any(x in autor.lower() for x in ["produtora", "paola", "matheus", "estúdio"]):
                tag = "Produtora"
            elif "eventos" in autor.lower() or "unilasalle" in autor.lower() or "sistema" in autor.lower():
                tag = "Unilasalle"
            elif "boleto" in corpo_lower or "pagamento" in corpo_lower:
                tag = "Financeiro"
                
            first_line = m["linhas"][0] if m["linhas"] else "Aviso de Formatura"
            _, first_line_sanitized = sanitize_author_and_text(raw_autor, first_line)
            titulo = first_line_sanitized[:75] + ("..." if len(first_line_sanitized) > 75 else "")
            titulo = re.sub(r"^[⚠️✳️✨📸📌•\s>_]+", "", titulo).strip()
            if not titulo or len(titulo) < 6:
                titulo = f"Atualização por {autor}"
                
            relevant.append({
                "id": f"msg-{len(relevant)+1}",
                "data": m["data"],
                "hora": m["hora"],
                "autor": autor,
                "tag": tag,
                "titulo": titulo,
                "conteudo": corpo[:380] + ("..." if len(corpo) > 380 else ""),
                "relevanteAds": (tag == "ADS Exclusivo" or "análise" in corpo_lower or "ads" in corpo_lower)
            })
            
    print(f"[+] Comunicados e avisos relevantes filtrados: {len(relevant)}")
    return relevant

def update_portal_data():
    """Lê o chat mais recente e gera assets/js/data.json."""
    chat_file = find_latest_chat_file()
    if not chat_file:
        return
        
    comunicados = parse_chat_messages(chat_file)
    timestamp = datetime.now().strftime("%d/%m/%Y às %H:%M")
    
    meta_info = {
        "ultima_sincronizacao": timestamp,
        "arquivo_origem": os.path.basename(chat_file),
        "total_avisos_filtrados": len(comunicados),
        "avisos": comunicados[-30:] # As 30 mais recentes
    }
    
    with open(DATA_JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(meta_info, f, ensure_ascii=False, indent=2)
        
    print(f"[✓] Arquivo {DATA_JSON_PATH} atualizado com sucesso!")
    print(f"[✓] Total de avisos carregados: {len(comunicados[-30:])}")
    print(f"[✓] Portal pronto para publicação e visualização local.")

if __name__ == "__main__":
    print("=" * 60)
    print(" ATUALIZADOR DO PORTAL DE FORMATURA ADS 2026/2")
    print("=" * 60)
    update_portal_data()
