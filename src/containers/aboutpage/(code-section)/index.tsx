import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

function index() {

    return (
        <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="py-20 md:py-32 space-y-12 px-4 md:px-6"
        >
            <div className="text-center space-y-8 max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Code Visualization</h2>
                <p className="text-lg md:text-xl text-muted-foreground">
                    Experience your codebase in a whole new way with our powerful visualization tools.
                </p>
            </div>

            <div className="relative w-full max-w-3xl mx-auto">
                <div className="hidden dark:block absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-lg z-10 pointer-events-none"></div>

                <Image
                    width={500}
                    height={300}
                    src="/visualize.png"
                    alt="Code Visualization Dashboard"
                    className="w-full h-auto rounded-lg z-0"
                />
            </div>


        </motion.section>
    )
}

export default index
