# Sebastian Cachis - Portfolio

This is my first personal website, a portfolio designed to showcase my skills and experience as a programmer.

## 📑 Table of Contents
- [✨ Features](#-features)
- [🛠 Technologies Used](#-technologies-used)
- [📁 Project Structure](#-project-structure)
- [🚀 Installation](#-installation)
- [📝 File Documentation](#-file-documentation)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

## ✨ Features
- Responsive design for all devices
- Bilingual support (English/Spanish)
- Smooth animations and transitions
- Interactive UI elements
- Contact integration with WhatsApp API
- Clear and simple navigation
- Main sections: Home, About Me, Projects, Skills, and Contact

## 🛠 Technologies Used
- **HTML5**: Structure and content
- **CSS3**: Custom styles and animations
- **JavaScript**: Interactivity and animations
- **Git**: Version control
- **VS Code**: Code editor

## 📁 Project Structure

```plaintext
Sebastian-Cachis-Portfolio/ 
├── assets/ 
│ ├── images/ 
│ │ ├── social-media/ 
│ │ │ ├── github-brands-solid.svg 
│ │ │ ├── linkedin-brands-solid.svg 
│ │ │ ├── mail-icon.png 
│ │ │ └── ws-icon.png 
│ │ ├── technologies/ 
│ │ │ ├── html5-brands-solid.svg 
│ │ │ ├── css3-brands-solid.svg 
│ │ │ ├── react-brands-solid.svg 
│ │ │ ├── vue-brands-solid.svg 
│ │ │ └── springboot-brands-solid.svg 
│ │ ├── favicon.ico 
│ │ ├── spain-flag.png 
│ │ └── usa-flag.png 
├── scripts/ 
│ ├── about-me.js 
│ ├── contact.js
│ ├── home.js
│ ├── projects.js
│ ├── script.js 
│ └── skills.js 
├── src/
│ ├── en/
│ │ ├── about-me.html
│ │ ├── contact.html
│ │ ├── projects.html
│ │ └── skills.html
│ └── es/
│   ├── sobre-mi.html
│   ├── contacto.html
│   ├── proyectos.html
│   └── habilidades.html
├── styles/ 
│ ├── about-me.css
│ ├── contact.css
│ ├── footer.css
│ ├── header.css
│ ├── home.css
│ ├── projects.css
│ ├── skills.css
│ └── style.css
├── index.html
└── inicion.html
```
## 🚀 Installation

To set up the project locally, follow these steps:

1. **Clone the repository**: 
   Use the following command to clone the repository to your local machine:
   ```bash
   git clone https://github.com/Dark7YT/Sebastian-Cachis-Portfolio.git
   ```

2. **Navigate to the project directory**:
   Change your working directory to the cloned repository:
   ```bash
   cd Sebastian-Cachis-Portfolio
   ```

3. **Open the project in your browser**:
   Open the ```index.html``` file directly in your preferred browser to view the portfolio.

4. **Run a local server (optional)**:
   For a smoother development experience, you can run a local development server. Use a tool like Live Server:
   ```bash
   npx live-server
   ```
   This step is optional but recommended for real-time updates during development.

## 📄 File Documentation

### Root Files
   * ```index.html```: The main entry point of the website in English.
   * ```inicio.html```: The main entry point of the website in Spanish.

### Directory Structure
   ```assets/```
   * ```images/```: Contains all image files used across the website.
      * ```social-media/```: Icons for social media platforms.
      * ```technologies/```: Technology logos such as HTML, CSS, React, Vue, and Spring Boot.
      * Other images like the favicon, flags, and profile picture.
   
   ```scripts/```
   * Contains JavaScript files for dynamic functionality:
      * ```about-me.js```: Handles interactivity for the "About Me" section.
      * ```contact.js```: Handles the "Contact" section.
      * ```home.js```: Handles the "Home" section.
      * ```projects.js```: Handles the "Projects" section.
      * ```script.js```: Handles the navigation bar functionality.
      * ```skills.js```: Handles the "Skills" section..

      ```src/```
   * Organized HTML files for bilingual support:
      * ```en/```: English versions of the pages:
         * ```about-me.html```: About Me section in English.
         * ```contact.html```: Contact page in English.
         * ```projects.html```: Projects page in English.
         * ```skills.html```: Skills page in English.

      * ```es/```: English versions of the pages:
         * ```sobre-mi.html```: About Me section in Spanish.
         * ```contacto.html```: Contact page in Spanish.
         * ```proyectos.html```: Projects page in Spanish.
         * ```habilidades.html```: Skills page in Spanish.
   
   ```styles/```
   * Contains CSS files for styling each section:
      * ```about.css```: Specific styles for the "About Me" section.
      * ```contact.css```: Specific styles for the "Contact" section.
      * ```footer.css```: Specific styles for the "Footer" section.
      * ```heander.css```: Specific styles for the "Header" section.
      * ```home.css```: Specific styles for the "Home" section.
      * ```projects.css```: Specific styles for the "Projects" section.
      * ```skills.css```: Specific styles for the "Skills" section.
      * ```style.css```: Global styles applied across the entire website.

   
## 🤝 Contributing

Contributions to improve the project are always welcome. Here’s how you can contribute:

1. **Fork the repository**:

   Click the "Fork" button at the top-right corner of the repository page on GitHub.

2. **Clone your forked repository**:

   Clone your forked repository to your local machine:
   ```bash
   git clone https://github.com/your-username/Sebastian-Cachis-Portfolio.git
   ```

3. **Create a new branch**:

   Create a branch to make your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make your changes**:

   Implement your changes in the codebase.

5. **Commit your changes**:

   Write a clear and concise commit message following conventional commit guidelines:
   ```bash
   git commit -m "feat: add new feature description"
   ```

6. **Push your changes**:

   Push your branch to your forked repository:
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Submit a Pull Request**:

   Go to the original repository on GitHub and create a Pull Request (PR). Provide a clear description of your changes and why they should be merged.

## 📜 License

This project is licensed under the MIT License. See the LICENSE file for details.

Feel free to use and modify this portfolio for personal or commercial purposes, but giving credit is appreciated.