# MedEDI-Check: Healthcare EDI Parser & X12 Validator

MedEDI-Check is a modern, high-performance web dashboard designed to parse, validate, and visualize Healthcare EDI (Electronic Data Interchange) files. It simplifies the complex world of X12 transactions, providing clear insights and actionable error reports.

![MedEDI-Check Dashboard](https://img.shields.io/badge/Status-Active-brightgreen)
![Tech Stack](https://img.shields.io/badge/Stack-Vite%20%7C%20Tailwind%20%7C%20JS-blue)

## 🚀 Key Features

- **📊 Comprehensive Dashboard**: Get a bird's-eye view of your EDI performance, including total claims, billed amounts, and net payments.
- **📁 Smart File Upload**: Seamless drag-and-drop support for 837 (Claims), 835 (Remittance), and 834 (Enrollment) files.
- **🌳 Hierarchical Parsed Viewer**: Explore the complex structure of EDI files with an intuitive, interactive tree view. Deep-dive into ISA, GS, ST, and Loop structures.
- **⚠️ Advanced Validation**: Real-time X12 validation checks that highlight missing elements, invalid values, and structural warnings.
- **🤖 AI-Powered Assistant**: Integrated EDI AI Assistant to help you decipher complex segments and suggest fixes for validation errors.
- **📈 Batch Summaries**: Aggregated insights for claim batches, including top providers by volume and total financial impacts.
- **🌙 Dynamic Theming**: Sleek Dark and Light modes tailored for professional environments.

## 🛠️ Technology Stack

- **Core**: Vanilla JavaScript (ES6+)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Typography**: [Inter (Google Fonts)](https://fonts.google.com/specimen/Inter)
- **Icons**: Custom SVG icons and system symbols

## 📥 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/pranavrsh2007-svg/MedEDI-Check.git
   cd MedEDI-Check
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## 📁 Project Structure

```text
├── src/
│   ├── main.js        # Core application logic and routing
│   └── style.css      # Design system and custom styles
├── index.html         # Application entry point
├── tailwind.config.js # Tailwind CSS configuration
├── vite.config.js     # Build configuration
└── sample_error.edi   # sample file for testing
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
