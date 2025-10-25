import './css/forms.css'

export function FormInput({formik, label, name, type = "text", 
                placeholder = "", required=false, className=""}){
    return(
        <div className={`input-field ${className}`}>
            <label htmlFor={name}>{label}</label>
            {formik.touched[name] && formik.errors[name] && (
                <p className="input-error-msg">
                    {formik.errors[name]}
                </p>
            )}

            {(type === "text" || type === "email" || type === "password") && (
                <input
                    type={type} id={name} name={name} autoComplete="on"
                    value={formik.values[name]} onChange={formik.handleChange}
                    onBlur={formik.handleBlur} placeholder={placeholder} required={required}
                />
            )}

            {type === "number" && (
                <input type={type} id={name} value={formik.values[name]}
                
                required={required} placeholder={placeholder} 
                onBlur={formik.handleBlur} onChange={formik.handleChange}
                />
            )}
        </div>
    );
};