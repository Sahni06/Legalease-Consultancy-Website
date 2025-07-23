import { useState, useCallback } from 'react';

const useFormValidation = (initialState, validationRules) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = useCallback((fieldValues = values) => {
    let tempErrors = {};
    Object.keys(fieldValues).forEach(key => {
      if (validationRules[key]) {
        const { required, pattern, custom } = validationRules[key];
        const value = fieldValues[key];

        if (required && !value) {
          tempErrors[key] = required.message || 'This field is required';
        }

        if (pattern && value && !pattern.value.test(value)) {
          tempErrors[key] = pattern.message;
        }

        if (custom && value) {
          const customError = custom(value, fieldValues);
          if (customError) {
            tempErrors[key] = customError;
          }
        }
      }
    });
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  }, [validationRules, values]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      validate({ [name]: value });
    }
  }, [errors, validate]);

  const handleSubmit = useCallback(async (submitCallback) => {
    setIsSubmitting(true);
    if (validate()) {
      try {
        await submitCallback(values);
      } catch (error) {
        setErrors(prev => ({
          ...prev,
          submit: error.message
        }));
      }
    }
    setIsSubmitting(false);
  }, [validate, values]);

  const resetForm = useCallback(() => {
    setValues(initialState);
    setErrors({});
    setIsSubmitting(false);
  }, [initialState]);

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm,
    setValues,
    setErrors
  };
};

export default useFormValidation; 