import { motion } from "motion/react";
import { OverviewBarLalin } from "./OverviewBarLalin";
import { OverviewBarGerbang } from "./OverviewBarGerbang";
import { OverviewPieShift } from "./OverviewPieShift";
import { OverviewPieGerbang } from "./OverviewPieGerbang";

export default function OverviewScreen() {
    return (
        <motion.div
            className="grid lg:grid-cols-12 grid-cols-1 gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.5,
                ease: "easeOut",
            }}
        >
            <div className="col-span-2 lg:col-span-12 ">
                <div className="border border-neutral-300 bg-white rounded-b-xl p-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div>
                            <OverviewBarLalin />
                        </div>
                        <div>
                            <OverviewPieShift />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                        <div>
                            <OverviewBarGerbang />
                        </div>
                        <div>
                            <OverviewPieGerbang/>
                        </div>
                    </div>
                </div>
            </div>

        </motion.div>
    )
}
