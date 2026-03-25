const IMGBB_ENDPOINT = 'https://api.imgbb.com/1/upload';

export async function uploadToImgbb(fileBuffer, fileName = 'boutique-image') {
  if (!process.env.IMGBB_API_KEY) {
    throw new Error('eb7f44e738dc1e9664d6349c85c8772d');
  }

  const payload = new FormData();
  payload.append('image', fileBuffer.toString('base64'));
  payload.append('name', fileName.replace(/\.[^/.]+$/, ''));

  const response = await fetch(`${IMGBB_ENDPOINT}?key=${process.env.IMGBB_API_KEY}`, {
    method: 'POST',
    body: payload
  });
  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data?.error?.message || 'Unable to upload image to imgbb.');
  }

  return {
    url: data.data.display_url || data.data.url,
    thumbUrl: data.data.thumb?.url || data.data.medium?.url || data.data.url,
    deleteUrl: data.data.delete_url || '',
    width: data.data.width || null,
    height: data.data.height || null
  };
}

export async function deleteFromImgbb(deleteUrl) {
  if (!deleteUrl) {
    return false;
  }

  try {
    const response = await fetch(deleteUrl);
    return response.ok;
  } catch {
    return false;
  }
}

