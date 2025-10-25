import { useState } from "react";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { descriptionField, prepTimeField, priceField, requiredStringField } from "./validation/yupValidations.js";
import LoadingScreen from "../../utils/LoadingScreen.jsx";
import { FormInput } from "./FormInput.jsx";
import { errorMsg, infoMsg, successMsg } from "../../utils/toastify.js";

function AddMenuItem({ setFormOpen, onSave, selectedItem = null, existingMenu }) {
    const [isLoading, setIsLoading] = useState(false);
    const isEditMode = !!selectedItem;

    const formik = useFormik({
        initialValues: {
            name: selectedItem?.name || "",
            price: selectedItem?.price || "",
            category: selectedItem?.category || "",
            description: selectedItem?.description || "",
            preparation_time: selectedItem?.preparation_time || "",
            by_user: isEditMode ? false : true,
        },
        enableReinitialize: true,
        validationSchema: yup.object({
            name: requiredStringField,
            price: priceField,
            category: requiredStringField,
            description: descriptionField,
            preparation_time: prepTimeField,
        }),
        onSubmit: async (values, { resetForm }) => {
            setIsLoading(true);
            try {
                let updatedMenu;
                let itemToSave;

                const trimmedName = values.name.trim().toLowerCase();
                const isDuplicate = existingMenu.some((item) => item.name.trim().toLowerCase() === trimmedName && item.id !== selectedItem?.id);
                if (isDuplicate) { errorMsg("A dish with this name Already exists."); return; };

                if (isEditMode) {
                    itemToSave = { ...selectedItem, ...values };
                    updatedMenu = existingMenu.map((item) => item.id === selectedItem.id ? itemToSave : item);
                } else {
                    const newId = existingMenu.length ? existingMenu[existingMenu.length - 1].id + 1 : 1;
                    itemToSave = { id: newId, ...values };
                    updatedMenu = [...existingMenu, itemToSave];
                };

                localStorage.setItem("local-menu", JSON.stringify(updatedMenu));
                onSave?.(itemToSave);
                resetForm();
                setFormOpen(false);
                successMsg(`Item ${itemToSave.name} ${isEditMode ? "edited" : "added"} successfully!`);
            } catch (err) {
                errorMsg(`Error: ${err}`);
            } finally {
                setIsLoading(false);
            };
        }
    });

    return (
        <div className="form-container">
            {isLoading ? (
                <LoadingScreen />
            ) : (
                <form onSubmit={formik.handleSubmit} className="item-form">

                    <FormInput
                        label="name" name="name" type="text"
                        formik={formik} placeholder="Enter name"
                    />
                    <FormInput label="price" name="price" type="number"
                        formik={formik} placeholder="Enter price"
                    />
                    <FormInput
                        label="category" name="category" type="text"
                        formik={formik} placeholder="Enter category"
                    />
                    <FormInput
                        label="description" name="description" type="text"
                        formik={formik} placeholder="Enter description"
                    />
                    <FormInput
                        label="prep-time" name="preparation_time" type="number"
                        formik={formik} placeholder="preparation time"
                    />
                    <div className="form-btns-container">
                        <button
                            className="submit-btn" type="submit"
                            title={isEditMode ? "Save" : "Add"}
                            disabled={isLoading || !formik.dirty || !formik.isValid}
                        >
                            {isEditMode ? "Save" : "Add"}
                        </button>
                        <button className="submit-btn" type="button"
                            onClick={() => { setFormOpen(false); formik.resetForm(); }}>
                            close
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}
export default AddMenuItem;