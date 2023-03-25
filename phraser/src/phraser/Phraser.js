import React from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { DocumentPage } from "./DocumentPage";
import { LibraryPage } from "./LibraryPage";

export const Phraser = ({ setError }) => {

    return (
        <>
            <Routes>
                <Route path="library/:id" element={<DocumentPage setError={setError} />} />
                <Route path="library" element={<LibraryPage setError={setError} />} />
                <Route path='*' element={<Navigate to="library" />} />
            </Routes>
        </>
    )
}