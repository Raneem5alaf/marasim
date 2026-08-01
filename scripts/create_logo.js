import fs from 'fs';

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 200" width="360" height="200">
  <style>
    .wordmark {
      font-family: 'Baloo Bhaijaan 2', 'Cairo', 'Tajawal', 'Traditional Arabic', sans-serif;
      font-weight: 800;
      font-size: 88px;
      direction: rtl;
    }
  </style>
  <!-- Pink Circle Dot -->
  <circle cx="116" cy="46" r="12" fill="#ed2979" />
  
  <!-- Pink Emblem (Square with rounded top-left corner) -->
  <path d="M 76 96 V 74 C 76 60, 88 52, 102 52 H 108 V 96 H 76 Z" fill="#ed2979" />

  <!-- Arabic Wordmark "مَراسِم" -->
  <text x="340" y="148" text-anchor="end" fill="#0a0a0c" class="wordmark">مَراسِم</text>
</svg>`;

fs.writeFileSync('public/logo.svg', svgContent, 'utf8');
console.log('Successfully wrote public/logo.svg');
