import { removeBackground } from "https://cdn.jsdelivr.net/npm/@imgly/background-removal@1.4.5/+esm";

const imageInput = document.getElementById('image-input');
const statusText = document.getElementById('status');
const uploadZone = document.getElementById('upload-zone');
const resultContainer = document.getElementById('result-container');
const resultImg = document.getElementById('result-img');
const downloadBtn = document.getElementById('download-btn');

imageInput.addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  // Show status & hide upload
  uploadZone.classList.add('hidden');
  statusText.classList.remove('hidden');

  try {
    // Run AI model locally in browser
    const blob = await removeBackground(file);
    const url = URL.createObjectURL(blob);

    // Render result
    resultImg.src = url;
    downloadBtn.href = url;
    
    statusText.classList.add('hidden');
    resultContainer.classList.remove('hidden');
  } catch (err) {
    console.error(err);
    alert('Failed to process image. Try another photo!');
    statusText.classList.add('hidden');
    uploadZone.classList.remove('hidden');
  }
});
