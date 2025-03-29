const textarea = document.getElementById("text-input");
const wordCount = document.getElementById("word-count");
const charCount = document.getElementById("char-count");
const sentenceCount = document.getElementById("sentence-count");
const paragraphCount = document.getElementById("paragraph-count");
const readabilityBar = document.querySelector(".progress-fill");
const themeToggle = document.getElementById("theme-toggle");

// Dark/Light Mode Toggle
themeToggle.addEventListener("click", () => {
  document.body.dataset.theme = document.body.dataset.theme === "dark" ? "light" : "dark";
  themeToggle.innerHTML = document.body.dataset.theme === "dark" 
    ? '<i class="fas fa-sun"></i>' 
    : '<i class="fas fa-moon"></i>';
});

// Text Analysis Function
textarea.addEventListener("input", () => {
  const text = textarea.value.trim();
  
  // Word Count
  const words = text === "" ? 0 : text.split(/\s+/).length;
  wordCount.textContent = words;
  
  // Character Count
  charCount.textContent = text.length;
  
  // Sentence Count
  const sentences = text.split(/[.!?]+/).filter(s => s.length > 0).length;
  sentenceCount.textContent = sentences;
  
  // Paragraph Count
  const paragraphs = text.split(/\n+/).filter(p => p.trim().length > 0).length;
  paragraphCount.textContent = paragraphs;
  
  // Readability Score (Simple Flesch-Kincaid approximation)
  const readability = Math.min(100, Math.max(0, 
    120 - (1.015 * words / Math.max(1, sentences)) - (84.6 * (text.split(/[aeiou]/i).length - 1) / words)
  ));
  readabilityBar.style.width = `${readability}%`;
});