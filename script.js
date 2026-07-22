// Ganti dengan URL backend Anda. Untuk testing, bisa pakai tunnel (dibahas di bawah)
const BACKEND_URL = 'https://backend-anda.ngrok.io'; // contoh HTTPS

document.getElementById('loadBtn').addEventListener('click', async () => {
  const apiKey = document.getElementById('apiKey').value.trim();
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = '<p>Memuat...</p>';

  if (!apiKey) {
    resultDiv.innerHTML = '<p class="error">API Key tidak boleh kosong.</p>';
    return;
  }

  try {
    const response = await fetch('http://104.21.2.148:2041/api/servers', { // ganti dengan IP:Port server Node.js Anda
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ apiKey })
});

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Gagal memuat server');

    if (data.data && data.data.length > 0) {
      let html = '';
      data.data.forEach(server => {
        html += `<div class="server-card">
          <strong>${server.attributes.name}</strong><br>
          ID: ${server.attributes.identifier}<br>
          Status: <span style="color:${server.attributes.status === 'running' ? '#4ecca3' : '#e94560'}">${server.attributes.status}</span>
        </div>`;
      });
      resultDiv.innerHTML = html;
    } else {
      resultDiv.innerHTML = '<p>Tidak ada server ditemukan.</p>';
    }
  } catch (err) {
    resultDiv.innerHTML = `<p class="error">Error: ${err.message}</p>`;
  }
});
