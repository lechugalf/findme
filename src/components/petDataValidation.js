export default function petDataValidation(values) {
    let errors = {}

    if (values.animal !== 'cat' && values.animal !== 'dog')
        errors.animal = `${values.animal} es un valor invalido`;

    return errors;
}