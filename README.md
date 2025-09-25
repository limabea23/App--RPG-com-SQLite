## 🎲 Party RPG com SQLite - React Native


### 🧩 Melhorias Aplicadas

- **Componentização:**  
  - **Componentes:** `Header`, `AddCharacterForm`, `CharacterCard`.
  - **Por quê:** separa responsabilidades e facilita manutenção/testes.

- **UI com React Native Paper:**  
  - **Substituições:** `Card`, `Button`, `TextInput`, `IconButton`, `Snackbar`, `Dialog`, `SegmentedButtons`.
  - **Valor:** visual consistente, acessibilidade e UX melhor.

- **Funcionalidades de Usabilidade/Visuais:**  
  1) **Modal de confirmação** para adicionar e remover personagem (`Dialog`)
     - Evita ações acidentais e dá controle ao usuário.
  2) **Ícones visuais** (`MaterialCommunityIcons`) para ações e status
     - Ícones de estrela/sono e lixeira tornam ações autoexplicativas.
  3) **Feedback visual** via Snackbar ao adicionar, remover e recrutar/dispensar
     - Comunicação imediata do resultado da ação.
  4) **Filtro de personagens** (Todos | Recrutados | Disponíveis)
     - Facilita a visualização por estado, melhorando a eficiência do usuário.
  5) **Animação** ao atualizar a lista (`LayoutAnimation`)
     - Transições suaves ao inserir/remover/atualizar itens.

---

### 🎯 Valor das Melhorias

- Navegação e compreensão mais fáceis.
- Prevenção de erros do usuário.
- Feedback imediato para confiança e fluidez.
- Interface moderna e padronizada.
- Código pronto para evoluir.

---


## 🚀 Como rodar

1. **Instalar dependências**
```bash
npm install
```
2. **Iniciar**
```bash
npm start
```

> Requisitos: Node, Expo, e dispositivos/emuladores configurados.

---

## 📁 Estrutura

```
app-RPG-COM_SQLITE
├── assets/
├── components/
│   ├── AddCharacterForm.js
│   ├── CharacterCard.js
│   └── Header.js
├── App.js
├── app.json
└── package.json
```

---

### 👩‍💻 Dupla

Anna Beatriz & Beatriz Lima
