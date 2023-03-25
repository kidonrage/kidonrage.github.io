import React from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { DocumentPage } from "./document/DocumentPage";
import { LibraryPage } from "./library/LibraryPage";

export const Phraser = ({ setError }) => {

    return (
        <>
            <Routes>
                <Route path="library/:documentId" element={<DocumentPage setError={setError} />} />
                <Route path="library" element={<LibraryPage setError={setError} />} />
                <Route path='*' element={<Navigate to="library" />} />
            </Routes>
        </>
    )
}