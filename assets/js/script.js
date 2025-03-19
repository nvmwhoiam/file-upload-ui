let uploadCounter = 0;

const dropZone = document.getElementById('dropZone');
const fileInput = document.querySelector('[name="fileInput"]');
const browseBtn = document.getElementById('browseBtn');
const uploadList = document.getElementById('uploadList');

browseBtn.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', handleFileSelect);

dropZone.addEventListener('dragenter', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
});

dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
});

dropZone.addEventListener('dragleave', (e) => {
    e.preventDefault();
    if (e.relatedTarget && !dropZone.contains(e.relatedTarget)) {
        dropZone.classList.remove('dragover');
    }
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    const files = e.dataTransfer.files;
    handleFiles(files);
});

function handleFileSelect(e) {
    const files = e.target.files;
    handleFiles(files);
}

function handleFiles(files) {
    Array.from(files).forEach(file => {
        createUploadItem(file);
    });
}

function createUploadItem(file) {
    const fileSize = formatFileSize(file.size);
    const uploadId = `${uploadCounter++}`;

    const uploadHTML = `
        <div class="upload_item" data-id="${uploadId}">
            <div class="file_info">
                <span class="file_name">${file.name}</span>
                <span class="file_size">${fileSize}</span>
            </div>
            <div class="progress_bar">
                <div class="progress"></div>
            </div>
            <div class="status">Uploading...</div>
        </div>
    `;

    if (uploadList) {
        uploadList.insertAdjacentHTML("beforeend", uploadHTML);
    }

    const uploadItem = uploadList.querySelector(`[data-id="${uploadId}"]`);

    simulateUpload(uploadItem);
}

function simulateUpload(uploadItem) {
    const progressBar = uploadItem.querySelector('.progress');
    const status = uploadItem.querySelector('.status');
    let progress = 0;

    const interval = setInterval(() => {
        progress += Math.random() * 10;

        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            status.textContent = 'Upload complete';
            status.classList.add('success');
        }

        progressBar.style.width = `${progress}%`;
    }, 500);
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
} 