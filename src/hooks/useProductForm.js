import { useState } from "react";
import { apiFetch } from "../utils/apiFetch";
import { toast } from "react-toastify";

export const useCreateProductForm = (urlBase, mode = "create") => {
    const [slots, setSlots] = useState([{ slot: "", files: [], previews: [] }]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [existingSlots, setExistingSlots] = useState([{ slot: "", files: [], previews: [] }]);
    const [existingImagePreviews, setExistingImagePreviews] = useState([]);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onImageChangeHandler = (files) => {
        imagePreviews.forEach((preview) => URL.revokeObjectURL(preview.url));
        const filesArray = Array.from(files);
        const newImagePreviews = filesArray.map((element) => ({
            //element,
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

    const populateForm = (initialData) => {
        if (!initialData) return;

        // Slots
        const slotsFromData = initialData.models.map((element) => ({
            slot: element.slot,
            files: element.files,
            previews: element.files.filter(file => file != "").map(file => ({
                url: `${urlBase}/${file.replace(/\\/g, '/')}`
            }))
        })
        );

        setExistingSlots(slotsFromData);

        // Images
        setExistingImagePreviews(initialData.images.map(url => ({ url: `${urlBase}/${url}` })))
    };

    const removeExistingImage = (urlToRemove) => {
        setExistingImagePreviews((prev) =>
            prev.filter((img) => img.url !== urlToRemove)
        );
    };
    const removeExistingSlot = (slotName) => {
        setExistingSlots(existingSlots.filter((s) => s.slot !== slotName));
    };

    const onSubmitHandler = async (ev) => {
        ev.preventDefault();
        setIsSubmitting(true);
        setFormErrors({});
        const formData = new FormData(ev.target);

        slots
            .filter((s) => s.slot.trim() !== "")
            .forEach(({ slot, files }) => {
                files.forEach((file, i) => {
                    formData.append(`models[${slot}]`, file);
                });
            });
        if (mode === "create") {
            try {
                const data = await apiFetch(
                    `${urlBase}/api/v1/products`,
                    "POST",
                    {},
                    formData
                );

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
        } else if (mode === "edit") {
            //append existing images urls
            formData.append("existingImages", existingImagePreviews.map(element => (
                element.url.replace(urlBase + "/", "")
            )))
            console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
            //append existing models
            console.log({ existingSlots })
            console.log(existingSlots.map(element => ({
                slot: element.slot,
                files: element.files
            })))
            formData.append("existingModels", JSON.stringify(existingSlots.map(element => ({
                slot: element.slot,
                files: element.files
            }))))
            try {
                const data = await apiFetch(
                    `${urlBase}/api/v1/products/${formData.id}`,
                    "PUT",
                    {},
                    formData
                )
                toast.success("Product edited successfully");
            } catch (error) {
                console.log(error);
                if (error?.errors) {
                    setFormErrors(error.errors);
                }
                toast.error("Error editing product");
            } finally {
                setIsSubmitting(false);
            }
        }

    };

    return {
        slots,
        imagePreviews,
        existingSlots,
        existingImagePreviews,
        formErrors,
        isSubmitting,
        onSubmitHandler,
        onImageChangeHandler,
        updateSlotName,
        updateSlotFiles,
        addNewSlot,
        removeExistingSlot,
        removeExistingImage,
        populateForm
    };
};
