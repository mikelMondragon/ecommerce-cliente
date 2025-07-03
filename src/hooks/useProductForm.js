import { useState } from "react";
import { apiFetch } from "../utils/apiFetch";
import { toast } from "react-toastify";

export const useCreateProductForm = (urlBase) => {
    const [imagePreviews, setImagePreviews] = useState([]);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [slots, setSlots] = useState([{ slot: "", files: [], previews: [] }]);

    const onImageChangeHandler = (files) => {
        imagePreviews.forEach((preview) => URL.revokeObjectURL(preview.url));
        const filesArray = Array.from(files);
        const newImagePreviews = filesArray.map((element) => ({
            element,
            url: URL.createObjectURL(element),
        }));
        setImagePreviews(newImagePreviews);
    };

    const updateSlotName = (index, value) => {
        const copy = [...slots];
        copy[index].slot = value;
        setSlots(copy);
    };

    const updateSlotFiles = (index, fileList) => {
        slots[index].previews?.forEach((preview) =>
            URL.revokeObjectURL(preview.url)
        );
        const filesArray = Array.from(fileList);
        const previews = filesArray.map((file) => ({
            file,
            url: URL.createObjectURL(file),
        }));
        const copy = [...slots];
        copy[index].files = filesArray;
        copy[index].previews = previews;
        setSlots(copy);
    };

    const addNewSlot = () => {
        setSlots([...slots, { slot: "", files: [], previews: [] }]);
    };

    const resetForm = (formEl) => {
        formEl.reset();
        setSlots([{ slot: "", files: [], previews: [] }]);
        setImagePreviews([]);
    };

    const onSubmitHandler = async (ev) => {
        ev.preventDefault();
        setIsSubmitting(true);
        setFormErrors({});

        const formData = new FormData(ev.target);
        slots
            .filter((s) => s.slot.trim() !== "")
            .forEach(({ slot, files }) => {
                files.forEach((file) => {
                    formData.append(`models[${slot}]`, file);
                });
            });

        try {
            const data = await apiFetch(
                `${urlBase}/api/v1/products`,
                "POST",
                {},
                formData
            );

            console.log({ data });
            resetForm(ev.target);
            toast.success("Product created successfully");
        } catch (error) {
            console.log(error);
            if (error?.errors) {
                setFormErrors(error.errors);
            }
            toast.error("Error creating product");
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        slots,
        imagePreviews,
        formErrors,
        isSubmitting,
        onSubmitHandler,
        onImageChangeHandler,
        updateSlotName,
        updateSlotFiles,
        addNewSlot,
    };
};
