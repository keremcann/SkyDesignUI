import React from 'react'

export default function Box({ children }) {
    return (
        <div style={{
            overflowX: "hidden",
            overflowY: 'auto',
            maxHeight: '550px',
            width: '100%'
        }}>
            {children}
        </div>
    )
}
