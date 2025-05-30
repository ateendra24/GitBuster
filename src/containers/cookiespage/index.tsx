import React from 'react'
import CookiesContent from './(cookies-content)'

export default function CookiesPage() {
    return (
        <div className="space-y-8">
            <h1 className="text-3xl md:text-4xl font-bold">Cookie Policy</h1>
            <CookiesContent />
        </div>
    )
} 