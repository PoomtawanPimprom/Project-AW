export function handleFileChange(event: any, imageBase64Callback: (base64: string) => void): void {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
            const img = new Image();
            img.onload = () => {

                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d')!;
                

                const maxWidth = 800;
                const maxHeight = 600;
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > maxWidth) {
                        height *= maxWidth / width;
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width *= maxHeight / height;
                        height = maxHeight;
                    }
                }

                canvas.width = width;
                canvas.height = height;

                ctx.drawImage(img, 0, 0, width, height);

                const imageBase64 = canvas.toDataURL('image/jpeg', 0.7);
                console.log('Base64 Image:', imageBase64);

                imageBase64Callback(imageBase64);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}