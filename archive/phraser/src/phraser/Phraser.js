import React from "react";
import { DocumentPage } from "./document/DocumentPage";

export const Phraser = ({ setError, ...props }) => {

    return (
        <DocumentPage setError={setError} {...props} />
    )
}