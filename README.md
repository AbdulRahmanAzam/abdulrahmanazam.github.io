# Abdul Rahman Azam - AI/ML Portfolio

A modern, responsive portfolio website showcasing expertise in Artificial Intelligence, Machine Learning, and Full-Stack Development. Features stunning 3D animations powered by Three.js.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

The application will be available at `http://localhost:5000`

## 📝 Important: Add Your Resume

**Action Required:** Replace the placeholder resume with your actual PDF:

1. Navigate to `client/public/`
2. Replace `Abdul_Rahman_Azam_Resume.pdf` with your real PDF resume
3. Keep the same filename, or update the filename in `client/src/components/Resume.tsx`

The resume download button will then serve your actual PDF to visitors.

## ✨ Features

- **3D Neural Network Animation**: Interactive Three.js background with optimized performance
- **Smooth Scroll Animations**: Intersection Observer-based scroll-triggered effects
- **Responsive Design**: Mobile-first approach with tablet and desktop breakpoints
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation, reduced-motion support
- **Performance Optimized**: Geometry instancing, lazy loading, proper resource cleanup

## 📂 Project Structure

```
client/
├── public/
│   └── Abdul_Rahman_Azam_Resume.pdf  # Replace with your actual resume!
├── src/
│   ├── components/
│   │   ├── NeuralNetworkBackground.tsx  # 3D Three.js animation
│   │   ├── Navigation.tsx               # Fixed header
│   │   ├── Hero.tsx                     # Hero section
│   │   ├── Skills.tsx                   # Skills with animated bars
│   │   ├── Projects.tsx                 # Project cards
│   │   ├── Education.tsx                # Timeline
│   │   ├── Achievements.tsx             # Achievement cards
│   │   ├── Resume.tsx                   # Resume download & contact
│   │   └── Footer.tsx                   # Footer
│   └── pages/
│       └── Portfolio.tsx                # Main page
shared/
└── schema.ts                            # Portfolio data & types
```

## 🎨 Customization

### Update Portfolio Data

Edit `shared/schema.ts` to customize:

- Personal information (name, title, tagline)
- Skills and proficiency levels (Web Dev & AI/ML)
- Projects with descriptions and tech stacks
- Education timeline
- Achievements and certifications
- Social media links

### Modify Design

- **Colors**: Edit CSS variables in `client/src/index.css`
- **Fonts**: Update in `client/index.html` and `tailwind.config.ts`
- **Spacing**: Adjust Tailwind classes in components
- **3D Animation**: Configure in `NeuralNetworkBackground.tsx`

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **3D Graphics**: Three.js
- **Animations**: CSS transitions, Intersection Observer
- **Icons**: Lucide React
- **UI Components**: Shadcn UI
- **Routing**: Wouter
- **Backend**: Express.js (minimal)
- **Build Tool**: Vite

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px+

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Sufficient color contrast (WCAG AA compliant)
- Respects `prefers-reduced-motion` preference
- Screen reader friendly

## 🎯 Portfolio Sections

1. **Hero**: Full-screen 3D neural network background with name and title
2. **Skills**: Two-column layout for Web Development and AI/ML skills
3. **Projects**: 5 featured projects with detailed descriptions
4. **Education**: Timeline with 3 educational milestones
5. **Achievements**: 4 key achievements and certifications
6. **Resume**: Download section with social media links
7. **Footer**: Copyright and contact information

## 🚢 Deployment

This portfolio is ready to deploy on:
- Replit (one-click deployment)
- Vercel
- Netlify
- Any static hosting service

## 👤 About Abdul Rahman Azam

- **Current**: BS in Artificial Intelligence, FAST NUCES Karachi (5th Semester, CGPA: 3.33)
- **Achievements**: 290+ LeetCode problems, 2nd place Web Hunt, 3rd place ACM Coders Cup
- **Focus**: AI/ML Engineering and Full-Stack Development

## 📧 Contact

- GitHub: [github.com/abdulrahmanazam](https://github.com/abdulrahmanazam)
- LinkedIn: [linkedin.com/in/abdulrahmanazam](https://linkedin.com/in/abdulrahmanazam)
- LeetCode: [leetcode.com/abdulrahmanazam](https://leetcode.com/abdulrahmanazam)
- Email: abdulrahman.azam@example.com

## 📄 License

This project is open source and available for personal use and modification.

---

Built with ❤️ to showcase AI/ML expertise and web development skills.