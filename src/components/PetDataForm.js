import { useState, useEffect } from 'react';

function PetDataForm(action, validate, initValues, args) {
    console.log('init value', initValues)

    const [values, setValues] = useState(initValues || {});
    const [errors, setErrors] = useState({});
    const [isSubmited, setIsSubmited] = useState(false);

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmited) {
            console.log('sent')
            action(args);
        }
    }, [errors])

    const handleSubmit = (e) => {
        if (e) e.preventDefault();
        setErrors(validate(values))
        setIsSubmited(true);
    }

    const handleDeletePhoto = (imgPos) => {
        let photos = values.photos || [];
        photos[imgPos] = '';
        setValues(values => ({ ...values, photos: photos }));
    }

    const handleChange = (e) => {
        e.persist && e.persist();
        if (e.target.type === 'file') {
            let photos = values.photos || [];
            photos[e.photoId] = URL.createObjectURL(e.target.files[0]);
            setValues(values => ({ ...values, photos }));
            return;
        }
        setValues(values => ({ ...values, [e.target.name]: e.target.value }));
    }

    const handleChangeLocation = (e) => {
        let location = {
            lat: e.latLng[0],
            lng: e.latLng[1]
        };
        setValues(values => ({ ...values, location }));
    }

    return {
        values,
        errors,
        handleChange,
        handleSubmit,
        handleDeletePhoto,
        handleChangeLocation,
    }
}

export default PetDataForm;

// Based on this tutorial
// https://github.com/upmostly/custom-react-hooks-form-validation