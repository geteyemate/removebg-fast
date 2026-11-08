import { removeBackground } from "https://cdn.jsdelivr.net/npm/@imgly/background-removal@1.4.5/+esm";

const imageInput = document.getElementById('image-input');
const uploadZone = document.getElementById('upload-zone');
const statusDiv = document.getElementById('status');
const statusText = document.getElementById('status-text');
const progressPercent = document.getElementById('progress-percent');
const progressBar = document.getElementById('progress-bar');
const resultContainer = document.getElementById('result-container');
const resultImg = document.getElementById('result-img');
const downloadBtn = document.getElementById('download-btn');
const resetBtn = document.getElementById('reset-btn');

imageInput.addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  // Show Loader, Hide Upload
  uploadZone.classList.add('hidden');
  statusDiv.classList.remove('hidden');

  try {
    const blob = await removeBackground(file, {
      progress: (key, current, total) => {
        if (total) {
          const percent = Math.round((current / total) * 100);
          progressPercent.innerText = `${percent}%`;
          progressBar.style.width = `${percent}%`;
          statusText.innerText = `Downloading AI Model (${percent}%)...`;
        } else {
          statusText.innerText = `Removing background...`;
        }
      }
    });

    const url = URL.createObjectURL(blob);
    resultImg.src = url;
    downloadBtn.href = url;

    // Show Result
    statusDiv.classList.add('hidden');
    resultContainer.classList.remove('hidden');
  } catch (err) {
    console.error(err);
    alert('Oops! Image process nahi ho paayi. Dusri photo try karo.');
    resetApp();
  }
});

function resetApp() {
  imageInput.value = '';
  resultImg.src = '';
  progressBar.style.width = '0%';
  progressPercent.innerText = '0%';
  resultContainer.classList.add('hidden');
  statusDiv.classList.add('hidden');
  uploadZone.classList.remove('hidden');
}

resetBtn.addEventListener('click', resetApp);
