const validate = (formData) => {

    let errors = {};

    const urlRegex = /\.(jpeg|jpg|gif|png|svg)$/i;
    const validateLocationType = ["Apartment","Hotel","House","Cabin"];
    const validateCountries = ["Argentina","Brasil","Chile","Uruguay"];
    let validateStartDate = new Date(formData.startDate);
    let validateEndDate = new Date(formData.endDate);

    //Errors title
    if (formData.title.length>60) {
        errors.title = "Máximo 60 caracteres";
    }
    //Errors image
    if (!urlRegex.test(formData.image)){
        errors.image = "Formato de url no válido";
    }
    //Errors type
    if (validateLocationType.find(type=>type===formData.type)===undefined) {
        errors.type = "Tipo de locación no válido";
    }
    //Errors address
    if (formData.address.length>100) {
        errors.address = "Maximo 100 caracteres";
    }
    //Errors country
    if (validateCountries.find(country=>country===formData.country)===undefined) {
        errors.country = "Country no válido"
    }
    //Errors guests
    if (Number(formData.guests)<=0) {
        errors.guests = "No puede ser menor o igual a 0"
    }
    //Errors price
    if (Number(formData.price)<=0) {
        errors.price = "No puede ser menor o igual a 0"
    }
    //Errors description
    if (formData.description.length>400) {
        errors.description = "Maximo 400 caracteres";
    }
    //Errors startDate
    if (validateStartDate>validateEndDate) {
        errors.startDate= "La fecha de inicio no puede ser mayor"
    }
    //Errors endDate
    if (validateEndDate<validateStartDate) {
        errors.endDate= "La fecha de salida no puede ser menor"
    }

    return errors;
}

export default validate;