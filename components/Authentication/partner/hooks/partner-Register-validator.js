import { useState } from "react";

import {
    FirstNameValidator,
    LastNameValidator,
    LegalNameValidator,
    AddressValidator,
    CityValidator,
    StateValidator,
    CategoryValidator,
    emailValidator,
    passwordValidator,
    confirmPasswordValidator
} from "../partner-validator.js";

const touchErrors = errors => {
    return Object.entries(errors).reduce((acc, [field, fieldError]) => {
        acc[field] = {
            ...fieldError,
            dirty: true,
        };
        return acc;
    }, {});
};

export const useRegisterFormValidator = form => {
    const [errors, setErrors] = useState({
        
        firstName: {
            dirty: false,
            error: false,
            message: "",
        },
        lastName: {
            dirty: false,
            error: false,
            message: "",
        },
        userName: {
            dirty: false,
            error: false,
            message: "",
        },
        address: {
            dirty: false,
            error: false,
            message: "",
        },
        city: {
            dirty: false,
            error: false,
            message: "",
        },
        state: {
            dirty: false,
            error: false,
            message: "",
        },
        category: {
            dirty: false,
            error: false,
            message: "",
        },
        email: {
            dirty: false,
            error: false,
            message: "",
        },
        password: {
            dirty: false,
            error: false,
            message: "",
        },
        confirmPassword: {
            dirty: false,
            error: false,
            message: "",
        },
    });

    const validateForm = ({ form, field, errors, forceTouchErrors = false }) => {
        let isValid = true;

        // Create a deep copy of the errors
        let nextErrors = JSON.parse(JSON.stringify(errors));

        // Force validate all the fields
        if (forceTouchErrors) {
            nextErrors = touchErrors(errors);
        }

        const { firstName, lastName, userName, address, city, state, category, email, password, confirmPassword } = form;

        if (nextErrors.firstName.dirty && (field ? field === "firstName" : true)) {
            const ownerfirstNameMessage = FirstNameValidator(firstName, form);
            nextErrors.firstName.error = !!ownerfirstNameMessage;
            nextErrors.firstName.message = ownerfirstNameMessage;
            if (!!ownerfirstNameMessage) isValid = false;
        }

        if (nextErrors.lastName.dirty && (field ? field === "lastName" : true)) {
            const ownerlastNameMessage = LastNameValidator(lastName, form);
            nextErrors.lastName.error = !!ownerlastNameMessage;
            nextErrors.lastName.message = ownerlastNameMessage;
            if (!!ownerlastNameMessage) isValid = false;
        }

        if (nextErrors.userName.dirty && (field ? field === "userName" : true)) {
            const legalNameMessage = LegalNameValidator(userName, form);
            nextErrors.userName.error = !!legalNameMessage;
            nextErrors.userName.message = legalNameMessage;
            if (!!legalNameMessage) isValid = false;
        }

        if (nextErrors.email.dirty && (field ? field === "email" : true)) {
            const emailMessage = emailValidator(email, form);
            nextErrors.email.error = !!emailMessage;
            nextErrors.email.message = emailMessage;
            if (!!emailMessage) isValid = false;
          }

        if (nextErrors.address.dirty && (field ? field === "address" : true)) {
            const addressMessage = AddressValidator(address, form);
            nextErrors.address.error = !!addressMessage;
            nextErrors.address.message = addressMessage;
            if (!!addressMessage) isValid = false;
        }

        if (nextErrors.city.dirty && (field ? field === "city" : true)) {
            const cityMessage = CityValidator(city, form);
            nextErrors.city.error = !!cityMessage;
            nextErrors.city.message = cityMessage;
            if (!!cityMessage) isValid = false;
        }

        if (nextErrors.state.dirty && (field ? field === "state" : true)) {
            const stateMessage = StateValidator(state, form);
            nextErrors.state.error = !!stateMessage;
            nextErrors.state.message = stateMessage;
            if (!!stateMessage) isValid = false;
        }

        if (nextErrors.category.dirty && (field ? field === "category" : true)) {
            const categoryMessage = CategoryValidator(category, form);
            nextErrors.category.error = !!categoryMessage;
            nextErrors.category.message = categoryMessage;
            if (!!categoryMessage) isValid = false;
        }

        if (nextErrors.password.dirty && (field ? field === "password" : true)) {
            const passwordMessage = passwordValidator(password, form);
            nextErrors.password.error = !!passwordMessage;
            nextErrors.password.message = passwordMessage;
            if (!!passwordMessage) isValid = false;
        }

        if (
            nextErrors.confirmPassword.dirty &&
            (field ? field === "confirmPassword" : true)
        ) {
            const confirmPasswordMessage = confirmPasswordValidator(
                confirmPassword,
                form
            );
            nextErrors.confirmPassword.error = !!confirmPasswordMessage;
            nextErrors.confirmPassword.message = confirmPasswordMessage;
            if (!!confirmPasswordMessage) isValid = false;
        }

        setErrors(nextErrors);

        return {
            isValid,
            errors: nextErrors,
        };
    };

    const onBlurField = e => {
        const field = e.target.name;
        const fieldError = errors[field];
        if (fieldError.dirty) return;

        const updatedErrors = {
            ...errors,
            [field]: {
                ...errors[field],
                dirty: true,
            },
        };

        validateForm({ form, field, errors: updatedErrors });
    };

    return {
        validateForm,
        onBlurField,
        errors,
    };
};
