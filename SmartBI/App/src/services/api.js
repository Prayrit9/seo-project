const API_URL = 'http://127.0.0.1:8000';

export const uploadDocument = async (imageUri) => {
    try {
        // Create form data
        const formData = new FormData();

        // Get the file extension from the URI
        const fileExtension = imageUri.split('.').pop().toLowerCase();
        const mimeType = `image/${fileExtension}`;

        // Create a blob from the image URI
        const response = await fetch(imageUri);
        const blob = await response.blob();

        formData.append('file', blob, `document.${fileExtension}`);

        console.log('Preparing upload:', {
            uri: imageUri,
            type: mimeType,
            name: `document.${fileExtension}`
        });

        // Send request to backend
        const uploadResponse = await fetch(`${API_URL}/api/input/upload-image`, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            },
        });

        console.log('Upload response status:', uploadResponse.status);

        if (!uploadResponse.ok) {
            const errorText = await uploadResponse.text();
            console.error('Upload failed:', {
                status: uploadResponse.status,
                error: errorText
            });
            throw new Error(`Failed to upload document: ${uploadResponse.status} ${errorText}`);
        }

        const data = await uploadResponse.json();
        console.log('Upload successful:', data);

        return {
            success: true,
            data: data
        };
    } catch (error) {
        console.error('Upload error:', error);
        return {
            success: false,
            error: error.message
        };
    }
};

export const analyzeDocument = async (documentId) => {
    try {
        const response = await fetch(`${API_URL}/api/analyze/${documentId}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to analyze document: ${response.status} ${errorText}`);
        }

        const data = await response.json();
        return {
            success: true,
            data: data.data
        };
    } catch (error) {
        console.error('Analysis error:', error);
        return {
            success: false,
            error: error.message
        };
    }
}; 