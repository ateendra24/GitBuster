import React from "react";

export const Circle = ({ className }: { className?: string }) => (
    <svg className={`w-8 md:w-10 h-8 md:h-10 ${className}`} fill="none" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#cs_clip_1_ellipse-12)">
            <mask height="200" id="cs_mask_1_ellipse-12" style={{ "maskType": "alpha" }} width="200" x="0" y="0" maskUnits="userSpaceOnUse">
                <path d="M100 150c27.614 0 50-22.386 50-50s-22.386-50-50-50-50 22.386-50 50 22.386 50 50 50zm0 50c55.228 0 100-44.772 100-100S155.228 0 100 0 0 44.772 0 100s44.772 100 100 100z" fill="#fff" fillRule="evenodd" />
            </mask>
            <g mask="url(#cs_mask_1_ellipse-12)">
                <path d="M200 0H0v200h200V0z" fill="#fff" />
                <path d="M200 0H0v200h200V0z" fill="#FAFF02" fillOpacity="0.33" />
                <g filter="url(#filter0_f_844_2811)">
                    <path d="M110 32H18v68h92V32z" fill="#FFE500" />
                    <path d="M188-24H15v98h173v-98z" fill="#FF001F" />
                    <path d="M175 70H5v156h170V70z" fill="#18A0FB" />
                    <path d="M230 51H100v103h130V51z" fill="#FF00D6" />
                </g>
            </g>
        </g>
        <g style={{ "mixBlendMode": "overlay" }} mask="url(#cs_mask_1_ellipse-12)">
            <path d="M200 0H0v200h200V0z" fill="gray" stroke="transparent" filter="url(#cs_noise_1_ellipse-12)" />
        </g>
        <defs>
            <filter height="410" id="filter0_f_844_2811" width="385" x="-75" y="-104" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood result="BackgroundImageFix" floodOpacity="0" />
                <feBlend result="shape" in="SourceGraphic" in2="BackgroundImageFix" />
                <feGaussianBlur result="effect1_foregroundBlur_844_2811" stdDeviation="40" />
            </filter>
            <clipPath id="cs_clip_1_ellipse-12">
                <path d="M0 0H200V200H0z" fill="#fff" />
            </clipPath>
        </defs>
        <defs>
            <filter height="100%" id="cs_noise_1_ellipse-12" width="100%" x="0%" y="0%" filterUnits="objectBoundingBox">
                <feBlend result="out3" in="SourceGraphic" in2="out2" />
            </filter>
        </defs>
    </svg>
);
