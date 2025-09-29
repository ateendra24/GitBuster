import { Circle } from '@/components/icons/Circle';
import { motion } from 'framer-motion'
import siteConfig from '@/config/siteConfig';

const fadeInVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5
        }
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: { duration: 0.3 }
    },
};

function LoadingSection() {
    return (
        <motion.div
            key="loading"
            variants={fadeInVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex flex-col items-center justify-center h-full space-y-6 px-4"
        >
            {/* Logo */}
            <div className="relative">
                <Circle className="w-12 h-12 md:w-16 md:h-16 animate-spin" />
            </div>

            {/* Content */}
            <div className="text-center space-y-3 max-w-md">
                <h2 className="text-xl font-semibold text-foreground">
                    Processing Repository
                </h2>

                <p className="text-sm text-muted-foreground">
                    Analyzing your codebase with AI. This may take a moment.
                </p>
            </div>

            {/* Simple progress indicator */}
            <div className="flex items-center space-x-1">
                {[0, 1, 2].map((index) => (
                    <motion.div
                        key={index}
                        animate={{
                            opacity: [0.3, 1, 0.3]
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: index * 0.2,
                            ease: "easeInOut"
                        }}
                        className="w-2 h-2 bg-primary rounded-full"
                    />
                ))}
            </div>
        </motion.div>
    )
}

export default LoadingSection
