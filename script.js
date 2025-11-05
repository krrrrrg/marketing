(function(){
  const input = document.getElementById('images');
  const gallery = document.getElementById('gallery');
  const dropzone = document.querySelector('.dropzone');

  if(!input || !gallery || !dropzone) return;

  // Helpers
  const toCaption = (file) => {
    const name = file.name || '사진';
    return name.replace(/\.[^.]+$/, '');
  };

  const addPhoto = (file) => {
    const url = URL.createObjectURL(file);
    const wrap = document.createElement('figure');
    wrap.className = 'photo';
    const img = document.createElement('img');
    img.alt = toCaption(file);
    img.loading = 'lazy';
    img.src = url;
    const cap = document.createElement('figcaption');
    cap.className = 'caption';
    cap.textContent = toCaption(file);
    wrap.appendChild(img);
    wrap.appendChild(cap);
    gallery.appendChild(wrap);
  };

  const handleFiles = (files) => {
    [...files].forEach(file => {
      if(!file.type.startsWith('image/')) return;
      addPhoto(file);
    });
  };

  // Input change
  input.addEventListener('change', (e) => {
    handleFiles(e.target.files);
    input.value = '';
  });

  // Drag and drop
  ['dragenter','dragover'].forEach(evt => {
    dropzone.addEventListener(evt, (e)=>{
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.add('is-hover');
    });
  });
  ['dragleave','drop'].forEach(evt => {
    dropzone.addEventListener(evt, (e)=>{
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.remove('is-hover');
    });
  });
  dropzone.addEventListener('drop', (e)=>{
    const dt = e.dataTransfer;
    if(dt && dt.files) handleFiles(dt.files);
  });
})();
