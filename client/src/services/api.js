// client/src/services/api.js

// This ensures that even if the .env is missing, it points to your server on 4000
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

async function request(path, options = {}) {
  let response;

  try {
    console.log(`📡 Sending request to: ${API_BASE}${path}`);
    response = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers: {
        Accept: 'application/json',
        ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
        ...options.headers
      }
    });
  } catch (err) {
    console.error("❌ Fetch Error:", err);
    throw new Error(
      `Cannot connect to the API at ${API_BASE}. Make sure the backend terminal is running.`
    );
  }

  const raw = await response.text();
  let payload = {};

  if (raw) {
    try {
      payload = JSON.parse(raw);
    } catch {
      payload = {
        message: response.ok
          ? 'The server returned a non-JSON response.'
          : `Request failed with status ${response.status}.`
      };
    }
  }

  if (!response.ok) {
    throw new Error(payload.message || 'Request failed.');
  }

  return payload;
}

// Ensure the endpoint matches your server/routes/authRoutes.js
export function loginAdmin(credentials) {
  return request('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials)
  });
}

export function fetchGallery(category) {
  const query = category ? `?category=${encodeURIComponent(category)}` : '';
  return request(`/gallery${query}`);
}

export function uploadGalleryItem(token, formData) {
  return request('/gallery', {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export function deleteGalleryItem(token, id) {
  return request(`/gallery/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export function fetchPosts() {
  return request('/posts');
}

export function createPost(token, payload) {
  return request('/posts', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });
}

export function updatePost(token, id, payload) {
  return request(`/posts/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });
}

export function deletePost(token, id) {
  return request(`/posts/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export function fetchVideos() {
  return request('/videos');
}

export function createVideo(token, payload) {
  return request('/videos', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });
}

export function updateVideo(token, id, payload) {
  return request(`/videos/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });
}

export function deleteVideo(token, id) {
  return request(`/videos/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export function fetchReviews() {
  return request('/reviews');
}