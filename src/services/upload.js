const CLOUD = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const MAX_MB = 8;

export async function uploadImage(file, folder = '') {
  if (!CLOUD || !PRESET) throw new Error('Cloudinary is not configured in .env.');
  if (!file.type.startsWith('image/')) throw new Error('Please choose an image file.');
  if (file.size > MAX_MB * 1024 * 1024) throw new Error(`Image is larger than ${MAX_MB} MB.`);

  const body = new FormData();
  body.append('file', file);
  body.append('upload_preset', PRESET);
  if (folder) body.append('folder', `ces/${folder}`);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD}/image/upload`, {
    method: 'POST',
    body,
  });
  if (!res.ok) throw new Error('Upload failed. Check your Cloudinary preset settings.');

  const data = await res.json();
  // serve a compressed, auto-format version, max 1600px wide
  return data.secure_url.replace('/upload/', '/upload/f_auto,q_auto,w_1600,c_limit/');
}