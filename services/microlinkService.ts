
export const fetchMicrolinkData = async (url: string) => {
  const query = new URLSearchParams({
    url: url,
    screenshot: 'true',
    meta: 'true',
    'screenshot.type': 'png',
    'screenshot.width': '1024',
    'screenshot.height': '768',
  });

  const response = await fetch(`https://api.microlink.io?${query.toString()}`);
  if (!response.ok) {
    throw new Error('Failed to scrape the target URL. Please check the address.');
  }

  const result = await response.json();
  const screenshotUrl = result.data.screenshot?.url;
  const pageText = result.data.description || result.data.title || '';

  if (!screenshotUrl) {
    throw new Error('Could not capture screenshot of the target URL.');
  }

  // Convert screenshot URL to base64 with potential downscaling
  const imageResponse = await fetch(screenshotUrl);
  const blob = await imageResponse.blob();
  
  return new Promise<{ base64: string; text: string }>((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(blob);
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      // Max dimension of 800px to keep it lightweight but legible for AI
      const scale = Math.min(1, 800 / Math.max(img.width, img.height));
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      const base64 = canvas.toDataURL('image/jpeg', 0.8).split(',')[1];
      URL.revokeObjectURL(url);
      resolve({ base64, text: pageText });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('IMAGE_LOAD_FAILURE: Failed to process interface screenshot.'));
    };
    img.src = url;
  });
};
