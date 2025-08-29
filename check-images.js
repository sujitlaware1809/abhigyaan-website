// Image Loading Check Script for Debugging
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔍 Checking image loading...');
    
    const images = document.querySelectorAll('img');
    let loadedCount = 0;
    let failedCount = 0;
    
    images.forEach((img, index) => {
        const originalSrc = img.src;
        
        img.onload = function() {
            loadedCount++;
            console.log(`✅ Image ${index + 1} loaded: ${originalSrc}`);
            
            if (loadedCount + failedCount === images.length) {
                console.log(`📊 Image Loading Summary: ${loadedCount} loaded, ${failedCount} failed`);
            }
        };
        
        img.onerror = function() {
            failedCount++;
            console.error(`❌ Image ${index + 1} failed to load: ${originalSrc}`);
            
            // Try alternative paths
            if (originalSrc.includes('images/')) {
                const altPath = originalSrc.replace('images/', './images/');
                console.log(`🔄 Trying alternative path: ${altPath}`);
                img.src = altPath;
            }
            
            if (loadedCount + failedCount === images.length) {
                console.log(`📊 Image Loading Summary: ${loadedCount} loaded, ${failedCount} failed`);
            }
        };
        
        // Force check if image is already loaded
        if (img.complete) {
            if (img.naturalWidth > 0) {
                img.onload();
            } else {
                img.onerror();
            }
        }
    });
    
    // Check if images directory is accessible
    fetch('./images/Abhigyan_25.gif', { method: 'HEAD' })
        .then(response => {
            if (response.ok) {
                console.log('✅ Images directory is accessible');
            } else {
                console.error('❌ Images directory not accessible:', response.status);
            }
        })
        .catch(error => {
            console.error('❌ Error accessing images directory:', error);
        });
});

// Add this script to your HTML for debugging
const script = document.createElement('script');
script.textContent = `
    // Quick image check
    setTimeout(() => {
        const brokenImages = Array.from(document.images).filter(img => !img.complete || img.naturalWidth === 0);
        if (brokenImages.length > 0) {
            console.warn('🚨 Broken images detected:', brokenImages.map(img => img.src));
        } else {
            console.log('✅ All images loaded successfully');
        }
    }, 5000);
`;
document.head.appendChild(script);