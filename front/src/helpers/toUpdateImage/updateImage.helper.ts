import Swal from 'sweetalert2';
import { apiUrl } from '../fetch.helper';

export const preventDefaults = (
    event: React.DragEvent<HTMLDivElement> | React.DragEvent<HTMLInputElement>
) => {
    event.preventDefault();
    event.stopPropagation();
};

export const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<string | null>>
) => {
    const files = event.target.files;
    if (files && files.length > 0) {
        const file = files[0];
        if (file.type.startsWith('image/')) {
            setImage(URL.createObjectURL(file));
        }
    }
};

export const handleDrop = (
    event: React.DragEvent<HTMLDivElement>,
    setImage: React.Dispatch<React.SetStateAction<string | null>>,
    fileInputRef: React.RefObject<HTMLInputElement>
) => {
    preventDefaults(event);
    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
        const file = files[0];
        if (file.type.startsWith('image/')) {
            setImage(URL.createObjectURL(file));

            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            if (fileInputRef.current) {
                fileInputRef.current.files = dataTransfer.files;
            }
        }
    }
};

export const uploadImage = async (
    formData: FormData,
    endpoint: string,
    token: string
) => {
    try {
        const response = await fetch(`${apiUrl}/pictures/${endpoint}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });
        return response;
    } catch (error) {
        throw new Error('Hubo un error al subir la imagen.');
    }
};

export const handleSuccessResponse = (router: any) => {
    Swal.fire({
        icon: 'success',
        title: 'Tu imagen se actualizó exitosamente',
    });
    router.push('/dashboard/profile');
};

export const handleErrorResponse = (error: any) => {
    Swal.fire({
        title: 'Error',
        text: error.message,
        icon: 'error',
        confirmButtonColor: '#0b0c0d',
    });
};
